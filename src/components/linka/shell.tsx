import { Link } from "@tanstack/react-router";
import { Link2 } from "lucide-react";
import type { ReactNode } from "react";
import { AppShell as AstryxAppShell } from "@astryxdesign/core/AppShell";
import { TopNav } from "@astryxdesign/core/TopNav";
import { AccountSlot } from "@/components/linka/account-slot";

export function LinkaBrand() {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-lg focus-visible:outline-none">
      <Link2 size={16} strokeWidth={1.5} className="text-[var(--color-text-accent)]" aria-hidden="true" />
      <span className="text-base font-medium text-[var(--color-text-primary)]">Linka</span>
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
