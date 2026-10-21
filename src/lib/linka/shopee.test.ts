import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import {
  authorizationHeader,
  interpretOfferResponse,
  looksLikeAuthFailure,
  offerQueryPayload,
  parseShopeeItem,
} from "./shopee.ts";

test("lê o código do produto na URL", () => {
  assert.deepEqual(parseShopeeItem("https://shopee.com.br/Kit-i.123456.789012"), {
    shopId: "123456",
    itemId: "789012",
  });
  assert.deepEqual(parseShopeeItem("https://shopee.com.br/product/44/55"), {
    shopId: "44",
    itemId: "55",
  });
  assert.equal(parseShopeeItem("https://shopee.com.br/serum-noite-aurora"), null);
});

test("assinatura é o sha256 do app, hora, corpo e segredo", async () => {
  const payload = offerQueryPayload("1", "2");
  const header = await authorizationHeader("123", "segredo", payload, 1700000000);
  const signature = createHash("sha256").update(`1231700000000${payload}segredo`).digest("hex");
  assert.equal(header, `SHA256 Credential=123, Timestamp=1700000000, Signature=${signature}`);
});

test("lista vazia é sem estoque e erro não decide", () => {
  assert.equal(interpretOfferResponse({ data: { productOfferV2: { nodes: [] } } }, "9"), "out");
  assert.equal(
    interpretOfferResponse({ data: { productOfferV2: { nodes: [{ itemId: "9" }] } } }, "9"),
    "in",
  );
  assert.equal(interpretOfferResponse({ errors: [{ message: "Invalid Signature" }] }, "9"), "error");
  assert.equal(
    looksLikeAuthFailure("error [10035]: You currently do not have access to the Shopee Affiliate Open API Platform"),
    true,
  );
});
