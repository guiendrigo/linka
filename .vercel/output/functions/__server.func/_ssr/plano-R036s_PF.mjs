import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Q as require_react, b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sparkles } from "../_libs/lucide-react.mjs";
import { i as useCurrentUserState, t as RedirectToSignIn } from "./gates-DWE7aa1w.mjs";
import { r as cn, t as Button } from "./button-D41xaRju.mjs";
import { i as usePurchases, n as ConsoleShell, r as billingEnabled, t as ConsolePending } from "./console-B5XuQQFf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plano-R036s_PF.js
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-w-md flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-3xl border border-dashed border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "size-5",
							"aria-hidden": "true"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Linka Pro"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 flex items-center gap-1.5 text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("size-1.5 rounded-full", isPro ? "bg-primary" : "bg-muted"),
									"aria-hidden": "true"
								}), isPro ? "Assinatura ativa" : "Sem assinatura"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: isPro ? "A conta tem o entitlement linka_pro. Dá para gerenciar a cobrança na central do cliente." : "Anual ou mensal. O clique na oferta da RevenueCat abre o checkout na web."
							})
						]
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-primary",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: [status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => void run(refresh),
						disabled: pending,
						children: "Tentar de novo"
					}) : isPro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => openCustomerCenter(),
						disabled: !managementURL || pending,
						children: "Gerenciar assinatura"
					}) : hasPaywall ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => void run(presentPaywall),
						disabled: pending,
						children: "Ver ofertas"
					}) : null, isPro && !managementURL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-muted",
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: pkg?.label ?? label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl tracking-tight",
				children: pkg?.formattedPrice || "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: cadence
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				variant: kind === "anual" ? "primary" : "ghost",
				disabled: disabled || !pkg,
				onClick: () => void onPick(kind),
				children: "Assinar"
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
