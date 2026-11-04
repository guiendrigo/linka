import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@astryxdesign/core/Button";
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
    title: "Guarde a oferta principal e os backups",
    body: "Cadastre o link do produto na Shopee e até 3 lojas de reserva com preço e estoque.",
  },
  {
    title: "Divulgue um único link no Story, no Grupo e na Bio",
    body: "Cole o endereço /r/codigo onde você fala com sua audiência. Você nunca mais precisa editar o story porque a loja esgotou.",
  },
  {
    title: "O clique cai sempre na loja com estoque",
    body: "Se a principal zerar, o Linka manda o seguidor direto para a primeira reserva disponível — e sua comissão está salva.",
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
              Um link de achadinho para Stories, WhatsApp e Bio. Se a loja principal esgotar, o
              Linka envia o seguidor para o backup com estoque, sem você trocar o link.
            </Text>
          </VStack>

          <div className="flex flex-col items-start gap-2">
            <Button href="/login" variant="primary" label="Criar meu link" />
            <Text size="sm" color="secondary">
              Beta, sem cartão
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

      <div className="mt-16 border-t border-[var(--color-border)] pt-6 font-mono text-xs text-[var(--color-text-secondary)]">
        Quem clica segue 302 para a oferta em estoque. A mesma decisão em{" "}
        <a className="underline hover:text-[var(--color-text-primary)]" href={`/api/r/${DEMO_CODE}`}>
          /api/r/{DEMO_CODE}
        </a>
      </div>

      {foundation ? <FoundationCheck /> : null}
    </AppShell>
  );
}
