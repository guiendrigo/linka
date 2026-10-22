import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUserState, t as RedirectToSignIn } from "./gates-DWE7aa1w.mjs";
import { n as ConsoleShell, t as ConsolePending } from "./console-B5XuQQFf.mjs";
import { a as useWorkspace, i as WorkspacePending, r as ShopeePanel } from "./workspace-C9GmfapI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shopee-CLn-9G7l.js
var import_jsx_runtime = require_jsx_runtime();
function ShopeePage() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePending, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopeeHome, {});
}
function ShopeeHome() {
	const { data, error, setData } = useWorkspace();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsoleShell, {
		current: "shopee",
		title: "Shopee",
		subtitle: "App ID e segredo para conferir estoque. O segredo fica no servidor e não volta para esta tela.",
		children: !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePending, { error }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopeePanel, {
			shopee: data.shopee,
			onChange: (shopee) => setData({
				...data,
				shopee
			})
		})
	});
}
//#endregion
export { ShopeePage as component };
