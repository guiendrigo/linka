---
name: linka-prod-deploy
description: >
  Deploy or restart Linka on the Magalu VM. Use when the user says sobe, restart,
  VM, compose, produção, deploy, or wants the running container to pick up code.
  Do not treat npm run build or npm run dev as production.
metadata:
  short-description: "Magalu docker compose up --build, Caddy, SQLite backup, health smoke"
user-invocable: true
---

# Linka production deploy (Magalu)

Production is **this VM**: `/opt/linka`, Compose project `linka`, Caddy
`openreply-caddy-1`, public host `linka.guiendrigo.com`.

## Do not

- `npm run build` (Vercel preset) as a prod gate. The image builds with
  `NITRO_PRESET=node_server`.
- `npm run dev` on the host while `.env` has `SQLITE_PATH=/data/...`. That
  directory is the container volume; the host gets `EACCES`.
- Recreate the container without a SQLite backup if a migration will run.
- Edit only `deploy/Caddyfile` and forget `/opt/openreply/Caddyfile`.

## Steps

1. Work from `/opt/linka`. Confirm `docker compose -p linka ps` sees `linka-app-1`.
2. Backup the data volume before schema changes:

   ```sh
   mkdir -p /tmp/linka-backup
   docker run --rm -v linka_linka-data:/data -v /tmp/linka-backup:/backup alpine \
     sh -c 'cp -a /data/. /backup/'
   ```

3. Ship:

   ```sh
   docker compose -p linka up -d --build
   ```

   Entrypoint runs `migrations/sqlite/` then the Node server on port 3000.
   Logs should show `[migrate]` then `Listening`.

4. If a **public path** changed (`/r/*`, `/p/*`, `/api/*`), update **both**:
   - `/opt/openreply/Caddyfile` (live)
   - `deploy/Caddyfile` (repo)
   Reload: `docker exec openreply-caddy-1 caddy reload --config /etc/caddy/Caddyfile`
   Cache bypass must include `/r/*`, `/p/*`, and `/api/*`.

5. Smoke (do not print `.env` secrets):

   - Container healthy; `GET /api/health` → 200 `{"ok":true,...}`
   - `https://linka.guiendrigo.com/api/health` → 200
   - New public route: 200 or the expected 404 copy, not 502
   - Smart link `/r/<code>` stays `cache-control: no-store` on 302

6. If the image build fails on JSX in a `.ts` file or
   `Denied by file pattern: **/*.client.*`, stop and fix that before retrying.
   Those only show up in the Docker/Start SSR graph, not in `tsc` alone.
