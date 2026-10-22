import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bio.functions-Du5akVpo.js
var loadPublicBioPage_createServerFn_handler = createServerRpc({
	id: "8b2109638ce26e0ed3400209227f4d7bf692cc8f769f1602a7419444b7c89ead",
	name: "loadPublicBioPage",
	filename: "src/lib/linka/bio.functions.ts"
}, (opts) => loadPublicBioPage.__executeServer(opts));
var loadPublicBioPage = createServerFn({ method: "GET" }).validator((data) => typeof data === "string" ? data : "").handler(loadPublicBioPage_createServerFn_handler, async ({ data }) => {
	const { loadPublicBio } = await import("./store.server-1Lh1cOnB.mjs");
	return loadPublicBio(data);
});
//#endregion
export { loadPublicBioPage_createServerFn_handler };
