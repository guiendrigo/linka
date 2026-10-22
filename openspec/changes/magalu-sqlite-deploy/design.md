# Design

## Context

See proposal.md for motivation. Today `getSql()` is Neon (`pg` + `DATABASE_URL`) or in-memory PGLite; Better Auth uses `Pool` or a Kysely PGLite dialect and falls back to the Grok preview OAuth client when `GROK_AUTH_*` is missing; Nitro builds with `preset: "vercel"`; there is no Dockerfile. Magalu production cannot use that path. Preview on Grok must keep working.

## Goals / Non-Goals

**Goals:**

- One `getSql()` surface with a third backend selected by `SQLITE_PATH`.
- SQLite-dialect schema and migrator that never run against Postgres, and Postgres migrations that never run against SQLite.
- Better Auth on the same SQLite file; email/password only unless real broker creds exist.
- Docker image + Compose unit that other Magalu projects can sit beside.
- Keep the Grok/Vercel preset and PGLite preview as the default when Magalu env is absent.

**Non-Goals:**

- Cloudflare Workers, Containers, D1, or Hyperdrive.
- Dumping Neon into SQLite.
- Google/X OAuth apps owned by Linka.
- SQLite for `npm run dev` / Grok preview (PGLite stays).
- Taking over the VM's 80/443 or replacing an existing reverse proxy.
- Rewriting Better Auth from scratch.

## Decisions

### 1. Three backends, `SQLITE_PATH` first

Selection order: non-empty `SQLITE_PATH` → better-sqlite3 file; else non-empty `DATABASE_URL` → `pg`; else in-memory PGLite.

**Why:** Magalu must not fall through to RAM. Preview must not require SQLite. Neon can remain until Vercel is retired.

**Rejected:** SQLite everywhere (breaks Grok PGLite bootstrap). PGLite `dataDir` (operator asked for literal SQLite).

### 2. better-sqlite3, not `node:sqlite`

Better Auth documents `new Database("file.sqlite")` from `better-sqlite3`. Use a `node:22-bookworm-slim` image so the linux x64 prebuild loads. Enable `PRAGMA foreign_keys = ON`, `journal_mode = WAL`, `busy_timeout = 5000` on every connection. Wrap the sync driver in the existing async `Sql` tagged template; convert `$1` placeholders to `?` only on the SQLite runner.

**Rejected:** `node:sqlite` (still RC). libsql. Compiling native addons on Alpine.

### 3. Separate `migrations/sqlite/` tree

Postgres files stay for Neon/PGLite. SQLite gets its own ordered files (`0001_auth.sql` generated for the Better Auth sqlite adapter, `0002_linka.sql` with text timestamps, integer booleans, and `checked_at` already on `offers`). `_migrations` keys by basename. `scripts/migrate.mjs` branches on env; Docker entrypoint runs migrate then the Node server. Image build does not require a database.

**Rejected:** One SQL dialect for both engines. Translating Postgres SQL at runtime.

### 4. Timestamps from JavaScript

Replace SQL `now()` in `store.server.ts` with `${new Date().toISOString()}`. Keep `ON CONFLICT DO UPDATE` and `RETURNING` (supported by modern SQLite shipped with better-sqlite3). `asBool` already accepts `1`.

**Rejected:** Dual SQL strings per query. A query builder rewrite.

### 5. Auth: cut the preview-client fallback

If both `GROK_AUTH_CLIENT_ID` and `GROK_AUTH_CLIENT_SECRET` are set, keep today's genericOAuth broker plugin (Grok preview). Otherwise Better Auth is email/password only against the active database, with `database: new Database(sqlitePath)` when `SQLITE_PATH` is set. Magalu sets `BETTER_AUTH_URL` and `BETTER_AUTH_SECRET`. Login/gates render `GROK_PROVIDERS` only when social is configured — expose that with a small client-safe flag (build-time `VITE_SOCIAL_LOGIN` or equivalent derived from the same condition), not by rewriting the frozen provider list in preview.

**Rejected:** Leaving the preview client as default (would hit `auth.grok.me` on Magalu). Implementing Google/X in this change.

### 6. Nitro preset via `NITRO_PRESET`

`vite.config.ts` uses `node_server` only when `NITRO_PRESET=node_server`; otherwise `vercel`. Dockerfile sets the env for `vite build` and skips `db:migrate` at build (entrypoint migrates). Process: `HOST=0.0.0.0 PORT=3000 node .output/server/index.mjs`.

**Rejected:** Replacing the vercel preset globally (breaks Grok deploy). A second Vite config file.

### 7. Compose beside existing Magalu apps

Project name `linka`. Service `app` exposes 3000 on the compose network only. Named volume `linka-data` → `/data`, `SQLITE_PATH=/data/linka.sqlite`. Optional `cloudflared` service with a tunnel token if the VM has no proxy yet; if nginx/Caddy/Traefik already owns 443, omit cloudflared and add a vhost to `http://app:3000`. Dedicated hostname required (`__Host-` cookies). Runbook: Cloudflare cache bypass for `/r/*` and `/api/*`.

**Rejected:** Binding 80/443. Cloudflare Containers. Putting Postgres in the same compose file.

## Risks / Trade-offs

- [SQLite single-writer] → WAL + busy_timeout; validation traffic is low. Revisit Postgres if write contention appears.
- [better-sqlite3 native addon] → Debian slim + prebuild; pin Node 22 in the image.
- [Dual migration trees drift] → App SQL stays dialect-neutral; schema changes require a file in each tree when both backends matter.
- [Auth `server.ts` is platform-frozen] → Minimal env gate only; do not restyle the rest of the file.
- [Empty production DB] → Accept for validation; no Neon import in this change.
- [CDN caches 302s] → Runbook + cache bypass; keep `no-store` on `/r/$code`.
- [Volume permissions] → Run the process as a non-root user that owns `/data`.

## Migration Plan

1. Land code: sqlite backend, auth gate, nitro flag, image, compose, runbook.
2. Staging hostname on Magalu: empty volume, email sign-up, one product, `/r/code`, `compose restart`, data still there, health 200.
3. Cloudflare DNS/Tunnel (or existing proxy) to staging; confirm cache bypass.
4. Cut public hostname to the same stack. Leave Vercel until DNS is confirmed, then disable it on that domain.
5. Rollback: point DNS back to Vercel. Magalu SQLite is independent; it does not write to Neon.

## Open Questions

- Whether Magalu already has a reverse proxy (omit `cloudflared`) or needs a tunnel in this compose file — resolved at deploy time from the VM, not by this design.
