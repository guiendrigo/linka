type GoogleEnv = {
  GOOGLE_CLIENT_ID?: string | undefined;
  GOOGLE_CLIENT_SECRET?: string | undefined;
};

/** Native Google: both Google secrets set. */
export function isGoogleConfigured(env: GoogleEnv): boolean {
  const id = env.GOOGLE_CLIENT_ID?.trim();
  const secret = env.GOOGLE_CLIENT_SECRET?.trim();
  return Boolean(id && secret);
}

/** Better Auth `socialProviders` fragment, or undefined when native Google is off. */
export function nativeGoogleSocialProviders(
  env: GoogleEnv,
): { google: { clientId: string; clientSecret: string } } | undefined {
  if (!isGoogleConfigured(env)) return undefined;
  const clientId = env.GOOGLE_CLIENT_ID?.trim() ?? "";
  const clientSecret = env.GOOGLE_CLIENT_SECRET?.trim() ?? "";
  return { google: { clientId, clientSecret } };
}

/** Real auth is on when email/password or Google secrets are configured. */
export function resolveAuthConfigured(options: {
  authDisabled: boolean;
  emailAndPasswordEnabled: boolean;
  googleConfigured?: boolean;
}): boolean {
  if (options.authDisabled) return false;
  return options.emailAndPasswordEnabled || Boolean(options.googleConfigured);
}

export function trustedOriginsFor(
  explicitBaseURL: string | undefined,
  localDevOrigins: string[],
): string[] {
  if (explicitBaseURL) return [explicitBaseURL, ...localDevOrigins];
  return [...localDevOrigins];
}

/** Magalu image bakes this so `/login` can show native Google. */
export function isGoogleLoginEnabled(value: string | undefined): boolean {
  return value === "true";
}

export function loginPageFeatures(flags: {
  googleLogin?: string | undefined;
}): {
  nativeGoogle: boolean;
  emailPassword: boolean;
} {
  return {
    nativeGoogle: isGoogleLoginEnabled(flags.googleLogin),
    emailPassword: true,
  };
}
