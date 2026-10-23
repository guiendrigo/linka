import { createFileRoute, notFound } from "@tanstack/react-router";
import { ExternalLink, ShoppingBag, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
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
      ? [{ title: `${loaderData.title} · Achadinhos Shopee` }]
      : [{ title: "Página não encontrada · Linka" }],
  }),
  notFoundComponent: MissingBio,
  component: BioPage,
});

function BioPage() {
  const page = Route.useLoaderData();
  const description = page.description.trim();

  return (
    <BioShell>
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-3">
          <Avatar
            src={page.hasPhoto ? `/p/${page.code}/photo` : undefined}
            name={page.title}
            size="xl"
            className="size-24 rounded-full ring-4 ring-[var(--color-surface)] shadow-md object-cover"
          />
        </div>
        <Heading level={1} type="display-2" justify="center" className="text-xl sm:text-2xl font-bold">
          {page.title}
        </Heading>
        {description ? (
          <Text color="secondary" justify="center" className="mt-1.5 max-w-sm text-sm">
            {description}
          </Text>
        ) : null}
      </div>

      <div className="mt-2 w-full">
        <div className="mb-3 flex items-center justify-between text-xs text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider">
          <span>Achadinhos recomendados</span>
          <span className="flex items-center gap-1 text-[var(--color-text-accent)]">
            <Sparkles size={12} />
            <span>Links atualizados</span>
          </span>
        </div>

        {page.products.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
            <ShoppingBag size={28} className="mx-auto text-[var(--color-text-secondary)] mb-2" />
            <Text color="secondary" justify="center" className="text-sm">
              Nenhuma oferta disponível no momento.
            </Text>
            <Text color="secondary" justify="center" size="sm" className="mt-1">
              Volte em breve para novos achadinhos com estoque!
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {page.products.map((product: BioListItem) => (
              <div
                key={product.code}
                className="group flex flex-col justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs hover:border-[var(--color-accent)] transition-all sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-accent)] transition-colors">
                    {product.title}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-[var(--color-text-primary)] tabular-nums">
                      {formatBrl(product.priceCents)}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      &bull; Em estoque na Shopee
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <Button
                    href={`/r/${product.code}`}
                    variant="primary"
                    icon={<ExternalLink size={16} />}
                    label="Ver oferta"
                    width="100%"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BioShell>
  );
}

function MissingBio() {
  return (
    <BioShell>
      <div className="py-12 text-center">
        <Heading level={1} type="display-2" justify="center">
          Essa página não existe.
        </Heading>
        <Text color="secondary" justify="center" className="mt-2">
          O endereço digitado não aponta para nenhuma página de achadinhos.
        </Text>
        <div className="mt-6">
          <Button href="/" variant="primary" label="Ir para a página inicial" width="100%" />
        </div>
      </div>
    </BioShell>
  );
}

function BioShell({ children }: { children: ReactNode }) {
  return (
    <VStack gap={5} maxWidth={440} padding={4} className="mx-auto min-h-dvh w-full py-8 sm:py-12">
      {children}
      <div className="mt-auto pt-8 text-center text-xs text-[var(--color-text-secondary)]">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--color-text-primary)] transition-colors"
        >
          <span className="size-2 rounded-full bg-[var(--color-accent)]" />
          <span>Feito com <strong>Linka</strong> · Links de Afiliados Shopee</span>
        </a>
      </div>
    </VStack>
  );
}
