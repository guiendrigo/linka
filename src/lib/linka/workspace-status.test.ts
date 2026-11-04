import assert from "node:assert/strict";
import test from "node:test";
import { STOCK_FRESH_MS } from "./shopee.ts";
import { productListStatus, productViewFields } from "./workspace-status.ts";

function product(offers: { id: string; shop: string; url: string; inStock: boolean }[]) {
  return {
    code: "kit-ab",
    title: "Kit",
    priceCents: 1990,
    commissionPct: 12,
    offers,
  };
}

test("oferta em estoque → Em estoque / on true", () => {
  const status = productListStatus(
    product([{ id: "a", shop: "Loja A", url: "https://example.com/a", inStock: true }]),
  );
  assert.deepEqual(status, { label: "Em estoque", on: true });
});

test("todas out → Esgotado", () => {
  const status = productListStatus(
    product([
      { id: "a", shop: "Loja A", url: "https://example.com/a", inStock: false },
      { id: "b", shop: "Loja B", url: "https://example.com/b", inStock: false },
    ]),
  );
  assert.deepEqual(status, { label: "Esgotado", on: false });
});

test("sem ofertas → Sem destino", () => {
  const status = productListStatus(product([]));
  assert.deepEqual(status, { label: "Sem destino", on: false });
});

test("productViewFields inclui título curto do destino", () => {
  const view = productViewFields(
    product([{ id: "a", shop: "Loja Norte", url: "https://example.com/a", inStock: true }]),
  );
  assert.equal(view.destinationTitle, "Loja Norte");
  assert.equal(view.status.on, true);
});

test("pollMs da visão usa STOCK_FRESH_MS como fonte única", () => {
  assert.equal(STOCK_FRESH_MS, 15 * 60 * 1000);
});
