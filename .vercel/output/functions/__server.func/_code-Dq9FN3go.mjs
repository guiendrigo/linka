import { r as formatBrl } from "./_ssr/resolve-D_7ToDhA.mjs";
import { S as require_jsx_runtime, _ as Button, d as List, f as Avatar, u as ListItem, v as Heading, y as Text } from "./_libs/@astryxdesign/core+[...].mjs";
import { n as Route$1 } from "./_ssr/router-CKwuZXMT.mjs";
import { t as BioShell } from "./_code-B7xagFLC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-Dq9FN3go.js
var import_jsx_runtime = require_jsx_runtime();
function BioPage() {
	const page = Route$1.useLoaderData();
	const description = page.description.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BioShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
			src: page.hasPhoto ? `/p/${page.code}/photo` : void 0,
			name: page.title,
			size: "xl",
			className: "mx-auto"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
			level: 1,
			type: "display-2",
			justify: "center",
			children: page.title
		}),
		description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			color: "secondary",
			justify: "center",
			children: description
		}) : null,
		page.products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			color: "secondary",
			justify: "center",
			children: "Nenhuma oferta no momento"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: page.products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, {
			label: product.title,
			description: formatBrl(product.priceCents),
			endContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				href: `/r/${product.code}`,
				variant: "primary",
				label: "Ver oferta"
			})
		}, product.code)) })
	] });
}
//#endregion
export { BioPage as component };
