import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { applySqliteMigrations } from "../../scripts/migrate.mjs";
import {
  pgPlaceholdersToSqlite,
  resolveDbSource,
  type DbSource,
} from "./db-backend.ts";

export type { DbSource };

function trimmedEnv(key: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

const sqlitePath = trimmedEnv("SQLITE_PATH");

/** Magalu + local — SQLITE_PATH required. */
export const dbSource: DbSource = resolveDbSource({
  SQLITE_PATH: sqlitePath,
});

/**
 * Minimal SQL surface:
 *
 *   const sql = await getSql();
 *   const rows = await sql`select * from products where id = ${id}`;
 *   const rows2 = await sql.query("select * from products where id = $1", [id]);
 */
export interface Sql {
  <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]>;
  query<T = Record<string, unknown>>(
    text: string,
    params?: unknown[],
  ): Promise<T[]>;
}

const globalRef = globalThis as typeof globalThis & {
  __sqliteDb__?: import("better-sqlite3").Database;
  __sqliteSqlPromise__?: Promise<Sql>;
};

type Run = <T>(text: string, params: unknown[]) => Promise<T[]>;

function toSql(run: Run): Sql {
  const sql = (async <T = Record<string, unknown>>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T[]> => {
    let text = strings[0];
    for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
    return run<T>(text, values);
  }) as unknown as Sql;
  sql.query = <T = Record<string, unknown>>(text: string, params: unknown[] = []) =>
    run<T>(text, params);
  return sql;
}

/**
 * Shared better-sqlite3 handle. Opens the file, enables foreign keys / WAL,
 * and applies `migrations/sqlite/` before returning.
 */
export function getSqliteDatabase(): import("better-sqlite3").Database {
  if (!sqlitePath) {
    throw new Error("getSqliteDatabase() requires SQLITE_PATH");
  }
  if (!globalRef.__sqliteDb__) {
    mkdirSync(dirname(sqlitePath), { recursive: true });
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3") as typeof import("better-sqlite3");
    const db = new Database(sqlitePath);
    db.pragma("foreign_keys = ON");
    db.pragma("journal_mode = WAL");
    db.pragma("busy_timeout = 5000");
    applySqliteMigrations(db);
    globalRef.__sqliteDb__ = db;
  }
  return globalRef.__sqliteDb__;
}

function createSqliteSql(): Promise<Sql> {
  globalRef.__sqliteSqlPromise__ ??= Promise.resolve()
    .then(() => {
      const db = getSqliteDatabase();
      return toSql(async <T>(text: string, params: unknown[]) => {
        const stmt = db.prepare(pgPlaceholdersToSqlite(text));
        if (stmt.reader) return stmt.all(...params) as T[];
        stmt.run(...params);
        return [] as T[];
      });
    })
    .catch((err) => {
      globalRef.__sqliteSqlPromise__ = undefined;
      throw err;
    });
  return globalRef.__sqliteSqlPromise__;
}

let sqlPromise: Promise<Sql> | null = null;

async function createSql(): Promise<Sql> {
  if (typeof window !== "undefined") {
    throw new Error(
      "@/lib/db is server-only — call getSql() from a createServerFn handler " +
        "or a server route loader, never from client code.",
    );
  }
  return createSqliteSql();
}

/** Shared, server-only SQL client. Memoized — safe to call per request. */
export function getSql(): Promise<Sql> {
  sqlPromise ??= createSql().catch((err) => {
    sqlPromise = null;
    throw err;
  });
  return sqlPromise;
}

/** Open SQLite and apply migrations before traffic. */
export function ensureDbReady(): Promise<void> {
  return getSql().then(() => undefined);
}

const globalBoot = globalThis as typeof globalThis & {
  __pgBootstrapPromise__?: Promise<void>;
};
if (typeof window === "undefined") {
  globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
    globalBoot.__pgBootstrapPromise__ = undefined;
    console.error("[db] bootstrap failed:", err);
    throw err;
  });
}
