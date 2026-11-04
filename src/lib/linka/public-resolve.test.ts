import assert from "node:assert/strict";
import test from "node:test";
import { DEMO_CODE, findLink } from "./catalog.ts";
import { decidePublicVisit, parsePublicCode } from "./public-resolve.ts";
import type { SmartLink } from "./types.ts";

function sample(code: string, url = "https://example.com/a"): SmartLink {
  return {
    code,
    title: "Kit",
    detail: "",
    priceCents: 1990,
    commissionPct: 12,
    offers: [{ id: "a", shop: "Loja", url, inStock: true }],
  };
}

function io(stored: SmartLink | null | undefined, demo?: SmartLink) {
  const order: string[] = [];
  return {
    order,
    io: {
      freshen: async () => {
        order.push("freshen");
      },
      findStored: async () => {
        order.push("stored");
        return stored;
      },
      findDemo: () => {
        order.push("demo");
        return demo;
      },
    },
  };
}

test("parsePublicCode aceita token curto e recusa o resto", () => {
  assert.equal(parsePublicCode("serum-c"), "serum-c");
  assert.equal(parsePublicCode("A"), null);
  assert.equal(parsePublicCode(""), null);
  assert.equal(parsePublicCode("x".repeat(65)), null);
});

test("decidePublicVisit recusa código inválido", async () => {
  const { io: fake } = io(undefined);
  const visit = await decidePublicVisit("MAIÚSCULO", {}, fake);
  assert.equal(visit.kind, "invalid");
});

test("freshen roda antes de ler o produto gravado", async () => {
  const stored = sample("abc");
  const { order, io: fake } = io(stored);
  const visit = await decidePublicVisit("abc", {}, fake);
  assert.deepEqual(order, ["freshen", "stored"]);
  assert.equal(visit.kind, "redirect");
  if (visit.kind === "redirect") {
    assert.equal(visit.url, "https://example.com/a");
    assert.equal(visit.shop, "Loja");
  }
});

test("se o freshen falha, ainda lê o estoque conhecido", async () => {
  const stored = sample("abc");
  stored.offers[0]!.inStock = false;
  const visit = await decidePublicVisit("abc", {}, {
    freshen: async () => {
      throw new Error("Shopee fora");
    },
    findStored: async () => stored,
    findDemo: () => undefined,
  });
  assert.equal(visit.kind, "sold_out");
});

test("redirect quando oferta https está em estoque", async () => {
  const { io: fake } = io(sample("x"));
  const visit = await decidePublicVisit("x", {}, fake);
  assert.equal(visit.kind, "redirect");
});

test("sold_out quando all_out ou empty", async () => {
  const empty = sample("e");
  empty.offers = [];
  let visit = await decidePublicVisit("e", {}, io(empty).io);
  assert.equal(visit.kind, "sold_out");
  if (visit.kind === "sold_out") assert.equal(visit.resolution.status, "empty");

  const out = sample("o");
  out.offers[0]!.inStock = false;
  visit = await decidePublicVisit("o", {}, io(out).io);
  assert.equal(visit.kind, "sold_out");
  if (visit.kind === "sold_out") assert.equal(visit.resolution.status, "all_out");
});

test("blocked quando url não é https seguro", async () => {
  const unsafe = sample("u", "http://inseguro.example/a");
  const visit = await decidePublicVisit("u", {}, io(unsafe).io);
  assert.equal(visit.kind, "blocked");
});

test("missing quando não há stored nem demo", async () => {
  const visit = await decidePublicVisit("zzz", {}, io(null).io);
  assert.equal(visit.kind, "missing");
});

test("demo cai no catálogo quando não há stored", async () => {
  const demo = findLink(DEMO_CODE);
  assert.ok(demo);
  const visit = await decidePublicVisit(DEMO_CODE, {}, io(undefined, demo).io);
  assert.equal(visit.kind, "redirect");
});

test("?on= altera estoque só no código de demonstração", async () => {
  const demo = findLink(DEMO_CODE);
  assert.ok(demo);
  const forced = await decidePublicVisit(DEMO_CODE, { on: "aurora" }, io(undefined, demo).io);
  assert.equal(forced.kind, "redirect");
  if (forced.kind === "redirect") assert.equal(forced.shop, "Loja Aurora");

  const stored = sample("meu-produto-ab12");
  const ignored = await decidePublicVisit("meu-produto-ab12", { on: "x" }, io(stored).io);
  assert.equal(ignored.kind, "redirect");
  if (ignored.kind === "redirect") assert.equal(ignored.url, "https://example.com/a");
});
