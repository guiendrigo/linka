//#region node_modules/.nitro/vite/services/ssr/assets/plans-BR9BKYkz.js
var LAST_VISIT_ROLES = [
	"primary",
	"fallback",
	"sold_out",
	"blocked"
];
function parseLastVisitRole(value) {
	if (typeof value !== "string") return null;
	return LAST_VISIT_ROLES.includes(value) ? value : null;
}
function visitStampFromPublic(visit) {
	if (visit.kind === "redirect") return {
		role: visit.role,
		shop: visit.shop
	};
	if (visit.kind === "sold_out" || visit.kind === "blocked") return {
		role: visit.kind,
		shop: null
	};
	return null;
}
function relativeVisitPt(iso, now = Date.now()) {
	const then = Date.parse(iso);
	if (!Number.isFinite(then)) return "";
	const delta = Math.max(0, now - then);
	const minutes = Math.floor(delta / 6e4);
	if (minutes < 1) return "agora";
	if (minutes < 60) return `há ${minutes} min`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `há ${hours} h`;
	const days = Math.floor(hours / 24);
	if (days === 1) return "ontem";
	if (days < 7) return `há ${days} dias`;
	return new Date(then).toLocaleDateString("pt-BR");
}
function lastVisitCopy(visit, now = Date.now()) {
	if (!visit) return "Ainda sem visita";
	const when = relativeVisitPt(visit.at, now);
	const tail = when ? ` · ${when}` : "";
	if (visit.role === "fallback" && visit.shop) return `Último clique caiu no backup · ${visit.shop}${tail}`;
	if (visit.role === "primary" && visit.shop) return `Último clique: ${visit.shop}${tail}`;
	if (visit.role === "sold_out") return `Último clique: esgotado${tail}`;
	if (visit.role === "blocked") return `Último clique: destino bloqueado${tail}`;
	return `Último clique${tail}`;
}
function productCap(opts) {
	if (!opts.billingEnabled) return null;
	return opts.isPro ? 10 : 1;
}
function canAddProduct(count, cap) {
	if (cap == null) return true;
	return count < cap;
}
function productCapError(opts) {
	if (!opts.isPro) return `Você tentou o ${opts.cap + 1}º achadinho. A conta grátis guarda ${opts.cap}. Ative o Pro para não perder o backup extra.`;
	return `O Pro guarda até ${opts.cap} achadinhos.`;
}
//#endregion
export { productCapError as a, productCap as i, lastVisitCopy as n, visitStampFromPublic as o, parseLastVisitRole as r, canAddProduct as t };
