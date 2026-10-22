# Tasks

## 1. SQLite store

- [x] 1.1 Add `better-sqlite3` (and its types) to `dependencies` and verify `npm install` succeeds
- [x] 1.2 Add `migrations/sqlite/0001_auth.sql` generated for the Better Auth sqlite adapter (integer booleans, text timestamps) and verify it is not a copy of `migrations/0001_auth.sql`
- [x] 1.3 Add `migrations/sqlite/0002_linka.sql` with `shopee_credentials`, `products`, and `offers` (including `checked_at` text) using SQLite types, and verify it contains no `timestamptz` or `now()`
- [x] 1.4 Extend `scripts/migrate.mjs` so `SQLITE_PATH` applies only `migrations/sqlite/`, `DATABASE_URL` still applies Postgres files, and neither set skips; verify by running it against a temp sqlite file twice (second run applies 0 files)
- [x] 1.5 Add the SQLite backend to `getSql()` (`SQLITE_PATH` first, then `DATABASE_URL`, then PGLite), enable `foreign_keys`, WAL, and `busy_timeout`, convert `$n` to `?` only on that runner, and verify a unit test covers the three-way selection plus placeholder conversion
- [x] 1.6 Apply SQLite migrations inside `ensureDbReady` / first `getSql()` when `SQLITE_PATH` is set so traffic is not served before schema exists, and verify a missing file is created with `_migrations` populated

## 2. Dialect-safe app SQL

- [x] 2.1 Replace every SQL `now()` in `store.server.ts` with an ISO timestamp parameter from JavaScript and verify `rg "now\\(\\)" src/lib/linka` returns no SQL `now()`
- [x] 2.2 Add or extend a store/db test that upserts credentials and deletes a product with offers on SQLite, and verify `updated_at` is the supplied timestamp and offers cascade-delete

## 3. Credential auth

- [x] 3.1 Gate Grok genericOAuth so it loads only when both `GROK_AUTH_CLIENT_ID` and `GROK_AUTH_CLIENT_SECRET` are set; otherwise do not use the preview client or `auth.grok.me`, and verify a unit test that unset broker env yields no social providers
- [x] 3.2 When `SQLITE_PATH` is set, pass a `better-sqlite3` Database into Better Auth (same file as `getSql()`), and verify email/password sign-up persists a row in that file
- [x] 3.3 Expose a client-safe flag for social login and hide Google/X in login and gates when it is off; verify `/login` HTML has email/password and no Google/X labels when the flag is false, and still shows them when broker creds are present
- [x] 3.4 Document Magalu env (`BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `SQLITE_PATH`) in the deploy runbook task group — skip extra docs here; verify trustedOrigins include `BETTER_AUTH_URL` when it is set by reading the auth config test or a focused assertion

## 4. Node container

- [x] 4.1 Gate Nitro `preset` on `NITRO_PRESET`: `node_server` only when that value is set, otherwise `vercel`, and verify `vite.config.ts` still uses `vercel` when the env is unset
- [x] 4.2 Add a multi-stage `Dockerfile` (`node:22-bookworm-slim`) that builds with `NITRO_PRESET=node_server`, does not run `db:migrate` at build, and starts with migrate-then-`node .output/server/index.mjs` on `HOST=0.0.0.0 PORT=3000`; verify `docker build` succeeds
- [x] 4.3 Add `docker-compose.yml` project `linka` with `app` exposing 3000 on the compose network only, volume `linka-data` → `/data`, `SQLITE_PATH=/data/linka.sqlite`, and no host 80/443; include a commented optional `cloudflared` service (do not assume the VM needs it); verify compose config shows no `80:80` or `443:443`
- [x] 4.4 Add `docs/magalu-cloudflare.md` covering dedicated hostname, `__Host-` cookies, cache bypass for `/r/*` and `/api/*`, Tunnel vs existing reverse proxy, empty SQLite cutover, and rollback to Vercel; verify the runbook names those bypass paths

## 5. Integration

- [x] 5.1 Run `npm run typecheck` and `npm run lint` and verify both exit 0
- [x] 5.2 Boot the image (or `NITRO_PRESET=node_server` output) with `SQLITE_PATH` on a temp volume, hit `GET /api/health` (200 + `ok: true`), create an email user and a product, restart, and verify the product and session still exist
- [x] 5.3 Request `/r/<code>` for that product and verify 302 plus `cache-control: no-store`
- [x] 5.4 Run `npm run build` without `NITRO_PRESET` and verify it still targets the vercel preset (Grok path intact)
