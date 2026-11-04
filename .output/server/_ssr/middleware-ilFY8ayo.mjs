import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/middleware-ilFY8ayo.js
/**
* Auth middleware for server functions — verified `context.userId`.
* Scope every per-user query by that id.
*/
var authMiddleware = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-DR0jlAHM.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId() } });
});
//#endregion
export { authMiddleware as t };
