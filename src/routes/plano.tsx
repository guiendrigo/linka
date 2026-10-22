import { createFileRoute, Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { ConsolePending, ConsoleShell } from "@/components/linka/console";
import { PlanPanel } from "@/components/linka/plan";
import { billingEnabled } from "@/lib/linka/purchases";

export const Route = createFileRoute("/plano")({
  head: () => ({ meta: [{ title: "Plano · Linka" }] }),
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
      title="Plano"
      subtitle="Assinatura da conta. Anual ou mensal, com o entitlement linka_pro."
    >
      <PlanPanel />
    </ConsoleShell>
  );
}
