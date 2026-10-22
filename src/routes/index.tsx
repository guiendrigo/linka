import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Bench } from "@/components/linka/bench";
import { ConsolePending, ConsoleShell } from "@/components/linka/console";
import { AppShell } from "@/components/linka/shell";
import { useWorkspace } from "@/components/linka/use-workspace";
import { LinksPanel, NewLinkButton, WorkspacePending } from "@/components/linka/workspace";
import { DEMO_CODE } from "@/lib/linka/catalog";

export const Route = createFileRoute("/")({
  component: Home,
});

const STEPS = [
  {
    title: "Conectar a Shopee",
    body: "Suas credenciais de afiliado, para buscar oferta e montar o link.",
  },
  {
    title: "Guardar o produto",
    body: "A oferta principal e os backups, na ordem em que o clique deve tentar.",
  },
  {
    title: "Colar uma vez",
    body: "O mesmo endereço no story, no grupo ou na bio. O clique cai na oferta com estoque.",
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
      subtitle="Um endereço. A oferta com estoque."
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
          products={data.products}
          canCheck={data.shopee.connected}
          onChange={(products) => setData({ ...data, products })}
          composing={composing}
          composeNonce={composeNonce}
          onComposingChange={setComposing}
        />
      )}
    </ConsoleShell>
  );
}

function PublicHome() {
  return (
    <AppShell>
      <div className="mt-8 grid items-start gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16">
        <section>
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Para quem vende na Shopee
          </p>
          <h1 className="mt-3 text-4xl leading-none font-semibold tracking-tight sm:text-5xl">
            O clique não se perde quando acaba o estoque.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Um link seu. Se a oferta principal sair do ar, o Linka manda a pessoa para o backup —
            sem você editar o story de novo.
          </p>
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4 py-4">
                <span className="font-display text-lg text-primary tabular-nums">{index + 1}</span>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <Bench />
      </div>
      <p className="mt-8 text-sm leading-relaxed text-muted lg:mt-12">
        Quem clica não precisa de conta: o endereço manda direto para a oferta com estoque. Se todas
        acabarem, a pessoa vê que esgotou. A decisão também responde em{" "}
        <a
          className="font-medium text-fg underline decoration-border underline-offset-4"
          href={`/api/r/${DEMO_CODE}`}
        >
          /api/r/{DEMO_CODE}
        </a>
        .
      </p>
    </AppShell>
  );
}
