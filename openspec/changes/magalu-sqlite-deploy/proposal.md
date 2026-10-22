# Proposal

## Why

Linka production today is a Vercel/Nitro function talking to Neon and federating Google/X through the Grok auth broker. That stack cannot run on the Magalu Cloud VM that already hosts the rest of the operator's apps, and it is heavier than a product still in validation needs. The app must become a long-lived Node process with a SQLite file on disk, Better Auth as the local identity provider, and Cloudflare only as DNS/TLS in front of that VM.

## What Changes

- Add a **literal SQLite** backend (`better-sqlite3`) selected by `SQLITE_PATH`. Neon (`DATABASE_URL`) and in-memory PGLite remain for the Grok preview/Vercel path.
- Add a SQLite migration tree and apply it at process start when `SQLITE_PATH` is set. Do not apply Postgres migrations to SQLite.
- Replace SQL `now()` in app queries with timestamps supplied by the application so the same statements work on SQLite and Postgres.
- Use Better Auth against the SQLite file. Email/password is the production sign-in method.
- **BREAKING** (Magalu/production): stop falling back to the Grok preview OAuth client when `GROK_AUTH_*` is unset. Google/X buttons are hidden until real social credentials exist.
- Add a Docker image that builds with Nitro `node_server` only when `NITRO_PRESET=node_server`. Default local/Grok builds stay on the `vercel` preset.
- Add a Compose stack that runs the app on an internal port, mounts `/data` for the SQLite file, and does not bind 80/443 (those belong to other projects on the VM).
- Document Cloudflare in front of the VM (Tunnel or existing reverse proxy) and a cache bypass for `/r/*` and `/api/*`.
- Production starts with an empty SQLite file. No Neon dump.

## Capabilities

### New Capabilities

- `sqlite-store`: Persistence when `SQLITE_PATH` is set — SQLite file, SQLite schema, start-time migrations, WAL/foreign keys, and dialect-safe app SQL.
- `credential-auth`: Better Auth as the identity provider — email/password without the Grok broker, no preview-client fallback, social UI only when broker credentials are actually configured.
- `node-container`: Long-lived Node server image and Compose unit for the Magalu VM — `node_server` preset, health check, data volume, internal port only.

### Modified Capabilities

- (none)

## Impact

- `src/lib/db.ts`, `scripts/migrate.mjs`, and a new `migrations/sqlite/` tree.
- `src/lib/linka/store.server.ts` (timestamps; placeholders stay behind `getSql()`).
- `src/lib/auth/server.ts`, login/gates UI, Better Auth SQLite adapter (`better-sqlite3`).
- `vite.config.ts` Nitro preset gated by `NITRO_PRESET`.
- New `Dockerfile`, `docker-compose.yml`, and Magalu/Cloudflare runbook. No change to public route contracts (`/`, `/login`, `/r/$code`, `/api/r/$code`, `/api/health`).
