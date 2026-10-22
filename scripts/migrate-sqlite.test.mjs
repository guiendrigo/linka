import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import Database from "better-sqlite3";
import { applySqliteMigrations, sqliteMigrationsDir } from "./migrate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("sqlite auth migration is not the postgres copy", () => {
  const sqlite = readFileSync(join(root, "migrations/sqlite/0001_auth.sql"), "utf8");
  const postgres = readFileSync(join(root, "migrations/0001_auth.sql"), "utf8");
  assert.notEqual(sqlite, postgres);
  assert.match(sqlite, /integer not null/);
  assert.doesNotMatch(sqlite, /timestamptz/);
});

test("sqlite linka migration has no timestamptz or now()", () => {
  const sql = readFileSync(join(root, "migrations/sqlite/0002_linka.sql"), "utf8");
  assert.doesNotMatch(sql, /timestamptz/);
  assert.doesNotMatch(sql, /now\(\)/);
  assert.match(sql, /checked_at text/);
});

test("sqlite migrations apply once then no-op", () => {
  const dir = mkdtempSync(join(tmpdir(), "linka-migrate-"));
  const path = join(dir, "linka.sqlite");
  const db = new Database(path);
  db.pragma("foreign_keys = ON");
  const first = applySqliteMigrations(db, sqliteMigrationsDir(root));
  const second = applySqliteMigrations(db, sqliteMigrationsDir(root));
  const names = db.prepare("select name from _migrations order by name").all();
  db.close();
  assert.equal(first, 2);
  assert.equal(second, 0);
  assert.deepEqual(
    names.map((row) => row.name),
    ["0001_auth.sql", "0002_linka.sql"],
  );
});
