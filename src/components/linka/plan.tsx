import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePurchases } from "@/components/linka/use-purchases";
import { cn } from "@/lib/cn";
import type { PlanKind, PlanPackageView } from "@/lib/linka/purchases";

export function PlanPanel() {
  const {
    status,
    isPro,
    hasPaywall,
    managementURL,
    packages,
    error,
    presentPaywall,
    purchasePlan,
    openCustomerCenter,
    refresh,
  } = usePurchases();
  const [pending, setPending] = useState(false);

  async function run(action: () => Promise<unknown>) {
    if (pending) return;
    setPending(true);
    try {
      await action();
    } finally {
      setPending(false);
    }
  }

  if (status === "loading" || status === "idle") {
    return <div className="h-40 max-w-md animate-pulse rounded-3xl bg-surface" aria-busy="true" />;
  }

  return (
    <div className="flex max-w-md flex-col gap-4">
      <section className="rounded-3xl border border-dashed border-border bg-surface p-4">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Linka Pro</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
              <span
                className={cn("size-1.5 rounded-full", isPro ? "bg-primary" : "bg-muted")}
                aria-hidden="true"
              />
              {isPro ? "Assinatura ativa" : "Sem assinatura"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {isPro
                ? "A conta tem o entitlement linka_pro. Dá para gerenciar a cobrança na central do cliente."
                : "Anual ou mensal. O clique na oferta da RevenueCat abre o checkout na web."}
            </p>
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-primary">{error}</p> : null}

        <div className="mt-4 flex flex-col gap-2">
          {status === "error" ? (
            <Button className="w-full" onClick={() => void run(refresh)} disabled={pending}>
              Tentar de novo
            </Button>
          ) : isPro ? (
            <Button
              className="w-full"
              onClick={() => openCustomerCenter()}
              disabled={!managementURL || pending}
            >
              Gerenciar assinatura
            </Button>
          ) : hasPaywall ? (
            <Button className="w-full" onClick={() => void run(presentPaywall)} disabled={pending}>
              Ver ofertas
            </Button>
          ) : null}
          {isPro && !managementURL ? (
            <p className="text-xs leading-relaxed text-muted">
              A central do cliente aparece quando a RevenueCat devolve o endereço de gerenciamento
              da assinatura web.
            </p>
          ) : null}
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <PlanCard
          pkg={packages.anual}
          kind="anual"
          disabled={status !== "ready" || pending}
          onPick={(kind) => run(() => purchasePlan(kind))}
        />
        <PlanCard
          pkg={packages.mensal}
          kind="mensal"
          disabled={status !== "ready" || pending}
          onPick={(kind) => run(() => purchasePlan(kind))}
        />
      </div>
    </div>
  );
}

function PlanCard({
  pkg,
  kind,
  disabled,
  onPick,
}: {
  pkg: PlanPackageView | null;
  kind: PlanKind;
  disabled: boolean;
  onPick: (kind: PlanKind) => void | Promise<unknown>;
}) {
  const label = kind === "anual" ? "Anual" : "Mensal";
  const cadence = kind === "anual" ? "por ano" : "por mês";

  return (
    <section className="rounded-3xl border border-border bg-surface p-4">
      <p className="text-sm font-medium">{pkg?.label ?? label}</p>
      <p className="mt-2 font-display text-2xl tracking-tight">{pkg?.formattedPrice || "—"}</p>
      <p className="mt-1 text-xs text-muted">{cadence}</p>
      <Button
        className="mt-4 w-full"
        variant={kind === "anual" ? "primary" : "ghost"}
        disabled={disabled || !pkg}
        onClick={() => void onPick(kind)}
      >
        Assinar
      </Button>
    </section>
  );
}
