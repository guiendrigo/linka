import { createFileRoute } from "@tanstack/react-router";
import { findLink } from "@/lib/linka/catalog";
import { resolveSmartLink } from "@/lib/linka/resolve";
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
        const code = params.code;
        if (!/^[a-z0-9-]{1,64}$/.test(code)) {
          return Response.json({ error: "invalid_code" }, { status: 400 });
        }
        const { findStoredLink } = await import("@/lib/linka/store.server");
        const link = (await findStoredLink(code)) ?? findLink(code);
        if (!link) return Response.json({ error: "not_found" }, { status: 404 });
        return Response.json({
          code: link.code,
          title: link.title,
          resolution: toPublic(resolveSmartLink(link)),
        });
      },
    },
  },
});
