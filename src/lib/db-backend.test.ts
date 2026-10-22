import assert from "node:assert/strict";
import { test } from "node:test";
import { pgPlaceholdersToSqlite, resolveDbSource } from "./db-backend.ts";

test("SQLITE_PATH wins over DATABASE_URL", () => {
  assert.equal(
    resolveDbSource({
      SQLITE_PATH: " /data/linka.sqlite ",
      DATABASE_URL: "postgres://example",
    }),
    "sqlite",
  );
});

test("DATABASE_URL selects neon when SQLITE_PATH is empty", () => {
  assert.equal(
    resolveDbSource({ SQLITE_PATH: "  ", DATABASE_URL: "postgres://example" }),
    "neon",
  );
});

test("unset paths select pglite", () => {
  assert.equal(resolveDbSource({}), "pglite");
});

test("pg placeholders become sqlite question marks", () => {
  assert.equal(
    pgPlaceholdersToSqlite("select * from products where user_id = $1 and code = $2"),
    "select * from products where user_id = ? and code = ?",
  );
});
