import { getSql } from "@/lib/db";
import {
  BIO_CODE_RE,
  bioCode,
  bioListItems,
  cleanBioIdentity,
  type BioIdentity,
  type BioListItem,
  type PhotoMime,
} from "@/lib/linka/bio";
import { productCode, type CleanProduct } from "@/lib/linka/input";
import { parseShopeeItem, STOCK_FRESH_MS } from "@/lib/linka/shopee";
import type { SmartLink } from "@/lib/linka/types";

export type WorkspaceOffer = {
  id: string;
  shop: string;
  url: string;
  inStock: boolean;
  checkedAt: string | null;
};

export type WorkspaceProduct = {
  id: string;
  code: string;
  title: string;
  priceCents: number;
  commissionPct: number;
  bioVisible: boolean;
  offers: WorkspaceOffer[];
};

export type BioPageView = {
  code: string;
  title: string;
  description: string;
  hasPhoto: boolean;
};

export type WorkspaceView = {
  shopee: { connected: false } | { connected: true; appId: string };
  bio: BioPageView;
  products: WorkspaceProduct[];
};

export type PublicBioPage = {
  found: true;
  code: string;
  title: string;
  description: string;
  hasPhoto: boolean;
  products: BioListItem[];
};

export type MissingBioPage = { found: false };

export type StockReport = {
  state: "fresh" | "updated" | "skipped" | "need_credentials" | "rejected" | "unreachable";
  changed: number;
  detail: string;
  products: WorkspaceProduct[];
};

type ProductRow = {
  id: string;
  code: string;
  title: string;
  price_cents: number | string;
  commission_pct: number | string;
  bio_visible: unknown;
  offer_id: string | null;
  shop: string | null;
  url: string | null;
  in_stock: unknown;
  position: number | string | null;
  checked_at: unknown;
};

function asBool(value: unknown): boolean {
  return value === true || value === "t" || value === "true" || value === 1;
}

function asNumber(value: number | string | null): number {
  return typeof value === "number" ? value : Number(value ?? 0);
}

function asIso(value: unknown): string | null {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value.trim()) return value;
  return null;
}

function isFresh(value: unknown, now: number): boolean {
  const iso = asIso(value);
  if (!iso) return false;
  const then = Date.parse(iso);
  return Number.isFinite(then) && now - then < STOCK_FRESH_MS;
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
        bioVisible: row.bio_visible == null ? true : asBool(row.bio_visible),
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
        checkedAt: asIso(row.checked_at),
      });
    }
  }
  return products;
}

const productSelect = `
  select p.id, p.code, p.title, p.price_cents, p.commission_pct, p.bio_visible,
         o.id as offer_id, o.shop, o.url, o.in_stock, o.position, o.checked_at
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
    bio: await ensureBioPage(userId),
    products: groupProducts(listed),
  };
}

type BioRow = {
  code: string;
  title: string;
  description: string;
  photo_mime: string | null;
};

function toBioView(row: BioRow): BioPageView {
  return {
    code: row.code,
    title: row.title,
    description: row.description ?? "",
    hasPhoto: Boolean(row.photo_mime),
  };
}

async function readBioPage(userId: string): Promise<BioPageView | null> {
  const sql = await getSql();
  const rows = await sql<BioRow>`
    select code, title, description, photo_mime from bio_pages where user_id = ${userId}
  `;
  const row = rows[0];
  return row ? toBioView(row) : null;
}

async function ensureBioPage(userId: string): Promise<BioPageView> {
  const existing = await readBioPage(userId);
  if (existing) return existing;
  const sql = await getSql();
  const names = await sql<{ name: string }>`select name from "user" where id = ${userId}`;
  let title = "Minha página";
  try {
    title = cleanBioIdentity({ title: names[0]?.name?.trim() || "Minha página", description: "" }).title;
  } catch {
    title = "Minha página";
  }
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const code = bioCode();
    const createdAt = new Date().toISOString();
    try {
      await sql`
        insert into bio_pages (user_id, code, title, description, created_at)
        values (${userId}, ${code}, ${title}, ${""}, ${createdAt})
      `;
      return { code, title, description: "", hasPhoto: false };
    } catch {
      const raced = await readBioPage(userId);
      if (raced) return raced;
    }
  }
  throw new Error("Não deu para criar a página da bio.");
}

export async function saveBioIdentity(userId: string, identity: BioIdentity): Promise<BioPageView> {
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

export async function saveBioPhoto(userId: string, mime: PhotoMime, bytes: Uint8Array): Promise<BioPageView> {
  const sql = await getSql();
  await ensureBioPage(userId);
  await sql.query(`update bio_pages set photo_mime = $1, photo_bytes = $2 where user_id = $3`, [
    mime,
    Buffer.from(bytes),
    userId,
  ]);
  const saved = await readBioPage(userId);
  if (!saved) throw new Error("Não deu para guardar a foto.");
  return { ...saved, hasPhoto: true };
}

export async function setProductBioVisible(userId: string, productId: string, visible: boolean): Promise<void> {
  const sql = await getSql();
  const updated = await sql<{ id: string }>`
    update products set bio_visible = ${visible} where id = ${productId} and user_id = ${userId} returning id
  `;
  if (updated.length === 0) throw new Error("Produto não encontrado.");
}

export async function loadPublicBio(code: string): Promise<PublicBioPage | MissingBioPage> {
  if (!BIO_CODE_RE.test(code)) return { found: false };
  const sql = await getSql();
  const pages = await sql<{ user_id: string } & BioRow>`
    select user_id, code, title, description, photo_mime from bio_pages where code = ${code}
  `;
  const page = pages[0];
  if (!page) return { found: false };
  try {
    await checkStock(page.user_id, { force: false });
  } catch {
    // A visita usa o último estoque conhecido se a Shopee não responder.
  }
  const listed = await sql.query<ProductRow>(
    `${productSelect} where p.user_id = $1 order by p.created_at desc, o.position asc`,
    [page.user_id],
  );
  return {
    found: true,
    code: page.code,
    title: page.title,
    description: page.description ?? "",
    hasPhoto: Boolean(page.photo_mime),
    products: bioListItems(
      groupProducts(listed).map((product) => ({
        code: product.code,
        title: product.title,
        priceCents: product.priceCents,
        bioVisible: product.bioVisible,
        offers: product.offers,
      })),
    ),
  };
}

export async function loadBioPhoto(code: string): Promise<{ mime: string; bytes: Uint8Array } | null> {
  if (!BIO_CODE_RE.test(code)) return null;
  const sql = await getSql();
  const rows = await sql.query<{ photo_mime: string | null; photo_bytes: unknown }>(
    `select photo_mime, photo_bytes from bio_pages where code = $1`,
    [code],
  );
  const row = rows[0];
  if (!row?.photo_mime) return null;
  const bytes = asBytes(row.photo_bytes);
  if (!bytes || bytes.byteLength === 0) return null;
  return { mime: row.photo_mime, bytes };
}

function asBytes(value: unknown): Uint8Array | null {
  if (value == null) return null;
  if (value instanceof Uint8Array) return value;
  if (ArrayBuffer.isView(value)) {
    const view = value as ArrayBufferView;
    return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
  }
  if (Array.isArray(value) && value.every((item) => typeof item === "number")) {
    return Uint8Array.from(value);
  }
  if (typeof value === "string" && value.length > 0) {
    if (value.startsWith("\\x")) return new Uint8Array(Buffer.from(value.slice(2), "hex"));
    return new Uint8Array(Buffer.from(value, "base64"));
  }
  return null;
}

export async function saveCredentials(userId: string, appId: string, secret: string): Promise<void> {
  const sql = await getSql();
  const updatedAt = new Date().toISOString();
  await sql`
    insert into shopee_credentials (user_id, app_id, secret, updated_at)
    values (${userId}, ${appId}, ${secret}, ${updatedAt})
    on conflict (user_id) do update
      set app_id = excluded.app_id,
          secret = excluded.secret,
          updated_at = excluded.updated_at
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
  const createdAt = new Date().toISOString();
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
    update offers set in_stock = ${inStock}, checked_at = null
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

const LOOKUP_CAP = 8;

type OfferWork = {
  id: string;
  url: string;
  inStock: boolean;
  checkedAt: unknown;
};

export async function checkStock(
  userId: string,
  options?: { force?: boolean; productId?: string },
): Promise<StockReport> {
  const sql = await getSql();
  const force = options?.force === true;
  const productId = options?.productId;
  const rows = productId
    ? await sql<{ id: string; url: string; in_stock: unknown; checked_at: unknown }>`
        select id, url, in_stock, checked_at from offers
        where user_id = ${userId} and product_id = ${productId}
      `
    : await sql<{ id: string; url: string; in_stock: unknown; checked_at: unknown }>`
        select id, url, in_stock, checked_at from offers where user_id = ${userId}
      `;
  const offers: OfferWork[] = rows.map((row) => ({
    id: row.id,
    url: row.url,
    inStock: asBool(row.in_stock),
    checkedAt: row.checked_at,
  }));
  const now = Date.now();
  const due = force ? offers : offers.filter((offer) => !isFresh(offer.checkedAt, now));
  if (due.length === 0) {
    const view = await loadWorkspace(userId);
    return {
      state: "fresh",
      changed: 0,
      detail: "Conferido há pouco. Nada novo para buscar.",
      products: view.products,
    };
  }

  const skipped: OfferWork[] = [];
  const groups = new Map<string, { shopId: string; itemId: string; offers: OfferWork[] }>();
  for (const offer of due) {
    const item = parseShopeeItem(offer.url);
    if (!item) {
      skipped.push(offer);
      continue;
    }
    const key = `${item.shopId}:${item.itemId}`;
    const group = groups.get(key);
    if (group) group.offers.push(offer);
    else groups.set(key, { shopId: item.shopId, itemId: item.itemId, offers: [offer] });
  }

  if (groups.size === 0) {
    const view = await loadWorkspace(userId);
    return {
      state: "skipped",
      changed: 0,
      detail: "Nenhum link tem o código do produto (…-i.loja.item). O estoque que você marcou continua.",
      products: view.products,
    };
  }

  const creds = await sql<{ app_id: string; secret: string }>`
    select app_id, secret from shopee_credentials where user_id = ${userId}
  `;
  const credential = creds[0];
  if (!credential) {
    const view = await loadWorkspace(userId);
    return {
      state: "need_credentials",
      changed: 0,
      detail: "Conecte a Shopee para conferir o estoque.",
      products: view.products,
    };
  }

  const { lookupOffer } = await import("@/lib/linka/shopee.server");
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
          detail:
            lookup.kind === "auth"
              ? "A Shopee recusou a consulta. Confira o App ID, o segredo e o acesso à Open API. O estoque marcado continua."
              : "Não deu para falar com a Shopee agora. O estoque marcado continua.",
          products: view.products,
        };
      }
      continue;
    }
    sawDecision = true;
    const inStock = lookup.kind === "in";
    for (const offer of group.offers) {
      if (offer.inStock !== inStock) changed += 1;
      await sql`
        update offers set in_stock = ${inStock}, checked_at = ${new Date().toISOString()}
        where id = ${offer.id} and user_id = ${userId}
      `;
    }
  }
  const view = await loadWorkspace(userId);
  const extra = skipped.length > 0 ? " Os links sem código de produto ficaram como você marcou." : "";
  const detail =
    changed === 0
      ? `A Shopee confirmou o estoque. Nada mudou.${extra}`
      : changed === 1
        ? `A Shopee mudou 1 oferta.${extra}`
        : `A Shopee mudou ${changed} ofertas.${extra}`;
  return { state: "updated", changed, detail, products: view.products };
}

const stockCooldown = new Map<string, number>();

export async function freshenStoredStock(code: string): Promise<void> {
  const until = stockCooldown.get(code) ?? 0;
  if (until > Date.now()) return;
  const sql = await getSql();
  const rows = await sql<{ id: string; user_id: string }>`
    select id, user_id from products where code = ${code}
  `;
  const product = rows[0];
  if (!product) return;
  const report = await checkStock(product.user_id, { productId: product.id, force: false });
  if (report.state === "rejected" || report.state === "unreachable") {
    stockCooldown.set(code, Date.now() + STOCK_FRESH_MS);
  }
}
