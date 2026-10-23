import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Plus,
  RefreshCw,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Banner } from "@astryxdesign/core/Banner";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Switch } from "@astryxdesign/core/Switch";
import { Text } from "@astryxdesign/core/Text";
import { TextArea } from "@astryxdesign/core/TextArea";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { SidePanel } from "@/components/linka/side-panel";
import { PHOTO_MAX_BYTES } from "@/lib/linka/bio";
import { formatBrl, resolutionCopy, resolveSmartLink } from "@/lib/linka/resolve";
import { centsToBrlInput, type OfferDraft } from "@/lib/linka/input";
import { previewPathPrefix } from "@/lib/preview-path-prefix";
import type { BioPageView, WorkspaceProduct } from "@/lib/linka/store.server";
import {
  addProduct,
  editProduct,
  refreshStock,
  removeProduct,
  saveBioPage,
  saveBioPagePhoto,
  setBioVisible,
} from "@/lib/linka/workspace.functions";

type OfferRow = OfferDraft & { key: string };

function offerRow(partial?: Partial<OfferDraft> & { key?: string }): OfferRow {
  return {
    key: partial?.key ?? crypto.randomUUID(),
    shop: partial?.shop ?? "",
    url: partial?.url ?? "",
    inStock: partial?.inStock ?? true,
  };
}

function blankOffers(): OfferRow[] {
  return [offerRow(), offerRow()];
}

function stockOf(product: WorkspaceProduct) {
  const resolution = resolveSmartLink({
    code: product.code,
    title: product.title,
    detail: "",
    priceCents: product.priceCents,
    commissionPct: product.commissionPct,
    offers: product.offers,
  });
  const copy = resolutionCopy(resolution);
  const status =
    resolution.status === "ok"
      ? { label: "Em estoque", on: true }
      : resolution.status === "all_out"
        ? { label: "Esgotado", on: false }
        : { label: "Sem destino", on: false };
  return { copy, status, resolution };
}

export function WorkspacePending({ error }: { error: string | null }) {
  return (
    <div aria-busy={!error}>
      {error ? (
        <Banner status="error" title={error} />
      ) : (
        <div className="h-40 animate-pulse rounded-3xl bg-[var(--color-surface)]" />
      )}
    </div>
  );
}

function BioBlock({ bio, onChange }: { bio: BioPageView; onChange: (next: BioPageView) => void }) {
  const [title, setTitle] = useState(bio.title);
  const [description, setDescription] = useState(bio.description);
  const [pending, setPending] = useState(false);
  const [photoPending, setPhotoPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [photoNonce, setPhotoNonce] = useState(0);

  useEffect(() => {
    setTitle(bio.title);
    setDescription(bio.description);
  }, [bio.code, bio.title, bio.description]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function save(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const next = await saveBioPage({ data: { title, description } });
      onChange(next);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setPending(false);
    }
  }

  async function copyAddress() {
    const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${prefix}/p/${bio.code}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function onPhoto(file: File | undefined) {
    if (!file) return;
    setPhotoPending(true);
    setError(null);
    try {
      if (file.size > PHOTO_MAX_BYTES) {
        throw new Error("A foto precisa ter no máximo 1 MB.");
      }
      const image = await readFileAsDataUrl(file);
      const next = await saveBioPagePhoto({ data: { image } });
      setPhotoNonce(Date.now());
      onChange(next);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setPhotoPending(false);
    }
  }

  const prefix =
    typeof window === "undefined"
      ? ""
      : (previewPathPrefix(window.location.hostname, window.location.pathname) ?? "");
  const photoSrc = `${prefix}/p/${bio.code}/photo${photoNonce ? `?t=${photoNonce}` : ""}`;
  const bioUrl = `${prefix}/p/${bio.code}`;

  return (
    <Card padding={4}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative grid size-20 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full border-2 border-[var(--color-border)] bg-[var(--color-background-body)] shadow-sm hover:border-[var(--color-accent)] transition-colors">
          {bio.hasPhoto ? (
            <img src={photoSrc} alt={bio.title} className="size-20 rounded-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-0.5 text-center">
              <ShoppingBag size={20} className="text-[var(--color-text-secondary)]" />
              <span className="text-[10px] font-medium text-[var(--color-text-secondary)]">Foto</span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            disabled={photoPending}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              void onPhoto(file);
            }}
          />
          <span className="sr-only">{photoPending ? "Enviando foto…" : "Enviar foto de perfil"}</span>
        </label>

        <VStack gap={1} className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[var(--color-text-primary)]">
              {bio.title || "Sua página da bio"}
            </span>
          </div>
          <div className="text-xs text-[var(--color-text-secondary)]">
            Endereço público: <span className="font-mono text-[var(--color-text-primary)]">/p/{bio.code}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button
              variant="secondary"
              icon={copied ? <Check size={16} /> : <Copy size={16} />}
              label={copied ? "Copiado!" : "Copiar link da bio"}
              onClick={copyAddress}
            />
            <Button
              variant="ghost"
              href={bioUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ExternalLink size={16} />}
              label="Abrir bio"
            />
          </div>
        </VStack>
      </div>

      <form className="mt-4 border-t border-[var(--color-border)] pt-4" onSubmit={save}>
        <VStack gap={3}>
          <TextInput
            label="Nome da página ou perfil"
            value={title}
            onChange={setTitle}
            placeholder="Ex: Achadinhos da Mari · Shopee"
            width="100%"
          />
          <TextArea
            label="Descrição para seus seguidores"
            value={description}
            onChange={setDescription}
            placeholder="Ex: As melhores ofertas e achados da Shopee testados por mim!"
            rows={2}
            width="100%"
          />
          {error ? <Banner status="error" title={error} /> : null}
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              isDisabled={pending || photoPending}
              isLoading={pending}
              label={pending ? "Salvando…" : "Salvar informações da bio"}
            />
          </div>
        </VStack>
      </form>
    </Card>
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Não deu para ler a foto."));
    reader.readAsDataURL(file);
  });
}

export function LinksPanel({
  bio,
  products,
  canCheck,
  onChange,
  composing,
  composeNonce,
  onComposingChange,
}: {
  bio: BioPageView;
  products: WorkspaceProduct[];
  canCheck: boolean;
  onChange: (next: { bio?: BioPageView; products?: WorkspaceProduct[] }) => void;
  composing: boolean;
  composeNonce: number;
  onComposingChange: (open: boolean) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [commission, setCommission] = useState("12");
  const [offers, setOffers] = useState<OfferRow[]>(blankOffers);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [checkNote, setCheckNote] = useState<string | null>(null);
  const [checkAlert, setCheckAlert] = useState(false);

  useEffect(() => {
    if (!canCheck || products.length === 0) return;
    let stop = false;
    void runCheck(false);
    const id = window.setInterval(() => {
      if (!stop) void runCheck(false);
    }, 15 * 60 * 1000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [canCheck, products.length === 0]);

  useEffect(() => {
    if (composeNonce === 0) return;
    setEditingId(null);
    setTitle("");
    setPrice("");
    setCommission("12");
    setOffers(blankOffers());
    setError(null);
    setConfirmId(null);
  }, [composeNonce]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(null), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const payload = {
        title,
        price,
        commission,
        offers: offers.map(({ shop, url, inStock }) => ({ shop, url, inStock })),
      };
      const product = editingId
        ? await editProduct({ data: { id: editingId, ...payload } })
        : await addProduct({ data: payload });
      onChange({
        products: editingId
          ? products.map((item) => (item.id === product.id ? product : item))
          : [product, ...products],
      });
      resetForm();
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setPending(false);
    }
  }

  async function remove(productId: string) {
    setPending(true);
    setError(null);
    try {
      await removeProduct({ data: { id: productId } });
      onChange({ products: products.filter((product) => product.id !== productId) });
      setConfirmId(null);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setPending(false);
    }
  }

  async function runCheck(force: boolean) {
    setChecking(true);
    try {
      const result = await refreshStock({ data: { force } });
      onChange({ products: result.products });
      setCheckNote(result.detail);
      setCheckAlert(
        result.state === "rejected" ||
          result.state === "unreachable" ||
          result.state === "throttled" ||
          result.state === "not_configured",
      );
    } catch (err) {
      setCheckNote(messageOf(err));
      setCheckAlert(true);
    } finally {
      setChecking(false);
    }
  }

  async function copyLink(code: string) {
    const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${prefix}/r/${code}`);
      setCopied(code);
    } catch {
      setCopied(null);
    }
  }

  async function toggleVisible(product: WorkspaceProduct) {
    const visible = !product.bioVisible;
    setPending(true);
    setError(null);
    try {
      await setBioVisible({ data: { id: product.id, visible } });
      onChange({
        products: products.map((item) => (item.id === product.id ? { ...item, bioVisible: visible } : item)),
      });
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setPending(false);
    }
  }

  return (
    <VStack gap={4}>
      <BioBlock bio={bio} onChange={(next) => onChange({ bio: next })} />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Clock size={16} className="text-[var(--color-text-accent)] shrink-0" aria-hidden="true" />
          {checkAlert ? (
            <span className="text-xs text-[var(--color-text-secondary)]">
              {checkNote ?? "Estoque indisponível agora."}
            </span>
          ) : (
            <span className="text-xs text-[var(--color-text-secondary)]">
              {canCheck
                ? checking
                  ? "Conferindo disponibilidade no catálogo Shopee…"
                  : (checkNote ??
                    "Conferência automática ativa: a Shopee verifica o estoque de links com código a cada 15 min.")
                : "Controle de estoque manual: você marca o que vende. O clique tenta a principal e cai no backup ativo."}
            </span>
          )}
        </div>
        {canCheck ? (
          <Button
            variant="secondary"
            icon={<RefreshCw size={14} className={checking ? "animate-spin" : ""} />}
            label={checking ? "Conferindo…" : "Conferir agora"}
            isDisabled={checking || products.length === 0}
            isLoading={checking}
            onClick={() => runCheck(true)}
          />
        ) : null}
      </div>

      {!composing && error ? <Banner status="error" title={error} /> : null}

      {products.length === 0 ? (
        <Card padding={8}>
          <VStack gap={3} hAlign="center" className="text-center py-6">
            <div className="flex size-14 items-center justify-center rounded-full bg-[var(--color-accent-muted)] text-[var(--color-text-accent)]">
              <ShoppingBag size={28} aria-hidden="true" />
            </div>
            <Heading level={2} className="text-lg">Nenhum achadinho cadastrado ainda</Heading>
            <Text color="secondary" className="max-w-md text-sm">
              Cadastre seu primeiro produto com ofertas de reserva. Quando a loja principal esgotar,
              seus seguidores continuam comprando no backup e você não perde comissão.
            </Text>
            <div className="pt-2">
              <Button
                icon={<Plus size={16} aria-hidden="true" />}
                label="Adicionar primeiro produto"
                onClick={() => onComposingChange(true)}
              />
            </div>
          </VStack>
        </Card>
      ) : (
        <>
          {/* Mobile view: rich e-commerce product cards (never overflow) */}
          <div className="flex flex-col gap-3 lg:hidden">
            {products.map((product) => {
              const { copy, status } = stockOf(product);
              const inStock = status.on;
              const isCopied = copied === product.code;
              return (
                <div
                  key={product.id}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      className="text-left font-bold text-base text-[var(--color-text-primary)] hover:text-[var(--color-text-accent)] transition-colors focus-visible:outline-none"
                      onClick={() => beginEdit(product)}
                    >
                      {product.title}
                    </button>
                    <span
                      className={`inline-flex items-center gap-1 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        inStock
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      }`}
                    >
                      {inStock ? (
                        <CheckCircle2 size={12} aria-hidden="true" />
                      ) : (
                        <AlertCircle size={12} aria-hidden="true" />
                      )}
                      {status.label}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-baseline gap-2">
                    <span className="text-base font-bold text-[var(--color-text-primary)] tabular-nums">
                      {formatBrl(product.priceCents)}
                    </span>
                    <span className="rounded bg-[var(--color-accent-muted)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--color-text-accent)]">
                      {product.commissionPct}% de comissão
                    </span>
                  </div>

                  <div className="mt-3 rounded-lg bg-[var(--color-background-body)] p-2.5 text-xs">
                    <div className="flex items-center justify-between text-[var(--color-text-secondary)]">
                      <span>Destino do clique agora:</span>
                      <span className="font-semibold text-[var(--color-text-primary)] truncate max-w-44">
                        {copy.title}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between font-mono text-[11px] text-[var(--color-text-secondary)]">
                      <span>/r/{product.code}</span>
                      <span className="text-[10px] text-[var(--color-text-accent)]">
                        {product.offers.length} {product.offers.length === 1 ? "oferta" : "ofertas"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                    <Switch
                      label={product.bioVisible ? "Na bio" : "Oculto"}
                      value={product.bioVisible}
                      isDisabled={pending}
                      onChange={() => toggleVisible(product)}
                    />
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="secondary"
                        icon={isCopied ? <Check size={14} /> : <Copy size={14} />}
                        label={isCopied ? "Copiado!" : "Copiar"}
                        onClick={() => copyLink(product.code)}
                      />
                      <Button
                        variant="ghost"
                        label="Editar"
                        onClick={() => beginEdit(product)}
                      />
                      {confirmId === product.id ? (
                        <Button
                          variant="destructive"
                          icon={<Trash2 size={14} aria-hidden="true" />}
                          label="Confirmar"
                          isDisabled={pending}
                          onClick={() => remove(product.id)}
                        />
                      ) : (
                        <IconButton
                          variant="ghost"
                          label="Apagar"
                          icon={<Trash2 size={14} aria-hidden="true" />}
                          onClick={() => setConfirmId(product.id)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop view: clean, well-spaced table */}
          <div className="hidden overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:block">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead className="bg-[var(--color-background-body)] text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
                <tr>
                  <th className="px-4 py-3">Produto</th>
                  <th className="px-4 py-3">Link</th>
                  <th className="px-4 py-3">Preço</th>
                  <th className="px-4 py-3">Estoque</th>
                  <th className="px-4 py-3">Destino Atual</th>
                  <th className="px-4 py-3">Na Bio</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {products.map((product) => {
                  const { copy, status } = stockOf(product);
                  const inStock = status.on;
                  return (
                    <tr key={product.id} className="hover:bg-[var(--color-background-body)]/40 transition-colors">
                      <td className="px-4 py-3.5">
                        <button
                          type="button"
                          className="text-left font-semibold text-sm text-[var(--color-text-primary)] hover:text-[var(--color-text-accent)] focus-visible:outline-none"
                          onClick={() => beginEdit(product)}
                        >
                          {product.title}
                        </button>
                        <div className="text-xs text-[var(--color-text-secondary)]">
                          {product.commissionPct}% de comissão estimada
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                          /r/{product.code}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-sm font-semibold tabular-nums text-[var(--color-text-primary)]">
                          {formatBrl(product.priceCents)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                            inStock
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                              : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                          }`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="max-w-44 truncate px-4 py-3.5">
                        <span className="text-xs font-medium text-[var(--color-text-primary)]">
                          {copy.title}
                        </span>
                        <div className="text-[11px] text-[var(--color-text-secondary)] truncate">
                          {product.offers.length} ofertas cadastradas
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <Switch
                          label={product.bioVisible ? "Sim" : "Não"}
                          value={product.bioVisible}
                          isDisabled={pending}
                          onChange={() => toggleVisible(product)}
                        />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="secondary"
                            icon={copied === product.code ? <Check size={14} /> : <Copy size={14} />}
                            label={copied === product.code ? "Copiado!" : "Copiar"}
                            onClick={() => copyLink(product.code)}
                          />
                          <Button
                            variant="ghost"
                            label="Editar"
                            onClick={() => beginEdit(product)}
                          />
                          {confirmId === product.id ? (
                            <Button
                              variant="destructive"
                              icon={<Trash2 size={14} aria-hidden="true" />}
                              label="Confirmar"
                              isDisabled={pending}
                              onClick={() => remove(product.id)}
                            />
                          ) : (
                            <IconButton
                              variant="ghost"
                              label="Apagar"
                              icon={<Trash2 size={14} aria-hidden="true" />}
                              onClick={() => setConfirmId(product.id)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Side panel for creating or editing product */}
      <SidePanel
        open={composing}
        title={editingId ? "Editar achadinho" : "Novo achadinho"}
        onClose={resetForm}
      >
        <form className="flex min-h-0 flex-1 flex-col" onSubmit={onSubmit}>
          <VStack gap={4} padding={4} className="flex-1 overflow-y-auto">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-xs text-[var(--color-text-secondary)]">
              {editingId
                ? "O endereço público do link não muda. A primeira oferta é sempre a principal que o clique tenta primeiro."
                : "Cadastre o produto da Shopee. A primeira oferta é a principal; as seguintes são os backups que assumem quando o estoque zerar."}
            </div>

            <TextInput
              label="Nome do produto"
              value={title}
              onChange={setTitle}
              placeholder="Ex: Sérum Vitamina C 30ml"
              width="100%"
            />

            <div className="grid grid-cols-2 gap-3">
              <TextInput
                label="Preço aproximado (R$)"
                value={price}
                onChange={setPrice}
                placeholder="39,90"
                width="100%"
              />
              <TextInput
                label="Comissão estimada (%)"
                value={commission}
                onChange={setCommission}
                placeholder="18"
                width="100%"
              />
            </div>

            <div className="border-t border-[var(--color-border)] pt-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Lojas e Ofertas ({offers.length} de 4)
                </span>
                <span className="text-[11px] text-[var(--color-text-secondary)]">
                  Ordem de tentativa do clique
                </span>
              </div>

              <VStack gap={3}>
                {offers.map((offer, index) => (
                  <Card key={offer.key} padding={3}>
                    <VStack gap={2}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[var(--color-text-accent)] uppercase">
                          {index === 0 ? "1. Oferta Principal" : `${index + 1}. Backup ${index}`}
                        </span>
                        <Switch
                          label={offer.inStock ? "Em estoque" : "Esgotado"}
                          value={offer.inStock}
                          onChange={(next) => updateOffer(index, { inStock: next })}
                        />
                      </div>

                      <TextInput
                        label="Nome da loja na Shopee"
                        value={offer.shop}
                        onChange={(value) => updateOffer(index, { shop: value })}
                        placeholder="Ex: Loja Oficial Shopee"
                        width="100%"
                      />

                      <TextInput
                        label="Link de afiliado Shopee (https://)"
                        value={offer.url}
                        onChange={(value) => updateOffer(index, { url: value })}
                        placeholder="https://shopee.com.br/produto..."
                        width="100%"
                      />

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            icon={<ArrowUp size={14} />}
                            label="Subir"
                            isDisabled={index === 0}
                            onClick={() => moveOffer(index, -1)}
                          />
                          <Button
                            variant="ghost"
                            icon={<ArrowDown size={14} />}
                            label="Descer"
                            isDisabled={index === offers.length - 1}
                            onClick={() => moveOffer(index, 1)}
                          />
                        </div>
                        {offers.length > 1 ? (
                          <Button
                            variant="ghost"
                            icon={<Trash2 size={14} />}
                            label="Remover"
                            onClick={() =>
                              setOffers((current) => current.filter((item) => item.key !== offer.key))
                            }
                          />
                        ) : null}
                      </div>
                    </VStack>
                  </Card>
                ))}

                {offers.length < 4 ? (
                  <Button
                    variant="secondary"
                    icon={<Plus size={16} />}
                    label="Adicionar loja de backup"
                    onClick={() => setOffers((current) => [...current, offerRow()])}
                  />
                ) : null}
              </VStack>
            </div>

            {error ? <Banner status="error" title={error} /> : null}
          </VStack>

          <div className="flex items-center justify-end gap-2 border-t border-[var(--color-border)] px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-[var(--color-surface)]">
            <Button variant="ghost" label="Cancelar" onClick={resetForm} />
            <Button
              type="submit"
              isDisabled={pending}
              isLoading={pending}
              label={pending ? "Salvando…" : editingId ? "Salvar alterações" : "Criar achadinho"}
            />
          </div>
        </form>
      </SidePanel>
    </VStack>
  );

  function updateOffer(index: number, patch: Partial<OfferDraft>) {
    setOffers((current) => current.map((offer, i) => (i === index ? { ...offer, ...patch } : offer)));
  }

  function moveOffer(index: number, direction: -1 | 1) {
    setOffers((current) => {
      const next = index + direction;
      if (next < 0 || next >= current.length) return current;
      const copy = [...current];
      const [item] = copy.splice(index, 1);
      if (!item) return current;
      copy.splice(next, 0, item);
      return copy;
    });
  }

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setPrice("");
    setCommission("12");
    setOffers(blankOffers());
    onComposingChange(false);
    setError(null);
  }

  function beginEdit(product: WorkspaceProduct) {
    setEditingId(product.id);
    setTitle(product.title);
    setPrice(centsToBrlInput(product.priceCents));
    setCommission(String(product.commissionPct));
    setOffers(
      product.offers.map((offer) =>
        offerRow({ key: offer.id, shop: offer.shop, url: offer.url, inStock: offer.inStock }),
      ),
    );
    setError(null);
    setConfirmId(null);
    onComposingChange(true);
  }
}

export function NewLinkButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="primary"
      icon={<Plus size={16} aria-hidden="true" />}
      label="Novo achadinho"
      onClick={onClick}
    />
  );
}

function messageOf(error: unknown): string {
  if (error instanceof Error && error.message && error.message !== "Unauthorized") return error.message;
  return "Não deu para salvar. Tente de novo.";
}
