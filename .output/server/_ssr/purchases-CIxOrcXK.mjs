//#region node_modules/.nitro/vite/services/ssr/assets/purchases-CIxOrcXK.js
/** Entitlement that unlocks Linka Pro. Create it in the RevenueCat dashboard. */
var LINKA_PRO_ENTITLEMENT = "linka_pro";
var LINKA_PLAN_PRODUCTS = {
	anual: {
		kind: "anual",
		label: "Anual",
		cadence: "por ano",
		aliases: [
			"anual",
			"annual",
			"yearly",
			"$rc_annual"
		]
	},
	mensal: {
		kind: "mensal",
		label: "Mensal",
		cadence: "por mês",
		aliases: [
			"mensal",
			"monthly",
			"$rc_monthly"
		]
	}
};
/** Opt-in. Cobrança só liga com `VITE_BILLING_ENABLED=true`. */
function isBillingEnabled(value) {
	return value === "true";
}
var billingEnabled = isBillingEnabled(void 0);
function revenueCatApiKey(env) {
	return (env ?? {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}).VITE_REVENUECAT_API_KEY?.trim() || "test_oRdcLjsMEKDWEkLFHWBtdsXeZPh";
}
function hasLinkaPro(info) {
	if (!info) return false;
	return LINKA_PRO_ENTITLEMENT in info.entitlements.active;
}
function formattedPriceOf(pkg) {
	return pkg.product.price?.formattedPrice ?? pkg.product.currentPrice?.formattedPrice ?? "";
}
function toPlanPackageView(kind, pkg) {
	const meta = LINKA_PLAN_PRODUCTS[kind];
	return {
		kind,
		label: meta.label,
		cadence: meta.cadence,
		packageId: pkg.identifier,
		productId: pkg.product.identifier,
		title: pkg.product.title || meta.label,
		formattedPrice: formattedPriceOf(pkg)
	};
}
function pickPlanPackages(offering) {
	if (!offering) return {
		anual: null,
		mensal: null
	};
	return {
		anual: offering.annual ?? findPackage(offering, LINKA_PLAN_PRODUCTS.anual.aliases),
		mensal: offering.monthly ?? findPackage(offering, LINKA_PLAN_PRODUCTS.mensal.aliases)
	};
}
function planPackageViews(offering) {
	const picked = pickPlanPackages(offering);
	return {
		anual: picked.anual ? toPlanPackageView("anual", picked.anual) : null,
		mensal: picked.mensal ? toPlanPackageView("mensal", picked.mensal) : null
	};
}
function customerCenterUrl(info) {
	return info?.managementURL?.trim() || null;
}
function isUserCancelled(error) {
	return purchasesErrorCode(error) === 1;
}
/**
* Human-readable error for the UI. `null` means the person closed the flow —
* do not show a banner.
*/
function purchaseErrorMessage(error) {
	if (isUserCancelled(error)) return null;
	switch (purchasesErrorCode(error)) {
		case 2: return "A loja não concluiu a compra. Tente de novo.";
		case 3: return "Esta compra não é permitida nesta conta.";
		case 5: return "Esse plano não está à venda agora.";
		case 6: return "Essa assinatura já está na sua conta.";
		case 10: return "Sem conexão com a loja. Tente de novo.";
		case 11: return "A chave da RevenueCat não foi aceita.";
		case 14: return "A conta não pôde ser identificada na loja.";
		case 23: return "Falta configurar o plano na RevenueCat.";
		case 28: return "Não deu para ler a assinatura. Tente de novo.";
		case 38: return "O e-mail da compra não é válido.";
	}
	if (error instanceof Error && error.message.trim()) return error.message;
	return "Não deu para concluir a compra. Tente de novo.";
}
function purchasesErrorCode(error) {
	if (!error || typeof error !== "object") return null;
	if (!("errorCode" in error)) return null;
	const code = error.errorCode;
	return typeof code === "number" ? code : null;
}
function findPackage(offering, aliases) {
	const wanted = new Set(aliases.map((alias) => alias.toLowerCase()));
	const fromId = offering.availablePackages.find((pkg) => packageMatches(pkg, wanted));
	if (fromId) return fromId;
	for (const alias of aliases) {
		const byKey = offering.packagesById[alias] ?? offering.packagesById[alias.toLowerCase()];
		if (byKey) return byKey;
	}
	return null;
}
function packageMatches(pkg, wanted) {
	return wanted.has(pkg.identifier.toLowerCase()) || wanted.has(pkg.packageType.toLowerCase()) || wanted.has(pkg.product.identifier.toLowerCase());
}
//#endregion
export { planPackageViews as a, pickPlanPackages as i, customerCenterUrl as n, purchaseErrorMessage as o, hasLinkaPro as r, revenueCatApiKey as s, billingEnabled as t };
