import { C as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-CKbOCxfj.js
var import_jsx_runtime = require_jsx_runtime();
function BioShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh w-full max-w-sm flex-col px-5 py-10",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-auto pt-12 text-center text-xs text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-sm font-semibold tracking-tight text-fg",
					children: "Linka"
				})
			})]
		})
	});
}
//#endregion
export { BioShell as t };
