import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as RedirectToSignIn, s as useCurrentUserState } from "./gates-vBYncvM2.mjs";
import { a as ShopeePanel, n as ConsoleShell, o as WorkspacePending, s as useWorkspace, t as ConsolePending } from "./workspace-BADdwCVv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shopee-B6xheMZN.js
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
