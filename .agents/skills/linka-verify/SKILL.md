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

**Do not use `npm test` as a verdict.** It is the Grok template suite. It fails
on purpose (auth on, app migrations, OG identity). Do not revert those to make
it green.

## Always

```sh
npm run test:linka
npm run typecheck
npm run lint
```

`test:linka` is `src/lib/linka/*.test.ts` (input, resolve, shopee, bio,
purchases, …).

## If the change ships on Magalu

`npm run build` is the Vercel preset. Also:

```sh
docker compose -p linka build
```

or `up -d --build`. JSX-in-`.ts` and `*.client.ts` on the route graph only
fail here.

## If the sandbox preview is the target

`npm run build`, then the browser-smoke commands in `AGENTS.md` (only under
`/workspace`). On this VM (`/opt/linka`) skip Playwright-on-8080; use the
prod smoke in `linka-prod-deploy`.
