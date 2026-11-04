import { createServerFn } from "@tanstack/react-start";
import { parsePublicCode, type PublicVisit } from "@/lib/linka/public-resolve";

export type { PublicVisit };

type ResolveInput = { code: string; on?: string };

function parseResolveInput(data: unknown): ResolveInput {
  if (typeof data === "string") {
    const code = parsePublicCode(data);
    if (!code) throw new Error("Código inválido");
    return { code };
  }
  if (typeof data === "object" && data !== null && "code" in data) {
    const raw = data as { code: unknown; on?: unknown };
    const code = parsePublicCode(raw.code);
    if (!code) throw new Error("Código inválido");
    const on = typeof raw.on === "string" ? raw.on : undefined;
    return { code, on };
  }
  throw new Error("Código inválido");
}

export const resolveCode = createServerFn({ method: "GET" })
  .validator((data: unknown): ResolveInput => parseResolveInput(data))
  .handler(async ({ data }): Promise<PublicVisit> => {
    const { decideStoredVisit } = await import("@/lib/linka/public-resolve.server");
    return decideStoredVisit(data.code, { on: data.on });
  });
