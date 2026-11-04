import type { PublicVisit } from "./public-resolve.ts";

export const LAST_VISIT_ROLES = ["primary", "fallback", "sold_out", "blocked"] as const;

export type LastVisitRole = (typeof LAST_VISIT_ROLES)[number];

export type LastVisit = {
  at: string;
  role: LastVisitRole;
  shop: string | null;
};

export function parseLastVisitRole(value: unknown): LastVisitRole | null {
  if (typeof value !== "string") return null;
  return (LAST_VISIT_ROLES as readonly string[]).includes(value) ? (value as LastVisitRole) : null;
}

export function visitStampFromPublic(visit: PublicVisit): Omit<LastVisit, "at"> | null {
  if (visit.kind === "redirect") {
    return { role: visit.role, shop: visit.shop };
  }
  if (visit.kind === "sold_out" || visit.kind === "blocked") {
    return { role: visit.kind, shop: null };
  }
  return null;
}

export function relativeVisitPt(iso: string, now = Date.now()): string {
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return "";
  const delta = Math.max(0, now - then);
  const minutes = Math.floor(delta / 60_000);
  if (minutes < 1) return "agora";
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "ontem";
  if (days < 7) return `há ${days} dias`;
  return new Date(then).toLocaleDateString("pt-BR");
}

export function lastVisitCopy(visit: LastVisit | null, now = Date.now()): string {
  if (!visit) return "Ainda sem visita";
  const when = relativeVisitPt(visit.at, now);
  const tail = when ? ` · ${when}` : "";
  if (visit.role === "fallback" && visit.shop) {
    return `Último clique caiu no backup · ${visit.shop}${tail}`;
  }
  if (visit.role === "primary" && visit.shop) {
    return `Último clique: ${visit.shop}${tail}`;
  }
  if (visit.role === "sold_out") return `Último clique: esgotado${tail}`;
  if (visit.role === "blocked") return `Último clique: destino bloqueado${tail}`;
  return `Último clique${tail}`;
}
