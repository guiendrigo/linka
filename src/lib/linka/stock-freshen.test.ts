import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const dir = mkdtempSync(join(tmpdir(), "linka-freshen-"));
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
    insert into offers (id, product_id, user_id, position, shop, url, in_stock, checked_at)
    values (${offerId}, ${productId}, ${userId}, ${0}, ${"Loja"}, ${ITEM_URL}, ${inStock ? 1 : 0}, ${null})
  `;
}

test("freshenForCode sem produto gravado é no-op", async () => {
  let calls = 0;
  await withFetch(async () => {
    calls += 1;
    return new Response("{}", { status: 200 });
  }, async () => {
    const { freshenForCode } = await import("./stock-freshen.server.ts");
    await freshenForCode("codigo-inexistente");
  });
  assert.equal(calls, 0);
});

test("freshenForCode com produto consulta estoque", async () => {
  delete process.env.SHOPEE_AFFILIATE_APP_ID;
  delete process.env.SHOPEE_AFFILIATE_SECRET;
  await seedOffer("user-code", "prod-code", "off-code", "meu-link", false);
  let calls = 0;
  await withFetch(async () => {
    calls += 1;
    return new Response("{}", { status: 200 });
  }, async () => {
    const { freshenForCode } = await import("./stock-freshen.server.ts");
    await freshenForCode("meu-link");
  });
  assert.equal(calls, 0);
});

test("freshenForCode arma cooldown após throttled e não reconsulta dentro da janela", async () => {
  process.env.SHOPEE_AFFILIATE_APP_ID = "app-1";
  process.env.SHOPEE_AFFILIATE_SECRET = "secret-value";
  await seedOffer("user-th", "prod-th", "off-th", "link-th", true);
  let calls = 0;
  await withFetch(async () => {
    calls += 1;
    return new Response(JSON.stringify({ errors: [{ message: "10030 rate limit" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }, async () => {
    const { freshenForCode } = await import("./stock-freshen.server.ts");
    await freshenForCode("link-th");
    assert.equal(calls, 1);
    await freshenForCode("link-th");
    assert.equal(calls, 1);
  });
  delete process.env.SHOPEE_AFFILIATE_APP_ID;
  delete process.env.SHOPEE_AFFILIATE_SECRET;
});

test("freshenForUser devolve StockReport com produtos da visão", async () => {
  delete process.env.SHOPEE_AFFILIATE_APP_ID;
  delete process.env.SHOPEE_AFFILIATE_SECRET;
  await seedOffer("user-ui", "prod-ui", "off-ui", "bio-ui", true);
  const { freshenForUser } = await import("./stock-freshen.server.ts");
  const report = await freshenForUser("user-ui", { force: false });
  assert.equal(report.state, "not_configured");
  assert.equal(report.products.length, 1);
  assert.equal(report.products[0]?.code, "bio-ui");
  assert.ok(Array.isArray(report.products[0]?.offers));
});

test("freshenForUser com force ignora frescor e tenta conferir", async () => {
  process.env.SHOPEE_AFFILIATE_APP_ID = "app-1";
  process.env.SHOPEE_AFFILIATE_SECRET = "secret-value";
  await seedOffer("user-force", "prod-force", "off-force", "force-link", true);
  const { getSql } = await import("../db.ts");
  const sql = await getSql();
  const freshAt = new Date().toISOString();
  await sql`update offers set checked_at = ${freshAt} where id = ${"off-force"}`;

  let calls = 0;
  await withFetch(async () => {
    calls += 1;
    return new Response(
      JSON.stringify({
        data: { productOfferV2: { nodes: [{ itemId: "789012", productName: "Kit", shopName: "Loja" }] } },
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  }, async () => {
    const { freshenForUser } = await import("./stock-freshen.server.ts");
    const report = await freshenForUser("user-force", { force: true, productId: "prod-force" });
    assert.equal(report.state, "updated");
    assert.equal(calls, 1);
  });
  delete process.env.SHOPEE_AFFILIATE_APP_ID;
  delete process.env.SHOPEE_AFFILIATE_SECRET;
});
