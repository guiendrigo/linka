import { redirectTarget, resolveSmartLink } from "./resolve.ts";

export const PHOTO_MAX_BYTES = 1_000_000;
export const BIO_CODE_RE = /^[a-z0-9]{8}$/;

const BIO_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

export type PhotoMime = "image/jpeg" | "image/png" | "image/webp";

export type BioIdentity = {
  title: string;
  description: string;
};

export type BioProductInput = {
  code: string;
  title: string;
  priceCents: number;
  bioVisible: boolean;
  offers: { id: string; shop: string; url: string; inStock: boolean }[];
};

export type BioListItem = {
  code: string;
  title: string;
  priceCents: number;
};

export function bioCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  let code = "";
  for (const byte of bytes) {
    code += BIO_ALPHABET[byte % BIO_ALPHABET.length];
  }
  return code;
}

export function cleanBioIdentity(input: { title?: string; description?: string }): BioIdentity {
  const title = (input.title ?? "").trim().replace(/\s+/g, " ");
  if (title.length < 2 || title.length > 80) {
    throw new Error("O título da página precisa ter entre 2 e 80 caracteres.");
  }
  const description = (input.description ?? "").trim().replace(/\s+/g, " ");
  if (description.length > 280) {
    throw new Error("A descrição cabe em 280 caracteres.");
  }
  return { title, description };
}

export function inspectPhoto(bytes: Uint8Array): PhotoMime {
  if (bytes.byteLength > PHOTO_MAX_BYTES) {
    throw new Error("A foto precisa ter no máximo 1 MB.");
  }
  if (bytes.byteLength < 12) {
    throw new Error("Esse arquivo de imagem não parece válido.");
  }
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "image/png";
  }
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  throw new Error("Envie uma foto em JPEG, PNG ou WebP.");
}

export function parsePhotoBase64(input: string): { mime: PhotoMime; bytes: Uint8Array } {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("Envie uma foto em JPEG, PNG ou WebP.");
  const comma = trimmed.indexOf(",");
  const raw = trimmed.startsWith("data:") && comma !== -1 ? trimmed.slice(comma + 1) : trimmed;
  const compact = raw.replace(/\s/g, "");
  if (!/^[A-Za-z0-9+/]+=*$/.test(compact) || compact.length > Math.ceil(PHOTO_MAX_BYTES * 1.4) + 8) {
    throw new Error("A foto precisa ter no máximo 1 MB.");
  }
  const bytes = decodeBase64(compact);
  return { mime: inspectPhoto(bytes), bytes };
}

export function bioListItems(products: BioProductInput[]): BioListItem[] {
  const items: BioListItem[] = [];
  for (const product of products) {
    if (!product.bioVisible) continue;
    const resolution = resolveSmartLink({
      code: product.code,
      title: product.title,
      detail: "",
      priceCents: product.priceCents,
      commissionPct: 0,
      offers: product.offers,
    });
    if (!redirectTarget(resolution)) continue;
    items.push({ code: product.code, title: product.title, priceCents: product.priceCents });
  }
  return items;
}

function decodeBase64(raw: string): Uint8Array {
  if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(raw, "base64"));
  const binary = atob(raw);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
