import { findLink } from "./catalog.ts";
import { loadPublicResolution, type MissingLink, type ResolvedLink } from "./public-resolve.ts";

export async function loadStoredResolution(code: string): Promise<ResolvedLink | MissingLink> {
  const { findStoredLink, freshenStoredStock } = await import("./store.server.ts");
  return loadPublicResolution(code, {
    freshen: freshenStoredStock,
    findStored: findStoredLink,
    findDemo: findLink,
  });
}
