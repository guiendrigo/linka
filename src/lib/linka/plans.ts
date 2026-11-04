/** Good-Better-Best num eixo só: quantidade de achadinhos. */

export const FREE_PRODUCT_CAP = 1;
export const PRO_PRODUCT_CAP = 10;

export type PlanTier = "free" | "pro";

export function productCap(opts: { billingEnabled: boolean; isPro: boolean }): number | null {
  if (!opts.billingEnabled) return null;
  return opts.isPro ? PRO_PRODUCT_CAP : FREE_PRODUCT_CAP;
}

export function canAddProduct(count: number, cap: number | null): boolean {
  if (cap == null) return true;
  return count < cap;
}

export function productCapError(opts: { isPro: boolean; cap: number }): string {
  if (!opts.isPro) {
    return `Você tentou o ${opts.cap + 1}º achadinho. A conta grátis guarda ${opts.cap}. Ative o Pro para não perder o backup extra.`;
  }
  return `O Pro guarda até ${opts.cap} achadinhos.`;
}
