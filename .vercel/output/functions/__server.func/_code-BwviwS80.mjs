import { C as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as buttonVariants } from "./_ssr/button-D41xaRju.mjs";
import { t as BioShell } from "./_code-CKbOCxfj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-BwviwS80.js
var import_jsx_runtime = require_jsx_runtime();
function MissingBio() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BioShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-center text-3xl leading-none font-semibold",
			children: "Esse link não existe."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-center text-sm text-muted",
			children: "Esse endereço não aponta para nenhuma página."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: `${buttonVariants({ variant: "primary" })} mt-8 w-full`,
			children: "Ir para o início"
		})
	] });
}
//#endregion
export { MissingBio as notFoundComponent };
