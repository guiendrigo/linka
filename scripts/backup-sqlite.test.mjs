import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import Database from "better-sqlite3";
import { backupSqlite } from "./backup-sqlite.mjs";

test("backup copia as tabelas para um segundo arquivo", async () => {
  const dir = mkdtempSync(join(tmpdir(), "linka-backup-"));
  const path = join(dir, "linka.sqlite");
  const source = new Database(path);
  source.exec("create table products (id text primary key, title text not null)");
  source.prepare("insert into products (id, title) values (?, ?)").run("p1", "Sérum");
  source.close();

  const dest = await backupSqlite(path);
  assert.match(dest, /backups\/linka-\d{8}T\d{6}\.sqlite$/);

  const copy = new Database(dest, { readonly: true, fileMustExist: true });
  const tables = copy.prepare("select name from sqlite_master where type = 'table' order by name").all();
  const row = copy.prepare("select title from products where id = ?").get("p1");
  copy.close();
  assert.ok(tables.some((item) => item.name === "products"));
  assert.equal(row.title, "Sérum");
});

test("sem SQLITE_PATH a cópia recusa", async () => {
  await assert.rejects(() => backupSqlite(""), /SQLITE_PATH is required/);
});
