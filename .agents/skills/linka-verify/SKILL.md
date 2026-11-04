---
name: linka-verify
description: >
  How to verify a Linka change is done. Use at the end of implement/apply, or
  when the user asks if tests pass, if it is done, or to run npm test.
metadata:
  short-description: "test:linka + typecheck + lint; Magalu needs docker compose build"
user-invocable: false
---

# Linka verify

## Always

```sh
npm run test:linka
npm run typecheck
npm run lint
```

`test:linka` is `src/lib/linka/*.test.ts`.

## Magalu-bound changes

```sh
docker compose -p linka build
```

or `up -d --build`. JSX-in-`.ts` and `*.client.ts` on the route graph only
fail here. Smoke `/api/health`, login, `/r`, `/p` locally before
`linka-prod-deploy` on the VM.
