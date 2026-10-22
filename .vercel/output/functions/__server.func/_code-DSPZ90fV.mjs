import { S as require_jsx_runtime, _ as Button, m as VStack, v as Heading, y as Text } from "./_libs/@astryxdesign/core+[...].mjs";
import { t as PublicShell } from "./_ssr/shell-Dr1Kw_S6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-DSPZ90fV.js
var import_jsx_runtime = require_jsx_runtime();
function MissingLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicShell, {
		account: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 4,
			maxWidth: 448,
			className: "mx-auto mt-16 w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					level: 1,
					type: "display-2",
					children: "Esse link não existe."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					color: "secondary",
					children: "Esse endereço não aponta para nenhum produto."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					href: "/",
					variant: "primary",
					label: "Ir para o início",
					width: "100%"
				})
			]
		})
	});
}
//#endregion
export { MissingLink as notFoundComponent };
