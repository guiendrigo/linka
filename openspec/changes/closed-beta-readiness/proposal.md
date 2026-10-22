# Proposal

## Why

Linka already has the closed-beta loop (conta, produto, backups, `/r`, bio), but the public pitch still talks as if Shopee conferisse estoque sozinha, a página de esgotado vaza comissão, e a Magalu não prova que o SQLite está de pé nem copia o arquivo para fora da VM. Sem a chave Affiliate, dá para convidar ~10 afiliados se o produto for honesto e a operação não apagar as contas.

## What Changes

- Treat **estoque marcado na mão** as the beta path. Automatic catalog checks stay in the code and stay off until both platform env values exist. Do not wait on Shopee approval to invite testers.
- Public home and Links copy MUST NOT claim that stock updates itself while automatic checks are off. Offer URL fields warn that `shope.ee` / short links without shop and item ids are not auto-checked.
- Public `/r/<code>` sold-out / blocked pages show title and price only — **no commission**. The home simulator may still show commission.
- `?on=` stock override applies only to the hardcoded demo code (`serum-c`). Stored products ignore it.
- `/api/r/<code>` uses the same stock-freshen path as `/r/<code>` (no-op today without the key; same decision when the key arrives).
- `GET /api/health` stays public, but MUST NOT report `ok: true` when Magalu SQLite cannot be opened or queried. Docker healthcheck already keys off HTTP success.
- Magalu runbooks (`migracao.md`, `docs/magalu-cloudflare.md`) require Cloudflare bypass for `/p/*` as well as `/r/*` and `/api/*`. Caddy already sends `Cache-Control: no-store` for those paths.
- Add a SQLite backup script in the image and document a host cron that copies the dump **off the VM**. Recreating the container must not be the only copy.

Ships on Magalu (`docker compose -p linka`). Vercel/Nitro preview is not the production gate.

## Capabilities

### New Capabilities

- `smart-link`: Public resolution of a product code on `/r/<code>` and `/api/r/<code>` — first in-stock HTTPS offer, sold-out page without owner-private fields, demo stock override only on the demo catalog code.

- `workspace-stock`: Signed-in Links tells the owner whether stock is manual or automatic, never asks for an Affiliate App ID, and warns that short links without shop/item ids stay on the marked flag.

### Modified Capabilities

- `node-container`: Health MUST fail when the Magalu SQLite file cannot be used. Edge-cache bypass documentation MUST include `/p/*`. Operators MUST have a scheduled off-VM copy of the SQLite file.

## Impact

- Routes: `/`, `/r/$code`, `/api/r/$code`, `/api/health`. Bio `/p/$code` contract unchanged; only cache docs catch up.
- Client: `workspace.tsx`, `index.tsx` public pitch, maybe `PROGRESS.md` (pt-BR).
- Server: `resolve.functions.ts`, `src/routes/api/r/$code.ts`, `src/routes/r/$code.tsx`, `src/routes/api/health.ts`.
- Ops: `scripts/` backup helper, `migracao.md`, `docs/magalu-cloudflare.md`. No new npm packages. No schema / migrations.
- Existing automatic-stock code (`stock-check.server.ts`, platform env) is not rewritten; it remains dormant without the key.

## Out of scope

- Filling `SHOPEE_AFFILIATE_APP_ID` / `SHOPEE_AFFILIATE_SECRET` (operator step when Shopee emails the key).
- Conversational search, click counts, dashboard, PWA, billing, free-account limits.
- Password reset, email verification, ToS / LGPD pages (no mailer; Google login already exists when Magalu secrets are set).
- Resolving `shope.ee` to shop/item ids.
- Cron inside the app process for stock.
- Archiving `platform-shopee-affiliate` (process hygiene, not this change).
- Removing the `serum-c` demo catalog.
