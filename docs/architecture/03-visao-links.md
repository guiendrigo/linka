# Implementação — Visão Links sem remontar SmartLink (candidato 3)

**Status:** após candidatos 1 e 2 (2 opcional se só precisar de `STOCK_FRESH_MS` exportado; preferir após 2 para um `pollMs` estável)  
**Ordem:** terceiro (mergeável sozinho)  
**Glossário:** [CONTEXT.md](../../CONTEXT.md)  
**Depende de:** [01](./01-decisao-do-link.md) (conceitualmente independente); [02](./02-conferencia-de-estoque.md) recomendado para locality de freshness

## Objetivo

A Visão Links deixa de importar `resolveSmartLink` / `resolutionCopy` e de remontar `SmartLink` no client (`stockOf`). O seam de `workspace.functions` (ou mapper server-side na montagem de `WorkspaceView`) entrega status pronto + `pollMs`. Bench (simulador) **continua** com `resolveSmartLink` no client.

## Interface alvo (DTO de lista)

Por produto na visão:

```ts
status: {
  label: "Em estoque" | "Esgotado" | "Sem destino";
  on: boolean;
};
// no WorkspaceView (ou equivalente):
pollMs: number; // === STOCK_FRESH_MS
```

- **Não** mandar `resolutionCopy` longo na lista
- **Não** mandar `Resolution` cru para a UI montar label
- Form de create/edit continua enviando ofertas cruas (shop, url, inStock, ordem)
- Comissão só no form / dados privados do afiliado — não no status público da listagem

## Mapeamento de status (locality no server)

Espelhar a lógica que `stockOf` usa hoje:

| `resolveSmartLink` | label | on |
| --- | --- | --- |
| `ok` | Em estoque | true |
| `all_out` | Esgotado | false |
| `empty` (e demais não-ok) | Sem destino | false |

Ideal: função pura testável `productListStatus(product) → { label, on }` no server (ou módulo shared sem I/O), chamada ao montar `WorkspaceView` / após `freshenForUser`.

## Arquivos

| Arquivo | Mudança |
| --- | --- |
| Tipos da visão (hoje em [`store.server.ts`](../../src/lib/linka/store.server.ts) ou extrair client-safe) | `WorkspaceProduct.status`; `WorkspaceView.pollMs` |
| Mapper / `loadWorkspace` | Preencher status + `pollMs: STOCK_FRESH_MS` |
| [`src/lib/linka/workspace.functions.ts`](../../src/lib/linka/workspace.functions.ts) | Garantir que getWorkspace / checkStock(freshen) devolvem a visão já com status |
| [`src/components/linka/workspace.tsx`](../../src/components/linka/workspace.tsx) | Remover `stockOf`; usar `product.status`; poll com `view.pollMs`; dropar imports de resolve |
| [`src/components/linka/use-workspace.ts`](../../src/components/linka/use-workspace.ts) | Tipos alinhados ao DTO |
| [`src/components/linka/bench.tsx`](../../src/components/linka/bench.tsx) | **Não** remover `resolveSmartLink` — demo interativo |
| Teste novo ex. `workspace-status.test.ts` | Mapper puro produto → status; não teste React |

## Poll

Hoje: `15 * 60 * 1000` hardcoded no client.  
Alvo: `pollMs` da visão = `STOCK_FRESH_MS` de [`shopee.ts`](../../src/lib/linka/shopee.ts) (única fonte). Sem hardcode no client; sem config por usuário.

## Testes

- Mapper: oferta em estoque → Em estoque / on true
- Todas out → Esgotado
- Sem ofertas → Sem destino
- `pollMs === STOCK_FRESH_MS`
- Garantir que `workspace.tsx` não importa `@/lib/linka/resolve` (lint manual / grep no PR)

## Verificação

```bash
npm run test:linka
npm run typecheck
npm run lint
```

Manual: lista Links mostra badges corretos; Conferir estoque atualiza status; Bench ainda simula `?on=`; mobile 390×844.

## Fora de escopo

- Partir `store.server` por conceito (candidato 5 do review — outro artefato)
- Uma forma única de Produto / matar `SmartLink` (candidato 4)
- Reescrever Bench para server fn
- Mudar copy pt-BR dos badges

## Definition of done

- Zero `resolveSmartLink` / `resolutionCopy` / `stockOf` em `workspace.tsx`
- Bench intacto como simulador
- Status e `pollMs` vêm do seam da visão
- `test:linka` + typecheck + lint verdes
