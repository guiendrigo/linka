import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Heading, Text, VStack } from "@/components/linka/ui";
import { AppShell } from "@/components/linka/shell";
import { LoginPanel } from "@/components/linka/login-panel";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar · Linka Afiliados" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { user, isPending } = useCurrentUserState();

  if (!isPending && user) return <Navigate to="/" />;

  return (
    <AppShell account={false}>
      <div className="mx-auto mt-16 w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <VStack gap={4}>
          <VStack gap={1}>
            <Heading level={1} type="display-2">
              Entrar
            </Heading>
            <Text color="secondary" size="sm">
              Gerencie achadinhos e backups. Quem clica no link não precisa de conta.
            </Text>
          </VStack>
          {isPending ? (
            <div aria-hidden="true" className="h-64 rounded-xl bg-[var(--color-background-body)]" />
          ) : (
            <LoginPanel />
          )}
        </VStack>
      </div>
    </AppShell>
  );
}
