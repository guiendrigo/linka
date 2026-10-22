# Spec Delta

## ADDED Requirements

### Requirement: SQLite is copied off the VM on a schedule
Magalu deploy documentation MUST require a scheduled copy of the SQLite database file to storage outside the VM. Recreating the app container or the named volume MUST NOT be the only copy of accounts and products.

#### Scenario: Runbook names an off-VM copy
- **WHEN** an operator follows the Magalu backup section
- **THEN** they are instructed to run a scheduled dump of the SQLite file to a path outside the Docker volume and outside the VM

#### Scenario: Volume wipe is not the only copy
- **WHEN** the operator reads that same section
- **THEN** they are told that `docker compose down -v` would destroy accounts unless that off-VM copy exists

## MODIFIED Requirements

### Requirement: Health endpoint stays public
`GET /api/health` MUST remain unauthenticated. When the process uses a SQLite file and that file cannot be opened or queried, the response MUST NOT be HTTP 200 with `ok: true`. When the store is usable, the response MUST be HTTP 200 with JSON `ok: true`.

#### Scenario: Health check
- **WHEN** a client requests `GET /api/health` on the container and the configured store can be queried
- **THEN** the response status is 200 and the JSON includes `ok: true`

#### Scenario: SQLite store is unusable
- **WHEN** `SQLITE_PATH` is set and the file cannot be opened or queried
- **THEN** `GET /api/health` is not HTTP 200 with `ok: true`

### Requirement: Edge cache must not store smart-link responses
Deploy documentation MUST require Cloudflare (or any reverse proxy) to bypass cache for `/r/*`, `/p/*`, and `/api/*`.

#### Scenario: Runbook names the bypass
- **WHEN** an operator follows the Magalu/Cloudflare runbook
- **THEN** they are instructed to disable CDN cache for `/r/*`, `/p/*`, and `/api/*`
