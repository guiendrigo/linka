# Design

## Context

See proposal.md for motivation. Magalu Better Auth already persists users in SQLite (`SQLITE_PATH`), with email/password on and the Grok broker gated off unless both `GROK_AUTH_*` values exist. `/login` renders broker Google/X only when build-time `VITE_SOCIAL_LOGIN === "true"`; the Magalu image sets that to `false`. A stray `src/lib/auth.ts` sketches native Google against `auth.db` and `localhost:3000` but is not imported — `/api/auth/$` mounts `@/lib/auth/server`.

Grok preview must keep the broker popup/`signIn.oauth2` path. Magalu must not federate to `auth.grok.me`.

## Goals / Non-Goals

**Goals:**

- One Better Auth instance (`server.ts`) that can register native Google on Magalu.
- A Magalu-only client flag so `/login` can show Google without showing X.
- Full-page OAuth redirect on Magalu (`__Host-` cookies already require HTTPS).
- Operator docs for the Google Cloud redirect URI and env vars.

**Non-Goals:**

- Native X / other social providers.
- Replacing email/password.
- Changing Caddy, SQLite schema, or cookie names.
- Google on Grok preview (broker stays).
- A second Better Auth instance or a second SQLite file.

## Decisions

### 1. Native `socialProviders.google`, not `genericOAuth` to Google

Use Better Auth’s built-in Google provider when Magalu Google env is set. Callback is `/api/auth/callback/google`, already covered by the catch-all handler.

**Why:** Matches Better Auth docs, keeps Magalu Google distinct from `grok-google` broker ids, and avoids inventing Google’s authorize/token/userinfo URLs.

**Rejected:** Pointing `genericOAuth` at Google (would reuse `signIn.oauth2` but fight provider ids with preview). Wiring the unused `src/lib/auth.ts` (wrong database, wrong baseURL, second instance).

### 2. Broker wins; native Google is Magalu-only

`isGoogleConfigured` is true only when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are non-empty after trim **and** `isBrokerConfigured` is false. Empty `.env` quotes (`GOOGLE_CLIENT_ID=""`) stay unset.

**Why:** One Google button, one identity namespace. Preview with broker creds must not also register native Google.

**Rejected:** Registering both at once. Overloading `VITE_SOCIAL_LOGIN=true` on Magalu (that flag currently means broker Google **and** X).

### 3. Separate build flag `VITE_GOOGLE_LOGIN`

Client reads `import.meta.env.VITE_GOOGLE_LOGIN === "true"` (same shape as `isSocialLoginEnabled`). Magalu Dockerfile sets `VITE_GOOGLE_LOGIN=true`. It must never be given the secret.

Login UI:

- `VITE_SOCIAL_LOGIN` → existing `socialProviders` + `signIn(providerId)` (broker).
- `VITE_GOOGLE_LOGIN` → one “Continuar com Google” control that calls `authClient.signIn.social({ provider: "google", callbackURL: "/" })`.

**Why:** Vite inlines `VITE_*` at image build; the Magalu button cannot appear from runtime env alone. A second flag avoids turning X on.

**Rejected:** Runtime `/api/auth` feature probe (extra round-trip, more UI flicker). Putting the client id in `VITE_*`.

### 4. Minimal `server.ts` gate, delete `src/lib/auth.ts`

Add `isGoogleConfigured` next to `isBrokerConfigured` in `auth-config.ts`. In `server.ts`, spread `socialProviders: { google: { clientId, clientSecret } }` only when that helper is true. Add `"google"` to `account.accountLinking.trustedProviders` in that same case so a later Google login can attach to an email/password user with the same verified email.

Delete `src/lib/auth.ts`. Do not restyle the rest of `server.ts`.

**Rejected:** Rewriting auth. A Magalu-only fork of `server.ts`.

### 5. Operator Google Cloud client is outside the app

Web application client. Authorized origin `https://linka.guiendrigo.com`. Redirect `https://linka.guiendrigo.com/api/auth/callback/google`. Values go in the VM `.env`; image rebuild picks up `VITE_GOOGLE_LOGIN`. Caddy already reverse-proxies `/api/auth/*`.

## Risks / Trade-offs

- [Same email, two accounts] → Enable Better Auth linking with `google` as a trusted provider; if Google returns an unverified email, do not merge.
- [Build/runtime split] → Button visibility is baked; missing runtime secrets make the button start OAuth and fail. Document that both the flag and the secrets are required; treat empty secrets as “no Google” on the server.
- [Grok auth skill says do not edit `server.ts`] → Magalu already gates the broker there; keep this edit as small as that one.
- [OAuth client not created yet] → Code can land with env empty; `/login` stays email-only until the operator fills secrets and rebuilds.

## Migration Plan

1. Land code + tests + Magalu Dockerfile flag. `.env` may still have empty Google keys.
2. Operator creates the Google Cloud Web client and sets id/secret on the VM.
3. `docker compose -p linka up -d --build`. Confirm `/login` shows Google, callback 302/session, email/password still works, OpenReply unaffected.
4. Rollback: remove `GOOGLE_CLIENT_*` (and/or rebuild with `VITE_GOOGLE_LOGIN=false`). Existing Google users remain in SQLite; they can sign in again only after Google is restored, or use email/password if they also set one.

## Open Questions

None that change the spec or this approach. The Google Cloud client is an operator step, not an app decision.
