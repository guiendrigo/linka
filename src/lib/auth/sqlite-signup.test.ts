import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

const dir = mkdtempSync(join(tmpdir(), "linka-auth-"));
process.env.SQLITE_PATH = join(dir, "linka.sqlite");
delete process.env.DATABASE_URL;

test("email/password sign-up persists a user row in the sqlite file", async () => {
  const { ensureDbReady, getSqliteDatabase } = await import("../db.ts");
  await ensureDbReady();
  const { betterAuth } = await import("better-auth");
  const auth = betterAuth({
    database: getSqliteDatabase(),
    emailAndPassword: { enabled: true },
    secret: "s".repeat(32),
    baseURL: "http://localhost:8080",
    trustedOrigins: ["http://localhost:8080"],
  });
  const result = await auth.api.signUpEmail({
    body: {
      name: "Ana",
      email: "ana@example.com",
      password: "password1",
    },
  });
  assert.equal(result.user.email, "ana@example.com");
  const row = getSqliteDatabase()
    .prepare(`select email from "user" where email = ?`)
    .get("ana@example.com") as { email: string } | undefined;
  assert.equal(row?.email, "ana@example.com");
});
