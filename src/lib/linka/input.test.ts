import assert from "node:assert/strict";
import test from "node:test";
import { centsToBrlInput, cleanProduct, parseBrlToCents, productCode } from "./input.ts";

test("lê preço em real", () => {
  assert.equal(parseBrlToCents("39,90"), 3990);
  assert.equal(parseBrlToCents("R$ 1.289,90"), 128990);
  assert.equal(parseBrlToCents("0"), null);
});

test("devolve o preço no formato do campo", () => {
  assert.equal(centsToBrlInput(2990), "29,90");
  assert.equal(parseBrlToCents(centsToBrlInput(128990)), 128990);
});
test("recusa link que não é https", () => {
  assert.throws(
    () =>
      cleanProduct({
        title: "Sérum",
        price: "10,00",
        commission: "12",
        offers: [{ shop: "Loja", url: "http://inseguro.example", inStock: true }],
      }),
    /https/,
  );
});

test("aceita short link https da Shopee", () => {
  const product = cleanProduct({
    title: "Sérum",
    price: "10,00",
    commission: "12",
    offers: [{ shop: "Loja", url: "https://shope.ee/abcDEF12", inStock: true }],
  });
  assert.equal(product.offers[0]?.url, "https://shope.ee/abcDEF12");
  assert.equal(product.offers[0]?.inStock, true);
});

test("gera código curto a partir do nome", () => {
  const code = productCode("Sérum vitamina C");
  assert.match(code, /^serum-vitamina-c-[a-z0-9]{4}$/);
});
