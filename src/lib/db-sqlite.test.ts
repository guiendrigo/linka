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
    ["0001_auth.sql", "0002_linka.sql", "0003_bio_page.sql", "0004_affiliate_stock.sql"],
  );
  const tables = await sql.query<{ name: string }>(
    "select name from sqlite_master where type = 'table' and name in ('stock_checks', 'shopee_credentials') order by name",
  );
  assert.deepEqual(
    tables.map((row) => row.name),
    ["stock_checks"],
  );
});

test("stock cache stores the supplied timestamp and product delete cascades offers", async () => {
  const { getSql } = await import("./db.ts");
  const sql = await getSql();
  const checkedAt = "2026-04-01T12:00:00.000Z";
  await sql`
    insert into stock_checks (shop_id, item_id, in_stock, checked_at)
    values (${"123"}, ${"456"}, ${1}, ${checkedAt})
    on conflict (shop_id, item_id) do update
      set in_stock = excluded.in_stock,
          checked_at = excluded.checked_at
  `;
  const cached = await sql.query<{ checked_at: string }>(
    "select checked_at from stock_checks where shop_id = $1 and item_id = $2",
    ["123", "456"],
  );
  assert.equal(cached[0]?.checked_at, checkedAt);

  await sql`
    insert into products (id, user_id, code, title, price_cents, commission_pct, created_at)
    values (${"prod-1"}, ${"user-a"}, ${"abc"}, ${"Sérum"}, ${1990}, ${10}, ${checkedAt})
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
