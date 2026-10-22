import assert from "node:assert/strict";
import test from "node:test";
import { DEMO_CODE, findLink } from "./catalog.ts";
import { formatBrl, redirectTarget, resolveSmartLink, visitorStock } from "./resolve.ts";
import type { SmartLink } from "./types.ts";

function link(stock: boolean[]): SmartLink {
  return {
    code: "teste",
    title: "Teste",
    detail: "",
    priceCents: 1000,
    commissionPct: 10,
    offers: stock.map((inStock, index) => ({
      id: String(index),
      shop: `Loja ${index}`,
      url: `https://example.com/${index}`,
      inStock,
    })),
  };
}

test("prefere a oferta principal quando ela tem estoque", () => {
  const result = resolveSmartLink(link([true, true, false]));
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.role, "primary");
  assert.equal(result.hop, 0);
  assert.equal(result.offer.shop, "Loja 0");
});

test("cai no primeiro backup quando a principal acabou", () => {
  const result = resolveSmartLink(link([false, false, true]));
  assert.equal(result.status, "ok");
  if (result.status !== "ok") return;
  assert.equal(result.role, "fallback");
  assert.equal(result.hop, 2);
});

test("recusa o clique quando nada tem estoque", () => {
  assert.deepEqual(resolveSmartLink(link([false, false])), { status: "all_out" });
});

test("recusa um link sem ofertas", () => {
  assert.deepEqual(resolveSmartLink(link([])), { status: "empty" });
});

test("formata real sem depender do locale do servidor", () => {
  assert.equal(formatBrl(3990), "R$ 39,90");
  assert.equal(formatBrl(128990), "R$ 1.289,90");
});

test("?on= só vale no código de demonstração", () => {
  const demo = findLink(DEMO_CODE);
  assert.ok(demo);
  const forced = visitorStock(DEMO_CODE, demo, "aurora");
  assert.equal(forced.offers.find((offer) => offer.id === "aurora")?.inStock, true);
  assert.equal(forced.offers.find((offer) => offer.id === "norte")?.inStock, false);

  const stored = link([true, false]);
  stored.code = "meu-serum-ab12";
  const ignored = visitorStock(stored.code, stored, "1");
  assert.equal(ignored.offers[0]?.inStock, true);
  assert.equal(ignored.offers[1]?.inStock, false);
});

test("só redireciona para https", () => {
  const ok = resolveSmartLink(link([true]));
  assert.equal(redirectTarget(ok), "https://example.com/0");
  assert.equal(redirectTarget({ status: "all_out" }), null);
  const unsafe = resolveSmartLink({
    ...link([true]),
    offers: [{ id: "x", shop: "Loja", url: "http://inseguro.example/a", inStock: true }],
  });
  assert.equal(redirectTarget(unsafe), null);
});
