import { o as __toESM } from "../_runtime.mjs";
import { c as visitorStock, i as redirectTarget, o as resolveSmartLink } from "./resolve-D_7ToDhA.mjs";
import { t as __exportAll } from "./rolldown-runtime-8H4AJuhK.mjs";
import { C as require_react, S as require_jsx_runtime, b as Theme } from "../_libs/@astryxdesign/core+[...].mjs";
import { S as useRouter, X as notFound, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, q as redirect, v as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { t as auth } from "./server-BOSZI47M.mjs";
import { n as parsePublicCode } from "./public-resolve-C9dQw4tc.mjs";
import { t as BIO_CODE_RE } from "./bio-DfR42D11.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as neutralTheme } from "../_libs/@astryxdesign/theme-neutral+[...].mjs";
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
//#region node_modules/.nitro/vite/services/ssr/assets/router-CKwuZXMT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* linka theme — built by `npx astryx theme build`
* Import the CSS file alongside this module:
*
*   import { linkaTheme } from './linka';
*   import './linka.css';
*/
var linkaTheme = {
	name: "linka",
	__built: true,
	tokens: {
		"--font-size-4xs": "0.375rem",
		"--font-size-3xs": "0.4375rem",
		"--font-size-2xs": "0.5rem",
		"--font-size-xs": "0.625rem",
		"--font-size-sm": "0.75rem",
		"--font-size-base": "0.875rem",
		"--font-size-lg": "1.0625rem",
		"--font-size-xl": "1.25rem",
		"--font-size-2xl": "1.5rem",
		"--font-size-3xl": "1.8125rem",
		"--font-size-4xl": "2.1875rem",
		"--font-size-5xl": "2.625rem",
		"--text-heading-1-size": "var(--font-size-2xl)",
		"--text-heading-1-weight": "var(--font-weight-semibold)",
		"--text-heading-1-leading": "1.3333",
		"--text-heading-2-size": "var(--font-size-xl)",
		"--text-heading-2-weight": "var(--font-weight-semibold)",
		"--text-heading-2-leading": "1.4",
		"--text-heading-3-size": "var(--font-size-lg)",
		"--text-heading-3-weight": "var(--font-weight-bold)",
		"--text-heading-3-leading": "1.4118",
		"--text-heading-4-size": "var(--font-size-base)",
		"--text-heading-4-weight": "var(--font-weight-bold)",
		"--text-heading-4-leading": "1.4286",
		"--text-heading-5-size": "var(--font-size-sm)",
		"--text-heading-5-weight": "var(--font-weight-semibold)",
		"--text-heading-5-leading": "1.6667",
		"--text-heading-6-size": "var(--font-size-xs)",
		"--text-heading-6-weight": "var(--font-weight-semibold)",
		"--text-heading-6-leading": "1.6",
		"--text-body-size": "var(--font-size-base)",
		"--text-body-weight": "var(--font-weight-normal)",
		"--text-body-leading": "1.4286",
		"--text-large-size": "var(--font-size-lg)",
		"--text-large-weight": "var(--font-weight-semibold)",
		"--text-large-leading": "1.4118",
		"--text-label-size": "var(--font-size-base)",
		"--text-label-weight": "var(--font-weight-medium)",
		"--text-label-leading": "1.4286",
		"--text-code-size": "var(--font-size-base)",
		"--text-code-weight": "var(--font-weight-normal)",
		"--text-code-leading": "1.4286",
		"--text-supporting-size": "var(--font-size-sm)",
		"--text-supporting-weight": "var(--font-weight-normal)",
		"--text-supporting-leading": "1.6667",
		"--text-display-1-size": "var(--font-size-5xl)",
		"--text-display-1-weight": "var(--font-weight-normal)",
		"--text-display-1-leading": "1.2381",
		"--text-display-2-size": "var(--font-size-4xl)",
		"--text-display-2-weight": "var(--font-weight-normal)",
		"--text-display-2-leading": "1.2571",
		"--text-display-3-size": "var(--font-size-3xl)",
		"--text-display-3-weight": "var(--font-weight-normal)",
		"--text-display-3-leading": "1.3793",
		"--duration-fast-min": "95ms",
		"--duration-fast": "125ms",
		"--duration-fast-max": "165ms",
		"--duration-medium-min": "225ms",
		"--duration-medium": "300ms",
		"--duration-medium-max": "400ms",
		"--duration-slow-min": "525ms",
		"--duration-slow": "700ms",
		"--duration-slow-max": "935ms",
		"--font-family-body": "Figtree, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
		"--font-family-heading": "Figtree, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
		"--font-family-code": "ui-monospace, \"SF Mono\", Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
		"--color-syntax-keyword": "light-dark(#6b187c, #efa8ff)",
		"--color-syntax-string": "light-dark(#0b5615, #a4d6a3)",
		"--color-syntax-comment": "light-dark(#6a6a6a, #9e9e9e)",
		"--color-syntax-number": "light-dark(#733100, #ffb37e)",
		"--color-syntax-function": "light-dark(#00458c, #a1caff)",
		"--color-syntax-type": "light-dark(#6b187c, #efa8ff)",
		"--color-syntax-variable": "light-dark(#111111, #e2e2e2)",
		"--color-syntax-operator": "light-dark(#6a6a6a, #9e9e9e)",
		"--color-syntax-constant": "light-dark(#733100, #ffb37e)",
		"--color-syntax-tag": "light-dark(#8a0011, #ffaea7)",
		"--color-syntax-attribute": "light-dark(#584400, #eec448)",
		"--color-syntax-property": "light-dark(#005348, #90d7c8)",
		"--color-syntax-punctuation": "light-dark(#6a6a6a, #9e9e9e)",
		"--color-syntax-background": "light-dark(#ffffff, #111111)",
		"--color-syntax-added": "color-mix(in srgb, var(--color-success-muted) 25%, transparent)",
		"--color-syntax-removed": "color-mix(in srgb, var(--color-error-muted) 25%, transparent)",
		"--color-syntax-diff-header": "transparent",
		"--color-syntax-added-marker": "var(--color-syntax-punctuation)",
		"--color-syntax-removed-marker": "var(--color-syntax-punctuation)",
		"--color-background-surface": "light-dark(#ffffff, #262626)",
		"--color-background-body": "light-dark(#f1f1f1, #1b1b1b)",
		"--color-background-card": "light-dark(#ffffff, #1b1b1b)",
		"--color-background-popover": "light-dark(#ffffff, #1b1b1b)",
		"--color-background-muted": "light-dark(#f1f1f1, #1b1b1b)",
		"--color-accent": "light-dark(#ff5c39, #ff5c39)",
		"--color-accent-muted": "light-dark(#ffe4dc, #503424)",
		"--color-neutral": "light-dark(#0000000F, #ffffff1A)",
		"--color-overlay": "light-dark(#00000080, #000000CC)",
		"--color-overlay-hover": "light-dark(#0000000D, #ffffff0D)",
		"--color-overlay-pressed": "light-dark(#0000001A, #ffffff1A)",
		"--color-text-primary": "light-dark(#000000, #ffffff)",
		"--color-text-secondary": "light-dark(#474747, #9e9e9e)",
		"--color-text-disabled": "light-dark(#919191, #525252)",
		"--color-text-accent": "light-dark(#c43a1f, #ffb37e)",
		"--color-on-dark": "#ffffff",
		"--color-on-light": "#111111",
		"--color-on-accent": "light-dark(#2a100b, #2a100b)",
		"--color-on-success": "light-dark(#ffffff, #111111)",
		"--color-on-error": "light-dark(#ffffff, #111111)",
		"--color-on-warning": "#111111",
		"--color-icon-accent": "light-dark(#c43a1f, #ff9e55)",
		"--color-icon-primary": "light-dark(#000000, #ffffff)",
		"--color-icon-secondary": "light-dark(#6a6a6a, #9e9e9e)",
		"--color-icon-disabled": "light-dark(#919191, #525252)",
		"--color-success": "light-dark(#00490b, #a4d6a3)",
		"--color-error": "light-dark(#76000c, #ffc4be)",
		"--color-warning": "light-dark(#4b3900, #f8d36a)",
		"--color-success-muted": "light-dark(#bce0bb, #90ca903D)",
		"--color-error-muted": "light-dark(#ffc4be, #ff98903D)",
		"--color-warning-muted": "light-dark(#fae19e, #e2b6233D)",
		"--color-border": "light-dark(#00000014, #ffffff1A)",
		"--color-border-emphasized": "light-dark(#d4d4d4, #525252)",
		"--color-skeleton": "light-dark(#f1f1f1, #525252)",
		"--color-shadow": "light-dark(#0000001A, #0000004D)",
		"--color-tint-hover": "light-dark(black, white)",
		"--color-background-red": "light-dark(#ffc4be, #5b2b28)",
		"--color-border-red": "light-dark(#ffaea7, #fa6762)",
		"--color-icon-red": "light-dark(#76000c, #ff9890)",
		"--color-text-red": "light-dark(#76000c, #ffaea7)",
		"--color-background-orange": "light-dark(#ffc7a1, #503424)",
		"--color-border-orange": "light-dark(#ffc7a1, #df843f)",
		"--color-icon-orange": "light-dark(#622700, #ff9e55)",
		"--color-text-orange": "light-dark(#622700, #ffb37e)",
		"--color-background-yellow": "light-dark(#fae19e, #453a1c)",
		"--color-border-yellow": "light-dark(#e3c36c, #c29900)",
		"--color-icon-yellow": "light-dark(#4b3900, #e2b623)",
		"--color-text-yellow": "light-dark(#4b3900, #eec448)",
		"--color-background-green": "light-dark(#bce0bb, #2b422b)",
		"--color-border-green": "light-dark(#aad4a9, #6ab26b)",
		"--color-icon-green": "light-dark(#00490b, #90ca90)",
		"--color-text-green": "light-dark(#00490b, #90ca90)",
		"--color-background-teal": "light-dark(#a9e2d6, #28413c)",
		"--color-border-teal": "light-dark(#90d7c8, #4fb1a0)",
		"--color-icon-teal": "light-dark(#00463d, #81c9bb)",
		"--color-text-teal": "light-dark(#00463d, #90d7c8)",
		"--color-background-cyan": "light-dark(#9ae2f4, #274046)",
		"--color-border-cyan": "light-dark(#85d5e9, #49adc4)",
		"--color-icon-cyan": "light-dark(#004351, #71c7dd)",
		"--color-text-cyan": "light-dark(#004351, #85d5e9)",
		"--color-background-blue": "light-dark(#b9d7ff, #253c5a)",
		"--color-border-blue": "light-dark(#a1caff, #5aa0f8)",
		"--color-icon-blue": "light-dark(#003978, #88bcff)",
		"--color-text-blue": "light-dark(#003978, #a1caff)",
		"--color-background-purple": "light-dark(#f7d5ff, #4a2f51)",
		"--color-border-purple": "light-dark(#f3bfff, #d885eb)",
		"--color-icon-purple": "light-dark(#5c0e6c, #e496f6)",
		"--color-text-purple": "light-dark(#5c0e6c, #eaacf8)",
		"--color-background-pink": "light-dark(#ffc0d7, #572b3d)",
		"--color-border-pink": "light-dark(#ffc0d7, #fc78b1)",
		"--color-icon-pink": "light-dark(#70003f, #fd92bd)",
		"--color-text-pink": "light-dark(#70003f, #ffa9ca)",
		"--color-background-gray": "light-dark(#e2e2e2, #303030)",
		"--color-border-gray": "light-dark(#d4d4d4, #262626)",
		"--color-icon-gray": "light-dark(#474747, #9e9e9e)",
		"--color-text-gray": "light-dark(#1b1b1b, #d4d4d4)",
		"--radius-none": "0px",
		"--radius-inner": "0.375rem",
		"--radius-element": "0.625rem",
		"--radius-container": "0.75rem",
		"--radius-page": "1.75rem",
		"--radius-full": "9999px",
		"--shadow-low": "0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 25%)), 0 4px 8px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 40%)), inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 8%))",
		"--shadow-med": "0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 35%)), 0 4px 12px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 12%))",
		"--shadow-high": "0 4px 6px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), 0 12px 24px light-dark(oklch(0 0 0 / 15%), oklch(0 0 0 / 70%)), inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 15%))",
		"--shadow-inset-hover": "inset 0px 0px 0px 2px #0074e24D",
		"--shadow-inset-selected": "inset 0px 0px 0px 2px #0074e280",
		"--shadow-inset-success": "inset 0px 0px 0px 2px #2f7d334D",
		"--shadow-inset-warning": "inset 0px 0px 0px 2px #f8d36a4D",
		"--shadow-inset-error": "inset 0px 0px 0px 2px #de47454D"
	},
	localTokens: {
		"--astryx-theme-neutral-color-status-fill-accent": "light-dark(#0074e2, #6d9cfe)",
		"--astryx-theme-neutral-color-status-fill-success": "light-dark(#198100, #64af4c)",
		"--astryx-theme-neutral-color-status-fill-warning": "#ffce2f",
		"--astryx-theme-neutral-color-status-fill-error": "light-dark(#c9303a, #ff705d)",
		"--astryx-theme-neutral-color-status-muted-accent": "light-dark(#b9d7ff, #88bcff3D)",
		"--astryx-theme-neutral-color-on-tint-neutral": "light-dark(#fafafa4D, #0a0a0a4D)",
		"--astryx-theme-neutral-color-on-tint-overlay-hover": "light-dark(#fafafa1A, #0a0a0a1A)",
		"--astryx-theme-neutral-color-on-tint-overlay-pressed": "light-dark(#fafafa33, #0a0a0a33)",
		"--astryx-theme-neutral-color-destructive-overlay-hover": "light-dark(#ff7f770D, #ee736c0D)",
		"--astryx-theme-neutral-color-destructive-overlay-pressed": "light-dark(#ff7f771A, #ee736c1A)"
	},
	__localTokenOwners: {
		"--astryx-theme-neutral-color-status-fill-accent": "neutral",
		"--astryx-theme-neutral-color-status-fill-success": "neutral",
		"--astryx-theme-neutral-color-status-fill-warning": "neutral",
		"--astryx-theme-neutral-color-status-fill-error": "neutral",
		"--astryx-theme-neutral-color-status-muted-accent": "neutral",
		"--astryx-theme-neutral-color-on-tint-neutral": "neutral",
		"--astryx-theme-neutral-color-on-tint-overlay-hover": "neutral",
		"--astryx-theme-neutral-color-on-tint-overlay-pressed": "neutral",
		"--astryx-theme-neutral-color-destructive-overlay-hover": "neutral",
		"--astryx-theme-neutral-color-destructive-overlay-pressed": "neutral"
	},
	__localTokenLineage: ["neutral", "linka"],
	components: {
		"heading": {
			"level:1": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-1-size)",
				"fontWeight": "var(--text-heading-1-weight)",
				"lineHeight": "var(--text-heading-1-leading)"
			},
			"level:2": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-2-size)",
				"fontWeight": "var(--text-heading-2-weight)",
				"lineHeight": "var(--text-heading-2-leading)"
			},
			"level:3": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-3-size)",
				"fontWeight": "var(--text-heading-3-weight)",
				"lineHeight": "var(--text-heading-3-leading)"
			},
			"level:4": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-4-size)",
				"fontWeight": "var(--text-heading-4-weight)",
				"lineHeight": "var(--text-heading-4-leading)"
			},
			"level:5": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-5-size)",
				"fontWeight": "var(--text-heading-5-weight)",
				"lineHeight": "var(--text-heading-5-leading)"
			},
			"level:6": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-6-size)",
				"fontWeight": "var(--text-heading-6-weight)",
				"lineHeight": "var(--text-heading-6-leading)"
			},
			"type:display-1": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-1-size)",
				"lineHeight": "var(--text-display-1-leading)"
			},
			"type:display-2": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-2-size)",
				"lineHeight": "var(--text-display-2-leading)"
			},
			"type:display-3": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-3-size)",
				"lineHeight": "var(--text-display-3-leading)"
			}
		},
		"text": {
			"type:body": {
				"fontFamily": "var(--font-family-body)",
				"fontSize": "var(--text-body-size)",
				"lineHeight": "var(--text-body-leading)"
			},
			"type:large": {
				"fontFamily": "var(--font-family-body)",
				"fontSize": "var(--text-large-size)",
				"lineHeight": "var(--text-large-leading)"
			},
			"type:label": {
				"fontFamily": "var(--font-family-body)",
				"fontSize": "var(--text-label-size)",
				"lineHeight": "var(--text-label-leading)"
			},
			"type:code": {
				"fontFamily": "var(--font-family-code)",
				"fontSize": "var(--text-code-size)",
				"lineHeight": "var(--text-code-leading)"
			},
			"type:supporting": {
				"fontFamily": "var(--font-family-body)",
				"fontSize": "var(--text-supporting-size)",
				"lineHeight": "var(--text-supporting-leading)"
			},
			"type:display-1": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-1-size)",
				"lineHeight": "var(--text-display-1-leading)"
			},
			"type:display-2": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-2-size)",
				"lineHeight": "var(--text-display-2-leading)"
			},
			"type:display-3": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-3-size)",
				"lineHeight": "var(--text-display-3-leading)"
			}
		},
		"button": { "variant:destructive": {
			"backgroundColor": "var(--color-error-muted)",
			"color": "var(--color-error)",
			"--color-overlay-hover": "var(--astryx-theme-neutral-color-destructive-overlay-hover)",
			"--color-overlay-pressed": "var(--astryx-theme-neutral-color-destructive-overlay-pressed)"
		} },
		"badge": {
			"variant:info": {
				"backgroundColor": "var(--astryx-theme-neutral-color-status-fill-accent)",
				"color": "var(--color-on-accent)"
			},
			"variant:neutral": {
				"backgroundColor": "var(--color-background-gray)",
				"color": "var(--color-text-gray)"
			},
			"variant:success": {
				"backgroundColor": "var(--astryx-theme-neutral-color-status-fill-success)",
				"color": "var(--color-on-success)"
			},
			"variant:warning": {
				"backgroundColor": "var(--astryx-theme-neutral-color-status-fill-warning)",
				"color": "var(--color-on-warning)"
			},
			"variant:error": {
				"backgroundColor": "var(--astryx-theme-neutral-color-status-fill-error)",
				"color": "var(--color-on-error)"
			},
			"variant:red": {
				"backgroundColor": "var(--color-background-red)",
				"color": "var(--color-text-red)"
			},
			"variant:orange": {
				"backgroundColor": "var(--color-background-orange)",
				"color": "var(--color-text-orange)"
			},
			"variant:yellow": {
				"backgroundColor": "var(--color-background-yellow)",
				"color": "var(--color-text-yellow)"
			},
			"variant:green": {
				"backgroundColor": "var(--color-background-green)",
				"color": "var(--color-text-green)"
			},
			"variant:teal": {
				"backgroundColor": "var(--color-background-teal)",
				"color": "var(--color-text-teal)"
			},
			"variant:cyan": {
				"backgroundColor": "var(--color-background-cyan)",
				"color": "var(--color-text-cyan)"
			},
			"variant:blue": {
				"backgroundColor": "var(--color-background-blue)",
				"color": "var(--color-text-blue)"
			},
			"variant:purple": {
				"backgroundColor": "var(--color-background-purple)",
				"color": "var(--color-text-purple)"
			},
			"variant:pink": {
				"backgroundColor": "var(--color-background-pink)",
				"color": "var(--color-text-pink)"
			},
			"variant:gray": {
				"backgroundColor": "var(--color-background-gray)",
				"color": "var(--color-text-gray)"
			}
		},
		"status-dot": {
			"variant:success": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-success)" },
			"variant:warning": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-warning)" },
			"variant:error": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-error)" },
			"variant:accent": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-accent)" }
		},
		"avatar-status-dot": {
			"variant:success": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-success)" },
			"variant:error": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-error)" }
		},
		"segmented-control": { "base": { "padding": "var(--spacing-1)" } },
		"segmented-control-item": {
			"size:sm": { "height": "calc(var(--size-element-sm) - 8px)" },
			"size:md": { "height": "calc(var(--size-element-md) - 8px)" },
			"size:lg": { "height": "calc(var(--size-element-lg) - 8px)" },
			"selected": { "boxShadow": "none" }
		},
		"banner": {
			"base": {
				"--color-neutral": "var(--astryx-theme-neutral-color-on-tint-neutral)",
				"--color-overlay-hover": "var(--astryx-theme-neutral-color-on-tint-overlay-hover)",
				"--color-overlay-pressed": "var(--astryx-theme-neutral-color-on-tint-overlay-pressed)"
			},
			"status:info": {
				"--color-accent-muted": "var(--astryx-theme-neutral-color-status-muted-accent)",
				"--color-text-primary": "var(--color-text-blue)",
				"--color-text-secondary": "var(--color-text-blue)",
				"--color-accent": "var(--color-text-blue)"
			},
			"status:success": {
				"--color-text-primary": "var(--color-text-green)",
				"--color-text-secondary": "var(--color-text-green)",
				"--color-success": "var(--color-text-green)"
			},
			"status:warning": {
				"--color-text-primary": "var(--color-text-yellow)",
				"--color-text-secondary": "var(--color-text-yellow)",
				"--color-warning": "var(--color-text-yellow)"
			},
			"status:error": {
				"--color-text-primary": "var(--color-text-red)",
				"--color-text-secondary": "var(--color-text-red)",
				"--color-error": "var(--color-text-red)"
			}
		},
		"step-indicator": {
			"status:accent": { "--color-accent": "var(--astryx-theme-neutral-color-status-fill-accent)" },
			"status:success": { "--color-success": "var(--astryx-theme-neutral-color-status-fill-success)" },
			"status:warning": { "--color-warning": "var(--astryx-theme-neutral-color-status-fill-warning)" },
			"status:error": { "--color-error": "var(--astryx-theme-neutral-color-status-fill-error)" }
		},
		"switch": { "base": { "--color-background-gray": "var(--color-border-emphasized)" } },
		"progress-bar": {
			"base": { "--color-background-muted": "var(--color-border-emphasized)" },
			"variant:accent": { "--color-accent": "var(--astryx-theme-neutral-color-status-fill-accent)" },
			"variant:success": { "--color-success": "var(--astryx-theme-neutral-color-status-fill-success)" },
			"variant:warning": { "--color-warning": "var(--astryx-theme-neutral-color-status-fill-warning)" },
			"variant:error": { "--color-error": "var(--astryx-theme-neutral-color-status-fill-error)" }
		},
		"card": { "base": { "padding": "var(--spacing-3)" } },
		"section": { "base": { "padding": "var(--spacing-3)" } }
	},
	__onDark: { "tokens": {
		"color-scheme": "dark",
		"--color-text-primary": "var(--color-on-dark)",
		"--color-icon-primary": "var(--color-on-dark)",
		"--color-accent": "var(--color-on-dark)"
	} },
	__onLight: { "tokens": {
		"color-scheme": "light",
		"--color-text-primary": "var(--color-on-light)",
		"--color-icon-primary": "var(--color-on-light)",
		"--color-accent": "var(--color-on-light)"
	} },
	__adaptations: {
		"widthBreakpoints": {
			"sm": 640,
			"md": 768,
			"lg": 1024,
			"xl": 1280,
			"2xl": 1536
		},
		"rules": [{
			"when": {
				"pointer": "coarse",
				"width": { "below": "lg" }
			},
			"value": { "typography": { "scale": {
				"base": 16,
				"ratio": 1.1736
			} } }
		}]
	},
	__axes: {
		"typography": {
			"scale": {
				"base": 14,
				"ratio": 1.2
			},
			"body": {
				"family": "Figtree",
				"fallbacks": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
			},
			"heading": {
				"family": "Figtree",
				"fallbacks": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
				"weights": {
					"3": "bold",
					"4": "bold"
				}
			},
			"code": {
				"family": "ui-monospace",
				"fallbacks": "\"SF Mono\", Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
			}
		},
		"motion": {
			"fast": 125,
			"medium": 300,
			"slow": 700,
			"ratio": .75
		}
	},
	icons: neutralTheme["icons"]
};
/**
* @generated by `astryx theme` — do not edit manually.
* @astryx-theme-record {"themes":{"neutral":"@astryxdesign/theme-neutral","linka":"./src/themes"},"defaultThemeSlug":"linka"}
*/
var themes = {
	"neutral": neutralTheme,
	"linka": linkaTheme
};
var defaultThemeSlug = "linka";
var styles_default = "/assets/styles-CiaCn3B7.css";
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
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theme, {
				theme: themes[defaultThemeSlug],
				mode: "light",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-COW0d1Ol.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./login-BicQyEnC.mjs");
var Route$7 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Entrar · Linka" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./plano-DzfRSTRp.mjs");
var Route$6 = createFileRoute("/plano")({
	head: () => ({ meta: [{ title: "Plano · Linka" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$5 = createFileRoute("/api/health")({ server: { handlers: { GET: async () => {
	const { probeSql } = await import("./health-jA-gu2yk.mjs");
	const { getSql } = await import("./db-CwYwUBOx.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql().catch(() => null);
	const result = sql ? await probeSql(sql) : {
		ok: false,
		service: "linka"
	};
	return Response.json(result, { status: result.ok ? 200 : 503 });
} } } });
var resolveCode = createServerFn({ method: "GET" }).validator((data) => {
	const code = parsePublicCode(data);
	if (!code) throw new Error("Código inválido");
	return code;
}).handler(createSsrRpc("788efc79f993b15117f9c872ddcbda5cd3416d8baa7cabeb89bab2ef4a75b979"));
var $$splitComponentImporter$1 = () => import("../_code-BO6VthAr.mjs");
var $$splitNotFoundComponentImporter$1 = () => import("../_code-DSPZ90fV.mjs");
var Route$4 = createFileRoute("/r/$code")({
	validateSearch: (search) => ({ on: typeof search.on === "string" ? search.on : void 0 }),
	loaderDeps: ({ search }) => ({ on: search.on }),
	loader: async ({ params, deps }) => {
		const result = await resolveCode({ data: params.code });
		if (!result.found) throw notFound();
		const link = visitorStock(params.code, result.link, deps.on);
		const resolution = resolveSmartLink(link);
		const target = redirectTarget(resolution);
		if (target) throw redirect({
			href: target,
			statusCode: 302,
			headers: { "cache-control": "no-store" }
		});
		return {
			link,
			resolution
		};
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.link.title} · Linka` }] : [{ title: "Link não encontrado · Linka" }] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$3 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
function toPublic(resolution) {
	if (resolution.status !== "ok") return { status: resolution.status };
	return {
		status: resolution.status,
		role: resolution.role,
		hop: resolution.hop,
		shop: resolution.offer.shop,
		url: resolution.offer.url
	};
}
var Route$2 = createFileRoute("/api/r/$code")({ server: { handlers: { GET: async ({ params }) => {
	const code = parsePublicCode(params.code);
	if (!code) return Response.json({ error: "invalid_code" }, { status: 400 });
	const { loadStoredResolution } = await import("./public-resolve.server-MDawOcM_.mjs");
	const result = await loadStoredResolution(code);
	if (!result.found) return Response.json({ error: "not_found" }, { status: 404 });
	return Response.json({
		code: result.link.code,
		title: result.link.title,
		resolution: toPublic(result.resolution)
	});
} } } });
var loadPublicBioPage = createServerFn({ method: "GET" }).validator((data) => typeof data === "string" ? data : "").handler(createSsrRpc("8b2109638ce26e0ed3400209227f4d7bf692cc8f769f1602a7419444b7c89ead"));
var $$splitComponentImporter = () => import("../_code-Dq9FN3go.mjs");
var $$splitNotFoundComponentImporter = () => import("../_code-DEVGeM6m.mjs");
var Route$1 = createFileRoute("/p/$code/")({
	headers: () => ({ "cache-control": "no-store" }),
	loader: async ({ params }) => {
		const result = await loadPublicBioPage({ data: params.code });
		if (!result.found) throw notFound();
		return result;
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.title} · Linka` }] : [{ title: "Link não encontrado · Linka" }] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/p/$code/photo")({ server: { handlers: { GET: async ({ params }) => {
	const code = params.code;
	if (!BIO_CODE_RE.test(code)) return new Response(null, {
		status: 404,
		headers: { "cache-control": "no-store" }
	});
	const { loadBioPhoto } = await import("./store.server-NGtl9xxO.mjs");
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
