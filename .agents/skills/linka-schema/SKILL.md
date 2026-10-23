---
name: linka-schema
description: >
  Linka database schema on Postgres/PGLite and SQLite. Use when adding tables,
  columns, photos, migrations, or touching store.server.ts SQL. Triggers on
  migration, sqlite, bytea, bio_pages, SCHEMA, DATABASE_URL, SQLITE_PATH.
metadata:
  short-description: "Dual migration trees, JS timestamps, SQLite integers, binary spike"
user-invocable: false
---

# Linka schema

Two trees, never mixed:

| Backend | Env | Files |
|---|---|---|
| Neon / PGLite | `DATABASE_URL` or neither | `migrations/000N_*.sql` |
| Magalu SQLite | `SQLITE_PATH` | `migrations/sqlite/000N_*.sql` |

Postgres applier never runs the SQLite tree. SQLite applier never runs
`timestamptz` / `now()` files.

## Rules

- Next Postgres file is the next `000N` under `migrations/` (not under
  `migrations/sqlite/`). Next SQLite file is independent — look at that folder.
- `migrations/auth/0001_auth.sql` and `migrations/0001_auth.sql` stay
  byte-identical. Do not edit them for app tables.
- App SQL uses parameters for timestamps (`new Date().toISOString()`), not
  SQL `now()`.
- SQLite: booleans `integer` 0/1, timestamps `text`. Postgres: `boolean`,
  `timestamptz`. `asBool` already accepts `1` / `true` / `'t'`.
- Binary (profile photo): `bytea` / `blob`. Spike a write/read on PGLite
  before shipping; if it fails, store base64 `text` in **both** trees under
  the same decoded size cap.
- Per-user tables: `user_id text not null`, queries scoped by verified
  `context.userId`.
