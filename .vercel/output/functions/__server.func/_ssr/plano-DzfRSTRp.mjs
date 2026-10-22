import { o as __toESM } from "../_runtime.mjs";
import { C as require_react, S as require_jsx_runtime, _ as Button, c as Banner, m as VStack, p as Card, v as Heading, y as Text } from "../_libs/@astryxdesign/core+[...].mjs";
import { b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Sparkles } from "../_libs/lucide-react.mjs";
import { i as useCurrentUserState, t as RedirectToSignIn } from "./gates-CdeB3G3x.mjs";
import { i as usePurchases, n as ConsoleShell, r as billingEnabled, t as ConsolePending } from "./console-w3pyHje1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plano-DzfRSTRp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlanPanel() {
	const { status, isPro, hasPaywall, managementURL, packages, error, presentPaywall, purchasePlan, openCustomerCenter, refresh } = usePurchases();
	const [pending, setPending] = (0, import_react.useState)(false);
	async function run(action) {
		if (pending) return;
		setPending(true);
		try {
			await action();
		} finally {
			setPending(false);
		}
	}
	if (status === "loading" || status === "idle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-40 max-w-md animate-pulse rounded-3xl bg-surface",
		"aria-busy": "true"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 4,
		maxWidth: 448,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			padding: 4,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						className: "size-5 text-accent",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
						gap: 1,
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								weight: "medium",
								children: "Linka Pro"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								color: "secondary",
								children: isPro ? "Assinatura ativa" : "Sem assinatura"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								color: "secondary",
								children: isPro ? "A conta tem o entitlement linka_pro. Dá para gerenciar a cobrança na central do cliente." : "Anual ou mensal. O clique na oferta da RevenueCat abre o checkout na web."
							})
						]
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
					status: "error",
					title: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 2,
					className: "mt-4",
					children: [status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						width: "100%",
						label: "Tentar de novo",
						isDisabled: pending,
						onClick: () => void run(refresh)
					}) : isPro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						width: "100%",
						label: "Gerenciar assinatura",
						isDisabled: !managementURL || pending,
						onClick: () => openCustomerCenter()
					}) : hasPaywall ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						width: "100%",
						label: "Ver ofertas",
						isDisabled: pending,
						onClick: () => void run(presentPaywall)
					}) : null, isPro && !managementURL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						color: "secondary",
						children: "A central do cliente aparece quando a RevenueCat devolve o endereço de gerenciamento da assinatura web."
					}) : null]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
				pkg: packages.anual,
				kind: "anual",
				disabled: status !== "ready" || pending,
				onPick: (kind) => run(() => purchasePlan(kind))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
				pkg: packages.mensal,
				kind: "mensal",
				disabled: status !== "ready" || pending,
				onPick: (kind) => run(() => purchasePlan(kind))
			})]
		})]
	});
}
function PlanCard({ pkg, kind, disabled, onPick }) {
	const label = kind === "anual" ? "Anual" : "Mensal";
	const cadence = kind === "anual" ? "por ano" : "por mês";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		padding: 4,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				weight: "medium",
				children: pkg?.label ?? label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				level: 3,
				children: pkg?.formattedPrice || "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				size: "sm",
				color: "secondary",
				children: cadence
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				width: "100%",
				variant: kind === "anual" ? "primary" : "secondary",
				isDisabled: disabled || !pkg,
				label: "Assinar",
				onClick: () => void onPick(kind)
			})
		]
	});
}
function PlanoPage() {
	const { user, isPending } = useCurrentUserState();
	if (!billingEnabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePending, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsoleShell, {
		current: "plano",
		title: "Plano",
		subtitle: "Assinatura da conta. Anual ou mensal, com o entitlement linka_pro.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanPanel, {})
	});
}
//#endregion
export { PlanoPage as component };
