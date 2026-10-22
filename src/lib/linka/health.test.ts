import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { probeHealth, probeSql } from "./health.ts";

test("probeHealth ok quando o run resolve", async () => {
  const result = await probeHealth(async () => 1);
  assert.deepEqual(result, { ok: true, service: "linka" });
});

test("probeHealth não-ok quando o run rejeita", async () => {
  const result = await probeHealth(async () => {
    throw new Error("down");
  });
  assert.deepEqual(result, { ok: false, service: "linka" });
});

test("probeSql ok num SQLITE_PATH temporário e não-ok se a query falha", async () => {
  const dir = mkdtempSync(join(tmpdir(), "linka-health-"));
  process.env.SQLITE_PATH = join(dir, "linka.sqlite");
  delete process.env.DATABASE_URL;
  const { getSql } = await import("../db.ts");
  const sql = await getSql();
  assert.deepEqual(await probeSql(sql), { ok: true, service: "linka" });
  assert.deepEqual(
    await probeSql({
      query: async () => {
        throw new Error("cannot query");
      },
    }),
    { ok: false, service: "linka" },
  );
});
