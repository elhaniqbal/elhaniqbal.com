#!/bin/sh
set -e

# When using bind mounts, /app/node_modules can be an empty volume.
# Install deps only when missing to keep startup fast after first run.
if [ ! -d node_modules ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
  echo "[entrypoint] Installing dependencies (npm ci)..."
  npm ci
fi

exec "$@"
