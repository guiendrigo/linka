# Linka — agent guide

Linka is a Shopee affiliate smart-link app with a Portuguese (pt-BR) UI. A
signed-in user stores a product with one primary offer and up to three backups;
the public link `/r/<code>` redirects to the first in-stock HTTPS offer.
`/api/r/<code>` returns the same decision as JSON. Visitors never need an
account.

`PROGRESS.md` tracks product status and backlog in Portuguese. Its
"O que ainda não existe" section is a scope boundary: natural-language search,
payments, a dashboard, an installable PWA, and click counts are not implemented.
Verify against code before claiming a feature exists.

## Commands

- `npm install` — required in a fresh checkout; `node_modules/` is not committed.
- `npm run dev` — dev server on `0.0.0.0:8080`. **Always use this, never `vite` /
  `npx vite` directly**: `scripts/with-app-env.mjs` loads `.grok/app-env.json`,
  and bypassing it makes dev and the next build disagree about auth.
- `npm run typecheck` — `tsc --noEmit`.
- `npm run lint` / `npm run format`.
- `npm run build` — Vite build, then `db:migrate`. Without `DATABASE_URL` the
  migration step is skipped; with it, pending `migrations/*.sql` are applied.
- `npm test` — script tests plus a fixed list of TS tests. Read "Test state"
  below before using it as a verdict.
- Single test: `node --test scripts/<name>.test.mjs`, or
  `node --experimental-strip-types --test src/lib/linka/<name>.test.ts`.
- `npm run check:auth` — with the dev server up; exit 0 = dev and the next build
  agree on `VITE_AUTH_ENABLED`, 1 = diverged, 2 = could not observe.
- `npm run preview:restart` — serve built output on `127.0.0.1:8081`
  (Linux sandbox only; see "Platform contract").

## Routes and entrypoints

| Route | Notes |
| --- | --- |
| `/` | Public pitch + simulator (`Bench`) and the signed-in workspace. |
| `/login` | Google, X, and local email/password. |
| `/r/$code` | Public. 302 to the first in-stock HTTPS offer; sold-out page otherwise. |
| `/api/r/$code` | Public JSON version of the same resolution, without secrets. |
| `/api/auth/$` | Better Auth handler. |
| `/api/health` | Health check. |

## Architecture

- TanStack Start file routes live in `src/routes`. `src/routeTree.gen.ts` is
  generated — edit routes, not the generated tree.
- Server-only modules use `*.server.ts`; client-callable handlers use
  `*.functions.ts`. Handlers are `createServerFn(...).validator(...)` and
  dynamically import server modules inside the handler. Keep that split so `pg`,
  Better Auth internals, and the Shopee secret never enter the client bundle.
- `src/router.tsx` must keep the named `getRouter()` export,
  `previewPathRewrite()`, and `defaultErrorComponent`; the TanStack Start plugin
  rejects a default or differently-shaped router.
- Keep `<PreviewHostBridge />` and `<AuthProvider>` mounted in `__root.tsx`.
- `src/lib/app-data/` is pre-wired connector tooling; Linka has no connector
  data flow. Ignore it unless the task adds one.
- `.vercel/output/` is a committed build artifact; don't edit it by hand.

## Auth and data

- Auth is **ON** in this app. `.grok/app-env.json` has no `VITE_AUTH_ENABLED`
  key, and absence means on (`import.meta.env.VITE_AUTH_ENABLED !== "false"`).
  `emailAndPasswordEnabled` is true; Google/X come from `GROK_PROVIDERS`.
- `src/lib/auth/server.ts` is pre-wired platform code; don't rewrite it. Toggle
  local email/password only in `email-password.ts`; add providers in
  `providers.ts`.
- Every per-user server function uses `authMiddleware` and scopes every query by
  the verified `context.userId`. Never accept a user id from the client.
- `/r/$code` and `/api/r/$code` are intentionally public. Don't add auth there.
- In the live preview, Better Auth authenticates with a bearer token from
  `sessionStorage`; `authMiddleware` forwards it. Sign out with `signOut()` from
  `@/lib/auth/client`, never `authClient.signOut()` directly.
- Never create `src/routes/auth/popup.tsx`; the Vite plugin serves
  `/auth/popup` for the preview popup flow.
- `@/lib/db` is server-only. `DATABASE_URL` selects Neon; absent/empty selects
  embedded PGLite.
- PGLite is in-memory and resets when the dev server restarts, so preview
  accounts, products, and Shopee credentials disappear. That is expected, not a
  database bug.
- Schema lives only in `migrations/*.sql`. Add app tables as
  `migrations/000N_*.sql`; PGLite applies them at startup and `npm run build`
  applies them to Neon. `migrations/auth/0001_auth.sql` is the source and
  `migrations/0001_auth.sql` must stay a byte-identical copy of it.
- The Shopee secret is stored server-side and must never reach the client.
  `WorkspaceView` exposes only `appId`; don't log the secret or put it in
  `VITE_*`.

## Link and stock rules

- `resolveSmartLink` is the single decision function: the first `inStock` offer
  wins; none -> `all_out`; no offers -> `empty`.
- `redirectTarget` only allows `https://` URLs with no whitespace or embedded
  credentials. Keep that gate.
- `/r/$code` redirects with 302 and `cache-control: no-store`; keep it no-store
  so every visit re-evaluates stock.
- `?on=a,b` is a deliberate demo override (`withStock`) used by the home
  simulator. It is not persisted; don't confuse it with real stock.
- `src/lib/linka/catalog.ts` (`serum-c`) is hardcoded demo data and a fallback
  when a code is not in the database. User products live in `products` /
  `offers`.
- Stock checks only run for Shopee URLs containing shop/item ids; short links
  without ids are skipped. Results are fresh for 15 minutes
  (`STOCK_FRESH_MS`), at most 8 items are looked up per run (`LOOKUP_CAP`), and
  auth/network failures preserve the existing manual stock. A manual toggle
  clears `checked_at`, making the next check due.

## UI

- Keep new Linka copy in pt-BR. Prices use BRL with comma decimals (`formatBrl`,
  `parseBrlToCents`).
- Dark-theme tokens live in `src/styles.css` (`bg-bg`, `text-fg`, `text-muted`,
  `bg-surface`, `shadow-ring`, `text-primary`). Use tokens instead of raw hex
  values, and check mobile at 390×844.
- The platform's sign-out labels remain English; that exception is noted in
  `PROGRESS.md`.

## Platform contract (Grok App Builder)

- The preview expects the app on `0.0.0.0:8080`. In the Linux sandbox,
  `/workspace/startup.sh` is the revive entrypoint: keep it idempotent, bound to
  `npm run dev`, and leave the server running.
- When this repo is checked out outside `/workspace` (for example a local macOS
  clone), the sandbox scripts fail: `startup.sh` does `cd /workspace`,
  `scripts/preview.mjs` reads `/proc`, and `scripts/browser-smoke.mjs` only
  allows screenshots under `/workspace`. Run `npm run dev` and Playwright
  directly there instead of "fixing" the platform scripts.
- Keep platform chrome: `grokPwaPlugin()`, `server/middleware/grok-pwa.ts`,
  `public/__grok/`, `scripts/grok-pwa-*`, and `<PreviewHostBridge />`. Don't
  strip the "Created with Grok" pill, add its script yourself, or add a CSP that
  blocks `https://grok.com`. Branding changes are project settings, not code.
- Keep the `vite.config.ts` contracts: dev `0.0.0.0:8080`, preview
  `127.0.0.1:8081`, `nitro({ preset: "vercel", serverDir: "./server" })`, and
  `grokPwaPlugin()`.
- Deployment is Vercel with `npm install --omit=dev` (`vercel.json`). Anything
  imported at build/runtime must be in `dependencies`; never add an imported
  package with `-D`. Never commit a `.env`; the platform injects
  `DATABASE_URL` and auth vars.
- Don't add `og:*` / `twitter:card` tags manually to `__root.tsx`; the platform
  injector owns them. App identity is `src/lib/og/site.json` + `public/og.jpg`.
- Auth/database are already enabled for this app. Don't add new migrations,
  auth providers, or storage mechanisms unless the task actually requires them.

## Verification

- Before calling work done: `npm run typecheck`, `npm run lint`, `npm run build`.
- Dev smoke: `node scripts/browser-smoke.mjs http://127.0.0.1:8080/ screenshots/<name>.png`
  (sandbox only).
- Built-output smoke: `npm run preview:restart`, then
  `node scripts/browser-smoke.mjs http://127.0.0.1:8081/ screenshots/<name>.png --baseline screenshots/<dev-verdict>.json`.
- Inspect both desktop and mobile screenshots; require visible content and no
  console/page errors. On macOS use Playwright directly.

## Test state

- `npm test` is not green currently. Thirteen template-ownership assertions fail
  in the script phase, so the TS phase never runs. They expect the untouched
  starter (`VITE_AUTH_ENABLED=false`, no app migrations, no baked OG identity);
  Linka intentionally differs. Don't revert auth, migrations, or `site.json` to
  make them pass; update the expectations only when test hygiene is the task.
- Linka's own unit tests are not included in `npm test` and do pass:
  `node --experimental-strip-types --test src/lib/linka/input.test.ts src/lib/linka/resolve.test.ts src/lib/linka/shopee.test.ts`
- `src/lib/app-data/app-data.test.ts` and
  `src/lib/auth/gate-identity.test.ts` need dependencies installed; they fail
  with module-not-found in a bare checkout.

## Reference docs

- `.grok/references/data-and-auth.md` — auth/database wiring.
- `.grok/references/deploy-target.md` — Vercel build constraints.
- `.grok/references/browser-qa.md` — browser verification.
- `.grok/references/hibernate-revive.md` — sandbox restart contract.
- `.grok/skills/*/SKILL.md` — platform design/auth/database guidance.
