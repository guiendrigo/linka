import { Link2, Sparkles } from "lucide-react";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { SideNav, SideNavItem } from "@astryxdesign/core/SideNav";
import { Text } from "@astryxdesign/core/Text";
import { TopNav } from "@astryxdesign/core/TopNav";
import { VStack } from "@astryxdesign/core/VStack";
import { authEnabled, signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { PurchasesProvider, usePurchases } from "@/components/linka/use-purchases";
import { LinkaBrand } from "@/components/linka/shell";
import { billingEnabled } from "@/lib/linka/purchases";

type ConsolePage = "links" | "plano";

const subscribeToNothing = () => () => {};
const noGateSessionOnServer = () => false;

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
      <AppShell
        height="auto"
        contentPadding={4}
        variant="section"
        topNav={
          <TopNav
            label="Linka"
            heading={<LinkaBrand />}
          />
        }
        sideNav={
          <SideNav aria-label="Conta" header={<AccountBlock />} footer={<SignOutControl />}>
            <SideNavItem
              label="Links"
              href="/"
              icon={<Link2 size={16} aria-hidden="true" />}
              isSelected={current === "links"}
            />
            {billingEnabled ? (
              <SideNavItem
                label="Plano"
                href="/plano"
                icon={<Sparkles size={16} aria-hidden="true" />}
                isSelected={current === "plano"}
              />
            ) : null}
          </SideNav>
        }
      >
        <VStack gap={4}>
          <VStack gap={1}>
            <Heading level={1}>{title}</Heading>
            <Text color="secondary">{subtitle}</Text>
          </VStack>
          {action ? action : null}
          {children}
        </VStack>
      </AppShell>
    </PurchasesProvider>
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
    <div className="flex items-center gap-3 px-2 py-3">
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
  const gateSession = useSyncExternalStore(
    subscribeToNothing,
    hasGateSessionMarker,
    noGateSessionOnServer,
  );
  if (!authEnabled || gateSession) return null;

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
  return <div className="min-h-dvh bg-body" aria-busy="true" />;
}
