/** Linka is SQLite-only (Magalu + local). */
export type DbSource = "sqlite";

function trimmed(value: string | undefined): string | undefined {
  const next = value?.trim();
  return next ? next : undefined;
}

/**
 * Requires SQLITE_PATH. Neon/PGLite were removed — see ADR 0002.
 */
export function resolveDbSource(env: {
  SQLITE_PATH?: string | undefined;
}): DbSource {
  if (!trimmed(env.SQLITE_PATH)) {
    throw new Error(
      "SQLITE_PATH is required (e.g. ./.local/linka.sqlite locally, /data/linka.sqlite on Magalu)",
    );
  }
  return "sqlite";
}

/** Convert `$1` placeholders to better-sqlite3 `?`. */
export function pgPlaceholdersToSqlite(text: string): string {
  return text.replace(/\$(\d+)/g, "?");
}
