import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  isGoogleConfigured,
  isGoogleLoginEnabled,
  loginPageFeatures,
  nativeGoogleSocialProviders,
  resolveAuthConfigured,
  trustedOriginsFor,
} from "./auth-config.ts";

test("email/password keeps auth on", () => {
  assert.equal(
    resolveAuthConfigured({
      authDisabled: false,
      emailAndPasswordEnabled: true,
    }),
    true,
  );
});

test("google secrets alone keep auth on", () => {
  assert.equal(
    resolveAuthConfigured({
      authDisabled: false,
      emailAndPasswordEnabled: false,
      googleConfigured: true,
    }),
    true,
  );
});

test("trustedOrigins include BETTER_AUTH_URL when set", () => {
  const origins = trustedOriginsFor("https://linka.example.com", [
    "http://localhost:8080",
  ]);
  assert.equal(origins[0], "https://linka.example.com");
  assert.ok(origins.includes("http://localhost:8080"));
});

test("native Google needs both id and secret", () => {
  assert.equal(isGoogleConfigured({}), false);
  assert.equal(
    isGoogleConfigured({ GOOGLE_CLIENT_ID: "id", GOOGLE_CLIENT_SECRET: "secret" }),
    true,
  );
  assert.deepEqual(
    nativeGoogleSocialProviders({
      GOOGLE_CLIENT_ID: "id",
      GOOGLE_CLIENT_SECRET: "secret",
    }),
    { google: { clientId: "id", clientSecret: "secret" } },
  );
});

test("google login flag is off unless VITE_GOOGLE_LOGIN is true", () => {
  assert.equal(isGoogleLoginEnabled(undefined), false);
  assert.equal(isGoogleLoginEnabled("true"), true);
});

test("Magalu login shows native Google and email", () => {
  const magalu = loginPageFeatures({ googleLogin: "true" });
  assert.equal(magalu.nativeGoogle, true);
  assert.equal(magalu.emailPassword, true);
});

test("login panel still submits email sign-up and sign-in", () => {
  const panel = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../../components/linka/login-panel.tsx"),
    "utf8",
  );
  assert.match(panel, /signUp\.email/);
  assert.match(panel, /signIn\.email/);
});
