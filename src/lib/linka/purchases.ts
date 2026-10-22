/** Entitlement that unlocks Linka Pro. Create it in the RevenueCat dashboard. */
export const LINKA_PRO_ENTITLEMENT = "linka_pro";

/**
 * Public Web SDK key (test). Override with `VITE_REVENUECAT_API_KEY` when
 * moving to a production `rcb_` key. This is a client key, not a secret.
 */
export const DEFAULT_REVENUECAT_API_KEY = "test_oRdcLjsMEKDWEkLFHWBtdsXeZPh";

/** Matches `ErrorCode.UserCancelledError` in `@revenuecat/purchases-js`. */
export const USER_CANCELLED_ERROR_CODE = 1;

export const LINKA_PLAN_PRODUCTS = {
  anual: {
    kind: "anual" as const,
    label: "Anual",
    cadence: "por ano",
    aliases: ["anual", "annual", "yearly", "$rc_annual"],
  },
  mensal: {
    kind: "mensal" as const,
    label: "Mensal",
    cadence: "por mês",
    aliases: ["mensal", "monthly", "$rc_monthly"],
  },
} as const;

export type PlanKind = keyof typeof LINKA_PLAN_PRODUCTS;

export type PackageLike = {
  identifier: string;
  packageType: string;
  product: {
    identifier: string;
    title: string;
    price?: { formattedPrice: string };
    currentPrice?: { formattedPrice: string };
  };
};

export type OfferingLike = {
  identifier: string;
  hasPaywall: boolean;
  annual: PackageLike | null;
  monthly: PackageLike | null;
  availablePackages: PackageLike[];
  packagesById: { [key: string]: PackageLike };
};

export type EntitlementLike = {
  identifier?: string;
  isActive?: boolean;
  willRenew?: boolean;
  productIdentifier?: string;
  expirationDate?: Date | null;
};

export type CustomerInfoLike = {
  entitlements: {
    active: { [entitlementId: string]: EntitlementLike };
    all?: { [entitlementId: string]: EntitlementLike };
  };
  managementURL: string | null;
  activeSubscriptions?: Set<string> | string[];
};

export type PlanPackageView = {
  kind: PlanKind;
  label: string;
  cadence: string;
  packageId: string;
  productId: string;
  title: string;
  formattedPrice: string;
};

type RevenueCatEnv = {
  readonly VITE_REVENUECAT_API_KEY?: string;
  readonly VITE_BILLING_ENABLED?: string;
};

/** Opt-in. Cobrança só liga com `VITE_BILLING_ENABLED=true`. */
export function isBillingEnabled(value: string | undefined): boolean {
  return value === "true";
}

export const billingEnabled = isBillingEnabled(
  (import.meta.env as RevenueCatEnv | undefined)?.VITE_BILLING_ENABLED,
);

export function revenueCatApiKey(env?: RevenueCatEnv): string {
  const source = env ?? (import.meta.env as RevenueCatEnv);
  return source.VITE_REVENUECAT_API_KEY?.trim() || DEFAULT_REVENUECAT_API_KEY;
}

export function hasLinkaPro(info: CustomerInfoLike | null | undefined): boolean {
  if (!info) return false;
  return LINKA_PRO_ENTITLEMENT in info.entitlements.active;
}

export function linkaProEntitlement(
  info: CustomerInfoLike | null | undefined,
): EntitlementLike | null {
  if (!info) return null;
  return info.entitlements.active[LINKA_PRO_ENTITLEMENT] ?? null;
}

export function formattedPriceOf(pkg: PackageLike): string {
  return pkg.product.price?.formattedPrice ?? pkg.product.currentPrice?.formattedPrice ?? "";
}

export function toPlanPackageView(kind: PlanKind, pkg: PackageLike): PlanPackageView {
  const meta = LINKA_PLAN_PRODUCTS[kind];
  return {
    kind,
    label: meta.label,
    cadence: meta.cadence,
    packageId: pkg.identifier,
    productId: pkg.product.identifier,
    title: pkg.product.title || meta.label,
    formattedPrice: formattedPriceOf(pkg),
  };
}

export function pickPlanPackages<T extends PackageLike>(
  offering:
    | {
        annual: T | null;
        monthly: T | null;
        availablePackages: T[];
        packagesById: { [key: string]: T };
      }
    | null
    | undefined,
): {
  anual: T | null;
  mensal: T | null;
} {
  if (!offering) return { anual: null, mensal: null };
  return {
    anual: offering.annual ?? findPackage(offering, LINKA_PLAN_PRODUCTS.anual.aliases),
    mensal: offering.monthly ?? findPackage(offering, LINKA_PLAN_PRODUCTS.mensal.aliases),
  };
}

export function planPackageViews(offering: OfferingLike | null | undefined): {
  anual: PlanPackageView | null;
  mensal: PlanPackageView | null;
} {
  const picked = pickPlanPackages(offering);
  return {
    anual: picked.anual ? toPlanPackageView("anual", picked.anual) : null,
    mensal: picked.mensal ? toPlanPackageView("mensal", picked.mensal) : null,
  };
}

export function customerCenterUrl(info: CustomerInfoLike | null | undefined): string | null {
  const url = info?.managementURL?.trim();
  return url || null;
}

export function isUserCancelled(error: unknown): boolean {
  return purchasesErrorCode(error) === USER_CANCELLED_ERROR_CODE;
}

/**
 * Human-readable error for the UI. `null` means the person closed the flow —
 * do not show a banner.
 */
export function purchaseErrorMessage(error: unknown): string | null {
  if (isUserCancelled(error)) return null;
  const code = purchasesErrorCode(error);
  switch (code) {
    case 2:
      return "A loja não concluiu a compra. Tente de novo.";
    case 3:
      return "Esta compra não é permitida nesta conta.";
    case 5:
      return "Esse plano não está à venda agora.";
    case 6:
      return "Essa assinatura já está na sua conta.";
    case 10:
      return "Sem conexão com a loja. Tente de novo.";
    case 11:
      return "A chave da RevenueCat não foi aceita.";
    case 14:
      return "A conta não pôde ser identificada na loja.";
    case 23:
      return "Falta configurar o plano na RevenueCat.";
    case 28:
      return "Não deu para ler a assinatura. Tente de novo.";
    case 38:
      return "O e-mail da compra não é válido.";
    default:
      break;
  }
  if (error instanceof Error && error.message.trim()) return error.message;
  return "Não deu para concluir a compra. Tente de novo.";
}

export function purchasesErrorCode(error: unknown): number | null {
  if (!error || typeof error !== "object") return null;
  if (!("errorCode" in error)) return null;
  const code = (error as { errorCode: unknown }).errorCode;
  return typeof code === "number" ? code : null;
}

function findPackage<T extends PackageLike>(
  offering: { availablePackages: T[]; packagesById: { [key: string]: T } },
  aliases: readonly string[],
): T | null {
  const wanted = new Set(aliases.map((alias) => alias.toLowerCase()));
  const fromId = offering.availablePackages.find((pkg) => packageMatches(pkg, wanted));
  if (fromId) return fromId;
  for (const alias of aliases) {
    const byKey = offering.packagesById[alias] ?? offering.packagesById[alias.toLowerCase()];
    if (byKey) return byKey;
  }
  return null;
}

function packageMatches(pkg: PackageLike, wanted: Set<string>): boolean {
  return (
    wanted.has(pkg.identifier.toLowerCase()) ||
    wanted.has(pkg.packageType.toLowerCase()) ||
    wanted.has(pkg.product.identifier.toLowerCase())
  );
}
