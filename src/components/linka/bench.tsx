import { Check, Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Card, Heading, Switch, Text, VStack } from "@/components/linka/ui";
import { HopNow } from "@/components/linka/hop-now";
import { DEMO_CODE, findLink } from "@/lib/linka/catalog";
import { formatBrl, resolutionCopy, resolveSmartLink, stockQuery } from "@/lib/linka/resolve";
import type { Offer } from "@/lib/linka/types";
import { previewPathPrefix } from "@/lib/preview-path-prefix";

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
    <Card padding={5} aria-label="Simulador do link inteligente">
      <VStack gap={5}>
        <div className="flex items-baseline justify-between gap-3 border-b border-[var(--color-border)] pb-3">
          <Text size="sm" color="secondary">
            Simulador
          </Text>
          <Text size="sm" color="secondary">
            Marque o estoque
          </Text>
        </div>

        <VStack gap={1}>
          <Heading level={2}>{link.title}</Heading>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-2xl font-medium tabular-nums text-[var(--color-text-primary)]">
              {formatBrl(link.priceCents)}
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {link.commissionPct}% de comissão
            </span>
          </div>
        </VStack>

        <VStack gap={2}>
          {offers.map((offer, index) => {
            const isChosen = resolution.status === "ok" && resolution.offer.id === offer.id;
            const roleLabel = index === 0 ? "Oferta principal" : `Backup ${index}`;
            return (
              <div
                key={offer.id}
                className={`rounded-xl border p-3 transition-colors ${
                  isChosen
                    ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                } ${offer.inStock ? "" : "opacity-60"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--color-text-secondary)]">{roleLabel}</span>
                      {isChosen ? <HopNow /> : null}
                    </div>
                    <div className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                      {offer.shop}
                    </div>
                  </div>
                  <Switch
                    label={offer.inStock ? "Em estoque" : "Esgotado"}
                    value={offer.inStock}
                    onChange={() => toggle(offer.id)}
                  />
                </div>
              </div>
            );
          })}
        </VStack>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-4">
          <Text size="sm" color="secondary">
            Destino da visita
          </Text>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-base font-medium text-[var(--color-text-primary)]">{copy.title}</span>
            {resolution.status === "ok" ? <HopNow /> : null}
          </div>
          <Text size="sm" color="secondary" className="mt-1">
            {copy.body}
          </Text>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            width="100%"
            icon={copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            label={copied ? "Copiado" : "Copiar link"}
            onClick={copyLink}
          />
          <Button
            href={`/r/${DEMO_CODE}?on=${encodeURIComponent(on)}`}
            variant="secondary"
            icon={<ExternalLink size={16} aria-hidden="true" />}
            label="Testar clique"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </VStack>
    </Card>
  );
}
