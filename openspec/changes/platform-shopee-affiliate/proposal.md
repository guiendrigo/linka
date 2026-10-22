# Proposal

## Why

Stock checks today require each affiliate to paste a Shopee Affiliate Open API App ID and secret. Approval of that access takes up to two weeks, so the onboarding asks for something most users cannot provide. The key is used only as infrastructure (`productOfferV2` by shop/item) — not to attribute commissions — so it belongs to the platform, not to the user.

## What Changes

- **BREAKING.** Remove per-user Shopee credentials: drop `shopee_credentials`, delete `/shopee`, the console nav item, `ShopeePanel`, and the save/remove server functions. Existing rows are discarded; Magalu production has no working user key to preserve.
- Resolve the Affiliate API credential from server env (`SHOPEE_AFFILIATE_APP_ID` / `SHOPEE_AFFILIATE_SECRET`). When the env is missing, stock stays manual (`not_configured`); the app still ships.
- Introduce a credential resolver + Affiliate catalog adapter so `checkStock` never reads env or SQL for secrets. The resolver returns `source: "platform"` today and is shaped to accept `source: "user"` later without rewriting the adapter.
- Shared stock cache keyed by shop/item (not user) so one platform app stays inside rate limits when many affiliates list the same product.
- Treat Shopee `10030` as throttling, not as a credential refusal. User-facing copy never mentions App ID or secret.
- The Linka never uses Affiliate fields that carry the platform account's tracking (`offerLink`, `generateShortLink`, `conversionReport`). Redirects stay on the URL the user pasted.

Out of scope: per-user Affiliate App ID paste; Open Platform seller OAuth and `shopee_connections`; conversational search; generating affiliate short links; a secret vault; click counts.

This change ships on Magalu (`docker compose -p linka`). Vercel/Nitro preview is not the production gate.

## Capabilities

### New Capabilities

- `affiliate-stock`: Automatic in-stock checks against the Shopee Affiliate Open API using a platform credential, a shop/item cache, and a catalog adapter that never attributes commission to the platform account. Manual stock remains the fallback.

### Modified Capabilities

- `sqlite-store`: Persistence no longer stores per-user Shopee credentials. Timestamp-from-app SQL is demonstrated on the shared stock cache instead of a credential upsert. Product, offer, bio, and auth rows are unchanged.

## Impact

- Schema: drop `shopee_credentials`; add `stock_checks`. Dual trees — Postgres `migrations/0005_*.sql`, SQLite `migrations/sqlite/0004_*.sql`.
- Server: `src/lib/env.server.ts`, `src/lib/linka/store.server.ts`, `src/lib/linka/shopee*.ts`, `src/lib/linka/workspace.functions.ts`, `src/lib/linka/input.ts`. Magalu `.env` gains the two Affiliate env vars (optional until the key is approved).
- Client: `workspace.tsx`, `console.tsx`, `src/routes/shopee.tsx` (deleted; `routeTree.gen.ts` regenerates). `WorkspaceView` stops exposing `shopee`.
- Tests: `shopee.test.ts`, `db-sqlite.test.ts`, new resolver/cache tests. Copy stays pt-BR.
- No new npm dependencies. Open Platform partner credentials are not added in this change.
