import { getSql } from "../db.ts";
import { STOCK_FRESH_MS } from "./shopee.ts";
import { decideStock } from "./stock-check.server.ts";
import { loadWorkspace, type StockReport } from "./store.server.ts";

const stockCooldown = new Map<string, number>();

export type { StockReport };

export async function freshenForUser(
  userId: string,
  options?: { force?: boolean; productId?: string },
): Promise<StockReport> {
  const decision = await decideStock(userId, options);
  const view = await loadWorkspace(userId);
  return { ...decision, products: view.products };
}

export async function freshenForCode(code: string): Promise<void> {
  const until = stockCooldown.get(code) ?? 0;
  if (until > Date.now()) return;

  const sql = await getSql();
  const rows = await sql<{ id: string; user_id: string }>`
    select id, user_id from products where code = ${code}
  `;
  const product = rows[0];
  if (!product) return;

  const report = await freshenForUser(product.user_id, { productId: product.id, force: false });
  if (report.state === "rejected" || report.state === "unreachable" || report.state === "throttled") {
    stockCooldown.set(code, Date.now() + STOCK_FRESH_MS);
  }
}
