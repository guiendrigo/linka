import { S as require_jsx_runtime, _ as Button, v as Heading, y as Text } from "./_libs/@astryxdesign/core+[...].mjs";
import { t as BioShell } from "./_code-B7xagFLC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-DEVGeM6m.js
var import_jsx_runtime = require_jsx_runtime();
function MissingBio() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BioShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
			level: 1,
			type: "display-2",
			justify: "center",
			children: "Esse link não existe."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			color: "secondary",
			justify: "center",
			children: "Esse endereço não aponta para nenhuma página."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			href: "/",
			variant: "primary",
			label: "Ir para o início",
			width: "100%"
		})
	] });
}
//#endregion
export { MissingBio as notFoundComponent };
