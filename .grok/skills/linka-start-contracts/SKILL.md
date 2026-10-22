---
name: linka-start-contracts
description: >
  TanStack Start / Linka module and route contracts. Use when adding routes,
  server functions, client SDK imports, public pages, or anything under
  src/routes or src/lib/linka. Triggers on route, createServerFn, .server.ts,
  .client.ts, /r/, /p/, loader, SSR.
metadata:
  short-description: "JSX in tsx, no *.client.ts on routes, public /r /p no auth no-store"
user-invocable: false
---

# Linka Start contracts

These fail in **Docker SSR** even when `tsc` is green.

## Files

- JSX only in `.tsx`. A `.ts` file with `<Provider>` will fail `vite build` in
  the Magalu image.
- Server-only I/O (`pg`, Better Auth internals, Shopee secret, SQLite):
  `*.server.ts`, dynamically imported **inside** a `createServerFn` handler or
  a `server.handlers` GET. Types may be `import type`.
- Never import `*.client.ts` from a module that `src/routes/*` pulls in
  (console, plan, workspace, providers). TanStack Start denies
  `**/*.client.*` in the server environment. Put browser SDKs in a file
  **not** named `.client.ts`, or load them only behind `createClientOnlyFn`.
- Do not create `src/routes/auth/popup.tsx`.

## Public vs account

- `/r/$code` and `/p/$code` (and photo) are **public**. No `authMiddleware`.
- Those responses use `cache-control: no-store`. Caddy must bypass `/r/*`,
  `/p/*`, `/api/*`.
- Per-user handlers use `authMiddleware` and `context.userId` only. Never take
  a user id from the client.
- `createFileRoute` path must match the file. If the destination route has
  `validateSearch`, `<Link>` must pass `search`.

## Bundle

- Shopee secret and `photo_bytes` never go to `WorkspaceView` or HTML.
- Public bio payload is title, price, product code — not commission or offer URLs.
