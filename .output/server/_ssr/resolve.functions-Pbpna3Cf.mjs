import { r as createServerFn } from "./ssr.mjs";
import { n as parsePublicCode } from "./public-resolve-DPQJgA-w.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resolve.functions-Pbpna3Cf.js
function parseResolveInput(data) {
	if (typeof data === "string") {
		const code = parsePublicCode(data);
		if (!code) throw new Error("Código inválido");
		return { code };
	}
	if (typeof data === "object" && data !== null && "code" in data) {
		const raw = data;
		const code = parsePublicCode(raw.code);
		if (!code) throw new Error("Código inválido");
		return {
			code,
			on: typeof raw.on === "string" ? raw.on : void 0
		};
	}
	throw new Error("Código inválido");
}
var resolveCode_createServerFn_handler = createServerRpc({
	id: "788efc79f993b15117f9c872ddcbda5cd3416d8baa7cabeb89bab2ef4a75b979",
	name: "resolveCode",
	filename: "src/lib/linka/resolve.functions.ts"
}, (opts) => resolveCode.__executeServer(opts));
var resolveCode = createServerFn({ method: "GET" }).validator((data) => parseResolveInput(data)).handler(resolveCode_createServerFn_handler, async ({ data }) => {
	const { decideStoredVisit } = await import("./public-resolve.server-YPaSNP0x.mjs");
	return decideStoredVisit(data.code, { on: data.on });
});
//#endregion
export { resolveCode_createServerFn_handler };
