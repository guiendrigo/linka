import { Check, Copy, Link2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Banner } from "@astryxdesign/core/Banner";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
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
  return { copy, status };
}

export function WorkspacePending({ error }: { error: string | null }) {
  return (
    <div aria-busy={!error}>
      {error ? (
        <Banner status="error" title={error} />
      ) : (
        <div className="h-40 animate-pulse rounded-3xl bg-surface" />
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

  return (
    <Card padding={4}>
      <div className="flex flex-wrap items-start gap-4">
        <label className="grid size-20 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-body">
          {bio.hasPhoto ? (
            <img src={photoSrc} alt="" className="size-20 rounded-full object-cover" />
          ) : (
            <Text size="sm" color="secondary">
              Foto
            </Text>
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
          <span className="sr-only">{photoPending ? "Enviando foto" : "Enviar foto de perfil"}</span>
        </label>
        <VStack gap={1} className="min-w-0 flex-1">
          <Text weight="medium">Página da bio</Text>
          <Text size="sm" color="secondary">
            /p/{bio.code}
          </Text>
          <Button
            variant="secondary"
            icon={copied ? <Check size={16} /> : <Copy size={16} />}
            label={copied ? "Copiado" : "Copiar link"}
            onClick={copyAddress}
          />
        </VStack>
      </div>
      <form className="mt-4" onSubmit={save}>
        <VStack gap={3}>
          <TextInput label="Título" value={title} onChange={setTitle} width="100%" />
          <TextArea label="Descrição" value={description} onChange={setDescription} rows={3} width="100%" />
          {error ? <Banner status="error" title={error} /> : null}
          <Button
            type="submit"
            isDisabled={pending || photoPending}
            isLoading={pending}
            label={pending ? "Salvando…" : "Salvar página"}
          />
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
      <div className="flex flex-wrap items-center justify-between gap-2">
        {checkAlert ? (
          <Banner status="warning" title={checkNote ?? "Estoque indisponível agora."} />
        ) : (
          <Text color="secondary" size="sm">
            {canCheck
              ? checking
                ? "Conferindo na Shopee…"
                : (checkNote ??
                  "Na visita, a Shopee confirma o estoque quando a URL tem o código …-i.loja.item.")
              : "Você marca o estoque de cada oferta. O clique tenta a principal e cai no backup que ainda estiver marcada."}
          </Text>
        )}
        {canCheck ? (
          <Button
            variant="secondary"
            label={checking ? "Conferindo…" : "Conferir estoque"}
            isDisabled={checking || products.length === 0}
            isLoading={checking}
            onClick={() => runCheck(true)}
          />
        ) : null}
      </div>

      {!composing && error ? <Banner status="error" title={error} /> : null}

      {products.length === 0 ? (
        <Card padding={8}>
          <VStack gap={3} hAlign="center">
            <Link2 className="size-8 text-secondary" aria-hidden="true" />
            <Text color="secondary">Nenhum produto ainda.</Text>
            <Button
              icon={<Plus size={16} aria-hidden="true" />}
              label="Adicionar produto"
              onClick={() => onComposingChange(true)}
            />
          </VStack>
        </Card>
      ) : (
        <>
          <VStack gap={3} className="lg:hidden">
            {products.map((product) => {
              const { copy, status } = stockOf(product);
              return (
                <Card key={product.id} padding={4}>
                  <VStack gap={2}>
                    <Button
                      variant="ghost"
                      label={product.title}
                      onClick={() => beginEdit(product)}
                    />
                    <Text size="sm" color="secondary">
                      {status.label}
                    </Text>
                    <Text size="sm" color="secondary" hasTabularNumbers>
                      {formatBrl(product.priceCents)} · {product.commissionPct}%
                    </Text>
                    <Text size="sm" color="secondary">
                      /r/{product.code}
                    </Text>
                    <Text size="sm" color="secondary">
                      {copy.title}
                    </Text>
                    <Switch
                      label={product.bioVisible ? "Visível na bio" : "Oculto na bio"}
                      value={product.bioVisible}
                      isDisabled={pending}
                      onChange={() => toggleVisible(product)}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        icon={
                          copied === product.code ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )
                        }
                        label={copied === product.code ? "Copiado" : "Copiar"}
                        onClick={() => copyLink(product.code)}
                      />
                      {confirmId === product.id ? (
                        <Button
                          variant="destructive"
                          icon={<Trash2 size={16} aria-hidden="true" />}
                          label="Sim"
                          isDisabled={pending}
                          onClick={() => remove(product.id)}
                        />
                      ) : (
                        <Button variant="ghost" label="Apagar" onClick={() => setConfirmId(product.id)} />
                      )}
                    </div>
                  </VStack>
                </Card>
              );
            })}
          </VStack>

          <div className="hidden overflow-x-auto rounded-xl border border-border lg:block">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead className="bg-muted text-xs font-medium tracking-wide text-secondary uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Produto</th>
                  <th className="px-4 py-3 font-medium">Código</th>
                  <th className="px-4 py-3 font-medium">Preço</th>
                  <th className="px-4 py-3 font-medium">Estoque</th>
                  <th className="px-4 py-3 font-medium">Destino</th>
                  <th className="px-4 py-3 font-medium">Bio</th>
                  <th className="px-4 py-3 font-medium">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const { copy, status } = stockOf(product);
                  return (
                    <tr key={product.id} className="border-t border-border">
                      <td className="px-4 py-3">
                        <Button variant="ghost" label={product.title} onClick={() => beginEdit(product)} />
                        <Text size="sm" color="secondary" hasTabularNumbers>
                          {product.commissionPct}%
                        </Text>
                      </td>
                      <td className="px-4 py-3">
                        <Text size="sm" color="secondary">
                          /r/{product.code}
                        </Text>
                      </td>
                      <td className="px-4 py-3">
                        <Text size="sm" hasTabularNumbers>
                          {formatBrl(product.priceCents)}
                        </Text>
                      </td>
                      <td className="px-4 py-3">
                        <Text size="sm">{status.label}</Text>
                      </td>
                      <td className="max-w-40 truncate px-4 py-3">
                        <Text size="sm">{copy.title}</Text>
                      </td>
                      <td className="px-4 py-3">
                        <Switch
                          label={product.bioVisible ? "Visível" : "Oculto"}
                          value={product.bioVisible}
                          isDisabled={pending}
                          onChange={() => toggleVisible(product)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <IconButton
                            variant="ghost"
                            label={copied === product.code ? "Copiado" : "Copiar"}
                            icon={copied === product.code ? <Check size={16} /> : <Copy size={16} />}
                            onClick={() => copyLink(product.code)}
                          />
                          {confirmId === product.id ? (
                            <Button
                              variant="destructive"
                              icon={<Trash2 size={16} aria-hidden="true" />}
                              label="Sim"
                              isDisabled={pending}
                              onClick={() => remove(product.id)}
                            />
                          ) : (
                            <Button variant="ghost" label="Apagar" onClick={() => setConfirmId(product.id)} />
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

      <SidePanel open={composing} title={editingId ? "Editar produto" : "Novo produto"} onClose={resetForm}>
        <form className="flex min-h-0 flex-1 flex-col" onSubmit={onSubmit}>
          <VStack gap={3} padding={4} className="flex-1 overflow-y-auto">
            <Text color="secondary" size="sm">
              {editingId
                ? "O endereço do link não muda. A primeira oferta é a principal."
                : "A primeira oferta é a principal. As seguintes são backups."}
            </Text>
            <Text color="secondary" size="sm">
              Link encurtado (shope.ee) sem o código da loja e do item (…-i.loja.item) não entra na
              conferência. O estoque fica o que você marcar.
            </Text>
            <TextInput
              label="Nome"
              value={title}
              onChange={setTitle}
              placeholder="Sérum de vitamina C"
              width="100%"
            />
            <div className="grid grid-cols-2 gap-2">
              <TextInput label="Preço" value={price} onChange={setPrice} placeholder="39,90" width="100%" />
              <TextInput label="Comissão %" value={commission} onChange={setCommission} width="100%" />
            </div>
            {offers.map((offer, index) => (
              <Card key={offer.key} padding={3}>
                <VStack gap={2}>
                  <Text size="sm" color="secondary" weight="semibold">
                    {index === 0 ? "Principal" : `Backup ${index}`}
                  </Text>
                  <Switch
                    label={offer.inStock ? "Em estoque" : "Sem estoque"}
                    value={offer.inStock}
                    onChange={(next) => updateOffer(index, { inStock: next })}
                  />
                  <TextInput
                    label="Loja"
                    value={offer.shop}
                    onChange={(value) => updateOffer(index, { shop: value })}
                    width="100%"
                  />
                  <TextInput
                    label="Link https"
                    value={offer.url}
                    onChange={(value) => updateOffer(index, { url: value })}
                    width="100%"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="ghost"
                      label="Subir"
                      isDisabled={index === 0}
                      onClick={() => moveOffer(index, -1)}
                    />
                    <Button
                      variant="ghost"
                      label="Descer"
                      isDisabled={index === offers.length - 1}
                      onClick={() => moveOffer(index, 1)}
                    />
                    {offers.length > 1 ? (
                      <Button
                        variant="ghost"
                        label="Tirar"
                        onClick={() => setOffers((current) => current.filter((item) => item.key !== offer.key))}
                      />
                    ) : null}
                  </div>
                </VStack>
              </Card>
            ))}
            {offers.length < 4 ? (
              <Button variant="ghost" label="Adicionar backup" onClick={() => setOffers((current) => [...current, offerRow()])} />
            ) : null}
            {error ? <Banner status="error" title={error} /> : null}
          </VStack>
          <div className="flex gap-2 border-t border-border px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:justify-end">
            <Button variant="ghost" label="Cancelar" onClick={resetForm} />
            <Button
              type="submit"
              isDisabled={pending}
              isLoading={pending}
              label={pending ? "Guardando…" : editingId ? "Salvar" : "Criar"}
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
    <Button icon={<Plus size={16} aria-hidden="true" />} label="Adicionar produto" onClick={onClick} />
  );
}

function messageOf(error: unknown): string {
  if (error instanceof Error && error.message && error.message !== "Unauthorized") return error.message;
  return "Não deu para salvar. Tente de novo.";
}
