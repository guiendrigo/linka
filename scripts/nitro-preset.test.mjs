import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const src = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "..", "vite.config.ts"),
  "utf8",
);

test("nitro preset stays vercel unless NITRO_PRESET=node_server", () => {
  assert.match(src, /process\.env\.NITRO_PRESET === "node_server"/);
  assert.match(src, /\? "node_server" : "vercel"/);
});
