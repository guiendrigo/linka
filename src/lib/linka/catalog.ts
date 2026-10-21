import type { SmartLink } from "@/lib/linka/types";

const LINKS: SmartLink[] = [
  {
    code: "serum-c",
    title: "Sérum vitamina C 30 ml",
    detail: "Oferta de exemplo · ainda sem a sua loja",
    priceCents: 3990,
    commissionPct: 18,
    offers: [
      {
        id: "aurora",
        shop: "Loja Aurora",
        url: "https://shopee.com.br/serum-vitamina-c-aurora",
        inStock: false,
      },
      {
        id: "norte",
        shop: "Loja Norte",
        url: "https://shopee.com.br/serum-vitamina-c-norte",
        inStock: true,
      },
      {
        id: "leste",
        shop: "Loja Leste",
        url: "https://shopee.com.br/serum-vitamina-c-leste",
        inStock: true,
      },
    ],
  },
];

export function findLink(code: string): SmartLink | undefined {
  const link = LINKS.find((item) => item.code === code);
  if (!link) return undefined;
  return {
    ...link,
    offers: link.offers.map((offer) => ({ ...offer })),
  };
}

export const DEMO_CODE = "serum-c";
