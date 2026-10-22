import { env } from "../../env.server.ts";

export type AffiliateCredential = {
  source: "platform" | "user";
  appId: string;
  secret: string;
};

export type ShopAuthorization = {
  shopId: string;
  accessToken: string;
  expiresAt: number;
};

export function resolveAffiliateCredential(_userId: string): AffiliateCredential | null {
  const appId = env("SHOPEE_AFFILIATE_APP_ID");
  const secret = env("SHOPEE_AFFILIATE_SECRET");
  if (!appId || !secret) return null;
  return { source: "platform", appId, secret };
}

export function resolveShopAuthorization(_userId: string, _shopId: string): ShopAuthorization | null {
  return null;
}
