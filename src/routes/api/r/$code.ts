import { createFileRoute } from "@tanstack/react-router";
import type { PublicVisit } from "@/lib/linka/public-resolve";
import type { Resolution } from "@/lib/linka/types";

function toPublicResolution(resolution: Resolution) {
  if (resolution.status !== "ok") return { status: resolution.status };
  return {
    status: resolution.status,
    role: resolution.role,
    hop: resolution.hop,
    shop: resolution.offer.shop,
    url: resolution.offer.url,
  };
}

function jsonForVisit(code: string, visit: PublicVisit): Response {
  switch (visit.kind) {
    case "invalid":
      return Response.json({ error: "invalid_code" }, { status: 400 });
    case "missing":
      return Response.json({ error: "not_found" }, { status: 404 });
    case "redirect":
      return Response.json({
        code,
        title: visit.title,
        resolution: {
          status: "ok" as const,
          role: visit.role,
          hop: visit.hop,
          shop: visit.shop,
          url: visit.url,
        },
      });
    case "sold_out":
      return Response.json({
        code,
        title: visit.title,
        resolution: toPublicResolution(visit.resolution),
      });
    case "blocked": {
      const resolution = visit.resolution;
      if (resolution.status !== "ok") {
        return Response.json({
          code,
          title: visit.title,
          resolution: toPublicResolution(resolution),
        });
      }
      return Response.json({
        code,
        title: visit.title,
        resolution: {
          status: "ok" as const,
          role: resolution.role,
          hop: resolution.hop,
          shop: resolution.offer.shop,
        },
      });
    }
  }
}

export const Route = createFileRoute("/api/r/$code")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const url = new URL(request.url);
        const on = url.searchParams.get("on") ?? undefined;
        const { decideStoredVisit } = await import("@/lib/linka/public-resolve.server");
        const visit = await decideStoredVisit(params.code, { on: on || undefined });
        return jsonForVisit(params.code, visit);
      },
    },
  },
});
