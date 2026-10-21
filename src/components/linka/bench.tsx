import { Link } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { DEMO_CODE, findLink } from "@/lib/linka/catalog";
import { formatBrl, resolutionCopy, resolveSmartLink, stockQuery } from "@/lib/linka/resolve";
import type { Offer } from "@/lib/linka/types";
import { previewPathPrefix } from "@/lib/preview-path-prefix";
import { cn } from "@/lib/cn";

const seed = findLink(DEMO_CODE);

export function Bench() {
  const [offers, setOffers] = useState<Offer[]>(() => seed?.offers ?? []);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  if (!seed) return null;

  const link = { ...seed, offers };
  const resolution = resolveSmartLink(link);
  const copy = resolutionCopy(resolution);
  const on = stockQuery(offers);

  async function copyLink() {
    const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
    const url = `${window.location.origin}${prefix}/r/${DEMO_CODE}?on=${encodeURIComponent(on)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function toggle(id: string) {
    setOffers((current) =>
      current.map((offer) => (offer.id === id ? { ...offer, inStock: !offer.inStock } : offer)),
    );
  }

  return (
    <section aria-label="Simulador do link" className="rounded-3xl bg-surface p-2 shadow-ring">
      <div className="rounded-2xl bg-surface-2 px-4 py-4">
        <p className="text-sm text-muted">{link.detail}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{link.title}</h2>
        <p className="mt-3 flex items-baseline justify-between gap-3">
          <span className="font-display text-xl tabular-nums">{formatBrl(link.priceCents)}</span>
          <span className="text-sm font-semibold text-primary tabular-nums">
            {link.commissionPct}% de comissão
          </span>
        </p>
      </div>

      <ul className="flex flex-col gap-2 p-2">
        {offers.map((offer, index) => {
          const chosen = resolution.status === "ok" && resolution.offer.id === offer.id;
          return (
            <li key={offer.id}>
              <button
                type="button"
                role="switch"
                aria-checked={offer.inStock}
                aria-label={`${index === 0 ? "Principal" : "Backup"}, ${offer.shop}, ${offer.inStock ? "em estoque" : "sem estoque"}`}
                onClick={() => toggle(offer.id)}
                className={cn(
                  "flex min-h-16 w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  chosen ? "bg-bg shadow-ring-strong" : "bg-bg/40",
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold tracking-wide text-muted uppercase">
                    {index === 0 ? "Principal" : `Backup ${index}`}
                  </span>
                  <span className="mt-0.5 block truncate font-medium">{offer.shop}</span>
                </span>
                <span className={cn("text-sm", offer.inStock ? "text-fg" : "text-muted")}>
                  {offer.inStock ? "Em estoque" : "Sem estoque"}
                </span>
                <StockTrack on={offer.inStock} />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="px-2 pb-2">
        <div className="rounded-2xl bg-bg px-4 py-4">
          <p className="text-sm text-muted">Para onde o clique vai</p>
          <p className="mt-1 font-display text-2xl font-semibold">{copy.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{copy.body}</p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Button onClick={copyLink} className="w-full">
            {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
            {copied ? "Copiado" : "Copiar link"}
          </Button>
          <Link
            to="/r/$code"
            params={{ code: DEMO_CODE }}
            search={{ on }}
            target="_blank"
            rel="noopener noreferrer"
            preload={false}
            className={buttonVariants({ variant: "ghost" })}
          >
            Abrir link
          </Link>
        </div>
      </div>
    </section>
  );
}

function StockTrack({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150",
        on ? "bg-primary" : "bg-border",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-6 rounded-full bg-fg transition-transform duration-150",
          on ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </span>
  );
}
