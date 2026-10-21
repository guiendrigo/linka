import { r as getSql } from "./db-BpGF3_j9.mjs";
import { i as productCode } from "./input-Bpl--re0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store.server-VqyDLXRa.js
function asBool(value) {
	return value === true || value === "t" || value === "true" || value === 1;
}
function asNumber(value) {
	return typeof value === "number" ? value : Number(value ?? 0);
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
				offers: []
			};
			products.push(product);
		}
		if (row.offer_id && row.shop && row.url) product.offers.push({
			id: row.offer_id,
			shop: row.shop,
			url: row.url,
			inStock: asBool(row.in_stock)
		});
	}
	return products;
}
var productSelect = `
  select p.id, p.code, p.title, p.price_cents, p.commission_pct,
         o.id as offer_id, o.shop, o.url, o.in_stock, o.position
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
		products: groupProducts(listed)
	};
}
async function saveCredentials(userId, appId, secret) {
	await (await getSql())`
    insert into shopee_credentials (user_id, app_id, secret, updated_at)
    values (${userId}, ${appId}, ${secret}, now())
    on conflict (user_id) do update
      set app_id = excluded.app_id,
          secret = excluded.secret,
          updated_at = now()
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
	await sql`
    insert into products (id, user_id, code, title, price_cents, commission_pct)
    values (${id}, ${userId}, ${code}, ${input.title}, ${input.priceCents}, ${input.commissionPct})
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
    update offers set in_stock = ${inStock}
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
//#endregion
export { clearCredentials, createProduct, deleteProduct, findStoredLink, loadWorkspace, saveCredentials, setOfferStock, updateProduct };
