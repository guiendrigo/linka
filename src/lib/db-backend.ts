/** Which database backend is active. */
export type DbSource = "sqlite" | "neon" | "pglite";

function trimmed(value: string | undefined): string | undefined {
  const next = value?.trim();
  return next ? next : undefined;
}

/**
 * SQLITE_PATH wins so Magalu never falls through to RAM. DATABASE_URL selects
 * Neon. Otherwise the in-memory PGLite preview fallback.
 */
export function resolveDbSource(env: {
  SQLITE_PATH?: string | undefined;
  DATABASE_URL?: string | undefined;
}): DbSource {
  if (trimmed(env.SQLITE_PATH)) return "sqlite";
  if (trimmed(env.DATABASE_URL)) return "neon";
  return "pglite";
}

/** Convert node-postgres `$1` placeholders to better-sqlite3 `?`. */
export function pgPlaceholdersToSqlite(text: string): string {
  return text.replace(/\$(\d+)/g, "?");
}
