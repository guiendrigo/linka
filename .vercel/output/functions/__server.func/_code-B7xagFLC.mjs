import { S as require_jsx_runtime, _ as Button, m as VStack, y as Text } from "./_libs/@astryxdesign/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-B7xagFLC.js
var import_jsx_runtime = require_jsx_runtime();
function BioShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 4,
		maxWidth: 384,
		padding: 5,
		className: "mx-auto min-h-dvh w-full py-10",
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			justify: "center",
			className: "mt-auto pt-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				href: "/",
				variant: "ghost",
				label: "Linka"
			})
		})]
	});
}
//#endregion
export { BioShell as t };
