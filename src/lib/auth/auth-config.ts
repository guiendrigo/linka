/** True when Magalu/production has real Grok broker OAuth credentials. */
export function isBrokerConfigured(env: {
  GROK_AUTH_CLIENT_ID?: string | undefined;
  GROK_AUTH_CLIENT_SECRET?: string | undefined;
}): boolean {
  const id = env.GROK_AUTH_CLIENT_ID?.trim();
  const secret = env.GROK_AUTH_CLIENT_SECRET?.trim();
  return Boolean(id && secret);
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
