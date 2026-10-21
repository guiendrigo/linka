import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AccountSlot } from "@/components/linka/account-slot";

export function AppShell({ children, account = true }: { children: ReactNode; account?: boolean }) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="h-1 bg-primary" />
      <div className="mx-auto flex min-h-[calc(100dvh-0.25rem)] w-full max-w-5xl flex-col px-5 py-5 sm:px-8 sm:py-8">
        <header className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Mark />
            <span className="font-display text-xl font-semibold tracking-tight">Linka</span>
          </Link>
          {account ? <AccountSlot /> : null}
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

function Mark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" className="text-primary">
      <rect x="1.5" y="7" width="14" height="14" rx="4" fill="currentColor" />
      <rect x="12.5" y="7" width="14" height="14" rx="4" fill="var(--color-bg)" />
      <rect x="12.5" y="7" width="14" height="14" rx="4" fill="currentColor" opacity="0.72" />
    </svg>
  );
}
