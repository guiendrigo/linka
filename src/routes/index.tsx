import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
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
      <div className="mt-8 grid items-start gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-14">
        <VStack gap={5}>
          <Heading level={1} type="display-1">
            O clique não se perde quando acaba o estoque na Shopee.
          </Heading>
          <Text color="secondary" className="text-base sm:text-lg">
            Um link inteligente de achadinho para Stories, WhatsApp e Bio. Se a loja principal esgotar,
            o Linka envia seu seguidor direto para o backup com estoque — sem você ter que trocar o link de novo.
          </Text>

          <div className="flex flex-col items-start gap-2 pt-1">
            <Button
              href="/login"
              variant="primary"
              label="Criar meu link grátis"
              icon={<ArrowRight size={16} aria-hidden="true" />}
            />
            <Text size="sm" color="secondary">
              Gratuito no beta · Sem cartão de crédito · Setup em 1 minuto
            </Text>
          </div>

          <ol className="mt-2 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4 py-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-muted)] text-sm font-bold text-[var(--color-text-accent)]">
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

          <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5">
              <CheckCircle2 size={16} className="text-[var(--color-text-accent)] shrink-0" aria-hidden="true" />
              <span className="text-xs text-[var(--color-text-secondary)]">Conferência Shopee automática</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5">
              <ShieldCheck size={16} className="text-[var(--color-text-accent)] shrink-0" aria-hidden="true" />
              <span className="text-xs text-[var(--color-text-secondary)]">Sua comissão 100% protegida</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5">
              <Sparkles size={16} className="text-[var(--color-text-accent)] shrink-0" aria-hidden="true" />
              <span className="text-xs text-[var(--color-text-secondary)]">Seguidor não precisa de conta</span>
            </div>
          </div>
        </VStack>
        <Bench />
      </div>

      <div className="mt-10 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-secondary)]">
        Quem clica é redirecionado via 302 direto para a oferta em estoque na Shopee. A decisão também responde como API pública em{" "}
        <a className="font-medium underline hover:text-[var(--color-text-primary)]" href={`/api/r/${DEMO_CODE}`}>
          /api/r/{DEMO_CODE}
        </a>
        .
      </div>

      {foundation ? <FoundationCheck /> : null}
    </AppShell>
  );
}
