globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"10a-bDoxLFEmUvNvEqsuFlYpWuhuknE\"",
		"mtime": "2026-11-04T18:17:32.081Z",
		"size": 266,
		"path": "../public/favicon.svg"
	},
	"/og.jpg": {
		"type": "image/jpeg",
		"etag": "\"4447-4nojnbSWOAIdxySHZgMDyodpPuc\"",
		"mtime": "2026-11-04T18:17:32.082Z",
		"size": 17479,
		"path": "../public/og.jpg"
	},
	"/assets/_code-45M-FSn4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4fe-xUleQ8PQmm5WfT3kZWQkL+5OWyw\"",
		"mtime": "2026-11-04T18:17:31.897Z",
		"size": 1278,
		"path": "../public/assets/_code-45M-FSn4.js"
	},
	"/assets/_code-2mhFaVK4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f-eE5th4VJ8kOl2bO0bJDGS3733Qc\"",
		"mtime": "2026-11-04T18:17:31.897Z",
		"size": 591,
		"path": "../public/assets/_code-2mhFaVK4.js"
	},
	"/assets/_code-BCDBBk2B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fd-smN+aEL8x6v7xbYzaDJSoe5wsLk\"",
		"mtime": "2026-11-04T18:17:31.897Z",
		"size": 1789,
		"path": "../public/assets/_code-BCDBBk2B.js"
	},
	"/assets/_code-DIzE15Ms.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"232-a3MYZ9qLXcaJIbUDoDdxqa2po1A\"",
		"mtime": "2026-11-04T18:17:31.897Z",
		"size": 562,
		"path": "../public/assets/_code-DIzE15Ms.js"
	},
	"/assets/_code-xnZNjY2j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"288-t9t/ZfP/au0hcSPiPRXCeu+z4vY\"",
		"mtime": "2026-11-04T18:17:31.897Z",
		"size": 648,
		"path": "../public/assets/_code-xnZNjY2j.js"
	},
	"/assets/console-qCXdv5EY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b3d-F3kzFeU/ULWRKGgImdHgSF2Rtow\"",
		"mtime": "2026-11-04T18:17:31.897Z",
		"size": 11069,
		"path": "../public/assets/console-qCXdv5EY.js"
	},
	"/assets/createLucideIcon-DcJ_mmXp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5281-K6WS1aJztd8hlyUoji4mDK2kbtg\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 21121,
		"path": "../public/assets/createLucideIcon-DcJ_mmXp.js"
	},
	"/assets/createServerFn-D5m4cGPF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"987a-q2x4kBO2SArqoKd4Mr7JMdjrd7s\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 39034,
		"path": "../public/assets/createServerFn-D5m4cGPF.js"
	},
	"/assets/external-link-DLutmCLk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-GvqkoIA4uF1eYt6N49l5qSPT5r8\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 251,
		"path": "../public/assets/external-link-DLutmCLk.js"
	},
	"/assets/hop-now-6GAjc13I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16a-RXgo+nEOm6BNh2X1tnqD2eUDJEA\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 362,
		"path": "../public/assets/hop-now-6GAjc13I.js"
	},
	"/assets/login-BRFNLdw7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c28-F7F92iCfStqoq9XgPV+ExPSSR1w\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 3112,
		"path": "../public/assets/login-BRFNLdw7.js"
	},
	"/assets/plano-Z1uweVpd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37d1-NjkjlMclt9Kjy/B7WWHjOLWvv0s\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 14289,
		"path": "../public/assets/plano-Z1uweVpd.js"
	},
	"/assets/resolve-BMNWftYi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"429-JmoJHWyPnZ17orzLuDRtQOdvm7M\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 1065,
		"path": "../public/assets/resolve-BMNWftYi.js"
	},
	"/assets/index-BwbnSlVd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46c90-ip3oWx8OUFF4CuvS9pYntSkSuJg\"",
		"mtime": "2026-11-04T18:17:31.897Z",
		"size": 289936,
		"path": "../public/assets/index-BwbnSlVd.js"
	},
	"/assets/routes-CpLddKhO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77bd-sLj/HFIurJYEnCUAHfrKiglrl9E\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 30653,
		"path": "../public/assets/routes-CpLddKhO.js"
	},
	"/assets/shell-Fg5XoHg5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d41-a4I9eaAuq/3mj6XvfPHsO2GRfmc\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 32065,
		"path": "../public/assets/shell-Fg5XoHg5.js"
	},
	"/assets/styles-B3l6iot1.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"7bbd-84rnGMFiPo4mB0/h9+qh959daKo\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 31677,
		"path": "../public/assets/styles-B3l6iot1.css"
	},
	"/assets/ui-zsfT1-M_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8bbb-XUyu8ArdtxeXWInltSiH6Yqiqug\"",
		"mtime": "2026-11-04T18:17:31.898Z",
		"size": 35771,
		"path": "../public/assets/ui-zsfT1-M_.js"
	},
	"/assets/Purchases.es-COVuYC5o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f46a0-nex4yn5ST2+Vyu8rVKXl7LXyFQU\"",
		"mtime": "2026-11-04T18:17:31.897Z",
		"size": 1001120,
		"path": "../public/assets/Purchases.es-COVuYC5o.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_u_wgcX = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_u_wgcX
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
