import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/linka/shell";
import { resolveCode } from "@/lib/linka/resolve.functions";
import { formatBrl, redirectTarget, resolutionCopy, resolveSmartLink, withStock } from "@/lib/linka/resolve";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/r/$code")({
  validateSearch: (search: Record<string, unknown>) => ({
    on: typeof search.on === "string" ? search.on : undefined,
  }),
  loaderDeps: ({ search }) => ({ on: search.on }),
  loader: async ({ params, deps }) => {
    const result = await resolveCode({ data: params.code });
    if (!result.found) throw notFound();
    const link = withStock(result.link, deps.on);
    const resolution = resolveSmartLink(link);
    const target = redirectTarget(resolution);
    if (target) {
      throw redirect({
        href: target,
        statusCode: 302,
        headers: { "cache-control": "no-store" },
      });
    }
    return { link, resolution };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.link.title} · Linka` }]
      : [{ title: "Link não encontrado · Linka" }],
  }),
  notFoundComponent: MissingLink,
  component: VisitorPage,
});

function VisitorPage() {
  const { link, resolution } = Route.useLoaderData();
  const copy =
    resolution.status === "ok"
      ? {
          title: "Destino bloqueado",
          body: "A oferta não é um link https. O clique não sai.",
        }
      : resolutionCopy(resolution);
  const eyebrow = resolution.status === "empty" ? "Link sem destino" : "Oferta esgotada";

  return (
    <AppShell account={false}>
      <article className="mx-auto mt-16 w-full max-w-md">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
        <h1 className="mt-3 text-4xl leading-none font-semibold tracking-tight">{link.title}</h1>
        <p className="mt-3 text-muted">
          <span className="tabular-nums">{formatBrl(link.priceCents)}</span>
          <span> · </span>
          <span className="tabular-nums">{link.commissionPct}%</span>
        </p>
        <div className="mt-8 rounded-3xl bg-surface p-2 shadow-ring">
          <div className="rounded-2xl bg-bg px-4 py-5">
            <p className="font-display text-3xl font-semibold">{copy.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{copy.body}</p>
          </div>
        </div>
      </article>
    </AppShell>
  );
}

function MissingLink() {
  return (
    <AppShell account={false}>
      <div className="mx-auto mt-16 w-full max-w-md">
        <h1 className="text-4xl leading-none font-semibold">Esse link não existe.</h1>
        <p className="mt-4 text-muted">Esse endereço não aponta para nenhum produto.</p>
        <Link to="/" className={`${buttonVariants({ variant: "primary" })} mt-8 w-full`}>
          Ir para o início
        </Link>
      </div>
    </AppShell>
  );
}