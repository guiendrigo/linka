import { createServerFn } from "@tanstack/react-start";
import { findLink } from "@/lib/linka/catalog";
import { resolveSmartLink } from "@/lib/linka/resolve";
import type { Resolution, SmartLink } from "@/lib/linka/types";

export type ResolvedLink = {
  found: true;
  link: SmartLink;
  resolution: Resolution;
};

export type MissingLink = { found: false };

export const resolveCode = createServerFn({ method: "GET" })
  .validator((data: unknown): string => {
    if (typeof data !== "string" || !/^[a-z0-9-]{1,64}$/.test(data)) {
      throw new Error("Código inválido");
    }
    return data;
  })
  .handler(async ({ data }): Promise<ResolvedLink | MissingLink> => {
    const { findStoredLink } = await import("@/lib/linka/store.server");
    const link = (await findStoredLink(data)) ?? findLink(data);
    if (!link) return { found: false };
    return { found: true, link, resolution: resolveSmartLink(link) };
  });
