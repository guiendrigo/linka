import { getSql } from "@/lib/db";
import { productCode, type CleanProduct } from "@/lib/linka/input";
import type { SmartLink } from "@/lib/linka/types";

export type WorkspaceOffer = {
  id: string;
  shop: string;
  url: string;
  inStock: boolean;
};

export type WorkspaceProduct = {
  id: string;
  code: string;
  title: string;
  priceCents: number;
  commissionPct: number;
  offers: WorkspaceOffer[];
};

export type WorkspaceView = {
  shopee: { connected: false } | { connected: true; appId: string };
  products: WorkspaceProduct[];
};

type ProductRow = {
  id: string;
  code: string;
  title: string;
  price_cents: number | string;
  commission_pct: number | string;
  offer_id: string | null;
  shop: string | null;
  url: string | null;
  in_stock: unknown;
  position: number | string | null;
};

function asBool(value: unknown): boolean {
  return value === true || value === "t" || value === "true" || value === 1;
}

function asNumber(value: number | string | null): number {
  return typeof value === "number" ? value : Number(value ?? 0);
}

function groupProducts(rows: ProductRow[]): WorkspaceProduct[] {
  const products: WorkspaceProduct[] = [];
  for (const row of rows) {
    let product = products.find((item) => item.id === row.id);
    if (!product) {
      product = {
        id: row.id,
        code: row.code,
        title: row.title,
        priceCents: asNumber(row.price_cents),
        commissionPct: asNumber(row.commission_pct),
        offers: [],
      };
      products.push(product);
    }
    if (row.offer_id && row.shop && row.url) {
      product.offers.push({
        id: row.offer_id,
        shop: row.shop,
        url: row.url,
        inStock: asBool(row.in_stock),
      });
    }
  }
  return products;
}

const productSelect = `
  select p.id, p.code, p.title, p.price_cents, p.commission_pct,
         o.id as offer_id, o.shop, o.url, o.in_stock, o.position
  from products p
  left join offers o on o.product_id = p.id
`;

export async function loadWorkspace(userId: string): Promise<WorkspaceView> {
  const sql = await getSql();
  const creds = await sql<{ app_id: string }>`
    select app_id from shopee_credentials where user_id = ${userId}
  `;
  const listed = await sql.query<ProductRow>(
    `${productSelect} where p.user_id = $1 order by p.created_at desc, o.position asc`,
    [userId],
  );
  const credential = creds[0];
  return {
    shopee: credential ? { connected: true, appId: credential.app_id } : { connected: false },
    products: groupProducts(listed),
  };
}

export async function saveCredentials(userId: string, appId: string, secret: string): Promise<void> {
  const sql = await getSql();
  await sql`
    insert into shopee_credentials (user_id, app_id, secret, updated_at)
    values (${userId}, ${appId}, ${secret}, now())
    on conflict (user_id) do update
      set app_id = excluded.app_id,
          secret = excluded.secret,
          updated_at = now()
  `;
}

export async function clearCredentials(userId: string): Promise<void> {
  const sql = await getSql();
  await sql`delete from shopee_credentials where user_id = ${userId}`;
}

export async function createProduct(userId: string, input: CleanProduct): Promise<WorkspaceProduct> {
  const sql = await getSql();
  const id = crypto.randomUUID();
  let code = productCode(input.title);
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const taken = await sql<{ code: string }>`select code from products where code = ${code}`;
    if (taken.length === 0) break;
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
  const saved = await loadWorkspace(userId);
  const product = saved.products.find((item) => item.id === id);
  if (!product) throw new Error("Não deu para guardar o produto.");
  return product;
}

export async function updateProduct(
  userId: string,
  productId: string,
  input: CleanProduct,
): Promise<WorkspaceProduct> {
  const sql = await getSql();
  const owned = await sql<{ id: string }>`
    select id from products where id = ${productId} and user_id = ${userId}
  `;
  if (owned.length === 0) throw new Error("Produto não encontrado.");
  const previous = await sql<{
    position: number | string;
    shop: string;
    url: string;
    in_stock: unknown;
  }>`
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
    for (const offer of previous) {
      await sql`
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
    }
    throw error;
  }
  const saved = await loadWorkspace(userId);
  const product = saved.products.find((item) => item.id === productId);
  if (!product) throw new Error("Não deu para atualizar o produto.");
  return product;
}

export async function deleteProduct(userId: string, productId: string): Promise<void> {
  const sql = await getSql();
  await sql`delete from products where id = ${productId} and user_id = ${userId}`;
}

export async function setOfferStock(userId: string, offerId: string, inStock: boolean): Promise<void> {
  const sql = await getSql();
  const updated = await sql<{ id: string }>`
    update offers set in_stock = ${inStock}
    where id = ${offerId} and user_id = ${userId}
    returning id
  `;
  if (updated.length === 0) throw new Error("Oferta não encontrada.");
}

export async function findStoredLink(code: string): Promise<SmartLink | null> {
  const sql = await getSql();
  const rows = await sql.query<ProductRow>(
    `${productSelect} where p.code = $1 order by o.position asc`,
    [code],
  );
  const product = groupProducts(rows)[0];
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
      inStock: offer.inStock,
    })),
  };
}
