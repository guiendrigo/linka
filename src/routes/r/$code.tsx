import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
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
      <VStack gap={4} maxWidth={448} className="mx-auto mt-16 w-full">
        <Text color="accent" weight="semibold">
          {eyebrow}
        </Text>
        <Heading level={1} type="display-2">
          {link.title}
        </Heading>
        <Text color="secondary" hasTabularNumbers>
          {formatBrl(link.priceCents)}
        </Text>
        <Card padding={4}>
          <Heading level={2}>{copy.title}</Heading>
          <Text color="secondary">{copy.body}</Text>
        </Card>
      </VStack>
    </AppShell>
  );
}

function MissingLink() {
  return (
    <AppShell account={false}>
      <VStack gap={4} maxWidth={448} className="mx-auto mt-16 w-full">
        <Heading level={1} type="display-2">
          Esse link não existe.
        </Heading>
        <Text color="secondary">Esse endereço não aponta para nenhum produto.</Text>
        <Button href="/" variant="primary" label="Ir para o início" width="100%" />
      </VStack>
    </AppShell>
  );
}
