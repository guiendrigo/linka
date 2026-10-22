FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NITRO_PRESET=node_server
ENV VITE_SOCIAL_LOGIN=false
ENV PATH="/app/node_modules/.bin:$PATH"
RUN node scripts/with-app-env.mjs vite build
RUN npm prune --omit=dev

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV SQLITE_PATH=/data/linka.sqlite
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output
COPY migrations ./migrations
COPY scripts ./scripts
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh && mkdir -p /data && chown node:node /data
EXPOSE 3000
ENTRYPOINT ["/app/docker-entrypoint.sh"]
