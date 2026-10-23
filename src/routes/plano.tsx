import { createFileRoute, Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { ConsolePending, ConsoleShell } from "@/components/linka/console";
import { PlanPanel } from "@/components/linka/plan";
import { billingEnabled } from "@/lib/linka/purchases";

export const Route = createFileRoute("/plano")({
  head: () => ({ meta: [{ title: "Plano e Assinatura · Linka" }] }),
  component: PlanoPage,
});

function PlanoPage() {
  const { user, isPending } = useCurrentUserState();
  if (!billingEnabled) return <Navigate to="/" />;
  if (isPending) return <ConsolePending />;
  if (!user) return <RedirectToSignIn />;
  return (
    <ConsoleShell
      current="plano"
      title="Plano e Assinatura"
      subtitle="Turbine suas comissões na Shopee com links inteligentes que nunca ficam sem estoque."
    >
      <PlanPanel />
    </ConsoleShell>
  );
}
