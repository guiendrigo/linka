import { resolutionCopy, resolveSmartLink } from "./resolve.ts";
import type { SmartLink } from "./types.ts";

export type ProductListStatus = {
  label: "Em estoque" | "Esgotado" | "Sem destino";
  on: boolean;
};

export type ProductViewFields = {
  status: ProductListStatus;
  destinationTitle: string;
};

function toSmartLink(product: {
  code: string;
  title: string;
  priceCents: number;
  commissionPct: number;
  offers: { id: string; shop: string; url: string; inStock: boolean }[];
}): SmartLink {
  return {
    code: product.code,
    title: product.title,
    detail: "",
    priceCents: product.priceCents,
    commissionPct: product.commissionPct,
    offers: product.offers,
  };
}

export function productListStatus(product: Parameters<typeof toSmartLink>[0]): ProductListStatus {
  const resolution = resolveSmartLink(toSmartLink(product));
  if (resolution.status === "ok") {
    return { label: "Em estoque", on: true };
  }
  if (resolution.status === "all_out") {
    return { label: "Esgotado", on: false };
  }
  return { label: "Sem destino", on: false };
}

export function productDestinationTitle(product: Parameters<typeof toSmartLink>[0]): string {
  return resolutionCopy(resolveSmartLink(toSmartLink(product))).title;
}

export function productViewFields(product: Parameters<typeof toSmartLink>[0]): ProductViewFields {
  return {
    status: productListStatus(product),
    destinationTitle: productDestinationTitle(product),
  };
}
