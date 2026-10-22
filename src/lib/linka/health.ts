export type HealthBody = { ok: true; service: "linka" } | { ok: false; service: "linka" };

export async function probeHealth(run: () => Promise<unknown>): Promise<HealthBody> {
  try {
    await run();
    return { ok: true, service: "linka" };
  } catch {
    return { ok: false, service: "linka" };
  }
}

export async function probeSql(sql: { query: (text: string) => Promise<unknown> }): Promise<HealthBody> {
  return probeHealth(() => sql.query("select 1"));
}
