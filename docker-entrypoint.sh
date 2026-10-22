#!/bin/sh
set -e
mkdir -p /data
if [ "$(id -u)" = "0" ]; then
  chown -R node:node /data
  exec su node -s /bin/sh -c "node /app/scripts/migrate.mjs && exec node /app/.output/server/index.mjs"
fi
node /app/scripts/migrate.mjs
exec node /app/.output/server/index.mjs
