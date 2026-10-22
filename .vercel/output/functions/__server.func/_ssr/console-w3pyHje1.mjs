import { o as __toESM } from "../_runtime.mjs";
import { C as require_react, S as require_jsx_runtime, _ as Button, f as Avatar, g as AppShell, h as TopNav, m as VStack, o as SideNavItem, s as SideNav, v as Heading, y as Text } from "../_libs/@astryxdesign/core+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as hasGateSessionMarker } from "./server-BOSZI47M.mjs";
import { a as Link2, r as Sparkles } from "../_libs/lucide-react.mjs";
import { a as signOut } from "./client-DwTeyJR6.mjs";
import { r as useCurrentUser } from "./gates-CdeB3G3x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/console-w3pyHje1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
async function loadSdk() {
	return import("../_libs/revenuecat__purchases-js.mjs").then((n) => n.t);
}
async function ensurePurchases(appUserId) {
	if (!billingEnabled) throw new Error("Cobrança desligada.");
	const { Purchases, LogLevel } = await loadSdk();
	const apiKey = revenueCatApiKey();
	if (!apiKey) throw new Error("Falta a chave pública da RevenueCat.");
	if (Purchases.isConfigured()) {
		const purchases = Purchases.getSharedInstance();
		if (purchases.getAppUserId() !== appUserId) await purchases.changeUser(appUserId);
		return purchases;
	}
	return Purchases.configure({
		apiKey,
		appUserId
	});
}
function teardownPurchases() {
	if (!billingEnabled) return;
	loadSdk().then(({ Purchases }) => {
		if (!Purchases.isConfigured()) return;
		Purchases.getSharedInstance().close();
	}).catch(() => {});
}
async function startPurchasesSession(appUserId, attributes = {}) {
	const purchases = await ensurePurchases(appUserId);
	purchases.preload();
	await syncCustomerAttributes(attributes);
	const [customerInfo, offerings] = await Promise.all([purchases.getCustomerInfo(), purchases.getOfferings()]);
	return sessionFrom(customerInfo, offerings);
}
async function presentLinkaPaywall(options) {
	const { Purchases, PurchasesError, ErrorCode } = await loadSdk();
	const purchases = Purchases.getSharedInstance();
	const offerings = await purchases.getOfferings();
	const offering = offerings.current;
	try {
		return sessionFrom((await purchases.presentPaywall({
			offering: offering ?? void 0,
			customerEmail: options.customerEmail?.trim() || void 0,
			selectedLocale: "pt_BR",
			onVisitCustomerCenter: options.onVisitCustomerCenter
		})).customerInfo, offerings);
	} catch (error) {
		if (error instanceof PurchasesError && error.errorCode === ErrorCode.UserCancelledError) return null;
		throw error;
	}
}
async function purchaseLinkaPlan(kind, packages, customerEmail) {
	const rcPackage = packages[kind];
	if (!rcPackage) throw new Error("Esse plano não está disponível agora.");
	const { Purchases, PurchasesError, ErrorCode } = await loadSdk();
	const purchases = Purchases.getSharedInstance();
	try {
		const result = await purchases.purchase({
			rcPackage,
			customerEmail: customerEmail?.trim() || void 0,
			selectedLocale: "pt_BR"
		});
		const offerings = await purchases.getOfferings();
		return sessionFrom(result.customerInfo, offerings);
	} catch (error) {
		if (error instanceof PurchasesError && error.errorCode === ErrorCode.UserCancelledError) return null;
		throw error;
	}
}
function openCustomerCenter(info) {
	const url = customerCenterUrl(info);
	if (!url || typeof window === "undefined") return false;
	window.open(url, "_blank", "noopener,noreferrer");
	return true;
}
async function syncCustomerAttributes(attributes) {
	const email = attributes.email?.trim();
	const displayName = attributes.displayName?.trim();
	if (!email && !displayName) return;
	try {
		const { Purchases, ReservedCustomerAttribute } = await loadSdk();
		const payload = {};
		if (email) payload[ReservedCustomerAttribute.Email] = email;
		if (displayName) payload[ReservedCustomerAttribute.DisplayName] = displayName;
		await Purchases.getSharedInstance().setAttributes(payload);
	} catch {}
}
function sessionFrom(customerInfo, offerings) {
	const offering = offerings.current;
	return {
		customerInfo,
		offering,
		packages: pickPlanPackages(offering),
		isPro: hasLinkaPro(customerInfo),
		hasPaywall: offering?.hasPaywall === true,
		managementURL: customerCenterUrl(customerInfo)
	};
}
var PurchasesContext = (0, import_react.createContext)(null);
function PurchasesProvider({ children }) {
	const user = useCurrentUser();
	const value = usePurchasesSession(user?.id ?? null, user?.primaryEmail ?? null, user?.displayName ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchasesContext.Provider, {
		value,
		children
	});
}
function usePurchases() {
	const ctx = (0, import_react.useContext)(PurchasesContext);
	if (!ctx) throw new Error("usePurchases precisa do PurchasesProvider.");
	return ctx;
}
function usePurchasesSession(userId, email, displayName) {
	const [status, setStatus] = (0, import_react.useState)(billingEnabled && userId ? "loading" : "idle");
	const [session, setSession] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const applySession = (0, import_react.useCallback)((next) => {
		setSession(next);
		setStatus(next ? "ready" : "idle");
		setError(null);
	}, []);
	const load = (0, import_react.useCallback)(async (id) => {
		if (!billingEnabled) return;
		setStatus("loading");
		setError(null);
		try {
			const next = await startPurchasesSession(id, {
				email,
				displayName
			});
			applySession(next);
		} catch (err) {
			setSession(null);
			setStatus("error");
			setError(purchaseErrorMessage(err) ?? "Não deu para carregar o plano.");
		}
	}, [
		applySession,
		displayName,
		email
	]);
	(0, import_react.useEffect)(() => {
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
		startPurchasesSession(userId, {
			email,
			displayName
		}).then((next) => {
			if (!cancelled) applySession(next);
		}).catch((err) => {
			if (cancelled) return;
			setSession(null);
			setStatus("error");
			setError(purchaseErrorMessage(err) ?? "Não deu para carregar o plano.");
		});
		return () => {
			cancelled = true;
		};
	}, [
		applySession,
		displayName,
		email,
		userId
	]);
	const presentPaywall = (0, import_react.useCallback)(async () => {
		if (!billingEnabled) return false;
		setError(null);
		try {
			const next = await presentLinkaPaywall({
				customerEmail: email,
				onVisitCustomerCenter: () => {
					openCustomerCenter(session?.customerInfo);
				}
			});
			if (next) applySession(next);
			return next ? hasPro(next) : false;
		} catch (err) {
			const message = purchaseErrorMessage(err);
			if (message) setError(message);
			return false;
		}
	}, [
		applySession,
		email,
		session?.customerInfo
	]);
	const purchasePlan = (0, import_react.useCallback)(async (kind) => {
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
	}, [
		applySession,
		email,
		session
	]);
	const openCenter = (0, import_react.useCallback)(() => openCustomerCenter(session?.customerInfo), [session?.customerInfo]);
	const refresh = (0, import_react.useCallback)(async () => {
		if (!userId) return;
		await load(userId);
	}, [load, userId]);
	return (0, import_react.useMemo)(() => ({
		status,
		isPro: session ? hasPro(session) : false,
		hasPaywall: session?.hasPaywall === true,
		managementURL: session?.managementURL ?? null,
		packages: planPackageViews(session?.offering ?? null),
		error,
		presentPaywall,
		purchasePlan,
		openCustomerCenter: openCenter,
		refresh
	}), [
		error,
		openCenter,
		presentPaywall,
		purchasePlan,
		refresh,
		session,
		status
	]);
}
function hasPro(session) {
	return session.isPro;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
function ConsoleShell({ current, title, subtitle, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchasesProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		height: "auto",
		contentPadding: 4,
		variant: "section",
		topNav: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, {
			label: "Linka",
			heading: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					weight: "semibold",
					children: "Linka"
				})
			})
		}),
		sideNav: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SideNav, {
			"aria-label": "Conta",
			header: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountBlock, {}),
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutControl, {}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNavItem, {
				label: "Links",
				href: "/",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
					size: 16,
					"aria-hidden": "true"
				}),
				isSelected: current === "links"
			}), billingEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNavItem, {
				label: "Plano",
				href: "/plano",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
					size: 16,
					"aria-hidden": "true"
				}),
				isSelected: current === "plano"
			}) : null]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 4,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 1,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
						level: 1,
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						color: "secondary",
						children: subtitle
					})]
				}),
				action ? action : null,
				children
			]
		})
	}) });
}
function AccountBillingMeta({ email }) {
	const { isPro, status } = usePurchases();
	if (isPro) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
		size: "sm",
		color: "accent",
		maxLines: 1,
		children: "Linka Pro"
	});
	if (email) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
		size: "sm",
		color: "secondary",
		maxLines: 1,
		children: email
	});
	if (status === "ready") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
		size: "sm",
		color: "secondary",
		maxLines: 1,
		children: "Sem assinatura"
	});
	return null;
}
function AccountBlock() {
	const user = useCurrentUser();
	const name = user?.displayName ?? user?.primaryEmail ?? "Conta";
	const email = user?.primaryEmail;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 px-2 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
			src: user?.profileImageUrl ?? void 0,
			name,
			size: "md"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 0,
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				weight: "medium",
				maxLines: 1,
				children: name
			}), billingEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountBillingMeta, { email: email && email !== name ? email : null }) : email && email !== name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				size: "sm",
				color: "secondary",
				maxLines: 1,
				children: email
			}) : null]
		})]
	});
}
function SignOutControl() {
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if ((0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		label: signingOut ? "Signing out…" : "Sign out",
		isDisabled: signingOut,
		width: "100%",
		onClick: () => {
			setSigningOut(true);
			signOut().catch(() => setSigningOut(false));
		}
	});
}
function ConsolePending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-body",
		"aria-busy": "true"
	});
}
//#endregion
export { usePurchases as i, ConsoleShell as n, billingEnabled as r, ConsolePending as t };
