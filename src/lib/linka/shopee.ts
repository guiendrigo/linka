/** Quanto tempo o estoque lido na Shopee vale antes de outra consulta. */
export const STOCK_FRESH_MS = 15 * 60 * 1000;

export const SHOPEE_GRAPHQL = "https://open-api.affiliate.shopee.com.br/graphql";

export type ShopeeItem = {
  shopId: string;
  itemId: string;
};

const ITEM_IN_PATH = /-i\.(\d{1,20})\.(\d{1,20})/;
const PRODUCT_PATH = /\/(?:product|opaanlp)\/(\d{1,20})\/(\d{1,20})/;

/** Tira loja e item de um link da Shopee. Encurtado sem esses números não serve. */
export function parseShopeeItem(url: string): ShopeeItem | null {
  const classic = url.match(ITEM_IN_PATH);
  if (classic?.[1] && classic[2]) return { shopId: classic[1], itemId: classic[2] };
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const product = parsed.pathname.match(PRODUCT_PATH);
  if (product?.[1] && product[2]) return { shopId: product[1], itemId: product[2] };
  const shopId = parsed.searchParams.get("shopid") ?? parsed.searchParams.get("shop_id");
  const itemId = parsed.searchParams.get("itemid") ?? parsed.searchParams.get("item_id");
  if (shopId && itemId && /^\d{1,20}$/.test(shopId) && /^\d{1,20}$/.test(itemId)) {
    return { shopId, itemId };
  }
  return null;
}

export function offerQueryPayload(shopId: string, itemId: string): string {
  if (!/^\d{1,20}$/.test(shopId) || !/^\d{1,20}$/.test(itemId)) {
    throw new Error("Código de produto inválido.");
  }
  const query = `{ productOfferV2(shopId: ${shopId}, itemId: ${itemId}, page: 1, limit: 5) { nodes { itemId productName shopName } } }`;
  return JSON.stringify({ query });
}

export async function authorizationHeader(
  appId: string,
  secret: string,
  payload: string,
  timestamp: number,
): Promise<string> {
  const bytes = new TextEncoder().encode(`${appId}${timestamp}${payload}${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const signature = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${signature}`;
}

/** A oferta listada pela Shopee está no ar. Lista vazia: saiu. Resposta torta: não mexe. */
export function interpretOfferResponse(body: unknown, itemId: string): "in" | "out" | "error" {
  if (!body || typeof body !== "object") return "error";
  const record = body as {
    errors?: unknown;
    data?: { productOfferV2?: { nodes?: unknown } };
  };
  if (Array.isArray(record.errors) && record.errors.length > 0) return "error";
  const nodes = record.data?.productOfferV2?.nodes;
  if (!Array.isArray(nodes)) return "error";
  if (nodes.length === 0) return "out";
  const ids = nodes.map((node) => {
    if (!node || typeof node !== "object" || !("itemId" in node)) return null;
    const value = (node as { itemId?: unknown }).itemId;
    return value == null ? null : String(value);
  });
  if (ids.every((id) => id == null)) return "in";
  return ids.some((id) => id === itemId) ? "in" : "out";
}

export function looksLikeRateLimit(body: unknown): boolean {
  const text = typeof body === "string" ? body : JSON.stringify(body ?? "");
  return /\b10030\b|rate limit/i.test(text);
}

export function looksLikeAuthFailure(body: unknown): boolean {
  if (looksLikeRateLimit(body)) return false;
  const text = typeof body === "string" ? body : JSON.stringify(body ?? "");
  return /signature|credential|unauthorized|do not have access|permission denied|forbidden|invalid auth|\b10020\b|\b10035\b/i.test(
    text,
  );
}
