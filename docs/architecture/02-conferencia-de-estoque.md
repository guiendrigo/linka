# Implementação — Conferência de estoque (candidato 2)

**Status:** após candidato 1 mergeado  
**Ordem:** segundo (mergeável sozinho)  
**Glossário:** [CONTEXT.md](../../CONTEXT.md) · **ADR:** [0001](../adr/0001-decisao-do-link-vs-conferencia-de-estoque.md)  
**Depende de:** [01-decisao-do-link.md](./01-decisao-do-link.md) (visita já usa IO `freshen`; trocar o adapter)

## Objetivo

Um módulo profundo dono de freshness, LOOKUP_CAP, cooldown por código, e entrada por código vs por usuário. Callers deixam de conhecer `checkStock` / `freshenStoredStock` / o `Map` em `store.server`. `affiliateCatalog` permanece adapter externo.

## Interface alvo

```ts
// Nomes ilustrativos — depth no comportamento, não na quantidade de exports

declare function freshenForCode(code: string): Promise<void>;

declare function freshenForUser(
  userId: string,
  opts?: { force?: boolean; productId?: string },
): Promise<StockReport>; // relatório que a UI “Conferir estoque” já consome
```

Implementation interna (não parte do interface que callers aprendem):

- `decideStock` (hoje em `stock-check.server.ts`)
- cache/`stock_checks`, `STOCK_FRESH_MS`, `LOOKUP_CAP`
- cooldown `Map` por código (hoje em `freshenStoredStock`)
- load de produtos do user / por productId
- persistência de `inStock` / clear `checked_at` no toggle manual (permanece no persist; conferência só lê/escreve estoque)

## Arquivos

| Arquivo | Mudança |
| --- | --- |
| Novo ex. `src/lib/linka/stock-freshen.server.ts` (ou deepen `stock-check.server.ts`) | `freshenForCode`, `freshenForUser`; cooldown; orquestra `decideStock` |
| [`src/lib/linka/store.server.ts`](../../src/lib/linka/store.server.ts) | Remover exports `checkStock` / `freshenStoredStock` / `stockCooldown`; SQL helpers que a conferência precise podem ficar internos ou ser injetados |
| [`src/lib/linka/public-resolve.server.ts`](../../src/lib/linka/public-resolve.server.ts) | IO `freshen: freshenForCode` |
| [`src/lib/linka/store.server.ts`](../../src/lib/linka/store.server.ts) `loadPublicBio` | `freshenForUser(owner, { force: false })` no lugar de `checkStock` |
| [`src/lib/linka/workspace.functions.ts`](../../src/lib/linka/workspace.functions.ts) | Botão Conferir → `freshenForUser` |
| [`src/lib/linka/shopee.ts`](../../src/lib/linka/shopee.ts) | `STOCK_FRESH_MS` continua a fonte única (candidato 3 reexporta no DTO) |
| Testes novos | Cooldown + freshenForCode com affiliate fake; sem rede Shopee real |

## Call sites a atualizar (grep)

- `freshenStoredStock`
- `checkStock`
- Qualquer import de cooldown / report só via store

Não adicionar aliases eternos dos nomes antigos (deletion test: aliases são shallow).

## Relação com a Decisão do link

A visita **não** engole a conferência. Só troca o adapter:

```ts
// public-resolve.server.ts
freshen: freshenForCode
```

Se o candidato 1 ainda não mergeou, **não** comece pelo 2 misturando decisão + stock no mesmo PR.

## Testes

- `freshenForCode`: sem row → no-op; com row → chama decide; rejeitado/unreachable/throttled → arma cooldown; segunda chamada dentro do cooldown não reconsulta
- `freshenForUser`: `force: true` ignora frescor; respeita `productId`; devolve shape de `StockReport` compatível com a UI
- Affiliate / catalog: fake adapter (segundo adapter justifica o seam)
- Manter testes atuais de `decideStock` / shopee puros

## Verificação

```bash
npm run test:linka
npm run typecheck
npm run lint
```

Manual: visita `/r/<código gravado>` com env Affiliate; bio `/p/...`; botão **Conferir estoque** no Links.

## Fora de escopo

- Mudar regra de negócio de estoque (15 min, cap 8, skip short links)
- Form de App ID por usuário
- Cron fora do processo
- Candidato 3 (DTO da Visão Links)

## Definition of done

- Zero exports públicos `checkStock` / `freshenStoredStock` em `store.server`
- Decisão do link e bio usam o novo interface
- Testes de cooldown cobrem o caminho que antes era untested
- `test:linka` + typecheck + lint verdes
