import { S as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { f as ExternalLink } from "./_libs/lucide-react.mjs";
import { c as Heading, d as Text, i as Button, m as VStack, t as Avatar } from "./_ssr/ui-BbZxOCNN.mjs";
import { t as BioShell } from "./_code-wA5GtDSh.mjs";
import { r as formatBrl } from "./_ssr/resolve-D_7ToDhA.mjs";
import { n as Route$1 } from "./_ssr/router-DU8Z9w-x.mjs";
import { t as HopNow } from "./_ssr/hop-now-FtGZJZ_U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-Cbfj6K10.js
var import_jsx_runtime = require_jsx_runtime();
function BioPage() {
	const page = Route$1.useLoaderData();
	const description = page.description.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BioShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 2,
		hAlign: "center",
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
				src: page.hasPhoto ? `/p/${page.code}/photo` : void 0,
				name: page.title,
				size: "xl",
				className: "size-24 rounded-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				level: 1,
				type: "display-2",
				justify: "center",
				className: "text-xl sm:text-2xl font-medium",
				children: page.title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				color: "secondary",
				justify: "center",
				className: "max-w-sm text-sm",
				children: description
			}) : null
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 3,
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			size: "sm",
			color: "secondary",
			children: "Achadinhos"
		}), page.products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
			color: "secondary",
			size: "sm",
			children: "Nenhuma oferta disponível no momento."
		}) : page.products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-base font-medium text-[var(--color-text-primary)]",
					children: product.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-medium tabular-nums text-[var(--color-text-primary)]",
						children: formatBrl(product.priceCents)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HopNow, {})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				href: `/r/${product.code}`,
				variant: "primary",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 16 }),
				label: "Ver oferta",
				width: "100%"
			})]
		}, product.code))]
	})] });
}
//#endregion
export { BioPage as component };
