import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  isBrokerConfigured,
  isGoogleConfigured,
  isGoogleLoginEnabled,
  isSocialLoginEnabled,
  loginPageFeatures,
  nativeGoogleSocialProviders,
  resolveAuthConfigured,
  trustedOriginsFor,
} from "./auth-config.ts";
import { GROK_PROVIDERS } from "./providers.ts";

function loginProviderLabels(flag: string | undefined): string[] {
  return isSocialLoginEnabled(flag) ? GROK_PROVIDERS.map((p) => p.label) : [];
}

function simulatedLoginHtml(
  features: ReturnType<typeof loginPageFeatures>,
): string {
  const parts: string[] = [];
  if (features.nativeGoogle) parts.push("Continuar com Google");
  for (const label of features.brokerLabels) parts.push(`Continuar com ${label}`);
  if (features.emailPassword) parts.push("Entrar com e-mail");
  return parts.join("\n");
}

test("unset broker env is not configured", () => {
  assert.equal(isBrokerConfigured({}), false);
  assert.equal(
    isBrokerConfigured({ GROK_AUTH_CLIENT_ID: "  ", GROK_AUTH_CLIENT_SECRET: "secret" }),
    false,
  );
});

test("both broker id and secret are required", () => {
  assert.equal(
    isBrokerConfigured({
      GROK_AUTH_CLIENT_ID: "id",
      GROK_AUTH_CLIENT_SECRET: "secret",
    }),
    true,
  );
});

test("email/password keeps auth on without the broker", () => {
  assert.equal(
    resolveAuthConfigured({
      authDisabled: false,
      brokerConfigured: false,
      emailAndPasswordEnabled: true,
    }),
    true,
  );
});

test("trustedOrigins include BETTER_AUTH_URL when set", () => {
  const origins = trustedOriginsFor(
    "https://linka.example.com",
    ["http://localhost:8080"],
    ["*.grok-sandbox.com"],
  );
  assert.equal(origins[0], "https://linka.example.com");
  assert.ok(origins.includes("http://localhost:8080"));
});

test("social login is off unless VITE_SOCIAL_LOGIN is true", () => {
  assert.equal(isSocialLoginEnabled(undefined), false);
  assert.equal(isSocialLoginEnabled("false"), false);
  assert.equal(isSocialLoginEnabled("true"), true);
});

test("login omits Google/X unless social login is on", () => {
  assert.deepEqual(loginProviderLabels(undefined), []);
  assert.ok(!loginProviderLabels("false").includes("Google"));
  assert.ok(!loginProviderLabels("false").includes("X"));
  assert.ok(loginProviderLabels("true").includes("Google"));
  assert.ok(loginProviderLabels("true").includes("X"));
});

test("native Google needs both id and secret and no broker", () => {
  assert.equal(isGoogleConfigured({}), false);
  assert.equal(
    isGoogleConfigured({ GOOGLE_CLIENT_ID: "  ", GOOGLE_CLIENT_SECRET: "secret" }),
    false,
  );
  assert.equal(
    isGoogleConfigured({ GOOGLE_CLIENT_ID: "id", GOOGLE_CLIENT_SECRET: "" }),
    false,
  );
  assert.equal(
    isGoogleConfigured({ GOOGLE_CLIENT_ID: "id" }),
    false,
  );
  assert.equal(
    isGoogleConfigured({ GOOGLE_CLIENT_SECRET: "secret" }),
    false,
  );
  assert.equal(
    isGoogleConfigured({ GOOGLE_CLIENT_ID: "id", GOOGLE_CLIENT_SECRET: "secret" }),
    true,
  );
  assert.equal(
    isGoogleConfigured({
      GOOGLE_CLIENT_ID: "id",
      GOOGLE_CLIENT_SECRET: "secret",
      GROK_AUTH_CLIENT_ID: "broker",
      GROK_AUTH_CLIENT_SECRET: "broker-secret",
    }),
    false,
  );
});

test("native Google socialProviders omitted when broker creds exist", () => {
  assert.deepEqual(
    nativeGoogleSocialProviders({
      GOOGLE_CLIENT_ID: "id",
      GOOGLE_CLIENT_SECRET: "secret",
    }),
    { google: { clientId: "id", clientSecret: "secret" } },
  );
  assert.equal(
    nativeGoogleSocialProviders({
      GOOGLE_CLIENT_ID: "id",
      GOOGLE_CLIENT_SECRET: "secret",
      GROK_AUTH_CLIENT_ID: "broker",
      GROK_AUTH_CLIENT_SECRET: "broker-secret",
    }),
    undefined,
  );
});

test("google login flag is off unless VITE_GOOGLE_LOGIN is true", () => {
  assert.equal(isGoogleLoginEnabled(undefined), false);
  assert.equal(isGoogleLoginEnabled("false"), false);
  assert.equal(isGoogleLoginEnabled("true"), true);
});

const brokerLabels = GROK_PROVIDERS.map((p) => p.label);

test("Magalu login shows native Google without X and keeps email", () => {
  const magalu = loginPageFeatures({
    socialLogin: "false",
    googleLogin: "true",
    brokerLabels,
  });
  assert.equal(magalu.nativeGoogle, true);
  assert.deepEqual(magalu.brokerLabels, []);
  assert.equal(magalu.emailPassword, true);

  const html = simulatedLoginHtml(magalu);
  assert.match(html, /Continuar com Google/);
  assert.doesNotMatch(html, /\bX\b/);
  assert.doesNotMatch(html, /GOOGLE_CLIENT_SECRET/);
  assert.match(html, /Entrar com e-mail/);
});

test("broker social login wins over native Google on the login page", () => {
  const preview = loginPageFeatures({
    socialLogin: "true",
    googleLogin: "true",
    brokerLabels,
  });
  assert.equal(preview.nativeGoogle, false);
  assert.ok(preview.brokerLabels.includes("Google"));
  assert.ok(preview.brokerLabels.includes("X"));
  assert.equal(preview.emailPassword, true);
});

test("login panel still submits email sign-up and sign-in", () => {
  const panel = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../../components/linka/login-panel.tsx"),
    "utf8",
  );
  assert.match(panel, /signUp\.email/);
  assert.match(panel, /signIn\.email/);
});
