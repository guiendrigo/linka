export type OfferDraft = {
  shop: string;
  url: string;
  inStock: boolean;
};

export type ProductDraft = {
  title: string;
  price: string;
  commission: string;
  offers: OfferDraft[];
};

export type CleanOffer = {
  shop: string;
  url: string;
  inStock: boolean;
};

export type CleanProduct = {
  title: string;
  priceCents: number;
  commissionPct: number;
  offers: CleanOffer[];
};

export function parseBrlToCents(input: string): number | null {
  let clean = input.trim().replace(/\s/g, "").replace(/^R\$/i, "");
  if (clean.includes(",")) clean = clean.replace(/\./g, "").replace(",", ".");
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(clean)) return null;
  const value = Number(clean);
  if (!Number.isFinite(value) || value <= 0 || value > 100_000) return null;
  return Math.round(value * 100);
}

export function centsToBrlInput(cents: number): string {
  const whole = Math.floor(cents / 100);
  const frac = String(cents % 100).padStart(2, "0");
  return `${whole},${frac}`;
}

export function cleanProduct(input: ProductDraft): CleanProduct {
  const title = input.title.trim().replace(/\s+/g, " ");
  if (title.length < 2 || title.length > 80) {
    throw new Error("O nome do produto precisa ter entre 2 e 80 caracteres.");
  }
  const priceCents = parseBrlToCents(input.price);
  if (priceCents === null) throw new Error("Informe o preço, como 39,90.");
  const commissionPct = Number(String(input.commission).trim());
  if (!Number.isInteger(commissionPct) || commissionPct < 0 || commissionPct > 80) {
    throw new Error("A comissão fica entre 0 e 80.");
  }
  if (!Array.isArray(input.offers) || input.offers.length < 1 || input.offers.length > 4) {
    throw new Error("Cadastre de 1 a 4 ofertas, começando pela principal.");
  }
  const offers = input.offers.map((offer, index) => {
    const shop = offer.shop.trim().replace(/\s+/g, " ");
    const url = offer.url.trim();
    if (shop.length < 2 || shop.length > 60) {
      throw new Error(`Dê um nome para a oferta ${index + 1}.`);
    }
    if (!/^https:\/\/[^\s]{8,480}$/.test(url)) {
      throw new Error(`A oferta ${index + 1} precisa de um link https.`);
    }
    return { shop, url, inStock: Boolean(offer.inStock) };
  });
  return { title, priceCents, commissionPct, offers };
}

export function productCode(title: string): string {
  const base = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
  const suffix = crypto.randomUUID().slice(0, 4);
  return `${base || "link"}-${suffix}`;
}
