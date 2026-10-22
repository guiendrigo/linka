import { r as createServerFn } from "./ssr.mjs";
import { n as parsePublicCode } from "./public-resolve-C9dQw4tc.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resolve.functions-DQYZeEtv.js
var resolveCode_createServerFn_handler = createServerRpc({
	id: "788efc79f993b15117f9c872ddcbda5cd3416d8baa7cabeb89bab2ef4a75b979",
	name: "resolveCode",
	filename: "src/lib/linka/resolve.functions.ts"
}, (opts) => resolveCode.__executeServer(opts));
var resolveCode = createServerFn({ method: "GET" }).validator((data) => {
	const code = parsePublicCode(data);
	if (!code) throw new Error("Código inválido");
	return code;
}).handler(resolveCode_createServerFn_handler, async ({ data }) => {
	const { loadStoredResolution } = await import("./public-resolve.server-MDawOcM_.mjs");
	return loadStoredResolution(data);
});
//#endregion
export { resolveCode_createServerFn_handler };
