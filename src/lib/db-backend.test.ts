import assert from "node:assert/strict";
import { test } from "node:test";
import { pgPlaceholdersToSqlite, resolveDbSource } from "./db-backend.ts";

test("SQLITE_PATH selects sqlite", () => {
  assert.equal(
    resolveDbSource({ SQLITE_PATH: " /data/linka.sqlite " }),
    "sqlite",
  );
});

test("missing SQLITE_PATH throws", () => {
  assert.throws(() => resolveDbSource({}), /SQLITE_PATH is required/);
  assert.throws(() => resolveDbSource({ SQLITE_PATH: "  " }), /SQLITE_PATH is required/);
});

test("pg placeholders become sqlite question marks", () => {
  assert.equal(
    pgPlaceholdersToSqlite("select * from products where user_id = $1 and code = $2"),
    "select * from products where user_id = ? and code = ?",
  );
});
