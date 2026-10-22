import type {
  CustomerInfo,
  Offering,
  Offerings,
  Package,
  PurchaseResult,
} from "@revenuecat/purchases-js";
import {
  billingEnabled,
  customerCenterUrl,
  hasLinkaPro,
  LINKA_PRO_ENTITLEMENT,
  pickPlanPackages,
  purchaseErrorMessage,
  revenueCatApiKey,
  type PlanKind,
} from "@/lib/linka/purchases";

export type PurchasesSession = {
  customerInfo: CustomerInfo;
  offering: Offering | null;
  packages: { anual: Package | null; mensal: Package | null };
  isPro: boolean;
  hasPaywall: boolean;
  managementURL: string | null;
};

type AttributeInput = {
  email?: string | null;
  displayName?: string | null;
};

async function loadSdk() {
  return import("@revenuecat/purchases-js");
}

export async function ensurePurchases(appUserId: string) {
  if (!billingEnabled) {
    throw new Error("Cobrança desligada.");
  }
  const { Purchases, LogLevel } = await loadSdk();
  const apiKey = revenueCatApiKey();
  if (!apiKey) {
    throw new Error("Falta a chave pública da RevenueCat.");
  }

  if (import.meta.env.DEV) {
    Purchases.setLogLevel(LogLevel.Debug);
  }

  if (Purchases.isConfigured()) {
    const purchases = Purchases.getSharedInstance();
    if (purchases.getAppUserId() !== appUserId) {
      await purchases.changeUser(appUserId);
    }
    return purchases;
  }

  return Purchases.configure({ apiKey, appUserId });
}

export function teardownPurchases() {
  if (!billingEnabled) return;
  void loadSdk()
    .then(({ Purchases }) => {
      if (!Purchases.isConfigured()) return;
      Purchases.getSharedInstance().close();
    })
    .catch(() => {
      /* ignore teardown failures */
    });
}

export async function startPurchasesSession(
  appUserId: string,
  attributes: AttributeInput = {},
): Promise<PurchasesSession> {
  const purchases = await ensurePurchases(appUserId);
  void purchases.preload();
  await syncCustomerAttributes(attributes);
  const [customerInfo, offerings] = await Promise.all([
    purchases.getCustomerInfo(),
    purchases.getOfferings(),
  ]);
  return sessionFrom(customerInfo, offerings);
}

export async function refreshPurchasesSession(): Promise<PurchasesSession> {
  const { Purchases } = await loadSdk();
  const purchases = Purchases.getSharedInstance();
  const [customerInfo, offerings] = await Promise.all([
    purchases.getCustomerInfo(),
    purchases.getOfferings(),
  ]);
  return sessionFrom(customerInfo, offerings);
}

export async function presentLinkaPaywall(options: {
  customerEmail?: string | null;
  onVisitCustomerCenter?: () => void;
}): Promise<PurchasesSession | null> {
  const { Purchases, PurchasesError, ErrorCode } = await loadSdk();
  const purchases = Purchases.getSharedInstance();
  const offerings = await purchases.getOfferings();
  const offering = offerings.current;
  try {
    const result = await purchases.presentPaywall({
      offering: offering ?? undefined,
      customerEmail: options.customerEmail?.trim() || undefined,
      selectedLocale: "pt_BR",
      onVisitCustomerCenter: options.onVisitCustomerCenter,
    });
    return sessionFrom(result.customerInfo, offerings);
  } catch (error) {
    if (error instanceof PurchasesError && error.errorCode === ErrorCode.UserCancelledError) {
      return null;
    }
    throw error;
  }
}

export async function purchaseLinkaPlan(
  kind: PlanKind,
  packages: { anual: Package | null; mensal: Package | null },
  customerEmail?: string | null,
): Promise<PurchasesSession | null> {
  const rcPackage = packages[kind];
  if (!rcPackage) {
    throw new Error("Esse plano não está disponível agora.");
  }
  const { Purchases, PurchasesError, ErrorCode } = await loadSdk();
  const purchases = Purchases.getSharedInstance();
  try {
    const result: PurchaseResult = await purchases.purchase({
      rcPackage,
      customerEmail: customerEmail?.trim() || undefined,
      selectedLocale: "pt_BR",
    });
    const offerings = await purchases.getOfferings();
    return sessionFrom(result.customerInfo, offerings);
  } catch (error) {
    if (error instanceof PurchasesError && error.errorCode === ErrorCode.UserCancelledError) {
      return null;
    }
    throw error;
  }
}

export async function isEntitledToLinkaPro(): Promise<boolean> {
  const { Purchases } = await loadSdk();
  return Purchases.getSharedInstance().isEntitledTo(LINKA_PRO_ENTITLEMENT);
}

export function openCustomerCenter(info: CustomerInfo | null | undefined): boolean {
  const url = customerCenterUrl(info);
  if (!url || typeof window === "undefined") return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

export { purchaseErrorMessage };

async function syncCustomerAttributes(attributes: AttributeInput) {
  const email = attributes.email?.trim();
  const displayName = attributes.displayName?.trim();
  if (!email && !displayName) return;
  try {
    const { Purchases, ReservedCustomerAttribute } = await loadSdk();
    const payload: { [key: string]: string } = {};
    if (email) payload[ReservedCustomerAttribute.Email] = email;
    if (displayName) payload[ReservedCustomerAttribute.DisplayName] = displayName;
    await Purchases.getSharedInstance().setAttributes(payload);
  } catch {
    /* attributes are best-effort on web */
  }
}

function sessionFrom(customerInfo: CustomerInfo, offerings: Offerings): PurchasesSession {
  const offering = offerings.current;
  const packages = pickPlanPackages(offering);
  return {
    customerInfo,
    offering,
    packages,
    isPro: hasLinkaPro(customerInfo),
    hasPaywall: offering?.hasPaywall === true,
    managementURL: customerCenterUrl(customerInfo),
  };
}
