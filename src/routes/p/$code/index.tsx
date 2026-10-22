import { createFileRoute, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { List, ListItem } from "@astryxdesign/core/List";
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
      <Avatar
        src={page.hasPhoto ? `/p/${page.code}/photo` : undefined}
        name={page.title}
        size="xl"
        className="mx-auto"
      />
      <Heading level={1} type="display-2" justify="center">
        {page.title}
      </Heading>
      {description ? (
        <Text color="secondary" justify="center">
          {description}
        </Text>
      ) : null}

      {page.products.length === 0 ? (
        <Text color="secondary" justify="center">
          Nenhuma oferta no momento
        </Text>
      ) : (
        <List>
          {page.products.map((product: BioListItem) => (
            <ListItem
              key={product.code}
              label={product.title}
              description={formatBrl(product.priceCents)}
              endContent={<Button href={`/r/${product.code}`} variant="primary" label="Ver oferta" />}
            />
          ))}
        </List>
      )}
    </BioShell>
  );
}

function MissingBio() {
  return (
    <BioShell>
      <Heading level={1} type="display-2" justify="center">
        Esse link não existe.
      </Heading>
      <Text color="secondary" justify="center">
        Esse endereço não aponta para nenhuma página.
      </Text>
      <Button href="/" variant="primary" label="Ir para o início" width="100%" />
    </BioShell>
  );
}

function BioShell({ children }: { children: ReactNode }) {
  return (
    <VStack gap={4} maxWidth={384} padding={5} className="mx-auto min-h-dvh w-full py-10">
      {children}
      <Text justify="center" className="mt-auto pt-12">
        <Button href="/" variant="ghost" label="Linka" />
      </Text>
    </VStack>
  );
}
