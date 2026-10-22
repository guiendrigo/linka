import { t as formatBrl } from "./_ssr/resolve-BPVOCpaa.mjs";
import { C as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route$1 } from "./_ssr/router-CU9M-4iV.mjs";
import { n as buttonVariants } from "./_ssr/button-D41xaRju.mjs";
import { t as BioShell } from "./_code-CKbOCxfj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-BqNjm3EQ.js
var import_jsx_runtime = require_jsx_runtime();
function BioPage() {
	const page = Route$1.useLoaderData();
	const description = page.description.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BioShell, { children: [
		page.hasPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: `/p/${page.code}/photo`,
			alt: "",
			width: 96,
			height: 96,
			className: "mx-auto size-24 rounded-full object-cover shadow-ring"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid size-24 place-items-center rounded-full bg-surface text-lg font-semibold text-muted shadow-ring",
			children: initials(page.title)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-5 text-center text-3xl leading-none font-semibold tracking-tight",
			children: page.title
		}),
		description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-center text-sm leading-relaxed text-muted",
			children: description
		}) : null,
		page.products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-10 text-center text-sm text-muted",
			children: "Nenhuma oferta no momento"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 flex flex-col gap-3",
			children: page.products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium",
						children: product.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm tabular-nums text-muted",
						children: formatBrl(product.priceCents)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/r/$code",
					params: { code: product.code },
					search: { on: void 0 },
					className: `${buttonVariants({ variant: "primary" })} shrink-0 px-3`,
					children: "Ver oferta"
				})]
			}) }, product.code))
		})
	] });
}
function initials(title) {
	const parts = title.trim().split(/\s+/).filter(Boolean);
	return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "L";
}
//#endregion
export { BioPage as component };
