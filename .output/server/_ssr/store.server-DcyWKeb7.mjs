import { r as getSql } from "./db-sKYhmciq.mjs";
import { a as resolutionCopy, o as resolveSmartLink } from "./resolve-D_7ToDhA.mjs";
import { i as cleanBioIdentity, n as bioCode, r as bioListItems, t as BIO_CODE_RE } from "./bio-DfR42D11.mjs";
import { t as billingEnabled } from "./purchases-CIxOrcXK.mjs";
import { r as productCode } from "./input-DHVI1aSa.mjs";
import { a as productCapError, i as productCap, o as visitStampFromPublic, r as parseLastVisitRole } from "./plans-BR9BKYkz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store.server-DcyWKeb7.js
/** Quanto tempo o estoque lido na Shopee vale antes de outra consulta. */
var STOCK_FRESH_MS = 9e5;
var SHOPEE_GRAPHQL = "https://open-api.affiliate.shopee.com.br/graphql";
var ITEM_IN_PATH = /-i\.(\d{1,20})\.(\d{1,20})/;
var PRODUCT_PATH = /\/(?:product|opaanlp)\/(\d{1,20})\/(\d{1,20})/;
/** Tira loja e item de um link da Shopee. Encurtado sem esses números não serve. */
function parseShopeeItem(url) {
	const classic = url.match(ITEM_IN_PATH);
	if (classic?.[1] && classic[2]) return {
		shopId: classic[1],
		itemId: classic[2]
	};
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		return null;
	}
	const product = parsed.pathname.match(PRODUCT_PATH);
	if (product?.[1] && product[2]) return {
		shopId: product[1],
		itemId: product[2]
	};
	const shopId = parsed.searchParams.get("shopid") ?? parsed.searchParams.get("shop_id");
	const itemId = parsed.searchParams.get("itemid") ?? parsed.searchParams.get("item_id");
	if (shopId && itemId && /^\d{1,20}$/.test(shopId) && /^\d{1,20}$/.test(itemId)) return {
		shopId,
		itemId
	};
	return null;
}
function offerQueryPayload(shopId, itemId) {
	if (!/^\d{1,20}$/.test(shopId) || !/^\d{1,20}$/.test(itemId)) throw new Error("Código de produto inválido.");
	const query = `{ productOfferV2(shopId: ${shopId}, itemId: ${itemId}, page: 1, limit: 5) { nodes { itemId productName shopName } } }`;
	return JSON.stringify({ query });
}
async function authorizationHeader(appId, secret, payload, timestamp) {
	const bytes = new TextEncoder().encode(`${appId}${timestamp}${payload}${secret}`);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return `SHA256 Credential=${appId}, Timestamp=${timestamp}, Signature=${[...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}
/** A oferta listada pela Shopee está no ar. Lista vazia: saiu. Resposta torta: não mexe. */
function interpretOfferResponse(body, itemId) {
	if (!body || typeof body !== "object") return "error";
	const record = body;
	if (Array.isArray(record.errors) && record.errors.length > 0) return "error";
	const nodes = record.data?.productOfferV2?.nodes;
	if (!Array.isArray(nodes)) return "error";
	if (nodes.length === 0) return "out";
	const ids = nodes.map((node) => {
		if (!node || typeof node !== "object" || !("itemId" in node)) return null;
		const value = node.itemId;
		return value == null ? null : String(value);
	});
	if (ids.every((id) => id == null)) return "in";
	return ids.some((id) => id === itemId) ? "in" : "out";
}
function looksLikeRateLimit(body) {
	const text = typeof body === "string" ? body : JSON.stringify(body ?? "");
	return /\b10030\b|rate limit/i.test(text);
}
function looksLikeAuthFailure(body) {
	if (looksLikeRateLimit(body)) return false;
	const text = typeof body === "string" ? body : JSON.stringify(body ?? "");
	return /signature|credential|unauthorized|do not have access|permission denied|forbidden|invalid auth|\b10020\b|\b10035\b/i.test(text);
}
function env(key) {
	return process.env[key]?.trim() || void 0;
}
function resolveAffiliateCredential(_userId) {
	const appId = env("SHOPEE_AFFILIATE_APP_ID");
	const secret = env("SHOPEE_AFFILIATE_SECRET");
	if (!appId || !secret) return null;
	return {
		source: "platform",
		appId,
		secret
	};
}
function toSmartLink(product) {
	return {
		code: product.code,
		title: product.title,
		detail: "",
		priceCents: product.priceCents,
		commissionPct: product.commissionPct,
		offers: product.offers
	};
}
function productListStatus(product) {
	const resolution = resolveSmartLink(toSmartLink(product));
	if (resolution.status === "ok") return {
		label: "Em estoque",
		on: true
	};
	if (resolution.status === "all_out") return {
		label: "Esgotado",
		on: false
	};
	return {
		label: "Sem destino",
		on: false
	};
}
function productDestinationTitle(product) {
	return resolutionCopy(resolveSmartLink(toSmartLink(product))).title;
}
function productViewFields(product) {
	return {
		status: productListStatus(product),
		destinationTitle: productDestinationTitle(product)
	};
}
function asBool(value) {
	return value === true || value === "t" || value === "true" || value === 1;
}
function asNumber(value) {
	return typeof value === "number" ? value : Number(value ?? 0);
}
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	if (typeof value === "string" && value.trim()) return value;
	return null;
}
function lastVisitFromRow(row) {
	const at = asIso(row.last_visit_at);
	const role = parseLastVisitRole(row.last_visit_role);
	if (!at || !role) return null;
	return {
		at,
		role,
		shop: (typeof row.last_visit_shop === "string" ? row.last_visit_shop.trim() : "") || null
	};
}
function groupProducts(rows) {
	const products = [];
	for (const row of rows) {
		let product = products.find((item) => item.id === row.id);
		if (!product) {
			product = {
				id: row.id,
				code: row.code,
				title: row.title,
				priceCents: asNumber(row.price_cents),
				commissionPct: asNumber(row.commission_pct),
				bioVisible: row.bio_visible == null ? true : asBool(row.bio_visible),
				lastVisit: lastVisitFromRow(row),
				offers: []
			};
			products.push(product);
		}
		if (row.offer_id && row.shop && row.url) product.offers.push({
			id: row.offer_id,
			shop: row.shop,
			url: row.url,
			inStock: asBool(row.in_stock),
			checkedAt: asIso(row.checked_at)
		});
	}
	return products.map((item) => ({
		...item,
		...productViewFields(item)
	}));
}
var productSelect = `
  select p.id, p.code, p.title, p.price_cents, p.commission_pct, p.bio_visible,
         p.last_visit_at, p.last_visit_role, p.last_visit_shop,
         o.id as offer_id, o.shop, o.url, o.in_stock, o.position, o.checked_at
  from products p
  left join offers o on o.product_id = p.id
`;
async function loadWorkspace(userId) {
	const listed = await (await getSql()).query(`${productSelect} where p.user_id = $1 order by p.created_at desc, o.position asc`, [userId]);
	const planTier = await readPlanTier(userId);
	return {
		stock: { automatic: resolveAffiliateCredential(userId) != null },
		bio: await ensureBioPage(userId),
		pollMs: STOCK_FRESH_MS,
		products: groupProducts(listed),
		planTier,
		productCap: productCap({
			billingEnabled,
			isPro: planTier === "pro"
		})
	};
}
function toBioView(row) {
	return {
		code: row.code,
		title: row.title,
		description: row.description ?? "",
		hasPhoto: Boolean(row.photo_mime)
	};
}
async function readBioPage(userId) {
	const row = (await (await getSql())`
    select code, title, description, photo_mime from bio_pages where user_id = ${userId}
  `)[0];
	return row ? toBioView(row) : null;
}
async function ensureBioPage(userId) {
	const existing = await readBioPage(userId);
	if (existing) return existing;
	const sql = await getSql();
	const names = await sql`select name from "user" where id = ${userId}`;
	let title = "Minha página";
	try {
		title = cleanBioIdentity({
			title: names[0]?.name?.trim() || "Minha página",
			description: ""
		}).title;
	} catch {
		title = "Minha página";
	}
	for (let attempt = 0; attempt < 5; attempt += 1) {
		const code = bioCode();
		const createdAt = (/* @__PURE__ */ new Date()).toISOString();
		try {
			await sql`
        insert into bio_pages (user_id, code, title, description, created_at)
        values (${userId}, ${code}, ${title}, ${""}, ${createdAt})
      `;
			return {
				code,
				title,
				description: "",
				hasPhoto: false
			};
		} catch {
			const raced = await readBioPage(userId);
			if (raced) return raced;
		}
	}
	throw new Error("Não deu para criar a página da bio.");
}
async function saveBioIdentity(userId, identity) {
	const sql = await getSql();
	await ensureBioPage(userId);
	await sql`
    update bio_pages
    set title = ${identity.title}, description = ${identity.description}
    where user_id = ${userId}
  `;
	const saved = await readBioPage(userId);
	if (!saved) throw new Error("Não deu para salvar a página.");
	return saved;
}
async function saveBioPhoto(userId, mime, bytes) {
	const sql = await getSql();
	await ensureBioPage(userId);
	await sql.query(`update bio_pages set photo_mime = $1, photo_bytes = $2 where user_id = $3`, [
		mime,
		Buffer.from(bytes),
		userId
	]);
	const saved = await readBioPage(userId);
	if (!saved) throw new Error("Não deu para guardar a foto.");
	return {
		...saved,
		hasPhoto: true
	};
}
async function setProductBioVisible(userId, productId, visible) {
	if ((await (await getSql())`
    update products set bio_visible = ${visible} where id = ${productId} and user_id = ${userId} returning id
  `).length === 0) throw new Error("Produto não encontrado.");
}
async function loadPublicBio(code) {
	if (!BIO_CODE_RE.test(code)) return { found: false };
	const sql = await getSql();
	const page = (await sql`
    select user_id, code, title, description, photo_mime from bio_pages where code = ${code}
  `)[0];
	if (!page) return { found: false };
	try {
		const { freshenForUser } = await import("./stock-freshen.server-CKuXrzDj.mjs");
		await freshenForUser(page.user_id, { force: false });
	} catch {}
	const listed = await sql.query(`${productSelect} where p.user_id = $1 order by p.created_at desc, o.position asc`, [page.user_id]);
	return {
		found: true,
		code: page.code,
		title: page.title,
		description: page.description ?? "",
		hasPhoto: Boolean(page.photo_mime),
		products: bioListItems(groupProducts(listed).map((product) => ({
			code: product.code,
			title: product.title,
			priceCents: product.priceCents,
			bioVisible: product.bioVisible,
			offers: product.offers
		})))
	};
}
async function loadBioPhoto(code) {
	if (!BIO_CODE_RE.test(code)) return null;
	const row = (await (await getSql()).query(`select photo_mime, photo_bytes from bio_pages where code = $1`, [code]))[0];
	if (!row?.photo_mime) return null;
	const bytes = asBytes(row.photo_bytes);
	if (!bytes || bytes.byteLength === 0) return null;
	return {
		mime: row.photo_mime,
		bytes
	};
}
function asBytes(value) {
	if (value == null) return null;
	if (value instanceof Uint8Array) return value;
	if (ArrayBuffer.isView(value)) {
		const view = value;
		return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
	}
	if (Array.isArray(value) && value.every((item) => typeof item === "number")) return Uint8Array.from(value);
	if (typeof value === "string" && value.length > 0) {
		if (value.startsWith("\\x")) return new Uint8Array(Buffer.from(value.slice(2), "hex"));
		return new Uint8Array(Buffer.from(value, "base64"));
	}
	return null;
}
async function createProduct(userId, input) {
	await assertProductQuota(userId);
	const sql = await getSql();
	const id = crypto.randomUUID();
	let code = productCode(input.title);
	for (let attempt = 0; attempt < 5; attempt += 1) {
		if ((await sql`select code from products where code = ${code}`).length === 0) break;
		code = productCode(input.title);
	}
	const createdAt = (/* @__PURE__ */ new Date()).toISOString();
	await sql`
    insert into products (id, user_id, code, title, price_cents, commission_pct, created_at)
    values (${id}, ${userId}, ${code}, ${input.title}, ${input.priceCents}, ${input.commissionPct}, ${createdAt})
  `;
	try {
		for (let position = 0; position < input.offers.length; position += 1) {
			const offer = input.offers[position];
			if (!offer) continue;
			await sql`
        insert into offers (id, product_id, user_id, position, shop, url, in_stock)
        values (${crypto.randomUUID()}, ${id}, ${userId}, ${position}, ${offer.shop}, ${offer.url}, ${offer.inStock})
      `;
		}
	} catch (error) {
		await sql`delete from products where id = ${id} and user_id = ${userId}`;
		throw error;
	}
	const product = (await loadWorkspace(userId)).products.find((item) => item.id === id);
	if (!product) throw new Error("Não deu para guardar o produto.");
	return product;
}
async function updateProduct(userId, productId, input) {
	const sql = await getSql();
	if ((await sql`
    select id from products where id = ${productId} and user_id = ${userId}
  `).length === 0) throw new Error("Produto não encontrado.");
	const previous = await sql`
    select position, shop, url, in_stock
    from offers
    where product_id = ${productId} and user_id = ${userId}
    order by position asc
  `;
	await sql`
    update products
    set title = ${input.title}, price_cents = ${input.priceCents}, commission_pct = ${input.commissionPct}
    where id = ${productId} and user_id = ${userId}
  `;
	await sql`delete from offers where product_id = ${productId} and user_id = ${userId}`;
	try {
		for (let position = 0; position < input.offers.length; position += 1) {
			const offer = input.offers[position];
			if (!offer) continue;
			await sql`
        insert into offers (id, product_id, user_id, position, shop, url, in_stock)
        values (${crypto.randomUUID()}, ${productId}, ${userId}, ${position}, ${offer.shop}, ${offer.url}, ${offer.inStock})
      `;
		}
	} catch (error) {
		await sql`delete from offers where product_id = ${productId} and user_id = ${userId}`;
		for (const offer of previous) await sql`
        insert into offers (id, product_id, user_id, position, shop, url, in_stock)
        values (
          ${crypto.randomUUID()},
          ${productId},
          ${userId},
          ${asNumber(offer.position)},
          ${offer.shop},
          ${offer.url},
          ${asBool(offer.in_stock)}
        )
      `;
		throw error;
	}
	const product = (await loadWorkspace(userId)).products.find((item) => item.id === productId);
	if (!product) throw new Error("Não deu para atualizar o produto.");
	return product;
}
async function deleteProduct(userId, productId) {
	await (await getSql())`delete from products where id = ${productId} and user_id = ${userId}`;
}
async function setOfferStock(userId, offerId, inStock) {
	if ((await (await getSql())`
    update offers set in_stock = ${inStock}, checked_at = null
    where id = ${offerId} and user_id = ${userId}
    returning id
  `).length === 0) throw new Error("Oferta não encontrada.");
}
async function recordLastVisit(code, visit) {
	const stamp = visitStampFromPublic(visit);
	if (!stamp) return;
	await (await getSql())`
    update products
    set last_visit_at = ${(/* @__PURE__ */ new Date()).toISOString()}, last_visit_role = ${stamp.role}, last_visit_shop = ${stamp.shop}
    where code = ${code}
  `;
}
async function savePlanTier(userId, isPro) {
	const sql = await getSql();
	const tier = isPro ? "pro" : "free";
	const updatedAt = (/* @__PURE__ */ new Date()).toISOString();
	await sql`
    insert into user_plans (user_id, tier, updated_at)
    values (${userId}, ${tier}, ${updatedAt})
    on conflict (user_id) do update set tier = ${tier}, updated_at = ${updatedAt}
  `;
	return tier;
}
async function readPlanTier(userId) {
	return (await (await getSql())`select tier from user_plans where user_id = ${userId}`)[0]?.tier === "pro" ? "pro" : "free";
}
async function assertProductQuota(userId) {
	const isPro = await readPlanTier(userId) === "pro";
	const cap = productCap({
		billingEnabled,
		isPro
	});
	if (cap == null) return;
	if (asNumber((await (await getSql())`
    select count(*) as n from products where user_id = ${userId}
  `)[0]?.n ?? 0) >= cap) throw new Error(productCapError({
		isPro,
		cap
	}));
}
async function findStoredLink(code) {
	const product = groupProducts(await (await getSql()).query(`${productSelect} where p.code = $1 order by o.position asc`, [code]))[0];
	if (!product) return null;
	return {
		code: product.code,
		title: product.title,
		detail: "Link salvo",
		priceCents: product.priceCents,
		commissionPct: product.commissionPct,
		offers: product.offers.map((offer) => ({
			id: offer.id,
			shop: offer.shop,
			url: offer.url,
			inStock: offer.inStock
		}))
	};
}
//#endregion
export { interpretOfferResponse as a, offerQueryPayload as c, createProduct, deleteProduct, findStoredLink, authorizationHeader as i, parseShopeeItem as l, loadBioPhoto, loadPublicBio, loadWorkspace, SHOPEE_GRAPHQL as n, looksLikeAuthFailure as o, STOCK_FRESH_MS as r, recordLastVisit, looksLikeRateLimit as s, saveBioIdentity, saveBioPhoto, savePlanTier, setOfferStock, setProductBioVisible, resolveAffiliateCredential as t, updateProduct };
