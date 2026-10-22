# sqlite-store Specification

## Purpose

Persists Linka and Better Auth data in a SQLite file when `SQLITE_PATH` is set, without changing the Neon or in-memory PGLite paths used by preview and Vercel.

## Requirements

### Requirement: SQLITE_PATH selects the file store
When `SQLITE_PATH` is a non-empty path, the server MUST persist application data in that SQLite file. An empty or unset `SQLITE_PATH` MUST leave the existing `DATABASE_URL` / PGLite selection unchanged.

#### Scenario: Magalu process uses the file
- **WHEN** the server starts with `SQLITE_PATH` pointing at a writable file path
- **THEN** product, offer, credential, and auth rows are stored in that file

#### Scenario: Preview without SQLITE_PATH is unchanged
- **WHEN** the server starts with `SQLITE_PATH` unset and `DATABASE_URL` unset
- **THEN** the process continues to use the in-memory PGLite fallback

### Requirement: SQLite schema is a separate tree
SQLite MUST be migrated from SQLite-dialect files, not from the Postgres `migrations/*.sql` tree. Dates MUST be stored as text timestamps. Booleans MUST be stored as integers 0/1.

#### Scenario: Postgres migrations are not applied to SQLite
- **WHEN** a process with `SQLITE_PATH` applies pending schema
- **THEN** it applies only the SQLite migration tree and does not execute Postgres `timestamptz` / `now()` files against SQLite

### Requirement: Migrations run at process start
When `SQLITE_PATH` is set, pending SQLite migrations MUST be applied before the server serves traffic. Already-applied files MUST NOT run again.

#### Scenario: First boot creates schema
- **WHEN** the SQLite file does not yet exist or has no `_migrations` rows
- **THEN** the process creates the file, applies every SQLite migration once, and then accepts requests

#### Scenario: Restart is idempotent
- **WHEN** the process starts again against a file that already has every SQLite migration recorded
- **THEN** it applies zero migrations and keeps existing rows

### Requirement: Data survives process restart
Rows written while `SQLITE_PATH` is set MUST still be readable after the process exits and starts again against the same path.

#### Scenario: Product remains after restart
- **WHEN** a signed-in user saves a product and the server process then restarts with the same `SQLITE_PATH`
- **THEN** that product is still listed for that user

### Requirement: App SQL does not call database now()
Application writes that need a current timestamp MUST supply it as a parameter. They MUST NOT use SQL `now()` so the same statements run on SQLite and Postgres.

#### Scenario: Credential upsert stores an app timestamp
- **WHEN** a user saves Shopee credentials on the SQLite backend
- **THEN** `updated_at` is a timestamp provided by the application, not `now()`

### Requirement: SQLite connections enforce foreign keys
Every SQLite connection used by the app MUST enable foreign keys for the life of that connection.

#### Scenario: Deleting a product removes its offers
- **WHEN** a user deletes a product that has offers
- **THEN** those offers are removed with the product
