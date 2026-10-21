import { i as resolutionCopy, r as formatBrl } from "./_ssr/resolve-Di4BB_Yg.mjs";
import { C as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route$2 } from "./_ssr/router-DL14FxEK.mjs";
import { i as buttonVariants, t as AppShell } from "./_ssr/shell-DS2zCaeM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_code-Bge5KLF7.js
var import_jsx_runtime = require_jsx_runtime();
function VisitorPage() {
	const { link, resolution } = Route$2.useLoaderData();
	const copy = resolutionCopy(resolution);
	const role = resolution.status === "ok" ? resolution.role === "primary" ? "Oferta principal" : `Backup ${resolution.hop}` : "Sem destino";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		account: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto mt-10 w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-wide text-primary uppercase",
					children: "Visita do link"
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
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-wide text-muted uppercase",
								children: role
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-3xl font-semibold",
								children: copy.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted",
								children: copy.body
							}),
							resolution.status === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm break-all text-fg",
								children: resolution.offer.url
							}) : null
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: `${buttonVariants({ variant: "ghost" })} mt-4 w-full`,
					children: "Voltar para a bancada"
				})
			]
		})
	});
}
//#endregion
export { VisitorPage as component };
