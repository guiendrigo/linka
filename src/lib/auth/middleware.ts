import { createMiddleware } from "@tanstack/react-start";

/**
 * Auth middleware for server functions — verified `context.userId`.
 * Scope every per-user query by that id.
 */
export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const { assertSameSiteRequest } = await import("./isolation.server");
    const { requireUserId } = await import("./verify.server");
    assertSameSiteRequest();
    const userId = await requireUserId();
    return next({ context: { userId } });
  },
);
