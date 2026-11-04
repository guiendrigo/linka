import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Z as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Link2, p as CreditCard } from "../_libs/lucide-react.mjs";
import { c as Heading, d as Text, h as cn, i as Button, m as VStack, t as Avatar } from "./ui-BbZxOCNN.mjs";
import { o as signOut, s as useCurrentUser, t as LinkaBrand } from "./shell-1ZOA9Gcm.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { a as parsePhotoBase64, i as cleanBioIdentity } from "./bio-DfR42D11.mjs";
import { a as createSsrRpc } from "./router-DU8Z9w-x.mjs";
import { a as planPackageViews, i as pickPlanPackages, n as customerCenterUrl, o as purchaseErrorMessage, r as hasLinkaPro, s as revenueCatApiKey, t as billingEnabled } from "./purchases-CIxOrcXK.mjs";
import { n as cleanProduct } from "./input-DHVI1aSa.mjs";
import { t as authMiddleware } from "./middleware-ilFY8ayo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/console-CXZma-IZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var getWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("059bf76fbf611564222d39fd40694a844bb8b9c432118bb9386713e7f2bd5858"));
var syncUserPlan = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ isPro: asRecord(data).isPro === true })).handler(createSsrRpc("218c74d929911c01208d89bd05f1b3b1499c0fc59ef1c7399a79d45c7c857b31"));
var addProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	const offers = Array.isArray(body.offers) ? body.offers.map(asOffer) : [];
	return cleanProduct({
		title: typeof body.title === "string" ? body.title : "",
		price: typeof body.price === "string" ? body.price : "",
		commission: typeof body.commission === "string" ? body.commission : "",
		offers
	});
}).handler(createSsrRpc("156a2ae191035dc24aa4bacb36604d42939c5258c199d79dca1556b5d0bfdd60"));
var editProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) throw new Error("Produto inválido.");
	const offers = Array.isArray(body.offers) ? body.offers.map(asOffer) : [];
	return {
		id: body.id,
		product: cleanProduct({
			title: typeof body.title === "string" ? body.title : "",
			price: typeof body.price === "string" ? body.price : "",
			commission: typeof body.commission === "string" ? body.commission : "",
			offers
		})
	};
}).handler(createSsrRpc("18987b496d6b14e6a61a3212798aaf76c93e6f7de9691a41017a62d4309bef47"));
var refreshStock = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ force: asRecord(data).force === true })).handler(createSsrRpc("68345f626e4549d1e4b2b91c89e7522060736110c3875b614d804a8f697d05e3"));
var removeProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const id = asRecord(data).id;
	if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Produto inválido.");
	return id;
}).handler(createSsrRpc("69f981afc6d36ff09e64dde6147fee619233451a99f592843859d13fd9d3fba1"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) throw new Error("Oferta inválida.");
	if (typeof body.inStock !== "boolean") throw new Error("Estoque inválido.");
	return {
		id: body.id,
		inStock: body.inStock
	};
}).handler(createSsrRpc("d1ca61e51831a5144615f1a875a3648c530cb6fd4ccc502959ae70e645cb4b7b"));
var saveBioPage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	return cleanBioIdentity({
		title: typeof body.title === "string" ? body.title : "",
		description: typeof body.description === "string" ? body.description : ""
	});
}).handler(createSsrRpc("671c6231c477b6e3a61a2ad3cbd21c50d3a5daa7a8b1801805f106fb9be3aa94"));
var saveBioPagePhoto = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	const image = typeof body.image === "string" ? body.image : "";
	parsePhotoBase64(image);
	return image;
}).handler(createSsrRpc("d1c866f6bb64598b8e02014942993e825b4a33b18b1135664b5bdf3ce1a93e87"));
var setBioVisible = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) throw new Error("Produto inválido.");
	if (typeof body.visible !== "boolean") throw new Error("Visibilidade inválida.");
	return {
		id: body.id,
		visible: body.visible
	};
}).handler(createSsrRpc("c1bfa749da67285516a5b0fee467b4817cdff3078f3618c11cb56fb8cf90f0ae"));
function asRecord(data) {
	if (!data || typeof data !== "object" || Array.isArray(data)) return {};
	return data;
}
function asOffer(value) {
	const body = asRecord(value);
	return {
		shop: typeof body.shop === "string" ? body.shop : "",
		url: typeof body.url === "string" ? body.url : "",
		inStock: body.inStock !== false
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
		if (next) syncUserPlan({ data: { isPro: next.isPro } }).catch(() => {});
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
function ConsoleShell({ current, title, subtitle, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchasesProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-[var(--color-background-body)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-[var(--color-border)] bg-[var(--color-background-body)] lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-14 items-center px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkaBrand, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden w-56 shrink-0 border-r border-[var(--color-border)] lg:flex lg:min-h-[calc(100dvh-0px)] lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-[var(--color-border)] px-4 py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkaBrand, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountBlock, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-1 flex-col gap-0.5 p-2",
						"aria-label": "Conta",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNavLink, {
							to: "/",
							label: "Links",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
								size: 16,
								"aria-hidden": "true"
							}),
							selected: current === "links"
						}), billingEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNavLink, {
							to: "/plano",
							label: "Plano",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
								size: 16,
								"aria-hidden": "true"
							}),
							selected: current === "plano"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-[var(--color-border)] p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutControl, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1 px-4 py-6",
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
			})]
		})]
	}) });
}
function SideNavLink({ to, label, icon, selected }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors", selected ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm" : "text-[var(--color-text-secondary)] hover:bg-black/5 hover:text-[var(--color-text-primary)]"),
		children: [icon, label]
	});
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
		className: "flex items-center gap-3 border-b border-[var(--color-border)] px-3 py-3",
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
		className: "min-h-dvh bg-[var(--color-background-body)]",
		"aria-busy": "true"
	});
}
//#endregion
export { getWorkspace as a, saveBioPage as c, usePurchases as d, editProduct as i, saveBioPagePhoto as l, ConsoleShell as n, refreshStock as o, addProduct as r, removeProduct as s, ConsolePending as t, setBioVisible as u };
