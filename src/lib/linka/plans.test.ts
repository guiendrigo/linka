import assert from "node:assert/strict";
import test from "node:test";
import {
  canAddProduct,
  FREE_PRODUCT_CAP,
  PRO_PRODUCT_CAP,
  productCap,
  productCapError,
} from "./plans.ts";

test("beta com cobrança desligada não tem teto", () => {
  assert.equal(productCap({ billingEnabled: false, isPro: false }), null);
  assert.equal(productCap({ billingEnabled: false, isPro: true }), null);
  assert.equal(canAddProduct(99, null), true);
});

test("Good é 1 achadinho; Better é 10", () => {
  assert.equal(productCap({ billingEnabled: true, isPro: false }), FREE_PRODUCT_CAP);
  assert.equal(productCap({ billingEnabled: true, isPro: true }), PRO_PRODUCT_CAP);
  assert.equal(FREE_PRODUCT_CAP, 1);
  assert.equal(PRO_PRODUCT_CAP, 10);
});

test("upgrade no limite, não no primeiro clique", () => {
  assert.equal(canAddProduct(0, 1), true);
  assert.equal(canAddProduct(1, 1), false);
  assert.equal(canAddProduct(9, 10), true);
  assert.equal(canAddProduct(10, 10), false);
});

test("mensagem de teto fala em perda do backup extra", () => {
  const free = productCapError({ isPro: false, cap: 1 });
  assert.match(free, /2º achadinho/);
  assert.match(free, /backup extra/);
  const pro = productCapError({ isPro: true, cap: 10 });
  assert.match(pro, /10 achadinhos/);
});
