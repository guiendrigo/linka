import { Check, Copy, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { formatBrl, resolutionCopy, resolveSmartLink } from "@/lib/linka/resolve";
import { centsToBrlInput, type OfferDraft } from "@/lib/linka/input";
import { previewPathPrefix } from "@/lib/preview-path-prefix";
import type { WorkspaceProduct, WorkspaceView } from "@/lib/linka/store.server";
import {
  addProduct,
  editProduct,
  getWorkspace,
  removeProduct,
  removeShopeeCredentials,
  saveShopeeCredentials,
  toggleOfferStock,
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

export function Workspace() {
  const user = useCurrentUser();
  const [data, setData] = useState<WorkspaceView | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = user?.id;
    if (!userId) return;
    let cancelled = false;
    getWorkspace()
      .then((next) => {
        if (!cancelled) setData(next);
      })
      .catch(() => {
        if (!cancelled) setError("Não deu para carregar a sua conta.");
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  if (!data) {
    return (
      <section className="mt-10" aria-busy={!error}>
        {error ? (
          <p className="text-sm text-primary">{error}</p>
        ) : (
          <div className="h-40 animate-pulse rounded-3xl bg-surface" />
        )}
      </section>
    );
  }

  return (
    <section className="mt-10 flex flex-col gap-4">
      <h2 className="font-display text-2xl font-semibold tracking-tight">Sua conta</h2>
      <CredentialsCard
        shopee={data.shopee}
        onChange={(shopee) => setData({ ...data, shopee })}
      />
      <ProductsCard
        products={data.products}
        onChange={(products) => setData({ ...data, products })}
      />
    </section>
  );
}

function CredentialsCard({
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

  return (
    <div className="rounded-3xl bg-surface p-2 shadow-ring">
      <div className="rounded-2xl bg-surface-2 px-4 py-4">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Shopee</p>
        <h3 className="mt-1 text-xl font-semibold">Credenciais de afiliado</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          App ID e segredo do Open API. O segredo fica no servidor e não volta para esta tela.
        </p>
        {shopee.connected && !editing ? (
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-sm">
              Conectado · <span className="font-medium break-all">{shopee.appId}</span>
            </p>
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
    </div>
  );
}

function ProductsCard({
  products,
  onChange,
}: {
  products: WorkspaceProduct[];
  onChange: (next: WorkspaceProduct[]) => void;
}) {
  const [open, setOpen] = useState(products.length === 0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [commission, setCommission] = useState("12");
  const [offers, setOffers] = useState<OfferRow[]>(blankOffers);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) return;
    formRef.current?.scrollIntoView({ block: "start" });
  }, [open, editingId]);

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

  async function toggle(productId: string, offerId: string, inStock: boolean) {
    const previous = products;
    onChange(
      products.map((product) =>
        product.id === productId
          ? {
              ...product,
              offers: product.offers.map((offer) =>
                offer.id === offerId ? { ...offer, inStock } : offer,
              ),
            }
          : product,
      ),
    );
    try {
      await toggleOfferStock({ data: { id: offerId, inStock } });
    } catch (err) {
      onChange(previous);
      setError(messageOf(err));
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
    <div className="rounded-3xl bg-surface p-2 shadow-ring">
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-2 px-4 py-4">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Produtos</p>
          <h3 className="mt-1 text-xl font-semibold">Seus links</h3>
        </div>
        <Button variant="ghost" onClick={beginCreate}>
          <Plus className="size-4" aria-hidden="true" />
          Novo
        </Button>
      </div>

      {open ? (
        <form ref={formRef} className="flex flex-col gap-3 px-2 py-3" onSubmit={onSubmit}>
          <p className="text-sm text-muted">
            {editingId
              ? "O endereço do link não muda. A primeira oferta é a principal."
              : "A primeira oferta é a principal. As seguintes são backups."}
          </p>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Produto
            <input value={title} onChange={(event) => setTitle(event.target.value)} className={fieldClass} />
          </label>
          <div className="grid grid-cols-2 gap-2">
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
            <div key={offer.key} className="rounded-2xl bg-bg px-3 py-3">
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
              className="min-h-11 text-sm font-medium text-fg"
              onClick={() => setOffers((current) => [...current, offerRow()])}
            >
              Adicionar backup
            </button>
          ) : null}
          {error ? <p className="text-sm text-primary">{error}</p> : null}
          <div className="grid grid-cols-2 gap-2">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Guardando…" : editingId ? "Salvar" : "Guardar produto"}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={resetForm}>
              Cancelar
            </Button>
          </div>
        </form>
      ) : null}

      {products.length === 0 ? (
        <p className="px-4 py-4 text-sm text-muted">Nenhum produto ainda. O exemplo da página continua público.</p>
      ) : (
        <ul className="flex flex-col gap-2 p-2">
          {products.map((product) => {
            const resolution = resolveSmartLink({
              code: product.code,
              title: product.title,
              detail: "",
              priceCents: product.priceCents,
              commissionPct: product.commissionPct,
              offers: product.offers,
            });
            const copy = resolutionCopy(resolution);
            return (
              <li key={product.id} className="rounded-2xl bg-bg px-3 py-3">
                <p className="font-medium">{product.title}</p>
                <p className="mt-1 font-mono text-xs text-muted">/r/{product.code}</p>
                <p className="mt-1 text-sm text-muted tabular-nums">
                  {formatBrl(product.priceCents)} · {product.commissionPct}%
                </p>
                <p className="mt-2 text-sm">
                  Vai para <span className="font-medium">{copy.title}</span>
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {product.offers.map((offer, index) => (
                    <li key={offer.id}>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={offer.inStock}
                        onClick={() => toggle(product.id, offer.id, !offer.inStock)}
                        disabled={pending}
                        className="flex min-h-12 w-full items-center gap-3 text-left"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-semibold tracking-wide text-muted uppercase">
                            {index === 0 ? "Principal" : `Backup ${index}`}
                          </span>
                          <span className="block truncate">{offer.shop}</span>
                        </span>
                        <span className={cn("text-sm", offer.inStock ? "text-fg" : "text-muted")}>
                          {offer.inStock ? "Em estoque" : "Sem estoque"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Button variant="ghost" className="w-full px-2" onClick={() => copyLink(product.code)}>
                    {copied === product.code ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied === product.code ? "Ok" : "Copiar"}
                  </Button>
                  <Button variant="ghost" className="w-full px-2" onClick={() => beginEdit(product)}>
                    Editar
                  </Button>
                  {confirmId === product.id ? (
                    <Button className="w-full px-2" onClick={() => remove(product.id)} disabled={pending}>
                      <Trash2 className="size-4" aria-hidden="true" />
                      Sim
                    </Button>
                  ) : (
                    <Button variant="ghost" className="w-full px-2" onClick={() => setConfirmId(product.id)}>
                      Apagar
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!open && error ? <p className="px-4 pb-3 text-sm text-primary">{error}</p> : null}
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
    setOpen(false);
    setError(null);
  }

  function beginCreate() {
    if (open && !editingId) {
      setOpen(false);
      return;
    }
    setEditingId(null);
    setTitle("");
    setPrice("");
    setCommission("12");
    setOffers(blankOffers());
    setError(null);
    setOpen(true);
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
    setOpen(true);
  }
}

function messageOf(error: unknown): string {
  if (error instanceof Error && error.message && error.message !== "Unauthorized") return error.message;
  return "Não deu para salvar. Tente de novo.";
}
