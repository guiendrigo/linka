import {
  authorizationHeader,
  interpretOfferResponse,
  looksLikeAuthFailure,
  looksLikeRateLimit,
  offerQueryPayload,
  SHOPEE_GRAPHQL,
} from "../shopee.ts";
import type { AffiliateCredential } from "./credentials.server.ts";

export type CatalogLookup =
  | { kind: "in" }
  | { kind: "out" }
  | { kind: "auth" }
  | { kind: "rate_limited" }
  | { kind: "down" };

function classifyFailure(body: unknown): "auth" | "rate_limited" | "down" {
  if (looksLikeRateLimit(body)) return "rate_limited";
  if (looksLikeAuthFailure(body)) return "auth";
  return "down";
}

export async function affiliateCatalog(
  cred: AffiliateCredential,
  shopId: string,
  itemId: string,
): Promise<CatalogLookup> {
  const payload = offerQueryPayload(shopId, itemId);
  const timestamp = Math.floor(Date.now() / 1000);
  const authorization = await authorizationHeader(cred.appId, cred.secret, payload, timestamp);
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
    if (looksLikeRateLimit(text)) return { kind: "rate_limited" };
    if (response.status === 401 || response.status === 403 || looksLikeAuthFailure(text)) {
      return { kind: "auth" };
    }
    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      return { kind: "down" };
    }
    if (!response.ok) return { kind: classifyFailure(json) };
    const read = interpretOfferResponse(json, itemId);
    if (read === "error") return { kind: classifyFailure(json) };
    return { kind: read };
  } catch {
    return { kind: "down" };
  }
}
