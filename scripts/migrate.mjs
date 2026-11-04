#!/usr/bin/env node
/**
 * Deploy-time database migrator — SQLite only (SQLITE_PATH).
 */
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { pendingMigrations } from "./migration-plan.mjs";

const sqlitePath = process.env.SQLITE_PATH?.trim();
const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Prefer cwd so the Nitro bundle still finds /app/migrations/sqlite. */
export function sqliteMigrationsDir(root = process.cwd()) {
  return join(root, "migrations", "sqlite");
}

/**
 * Apply pending SQLite migrations. Returns how many files were applied.
 * @param {{ exec: Function, prepare: Function, transaction: Function }} db
 * @param {string} dir
 */
export function applySqliteMigrations(db, dir = sqliteMigrationsDir()) {
  db.exec(
    "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime('now')))",
  );
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    console.log("[migrate] no migrations/sqlite/ directory — nothing to do.");
    return 0;
  }
  const applied = db
    .prepare("SELECT name FROM _migrations")
    .all()
    .map((/** @type {{ name: string }} */ row) => row.name);
  let count = 0;
  for (const { name, path } of pendingMigrations(
    entries.map((entry) => join(dir, entry)),
    applied,
  )) {
    const text = readFileSync(path, "utf8");
    const run = db.transaction(() => {
      db.exec(text);
      db.prepare("INSERT INTO _migrations (name) VALUES (?)").run(name);
    });
    run();
    console.log(`[migrate] applied ${name}`);
    count += 1;
  }
  return count;
}

/** @param {string} path */
async function migrateSqlite(path) {
  mkdirSync(dirname(path), { recursive: true });
  const { default: Database } = await import("better-sqlite3");
  const db = new Database(path);
  db.pragma("foreign_keys = ON");
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  try {
    const count = applySqliteMigrations(db, sqliteMigrationsDir(rootDir));
    console.log(count ? `[migrate] done — ${count} migration(s) applied.` : "[migrate] up to date.");
  } finally {
    db.close();
  }
}

async function main() {
  if (!sqlitePath) {
    console.log("[migrate] SQLITE_PATH not set — skipping.");
    process.exit(0);
  }
  await migrateSqlite(sqlitePath);
}

const isCli =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli) {
  main().catch((err) => {
    console.error("[migrate] failed:", err?.message || err);
    process.exit(1);
  });
}
