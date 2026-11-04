import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Button, Heading, Text, VStack } from "@/components/linka/ui";
import { AppShell } from "@/components/linka/shell";
import { resolveCode } from "@/lib/linka/resolve.functions";
import { formatBrl, resolutionCopy } from "@/lib/linka/resolve";

export const Route = createFileRoute("/r/$code")({
  validateSearch: (search: Record<string, unknown>) => ({
    on: typeof search.on === "string" ? search.on : undefined,
  }),
  loaderDeps: ({ search }) => ({ on: search.on }),
  loader: async ({ params, deps }) => {
    const visit = await resolveCode({ data: { code: params.code, on: deps.on } });
    switch (visit.kind) {
      case "invalid":
      case "missing":
        throw notFound();
      case "redirect":
        throw redirect({
          href: visit.url,
          statusCode: 302,
          headers: { "cache-control": "no-store" },
        });
      case "sold_out":
        return { kind: "sold_out" as const, visit };
      case "blocked":
        return { kind: "blocked" as const, visit };
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.visit.title} · Oferta esgotada` }]
      : [{ title: "Link não encontrado · Linka" }],
  }),
  notFoundComponent: MissingLink,
  component: VisitorPage,
});

function VisitorPage() {
  const { visit } = Route.useLoaderData();
  const copy =
    visit.kind === "blocked"
      ? {
          title: "Destino indisponível",
          body: "A oferta não é um link seguro https. O clique não foi redirecionado.",
        }
      : resolutionCopy(visit.resolution);

  return (
    <AppShell account={false}>
      <VStack gap={5} maxWidth={448} className="mx-auto mt-16 w-full">
        <VStack gap={2}>
          <Text size="sm" color="secondary">
            {visit.kind === "blocked" ? "Destino indisponível" : "Esgotado"}
          </Text>
          <Heading level={1} type="display-2">
            {visit.title}
          </Heading>
          <span className="text-2xl font-medium tabular-nums text-[var(--color-text-primary)]">
            {formatBrl(visit.priceCents)}
          </span>
        </VStack>

        <VStack gap={2}>
          <Heading level={2} className="text-base font-medium">
            {copy.title}
          </Heading>
          <Text color="secondary" size="sm">
            {copy.body}
          </Text>
          <Text color="secondary" size="sm">
            Todas as lojas cadastradas para este achadinho estão sem estoque no momento.
          </Text>
        </VStack>

        <Button href="/" variant="secondary" label="Conhecer o Linka" width="100%" />
      </VStack>
    </AppShell>
  );
}

function MissingLink() {
  return (
    <AppShell account={false}>
      <VStack gap={4} maxWidth={448} className="mx-auto mt-16 w-full">
        <Heading level={1} type="display-2">
          Esse link não existe
        </Heading>
        <Text color="secondary">Esse endereço não aponta para nenhum produto ou achadinho ativo.</Text>
        <Button href="/" variant="primary" label="Ir para a página inicial" width="100%" />
      </VStack>
    </AppShell>
  );
}
