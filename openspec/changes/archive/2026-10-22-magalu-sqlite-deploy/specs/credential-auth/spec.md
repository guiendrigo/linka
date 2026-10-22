# Spec Delta

## Purpose

Makes Better Auth the production identity provider on Magalu: email and password against the app database, with no silent fallback to the Grok preview OAuth client.

## ADDED Requirements

### Requirement: Email and password work without the Grok broker
When auth is enabled and `GROK_AUTH_CLIENT_ID` or `GROK_AUTH_CLIENT_SECRET` is unset, the server MUST accept email/password sign-up and sign-in through Better Auth and MUST NOT call the Grok auth broker.

#### Scenario: New account on Magalu
- **WHEN** a visitor submits email and password on `/login` with broker credentials unset
- **THEN** the server creates a local Better Auth user and a session on this origin

#### Scenario: Returning account
- **WHEN** that visitor signs in again with the same email and password after a process restart with the same `SQLITE_PATH`
- **THEN** they reach the signed-in workspace

### Requirement: No preview-broker fallback
When `GROK_AUTH_CLIENT_ID` or `GROK_AUTH_CLIENT_SECRET` is unset, the server MUST NOT use the baked preview OAuth client or `auth.grok.me` as a default identity provider.

#### Scenario: Unset broker creds do not federate
- **WHEN** the process starts without `GROK_AUTH_CLIENT_ID` and without `GROK_AUTH_CLIENT_SECRET`
- **THEN** initiating Google or X sign-in is not offered by the server as a configured provider

### Requirement: Social buttons only when the broker is configured
The login UI MUST render Google and X buttons only when Grok broker credentials are configured. Otherwise it MUST show email/password only.

#### Scenario: Magalu login is email only
- **WHEN** a visitor opens `/login` on a deployment without broker credentials
- **THEN** the page shows email/password and does not show Google or X buttons

#### Scenario: Preview with broker creds still shows social
- **WHEN** a visitor opens `/login` in an environment that has `GROK_AUTH_CLIENT_ID` and `GROK_AUTH_CLIENT_SECRET`
- **THEN** Google and X buttons remain available

### Requirement: Public origin is the Better Auth base URL
When `BETTER_AUTH_URL` is set, Better Auth MUST use that origin for callbacks, CSRF trusted origins, and cookies. Magalu production MUST set it to the public HTTPS hostname.

#### Scenario: Session cookie on the public host
- **WHEN** a user signs in with email/password at `BETTER_AUTH_URL`
- **THEN** the session cookie is issued for that origin over HTTPS

### Requirement: Workspace data stays scoped to the signed-in user
Every per-user query MUST continue to use the verified Better Auth user id. The client MUST NOT supply a user id.

#### Scenario: One user cannot list another user's products
- **WHEN** user A is signed in
- **THEN** workspace listing returns only products whose `user_id` is A
