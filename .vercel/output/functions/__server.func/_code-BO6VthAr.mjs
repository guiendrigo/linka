import { a as resolutionCopy, r as formatBrl } from "./_ssr/resolve-D_7ToDhA.mjs";
import { S as require_jsx_runtime, m as VStack, p as Card, v as Heading, y as Text } from "./_libs/@astryxdesign/core+[...].mjs";
import { r as Route$4 } from "./_ssr/router-CKwuZXMT.mjs";
import { t as PublicShell } from "./_ssr/shell-Dr1Kw_S6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-BO6VthAr.js
var import_jsx_runtime = require_jsx_runtime();
function VisitorPage() {
	const { link, resolution } = Route$4.useLoaderData();
	const copy = resolution.status === "ok" ? {
		title: "Destino bloqueado",
		body: "A oferta não é um link https. O clique não sai."
	} : resolutionCopy(resolution);
	const eyebrow = resolution.status === "empty" ? "Link sem destino" : "Oferta esgotada";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicShell, {
		account: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 4,
			maxWidth: 448,
			className: "mx-auto mt-16 w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					color: "accent",
					weight: "semibold",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					level: 1,
					type: "display-2",
					children: link.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					color: "secondary",
					hasTabularNumbers: true,
					children: formatBrl(link.priceCents)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					padding: 4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
						level: 2,
						children: copy.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						color: "secondary",
						children: copy.body
					})]
				})
			]
		})
	});
}
//#endregion
export { VisitorPage as component };
