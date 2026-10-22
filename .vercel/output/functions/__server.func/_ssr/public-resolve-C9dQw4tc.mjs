import { o as resolveSmartLink } from "./resolve-D_7ToDhA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-resolve-C9dQw4tc.js
var PUBLIC_CODE_RE = /^[a-z0-9-]{1,64}$/;
function parsePublicCode(data) {
	if (typeof data !== "string" || !PUBLIC_CODE_RE.test(data)) return null;
	return data;
}
async function loadPublicResolution(code, io) {
	try {
		await io.freshen(code);
	} catch {}
	const link = await io.findStored(code) ?? io.findDemo(code);
	if (!link) return { found: false };
	return {
		found: true,
		link,
		resolution: resolveSmartLink(link)
	};
}
//#endregion
export { parsePublicCode as n, loadPublicResolution as t };
