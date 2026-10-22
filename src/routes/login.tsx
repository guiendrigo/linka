import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
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
      <VStack gap={4} maxWidth={360} className="mx-auto mt-10 w-full">
        <Heading level={1} type="display-2">
          Entrar
        </Heading>
        <Text color="secondary">A conta é sua. Quem abre o link inteligente não precisa entrar.</Text>
        {isPending ? (
          <div aria-hidden="true" className="h-64 animate-pulse rounded-3xl bg-surface" />
        ) : (
          <LoginPanel />
        )}
      </VStack>
    </AppShell>
  );
}
