import { Check, Copy } from "lucide-react";
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
    <Card padding={2} aria-label="Simulador do link">
      <VStack gap={3} padding={2}>
        <VStack gap={1}>
          <Text color="secondary" size="sm">
            {link.detail}
          </Text>
          <Heading level={2}>{link.title}</Heading>
          <Text hasTabularNumbers>
            {formatBrl(link.priceCents)}
            <Text as="span" color="accent" weight="semibold">
              {" "}
              · {link.commissionPct}% de comissão
            </Text>
          </Text>
        </VStack>

        {offers.map((offer, index) => {
          const chosen = resolution.status === "ok" && resolution.offer.id === offer.id;
          return (
            <Card key={offer.id} padding={3} elevation={chosen ? "low" : "none"}>
              <Switch
                label={`${index === 0 ? "Principal" : `Backup ${index}`}: ${offer.shop}`}
                description={offer.inStock ? "Em estoque" : "Sem estoque"}
                value={offer.inStock}
                onChange={() => toggle(offer.id)}
                width="100%"
              />
            </Card>
          );
        })}

        <VStack gap={2} padding={2}>
          <Text color="secondary" size="sm">
            Para onde o clique vai
          </Text>
          <Heading level={3}>{copy.title}</Heading>
          <Text color="secondary" size="sm">
            {copy.body}
          </Text>
        </VStack>
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
            label="Abrir link"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </VStack>
    </Card>
  );
}
