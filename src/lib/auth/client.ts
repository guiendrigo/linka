import { createAuthClient } from "better-auth/react";
import { isGoogleLoginEnabled } from "./auth-config";

/**
 * Better Auth client — same-origin `/api/auth/*`, cookie session.
 */
export const authClient = createAuthClient({});

export const authEnabled = import.meta.env.VITE_AUTH_ENABLED !== "false";

export const googleLoginEnabled = isGoogleLoginEnabled(
  import.meta.env.VITE_GOOGLE_LOGIN,
);

/** Native Google redirect (Better Auth socialProviders). */
export async function signInGoogle(
  opts: { callbackURL?: string; errorCallbackURL?: string } = {},
): Promise<void> {
  const callbackURL = opts.callbackURL ?? "/";
  const errorCallbackURL = opts.errorCallbackURL ?? "/";
  await authClient.signOut().catch(() => undefined);
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL,
    errorCallbackURL,
  });
  if (error) throw new Error(error.message ?? "Sign-in failed");
  if (data?.url) window.location.href = data.url;
}

/** @deprecated Use signInGoogle — kept for call sites that passed providerId. */
export async function signIn(
  providerId: string,
  opts: { callbackURL?: string; errorCallbackURL?: string } = {},
): Promise<void> {
  if (providerId !== "google") {
    throw new Error(`Unknown provider: ${providerId}`);
  }
  return signInGoogle(opts);
}

export async function signOut(redirectTo = "/"): Promise<void> {
  const { error } = await authClient.signOut();
  if (error) throw new Error(error.message ?? "Sign-out failed");
  window.location.href = redirectTo;
}
