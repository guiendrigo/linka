# Spec Delta

## Purpose

Runs Linka as a long-lived Node server in Docker Compose on the Magalu VM, behind Cloudflare, without taking over ports already used by other projects.

## ADDED Requirements

### Requirement: node_server image is opt-in
The production container image MUST be built with the Nitro `node_server` preset. Builds that do not set `NITRO_PRESET=node_server` MUST keep the existing `vercel` preset.

#### Scenario: Docker build uses node_server
- **WHEN** the image is built with `NITRO_PRESET=node_server`
- **THEN** the image starts a Node HTTP server from the Nitro output and serves the app

#### Scenario: Local Grok build stays on vercel
- **WHEN** `npm run build` runs without `NITRO_PRESET=node_server`
- **THEN** the Nitro preset remains `vercel`

### Requirement: Server binds configurable host and port
The container process MUST listen on `HOST` and `PORT` (defaulting to `0.0.0.0` and `3000`). Compose MUST expose that port only on the Docker network, not as host 80 or 443.

#### Scenario: Internal port only
- **WHEN** the Compose stack starts on the Magalu VM
- **THEN** the app is reachable on the compose network at port 3000 and does not bind host ports 80 or 443

### Requirement: Health endpoint stays public
`GET /api/health` MUST return a JSON body with `ok: true` without authentication so the tunnel, proxy, or orchestrator can probe it.

#### Scenario: Health check
- **WHEN** a client requests `GET /api/health` on the container
- **THEN** the response status is 200 and the JSON includes `ok: true`

### Requirement: Public routes keep their contracts
The container MUST keep `/`, `/login`, `/r/$code`, and `/api/r/$code` on the same paths. `/r/$code` MUST still 302 to the first in-stock HTTPS offer with `cache-control: no-store`.

#### Scenario: Smart link is not cached
- **WHEN** a visitor hits `/r/$code` for a product with an in-stock HTTPS offer
- **THEN** the response is 302 to that offer and includes `cache-control: no-store`

### Requirement: SQLite file lives on a volume
When running in Compose with `SQLITE_PATH` under `/data`, the SQLite file MUST be on a named volume so it outlives container recreation.

#### Scenario: Volume keeps the database
- **WHEN** the app container is recreated with the same volume and `SQLITE_PATH`
- **THEN** previously saved users and products are still present

### Requirement: Edge cache must not store smart-link responses
Deploy documentation MUST require Cloudflare (or any reverse proxy) to bypass cache for `/r/*` and `/api/*`.

#### Scenario: Runbook names the bypass
- **WHEN** an operator follows the Magalu/Cloudflare runbook
- **THEN** they are instructed to disable CDN cache for `/r/*` and `/api/*`
