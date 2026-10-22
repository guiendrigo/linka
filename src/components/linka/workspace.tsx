import { Check, Copy, Link2, Plus, Store, Trash2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SidePanel } from "@/components/linka/side-panel";
import { formatBrl, resolutionCopy, resolveSmartLink } from "@/lib/linka/resolve";
import { centsToBrlInput, type OfferDraft } from "@/lib/linka/input";
import { previewPathPrefix } from "@/lib/preview-path-prefix";
import type { WorkspaceProduct, WorkspaceView } from "@/lib/linka/store.server";
import {
  addProduct,
  editProduct,
  refreshStock,
  removeProduct,
  removeShopeeCredentials,
  saveShopeeCredentials,
} from "@/lib/linka/workspace.functions";
import { cn } from "@/lib/cn";

const fieldClass =
  "min-h-11 w-full rounded-2xl border border-border bg-bg px-4 text-base font-normal text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary";

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

export function WorkspacePending({ error }: { error: string | null }) {
  return (
    <div aria-busy={!error}>
      {error ? (
        <p className="text-sm text-primary">{error}</p>
      ) : (
        <div className="h-40 animate-pulse rounded-3xl bg-surface" />
      )}
    </div>
  );
}

export function ShopeePanel({
  shopee,
  onChange,
}: {
  shopee: WorkspaceView["shopee"];
  onChange: (next: WorkspaceView["shopee"]) => void;
}) {
  const [appId, setAppId] = useState("");
  const [secret, setSecret] = useState("");
  const [editing, setEditing] = useState(shopee.connected === false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      await saveShopeeCredentials({ data: { appId, secret } });
      onChange({ connected: true, appId: appId.trim() });
      setSecret("");
      setEditing(false);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setPending(false);
    }
  }

  async function remove() {
    setPending(true);
    setError(null);
    try {
      await removeShopeeCredentials();
      onChange({ connected: false });
      setAppId("");
      setSecret("");
      setEditing(true);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setPending(false);
    }
  }

  async function copyAppId(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="max-w-md rounded-3xl border border-dashed border-border bg-surface p-4">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Store className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium">Shopee</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
            <span
              className={cn("size-1.5 rounded-full", shopee.connected && !editing ? "bg-primary" : "bg-muted")}
              aria-hidden="true"
            />
            {shopee.connected && !editing ? "Conectado" : "Não conectado"}
          </p>
        </div>
      </div>

      {shopee.connected && !editing ? (
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate font-mono text-sm">{shopee.appId}</p>
            <button
              type="button"
              className="grid size-11 shrink-0 place-items-center rounded-full text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => copyAppId(shopee.appId)}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              <span className="sr-only">{copied ? "Copiado" : "Copiar App ID"}</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="ghost" className="w-full" onClick={() => setEditing(true)} disabled={pending}>
              Trocar
            </Button>
            <Button variant="ghost" className="w-full" onClick={remove} disabled={pending}>
              Remover
            </Button>
          </div>
        </div>
      ) : (
        <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            App ID
            <input value={appId} onChange={(event) => setAppId(event.target.value)} autoComplete="off" className={fieldClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Segredo
            <input
              type="password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              autoComplete="new-password"
              className={fieldClass}
            />
          </label>
          {error ? <p className="text-sm text-primary">{error}</p> : null}
          <div className="grid grid-cols-2 gap-2">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Salvando…" : "Salvar"}
            </Button>
            {shopee.connected ? (
              <Button type="button" variant="ghost" className="w-full" onClick={() => setEditing(false)}>
                Cancelar
              </Button>
            ) : null}
          </div>
        </form>
      )}
    </div>
  );
}

export function LinksPanel({
  products,
  canCheck,
  onChange,
  composing,
  composeNonce,
  onComposingChange,
}: {
  products: WorkspaceProduct[];
  canCheck: boolean;
  onChange: (next: WorkspaceProduct[]) => void;
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
      onChange(
        editingId ? products.map((item) => (item.id === product.id ? product : item)) : [product, ...products],
      );
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
      onChange(products.filter((product) => product.id !== productId));
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
      onChange(result.products);
      setCheckNote(result.detail);
      setCheckAlert(result.state === "rejected" || result.state === "unreachable");
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={cn("text-sm leading-snug", checkAlert ? "text-primary" : "text-muted")}>
          {checking
            ? "Conferindo na Shopee…"
            : (checkNote ?? "Na visita, a Shopee confirma o estoque quando a URL tem o código …-i.loja.item.")}
        </p>
        <Button
          variant="ghost"
          className="shrink-0"
          onClick={() => runCheck(true)}
          disabled={checking || products.length === 0}
        >
          {checking ? "Conferindo…" : "Conferir estoque"}
        </Button>
      </div>

      {!composing && error ? <p className="text-sm text-primary">{error}</p> : null}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead className="bg-surface-2 text-xs font-medium tracking-wide text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium">Código</th>
              <th className="px-4 py-3 font-medium">Preço</th>
              <th className="px-4 py-3 font-medium">Estoque</th>
              <th className="px-4 py-3 font-medium">Destino</th>
              <th className="px-4 py-3 font-medium">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <Link2 className="mx-auto size-8 text-muted" aria-hidden="true" />
                  <p className="mt-3 text-sm text-muted">Nenhum produto ainda.</p>
                  <Button className="mt-4" onClick={() => onComposingChange(true)}>
                    <Plus className="size-4" aria-hidden="true" />
                    Adicionar produto
                  </Button>
                </td>
              </tr>
            ) : (
              products.map((product) => {
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
                return (
                  <tr key={product.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="text-left font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        onClick={() => beginEdit(product)}
                      >
                        {product.title}
                      </button>
                      <p className="mt-0.5 text-xs text-muted tabular-nums">{product.commissionPct}%</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted">/r/{product.code}</td>
                    <td className="px-4 py-3 text-sm tabular-nums">{formatBrl(product.priceCents)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-sm">
                        <span
                          className={cn("size-1.5 rounded-full", status.on ? "bg-primary" : "bg-muted")}
                          aria-hidden="true"
                        />
                        {status.label}
                      </span>
                    </td>
                    <td className="max-w-40 truncate px-4 py-3 text-sm">{copy.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" className="min-h-9 px-2" onClick={() => copyLink(product.code)}>
                          {copied === product.code ? <Check className="size-4" /> : <Copy className="size-4" />}
                          <span className="sr-only">{copied === product.code ? "Copiado" : "Copiar"}</span>
                        </Button>
                        {confirmId === product.id ? (
                          <Button className="min-h-9 px-2" onClick={() => remove(product.id)} disabled={pending}>
                            <Trash2 className="size-4" aria-hidden="true" />
                            Sim
                          </Button>
                        ) : (
                          <Button variant="ghost" className="min-h-9 px-2" onClick={() => setConfirmId(product.id)}>
                            Apagar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <SidePanel
        open={composing}
        title={editingId ? "Editar produto" : "Novo produto"}
        onClose={resetForm}
      >
        <form className="flex min-h-0 flex-1 flex-col" onSubmit={onSubmit}>
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <p className="text-sm text-muted">
              {editingId
                ? "O endereço do link não muda. A primeira oferta é a principal."
                : "A primeira oferta é a principal. As seguintes são backups."}
            </p>
            <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium">
              Nome
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Sérum de vitamina C"
                className={fieldClass}
              />
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Preço
                <input
                  inputMode="decimal"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="39,90"
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Comissão %
                <input
                  inputMode="numeric"
                  value={commission}
                  onChange={(event) => setCommission(event.target.value)}
                  className={fieldClass}
                />
              </label>
            </div>
            {offers.map((offer, index) => (
              <div key={offer.key} className="mt-3 rounded-2xl bg-bg px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                    {index === 0 ? "Principal" : `Backup ${index}`}
                  </p>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={offer.inStock}
                    onClick={() => updateOffer(index, { inStock: !offer.inStock })}
                    className={cn("min-h-11 text-sm", offer.inStock ? "text-fg" : "text-muted")}
                  >
                    {offer.inStock ? "Em estoque" : "Sem estoque"}
                  </button>
                </div>
                <label className="mt-2 flex flex-col gap-1.5 text-sm font-medium">
                  Loja
                  <input
                    value={offer.shop}
                    onChange={(event) => updateOffer(index, { shop: event.target.value })}
                    className={fieldClass}
                  />
                </label>
                <label className="mt-2 flex flex-col gap-1.5 text-sm font-medium">
                  Link https
                  <input
                    value={offer.url}
                    onChange={(event) => updateOffer(index, { url: event.target.value })}
                    inputMode="url"
                    className={fieldClass}
                  />
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="min-h-11 px-1 text-sm font-medium text-fg disabled:opacity-40"
                    disabled={index === 0}
                    onClick={() => moveOffer(index, -1)}
                  >
                    Subir
                  </button>
                  <button
                    type="button"
                    className="min-h-11 px-1 text-sm font-medium text-fg disabled:opacity-40"
                    disabled={index === offers.length - 1}
                    onClick={() => moveOffer(index, 1)}
                  >
                    Descer
                  </button>
                  {offers.length > 1 ? (
                    <button
                      type="button"
                      className="min-h-11 px-1 text-sm font-medium text-fg"
                      onClick={() => setOffers((current) => current.filter((item) => item.key !== offer.key))}
                    >
                      Tirar
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {offers.length < 4 ? (
              <button
                type="button"
                className="mt-2 min-h-11 text-sm font-medium text-fg"
                onClick={() => setOffers((current) => [...current, offerRow()])}
              >
                Adicionar backup
              </button>
            ) : null}
            {error ? <p className="mt-3 text-sm text-primary">{error}</p> : null}
          </div>
          <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
            <button
              type="button"
              className="min-h-11 px-3 text-sm font-medium text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={resetForm}
            >
              Cancelar
            </button>
            <Button type="submit" disabled={pending}>
              {pending ? "Guardando…" : editingId ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </SidePanel>
    </div>
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
    <Button onClick={onClick}>
      <Plus className="size-4" aria-hidden="true" />
      Adicionar produto
    </Button>
  );
}

function messageOf(error: unknown): string {
  if (error instanceof Error && error.message && error.message !== "Unauthorized") return error.message;
  return "Não deu para salvar. Tente de novo.";
}
