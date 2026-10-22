import assert from "node:assert/strict";
import test from "node:test";
import { loadPublicResolution, parsePublicCode } from "./public-resolve.ts";
import type { SmartLink } from "./types.ts";

function sample(code: string): SmartLink {
  return {
    code,
    title: "Kit",
    detail: "",
    priceCents: 1990,
    commissionPct: 12,
    offers: [{ id: "a", shop: "Loja", url: "https://example.com/a", inStock: true }],
  };
}

test("parsePublicCode aceita token curto e recusa o resto", () => {
  assert.equal(parsePublicCode("serum-c"), "serum-c");
  assert.equal(parsePublicCode("A"), null);
  assert.equal(parsePublicCode(""), null);
  assert.equal(parsePublicCode("x".repeat(65)), null);
});

test("freshen roda antes de ler o produto gravado", async () => {
  const order: string[] = [];
  const stored = sample("abc");
  const result = await loadPublicResolution("abc", {
    freshen: async () => {
      order.push("freshen");
    },
    findStored: async () => {
      order.push("stored");
      return stored;
    },
    findDemo: () => {
      order.push("demo");
      return undefined;
    },
  });
  assert.deepEqual(order, ["freshen", "stored"]);
  assert.equal(result.found, true);
  if (result.found) {
    assert.equal(result.resolution.status, "ok");
    assert.equal(result.link.commissionPct, 12);
  }
});

test("se o freshen falha, ainda lê o estoque conhecido", async () => {
  const stored = sample("abc");
  stored.offers[0]!.inStock = false;
  const result = await loadPublicResolution("abc", {
    freshen: async () => {
      throw new Error("Shopee fora");
    },
    findStored: async () => stored,
    findDemo: () => undefined,
  });
  assert.equal(result.found, true);
  if (result.found) assert.equal(result.resolution.status, "all_out");
});
