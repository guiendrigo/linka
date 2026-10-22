import { a as offerQueryPayload, i as looksLikeAuthFailure, n as authorizationHeader, r as interpretOfferResponse, t as SHOPEE_GRAPHQL } from "./store.server-1Lh1cOnB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shopee.server-CVjnjwUR.js
async function lookupOffer(appId, secret, shopId, itemId) {
	const payload = offerQueryPayload(shopId, itemId);
	const timestamp = Math.floor(Date.now() / 1e3);
	const authorization = await authorizationHeader(appId, secret, payload, timestamp);
	try {
		const response = await fetch(SHOPEE_GRAPHQL, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization
			},
			body: payload,
			signal: AbortSignal.timeout(4e3)
		});
		const text = await response.text();
		if (response.status === 401 || response.status === 403 || looksLikeAuthFailure(text)) return { kind: "auth" };
		let json;
		try {
			json = JSON.parse(text);
		} catch {
			return { kind: "down" };
		}
		if (!response.ok) return looksLikeAuthFailure(json) ? { kind: "auth" } : { kind: "down" };
		const read = interpretOfferResponse(json, itemId);
		if (read === "error") return looksLikeAuthFailure(json) ? { kind: "auth" } : { kind: "down" };
		return { kind: read };
	} catch {
		return { kind: "down" };
	}
}
//#endregion
export { lookupOffer };
