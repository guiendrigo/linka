import { createFileRoute } from "@tanstack/react-router";
import { BIO_CODE_RE } from "@/lib/linka/bio";

export const Route = createFileRoute("/p/$code/photo")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const code = params.code;
        if (!BIO_CODE_RE.test(code)) {
          return new Response(null, { status: 404, headers: { "cache-control": "no-store" } });
        }
        const { loadBioPhoto } = await import("@/lib/linka/store.server");
        const photo = await loadBioPhoto(code);
        if (!photo) {
          return new Response(null, { status: 404, headers: { "cache-control": "no-store" } });
        }
        return new Response(Buffer.from(photo.bytes), {
          status: 200,
          headers: {
            "content-type": photo.mime,
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
