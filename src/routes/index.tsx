import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button, Heading, Text, VStack } from "@/components/linka/ui";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Bench } from "@/components/linka/bench";
import { ConsolePending, ConsoleShell } from "@/components/linka/console";
import { FoundationCheck } from "@/components/linka/foundation-check";
import { AppShell } from "@/components/linka/shell";
import { useWorkspace } from "@/components/linka/use-workspace";
import { LinksPanel, NewLinkButton, WorkspacePending } from "@/components/linka/workspace";

export const Route = createFileRoute("/")({
  component: Home,
});

const STEPS = [
  {
    title: "O story de ontem ainda aponta pra esgotado",
    body: "Quem clica cai numa loja vazia. Você perde o clique e a comissão, e ainda reedita o Story no meio do expediente.",
  },
  {
    title: "Cole um único /r no Story, no grupo e na bio",
    body: "Guarde a oferta principal e até 3 backups. O endereço não muda quando a loja zera.",
  },
  {
    title: "O clique cai na loja com estoque",
    body: "Se a principal esgotar, o seguidor vai para a primeira reserva disponível. Sem você trocar o link.",
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
      subtitle={
        data && data.products.length === 0
          ? "Uma ação: montar o link e colar no Story."
          : "Cole o /r no Story. O clique cai no backup."
      }
      action={
        data && data.products.length > 0 ? (
          <NewLinkButton
            onClick={() => {
              setComposing(true);
              setComposeNonce((n) => n + 1);
            }}
          />
        ) : undefined
      }
    >
      {!data ? (
        <WorkspacePending error={error} />
      ) : (
        <LinksPanel
          bio={data.bio}
          products={data.products}
          canCheck={data.stock.automatic}
          pollMs={data.pollMs}
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
      <div className="grid items-center gap-12 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-2 lg:gap-16">
        <VStack gap={6}>
          <VStack gap={4}>
            <Heading level={1} type="display-1">
              O clique não se perde quando acaba o estoque na Shopee
            </Heading>
            <Text color="secondary" className="max-w-xl text-base sm:text-lg">
              Pra quem posta achadinho no Story, no grupo e na bio. Se a loja principal esgotar, o
              Linka manda o seguidor para o backup com estoque — sem você reeditar o Story.
            </Text>
            <Text color="secondary" className="max-w-xl text-sm">
              O story de ontem ainda aponta pra esgotado.
            </Text>
          </VStack>

          <div className="flex flex-col items-start gap-2">
            <Button href="/login" variant="primary" label="Montar meu link agora" />
            <Text size="sm" color="secondary">
              2 min, sem cartão
            </Text>
          </div>

          <ol className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4 py-4">
                <span className="w-6 shrink-0 font-mono text-sm text-[var(--color-text-secondary)] tabular-nums">
                  {index + 1}
                </span>
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

      {foundation ? <FoundationCheck /> : null}
    </AppShell>
  );
}
