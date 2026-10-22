import { Link } from "@tanstack/react-router";
import { Link2, Menu, Sparkles, Store, X } from "lucide-react";
import { useEffect, useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { authEnabled, signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { PurchasesProvider, usePurchases } from "@/components/linka/use-purchases";
import { cn } from "@/lib/cn";
import { billingEnabled } from "@/lib/linka/purchases";

type ConsolePage = "links" | "shopee" | "plano";

const NAV = [
  { id: "links" as const, to: "/", label: "Links", icon: Link2, billing: false },
  { id: "shopee" as const, to: "/shopee", label: "Shopee", icon: Store, billing: false },
  { id: "plano" as const, to: "/plano", label: "Plano", icon: Sparkles, billing: true },
];

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
  const [menuOpen, setMenuOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [current]);

  return (
    <PurchasesProvider>
      <div className="min-h-dvh bg-bg text-fg">
        <div className="flex min-h-dvh">
          <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface lg:flex">
            <SidebarBody current={current} />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex items-center gap-3 border-b border-border px-4 py-3 lg:hidden">
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-expanded={menuOpen}
                aria-controls={titleId}
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="size-5" aria-hidden="true" />
                <span className="sr-only">Abrir menu</span>
              </button>
              <Link
                to="/"
                className="font-display text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Linka
              </Link>
            </header>

            <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-6 sm:px-8">
              <div className="min-w-0">
                <h1 className="text-2xl leading-none font-semibold tracking-tight sm:text-3xl">
                  {title}
                </h1>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{subtitle}</p>
              </div>
              {action ? <div className="flex shrink-0 flex-wrap gap-2">{action}</div> : null}
            </div>

            <div className="flex-1 px-5 pb-10 sm:px-8">{children}</div>
          </div>
        </div>

        {menuOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-bg/70"
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
            />
            <div
              id={titleId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="relative flex h-full w-60 flex-col bg-surface shadow-ring"
            >
              <div className="flex justify-end px-2 pt-2">
                <button
                  type="button"
                  className="grid size-11 place-items-center rounded-full text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="size-5" aria-hidden="true" />
                  <span className="sr-only">Fechar menu</span>
                </button>
              </div>
              <SidebarBody current={current} />
            </div>
          </div>
        ) : null}
      </div>
    </PurchasesProvider>
  );
}

function SidebarBody({ current }: { current: ConsolePage }) {
  return (
    <>
      <AccountBlock />
      <nav aria-label="Conta" className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        {NAV.filter((item) => !item.billing || billingEnabled).map((item) => {
          const Icon = item.icon;
          const active = item.id === current;
          return (
            <Link
              key={item.id}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <SignOutControl />
    </>
  );
}

function AccountBillingMeta({ email }: { email: string | null }) {
  const { isPro, status } = usePurchases();
  if (isPro) return <p className="truncate text-xs text-primary">Linka Pro</p>;
  if (email) return <p className="truncate text-xs text-muted">{email}</p>;
  if (status === "ready") return <p className="truncate text-xs text-muted">Sem assinatura</p>;
  return null;
}

function AccountBlock() {
  const user = useCurrentUser();
  const name = user?.displayName ?? user?.primaryEmail ?? "Conta";
  const email = user?.primaryEmail;
  const initial = name.trim().charAt(0).toUpperCase() || "L";

  return (
    <div className="flex items-center gap-3 px-4 py-5">
      {user?.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt=""
          className="size-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-2 text-sm font-semibold">
          {initial}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{name}</p>
        {billingEnabled ? (
          <AccountBillingMeta email={email && email !== name ? email : null} />
        ) : email && email !== name ? (
          <p className="truncate text-xs text-muted">{email}</p>
        ) : null}
      </div>
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
  if (!authEnabled || gateSession) return <div className="h-4" />;

  return (
    <div className="px-3 pb-4">
      <button
        type="button"
        disabled={signingOut}
        onClick={() => {
          setSigningOut(true);
          void signOut().catch(() => setSigningOut(false));
        }}
        className="flex min-h-11 w-full items-center rounded-2xl px-3 text-left text-sm text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-wait"
      >
        {signingOut ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}

export function ConsolePending() {
  return <div className="min-h-dvh bg-bg" aria-busy="true" />;
}
