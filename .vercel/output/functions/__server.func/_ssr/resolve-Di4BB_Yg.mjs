//#region node_modules/.nitro/vite/services/ssr/assets/resolve-Di4BB_Yg.js
var LINKS = [{
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
			inStock: false
		},
		{
			id: "norte",
			shop: "Loja Norte",
			url: "https://shopee.com.br/serum-vitamina-c-norte",
			inStock: true
		},
		{
			id: "leste",
			shop: "Loja Leste",
			url: "https://shopee.com.br/serum-vitamina-c-leste",
			inStock: true
		}
	]
}];
function findLink(code) {
	const link = LINKS.find((item) => item.code === code);
	if (!link) return void 0;
	return {
		...link,
		offers: link.offers.map((offer) => ({ ...offer }))
	};
}
var DEMO_CODE = "serum-c";
/**
* Escolhe o destino de um link inteligente.
* A primeira oferta em estoque ganha. Sem estoque em nenhuma, o clique não sai.
* A mesma função serve a bancada, a página do visitante e a rota de API.
*/
function resolveSmartLink(link) {
	if (link.offers.length === 0) return { status: "empty" };
	const hop = link.offers.findIndex((offer) => offer.inStock);
	if (hop === -1) return { status: "all_out" };
	const offer = link.offers[hop];
	if (!offer) return { status: "all_out" };
	return {
		status: "ok",
		role: hop === 0 ? "primary" : "fallback",
		hop,
		offer
	};
}
function withStock(link, on) {
	if (on === void 0) return link;
	const allowed = new Set(on.split(",").filter(Boolean));
	return {
		...link,
		offers: link.offers.map((offer) => ({
			...offer,
			inStock: allowed.has(offer.id)
		}))
	};
}
function stockQuery(offers) {
	return offers.filter((offer) => offer.inStock).map((offer) => offer.id).join(",");
}
function formatBrl(cents) {
	const safe = Number.isFinite(cents) ? Math.max(0, Math.round(cents)) : 0;
	const reais = Math.floor(safe / 100);
	const frac = String(safe % 100).padStart(2, "0");
	return `R$ ${reais.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${frac}`;
}
function resolutionCopy(resolution) {
	if (resolution.status === "empty") return {
		title: "Link sem ofertas",
		body: "Não há destino cadastrado. O visitante não é enviado a lugar nenhum."
	};
	if (resolution.status === "all_out") return {
		title: "Nada em estoque",
		body: "Principal e backups acabaram. O visitante vê que a oferta esgotou, em vez de cair numa página morta."
	};
	if (resolution.role === "primary") return {
		title: resolution.offer.shop,
		body: "A oferta principal está disponível. O visitante segue direto para ela."
	};
	return {
		title: resolution.offer.shop,
		body: "A principal está sem estoque. O clique segue para o primeiro backup disponível."
	};
}
//#endregion
export { resolveSmartLink as a, resolutionCopy as i, findLink as n, stockQuery as o, formatBrl as r, withStock as s, DEMO_CODE as t };
