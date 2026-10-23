import {
  Check,
  CheckCircle2,
  ExternalLink,
  Lock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@astryxdesign/core/Badge";
import { Banner } from "@astryxdesign/core/Banner";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
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
    return (
      <VStack gap={4} maxWidth={720} className="w-full" aria-busy="true">
        <div className="h-44 w-full animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-72 animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]" />
          <div className="h-72 animate-pulse rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]" />
        </div>
      </VStack>
    );
  }

  if (isPro) {
    return (
      <VStack gap={4} maxWidth={720} className="w-full">
        <Banner
          status="success"
          title="Assinatura Pro Ativa"
          description="Sua conta está com proteção total de comissões, monitoramento automático de estoque na Shopee e múltiplos links de backup ativados."
        />

        <Card padding={5} elevation="low" className="border border-[var(--color-border)] bg-[var(--color-surface)]">
          <VStack gap={4}>
            <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
              <HStack gap={2} vAlign="center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-accent-muted)] text-[var(--color-text-accent)]">
                  <Sparkles className="size-5" aria-hidden="true" />
                </div>
                <VStack gap={0}>
                  <Heading level={2} className="text-lg font-bold sm:text-xl">
                    Você é Linka Pro
                  </Heading>
                  <Text size="sm" color="secondary">
                    Suas vendas e comissões na Shopee estão 100% protegidas
                  </Text>
                </VStack>
              </HStack>
              <Badge variant="success" label="Assinatura Pro Ativa" />
            </HStack>

            <Text size="sm" color="secondary" className="leading-relaxed">
              Todos os seus links inteligentes monitoram a disponibilidade de estoque na Shopee.
              Se uma loja zerar o produto, seus seguidores são enviados automaticamente para as ofertas reservas cadastradas.
            </Text>

            <div className="grid gap-2.5 sm:grid-cols-2 pt-1">
              <div className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <Text size="sm">Checagem contínua no catálogo Shopee</Text>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <Text size="sm">Até 3 backups por produto</Text>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <Text size="sm">Redirecionamento automático sem tela de erro</Text>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <Text size="sm">Vitrine de bio (/p/...) sempre atualizada</Text>
              </div>
            </div>

            {error ? <Banner status="error" title={error} /> : null}

            <VStack gap={2} className="pt-2">
              <Button
                variant="secondary"
                label="Gerenciar assinatura"
                icon={<ExternalLink className="size-4" aria-hidden="true" />}
                isDisabled={!managementURL || pending}
                onClick={() => openCustomerCenter()}
              />
              {!managementURL ? (
                <Text size="xsm" color="secondary">
                  O painel de gerenciamento de faturamento é sincronizado diretamente pelo provedor de checkout seguro.
                </Text>
              ) : null}
            </VStack>
          </VStack>
        </Card>
      </VStack>
    );
  }

  return (
    <VStack gap={5} maxWidth={720} className="w-full">
      {error ? <Banner status="error" title={error} /> : null}

      {/* Cartão de destaque Linka Pro */}
      <Card padding={5} className="border border-[var(--color-border)] bg-[var(--color-surface)]">
        <VStack gap={4}>
          <HStack gap={3} vAlign="center" justify="between" wrap="wrap">
            <HStack gap={2} vAlign="center">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--color-accent-muted)] text-[var(--color-text-accent)]">
                <Sparkles className="size-5" aria-hidden="true" />
              </div>
              <VStack gap={0}>
                <Heading level={2} className="text-lg font-bold sm:text-xl">
                  Linka Pro
                </Heading>
                <Text size="sm" color="secondary">
                  Proteção máxima de comissões para afiliados da Shopee
                </Text>
              </VStack>
            </HStack>
            <Badge variant="orange" label="Recomendado para Afiliados" />
          </HStack>

          <Text color="secondary" className="text-sm sm:text-base leading-relaxed">
            Não deixe seus seguidores caírem em links de produtos esgotados. Com o <strong>Linka Pro</strong>,
            você cadastra suas lojas de reserva e nossa checagem contínua garante que quem clica sempre
            encontre estoque disponível para comprar.
          </Text>

          <div className="grid gap-2.5 sm:grid-cols-2 pt-1">
            <div className="flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3">
              <CheckCircle2 className="size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5" aria-hidden="true" />
              <VStack gap={0.5}>
                <Text weight="medium" size="sm">Nunca perca vendas</Text>
                <Text size="xsm" color="secondary">
                  Redirecionamento automático e instantâneo para a reserva em estoque.
                </Text>
              </VStack>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3">
              <Zap className="size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5" aria-hidden="true" />
              <VStack gap={0.5}>
                <Text weight="medium" size="sm">Checagem contínua na Shopee</Text>
                <Text size="xsm" color="secondary">
                  Verificação automática direto na API do catálogo antes de cada visita.
                </Text>
              </VStack>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3">
              <ShieldCheck className="size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5" aria-hidden="true" />
              <VStack gap={0.5}>
                <Text weight="medium" size="sm">Até 3 backups por link</Text>
                <Text size="xsm" color="secondary">
                  Cadastre até 3 ofertas reservas para cada achadinho divulgado.
                </Text>
              </VStack>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3">
              <Sparkles className="size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5" aria-hidden="true" />
              <VStack gap={0.5}>
                <Text weight="medium" size="sm">Links e bio sem limites</Text>
                <Text size="xsm" color="secondary">
                  Vitrine na sua bio (/p/...) que oculta produtos sem estoque automaticamente.
                </Text>
              </VStack>
            </div>
          </div>
        </VStack>
      </Card>

      {/* Cartões de planos: Anual (Destaque) e Mensal */}
      <div className="grid gap-4 sm:grid-cols-2">
        <PlanCard
          pkg={packages.anual}
          kind="anual"
          featured={true}
          disabled={status !== "ready"}
          pending={pending}
          onPick={(kind) => run(() => purchasePlan(kind))}
        />
        <PlanCard
          pkg={packages.mensal}
          kind="mensal"
          featured={false}
          disabled={status !== "ready"}
          pending={pending}
          onPick={(kind) => run(() => purchasePlan(kind))}
        />
      </div>

      {status === "error" ? (
        <Button
          width="100%"
          variant="secondary"
          label="Tentar novamente"
          isDisabled={pending}
          onClick={() => void run(refresh)}
        />
      ) : hasPaywall ? (
        <Button
          width="100%"
          variant="ghost"
          label="Ver todas as opções e ofertas"
          isDisabled={pending}
          onClick={() => void run(presentPaywall)}
        />
      ) : null}

      {/* Garantias, transparência e segurança */}
      <Card padding={4} className="border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-2.5">
            <RotateCcw className="size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5" aria-hidden="true" />
            <VStack gap={0.5}>
              <Text weight="medium" size="sm">Cancele quando quiser</Text>
              <Text size="xsm" color="secondary">
                Sem contrato de fidelidade ou taxas de cancelamento.
              </Text>
            </VStack>
          </div>
          <div className="flex items-start gap-2.5">
            <Lock className="size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5" aria-hidden="true" />
            <VStack gap={0.5}>
              <Text weight="medium" size="sm">Pagamento seguro</Text>
              <Text size="xsm" color="secondary">
                Criptografia de ponta a ponta processada via RevenueCat.
              </Text>
            </VStack>
          </div>
          <div className="flex items-start gap-2.5">
            <Zap className="size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5" aria-hidden="true" />
            <VStack gap={0.5}>
              <Text weight="medium" size="sm">Ativação imediata</Text>
              <Text size="xsm" color="secondary">
                Sua conta Pro é liberada no mesmo instante da confirmação.
              </Text>
            </VStack>
          </div>
        </div>
      </Card>

      <Text size="xsm" color="secondary" className="text-center px-2">
        Valores cobrados em Reais (BRL). Todos os planos incluem suporte e atualizações contínuas das regras de catálogo da Shopee.
      </Text>
    </VStack>
  );
}

export function PlanCard({
  pkg,
  kind,
  featured = false,
  disabled,
  pending = false,
  onPick,
}: {
  pkg: PlanPackageView | null;
  kind: PlanKind;
  featured?: boolean;
  disabled: boolean;
  pending?: boolean;
  onPick: (kind: PlanKind) => void | Promise<unknown>;
}) {
  const isAnnual = kind === "anual";
  const defaultLabel = isAnnual ? "Plano Anual" : "Plano Mensal";
  const label = pkg?.label ?? defaultLabel;
  const priceDisplay = pkg?.formattedPrice || (disabled ? "Carregando..." : "Consulte");

  return (
    <Card
      padding={5}
      elevation={featured ? "low" : "none"}
      className={`relative flex flex-col justify-between rounded-2xl border transition-all ${
        featured
          ? "border-2 border-[var(--color-accent)] bg-[var(--color-surface)] shadow-sm"
          : "border-[var(--color-border)] bg-[var(--color-surface)]"
      }`}
    >
      <VStack gap={4}>
        <HStack gap={2} vAlign="center" justify="between">
          <Text weight="bold" size="lg">
            {label}
          </Text>
          {featured ? (
            <Badge variant="orange" label="Mais vantajoso" />
          ) : (
            <Badge variant="neutral" label="Sem fidelidade" />
          )}
        </HStack>

        <Text size="xsm" color="secondary">
          {isAnnual
            ? "Economize no pacote anual e garanta links ativos o ano todo para suas divulgações."
            : "Flexibilidade para testar e pagar mês a mês conforme suas vendas crescem."}
        </Text>

        <VStack gap={1} className="py-2 border-y border-[var(--color-border)]">
          <HStack gap={1} vAlign="end">
            <Heading level={2} className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {priceDisplay}
            </Heading>
            <Text size="sm" color="secondary" weight="medium" className="pb-0.5">
              /{isAnnual ? "ano" : "mês"}
            </Text>
          </HStack>
          <Text size="xsm" color="secondary">
            {isAnnual
              ? "Melhor custo-benefício · Pagamento anual único"
              : "Cobrança mensal recorrente · Cancele quando quiser"}
          </Text>
        </VStack>

        <VStack gap={2}>
          <div className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-[var(--color-text-accent)]" aria-hidden="true" />
            <Text size="xsm">Links inteligentes ilimitados</Text>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-[var(--color-text-accent)]" aria-hidden="true" />
            <Text size="xsm">Até 3 ofertas reservas por produto</Text>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-[var(--color-text-accent)]" aria-hidden="true" />
            <Text size="xsm">Checagem contínua na Shopee</Text>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-[var(--color-text-accent)]" aria-hidden="true" />
            <Text size="xsm">Página de bio completa sem estoque zerado</Text>
          </div>
          {isAnnual ? (
            <div className="flex items-center gap-2 font-medium">
              <Check className="size-4 shrink-0 text-[var(--color-text-accent)]" aria-hidden="true" />
              <Text size="xsm" color="accent">Economia garantida no plano anual</Text>
            </div>
          ) : null}
        </VStack>
      </VStack>

      <div className="mt-6 pt-2">
        <Button
          width="100%"
          variant={featured ? "primary" : "secondary"}
          isDisabled={disabled || !pkg || pending}
          label={isAnnual ? "Assinar plano anual" : "Assinar plano mensal"}
          onClick={() => void onPick(kind)}
        />
      </div>
    </Card>
  );
}
