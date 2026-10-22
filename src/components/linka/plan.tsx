import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Banner } from "@astryxdesign/core/Banner";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { usePurchases } from "@/components/linka/use-purchases";
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
    <VStack gap={4} maxWidth={448}>
      <Card padding={4}>
        <div className="flex items-start gap-3">
          <Sparkles className="size-5 text-accent" aria-hidden="true" />
          <VStack gap={1} className="min-w-0 flex-1">
            <Text weight="medium">Linka Pro</Text>
            <Text size="sm" color="secondary">
              {isPro ? "Assinatura ativa" : "Sem assinatura"}
            </Text>
            <Text size="sm" color="secondary">
              {isPro
                ? "A conta tem o entitlement linka_pro. Dá para gerenciar a cobrança na central do cliente."
                : "Anual ou mensal. O clique na oferta da RevenueCat abre o checkout na web."}
            </Text>
          </VStack>
        </div>

        {error ? <Banner status="error" title={error} /> : null}

        <VStack gap={2} className="mt-4">
          {status === "error" ? (
            <Button
              width="100%"
              label="Tentar de novo"
              isDisabled={pending}
              onClick={() => void run(refresh)}
            />
          ) : isPro ? (
            <Button
              width="100%"
              label="Gerenciar assinatura"
              isDisabled={!managementURL || pending}
              onClick={() => openCustomerCenter()}
            />
          ) : hasPaywall ? (
            <Button
              width="100%"
              label="Ver ofertas"
              isDisabled={pending}
              onClick={() => void run(presentPaywall)}
            />
          ) : null}
          {isPro && !managementURL ? (
            <Text size="sm" color="secondary">
              A central do cliente aparece quando a RevenueCat devolve o endereço de gerenciamento da
              assinatura web.
            </Text>
          ) : null}
        </VStack>
      </Card>

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
    </VStack>
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
    <Card padding={4}>
      <Text weight="medium">{pkg?.label ?? label}</Text>
      <Heading level={3}>{pkg?.formattedPrice || "—"}</Heading>
      <Text size="sm" color="secondary">
        {cadence}
      </Text>
      <Button
        className="mt-4"
        width="100%"
        variant={kind === "anual" ? "primary" : "secondary"}
        isDisabled={disabled || !pkg}
        label="Assinar"
        onClick={() => void onPick(kind)}
      />
    </Card>
  );
}
