/** True when Magalu/production has real Grok broker OAuth credentials. */
export function isBrokerConfigured(env: {
  GROK_AUTH_CLIENT_ID?: string | undefined;
  GROK_AUTH_CLIENT_SECRET?: string | undefined;
}): boolean {
  const id = env.GROK_AUTH_CLIENT_ID?.trim();
  const secret = env.GROK_AUTH_CLIENT_SECRET?.trim();
  return Boolean(id && secret);
}

type GoogleEnv = {
  GOOGLE_CLIENT_ID?: string | undefined;
  GOOGLE_CLIENT_SECRET?: string | undefined;
  GROK_AUTH_CLIENT_ID?: string | undefined;
  GROK_AUTH_CLIENT_SECRET?: string | undefined;
};

/** Native Google on Magalu: both Google secrets set, and the Grok broker is not. */
export function isGoogleConfigured(env: GoogleEnv): boolean {
  if (isBrokerConfigured(env)) return false;
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

/** Real auth is on when email/password or the Grok broker is configured. */
export function resolveAuthConfigured(options: {
  authDisabled: boolean;
  brokerConfigured: boolean;
  emailAndPasswordEnabled: boolean;
}): boolean {
  if (options.authDisabled) return false;
  return options.brokerConfigured || options.emailAndPasswordEnabled;
}

export function trustedOriginsFor(
  explicitBaseURL: string | undefined,
  localDevOrigins: string[],
  previewAllowedHosts: string[],
): string[] {
  if (explicitBaseURL) return [explicitBaseURL, ...localDevOrigins];
  return [
    ...previewAllowedHosts,
    ...previewAllowedHosts.flatMap((host) => [`https://${host}`, `http://${host}`]),
    ...localDevOrigins,
  ];
}

export function isSocialLoginEnabled(value: string | undefined): boolean {
  return value === "true";
}

/** Magalu image bakes this so `/login` can show native Google without broker X. */
export function isGoogleLoginEnabled(value: string | undefined): boolean {
  return value === "true";
}

export function loginPageFeatures(flags: {
  socialLogin?: string | undefined;
  googleLogin?: string | undefined;
  brokerLabels?: readonly string[];
}): {
  brokerLabels: string[];
  nativeGoogle: boolean;
  emailPassword: boolean;
} {
  const social = isSocialLoginEnabled(flags.socialLogin);
  return {
    brokerLabels: social ? [...(flags.brokerLabels ?? [])] : [],
    nativeGoogle: isGoogleLoginEnabled(flags.googleLogin) && !social,
    emailPassword: true,
  };
}
