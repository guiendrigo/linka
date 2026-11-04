import { S as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { m as VStack } from "./_ssr/ui-BbZxOCNN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-wA5GtDSh.js
var import_jsx_runtime = require_jsx_runtime();
function BioShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 5,
		maxWidth: 440,
		padding: 4,
		className: "mx-auto min-h-dvh w-full py-8 sm:py-12",
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-auto pt-8 text-center text-xs text-[var(--color-text-secondary)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/",
				className: "inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-text-primary)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-1.5 rounded-full bg-[var(--color-accent)]",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Feito com Linka" })]
			})
		})]
	});
}
//#endregion
export { BioShell as t };
