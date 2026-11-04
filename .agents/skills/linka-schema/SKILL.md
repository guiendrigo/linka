---
name: linka-schema
description: >
  Linka database schema on SQLite. Use when adding tables, columns, photos,
  migrations, or touching store.server.ts SQL. Triggers on migration, sqlite,
  blob, bio_pages, SCHEMA, SQLITE_PATH.
metadata:
  short-description: "SQLite migrations, JS timestamps, integers, binary"
user-invocable: false
---

# Linka schema

One tree only (Magalu + local dev):

| Backend | Env | Files |
|---|---|---|
| SQLite | `SQLITE_PATH` (required) | `migrations/sqlite/000N_*.sql` |

## Rules

- Next file is the next `000N` under `migrations/sqlite/`.
- App SQL uses parameters for timestamps (`new Date().toISOString()`), not
  SQL `now()`.
- SQLite: booleans `integer` 0/1, timestamps `text`, binary `blob`.
  `asBool` accepts `1` / `true` / `'t'`.
- Per-user tables: `user_id text not null`, queries scoped by verified
  `context.userId`.
- Dev Mac: `SQLITE_PATH=./.local/linka.sqlite`. Magalu Compose sets
  `/data/linka.sqlite`. Never point the Mac host at `/data/...`.
