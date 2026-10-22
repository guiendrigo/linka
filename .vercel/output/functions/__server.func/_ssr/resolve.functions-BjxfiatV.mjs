import { i as resolveSmartLink } from "./resolve-BPVOCpaa.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { n as findLink } from "./catalog-CFJ_kwzB.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resolve.functions-BjxfiatV.js
var resolveCode_createServerFn_handler = createServerRpc({
	id: "788efc79f993b15117f9c872ddcbda5cd3416d8baa7cabeb89bab2ef4a75b979",
	name: "resolveCode",
	filename: "src/lib/linka/resolve.functions.ts"
}, (opts) => resolveCode.__executeServer(opts));
var resolveCode = createServerFn({ method: "GET" }).validator((data) => {
	if (typeof data !== "string" || !/^[a-z0-9-]{1,64}$/.test(data)) throw new Error("Código inválido");
	return data;
}).handler(resolveCode_createServerFn_handler, async ({ data }) => {
	const { findStoredLink, freshenStoredStock } = await import("./store.server-1Lh1cOnB.mjs");
	try {
		await freshenStoredStock(data);
	} catch {}
	const link = await findStoredLink(data) ?? findLink(data);
	if (!link) return { found: false };
	return {
		found: true,
		link,
		resolution: resolveSmartLink(link)
	};
});
//#endregion
export { resolveCode_createServerFn_handler };
