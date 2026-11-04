# Implementação — Decisão do link (candidato 1)

**Status:** pronto para implementar  
**Ordem:** primeiro (mergeável sozinho)  
**Glossário:** [CONTEXT.md](../../CONTEXT.md) · **ADR:** [0001](../adr/0001-decisao-do-link-vs-conferencia-de-estoque.md)

## Objetivo

Um módulo profundo no seam de `public-resolve.ts`: código + `on?` → kind da visita. Rotas `/r` e `/api/r` viram adapters HTTP. A Conferência de estoque continua atrás do IO atual (`freshenStoredStock`); não misturar os dois módulos (ADR-0001).

## Invariantes (não quebrar)

- Paridade de decisão entre `/r` e `/api/r`
- `?on=` só no demo (`serum-c`); produto gravado ignora
- `/r`: 302 + `cache-control: no-store` no redirect
- Destino só via `redirectTarget` (https, sem credenciais/whitespace)
- Visitante sem auth; afiliado sem colar chave Shopee
- JSON de `/api/r`: campos existentes (`status`, `url`, `shop`, `role`, `hop`) permanecem; só aditivos se necessário

## Interface alvo

```ts
type PublicVisit =
  | { kind: "redirect"; url: string; /* espelho público opcional: role, hop, shop */ }
  | { kind: "sold_out"; title: string; priceCents: number; resolution: Resolution }
  | { kind: "blocked"; title: string; priceCents: number; resolution: Resolution } // ok mas não https
  | { kind: "missing" }
  | { kind: "invalid" };

declare function decidePublicVisit(
  code: string,
  opts: { on?: string },
  io: {
    freshen: (code: string) => Promise<void>;
    findStored: (code: string) => Promise<SmartLink | null | undefined>;
    findDemo: (code: string) => SmartLink | undefined;
  },
): Promise<PublicVisit>;
```

Kinds em inglês no código; copy pt-BR na UI.

## Pipeline interno (locality)

1. Se `parsePublicCode(code)` falhar → `{ kind: "invalid" }` (ou o caller API valida antes; a fn pode assumir code já parseado — preferir invalid dentro do módulo se receber string crua)
2. `await io.freshen(code)` (engolir erro como hoje)
3. `link = findStored ?? findDemo`; sem link → `missing`
4. `visitorStock(code, link, on)` — só demo aplica `?on=`
5. `resolution = resolveSmartLink(link)`
6. `url = redirectTarget(resolution)`  
   - url → `redirect`  
   - resolution não-ok → `sold_out` com `{ title, priceCents, resolution }`  
   - resolution ok e url null → `blocked` (mesmo payload mínimo)

`loadPublicResolution` deixa de ser o interface externo: vira detalhe interno ou é removido se os testes migrarem para `decidePublicVisit`.

## Arquivos

| Arquivo | Mudança |
| --- | --- |
| [`src/lib/linka/public-resolve.ts`](../../src/lib/linka/public-resolve.ts) | Adicionar `PublicVisit`, `decidePublicVisit`; encolher/remover export de orquestração rasa |
| [`src/lib/linka/public-resolve.server.ts`](../../src/lib/linka/public-resolve.server.ts) | Wire IO: `freshenStoredStock`, `findStoredLink`, catalog demo → `decidePublicVisit` (ex.: `decideStoredVisit`) |
| [`src/lib/linka/resolve.functions.ts`](../../src/lib/linka/resolve.functions.ts) | `resolveCode` devolve `PublicVisit` (validator continua; invalid → throw ou kind) |
| [`src/routes/r/$code.tsx`](../../src/routes/r/$code.tsx) | Loader só adapta kinds → redirect / page data / notFound; **sem** `visitorStock` / `resolveSmartLink` / `redirectTarget` |
| [`src/routes/api/r/$code.ts`](../../src/routes/api/r/$code.ts) | Mesmo módulo; mapear kinds → status HTTP + JSON; aceitar search `on` se a plataforma passar (paridade) |
| [`src/lib/linka/public-resolve.test.ts`](../../src/lib/linka/public-resolve.test.ts) | Cobrir `decidePublicVisit` com fake IO |
| [`src/lib/linka/resolve.ts`](../../src/lib/linka/resolve.ts) | Sem mudança de regra; `visitorStock` / `redirectTarget` passam a ser chamados só de dentro do módulo público |

## Mapa HTTP

| kind | `/r` | `/api/r` |
| --- | --- | --- |
| `redirect` | 302 + `no-store` | 200 JSON com url/shop/role/hop |
| `sold_out` | 200 página (copy esgotado) | 200 JSON sem url de clique |
| `blocked` | 200 página (copy “Destino indisponível”) | 200 JSON sem url; status distinto ou campo explícito |
| `missing` | notFound | 404 `{ error: "not_found" }` |
| `invalid` | notFound | 400 `{ error: "invalid_code" }` |

## Testes

- Fake IO: ordem freshen → stored
- `redirect` quando oferta https em estoque
- `sold_out` quando `all_out` / `empty`
- `blocked` quando url http / com credenciais / whitespace
- `missing` quando não há stored nem demo
- `invalid` para código fora de `PUBLIC_CODE_RE`
- `?on=` altera estoque só se `code === serum-c`
- Produto gravado ignora `on`
- Manter unitários de `resolveSmartLink` / `redirectTarget`

## Verificação

```bash
npm run test:linka
npm run typecheck
npm run lint
```

Smoke manual: `/r/serum-c`, `/r/serum-c?on=a`, `/api/r/serum-c` mesma decisão.

## Fora de escopo

- Renomear/mover `freshenStoredStock` (candidato 2)
- Mudanças em `workspace.tsx` / `stockOf` (candidato 3)
- Openspec formal

## Definition of done

- Nenhuma rota pública reimplementa a decisão
- `/r` e `/api/r` compartilham `decidePublicVisit`
- `test:linka` + typecheck + lint verdes
