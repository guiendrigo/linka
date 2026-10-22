import assert from "node:assert/strict";
import test from "node:test";
import { affiliateCatalog } from "./shopee/affiliate.server.ts";

const cred = { source: "platform" as const, appId: "app-1", secret: "secret-value" };

async function withFetch(impl: typeof fetch, run: () => Promise<void>) {
  const previous = globalThis.fetch;
  globalThis.fetch = impl;
  try {
    await run();
  } finally {
    globalThis.fetch = previous;
  }
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("10030 vira rate_limited", async () => {
  await withFetch(async () => jsonResponse({ errors: [{ extensions: { code: 10030 } }] }), async () => {
    const result = await affiliateCatalog(cred, "1", "2");
    assert.equal(result.kind, "rate_limited");
  });
});

test("10020 vira auth", async () => {
  await withFetch(async () => jsonResponse({ errors: [{ extensions: { code: 10020 }, message: "Invalid Signature" }] }), async () => {
    const result = await affiliateCatalog(cred, "1", "2");
    assert.equal(result.kind, "auth");
  });
});
