import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Bench } from "@/components/linka/bench";
import { ConsolePending, ConsoleShell } from "@/components/linka/console";
import { FoundationCheck } from "@/components/linka/foundation-check";
import { AppShell } from "@/components/linka/shell";
import { useWorkspace } from "@/components/linka/use-workspace";
import { LinksPanel, NewLinkButton, WorkspacePending } from "@/components/linka/workspace";
import { DEMO_CODE } from "@/lib/linka/catalog";

export const Route = createFileRoute("/")({
  component: Home,
});

const STEPS = [
  {
    title: "Guardar o produto",
    body: "A oferta principal e os backups, na ordem em que o clique deve tentar.",
  },
  {
    title: "Colar uma vez",
    body: "O mesmo endereço no story, no grupo ou na bio. O clique cai na oferta com estoque.",
  },
  {
    title: "O backup entra se a principal acabar",
    body: "Você marca o que ainda vende. Se a principal sair, o clique vai para o próximo backup.",
  },
];

function Home() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <ConsolePending />;
  if (user) return <LinksHome />;
  return <PublicHome />;
}

function LinksHome() {
  const { data, error, setData } = useWorkspace();
  const [composing, setComposing] = useState(false);
  const [composeNonce, setComposeNonce] = useState(0);

  return (
    <ConsoleShell
      current="links"
      title="Links"
      subtitle="A página da bio e os links de cada produto."
      action={
        <NewLinkButton
          onClick={() => {
            setComposing(true);
            setComposeNonce((n) => n + 1);
          }}
        />
      }
    >
      {!data ? (
        <WorkspacePending error={error} />
      ) : (
        <LinksPanel
          bio={data.bio}
          products={data.products}
          canCheck={data.stock.automatic}
          onChange={(patch) => setData({ ...data, ...patch })}
          composing={composing}
          composeNonce={composeNonce}
          onComposingChange={setComposing}
        />
      )}
    </ConsoleShell>
  );
}

function PublicHome() {
  const [foundation, setFoundation] = useState(false);
  useEffect(() => {
    setFoundation(new URLSearchParams(window.location.search).has("foundation"));
  }, []);

  return (
    <AppShell>
      <div className="mt-8 grid items-start gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16">
        <VStack gap={4}>
          <Text color="accent" weight="semibold">
            Para quem vende na Shopee
          </Text>
          <Heading level={1} type="display-1">
            O clique não se perde quando acaba o estoque.
          </Heading>
          <Text color="secondary">
            Um link seu. Se a oferta principal sair do ar, o Linka manda a pessoa para o backup — sem você
            editar o story de novo.
          </Text>
          <ol className="divide-y divide-border border-y border-border">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4 py-4">
                <Text color="accent" weight="semibold">
                  {index + 1}
                </Text>
                <VStack gap={1}>
                  <Text weight="medium">{step.title}</Text>
                  <Text color="secondary" size="sm">
                    {step.body}
                  </Text>
                </VStack>
              </li>
            ))}
          </ol>
        </VStack>
        <Bench />
      </div>
      <Text color="secondary" className="mt-8 lg:mt-12">
        Quem clica não precisa de conta: o endereço manda direto para a oferta com estoque. Se todas
        acabarem, a pessoa vê que esgotou. A decisão também responde em{" "}
        <a className="font-medium underline" href={`/api/r/${DEMO_CODE}`}>
          /api/r/{DEMO_CODE}
        </a>
        .
      </Text>
      {foundation ? <FoundationCheck /> : null}
    </AppShell>
  );
}
