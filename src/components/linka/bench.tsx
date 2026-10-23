import { Check, Copy, ExternalLink, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Switch } from "@astryxdesign/core/Switch";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
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
    <Card padding={4} aria-label="Simulador do link inteligente">
      <VStack gap={4}>
        <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-accent)]">
            <Sparkles size={14} aria-hidden="true" />
            <span>Simulador ao vivo de Achadinho</span>
          </div>
          <span className="rounded bg-[var(--color-accent-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-text-accent)]">
            Alterne o estoque abaixo
          </span>
        </div>

        <VStack gap={1}>
          <Heading level={2}>{link.title}</Heading>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {formatBrl(link.priceCents)}
            </span>
            <span className="inline-flex items-center rounded-full bg-[var(--color-accent-muted)] px-2 py-0.5 text-xs font-semibold text-[var(--color-text-accent)]">
              {link.commissionPct}% de comissão estimada
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
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-muted)]/20 shadow-xs"
                    : !offer.inStock
                      ? "border-[var(--color-border)] bg-[var(--color-background-body)]/50 opacity-75"
                      : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
                        {roleLabel}
                      </span>
                      {isChosen ? (
                        <span className="inline-flex items-center gap-1 rounded bg-[var(--color-accent)] px-1.5 py-0.2 text-[10px] font-bold text-white uppercase">
                          O clique cai aqui
                        </span>
                      ) : null}
                    </div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">
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

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3.5">
          <Text size="sm" color="secondary">
            Destino da visita agora
          </Text>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-base font-semibold text-[var(--color-text-primary)]">
              {copy.title}
            </span>
          </div>
          <Text size="sm" color="secondary" className="mt-0.5">
            {copy.body}
          </Text>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            width="100%"
            icon={copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            label={copied ? "Copiado!" : "Copiar link"}
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
