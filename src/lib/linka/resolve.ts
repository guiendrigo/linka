import { DEMO_CODE } from "./catalog.ts";
import type { Resolution, SmartLink } from "./types.ts";

/**
 * Escolhe o destino de um link inteligente.
 * A primeira oferta em estoque ganha. Sem estoque em nenhuma, o clique não sai.
 * A mesma função serve a bancada, a página do visitante e a rota de API.
 */
export function resolveSmartLink(link: SmartLink): Resolution {
  if (link.offers.length === 0) return { status: "empty" };

  const hop = link.offers.findIndex((offer) => offer.inStock);
  if (hop === -1) return { status: "all_out" };

  const offer = link.offers[hop];
  if (!offer) return { status: "all_out" };

  return {
    status: "ok",
    role: hop === 0 ? "primary" : "fallback",
    hop,
    offer,
  };
}

export function withStock(link: SmartLink, on: string | undefined): SmartLink {
  if (on === undefined) return link;
  const allowed = new Set(on.split(",").filter(Boolean));
  return {
    ...link,
    offers: link.offers.map((offer) => ({ ...offer, inStock: allowed.has(offer.id) })),
  };
}

/** `?on=` só mexe no simulador. Produto gravado usa o estoque persistido. */
export function visitorStock(code: string, link: SmartLink, on: string | undefined): SmartLink {
  if (code !== DEMO_CODE) return link;
  return withStock(link, on);
}

export function stockQuery(offers: { id: string; inStock: boolean }[]): string {
  return offers
    .filter((offer) => offer.inStock)
    .map((offer) => offer.id)
    .join(",");
}

export function formatBrl(cents: number): string {
  const safe = Number.isFinite(cents) ? Math.max(0, Math.round(cents)) : 0;
  const reais = Math.floor(safe / 100);
  const frac = String(safe % 100).padStart(2, "0");
  const grouped = reais.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${grouped},${frac}`;
}

export function resolutionCopy(resolution: Resolution): { title: string; body: string } {
  if (resolution.status === "empty") {
    return {
      title: "Link sem ofertas",
      body: "Não há destino cadastrado. O visitante não é enviado a lugar nenhum.",
    };
  }
  if (resolution.status === "all_out") {
    return {
      title: "Nada em estoque",
      body: "Principal e backups acabaram. O visitante vê que a oferta esgotou, em vez de cair numa página morta.",
    };
  }
  if (resolution.role === "primary") {
    return {
      title: resolution.offer.shop,
      body: "A oferta principal está disponível. O visitante segue direto para ela.",
    };
  }
  return {
    title: resolution.offer.shop,
    body: "A principal está sem estoque. O clique segue para o primeiro backup disponível.",
  };
}

/** URL https para onde o clique deve ir. Qualquer outra coisa fica na página. */
export function redirectTarget(resolution: Resolution): string | null {
  if (resolution.status !== "ok") return null;
  const url = resolution.offer.url.trim();
  if (!url.startsWith("https://") || /\s/.test(url)) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) return null;
    return url;
  } catch {
    return null;
  }
}
