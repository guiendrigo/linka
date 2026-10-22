# Tasks

## 1. Config helpers

- [x] 1.1 Add `isGoogleConfigured` in `src/lib/auth/auth-config.ts` (both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` non-empty after trim, and broker unset) and verify unit tests cover empty/whitespace, secret-only, id-only, both set, and both set while broker creds exist (must be false)
- [x] 1.2 Add `isGoogleLoginEnabled` for `VITE_GOOGLE_LOGIN === "true"` next to `isSocialLoginEnabled` and verify unit tests: unset/false → off, `"true"` → on

## 2. Server provider

- [x] 2.1 In `src/lib/auth/server.ts`, register Better Auth `socialProviders.google` only when `isGoogleConfigured` is true; add `"google"` to `accountLinking.trustedProviders` in that case; verify a focused test or helper assertion that Google config is omitted when broker creds are set
- [x] 2.2 Delete unused `src/lib/auth.ts` and verify nothing imports it (`rg "lib/auth\"" src` has no hits for that file)

## 3. Login UI

- [x] 3.1 Export `googleLoginEnabled` from `src/lib/auth/client.ts` and show “Continuar com Google” on `LoginPanel` that calls `authClient.signIn.social({ provider: "google", callbackURL: "/" })` when the flag is on; verify a unit or render-level test that the Google control is listed only when `VITE_GOOGLE_LOGIN` is true
- [x] 3.2 Keep broker `socialProviders` + `signIn(providerId)` behind `VITE_SOCIAL_LOGIN` only; verify X is absent when Google login is on and social login is off
- [x] 3.3 Leave email/password fields on `/login` regardless of the Google flag; verify the login panel still submits `signUp.email` / `signIn.email`

## 4. Magalu image and docs

- [x] 4.1 Set `VITE_GOOGLE_LOGIN=true` in the Magalu `Dockerfile` build stage and keep `VITE_SOCIAL_LOGIN=false`; verify the Dockerfile contains both values
- [x] 4.2 Document `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, rebuild requirement, and redirect `https://linka.guiendrigo.com/api/auth/callback/google` in `docs/magalu-cloudflare.md` and `migracao.md`; verify those files name the callback path and warn that the secret must not be `VITE_*`

## 5. Integration

- [x] 5.1 Run `npm run typecheck` and `npm run lint` and verify both exit 0
- [x] 5.2 Rebuild is not required in this checklist if Google secrets are still empty; verify `/login` HTML in a Magalu-flag unit test includes the Google label and does not include X, and that a simulated page string does not contain `GOOGLE_CLIENT_SECRET`

## Workflow follow-up

- Operator: create the Google Cloud Web OAuth client (origin `https://linka.guiendrigo.com`, redirect `https://linka.guiendrigo.com/api/auth/callback/google`), put id/secret in the VM `.env`, then `docker compose -p linka up -d --build`.
- Archive the change after review.
