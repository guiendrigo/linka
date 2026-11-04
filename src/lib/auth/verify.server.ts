import { getRequest } from "@tanstack/react-start/server";
import { auth, authConfigured } from "./server";

/**
 * Server-side session resolution (server-only).
 * Session cookie is same-origin `/api/auth/*` — never trust a client-supplied id.
 */

const databaseConfigured = Boolean(process.env.SQLITE_PATH?.trim());

export { authConfigured };

if (databaseConfigured && !authConfigured) {
  console.error(
    "[auth] SQLITE_PATH is set but auth is disabled (VITE_AUTH_ENABLED=false) " +
      "— requireUserId() will reject every request (fail closed).",
  );
}

export const DEV_USER_ID = "dev-user";

export class UnauthorizedError extends Error {
  readonly status = 401;
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export type VerifiedUser = { id: string; email: string | null };

export async function getSessionUser(): Promise<VerifiedUser | null> {
  if (!authConfigured) return null;
  const request = getRequest();
  if (!request) return null;
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return null;
  return { id: session.user.id, email: session.user.email ?? null };
}

export async function requireUserId(): Promise<string> {
  if (!authConfigured) {
    if (databaseConfigured) {
      throw new Error(
        "Auth is disabled (VITE_AUTH_ENABLED=false) but SQLITE_PATH is set — " +
          "refusing to fall back to the shared dev user.",
      );
    }
    return DEV_USER_ID;
  }
  const user = await getSessionUser();
  if (!user) throw new UnauthorizedError();
  return user.id;
}
