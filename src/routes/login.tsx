import { createFileRoute, Navigate } from "@tanstack/react-router";
import { AppShell } from "@/components/linka/shell";
import { LoginPanel } from "@/components/linka/login-panel";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar · Linka" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { user, isPending } = useCurrentUserState();

  if (!isPending && user) return <Navigate to="/" />;

  return (
    <AppShell account={false}>
      <div className="mx-auto mt-10 w-full max-w-sm">
        <h1 className="text-4xl leading-none font-semibold tracking-tight">Entrar</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          A conta é sua. Quem abre o link inteligente não precisa entrar.
        </p>
        <div className="mt-8">
          {isPending ? (
            <div aria-hidden="true" className="h-64 animate-pulse rounded-3xl bg-surface" />
          ) : (
            <LoginPanel />
          )}
        </div>
      </div>
    </AppShell>
  );
}
