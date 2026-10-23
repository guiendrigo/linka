import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";
import { AppShell as AstryxAppShell } from "@astryxdesign/core/AppShell";
import { TopNav } from "@astryxdesign/core/TopNav";
import { AccountSlot } from "@/components/linka/account-slot";

export function LinkaBrand() {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-lg focus-visible:outline-none group">
      <div className="flex size-7 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white shadow-sm transition-transform group-hover:scale-105">
        <ShoppingBag size={15} strokeWidth={2.5} aria-hidden="true" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
          Linka
        </span>
        <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-accent)] sm:inline-block">
          Afiliados
        </span>
      </div>
    </Link>
  );
}

export function PublicShell({ children, account = true }: { children: ReactNode; account?: boolean }) {
  return (
    <AstryxAppShell
      contentPadding={4}
      mobileNav={false}
      topNav={
        <TopNav
          label="Linka"
          heading={<LinkaBrand />}
          endContent={account ? <AccountSlot /> : undefined}
        />
      }
    >
      {children}
    </AstryxAppShell>
  );
}

export { PublicShell as AppShell };
