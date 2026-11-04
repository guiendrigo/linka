/**
 * Better Auth for Linka (server-only) — Magalu / local SQLite.
 *
 * Email/password + optional native Google. No Grok broker, PGLite, or Neon.
 */
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { getCookie } from "@tanstack/react-start/server";
import { randomBytes } from "node:crypto";
import { ensureDbReady, getSqliteDatabase } from "../db";
import {
  isGoogleConfigured,
  nativeGoogleSocialProviders,
  resolveAuthConfigured,
  trustedOriginsFor,
} from "./auth-config";
import { emailAndPasswordEnabled } from "./email-password";

void ensureDbReady();

const globalAuthRef = globalThis as typeof globalThis & {
  __linkaAuthDevSecret__?: string;
};
function devAuthSecret(): string {
  globalAuthRef.__linkaAuthDevSecret__ ??= randomBytes(32).toString("hex");
  return globalAuthRef.__linkaAuthDevSecret__;
}

const env = (key: string): string | undefined => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

const authDisabled = env("VITE_AUTH_ENABLED") === "false";

const googleClientId = env("GOOGLE_CLIENT_ID");
const googleClientSecret = env("GOOGLE_CLIENT_SECRET");
const googleConfigured = isGoogleConfigured({
  GOOGLE_CLIENT_ID: googleClientId,
  GOOGLE_CLIENT_SECRET: googleClientSecret,
});
const googleSocialProviders = nativeGoogleSocialProviders({
  GOOGLE_CLIENT_ID: googleClientId,
  GOOGLE_CLIENT_SECRET: googleClientSecret,
});

/** True when real auth is enforced (email/password and/or Google secrets). */
export const authConfigured = resolveAuthConfigured({
  authDisabled,
  emailAndPasswordEnabled,
  googleConfigured,
});

const explicitBaseURL = env("BETTER_AUTH_URL");
const LOCAL_DEV_ORIGINS: string[] = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://[::1]:8080",
];
const baseURL = explicitBaseURL ?? "http://localhost:8080";

const trustedOrigins: string[] = trustedOriginsFor(
  explicitBaseURL,
  LOCAL_DEV_ORIGINS,
);

if (!env("SQLITE_PATH")) {
  throw new Error("SQLITE_PATH is required for Better Auth");
}

export const SESSION_TOKEN_COOKIE = "__Host-linka-auth.session_token";

export const auth = betterAuth({
  baseURL,
  secret: env("BETTER_AUTH_SECRET") ?? devAuthSecret(),
  database: getSqliteDatabase(),
  trustedOrigins,
  account: {
    encryptOAuthTokens: true,
    accountLinking: {
      enabled: true,
      trustedProviders: [...(googleConfigured ? ["google"] : [])],
      requireLocalEmailVerified: false,
    },
  },
  session: { cookieCache: { enabled: true, maxAge: 300 } },
  ...(emailAndPasswordEnabled ? { emailAndPassword: { enabled: true } } : {}),
  ...(googleSocialProviders ? { socialProviders: googleSocialProviders } : {}),
  advanced: {
    useSecureCookies: false,
    defaultCookieAttributes: { secure: true, sameSite: "lax", path: "/" },
    cookies: {
      session_token: { name: SESSION_TOKEN_COOKIE },
      session_data: { name: "__Host-linka-auth.session_data" },
      account_data: { name: "__Host-linka-auth.account_data" },
      dont_remember: { name: "__Host-linka-auth.dont_remember" },
    },
  },
  plugins: [tanstackStartCookies()],
});

export function readSessionToken(): string | null {
  return getCookie(SESSION_TOKEN_COOKIE) ?? null;
}
