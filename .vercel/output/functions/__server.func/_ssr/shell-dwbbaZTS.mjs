import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as buttonVariants, r as UserButton, s as useCurrentUserState } from "./gates-vBYncvM2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-dwbbaZTS.js
var import_jsx_runtime = require_jsx_runtime();
function AccountSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		className: "h-11 w-24 animate-pulse rounded-full bg-surface-2"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: buttonVariants({ variant: "ghost" }),
		children: "Entrar"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0 [&_span]:inline-block [&_span]:max-w-28 [&_span]:truncate sm:[&_span]:max-w-44",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
	});
}
function AppShell({ children, account = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-[calc(100dvh-0.25rem)] w-full max-w-5xl flex-col px-5 py-5 sm:px-8 sm:py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-semibold tracking-tight",
						children: "Linka"
					})]
				}), account ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSlot, {}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 flex-col",
				children
			})]
		})]
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "28",
		height: "28",
		viewBox: "0 0 28 28",
		"aria-hidden": "true",
		className: "text-primary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "1.5",
				y: "7",
				width: "14",
				height: "14",
				rx: "4",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12.5",
				y: "7",
				width: "14",
				height: "14",
				rx: "4",
				fill: "var(--color-bg)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12.5",
				y: "7",
				width: "14",
				height: "14",
				rx: "4",
				fill: "currentColor",
				opacity: "0.72"
			})
		]
	});
}
//#endregion
export { AppShell as t };
