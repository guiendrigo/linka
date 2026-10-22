import { resolveSmartLink } from "./resolve.ts";
import type { Resolution, SmartLink } from "./types.ts";

export const PUBLIC_CODE_RE = /^[a-z0-9-]{1,64}$/;

export type ResolvedLink = {
  found: true;
  link: SmartLink;
  resolution: Resolution;
};

export type MissingLink = { found: false };

export function parsePublicCode(data: unknown): string | null {
  if (typeof data !== "string" || !PUBLIC_CODE_RE.test(data)) return null;
  return data;
}

export async function loadPublicResolution(
  code: string,
  io: {
    freshen: (code: string) => Promise<void>;
    findStored: (code: string) => Promise<SmartLink | null | undefined>;
    findDemo: (code: string) => SmartLink | undefined;
  },
): Promise<ResolvedLink | MissingLink> {
  try {
    await io.freshen(code);
  } catch {
    // A visita usa o último estoque conhecido se a Shopee não responder.
  }
  const link = (await io.findStored(code)) ?? io.findDemo(code);
  if (!link) return { found: false };
  return { found: true, link, resolution: resolveSmartLink(link) };
}
