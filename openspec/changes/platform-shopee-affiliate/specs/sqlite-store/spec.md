# Spec Delta

## MODIFIED Requirements

### Requirement: SQLITE_PATH selects the file store
When `SQLITE_PATH` is a non-empty path, the server MUST persist application data in that SQLite file. An empty or unset `SQLITE_PATH` MUST leave the existing `DATABASE_URL` / PGLite selection unchanged.

#### Scenario: Magalu process uses the file
- **WHEN** the server starts with `SQLITE_PATH` pointing at a writable file path
- **THEN** product, offer, stock-check, bio, and auth rows are stored in that file

#### Scenario: Preview without SQLITE_PATH is unchanged
- **WHEN** the server starts with `SQLITE_PATH` unset and `DATABASE_URL` unset
- **THEN** the process continues to use the in-memory PGLite fallback

### Requirement: App SQL does not call database now()
Application writes that need a current timestamp MUST supply it as a parameter. They MUST NOT use SQL `now()` so the same statements run on SQLite and Postgres.

#### Scenario: Stock cache stores an app timestamp
- **WHEN** a stock check writes a shop/item result on the SQLite backend
- **THEN** `checked_at` is a timestamp provided by the application, not `now()`

## ADDED Requirements

### Requirement: Per-user Shopee credentials are not stored
The SQLite schema MUST NOT keep a `shopee_credentials` table. Affiliate App ID and secret MUST NOT be persisted per user.

#### Scenario: Migration drops the table
- **WHEN** pending SQLite migrations are applied on a file that still has `shopee_credentials`
- **THEN** the table is dropped and later writes do not recreate it
