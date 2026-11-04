import { c as visitorStock, i as redirectTarget, o as resolveSmartLink } from "./resolve-D_7ToDhA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-resolve-DPQJgA-w.js
var PUBLIC_CODE_RE = /^[a-z0-9-]{1,64}$/;
function parsePublicCode(data) {
	if (typeof data !== "string" || !PUBLIC_CODE_RE.test(data)) return null;
	return data;
}
async function decidePublicVisit(code, opts, io) {
	const parsed = parsePublicCode(code);
	if (!parsed) return { kind: "invalid" };
	try {
		await io.freshen(parsed);
	} catch {}
	const link = await io.findStored(parsed) ?? io.findDemo(parsed);
	if (!link) return { kind: "missing" };
	const visitorLink = visitorStock(parsed, link, opts.on);
	const resolution = resolveSmartLink(visitorLink);
	const url = redirectTarget(resolution);
	if (url && resolution.status === "ok") return {
		kind: "redirect",
		url,
		title: visitorLink.title,
		role: resolution.role,
		hop: resolution.hop,
		shop: resolution.offer.shop
	};
	if (resolution.status !== "ok") return {
		kind: "sold_out",
		title: visitorLink.title,
		priceCents: visitorLink.priceCents,
		resolution
	};
	return {
		kind: "blocked",
		title: visitorLink.title,
		priceCents: visitorLink.priceCents,
		resolution
	};
}
//#endregion
export { parsePublicCode as n, decidePublicVisit as t };
