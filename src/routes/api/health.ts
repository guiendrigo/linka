import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const { probeSql } = await import("@/lib/linka/health");
        const { getSql } = await import("@/lib/db");
        const sql = await getSql().catch(() => null);
        const result = sql
          ? await probeSql(sql)
          : { ok: false as const, service: "linka" as const };
        return Response.json(result, { status: result.ok ? 200 : 503 });
      },
    },
  },
});
