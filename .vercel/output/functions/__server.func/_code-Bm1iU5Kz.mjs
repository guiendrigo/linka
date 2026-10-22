import { C as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as buttonVariants } from "./_ssr/button-D41xaRju.mjs";
import { t as AppShell } from "./_ssr/shell-CFWNRFIK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-Bm1iU5Kz.js
var import_jsx_runtime = require_jsx_runtime();
function MissingLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		account: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-16 w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl leading-none font-semibold",
					children: "Esse link não existe."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: "Esse endereço não aponta para nenhum produto."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: `${buttonVariants({ variant: "primary" })} mt-8 w-full`,
					children: "Ir para o início"
				})
			]
		})
	});
}
//#endregion
export { MissingLink as notFoundComponent };
