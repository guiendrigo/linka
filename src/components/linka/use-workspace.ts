import { useEffect, useState } from "react";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import type { WorkspaceView } from "@/lib/linka/store.server";
import { getWorkspace } from "@/lib/linka/workspace.functions";

export function useWorkspace() {
  const user = useCurrentUser();
  const [data, setData] = useState<WorkspaceView | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = user?.id;
    if (!userId) return;
    let cancelled = false;
    getWorkspace()
      .then((next) => {
        if (!cancelled) setData(next);
      })
      .catch(() => {
        if (!cancelled) setError("Não deu para carregar a sua conta.");
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return { data, error, setData };
}
