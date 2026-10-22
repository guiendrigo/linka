import type { ReactNode } from "react";
import { Drawer, DrawerHeader } from "@astryxdesign/core/Drawer";

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
  function handleOpenChange(next: boolean) {
    if (!next) onClose();
  }

  return (
    <Drawer isOpen={open} onOpenChange={handleOpenChange} label={title} side="end" purpose="form">
      <DrawerHeader title={title} onOpenChange={handleOpenChange} />
      {children}
    </Drawer>
  );
}
