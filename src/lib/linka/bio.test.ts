import assert from "node:assert/strict";
import test from "node:test";
import {
  BIO_CODE_RE,
  PHOTO_MAX_BYTES,
  bioCode,
  bioListItems,
  cleanBioIdentity,
  inspectPhoto,
  parsePhotoBase64,
  type BioProductInput,
} from "./bio.ts";

function product(partial: Partial<BioProductInput> & Pick<BioProductInput, "code">): BioProductInput {
  return {
    title: "Sérum",
    priceCents: 3990,
    bioVisible: true,
    offers: [{ id: "1", shop: "Loja", url: "https://shopee.com.br/item", inStock: true }],
    ...partial,
  };
}

test("gera código opaco de 8 caracteres sem letras ambíguas", () => {
  const seen = new Set<string>();
  for (let i = 0; i < 40; i += 1) {
    const code = bioCode();
    assert.match(code, BIO_CODE_RE);
    assert.equal(/[01ilo]/.test(code), false);
    seen.add(code);
  }
  assert.equal(seen.size > 1, true);
});

test("aceita título e descrição limpos", () => {
  assert.deepEqual(cleanBioIdentity({ title: "  Ofertas da Ana  ", description: "skincare   hoje" }), {
    title: "Ofertas da Ana",
    description: "skincare hoje",
  });
  assert.deepEqual(cleanBioIdentity({ title: "Ana", description: "   " }), { title: "Ana", description: "" });
});

test("recusa identidade inválida em português", () => {
  assert.throws(() => cleanBioIdentity({ title: "A" }), /título/);
  assert.throws(() => cleanBioIdentity({ title: "x".repeat(81) }), /título/);
  assert.throws(() => cleanBioIdentity({ title: "Ana", description: "n".repeat(281) }), /descrição/i);
});

test("recusa foto grande, curta ou HEIC", () => {
  assert.throws(() => inspectPhoto(new Uint8Array(PHOTO_MAX_BYTES + 1)), /1 MB/);
  assert.throws(() => inspectPhoto(new Uint8Array([0xff, 0xd8])), /válido/);
  const heic = new Uint8Array([
    0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63, 0x00, 0x00, 0x00, 0x00,
  ]);
  assert.throws(() => inspectPhoto(heic), /JPEG, PNG ou WebP/);
});

test("reconhece jpeg png e webp e lê data URL", () => {
  const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x00]);
  const webp = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50]);
  assert.equal(inspectPhoto(jpeg), "image/jpeg");
  assert.equal(inspectPhoto(png), "image/png");
  assert.equal(inspectPhoto(webp), "image/webp");
  const parsed = parsePhotoBase64(`data:image/jpeg;base64,${Buffer.from(jpeg).toString("base64")}`);
  assert.equal(parsed.mime, "image/jpeg");
  assert.equal(parsed.bytes.byteLength, jpeg.byteLength);
});

test("lista só visível com estoque https, sem comissão", () => {
  const items = bioListItems([
    product({ code: "hidden", bioVisible: false }),
    product({
      code: "out",
      offers: [{ id: "1", shop: "Loja", url: "https://shopee.com.br/a", inStock: false }],
    }),
    product({
      code: "http",
      offers: [{ id: "1", shop: "Loja", url: "http://inseguro.example/a", inStock: true }],
    }),
    product({ code: "ok", title: "Protetor", priceCents: 5200 }),
  ]);
  assert.deepEqual(items, [{ code: "ok", title: "Protetor", priceCents: 5200 }]);
  assert.equal("commissionPct" in items[0], false);
});
