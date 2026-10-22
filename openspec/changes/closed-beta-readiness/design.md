# Design

## Context

See proposal.md for motivation. Magalu is production: Compose project `linka`, SQLite at `SQLITE_PATH=/data/linka.sqlite`, Caddy already sends `Cache-Control: no-store` for `/r/*`, `/p/*`, `/api/*`. Automatic stock already no-ops without both Affiliate env values (`resolveAffiliateCredential`). No schema change.

`/r/$code` already 302s through `resolveSmartLink` + `redirectTarget`. The sold-out view still prints `commissionPct`. `withStock` applies `?on=` to every code. `/api/r/$code` skips `freshenStoredStock`. `/api/health` always returns `{ ok: true, stage: "foundation" }`. `migracao.md` cache bypass omits `/p/*`. Backup is a manual snippet, not a scheduled off-VM copy.

## Goals / Non-Goals

**Goals:**

- One public resolution path for HTML and JSON.
- Visitor HTML never shows commission; demo `?on=` cannot steer a stored product.
- Honest pt-BR copy while automatic stock is off; short-link warning in the product form.
- Health fails the Docker probe when Magalu SQLite cannot be queried.
- A backup script in the image plus a host cron in the Magalu runbook.

**Non-Goals:**

- Rewriting `decideStock` / Affiliate GraphQL.
- In-process cron for stock or backups.
- Object storage, S3 SDK, or a Compose sidecar.
- New tables or migrations (both trees stay untouched).

## Decisions

### 1. Gate `?on=` on the demo code, keep `withStock`

In `/r/$code` loader, call `withStock` only when `params.code === DEMO_CODE`. Stored products keep persisted flags.

Alternative: delete `?on=` entirely. Rejected because the home `Bench` copies `/r/serum-c?on=…` as the teaching control.

### 2. Share freshen + lookup between `/r` and `/api/r`

Move the body of `resolveCode` (validate → `freshenStoredStock` in try/catch → `findStoredLink` ?? `findLink` → `resolveSmartLink`) into a server helper used by the server fn and by `src/routes/api/r/$code.ts`. Do not invoke the TanStack `createServerFn` from the raw GET handler.

`toPublic` stays as-is (no commission, no secrets). Without the Affiliate key, freshen is a no-op (`not_configured`); the extra call is cheap.

### 3. Strip commission in the visitor component, not in `SmartLink`

Keep `commissionPct` on the stored model and in the signed-in workspace. `VisitorPage` / `MissingLink` render title and optional BRL price only. `Bench` may keep the commission teaching line.

### 4. Health pings the live store

`GET /api/health` runs `getSql()` then `select 1` (SQLite, Neon, or PGLite). Success: 200 `{ ok: true, service: "linka" }`. Failure: 503 `{ ok: false }` so Compose `r.ok` restarts. Unauthenticated. Do not log paths or secrets.

Alternative: only probe when `SQLITE_PATH` is set. Rejected — a dead Neon/PGLite would still look healthy. Spec requires the SQLite failure case; probing every backend is a superset.

### 5. Backup is `better-sqlite3` `.backup()` plus host cron

Add `scripts/backup-sqlite.mjs`: open `SQLITE_PATH`, `.backup()` to `/data/backups/linka-YYYYMMDDTHHMMSS.sqlite`. Image already copies `scripts/`. Magalu cron on the **host** (not in the Node process):

1. `docker compose -p linka exec -T app node /app/scripts/backup-sqlite.mjs`
2. `docker cp` the new file to a directory on the VM that is not the Compose volume (e.g. `/opt/linka-backups/`)
3. Document that this directory must itself be copied off the VM (another disk, object storage). `down -v` still kills the volume.

Alternative: WAL file copy while the app writes. Rejected — `.backup()` is consistent. Alternative: backup sidecar. Rejected as extra service for 10 accounts.

### 6. Copy is static-honest, not keyed off `stock.automatic` on `/`

Public home has no server stock flag. Change `STEPS[2]` and the pitch so they never promise a live Shopee catalog. Links shows a pt-BR note when `canCheck` is false, and a short-link hint on the offer URL fields in both modes (the warning stays true after the key arrives).

## Risks / Trade-offs

- **[Health `select 1` blocks a wedged SQLite]** → Docker already times out the probe (5s). Prefer a failed restart over a silent 200.
- **[Host cron is operator-owned]** → Spec is documentation + script. If cron is never installed, accounts are still one volume. Mitigation: checklist in `migracao.md` stays unchecked until the operator confirms a file outside the volume.
- **[JSON freshen adds latency on `/api/r`]** → Same 15-minute cache and `LOOKUP_CAP` as `/r`. Without the key, no HTTP to Shopee.
- **[Demo `?on=` still public]** → Only `serum-c`. Acceptable for the simulator.

## Migration Plan

1. Ship code on Magalu: `docker compose -p linka up -d --build`.
2. Confirm `GET https://linka.guiendrigo.com/api/health` is 200 with `ok: true`.
3. Confirm Cloudflare cache rule includes `/p/` (Caddy already no-stores).
4. Install the host cron once; verify a file appears under `/opt/linka-backups/` (or the documented path).
5. Rollback: previous image. No DB migration to reverse. Cron can be left in place.

## Open Questions

None. Off-VM destination (second disk vs object storage) is an operator choice recorded in the runbook, not a spec change.
