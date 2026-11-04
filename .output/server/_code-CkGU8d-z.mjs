import { S as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as Heading, d as Text, i as Button, m as VStack } from "./_ssr/ui-BbZxOCNN.mjs";
import { n as PublicShell } from "./_ssr/shell-1ZOA9Gcm.mjs";
import { a as resolutionCopy, r as formatBrl } from "./_ssr/resolve-D_7ToDhA.mjs";
import { r as Route$4 } from "./_ssr/router-DU8Z9w-x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-CkGU8d-z.js
var import_jsx_runtime = require_jsx_runtime();
function VisitorPage() {
	const { visit } = Route$4.useLoaderData();
	const copy = visit.kind === "blocked" ? {
		title: "Destino indisponível",
		body: "A oferta não é um link seguro https. O clique não foi redirecionado."
	} : resolutionCopy(visit.resolution);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicShell, {
		account: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 5,
			maxWidth: 448,
			className: "mx-auto mt-16 w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 2,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							color: "secondary",
							children: visit.kind === "blocked" ? "Destino indisponível" : "Esgotado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							level: 1,
							type: "display-2",
							children: visit.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl font-medium tabular-nums text-[var(--color-text-primary)]",
							children: formatBrl(visit.priceCents)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 2,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							level: 2,
							className: "text-base font-medium",
							children: copy.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							color: "secondary",
							size: "sm",
							children: copy.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							color: "secondary",
							size: "sm",
							children: "Todas as lojas cadastradas para este achadinho estão sem estoque no momento."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					href: "/",
					variant: "secondary",
					label: "Conhecer o Linka",
					width: "100%"
				})
			]
		})
	});
}
//#endregion
export { VisitorPage as component };
