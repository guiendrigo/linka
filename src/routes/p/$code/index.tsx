import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import type { BioListItem } from "@/lib/linka/bio";
import { loadPublicBioPage } from "@/lib/linka/bio.functions";
import { formatBrl } from "@/lib/linka/resolve";

export const Route = createFileRoute("/p/$code/")({
  headers: () => ({ "cache-control": "no-store" }),
  loader: async ({ params }) => {
    const result = await loadPublicBioPage({ data: params.code });
    if (!result.found) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.title} · Linka` }]
      : [{ title: "Link não encontrado · Linka" }],
  }),
  notFoundComponent: MissingBio,
  component: BioPage,
});

function BioPage() {
  const page = Route.useLoaderData();
  const description = page.description.trim();

  return (
    <BioShell>
      {page.hasPhoto ? (
        <img
          src={`/p/${page.code}/photo`}
          alt=""
          width={96}
          height={96}
          className="mx-auto size-24 rounded-full object-cover shadow-ring"
        />
      ) : (
        <div className="mx-auto grid size-24 place-items-center rounded-full bg-surface text-lg font-semibold text-muted shadow-ring">
          {initials(page.title)}
        </div>
      )}
      <h1 className="mt-5 text-center text-3xl leading-none font-semibold tracking-tight">{page.title}</h1>
      {description ? <p className="mt-3 text-center text-sm leading-relaxed text-muted">{description}</p> : null}

      {page.products.length === 0 ? (
        <p className="mt-10 text-center text-sm text-muted">Nenhuma oferta no momento</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {page.products.map((product: BioListItem) => (
            <li key={product.code}>
              <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-ring">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{product.title}</p>
                  <p className="mt-0.5 text-sm tabular-nums text-muted">{formatBrl(product.priceCents)}</p>
                </div>
                <Link
                  to="/r/$code"
                  params={{ code: product.code }}
                  search={{ on: undefined }}
                  className={`${buttonVariants({ variant: "primary" })} shrink-0 px-3`}
                >
                  Ver oferta
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </BioShell>
  );
}

function MissingBio() {
  return (
    <BioShell>
      <h1 className="text-center text-3xl leading-none font-semibold">Esse link não existe.</h1>
      <p className="mt-4 text-center text-sm text-muted">Esse endereço não aponta para nenhuma página.</p>
      <Link to="/" className={`${buttonVariants({ variant: "primary" })} mt-8 w-full`}>
        Ir para o início
      </Link>
    </BioShell>
  );
}

function BioShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh w-full max-w-sm flex-col px-5 py-10">
        {children}
        <p className="mt-auto pt-12 text-center text-xs text-muted">
          <Link to="/" className="font-display text-sm font-semibold tracking-tight text-fg">
            Linka
          </Link>
        </p>
      </div>
    </div>
  );
}

function initials(title: string): string {
  const parts = title.trim().split(/\s+/).filter(Boolean);
  const letters = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  return letters.toUpperCase() || "L";
}
