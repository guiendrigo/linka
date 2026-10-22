//#region node_modules/.nitro/vite/services/ssr/assets/catalog-CFJ_kwzB.js
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
//#endregion
export { findLink as n, DEMO_CODE as t };
