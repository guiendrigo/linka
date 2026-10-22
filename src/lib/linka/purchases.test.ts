import assert from "node:assert/strict";
import test from "node:test";
import {
  customerCenterUrl,
  DEFAULT_REVENUECAT_API_KEY,
  formattedPriceOf,
  hasLinkaPro,
  isBillingEnabled,
  isUserCancelled,
  LINKA_PRO_ENTITLEMENT,
  pickPlanPackages,
  planPackageViews,
  purchaseErrorMessage,
  revenueCatApiKey,
  type CustomerInfoLike,
  type OfferingLike,
  type PackageLike,
} from "./purchases.ts";

function pkg(partial: {
  identifier: string;
  packageType?: string;
  productId?: string;
  title?: string;
  price?: string;
}): PackageLike {
  return {
    identifier: partial.identifier,
    packageType: partial.packageType ?? "custom",
    product: {
      identifier: partial.productId ?? partial.identifier,
      title: partial.title ?? partial.identifier,
      price: { formattedPrice: partial.price ?? "R$ 0,00" },
    },
  };
}

function offering(
  partial: Partial<OfferingLike> & { packages?: PackageLike[] } = {},
): OfferingLike {
  const availablePackages = partial.packages ?? partial.availablePackages ?? [];
  const packagesById = {
    ...Object.fromEntries(availablePackages.map((item) => [item.identifier, item])),
  };
  return {
    identifier: "default",
    hasPaywall: false,
    annual: null,
    monthly: null,
    ...partial,
    availablePackages,
    packagesById: { ...packagesById, ...partial.packagesById },
  };
}

function customer(active: string[] = [], managementURL: string | null = null): CustomerInfoLike {
  return {
    entitlements: {
      active: Object.fromEntries(active.map((id) => [id, { identifier: id, isActive: true }])),
    },
    managementURL,
  };
}

test("usa a chave pública de teste quando o env não traz outra", () => {
  assert.equal(revenueCatApiKey({}), DEFAULT_REVENUECAT_API_KEY);
  assert.equal(revenueCatApiKey({ VITE_REVENUECAT_API_KEY: "  rcb_live  " }), "rcb_live");
});

test("cobrança só liga com VITE_BILLING_ENABLED=true", () => {
  assert.equal(isBillingEnabled(undefined), false);
  assert.equal(isBillingEnabled(""), false);
  assert.equal(isBillingEnabled("false"), false);
  assert.equal(isBillingEnabled("1"), false);
  assert.equal(isBillingEnabled("true"), true);
});

test("reconhece o entitlement linka_pro", () => {
  assert.equal(hasLinkaPro(customer()), false);
  assert.equal(hasLinkaPro(customer(["other"])), false);
  assert.equal(hasLinkaPro(customer([LINKA_PRO_ENTITLEMENT])), true);
  assert.equal(hasLinkaPro(null), false);
});

test("escolhe Anual e Mensal pelos atalhos da offering", () => {
  const anual = pkg({
    identifier: "$rc_annual",
    packageType: "$rc_annual",
    title: "Anual",
    price: "R$ 199,00",
  });
  const mensal = pkg({
    identifier: "$rc_monthly",
    packageType: "$rc_monthly",
    title: "Mensal",
    price: "R$ 19,90",
  });
  const picked = pickPlanPackages(
    offering({
      annual: anual,
      monthly: mensal,
      packages: [anual, mensal],
    }),
  );
  assert.equal(picked.anual?.identifier, "$rc_annual");
  assert.equal(picked.mensal?.identifier, "$rc_monthly");
});

test("escolhe Anual e Mensal pelos identificadores customizados", () => {
  const anual = pkg({ identifier: "anual", productId: "anual", title: "Anual" });
  const mensal = pkg({ identifier: "mensal", productId: "mensal", title: "Mensal" });
  const picked = pickPlanPackages(offering({ packages: [mensal, anual] }));
  assert.equal(picked.anual?.product.identifier, "anual");
  assert.equal(picked.mensal?.product.identifier, "mensal");
});

test("monta o cartão do plano com preço formatado", () => {
  const views = planPackageViews(
    offering({
      packages: [pkg({ identifier: "anual", title: "Anual", price: "R$ 199,00" })],
    }),
  );
  assert.equal(views.anual?.label, "Anual");
  assert.equal(views.anual?.cadence, "por ano");
  assert.equal(views.anual?.formattedPrice, "R$ 199,00");
  assert.equal(views.mensal, null);
});

test("lê o preço legado currentPrice", () => {
  const legacy: PackageLike = {
    identifier: "mensal",
    packageType: "$rc_monthly",
    product: {
      identifier: "mensal",
      title: "Mensal",
      currentPrice: { formattedPrice: "R$ 19,90" },
    },
  };
  assert.equal(formattedPriceOf(legacy), "R$ 19,90");
});

test("devolve a URL da central do cliente", () => {
  assert.equal(
    customerCenterUrl(customer([], "https://manage.revenuecat.com/x")),
    "https://manage.revenuecat.com/x",
  );
  assert.equal(customerCenterUrl(customer([], "  ")), null);
  assert.equal(customerCenterUrl(null), null);
});

test("silencia cancelamento e traduz os outros erros", () => {
  assert.equal(isUserCancelled({ errorCode: 1 }), true);
  assert.equal(purchaseErrorMessage({ errorCode: 1 }), null);
  assert.equal(purchaseErrorMessage({ errorCode: 10 }), "Sem conexão com a loja. Tente de novo.");
  assert.equal(purchaseErrorMessage({ errorCode: 11 }), "A chave da RevenueCat não foi aceita.");
  assert.equal(purchaseErrorMessage(new Error("falhou")), "falhou");
});
