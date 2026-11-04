import type { ReactNode } from "react";
import { DrawerPanel } from "@/components/linka/ui";

export function SidePanel({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <DrawerPanel open={open} title={title} onClose={onClose}>
      {children}
    </DrawerPanel>
  );
}
