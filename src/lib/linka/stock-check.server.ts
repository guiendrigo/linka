import { getSql, type Sql } from "../db.ts";
import { parseShopeeItem, STOCK_FRESH_MS } from "./shopee.ts";
import { affiliateCatalog } from "./shopee/affiliate.server.ts";
import { resolveAffiliateCredential } from "./shopee/credentials.server.ts";

export type StockDecision = {
  state: "fresh" | "updated" | "skipped" | "not_configured" | "throttled" | "rejected" | "unreachable";
  changed: number;
  detail: string;
};

const LOOKUP_CAP = 8;

type OfferWork = {
  id: string;
  url: string;
  inStock: boolean;
  checkedAt: unknown;
};

function asBool(value: unknown): boolean {
  return value === true || value === "t" || value === "true" || value === 1;
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

async function applyOfferStock(
  sql: Sql,
  userId: string,
  offers: OfferWork[],
  inStock: boolean,
  checkedAt: string,
): Promise<number> {
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

export async function decideStock(
  userId: string,
  options?: { force?: boolean; productId?: string },
): Promise<StockDecision> {
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
    return {
      state: "fresh",
      changed: 0,
      detail: "Conferido há pouco. Nada novo para buscar.",
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
    return {
      state: "skipped",
      changed: 0,
      detail: "Nenhum link tem o código do produto (…-i.loja.item). O estoque que você marcou continua.",
    };
  }

  let changed = 0;
  const live: { shopId: string; itemId: string; offers: OfferWork[] }[] = [];
  for (const group of groups.values()) {
    const cached = await sql<{ in_stock: unknown; checked_at: unknown }>`
      select in_stock, checked_at from stock_checks
      where shop_id = ${group.shopId} and item_id = ${group.itemId}
    `;
    const row = cached[0];
    if (row && isFresh(row.checked_at, now)) {
      const inStock = asBool(row.in_stock);
      const checkedAt = asIso(row.checked_at) ?? new Date().toISOString();
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
      detail:
        changed === 0
          ? `Conferido há pouco. Nada novo para buscar.${extra}`
          : changed === 1
            ? `A Shopee mudou 1 oferta.${extra}`
            : `A Shopee mudou ${changed} ofertas.${extra}`,
    };
  }

  const credential = resolveAffiliateCredential(userId);
  if (!credential) {
    return {
      state: "not_configured",
      changed: 0,
      detail: "A conferência automática está desligada. O estoque marcado continua.",
    };
  }

  const queued = live.slice(0, LOOKUP_CAP);
  let sawDecision = false;
  for (let index = 0; index < queued.length; index += 1) {
    const group = queued[index];
    if (!group) continue;
    const lookup = await affiliateCatalog(credential, group.shopId, group.itemId);
    if (lookup.kind === "auth" || lookup.kind === "down" || lookup.kind === "rate_limited") {
      if (!sawDecision && index === 0) {
        return {
          state: lookup.kind === "auth" ? "rejected" : lookup.kind === "rate_limited" ? "throttled" : "unreachable",
          changed: 0,
          detail:
            lookup.kind === "auth"
              ? "A conferência automática está indisponível. O estoque marcado continua."
              : lookup.kind === "rate_limited"
                ? "A Shopee limitou as consultas agora. O estoque marcado continua."
                : "Não deu para falar com a Shopee agora. O estoque marcado continua.",
        };
      }
      continue;
    }
    sawDecision = true;
    const inStock = lookup.kind === "in";
    const checkedAt = new Date().toISOString();
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
  const detail =
    changed === 0
      ? `A Shopee confirmou o estoque. Nada mudou.${extra}`
      : changed === 1
        ? `A Shopee mudou 1 oferta.${extra}`
        : `A Shopee mudou ${changed} ofertas.${extra}`;
  return { state: "updated", changed, detail };
}
