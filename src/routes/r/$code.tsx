import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/linka/shell";
import { resolveCode } from "@/lib/linka/resolve.functions";
import { formatBrl, resolutionCopy, resolveSmartLink, withStock } from "@/lib/linka/resolve";
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
    return { link, resolution: resolveSmartLink(link) };
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
  const copy = resolutionCopy(resolution);
  const role =
    resolution.status === "ok"
      ? resolution.role === "primary"
        ? "Oferta principal"
        : `Backup ${resolution.hop}`
      : "Sem destino";

  return (
    <AppShell account={false}>
      <article className="mx-auto mt-10 w-full max-w-md">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Visita do link</p>
        <h1 className="mt-3 text-4xl leading-none font-semibold tracking-tight">{link.title}</h1>
        <p className="mt-3 text-muted">
          <span className="tabular-nums">{formatBrl(link.priceCents)}</span>
          <span> · </span>
          <span className="tabular-nums">{link.commissionPct}%</span>
        </p>

        <div className="mt-8 rounded-3xl bg-surface p-2 shadow-ring">
          <div className="rounded-2xl bg-bg px-4 py-5">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">{role}</p>
            <p className="mt-2 font-display text-3xl font-semibold">{copy.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{copy.body}</p>
            {resolution.status === "ok" ? (
              <p className="mt-4 text-sm break-all text-fg">{resolution.offer.url}</p>
            ) : null}
          </div>
        </div>

        <Link to="/" className={`${buttonVariants({ variant: "ghost" })} mt-4 w-full`}>
          Voltar para a bancada
        </Link>
      </article>
    </AppShell>
  );
}

function MissingLink() {
  return (
    <AppShell account={false}>
      <div className="mx-auto mt-16 w-full max-w-md">
        <h1 className="text-4xl leading-none font-semibold">Esse link não existe.</h1>
        <p className="mt-4 text-muted">O código não está no catálogo de exemplo.</p>
        <Link to="/" className={`${buttonVariants({ variant: "primary" })} mt-8 w-full`}>
          Ir para o início
        </Link>
      </div>
    </AppShell>
  );
}
