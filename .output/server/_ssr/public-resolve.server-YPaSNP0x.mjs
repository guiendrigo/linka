import { n as findLink } from "./resolve-D_7ToDhA.mjs";
import { t as decidePublicVisit } from "./public-resolve-DPQJgA-w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-resolve.server-YPaSNP0x.js
async function decideStoredVisit(code, opts = {}) {
	const { findStoredLink, recordLastVisit } = await import("./store.server-DcyWKeb7.mjs");
	const { freshenForCode } = await import("./stock-freshen.server-CKuXrzDj.mjs");
	const visit = await decidePublicVisit(code, opts, {
		freshen: freshenForCode,
		findStored: findStoredLink,
		findDemo: findLink
	});
	try {
		await recordLastVisit(code, visit);
	} catch {}
	return visit;
}
//#endregion
export { decideStoredVisit };
