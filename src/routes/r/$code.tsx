import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { AlertCircle, ShoppingBag } from "lucide-react";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AppShell } from "@/components/linka/shell";
import { resolveCode } from "@/lib/linka/resolve.functions";
import { formatBrl, redirectTarget, resolutionCopy, resolveSmartLink, visitorStock } from "@/lib/linka/resolve";

export const Route = createFileRoute("/r/$code")({
  validateSearch: (search: Record<string, unknown>) => ({
    on: typeof search.on === "string" ? search.on : undefined,
  }),
  loaderDeps: ({ search }) => ({ on: search.on }),
  loader: async ({ params, deps }) => {
    const result = await resolveCode({ data: params.code });
    if (!result.found) throw notFound();
    const link = visitorStock(params.code, result.link, deps.on);
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
      ? [{ title: `${loaderData.link.title} · Oferta Esgotada` }]
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
          title: "Destino indisponível",
          body: "A oferta não é um link seguro https. O clique não foi redirecionado.",
        }
      : resolutionCopy(resolution);

  return (
    <AppShell account={false}>
      <VStack gap={4} maxWidth={448} className="mx-auto mt-12 w-full text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
          <AlertCircle size={28} aria-hidden="true" />
        </div>

        <Heading level={1} type="display-2" justify="center">
          {link.title}
        </Heading>

        <div className="text-xl font-bold text-[var(--color-text-primary)] tabular-nums">
          {formatBrl(link.priceCents)}
        </div>

        <Card padding={4}>
          <VStack gap={2} hAlign="center" className="text-center">
            <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              Estoque encerrado
            </span>
            <Heading level={2} className="text-base font-bold">
              {copy.title}
            </Heading>
            <Text color="secondary" size="sm">
              {copy.body}
            </Text>
            <Text color="secondary" size="sm" className="mt-1 text-xs">
              Todas as lojas cadastradas para este achadinho estão sem estoque no momento.
            </Text>
          </VStack>
        </Card>

        <div className="pt-2">
          <Button href="/" variant="secondary" label="Conhecer o Linka" width="100%" />
        </div>
      </VStack>
    </AppShell>
  );
}

function MissingLink() {
  return (
    <AppShell account={false}>
      <VStack gap={4} maxWidth={448} className="mx-auto mt-16 w-full text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-accent-muted)] text-[var(--color-text-accent)]">
          <ShoppingBag size={28} aria-hidden="true" />
        </div>
        <Heading level={1} type="display-2" justify="center">
          Esse link não existe.
        </Heading>
        <Text color="secondary" justify="center">
          Esse endereço não aponta para nenhum produto ou achadinho ativo.
        </Text>
        <div className="pt-2">
          <Button href="/" variant="primary" label="Ir para a página inicial" width="100%" />
        </div>
      </VStack>
    </AppShell>
  );
}
