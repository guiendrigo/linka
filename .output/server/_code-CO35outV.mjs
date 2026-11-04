import { S as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as Heading, d as Text, i as Button, m as VStack } from "./_ssr/ui-BbZxOCNN.mjs";
import { t as BioShell } from "./_code-wA5GtDSh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-CO35outV.js
var import_jsx_runtime = require_jsx_runtime();
function MissingBio() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BioShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 4,
		className: "py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				level: 1,
				type: "display-2",
				children: "Essa página não existe"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				color: "secondary",
				children: "O endereço digitado não aponta para nenhuma página de achadinhos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				href: "/",
				variant: "primary",
				label: "Ir para a página inicial",
				width: "100%"
			})
		]
	}) });
}
//#endregion
export { MissingBio as notFoundComponent };
