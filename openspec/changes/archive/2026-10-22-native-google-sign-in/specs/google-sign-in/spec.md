# Spec Delta

## Purpose

Lets Magalu visitors sign in with their Google account through this app’s own identity provider, without the Grok auth broker, while email and password remain available.

## ADDED Requirements

### Requirement: Google button appears only when Magalu Google is configured
When Google client credentials are configured and the Grok broker is not, `/login` MUST show a Google sign-in control. The page MUST NOT show X. When those Google credentials are unset, `/login` MUST NOT show a Google control.

#### Scenario: Magalu with Google credentials
- **WHEN** a visitor opens `/login` on a deployment that has Google client id and secret and does not have Grok broker credentials
- **THEN** the page shows a Google sign-in control and does not show X

#### Scenario: Magalu without Google credentials
- **WHEN** a visitor opens `/login` on a deployment without Google client id or secret and without Grok broker credentials
- **THEN** the page shows email/password only

### Requirement: Google sign-in uses this origin, not the Grok broker
Choosing Google MUST start OAuth against Google for this app’s public origin. The server MUST NOT send the visitor to the Grok auth broker for that flow.

#### Scenario: Google redirect stays on Linka
- **WHEN** a visitor chooses Google on Magalu `/login`
- **THEN** the browser is sent to Google OAuth and returns to this app’s `/api/auth/callback/google` on the public HTTPS origin

#### Scenario: Broker is not invoked
- **WHEN** Magalu Google sign-in runs without Grok broker credentials
- **THEN** the server does not call `auth.grok.me` or any Grok OAuth client

### Requirement: Successful Google login creates a local session
After Google authorizes the visitor, the app MUST create or reuse a local user and issue a session cookie on the public HTTPS origin. Workspace queries MUST keep using that verified user id.

#### Scenario: First Google sign-in
- **WHEN** a visitor completes Google OAuth who has no local account
- **THEN** the server creates a user and a session and the visitor reaches the signed-in workspace

#### Scenario: Returning Google sign-in
- **WHEN** the same Google account signs in again against the same database file
- **THEN** the visitor reaches the workspace as the same user

### Requirement: Email and password remain available
Configuring Google MUST NOT remove email/password sign-up or sign-in on `/login`.

#### Scenario: Email still works with Google enabled
- **WHEN** Magalu has Google credentials configured
- **THEN** a visitor can still create and use an email/password account on `/login`

### Requirement: Preview broker Google and X stay unchanged
When Grok broker credentials are set, `/login` MUST keep offering Google and X through the broker. Native Magalu Google MUST NOT be registered in that process.

#### Scenario: Preview still uses the broker
- **WHEN** a visitor opens `/login` in an environment with `GROK_AUTH_CLIENT_ID` and `GROK_AUTH_CLIENT_SECRET`
- **THEN** Google and X remain available through the existing broker flow and native Magalu Google is not offered

### Requirement: Google secret never reaches the client
The Google client secret MUST stay server-side. Client bundles and HTML MUST NOT include it. The client MAY receive a build-time flag that only indicates whether to render the Google button.

#### Scenario: Secret is not in the page
- **WHEN** a visitor loads `/login` with Google enabled
- **THEN** the document and client script do not contain `GOOGLE_CLIENT_SECRET`
