import { createFileRoute } from "@tanstack/react-router";
import { parsePublicCode } from "@/lib/linka/public-resolve";
import type { Resolution } from "@/lib/linka/types";

function toPublic(resolution: Resolution) {
  if (resolution.status !== "ok") return { status: resolution.status };
  return {
    status: resolution.status,
    role: resolution.role,
    hop: resolution.hop,
    shop: resolution.offer.shop,
    url: resolution.offer.url,
  };
}

export const Route = createFileRoute("/api/r/$code")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const code = parsePublicCode(params.code);
        if (!code) {
          return Response.json({ error: "invalid_code" }, { status: 400 });
        }
        const { loadStoredResolution } = await import("@/lib/linka/public-resolve.server");
        const result = await loadStoredResolution(code);
        if (!result.found) return Response.json({ error: "not_found" }, { status: 404 });
        return Response.json({
          code: result.link.code,
          title: result.link.title,
          resolution: toPublic(result.resolution),
        });
      },
    },
  },
});
