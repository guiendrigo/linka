import { Link } from "@tanstack/react-router";
import { CreditCard, Link2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Avatar, Button, Heading, Text, VStack } from "@/components/linka/ui";
import { authEnabled, signOut } from "@/lib/auth/client";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { PurchasesProvider, usePurchases } from "@/components/linka/use-purchases";
import { LinkaBrand } from "@/components/linka/shell";
import { billingEnabled } from "@/lib/linka/purchases";
import { cn } from "@/lib/cn";

type ConsolePage = "links" | "plano";

export function ConsoleShell({
  current,
  title,
  subtitle,
  action,
  children,
}: {
  current: ConsolePage;
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <PurchasesProvider>
      <div className="min-h-dvh bg-[var(--color-background-body)]">
        <header className="border-b border-[var(--color-border)] bg-[var(--color-background-body)] lg:hidden">
          <div className="flex h-14 items-center px-4">
            <LinkaBrand />
          </div>
        </header>

        <div className="mx-auto flex max-w-6xl">
          <aside className="hidden w-56 shrink-0 border-r border-[var(--color-border)] lg:flex lg:min-h-[calc(100dvh-0px)] lg:flex-col">
            <div className="border-b border-[var(--color-border)] px-4 py-4">
              <LinkaBrand />
            </div>
            <AccountBlock />
            <nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Conta">
              <SideNavLink
                to="/"
                label="Links"
                icon={<Link2 size={16} aria-hidden="true" />}
                selected={current === "links"}
              />
              {billingEnabled ? (
                <SideNavLink
                  to="/plano"
                  label="Plano"
                  icon={<CreditCard size={16} aria-hidden="true" />}
                  selected={current === "plano"}
                />
              ) : null}
            </nav>
            <div className="border-t border-[var(--color-border)] p-2">
              <SignOutControl />
            </div>
          </aside>

          <div className="min-w-0 flex-1 px-4 py-6">
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={1}>{title}</Heading>
                <Text color="secondary">{subtitle}</Text>
              </VStack>
              {action ? action : null}
              {children}
            </VStack>
          </div>
        </div>
      </div>
    </PurchasesProvider>
  );
}

function SideNavLink({
  to,
  label,
  icon,
  selected,
}: {
  to: string;
  label: string;
  icon: ReactNode;
  selected: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        selected
          ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm"
          : "text-[var(--color-text-secondary)] hover:bg-black/5 hover:text-[var(--color-text-primary)]",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

function AccountBillingMeta({ email }: { email: string | null }) {
  const { isPro, status } = usePurchases();
  if (isPro)
    return (
      <Text size="sm" color="accent" maxLines={1}>
        Linka Pro
      </Text>
    );
  if (email)
    return (
      <Text size="sm" color="secondary" maxLines={1}>
        {email}
      </Text>
    );
  if (status === "ready")
    return (
      <Text size="sm" color="secondary" maxLines={1}>
        Sem assinatura
      </Text>
    );
  return null;
}

function AccountBlock() {
  const user = useCurrentUser();
  const name = user?.displayName ?? user?.primaryEmail ?? "Conta";
  const email = user?.primaryEmail;

  return (
    <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-3 py-3">
      <Avatar src={user?.profileImageUrl ?? undefined} name={name} size="md" />
      <VStack gap={0} className="min-w-0">
        <Text weight="medium" maxLines={1}>
          {name}
        </Text>
        {billingEnabled ? (
          <AccountBillingMeta email={email && email !== name ? email : null} />
        ) : email && email !== name ? (
          <Text size="sm" color="secondary" maxLines={1}>
            {email}
          </Text>
        ) : null}
      </VStack>
    </div>
  );
}

function SignOutControl() {
  const [signingOut, setSigningOut] = useState(false);
  if (!authEnabled) return null;

  return (
    <Button
      variant="ghost"
      label={signingOut ? "Signing out…" : "Sign out"}
      isDisabled={signingOut}
      width="100%"
      onClick={() => {
        setSigningOut(true);
        void signOut().catch(() => setSigningOut(false));
      }}
    />
  );
}

export function ConsolePending() {
  return <div className="min-h-dvh bg-[var(--color-background-body)]" aria-busy="true" />;
}
