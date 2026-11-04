import { findLink } from "./catalog.ts";
import { decidePublicVisit, type PublicVisit } from "./public-resolve.ts";

export async function decideStoredVisit(
  code: string,
  opts: { on?: string } = {},
): Promise<PublicVisit> {
  const { findStoredLink, recordLastVisit } = await import("./store.server.ts");
  const { freshenForCode } = await import("./stock-freshen.server.ts");
  const visit = await decidePublicVisit(code, opts, {
    freshen: freshenForCode,
    findStored: findStoredLink,
    findDemo: findLink,
  });
  try {
    await recordLastVisit(code, visit);
  } catch {
    // Evidência de visita não pode atrasar o hop.
  }
  return visit;
}
