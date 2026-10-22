import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isBrokerConfigured,
  isSocialLoginEnabled,
  resolveAuthConfigured,
  trustedOriginsFor,
} from "./auth-config.ts";
import { GROK_PROVIDERS } from "./providers.ts";

function loginProviderLabels(flag: string | undefined): string[] {
  return isSocialLoginEnabled(flag) ? GROK_PROVIDERS.map((p) => p.label) : [];
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
