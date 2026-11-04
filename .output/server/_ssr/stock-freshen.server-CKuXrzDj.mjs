import { r as getSql } from "./db-sKYhmciq.mjs";
import { a as interpretOfferResponse, c as offerQueryPayload, i as authorizationHeader, l as parseShopeeItem, loadWorkspace, n as SHOPEE_GRAPHQL, o as looksLikeAuthFailure, r as STOCK_FRESH_MS, s as looksLikeRateLimit, t as resolveAffiliateCredential } from "./store.server-DcyWKeb7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock-freshen.server-CKuXrzDj.js
function classifyFailure(body) {
	if (looksLikeRateLimit(body)) return "rate_limited";
	if (looksLikeAuthFailure(body)) return "auth";
	return "down";
}
async function affiliateCatalog(cred, shopId, itemId) {
	const payload = offerQueryPayload(shopId, itemId);
	const timestamp = Math.floor(Date.now() / 1e3);
	const authorization = await authorizationHeader(cred.appId, cred.secret, payload, timestamp);
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
		if (looksLikeRateLimit(text)) return { kind: "rate_limited" };
		if (response.status === 401 || response.status === 403 || looksLikeAuthFailure(text)) return { kind: "auth" };
		let json;
		try {
			json = JSON.parse(text);
		} catch {
			return { kind: "down" };
		}
		if (!response.ok) return { kind: classifyFailure(json) };
		const read = interpretOfferResponse(json, itemId);
		if (read === "error") return { kind: classifyFailure(json) };
		return { kind: read };
	} catch {
		return { kind: "down" };
	}
}
var LOOKUP_CAP = 8;
function asBool(value) {
	return value === true || value === "t" || value === "true" || value === 1;
}
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	if (typeof value === "string" && value.trim()) return value;
	return null;
}
function isFresh(value, now) {
	const iso = asIso(value);
	if (!iso) return false;
	const then = Date.parse(iso);
	return Number.isFinite(then) && now - then < 9e5;
}
async function applyOfferStock(sql, userId, offers, inStock, checkedAt) {
	let changed = 0;
	for (const offer of offers) {
		if (offer.inStock !== inStock) changed += 1;
		await sql`
      update offers set in_stock = ${inStock ? 1 : 0}, checked_at = ${checkedAt}
      where id = ${offer.id} and user_id = ${userId}
    `;
	}
	return changed;
}
async function decideStock(userId, options) {
	const sql = await getSql();
	const force = options?.force === true;
	const productId = options?.productId;
	const offers = (productId ? await sql`
        select id, url, in_stock, checked_at from offers
        where user_id = ${userId} and product_id = ${productId}
      ` : await sql`
        select id, url, in_stock, checked_at from offers where user_id = ${userId}
      `).map((row) => ({
		id: row.id,
		url: row.url,
		inStock: asBool(row.in_stock),
		checkedAt: row.checked_at
	}));
	const now = Date.now();
	const due = force ? offers : offers.filter((offer) => !isFresh(offer.checkedAt, now));
	if (due.length === 0) return {
		state: "fresh",
		changed: 0,
		detail: "Conferido há pouco. Nada novo para buscar."
	};
	const skipped = [];
	const groups = /* @__PURE__ */ new Map();
	for (const offer of due) {
		const item = parseShopeeItem(offer.url);
		if (!item) {
			skipped.push(offer);
			continue;
		}
		const key = `${item.shopId}:${item.itemId}`;
		const group = groups.get(key);
		if (group) group.offers.push(offer);
		else groups.set(key, {
			shopId: item.shopId,
			itemId: item.itemId,
			offers: [offer]
		});
	}
	if (groups.size === 0) return {
		state: "skipped",
		changed: 0,
		detail: "Nenhum link tem o código do produto (…-i.loja.item). O estoque que você marcou continua."
	};
	let changed = 0;
	const live = [];
	for (const group of groups.values()) {
		const row = (await sql`
      select in_stock, checked_at from stock_checks
      where shop_id = ${group.shopId} and item_id = ${group.itemId}
    `)[0];
		if (row && isFresh(row.checked_at, now)) {
			const inStock = asBool(row.in_stock);
			const checkedAt = asIso(row.checked_at) ?? (/* @__PURE__ */ new Date()).toISOString();
			changed += await applyOfferStock(sql, userId, group.offers, inStock, checkedAt);
			continue;
		}
		live.push(group);
	}
	if (live.length === 0) {
		const extra = skipped.length > 0 ? " Os links sem código de produto ficaram como você marcou." : "";
		return {
			state: changed === 0 ? "fresh" : "updated",
			changed,
			detail: changed === 0 ? `Conferido há pouco. Nada novo para buscar.${extra}` : changed === 1 ? `A Shopee mudou 1 oferta.${extra}` : `A Shopee mudou ${changed} ofertas.${extra}`
		};
	}
	const credential = resolveAffiliateCredential(userId);
	if (!credential) return {
		state: "not_configured",
		changed: 0,
		detail: "A conferência automática está desligada. O estoque marcado continua."
	};
	const queued = live.slice(0, LOOKUP_CAP);
	let sawDecision = false;
	for (let index = 0; index < queued.length; index += 1) {
		const group = queued[index];
		if (!group) continue;
		const lookup = await affiliateCatalog(credential, group.shopId, group.itemId);
		if (lookup.kind === "auth" || lookup.kind === "down" || lookup.kind === "rate_limited") {
			if (!sawDecision && index === 0) return {
				state: lookup.kind === "auth" ? "rejected" : lookup.kind === "rate_limited" ? "throttled" : "unreachable",
				changed: 0,
				detail: lookup.kind === "auth" ? "A conferência automática está indisponível. O estoque marcado continua." : lookup.kind === "rate_limited" ? "A Shopee limitou as consultas agora. O estoque marcado continua." : "Não deu para falar com a Shopee agora. O estoque marcado continua."
			};
			continue;
		}
		sawDecision = true;
		const inStock = lookup.kind === "in";
		const checkedAt = (/* @__PURE__ */ new Date()).toISOString();
		await sql`
      insert into stock_checks (shop_id, item_id, in_stock, checked_at)
      values (${group.shopId}, ${group.itemId}, ${inStock ? 1 : 0}, ${checkedAt})
      on conflict (shop_id, item_id) do update
        set in_stock = excluded.in_stock,
            checked_at = excluded.checked_at
    `;
		changed += await applyOfferStock(sql, userId, group.offers, inStock, checkedAt);
	}
	const extra = skipped.length > 0 ? " Os links sem código de produto ficaram como você marcou." : "";
	const detail = changed === 0 ? `A Shopee confirmou o estoque. Nada mudou.${extra}` : changed === 1 ? `A Shopee mudou 1 oferta.${extra}` : `A Shopee mudou ${changed} ofertas.${extra}`;
	return {
		state: "updated",
		changed,
		detail
	};
}
var stockCooldown = /* @__PURE__ */ new Map();
async function freshenForUser(userId, options) {
	const decision = await decideStock(userId, options);
	const view = await loadWorkspace(userId);
	return {
		...decision,
		products: view.products
	};
}
async function freshenForCode(code) {
	if ((stockCooldown.get(code) ?? 0) > Date.now()) return;
	const product = (await (await getSql())`
    select id, user_id from products where code = ${code}
  `)[0];
	if (!product) return;
	const report = await freshenForUser(product.user_id, {
		productId: product.id,
		force: false
	});
	if (report.state === "rejected" || report.state === "unreachable" || report.state === "throttled") stockCooldown.set(code, Date.now() + STOCK_FRESH_MS);
}
//#endregion
export { freshenForCode, freshenForUser };
