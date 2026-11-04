import { findLink } from "./catalog.ts";
import { decidePublicVisit, type PublicVisit } from "./public-resolve.ts";

export async function decideStoredVisit(
  code: string,
  opts: { on?: string } = {},
): Promise<PublicVisit> {
  const { findStoredLink, freshenStoredStock } = await import("./store.server.ts");
  return decidePublicVisit(code, opts, {
    freshen: freshenStoredStock,
    findStored: findStoredLink,
    findDemo: findLink,
  });
}
