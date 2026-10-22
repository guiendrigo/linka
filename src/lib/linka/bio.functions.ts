import { createServerFn } from "@tanstack/react-start";
import type { MissingBioPage, PublicBioPage } from "@/lib/linka/store.server";

export const loadPublicBioPage = createServerFn({ method: "GET" })
  .validator((data: unknown): string => (typeof data === "string" ? data : ""))
  .handler(async ({ data }): Promise<PublicBioPage | MissingBioPage> => {
    const { loadPublicBio } = await import("@/lib/linka/store.server");
    return loadPublicBio(data);
  });
