import { n as authConfigured, t as auth } from "./server-BYlNVJNH.mjs";
import { o as getRequest } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify.server-DR0jlAHM.js
/**
* Server-side session resolution (server-only).
* Session cookie is same-origin `/api/auth/*` — never trust a client-supplied id.
*/
var databaseConfigured = Boolean(process.env.SQLITE_PATH?.trim());
if (databaseConfigured && !authConfigured) console.error("[auth] SQLITE_PATH is set but auth is disabled (VITE_AUTH_ENABLED=false) — requireUserId() will reject every request (fail closed).");
var DEV_USER_ID = "dev-user";
var UnauthorizedError = class extends Error {
	status = 401;
	constructor() {
		super("Unauthorized");
		this.name = "UnauthorizedError";
	}
};
async function getSessionUser() {
	if (!authConfigured) return null;
	const request = getRequest();
	if (!request) return null;
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session?.user) return null;
	return {
		id: session.user.id,
		email: session.user.email ?? null
	};
}
async function requireUserId() {
	if (!authConfigured) {
		if (databaseConfigured) throw new Error("Auth is disabled (VITE_AUTH_ENABLED=false) but SQLITE_PATH is set — refusing to fall back to the shared dev user.");
		return DEV_USER_ID;
	}
	const user = await getSessionUser();
	if (!user) throw new UnauthorizedError();
	return user.id;
}
//#endregion
export { requireUserId };
