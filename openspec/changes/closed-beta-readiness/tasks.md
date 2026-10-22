# Tasks

## 1. Public resolution

- [x] 1.1 Extract a server helper that validates the code, calls `freshenStoredStock` (swallow Shopee errors), then `findStoredLink` ?? `findLink` and `resolveSmartLink`; wire `resolveCode` and `GET /api/r/$code` to it; verify `/api/r/serum-c` still 200s without commission in JSON and a unit test asserts the helper invokes freshen before read
- [x] 1.2 Apply `withStock` in `/r/$code` only when the code is `DEMO_CODE`; verify a resolve/unit test that `serum-c` honors `?on=` and a stored-code fixture ignores `?on=`
- [x] 1.3 Remove commission from `VisitorPage` (keep title and BRL price); verify the sold-out markup has no `%` / `commissionPct` while `Bench` still shows the teaching commission line

## 2. Honest stock copy

- [x] 2.1 Rewrite public home `STEPS` / pitch so they describe backup from marked stock and never say stock resolves itself from Shopee; verify `src/routes/index.tsx` has no “se resolve sozinho” (or equivalent) claim
- [x] 2.2 On Links, when `canCheck` is false, show a pt-BR note that the owner marks stock and the click still uses those flags; verify the note renders in `workspace.tsx` and never mentions App ID or secret
- [x] 2.3 Add a pt-BR short-link warning on the offer URL fields (new and edit) that `shope.ee` without shop/item code is not auto-checked; verify a `shope.ee` https URL still saves via existing `cleanProduct` and the warning is visible in the panel
- [x] 2.4 Update `PROGRESS.md` in pt-BR: beta path is manual stock, automatic waits on platform env, short links still skipped; verify “O que ainda não existe” does not claim search, dashboard, PWA, clicks, or billing as done

## 3. Health

- [x] 3.1 Change `GET /api/health` to `select 1` through `getSql()`; 200 `{ ok: true, service: "linka" }` on success, 503 `{ ok: false }` on failure, no auth, no secrets in the body; verify a unit test of the probe helper returns ok on a temp `SQLITE_PATH` and not-ok when the path cannot be queried

## 4. Backup and runbooks

- [x] 4.1 Add `scripts/backup-sqlite.mjs` that requires `SQLITE_PATH`, uses better-sqlite3 `.backup()` into `/data/backups/linka-<iso>.sqlite` (or the directory of `SQLITE_PATH` + `/backups` when testing); verify `node --test` (or a small `scripts/backup-sqlite.test.mjs`) against a temp file produces a second readable sqlite with the same tables
- [x] 4.2 Replace the manual backup snippet in `migracao.md` with: daily host cron (`docker compose -p linka exec -T app node /app/scripts/backup-sqlite.mjs` then `docker cp` to `/opt/linka-backups/`), copy that directory off the VM, and a warning that `down -v` destroys accounts; verify the section names `/p/` cache bypass together with `/r/` and `/api/`, and the checklist includes `/p/` plus an off-VM backup box
- [x] 4.3 Align `docs/magalu-cloudflare.md` cache bypass with `/r/*`, `/p/*`, `/api/*` (already listed) and point backup at the same cron; verify both runbooks name all three prefixes

## 5. Magalu gate

- [x] 5.1 Run `npm run test:linka`, `npm run typecheck`, and `npm run lint` and verify all three exit 0
- [x] 5.2 Run `docker compose -p linka up -d --build` and verify the `app` container is healthy and `https://linka.guiendrigo.com/api/health` returns 200 `{ "ok": true, ... }`
- [x] 5.3 Smoke `https://linka.guiendrigo.com/`: signed-out home does not promise live Shopee catalog, `/r/serum-c` still redirects or shows sold-out without commission in the HTML, `/login` still offers email/password; do not require Affiliate env

## Workflow follow-up

- Archive the change after review so `smart-link` and `workspace-stock` land in `openspec/specs/` and `node-container` is synced.
- After Shopee emails the platform App ID/secret, add both to the Magalu host `.env` and recreate the `app` container — that is not this change.
- Do not treat `npm test` as a gate: template-ownership assertions still fail on purpose.
