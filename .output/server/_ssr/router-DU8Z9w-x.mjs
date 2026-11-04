import { S as require_jsx_runtime, X as notFound, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, q as redirect, v as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as auth } from "./server-BYlNVJNH.mjs";
import { a as getServerFnById, c as __exportAll, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { n as parsePublicCode } from "./public-resolve-DPQJgA-w.mjs";
import { t as BIO_CODE_RE } from "./bio-DfR42D11.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-B2Izd0c7.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DU8Z9w-x.js
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var styles_default = "/assets/styles-BtiMNnxD.css";
var APP_NAME = "Linka";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Link inteligente para afiliados da Shopee. Se a oferta principal acaba, o clique segue para o backup."
			},
			{
				name: "theme-color",
				content: "#f1f1f1"
			}
		],
		links: [{
			rel: "icon",
			type: "image/svg+xml",
			href: "/favicon.svg"
		}, {
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-tpQxLfc5.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./login-BZuLpHio.mjs");
var Route$7 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Entrar · Linka Afiliados" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./plano-w8AgSZI-.mjs");
var Route$6 = createFileRoute("/plano")({
	head: () => ({ meta: [{ title: "Plano e Assinatura · Linka" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$5 = createFileRoute("/api/health")({ server: { handlers: { GET: async () => {
	const { probeSql } = await import("./health-jA-gu2yk.mjs");
	const { getSql } = await import("./db-sKYhmciq.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql().catch(() => null);
	const result = sql ? await probeSql(sql) : {
		ok: false,
		service: "linka"
	};
	return Response.json(result, { status: result.ok ? 200 : 503 });
} } } });
function parseResolveInput(data) {
	if (typeof data === "string") {
		const code = parsePublicCode(data);
		if (!code) throw new Error("Código inválido");
		return { code };
	}
	if (typeof data === "object" && data !== null && "code" in data) {
		const raw = data;
		const code = parsePublicCode(raw.code);
		if (!code) throw new Error("Código inválido");
		return {
			code,
			on: typeof raw.on === "string" ? raw.on : void 0
		};
	}
	throw new Error("Código inválido");
}
var resolveCode = createServerFn({ method: "GET" }).validator((data) => parseResolveInput(data)).handler(createSsrRpc("788efc79f993b15117f9c872ddcbda5cd3416d8baa7cabeb89bab2ef4a75b979"));
var $$splitComponentImporter$1 = () => import("../_code-CkGU8d-z.mjs");
var $$splitNotFoundComponentImporter$1 = () => import("../_code-BC9rd8YR.mjs");
var Route$4 = createFileRoute("/r/$code")({
	validateSearch: (search) => ({ on: typeof search.on === "string" ? search.on : void 0 }),
	loaderDeps: ({ search }) => ({ on: search.on }),
	loader: async ({ params, deps }) => {
		const visit = await resolveCode({ data: {
			code: params.code,
			on: deps.on
		} });
		switch (visit.kind) {
			case "invalid":
			case "missing": throw notFound();
			case "redirect": throw redirect({
				href: visit.url,
				statusCode: 302,
				headers: { "cache-control": "no-store" }
			});
			case "sold_out": return {
				kind: "sold_out",
				visit
			};
			case "blocked": return {
				kind: "blocked",
				visit
			};
		}
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.visit.title} · Oferta esgotada` }] : [{ title: "Link não encontrado · Linka" }] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$3 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
function toPublicResolution(resolution) {
	if (resolution.status !== "ok") return { status: resolution.status };
	return {
		status: resolution.status,
		role: resolution.role,
		hop: resolution.hop,
		shop: resolution.offer.shop,
		url: resolution.offer.url
	};
}
function jsonForVisit(code, visit) {
	switch (visit.kind) {
		case "invalid": return Response.json({ error: "invalid_code" }, { status: 400 });
		case "missing": return Response.json({ error: "not_found" }, { status: 404 });
		case "redirect": return Response.json({
			code,
			title: visit.title,
			resolution: {
				status: "ok",
				role: visit.role,
				hop: visit.hop,
				shop: visit.shop,
				url: visit.url
			}
		});
		case "sold_out": return Response.json({
			code,
			title: visit.title,
			resolution: toPublicResolution(visit.resolution)
		});
		case "blocked": {
			const resolution = visit.resolution;
			if (resolution.status !== "ok") return Response.json({
				code,
				title: visit.title,
				resolution: toPublicResolution(resolution)
			});
			return Response.json({
				code,
				title: visit.title,
				resolution: {
					status: "ok",
					role: resolution.role,
					hop: resolution.hop,
					shop: resolution.offer.shop
				}
			});
		}
	}
}
var Route$2 = createFileRoute("/api/r/$code")({ server: { handlers: { GET: async ({ params, request }) => {
	const on = new URL(request.url).searchParams.get("on") ?? void 0;
	const { decideStoredVisit } = await import("./public-resolve.server-YPaSNP0x.mjs");
	const visit = await decideStoredVisit(params.code, { on: on || void 0 });
	return jsonForVisit(params.code, visit);
} } } });
var loadPublicBioPage = createServerFn({ method: "GET" }).validator((data) => typeof data === "string" ? data : "").handler(createSsrRpc("8b2109638ce26e0ed3400209227f4d7bf692cc8f769f1602a7419444b7c89ead"));
var $$splitComponentImporter = () => import("../_code-Cbfj6K10.mjs");
var $$splitNotFoundComponentImporter = () => import("../_code-CO35outV.mjs");
var Route$1 = createFileRoute("/p/$code/")({
	headers: () => ({ "cache-control": "no-store" }),
	loader: async ({ params }) => {
		const result = await loadPublicBioPage({ data: params.code });
		if (!result.found) throw notFound();
		return result;
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.title} · Achadinhos Shopee` }] : [{ title: "Página não encontrada · Linka" }] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/p/$code/photo")({ server: { handlers: { GET: async ({ params }) => {
	const code = params.code;
	if (!BIO_CODE_RE.test(code)) return new Response(null, {
		status: 404,
		headers: { "cache-control": "no-store" }
	});
	const { loadBioPhoto } = await import("./store.server-DcyWKeb7.mjs");
	const photo = await loadBioPhoto(code);
	if (!photo) return new Response(null, {
		status: 404,
		headers: { "cache-control": "no-store" }
	});
	return new Response(Buffer.from(photo.bytes), {
		status: 200,
		headers: {
			"content-type": photo.mime,
			"cache-control": "no-store"
		}
	});
} } } });
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var LoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$9
});
var PlanoRoute = Route$6.update({
	id: "/plano",
	path: "/plano",
	getParentRoute: () => Route$9
});
var ApiHealthRoute = Route$5.update({
	id: "/api/health",
	path: "/api/health",
	getParentRoute: () => Route$9
});
var RCodeRoute = Route$4.update({
	id: "/r/$code",
	path: "/r/$code",
	getParentRoute: () => Route$9
});
var ApiAuthSplatRoute = Route$3.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$9
});
var ApiRCodeRoute = Route$2.update({
	id: "/api/r/$code",
	path: "/api/r/$code",
	getParentRoute: () => Route$9
});
var PCodeIndexRoute = Route$1.update({
	id: "/p/$code/",
	path: "/p/$code/",
	getParentRoute: () => Route$9
});
var rootRouteChildren = {
	IndexRoute,
	LoginRoute,
	PlanoRoute,
	ApiHealthRoute,
	RCodeRoute,
	ApiAuthSplatRoute,
	ApiRCodeRoute,
	PCodePhotoRoute: Route.update({
		id: "/p/$code/photo",
		path: "/p/$code/photo",
		getParentRoute: () => Route$9
	}),
	PCodeIndexRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { createSsrRpc as a, previewPathPrefix as i, Route$1 as n, Route$4 as r, router_exports as t };
