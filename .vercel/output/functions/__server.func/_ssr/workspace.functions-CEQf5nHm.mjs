import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { n as cleanCredentials, r as cleanProduct } from "./input-Bpl--re0.mjs";
import { t as authMiddleware } from "./middleware-l5McdudQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace.functions-CEQf5nHm.js
var getWorkspace_createServerFn_handler = createServerRpc({
	id: "059bf76fbf611564222d39fd40694a844bb8b9c432118bb9386713e7f2bd5858",
	name: "getWorkspace",
	filename: "src/lib/linka/workspace.functions.ts"
}, (opts) => getWorkspace.__executeServer(opts));
var getWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getWorkspace_createServerFn_handler, async ({ context }) => {
	const { loadWorkspace } = await import("./store.server-Bhpnefho.mjs");
	return loadWorkspace(context.userId);
});
var saveShopeeCredentials_createServerFn_handler = createServerRpc({
	id: "0d9edb24912bf74ff8eb3c3dc091c6158d57aa24d3943f44ee39a54e02a4cc75",
	name: "saveShopeeCredentials",
	filename: "src/lib/linka/workspace.functions.ts"
}, (opts) => saveShopeeCredentials.__executeServer(opts));
var saveShopeeCredentials = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	return cleanCredentials({
		appId: typeof body.appId === "string" ? body.appId : "",
		secret: typeof body.secret === "string" ? body.secret : ""
	});
}).handler(saveShopeeCredentials_createServerFn_handler, async ({ context, data }) => {
	const { saveCredentials } = await import("./store.server-Bhpnefho.mjs");
	await saveCredentials(context.userId, data.appId, data.secret);
	return { ok: true };
});
var removeShopeeCredentials_createServerFn_handler = createServerRpc({
	id: "c590ff26469ceb1746a3dee0f48599fec089320022a0f3b4fbef5bfaef737942",
	name: "removeShopeeCredentials",
	filename: "src/lib/linka/workspace.functions.ts"
}, (opts) => removeShopeeCredentials.__executeServer(opts));
var removeShopeeCredentials = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(removeShopeeCredentials_createServerFn_handler, async ({ context }) => {
	const { clearCredentials } = await import("./store.server-Bhpnefho.mjs");
	await clearCredentials(context.userId);
	return { ok: true };
});
var addProduct_createServerFn_handler = createServerRpc({
	id: "156a2ae191035dc24aa4bacb36604d42939c5258c199d79dca1556b5d0bfdd60",
	name: "addProduct",
	filename: "src/lib/linka/workspace.functions.ts"
}, (opts) => addProduct.__executeServer(opts));
var addProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	const offers = Array.isArray(body.offers) ? body.offers.map(asOffer) : [];
	return cleanProduct({
		title: typeof body.title === "string" ? body.title : "",
		price: typeof body.price === "string" ? body.price : "",
		commission: typeof body.commission === "string" ? body.commission : "",
		offers
	});
}).handler(addProduct_createServerFn_handler, async ({ context, data }) => {
	const { createProduct } = await import("./store.server-Bhpnefho.mjs");
	return createProduct(context.userId, data);
});
var editProduct_createServerFn_handler = createServerRpc({
	id: "18987b496d6b14e6a61a3212798aaf76c93e6f7de9691a41017a62d4309bef47",
	name: "editProduct",
	filename: "src/lib/linka/workspace.functions.ts"
}, (opts) => editProduct.__executeServer(opts));
var editProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) throw new Error("Produto inválido.");
	const offers = Array.isArray(body.offers) ? body.offers.map(asOffer) : [];
	return {
		id: body.id,
		product: cleanProduct({
			title: typeof body.title === "string" ? body.title : "",
			price: typeof body.price === "string" ? body.price : "",
			commission: typeof body.commission === "string" ? body.commission : "",
			offers
		})
	};
}).handler(editProduct_createServerFn_handler, async ({ context, data }) => {
	const { updateProduct } = await import("./store.server-Bhpnefho.mjs");
	return updateProduct(context.userId, data.id, data.product);
});
var refreshStock_createServerFn_handler = createServerRpc({
	id: "68345f626e4549d1e4b2b91c89e7522060736110c3875b614d804a8f697d05e3",
	name: "refreshStock",
	filename: "src/lib/linka/workspace.functions.ts"
}, (opts) => refreshStock.__executeServer(opts));
var refreshStock = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ force: asRecord(data).force === true })).handler(refreshStock_createServerFn_handler, async ({ context, data }) => {
	const { checkStock } = await import("./store.server-Bhpnefho.mjs");
	return checkStock(context.userId, { force: data.force });
});
var removeProduct_createServerFn_handler = createServerRpc({
	id: "69f981afc6d36ff09e64dde6147fee619233451a99f592843859d13fd9d3fba1",
	name: "removeProduct",
	filename: "src/lib/linka/workspace.functions.ts"
}, (opts) => removeProduct.__executeServer(opts));
var removeProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const id = asRecord(data).id;
	if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Produto inválido.");
	return id;
}).handler(removeProduct_createServerFn_handler, async ({ context, data }) => {
	const { deleteProduct } = await import("./store.server-Bhpnefho.mjs");
	await deleteProduct(context.userId, data);
	return { ok: true };
});
var toggleOfferStock_createServerFn_handler = createServerRpc({
	id: "d1ca61e51831a5144615f1a875a3648c530cb6fd4ccc502959ae70e645cb4b7b",
	name: "toggleOfferStock",
	filename: "src/lib/linka/workspace.functions.ts"
}, (opts) => toggleOfferStock.__executeServer(opts));
var toggleOfferStock = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) throw new Error("Oferta inválida.");
	if (typeof body.inStock !== "boolean") throw new Error("Estoque inválido.");
	return {
		id: body.id,
		inStock: body.inStock
	};
}).handler(toggleOfferStock_createServerFn_handler, async ({ context, data }) => {
	const { setOfferStock } = await import("./store.server-Bhpnefho.mjs");
	await setOfferStock(context.userId, data.id, data.inStock);
	return { ok: true };
});
function asRecord(data) {
	if (!data || typeof data !== "object" || Array.isArray(data)) return {};
	return data;
}
function asOffer(value) {
	const body = asRecord(value);
	return {
		shop: typeof body.shop === "string" ? body.shop : "",
		url: typeof body.url === "string" ? body.url : "",
		inStock: body.inStock !== false
	};
}
//#endregion
export { addProduct_createServerFn_handler, editProduct_createServerFn_handler, getWorkspace_createServerFn_handler, refreshStock_createServerFn_handler, removeProduct_createServerFn_handler, removeShopeeCredentials_createServerFn_handler, saveShopeeCredentials_createServerFn_handler, toggleOfferStock_createServerFn_handler };
