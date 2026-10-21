export type Offer = {
  id: string;
  /** Principal é sempre a primeira oferta da lista. */
  shop: string;
  url: string;
  inStock: boolean;
};

export type SmartLink = {
  code: string;
  title: string;
  detail: string;
  priceCents: number;
  commissionPct: number;
  offers: Offer[];
};

export type Resolution =
  | {
      status: "ok";
      role: "primary" | "fallback";
      hop: number;
      offer: Offer;
    }
  | { status: "empty" }
  | { status: "all_out" };
