import { Link } from "@tanstack/react-router";
import { Link2 } from "lucide-react";
import type { ReactNode } from "react";
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
    <div className="min-h-dvh bg-[var(--color-background-body)]">
      <header className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-background-body)]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <LinkaBrand />
          {account ? <AccountSlot /> : null}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}

export { PublicShell as AppShell };
