import { n as __exportAll } from "../_runtime.mjs";
import { c as __exportAll$1 } from "./ssr.mjs";
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/db-sKYhmciq.js
var db_sKYhmciq_exports = /* @__PURE__ */ __exportAll({
	i: () => getSqliteDatabase,
	n: () => ensureDbReady,
	r: () => getSql,
	t: () => db_exports
});
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
/**
* Deploy-time database migrator — SQLite only (SQLITE_PATH).
*/
var sqlitePath$1 = process.env.SQLITE_PATH?.trim();
var rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
/** Prefer cwd so the Nitro bundle still finds /app/migrations/sqlite. */
function sqliteMigrationsDir(root = process.cwd()) {
	return join(root, "migrations", "sqlite");
}
/**
* Apply pending SQLite migrations. Returns how many files were applied.
* @param {{ exec: Function, prepare: Function, transaction: Function }} db
* @param {string} dir
*/
function applySqliteMigrations(db, dir = sqliteMigrationsDir()) {
	db.exec("CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT (datetime('now')))");
	let entries;
	try {
		entries = readdirSync(dir);
	} catch {
		console.log("[migrate] no migrations/sqlite/ directory — nothing to do.");
		return 0;
	}
	const applied = db.prepare("SELECT name FROM _migrations").all().map((row) => row.name);
	let count = 0;
	for (const { name, path } of pendingMigrations(entries.map((entry) => join(dir, entry)), applied)) {
		const text = readFileSync(path, "utf8");
		db.transaction(() => {
			db.exec(text);
			db.prepare("INSERT INTO _migrations (name) VALUES (?)").run(name);
		})();
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
	if (!sqlitePath$1) {
		console.log("[migrate] SQLITE_PATH not set — skipping.");
		process.exit(0);
	}
	await migrateSqlite(sqlitePath$1);
}
if (Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((err) => {
	console.error("[migrate] failed:", err?.message || err);
	process.exit(1);
});
function trimmed(value) {
	const next = value?.trim();
	return next ? next : void 0;
}
/**
* Requires SQLITE_PATH. Neon/PGLite were removed — see ADR 0002.
*/
function resolveDbSource(env) {
	if (!trimmed(env.SQLITE_PATH)) throw new Error("SQLITE_PATH is required (e.g. ./.local/linka.sqlite locally, /data/linka.sqlite on Magalu)");
	return "sqlite";
}
/** Convert `$1` placeholders to better-sqlite3 `?`. */
function pgPlaceholdersToSqlite(text) {
	return text.replace(/\$(\d+)/g, "?");
}
var db_exports = /* @__PURE__ */ __exportAll$1({
	ensureDbReady: () => ensureDbReady,
	getSql: () => getSql,
	getSqliteDatabase: () => getSqliteDatabase
});
function trimmedEnv(key) {
	if (typeof process === "undefined") return void 0;
	const value = process.env[key]?.trim();
	return value ? value : void 0;
}
var sqlitePath = trimmedEnv("SQLITE_PATH");
resolveDbSource({ SQLITE_PATH: sqlitePath });
var globalRef = globalThis;
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
/**
* Shared better-sqlite3 handle. Opens the file, enables foreign keys / WAL,
* and applies `migrations/sqlite/` before returning.
*/
function getSqliteDatabase() {
	if (!sqlitePath) throw new Error("getSqliteDatabase() requires SQLITE_PATH");
	if (!globalRef.__sqliteDb__) {
		mkdirSync(dirname(sqlitePath), { recursive: true });
		const db = new (createRequire(import.meta.url)("better-sqlite3"))(sqlitePath);
		db.pragma("foreign_keys = ON");
		db.pragma("journal_mode = WAL");
		db.pragma("busy_timeout = 5000");
		applySqliteMigrations(db);
		globalRef.__sqliteDb__ = db;
	}
	return globalRef.__sqliteDb__;
}
function createSqliteSql() {
	globalRef.__sqliteSqlPromise__ ??= Promise.resolve().then(() => {
		const db = getSqliteDatabase();
		return toSql(async (text, params) => {
			const stmt = db.prepare(pgPlaceholdersToSqlite(text));
			if (stmt.reader) return stmt.all(...params);
			stmt.run(...params);
			return [];
		});
	}).catch((err) => {
		globalRef.__sqliteSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__sqliteSqlPromise__;
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return createSqliteSql();
}
/** Shared, server-only SQL client. Memoized — safe to call per request. */
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/** Open SQLite and apply migrations before traffic. */
function ensureDbReady() {
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] bootstrap failed:", err);
	throw err;
});
//#endregion
export { getSqliteDatabase as i, ensureDbReady as n, getSql as r, db_sKYhmciq_exports as t };
