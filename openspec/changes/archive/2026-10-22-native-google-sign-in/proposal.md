# Proposal

## Why

Magalu production can already create a session with email and password, but `/login` has no working Google button. The only Google path in the app federates through the Grok auth broker, which this VM does not have. Affiliates expect “Continuar com Google”; filling `GOOGLE_CLIENT_ID` today does nothing because the live Better Auth instance never reads it.

## What Changes

- Add Better Auth’s native Google social provider on Magalu when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set.
- Show a Google button on `/login` in that deployment, using a full-page OAuth redirect (not the Grok popup/broker).
- Keep email/password as a fallback on the same page.
- Leave the Grok preview path unchanged: when `GROK_AUTH_CLIENT_ID` and `GROK_AUTH_CLIENT_SECRET` are set, Google/X still go through the broker.
- Do not enable X on Magalu.
- Remove the unused parallel instance at `src/lib/auth.ts` (it is not mounted and would persist to a separate `auth.db`).
- Document the Google Cloud redirect URI `https://linka.guiendrigo.com/api/auth/callback/google` and the Magalu env/build flags.

## Capabilities

### New Capabilities

- `google-sign-in`: Native Google OAuth through this app’s Better Auth on Magalu, alongside email/password, without the Grok broker.

### Modified Capabilities

- (none — `openspec/specs/` has no archived capabilities; Magalu email/password remains as implemented)

## Impact

- `src/lib/auth/server.ts` — register `socialProviders.google` only when Magalu Google env is present and the Grok broker is not.
- `src/lib/auth/client.ts`, `login-panel.tsx`, `gates.tsx` — Magalu Google button must call Better Auth social sign-in (`google`), not `signIn.oauth2("grok-google")`.
- Client-visible build flag (new or extended `VITE_*`) so the Magalu image can show Google without also showing broker X.
- `.env` / deploy docs (`docs/magalu-cloudflare.md`, `migracao.md`) — `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`; never `VITE_*` for the secret.
- Docker image rebuild (`VITE_*` is baked at build). Caddy already proxies `/api/auth/*`.
- No new npm packages. No schema migration: Better Auth `account` / `user` tables already exist in `migrations/sqlite/`.
- Google Cloud OAuth client (Web) is an operator prerequisite, not app code.
