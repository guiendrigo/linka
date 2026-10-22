import { createServerFn } from "@tanstack/react-start";
import { parsePublicCode, type MissingLink, type ResolvedLink } from "@/lib/linka/public-resolve";

export type { MissingLink, ResolvedLink };

export const resolveCode = createServerFn({ method: "GET" })
  .validator((data: unknown): string => {
    const code = parsePublicCode(data);
    if (!code) throw new Error("Código inválido");
    return code;
  })
  .handler(async ({ data }): Promise<ResolvedLink | MissingLink> => {
    const { loadStoredResolution } = await import("@/lib/linka/public-resolve.server");
    return loadStoredResolution(data);
  });
