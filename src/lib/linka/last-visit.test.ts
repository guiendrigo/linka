import assert from "node:assert/strict";
import test from "node:test";
import type { PublicVisit } from "./public-resolve.ts";
import {
  lastVisitCopy,
  parseLastVisitRole,
  relativeVisitPt,
  visitStampFromPublic,
} from "./last-visit.ts";

const now = Date.parse("2026-11-04T14:00:00.000Z");

test("visita de demo/ausente não gera carimbo", () => {
  assert.equal(visitStampFromPublic({ kind: "missing" }), null);
  assert.equal(visitStampFromPublic({ kind: "invalid" }), null);
});

test("redirect guarda loja e se caiu no backup", () => {
  const hop: PublicVisit = {
    kind: "redirect",
    url: "https://example.com/b",
    title: "Kit",
    role: "fallback",
    hop: 1,
    shop: "Loja Norte",
  };
  assert.deepEqual(visitStampFromPublic(hop), { role: "fallback", shop: "Loja Norte" });
});

test("esgotado honesto também é evidência", () => {
  const sold: PublicVisit = {
    kind: "sold_out",
    title: "Kit",
    priceCents: 1990,
    resolution: { status: "all_out" },
  };
  assert.deepEqual(visitStampFromPublic(sold), { role: "sold_out", shop: null });
});

test("copy do hop visível sem contar clique", () => {
  assert.equal(lastVisitCopy(null), "Ainda sem visita");
  assert.equal(
    lastVisitCopy({ at: "2026-11-04T13:59:30.000Z", role: "fallback", shop: "Loja Norte" }, now),
    "Último clique caiu no backup · Loja Norte · agora",
  );
  assert.equal(
    lastVisitCopy({ at: "2026-11-04T12:00:00.000Z", role: "primary", shop: "Loja Aurora" }, now),
    "Último clique: Loja Aurora · há 2 h",
  );
  assert.equal(
    lastVisitCopy({ at: "2026-11-04T13:00:00.000Z", role: "sold_out", shop: null }, now),
    "Último clique: esgotado · há 1 h",
  );
});

test("relativeVisitPt cobre agora, minutos e ontem", () => {
  assert.equal(relativeVisitPt("2026-11-04T14:00:00.000Z", now), "agora");
  assert.equal(relativeVisitPt("2026-11-04T13:50:00.000Z", now), "há 10 min");
  assert.equal(relativeVisitPt("2026-11-03T14:00:00.000Z", now), "ontem");
});

test("role desconhecida não entra na visão", () => {
  assert.equal(parseLastVisitRole("fallback"), "fallback");
  assert.equal(parseLastVisitRole("click"), null);
  assert.equal(parseLastVisitRole(1), null);
});
