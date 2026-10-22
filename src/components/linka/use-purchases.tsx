import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import {
  openCustomerCenter,
  presentLinkaPaywall,
  purchaseErrorMessage,
  purchaseLinkaPlan,
  startPurchasesSession,
  teardownPurchases,
  type PurchasesSession,
} from "@/lib/linka/purchases-browser";
import {
  billingEnabled,
  planPackageViews,
  type PlanKind,
  type PlanPackageView,
} from "@/lib/linka/purchases";

type PurchasesStatus = "idle" | "loading" | "ready" | "error";

export type PurchasesState = {
  status: PurchasesStatus;
  isPro: boolean;
  hasPaywall: boolean;
  managementURL: string | null;
  packages: { anual: PlanPackageView | null; mensal: PlanPackageView | null };
  error: string | null;
  presentPaywall: () => Promise<boolean>;
  purchasePlan: (kind: PlanKind) => Promise<boolean>;
  openCustomerCenter: () => boolean;
  refresh: () => Promise<void>;
};

const PurchasesContext = createContext<PurchasesState | null>(null);

export function PurchasesProvider({ children }: { children: ReactNode }) {
  const user = useCurrentUser();
  const value = usePurchasesSession(
    user?.id ?? null,
    user?.primaryEmail ?? null,
    user?.displayName ?? null,
  );
  return <PurchasesContext.Provider value={value}>{children}</PurchasesContext.Provider>;
}

export function usePurchases(): PurchasesState {
  const ctx = useContext(PurchasesContext);
  if (!ctx) {
    throw new Error("usePurchases precisa do PurchasesProvider.");
  }
  return ctx;
}

function usePurchasesSession(
  userId: string | null,
  email: string | null,
  displayName: string | null,
): PurchasesState {
  const [status, setStatus] = useState<PurchasesStatus>(
    billingEnabled && userId ? "loading" : "idle",
  );
  const [session, setSession] = useState<PurchasesSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  const applySession = useCallback((next: PurchasesSession | null) => {
    setSession(next);
    setStatus(next ? "ready" : "idle");
    setError(null);
  }, []);

  const load = useCallback(
    async (id: string) => {
      if (!billingEnabled) return;
      setStatus("loading");
      setError(null);
      try {
        const next = await startPurchasesSession(id, { email, displayName });
        applySession(next);
      } catch (err) {
        setSession(null);
        setStatus("error");
        setError(purchaseErrorMessage(err) ?? "Não deu para carregar o plano.");
      }
    },
    [applySession, displayName, email],
  );

  useEffect(() => {
    if (!billingEnabled) {
      setSession(null);
      setStatus("idle");
      setError(null);
      return;
    }
    if (!userId) {
      teardownPurchases();
      setSession(null);
      setStatus("idle");
      setError(null);
      return;
    }
    let cancelled = false;
    setStatus("loading");
    startPurchasesSession(userId, { email, displayName })
      .then((next) => {
        if (!cancelled) applySession(next);
      })
      .catch((err) => {
        if (cancelled) return;
        setSession(null);
        setStatus("error");
        setError(purchaseErrorMessage(err) ?? "Não deu para carregar o plano.");
      });
    return () => {
      cancelled = true;
    };
  }, [applySession, displayName, email, userId]);

  const presentPaywall = useCallback(async () => {
    if (!billingEnabled) return false;
    setError(null);
    try {
      const next = await presentLinkaPaywall({
        customerEmail: email,
        onVisitCustomerCenter: () => {
          openCustomerCenter(session?.customerInfo);
        },
      });
      if (next) applySession(next);
      return next ? hasPro(next) : false;
    } catch (err) {
      const message = purchaseErrorMessage(err);
      if (message) setError(message);
      return false;
    }
  }, [applySession, email, session?.customerInfo]);

  const purchasePlan = useCallback(
    async (kind: PlanKind) => {
      if (!billingEnabled || !session) return false;
      setError(null);
      try {
        const next = await purchaseLinkaPlan(kind, session.packages, email);
        if (next) applySession(next);
        return next ? hasPro(next) : false;
      } catch (err) {
        const message = purchaseErrorMessage(err);
        if (message) setError(message);
        return false;
      }
    },
    [applySession, email, session],
  );

  const openCenter = useCallback(
    () => openCustomerCenter(session?.customerInfo),
    [session?.customerInfo],
  );

  const refresh = useCallback(async () => {
    if (!userId) return;
    await load(userId);
  }, [load, userId]);

  return useMemo(
    () => ({
      status,
      isPro: session ? hasPro(session) : false,
      hasPaywall: session?.hasPaywall === true,
      managementURL: session?.managementURL ?? null,
      packages: planPackageViews(session?.offering ?? null),
      error,
      presentPaywall,
      purchasePlan,
      openCustomerCenter: openCenter,
      refresh,
    }),
    [error, openCenter, presentPaywall, purchasePlan, refresh, session, status],
  );
}

function hasPro(session: PurchasesSession): boolean {
  return session.isPro;
}
