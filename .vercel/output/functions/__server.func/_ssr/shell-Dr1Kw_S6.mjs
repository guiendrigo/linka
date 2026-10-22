import { S as require_jsx_runtime, _ as Button, g as AppShell, h as TopNav, y as Text } from "../_libs/@astryxdesign/core+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUserState, n as UserButton } from "./gates-CdeB3G3x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-Dr1Kw_S6.js
var import_jsx_runtime = require_jsx_runtime();
function AccountSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		className: "h-11 w-24 animate-pulse rounded-full bg-muted"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		href: "/login",
		variant: "secondary",
		label: "Entrar"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0 [&_span]:inline-block [&_span]:max-w-28 [&_span]:truncate sm:[&_span]:max-w-44",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
	});
}
function PublicShell({ children, account = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		height: "auto",
		contentPadding: 4,
		mobileNav: false,
		topNav: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, {
			label: "Linka",
			heading: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "rounded-full focus-visible:outline-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					weight: "semibold",
					children: "Linka"
				})
			}),
			endContent: account ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSlot, {}) : void 0
		}),
		children
	});
}
//#endregion
export { PublicShell as t };
