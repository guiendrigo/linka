import { a as resolutionCopy, r as formatBrl } from "./_ssr/resolve-Czhe8mfX.mjs";
import { C as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route$2 } from "./_ssr/router-DnyDjaPg.mjs";
import { t as AppShell } from "./_ssr/shell-dwbbaZTS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-D_1MP-lW.js
var import_jsx_runtime = require_jsx_runtime();
function VisitorPage() {
	const { link, resolution } = Route$2.useLoaderData();
	const copy = resolution.status === "ok" ? {
		title: "Destino bloqueado",
		body: "A oferta não é um link https. O clique não sai."
	} : resolutionCopy(resolution);
	const eyebrow = resolution.status === "empty" ? "Link sem destino" : "Oferta esgotada";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		account: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto mt-16 w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-wide text-primary uppercase",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-4xl leading-none font-semibold tracking-tight",
					children: link.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatBrl(link.priceCents)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " · " }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [link.commissionPct, "%"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 rounded-3xl bg-surface p-2 shadow-ring",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-bg px-4 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl font-semibold",
							children: copy.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: copy.body
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { VisitorPage as component };
