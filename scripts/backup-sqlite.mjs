import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export function backupStamp(now = new Date()) {
  return now.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "");
}

export function backupDest(sqlitePath, now = new Date()) {
  return join(dirname(sqlitePath), "backups", `linka-${backupStamp(now)}.sqlite`);
}

export async function backupSqlite(sqlitePath) {
  const path = sqlitePath?.trim();
  if (!path) throw new Error("SQLITE_PATH is required");
  const dest = backupDest(path);
  mkdirSync(dirname(dest), { recursive: true });
  const require = createRequire(import.meta.url);
  const Database = require("better-sqlite3");
  const db = new Database(path, { readonly: true, fileMustExist: true });
  try {
    await db.backup(dest);
  } finally {
    db.close();
  }
  return dest;
}

const isMain =
  Boolean(process.argv[1]) && fileURLToPath(import.meta.url) === process.argv[1];

if (isMain) {
  backupSqlite(process.env.SQLITE_PATH)
    .then((dest) => {
      console.log(dest);
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exit(1);
    });
}
