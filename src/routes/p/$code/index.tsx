import { createFileRoute, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar, Button, Heading, Text, VStack } from "@/components/linka/ui";
import { HopNow } from "@/components/linka/hop-now";
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
      <VStack gap={2} hAlign="center" className="text-center">
        <Avatar
          src={page.hasPhoto ? `/p/${page.code}/photo` : undefined}
          name={page.title}
          size="xl"
          className="size-24 rounded-full object-cover"
        />
        <Heading level={1} type="display-2" justify="center" className="text-xl sm:text-2xl font-medium">
          {page.title}
        </Heading>
        {description ? (
          <Text color="secondary" justify="center" className="max-w-sm text-sm">
            {description}
          </Text>
        ) : null}
      </VStack>

      <VStack gap={3} className="w-full">
        <Text size="sm" color="secondary">
          Achadinhos
        </Text>

        {page.products.length === 0 ? (
          <Text color="secondary" size="sm">
            Nenhuma oferta disponível no momento.
          </Text>
        ) : (
          page.products.map((product: BioListItem) => (
            <div
              key={product.code}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="text-base font-medium text-[var(--color-text-primary)]">{product.title}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-medium tabular-nums text-[var(--color-text-primary)]">
                    {formatBrl(product.priceCents)}
                  </span>
                  <HopNow />
                </div>
              </div>
              <Button
                href={`/r/${product.code}`}
                variant="primary"
                icon={<ExternalLink size={16} />}
                label="Ver oferta"
                width="100%"
              />
            </div>
          ))
        )}
      </VStack>
    </BioShell>
  );
}

function MissingBio() {
  return (
    <BioShell>
      <VStack gap={4} className="py-12">
        <Heading level={1} type="display-2">
          Essa página não existe
        </Heading>
        <Text color="secondary">O endereço digitado não aponta para nenhuma página de achadinhos.</Text>
        <Button href="/" variant="primary" label="Ir para a página inicial" width="100%" />
      </VStack>
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
          className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-text-primary)]"
        >
          <span className="size-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
          <span>Feito com Linka</span>
        </a>
      </div>
    </VStack>
  );
}
