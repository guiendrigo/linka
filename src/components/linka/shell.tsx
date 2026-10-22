import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppShell as AstryxAppShell } from "@astryxdesign/core/AppShell";
import { Text } from "@astryxdesign/core/Text";
import { TopNav } from "@astryxdesign/core/TopNav";
import { AccountSlot } from "@/components/linka/account-slot";

export function PublicShell({ children, account = true }: { children: ReactNode; account?: boolean }) {
  return (
    <AstryxAppShell
      height="auto"
      contentPadding={4}
      mobileNav={false}
      topNav={
        <TopNav
          label="Linka"
          heading={
            <Link to="/" className="rounded-full focus-visible:outline-none">
              <Text weight="semibold">Linka</Text>
            </Link>
          }
          endContent={account ? <AccountSlot /> : undefined}
        />
      }
    >
      {children}
    </AstryxAppShell>
  );
}

export { PublicShell as AppShell };
