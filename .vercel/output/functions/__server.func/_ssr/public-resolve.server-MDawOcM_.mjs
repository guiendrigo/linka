import { n as findLink } from "./resolve-D_7ToDhA.mjs";
import { t as loadPublicResolution } from "./public-resolve-C9dQw4tc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-resolve.server-MDawOcM_.js
async function loadStoredResolution(code) {
	const { findStoredLink, freshenStoredStock } = await import("./store.server-NGtl9xxO.mjs");
	return loadPublicResolution(code, {
		freshen: freshenStoredStock,
		findStored: findStoredLink,
		findDemo: findLink
	});
}
//#endregion
export { loadStoredResolution };
