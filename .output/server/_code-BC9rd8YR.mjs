import { S as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as Heading, d as Text, i as Button, m as VStack } from "./_ssr/ui-BbZxOCNN.mjs";
import { n as PublicShell } from "./_ssr/shell-1ZOA9Gcm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-BC9rd8YR.js
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
					children: "Esse link não existe"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					color: "secondary",
					children: "Esse endereço não aponta para nenhum produto ou achadinho ativo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					href: "/",
					variant: "primary",
					label: "Ir para a página inicial",
					width: "100%"
				})
			]
		})
	});
}
//#endregion
export { MissingLink as notFoundComponent };
