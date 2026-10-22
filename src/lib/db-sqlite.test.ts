import assert from "node:assert/strict";
import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

const dir = mkdtempSync(join(tmpdir(), "linka-db-"));
const sqlitePath = join(dir, "linka.sqlite");
process.env.SQLITE_PATH = sqlitePath;
delete process.env.DATABASE_URL;

test("ensureDbReady creates the sqlite file and records migrations", async () => {
  const { dbSource, ensureDbReady, getSql } = await import("./db.ts");
  assert.equal(dbSource, "sqlite");
  await ensureDbReady();
  assert.equal(existsSync(sqlitePath), true);
  const sql = await getSql();
  const rows = await sql.query<{ name: string }>("select name from _migrations order by name");
  assert.deepEqual(
    rows.map((row) => row.name),
    ["0001_auth.sql", "0002_linka.sql"],
  );
});

test("credential upsert stores the supplied timestamp and product delete cascades offers", async () => {
  const { getSql } = await import("./db.ts");
  const sql = await getSql();
  const updatedAt = "2026-04-01T12:00:00.000Z";
  await sql`
    insert into shopee_credentials (user_id, app_id, secret, updated_at)
    values (${"user-a"}, ${"app"}, ${"secret-value"}, ${updatedAt})
    on conflict (user_id) do update
      set app_id = excluded.app_id,
          secret = excluded.secret,
          updated_at = excluded.updated_at
  `;
  const creds = await sql.query<{ updated_at: string }>(
    "select updated_at from shopee_credentials where user_id = $1",
    ["user-a"],
  );
  assert.equal(creds[0]?.updated_at, updatedAt);

  await sql`
    insert into products (id, user_id, code, title, price_cents, commission_pct, created_at)
    values (${"prod-1"}, ${"user-a"}, ${"abc"}, ${"Sérum"}, ${1990}, ${10}, ${updatedAt})
  `;
  await sql`
    insert into offers (id, product_id, user_id, position, shop, url, in_stock)
    values (${"off-1"}, ${"prod-1"}, ${"user-a"}, ${0}, ${"loja"}, ${"https://shopee.com.br/item"}, ${1})
  `;
  await sql`delete from products where id = ${"prod-1"} and user_id = ${"user-a"}`;
  const leftover = await sql.query<{ id: string }>("select id from offers where product_id = $1", [
    "prod-1",
  ]);
  assert.equal(leftover.length, 0);
});
