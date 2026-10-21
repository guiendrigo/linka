import {
  authorizationHeader,
  interpretOfferResponse,
  looksLikeAuthFailure,
  offerQueryPayload,
  SHOPEE_GRAPHQL,
} from "@/lib/linka/shopee";

export type Lookup = { kind: "in" } | { kind: "out" } | { kind: "auth" } | { kind: "down" };

export async function lookupOffer(
  appId: string,
  secret: string,
  shopId: string,
  itemId: string,
): Promise<Lookup> {
  const payload = offerQueryPayload(shopId, itemId);
  const timestamp = Math.floor(Date.now() / 1000);
  const authorization = await authorizationHeader(appId, secret, payload, timestamp);
  try {
    const response = await fetch(SHOPEE_GRAPHQL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization,
      },
      body: payload,
      signal: AbortSignal.timeout(4000),
    });
    const text = await response.text();
    if (response.status === 401 || response.status === 403 || looksLikeAuthFailure(text)) {
      return { kind: "auth" };
    }
    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      return { kind: "down" };
    }
    if (!response.ok) return looksLikeAuthFailure(json) ? { kind: "auth" } : { kind: "down" };
    const read = interpretOfferResponse(json, itemId);
    if (read === "error") return looksLikeAuthFailure(json) ? { kind: "auth" } : { kind: "down" };
    return { kind: read };
  } catch {
    return { kind: "down" };
  }
}
