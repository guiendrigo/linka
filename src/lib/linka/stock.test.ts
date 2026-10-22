import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const dir = mkdtempSync(join(tmpdir(), "linka-stock-"));
process.env.SQLITE_PATH = join(dir, "linka.sqlite");
delete process.env.DATABASE_URL;

const ITEM_URL = "https://shopee.com.br/Kit-i.123456.789012";

async function withFetch(impl: typeof fetch, run: () => Promise<void>) {
  const previous = globalThis.fetch;
  globalThis.fetch = impl;
  try {
    await run();
  } finally {
    globalThis.fetch = previous;
  }
}

function catalogInStock() {
  return new Response(
    JSON.stringify({
      data: { productOfferV2: { nodes: [{ itemId: "789012", productName: "Kit", shopName: "Loja" }] } },
    }),
    { status: 200, headers: { "content-type": "application/json" } },
  );
}

async function seedOffer(userId: string, productId: string, offerId: string, code: string, inStock: boolean) {
  const { ensureDbReady, getSql } = await import("../db.ts");
  await ensureDbReady();
  const sql = await getSql();
  const createdAt = "2026-04-01T12:00:00.000Z";
  await sql`
    insert into products (id, user_id, code, title, price_cents, commission_pct, created_at)
    values (${productId}, ${userId}, ${code}, ${"Sérum"}, ${1990}, ${10}, ${createdAt})
  `;
  await sql`
    insert into offers (id, product_id, user_id, position, shop, url, in_stock)
    values (${offerId}, ${productId}, ${userId}, ${0}, ${"Loja"}, ${ITEM_URL}, ${inStock ? 1 : 0})
  `;
}

async function offerStock(offerId: string): Promise<number> {
  const { getSql } = await import("../db.ts");
  const sql = await getSql();
  const rows = await sql.query<{ in_stock: number }>("select in_stock from offers where id = $1", [offerId]);
  return Number(rows[0]?.in_stock ?? -1);
}

test("sem credencial da plataforma não mexe no estoque e não chama a Shopee", async () => {
  delete process.env.SHOPEE_AFFILIATE_APP_ID;
  delete process.env.SHOPEE_AFFILIATE_SECRET;
  await seedOffer("user-off", "prod-off", "off-off", "semcred", false);
  let calls = 0;
  await withFetch(async () => {
    calls += 1;
    return catalogInStock();
  }, async () => {
    const { decideStock } = await import("./stock-check.server.ts");
    const report = await decideStock("user-off");
    assert.equal(report.state, "not_configured");
    assert.equal(await offerStock("off-off"), 0);
    assert.equal(report.detail.includes("App ID"), false);
    assert.equal(report.detail.includes("segredo"), false);
  });
  assert.equal(calls, 0);
});

test("o segundo usuário reusa o cache do mesmo item", async () => {
  process.env.SHOPEE_AFFILIATE_APP_ID = "app-1";
  process.env.SHOPEE_AFFILIATE_SECRET = "secret-value";
  await seedOffer("user-a", "prod-a", "off-a", "cache-a", true);
  await seedOffer("user-b", "prod-b", "off-b", "cache-b", true);
  let calls = 0;
  await withFetch(async () => {
    calls += 1;
    return catalogInStock();
  }, async () => {
    const { decideStock } = await import("./stock-check.server.ts");
    const first = await decideStock("user-a");
    assert.equal(first.state, "updated");
    const second = await decideStock("user-b");
    assert.ok(second.state === "fresh" || second.state === "updated");
  });
  assert.equal(calls, 1);
  delete process.env.SHOPEE_AFFILIATE_APP_ID;
  delete process.env.SHOPEE_AFFILIATE_SECRET;
});
