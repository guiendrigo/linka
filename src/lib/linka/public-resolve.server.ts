import { findLink } from "./catalog.ts";
import { decidePublicVisit, type PublicVisit } from "./public-resolve.ts";

export async function decideStoredVisit(
  code: string,
  opts: { on?: string } = {},
): Promise<PublicVisit> {
  const { findStoredLink } = await import("./store.server.ts");
  const { freshenForCode } = await import("./stock-freshen.server.ts");
  return decidePublicVisit(code, opts, {
    freshen: freshenForCode,
    findStored: findStoredLink,
    findDemo: findLink,
  });
}
