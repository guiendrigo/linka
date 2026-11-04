import { redirectTarget, resolveSmartLink, visitorStock } from "./resolve.ts";
import type { Resolution, SmartLink } from "./types.ts";

export const PUBLIC_CODE_RE = /^[a-z0-9-]{1,64}$/;

export type PublicVisit =
  | {
      kind: "redirect";
      url: string;
      title: string;
      role: "primary" | "fallback";
      hop: number;
      shop: string;
    }
  | { kind: "sold_out"; title: string; priceCents: number; resolution: Resolution }
  | { kind: "blocked"; title: string; priceCents: number; resolution: Resolution }
  | { kind: "missing" }
  | { kind: "invalid" };

export type PublicVisitIo = {
  freshen: (code: string) => Promise<void>;
  findStored: (code: string) => Promise<SmartLink | null | undefined>;
  findDemo: (code: string) => SmartLink | undefined;
};

export function parsePublicCode(data: unknown): string | null {
  if (typeof data !== "string" || !PUBLIC_CODE_RE.test(data)) return null;
  return data;
}

export async function decidePublicVisit(
  code: string,
  opts: { on?: string },
  io: PublicVisitIo,
): Promise<PublicVisit> {
  const parsed = parsePublicCode(code);
  if (!parsed) return { kind: "invalid" };

  try {
    await io.freshen(parsed);
  } catch {
    // A visita usa o último estoque conhecido se a Shopee não responder.
  }

  const link = (await io.findStored(parsed)) ?? io.findDemo(parsed);
  if (!link) return { kind: "missing" };

  const visitorLink = visitorStock(parsed, link, opts.on);
  const resolution = resolveSmartLink(visitorLink);
  const url = redirectTarget(resolution);

  if (url && resolution.status === "ok") {
    return {
      kind: "redirect",
      url,
      title: visitorLink.title,
      role: resolution.role,
      hop: resolution.hop,
      shop: resolution.offer.shop,
    };
  }

  if (resolution.status !== "ok") {
    return {
      kind: "sold_out",
      title: visitorLink.title,
      priceCents: visitorLink.priceCents,
      resolution,
    };
  }

  return {
    kind: "blocked",
    title: visitorLink.title,
    priceCents: visitorLink.priceCents,
    resolution,
  };
}
