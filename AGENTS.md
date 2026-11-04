# Linka — agent guide

Linka is a Shopee affiliate smart-link app with a Portuguese (pt-BR) UI. A
signed-in user stores a product with one primary offer and up to three backups;
the public link `/r/<code>` redirects to the first in-stock HTTPS offer.
`/api/r/<code>` returns the same decision as JSON. Visitors never need an
account.

**Production is Magalu** (Docker, SQLite at `SQLITE_PATH`, host
`linka.guiendrigo.com`). Dev on Mac uses the same SQLite tree with a local file
(e.g. `SQLITE_PATH=./.local/linka.sqlite`). There is no Neon, PGLite, or Vercel
target — see `docs/adr/0002-magalu-sqlite-unico.md`.

`PROGRESS.md` tracks product status and backlog in Portuguese. Its
"O que ainda não existe" section is a scope boundary. RevenueCat billing
(Anual/Mensal, entitlement `linka_pro`) lives on `/plano` behind
`VITE_BILLING_ENABLED=true` (off by default). Verify against code before
claiming a feature exists.

## Commands

- `npm install` — required in a fresh checkout; `node_modules/` is not committed.
- `npm run dev` — dev server on `0.0.0.0:8080` via `scripts/with-app-env.mjs`.
  Requires `SQLITE_PATH` in `.env` (never `/data/...` on the Mac host).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run lint` / `npm run format`.
- `npm run build` — Vite + Nitro `node_server`, then `db:migrate` when
  `SQLITE_PATH` is set.
- `npm run test:linka` — Linka unit tests (`src/lib/linka/*.test.ts`).
- Magalu image: `docker compose -p linka build` (or `up -d --build`). Do not
  treat `npm run build` alone as the Magalu gate.

## Routes and entrypoints

| Route | Notes |
| --- | --- |
| `/` | Public pitch + simulator (`Bench`) and the signed-in workspace. |
| `/login` | Native Google (when secrets set) and local email/password. |
| `/r/$code` | Public. 302 to the first in-stock HTTPS offer; sold-out page otherwise. |
| `/p/$code` | Public bio page (list + Ver oferta). `/p/$code/photo` serves the avatar. |
| `/api/r/$code` | Public JSON version of the same resolution, without secrets. |
| `/api/auth/$` | Better Auth handler. |
| `/api/health` | Health check (SQLite `select 1`). |

## Architecture

- TanStack Start file routes live in `src/routes`. `src/routeTree.gen.ts` is
  generated — edit routes, not the generated tree.
- Server-only modules use `*.server.ts`; client-callable handlers use
  `*.functions.ts`. Handlers are `createServerFn(...).validator(...)` and
  dynamically import server modules inside the handler so Better Auth internals
  and the Shopee secret never enter the client bundle.
- `src/router.tsx` must keep the named `getRouter()` export,
  `previewPathRewrite()`, and `defaultErrorComponent`.
- Keep `<AuthProvider>` mounted in `__root.tsx`.
- UI is HTML + Tailwind v4 + tokens in `src/styles.css` (no Astryx / shadcn).

## Auth and data

- Auth is **ON**. Email/password is enabled; native Google when
  `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` are set. Do not set `GROK_AUTH_*`
  on Magalu.
- Every per-user server function uses `authMiddleware` and scopes every query by
  the verified `context.userId`. Never accept a user id from the client.
- `/r/$code` and `/api/r/$code` are intentionally public.
- Sign out with `signOut()` from `@/lib/auth/client`.
- `@/lib/db` is server-only and **requires** `SQLITE_PATH`. Schema lives only in
  `migrations/sqlite/*.sql`. Auth tables are `migrations/sqlite/0001_auth.sql`.
- The Shopee Affiliate App ID/secret live in server env
  (`SHOPEE_AFFILIATE_APP_ID`, `SHOPEE_AFFILIATE_SECRET`), never per user and
  never in `VITE_*`. Don't log the secret.

## Link and stock rules

- `resolveSmartLink` is the single decision function: the first `inStock` offer
  wins; none -> `all_out`; no offers -> `empty`.
- `redirectTarget` only allows `https://` URLs with no whitespace or embedded
  credentials.
- `/r/$code` redirects with 302 and `cache-control: no-store`.
- `?on=a,b` is a deliberate demo override for the home simulator only.
- Stock checks only run for Shopee URLs containing shop/item ids; short links
  without ids are skipped. Results are fresh for 15 minutes (`STOCK_FRESH_MS`).
  Never use Affiliate `offerLink` / short links.

## UI

- Keep new Linka copy in pt-BR. Prices use BRL with comma decimals (`formatBrl`,
  `parseBrlToCents`).
- Dark-theme tokens live in `src/styles.css` (`bg-bg`, `text-fg`, `text-muted`,
  `bg-surface`, `shadow-ring`, `text-primary`). Use tokens instead of raw hex
  values, and check mobile at 390×844.

## Magalu deploy

- Production: `/opt/linka`, Compose project `linka`, Caddy
  `linka.guiendrigo.com`. See `.agents/skills/linka-prod-deploy/SKILL.md`.
- Image builds with `NITRO_PRESET=node_server`. Entrypoint runs
  `migrations/sqlite/` then the Node server on port 3000.
- Backup the SQLite volume before schema-changing deploys.
- Never run `npm run dev` on the Magalu host with `SQLITE_PATH=/data/...`
  (container volume → `EACCES` on the host).

## Verification

- Before calling work done: `npm run test:linka`, `npm run typecheck`,
  `npm run lint`, and `docker compose -p linka build` for Magalu-bound work.
- Smoke: `GET /api/health`, login, `/r/<code>`, `/p/<code>`.

## Reference

- `CONTEXT.md` — domain glossary.
- `docs/adr/` — architecture decisions.
- `.agents/skills/linka-*/SKILL.md` — Magalu schema, Start contracts, verify, deploy.
