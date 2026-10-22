import { r as getSql } from "./db-uvtzYzMd.mjs";
import { i as cleanBioIdentity, n as bioCode, r as bioListItems, t as BIO_CODE_RE } from "./bio-BWcG2gJ3.mjs";
import { i as productCode } from "./input-Bpl--re0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store.server-1Lh1cOnB.js
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
function looksLikeAuthFailure(body) {
	const text = typeof body === "string" ? body : JSON.stringify(body ?? "");
	return /signature|credential|unauthorized|do not have access|permission denied|forbidden|invalid auth|\b10020\b|\b10030\b|\b10035\b/i.test(text);
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
function isFresh(value, now) {
	const iso = asIso(value);
	if (!iso) return false;
	const then = Date.parse(iso);
	return Number.isFinite(then) && now - then < 9e5;
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
	return products;
}
var productSelect = `
  select p.id, p.code, p.title, p.price_cents, p.commission_pct, p.bio_visible,
         o.id as offer_id, o.shop, o.url, o.in_stock, o.position, o.checked_at
  from products p
  left join offers o on o.product_id = p.id
`;
async function loadWorkspace(userId) {
	const sql = await getSql();
	const creds = await sql`
    select app_id from shopee_credentials where user_id = ${userId}
  `;
	const listed = await sql.query(`${productSelect} where p.user_id = $1 order by p.created_at desc, o.position asc`, [userId]);
	const credential = creds[0];
	return {
		shopee: credential ? {
			connected: true,
			appId: credential.app_id
		} : { connected: false },
		bio: await ensureBioPage(userId),
		products: groupProducts(listed)
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
		await checkStock(page.user_id, { force: false });
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
async function saveCredentials(userId, appId, secret) {
	await (await getSql())`
    insert into shopee_credentials (user_id, app_id, secret, updated_at)
    values (${userId}, ${appId}, ${secret}, ${(/* @__PURE__ */ new Date()).toISOString()})
    on conflict (user_id) do update
      set app_id = excluded.app_id,
          secret = excluded.secret,
          updated_at = excluded.updated_at
  `;
}
async function clearCredentials(userId) {
	await (await getSql())`delete from shopee_credentials where user_id = ${userId}`;
}
async function createProduct(userId, input) {
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
var LOOKUP_CAP = 8;
async function checkStock(userId, options) {
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
		detail: "Conferido há pouco. Nada novo para buscar.",
		products: (await loadWorkspace(userId)).products
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
		detail: "Nenhum link tem o código do produto (…-i.loja.item). O estoque que você marcou continua.",
		products: (await loadWorkspace(userId)).products
	};
	const credential = (await sql`
    select app_id, secret from shopee_credentials where user_id = ${userId}
  `)[0];
	if (!credential) return {
		state: "need_credentials",
		changed: 0,
		detail: "Conecte a Shopee para conferir o estoque.",
		products: (await loadWorkspace(userId)).products
	};
	const { lookupOffer } = await import("./shopee.server-CVjnjwUR.mjs");
	const queued = [...groups.values()].slice(0, LOOKUP_CAP);
	let changed = 0;
	let sawDecision = false;
	for (let index = 0; index < queued.length; index += 1) {
		const group = queued[index];
		if (!group) continue;
		const lookup = await lookupOffer(credential.app_id, credential.secret, group.shopId, group.itemId);
		if (lookup.kind === "auth" || lookup.kind === "down") {
			if (!sawDecision && index === 0) {
				const view = await loadWorkspace(userId);
				return {
					state: lookup.kind === "auth" ? "rejected" : "unreachable",
					changed: 0,
					detail: lookup.kind === "auth" ? "A Shopee recusou a consulta. Confira o App ID, o segredo e o acesso à Open API. O estoque marcado continua." : "Não deu para falar com a Shopee agora. O estoque marcado continua.",
					products: view.products
				};
			}
			continue;
		}
		sawDecision = true;
		const inStock = lookup.kind === "in";
		for (const offer of group.offers) {
			if (offer.inStock !== inStock) changed += 1;
			await sql`
        update offers set in_stock = ${inStock}, checked_at = ${(/* @__PURE__ */ new Date()).toISOString()}
        where id = ${offer.id} and user_id = ${userId}
      `;
		}
	}
	const view = await loadWorkspace(userId);
	const extra = skipped.length > 0 ? " Os links sem código de produto ficaram como você marcou." : "";
	const detail = changed === 0 ? `A Shopee confirmou o estoque. Nada mudou.${extra}` : changed === 1 ? `A Shopee mudou 1 oferta.${extra}` : `A Shopee mudou ${changed} ofertas.${extra}`;
	return {
		state: "updated",
		changed,
		detail,
		products: view.products
	};
}
var stockCooldown = /* @__PURE__ */ new Map();
async function freshenStoredStock(code) {
	if ((stockCooldown.get(code) ?? 0) > Date.now()) return;
	const product = (await (await getSql())`
    select id, user_id from products where code = ${code}
  `)[0];
	if (!product) return;
	const report = await checkStock(product.user_id, {
		productId: product.id,
		force: false
	});
	if (report.state === "rejected" || report.state === "unreachable") stockCooldown.set(code, Date.now() + STOCK_FRESH_MS);
}
//#endregion
export { offerQueryPayload as a, checkStock, clearCredentials, createProduct, deleteProduct, findStoredLink, freshenStoredStock, looksLikeAuthFailure as i, loadBioPhoto, loadPublicBio, loadWorkspace, authorizationHeader as n, interpretOfferResponse as r, saveBioIdentity, saveBioPhoto, saveCredentials, setOfferStock, setProductBioVisible, SHOPEE_GRAPHQL as t, updateProduct };
