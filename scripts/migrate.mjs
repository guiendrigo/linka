#!/usr/bin/env node
/**
 * Deploy-time database migrator.
 *
 * SQLITE_PATH -> better-sqlite3 against migrations/sqlite/
 * DATABASE_URL -> node-postgres against migrations/*.sql (non-recursive)
 * neither -> skip (PGLite applies Postgres files at startup)
 */
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { pendingMigrations } from "./migration-plan.mjs";

const sqlitePath = process.env.SQLITE_PATH?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const postgresDir = join(rootDir, "migrations");

/** Prefer cwd so the Nitro bundle (import.meta.url inside .output) still finds /app/migrations/sqlite. */
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

/** @param {string} connectionString */
async function migratePostgres(connectionString) {
  let entries;
  try {
    entries = await readdir(postgresDir);
  } catch {
    console.log("[migrate] no migrations/ directory — nothing to do.");
    return;
  }
  if (pendingMigrations(entries, []).length === 0) {
    console.log("[migrate] no migrations — nothing to do.");
    return;
  }

  const pg = await import("pg");
  const pool = new pg.default.Pool({ connectionString, max: 1 });
  const client = await pool.connect();
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
    );
    const applied = (await client.query("SELECT name FROM _migrations")).rows.map(
      (r) => r.name,
    );

    let count = 0;
    for (const { name } of pendingMigrations(entries, applied)) {
      const text = await readFile(join(postgresDir, name), "utf8");
      try {
        await client.query("BEGIN");
        await client.query(text);
        await client.query("INSERT INTO _migrations (name) VALUES ($1)", [name]);
        await client.query("COMMIT");
      } catch (err) {
        console.error(`[migrate] error applying ${name}`);
        try {
          await client.query("ROLLBACK");
        } catch {
          // keep the original error
        }
        throw err;
      }
      console.log(`[migrate] applied ${name}`);
      count += 1;
    }
    console.log(count ? `[migrate] done — ${count} migration(s) applied.` : "[migrate] up to date.");
  } finally {
    client.release();
    await pool.end();
  }
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
    const count = applySqliteMigrations(db, sqliteMigrationsDir());
    console.log(count ? `[migrate] done — ${count} migration(s) applied.` : "[migrate] up to date.");
  } finally {
    db.close();
  }
}

async function main() {
  if (sqlitePath) {
    await migrateSqlite(sqlitePath);
    return;
  }
  if (!databaseUrl) {
    console.log(
      "[migrate] SQLITE_PATH and DATABASE_URL not set — skipping (the PGLite fallback migrates itself).",
    );
    process.exit(0);
  }
  await migratePostgres(databaseUrl);
}

const isCli =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli) {
  main().catch((err) => {
    console.error("[migrate] failed:", err?.message || err);
    for (const key of ["code", "detail", "hint", "position", "where"]) {
      if (err?.[key] != null) console.error(`[migrate]   ${key}: ${err[key]}`);
    }
    process.exit(1);
  });
}
