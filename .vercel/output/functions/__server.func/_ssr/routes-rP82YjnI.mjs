import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Q as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { a as cn, i as buttonVariants, n as Button, o as useCurrentUser, r as SignedIn, t as AppShell } from "./shell-DN6vqT4R.mjs";
import { a as resolutionCopy, n as findLink, o as resolveSmartLink, r as formatBrl, s as stockQuery, t as DEMO_CODE } from "./resolve-Czhe8mfX.mjs";
import { a as Check, i as Copy, n as Trash2, r as Plus } from "../_libs/lucide-react.mjs";
import { i as createSsrRpc, r as previewPathPrefix } from "./router-BvUu7IHg.mjs";
import { n as cleanCredentials, r as cleanProduct, t as centsToBrlInput } from "./input-Bpl--re0.mjs";
import { t as authMiddleware } from "./middleware-r_43HGBa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-rP82YjnI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var seed = findLink(DEMO_CODE);
function Bench() {
	const [offers, setOffers] = (0, import_react.useState)(() => seed?.offers ?? []);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const id = window.setTimeout(() => setCopied(false), 1600);
		return () => window.clearTimeout(id);
	}, [copied]);
	if (!seed) return null;
	const link = {
		...seed,
		offers
	};
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
	function toggle(id) {
		setOffers((current) => current.map((offer) => offer.id === id ? {
			...offer,
			inStock: !offer.inStock
		} : offer));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Simulador do link",
		className: "rounded-3xl bg-surface p-2 shadow-ring",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-surface-2 px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: link.detail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-semibold tracking-tight",
						children: link.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl tabular-nums",
							children: formatBrl(link.priceCents)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-semibold text-primary tabular-nums",
							children: [link.commissionPct, "% de comissão"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2 p-2",
				children: offers.map((offer, index) => {
					const chosen = resolution.status === "ok" && resolution.offer.id === offer.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "switch",
						"aria-checked": offer.inStock,
						"aria-label": `${index === 0 ? "Principal" : "Backup"}, ${offer.shop}, ${offer.inStock ? "em estoque" : "sem estoque"}`,
						onClick: () => toggle(offer.id),
						className: cn("flex min-h-16 w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", chosen ? "bg-bg shadow-ring-strong" : "bg-bg/40"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs font-semibold tracking-wide text-muted uppercase",
									children: index === 0 ? "Principal" : `Backup ${index}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block truncate font-medium",
									children: offer.shop
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-sm", offer.inStock ? "text-fg" : "text-muted"),
								children: offer.inStock ? "Em estoque" : "Sem estoque"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockTrack, { on: offer.inStock })
						]
					}) }, offer.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-2 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-bg px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Para onde o clique vai"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl font-semibold",
							children: copy.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: copy.body
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: copyLink,
						className: "w-full",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-4",
							"aria-hidden": "true"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							className: "size-4",
							"aria-hidden": "true"
						}), copied ? "Copiado" : "Copiar link"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/r/$code",
						params: { code: DEMO_CODE },
						search: { on },
						target: "_blank",
						rel: "noopener noreferrer",
						preload: false,
						className: buttonVariants({ variant: "ghost" }),
						children: "Abrir link"
					})]
				})]
			})
		]
	});
}
function StockTrack({ on }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": "true",
		className: cn("relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150", on ? "bg-primary" : "bg-border"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 size-6 rounded-full bg-fg transition-transform duration-150", on ? "translate-x-5" : "translate-x-0.5") })
	});
}
var getWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("059bf76fbf611564222d39fd40694a844bb8b9c432118bb9386713e7f2bd5858"));
var saveShopeeCredentials = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	return cleanCredentials({
		appId: typeof body.appId === "string" ? body.appId : "",
		secret: typeof body.secret === "string" ? body.secret : ""
	});
}).handler(createSsrRpc("0d9edb24912bf74ff8eb3c3dc091c6158d57aa24d3943f44ee39a54e02a4cc75"));
var removeShopeeCredentials = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("c590ff26469ceb1746a3dee0f48599fec089320022a0f3b4fbef5bfaef737942"));
var addProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	const offers = Array.isArray(body.offers) ? body.offers.map(asOffer) : [];
	return cleanProduct({
		title: typeof body.title === "string" ? body.title : "",
		price: typeof body.price === "string" ? body.price : "",
		commission: typeof body.commission === "string" ? body.commission : "",
		offers
	});
}).handler(createSsrRpc("156a2ae191035dc24aa4bacb36604d42939c5258c199d79dca1556b5d0bfdd60"));
var editProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) throw new Error("Produto inválido.");
	const offers = Array.isArray(body.offers) ? body.offers.map(asOffer) : [];
	return {
		id: body.id,
		product: cleanProduct({
			title: typeof body.title === "string" ? body.title : "",
			price: typeof body.price === "string" ? body.price : "",
			commission: typeof body.commission === "string" ? body.commission : "",
			offers
		})
	};
}).handler(createSsrRpc("18987b496d6b14e6a61a3212798aaf76c93e6f7de9691a41017a62d4309bef47"));
var refreshStock = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ force: asRecord(data).force === true })).handler(createSsrRpc("68345f626e4549d1e4b2b91c89e7522060736110c3875b614d804a8f697d05e3"));
var removeProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const id = asRecord(data).id;
	if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Produto inválido.");
	return id;
}).handler(createSsrRpc("69f981afc6d36ff09e64dde6147fee619233451a99f592843859d13fd9d3fba1"));
var toggleOfferStock = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) throw new Error("Oferta inválida.");
	if (typeof body.inStock !== "boolean") throw new Error("Estoque inválido.");
	return {
		id: body.id,
		inStock: body.inStock
	};
}).handler(createSsrRpc("d1ca61e51831a5144615f1a875a3648c530cb6fd4ccc502959ae70e645cb4b7b"));
function asRecord(data) {
	if (!data || typeof data !== "object" || Array.isArray(data)) return {};
	return data;
}
function asOffer(value) {
	const body = asRecord(value);
	return {
		shop: typeof body.shop === "string" ? body.shop : "",
		url: typeof body.url === "string" ? body.url : "",
		inStock: body.inStock !== false
	};
}
var fieldClass = "min-h-11 w-full rounded-2xl border border-border bg-bg px-4 text-base font-normal text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary";
function offerRow(partial) {
	return {
		key: partial?.key ?? crypto.randomUUID(),
		shop: partial?.shop ?? "",
		url: partial?.url ?? "",
		inStock: partial?.inStock ?? true
	};
}
function blankOffers() {
	return [offerRow(), offerRow()];
}
function Workspace() {
	const user = useCurrentUser();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let cancelled = false;
		getWorkspace().then((next) => {
			if (!cancelled) setData(next);
		}).catch(() => {
			if (!cancelled) setError("Não deu para carregar a sua conta.");
		});
		return () => {
			cancelled = true;
		};
	}, [user?.id]);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-10",
		"aria-busy": !error,
		children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-primary",
			children: error
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-3xl bg-surface" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10 flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "Sua conta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialsCard, {
				shopee: data.shopee,
				onChange: (shopee) => setData({
					...data,
					shopee
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsCard, {
				products: data.products,
				canCheck: data.shopee.connected,
				onChange: (products) => setData({
					...data,
					products
				})
			})
		]
	});
}
function CredentialsCard({ shopee, onChange }) {
	const [appId, setAppId] = (0, import_react.useState)("");
	const [secret, setSecret] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(shopee.connected === false);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function onSubmit(event) {
		event.preventDefault();
		setPending(true);
		setError(null);
		try {
			await saveShopeeCredentials({ data: {
				appId,
				secret
			} });
			onChange({
				connected: true,
				appId: appId.trim()
			});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-3xl bg-surface p-2 shadow-ring",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-surface-2 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-wide text-primary uppercase",
					children: "Shopee"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-xl font-semibold",
					children: "Credenciais de afiliado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "App ID e segredo do Open API. O segredo fica no servidor, também para a conferência de estoque, e não volta para esta tela."
				}),
				shopee.connected && !editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: ["Conectado · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium break-all",
							children: shopee.appId
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "w-full",
							onClick: () => setEditing(true),
							disabled: pending,
							children: "Trocar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "w-full",
							onClick: remove,
							disabled: pending,
							children: "Remover"
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 flex flex-col gap-3",
					onSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm font-medium",
							children: ["App ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: appId,
								onChange: (event) => setAppId(event.target.value),
								autoComplete: "off",
								className: fieldClass
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm font-medium",
							children: ["Segredo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: secret,
								onChange: (event) => setSecret(event.target.value),
								autoComplete: "new-password",
								className: fieldClass
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-primary",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: pending,
								children: pending ? "Salvando…" : "Salvar"
							}), shopee.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								className: "w-full",
								onClick: () => setEditing(false),
								children: "Cancelar"
							}) : null]
						})
					]
				})
			]
		})
	});
}
function ProductsCard({ products, canCheck, onChange }) {
	const [open, setOpen] = (0, import_react.useState)(products.length === 0);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [commission, setCommission] = (0, import_react.useState)("12");
	const [offers, setOffers] = (0, import_react.useState)(blankOffers);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const [confirmId, setConfirmId] = (0, import_react.useState)(null);
	const [checking, setChecking] = (0, import_react.useState)(false);
	const [checkNote, setCheckNote] = (0, import_react.useState)(null);
	const [checkAlert, setCheckAlert] = (0, import_react.useState)(false);
	const formRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!canCheck || products.length === 0) return;
		let stop = false;
		runCheck(false);
		const id = window.setInterval(() => {
			if (!stop) runCheck(false);
		}, 9e5);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, [canCheck, products.length === 0]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		formRef.current?.scrollIntoView({ block: "start" });
	}, [open, editingId]);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const id = window.setTimeout(() => setCopied(null), 1600);
		return () => window.clearTimeout(id);
	}, [copied]);
	async function onSubmit(event) {
		event.preventDefault();
		setPending(true);
		setError(null);
		try {
			const payload = {
				title,
				price,
				commission,
				offers: offers.map(({ shop, url, inStock }) => ({
					shop,
					url,
					inStock
				}))
			};
			const product = editingId ? await editProduct({ data: {
				id: editingId,
				...payload
			} }) : await addProduct({ data: payload });
			onChange(editingId ? products.map((item) => item.id === product.id ? product : item) : [product, ...products]);
			resetForm();
		} catch (err) {
			setError(messageOf(err));
		} finally {
			setPending(false);
		}
	}
	async function toggle(productId, offerId, inStock) {
		const previous = products;
		onChange(products.map((product) => product.id === productId ? {
			...product,
			offers: product.offers.map((offer) => offer.id === offerId ? {
				...offer,
				inStock,
				checkedAt: null
			} : offer)
		} : product));
		try {
			await toggleOfferStock({ data: {
				id: offerId,
				inStock
			} });
		} catch (err) {
			onChange(previous);
			setError(messageOf(err));
		}
	}
	async function remove(productId) {
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
	async function runCheck(force) {
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
	async function copyLink(code) {
		const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
		try {
			await navigator.clipboard.writeText(`${window.location.origin}${prefix}/r/${code}`);
			setCopied(code);
		} catch {
			setCopied(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-surface p-2 shadow-ring",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-2xl bg-surface-2 px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-wide text-primary uppercase",
					children: "Produtos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-xl font-semibold",
					children: "Seus links"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: beginCreate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-4",
						"aria-hidden": "true"
					}), "Novo"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 px-2 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-sm leading-snug", checkAlert ? "text-primary" : "text-muted"),
					children: checking ? "Conferindo na Shopee…" : checkNote ?? "Na visita, a Shopee confirma o estoque quando a URL tem o código …-i.loja.item."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					onClick: () => runCheck(true),
					disabled: checking || products.length === 0,
					children: checking ? "Conferindo…" : "Conferir estoque"
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				ref: formRef,
				className: "flex flex-col gap-3 px-2 py-3",
				onSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: editingId ? "O endereço do link não muda. A primeira oferta é a principal." : "A primeira oferta é a principal. As seguintes são backups."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 text-sm font-medium",
						children: ["Produto", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							onChange: (event) => setTitle(event.target.value),
							className: fieldClass
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm font-medium",
							children: ["Preço", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "decimal",
								value: price,
								onChange: (event) => setPrice(event.target.value),
								placeholder: "39,90",
								className: fieldClass
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5 text-sm font-medium",
							children: ["Comissão %", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "numeric",
								value: commission,
								onChange: (event) => setCommission(event.target.value),
								className: fieldClass
							})]
						})]
					}),
					offers.map((offer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-bg px-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-wide text-muted uppercase",
									children: index === 0 ? "Principal" : `Backup ${index}`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									role: "switch",
									"aria-checked": offer.inStock,
									onClick: () => updateOffer(index, { inStock: !offer.inStock }),
									className: cn("min-h-11 text-sm", offer.inStock ? "text-fg" : "text-muted"),
									children: offer.inStock ? "Em estoque" : "Sem estoque"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-2 flex flex-col gap-1.5 text-sm font-medium",
								children: ["Loja", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: offer.shop,
									onChange: (event) => updateOffer(index, { shop: event.target.value }),
									className: fieldClass
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-2 flex flex-col gap-1.5 text-sm font-medium",
								children: ["Link https", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: offer.url,
									onChange: (event) => updateOffer(index, { url: event.target.value }),
									inputMode: "url",
									className: fieldClass
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "min-h-11 px-1 text-sm font-medium text-fg disabled:opacity-40",
										disabled: index === 0,
										onClick: () => moveOffer(index, -1),
										children: "Subir"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "min-h-11 px-1 text-sm font-medium text-fg disabled:opacity-40",
										disabled: index === offers.length - 1,
										onClick: () => moveOffer(index, 1),
										children: "Descer"
									}),
									offers.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "min-h-11 px-1 text-sm font-medium text-fg",
										onClick: () => setOffers((current) => current.filter((item) => item.key !== offer.key)),
										children: "Tirar"
									}) : null
								]
							})
						]
					}, offer.key)),
					offers.length < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 text-sm font-medium text-fg",
						onClick: () => setOffers((current) => [...current, offerRow()]),
						children: "Adicionar backup"
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: pending,
							children: pending ? "Guardando…" : editingId ? "Salvar" : "Guardar produto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							className: "w-full",
							onClick: resetForm,
							children: "Cancelar"
						})]
					})
				]
			}) : null,
			products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-4 text-sm text-muted",
				children: "Nenhum produto ainda. O exemplo da página continua público."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2 p-2",
				children: products.map((product) => {
					const resolution = resolveSmartLink({
						code: product.code,
						title: product.title,
						detail: "",
						priceCents: product.priceCents,
						commissionPct: product.commissionPct,
						offers: product.offers
					});
					const copy = resolutionCopy(resolution);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl bg-bg px-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: product.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-xs text-muted",
								children: ["/r/", product.code]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted tabular-nums",
								children: [
									formatBrl(product.priceCents),
									" · ",
									product.commissionPct,
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm",
								children: ["Vai para ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: copy.title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex flex-col gap-2",
								children: product.offers.map((offer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "switch",
									"aria-checked": offer.inStock,
									onClick: () => toggle(product.id, offer.id, !offer.inStock),
									disabled: pending,
									className: "flex min-h-12 w-full items-center gap-3 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs font-semibold tracking-wide text-muted uppercase",
											children: index === 0 ? "Principal" : `Backup ${index}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate",
											children: offer.shop
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("text-right text-sm", offer.inStock ? "text-fg" : "text-muted"),
										children: [offer.inStock ? "Em estoque" : "Sem estoque", offer.checkedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-xs text-muted",
											children: "pela Shopee"
										}) : null]
									})]
								}) }, offer.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "ghost",
										className: "w-full px-2",
										onClick: () => copyLink(product.code),
										children: [copied === product.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied === product.code ? "Ok" : "Copiar"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										className: "w-full px-2",
										onClick: () => beginEdit(product),
										children: "Editar"
									}),
									confirmId === product.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										className: "w-full px-2",
										onClick: () => remove(product.id),
										disabled: pending,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											className: "size-4",
											"aria-hidden": "true"
										}), "Sim"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										className: "w-full px-2",
										onClick: () => setConfirmId(product.id),
										children: "Apagar"
									})
								]
							})
						]
					}, product.id);
				})
			}),
			!open && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-3 text-sm text-primary",
				children: error
			}) : null
		]
	});
	function updateOffer(index, patch) {
		setOffers((current) => current.map((offer, i) => i === index ? {
			...offer,
			...patch
		} : offer));
	}
	function moveOffer(index, direction) {
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
	function beginEdit(product) {
		setEditingId(product.id);
		setTitle(product.title);
		setPrice(centsToBrlInput(product.priceCents));
		setCommission(String(product.commissionPct));
		setOffers(product.offers.map((offer) => offerRow({
			key: offer.id,
			shop: offer.shop,
			url: offer.url,
			inStock: offer.inStock
		})));
		setError(null);
		setConfirmId(null);
		setOpen(true);
	}
}
function messageOf(error) {
	if (error instanceof Error && error.message && error.message !== "Unauthorized") return error.message;
	return "Não deu para salvar. Tente de novo.";
}
var STEPS = [
	{
		title: "Conectar a Shopee",
		body: "Suas credenciais de afiliado, para buscar oferta e montar o link."
	},
	{
		title: "Guardar o produto",
		body: "A oferta principal e os backups, na ordem em que o clique deve tentar."
	},
	{
		title: "Colar uma vez",
		body: "O mesmo endereço no story, no grupo ou na bio. O clique cai na oferta com estoque."
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid items-start gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-wide text-primary uppercase",
					children: "Para quem vende na Shopee"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-4xl leading-none font-semibold tracking-tight sm:text-5xl",
					children: "O clique não se perde quando acaba o estoque."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-base leading-relaxed text-muted",
					children: "Um link seu. Se a oferta principal sair do ar, o Linka manda a pessoa para o backup — sem você editar o story de novo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-8 divide-y divide-border border-y border-border",
					children: STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg text-primary tabular-nums",
							children: index + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: step.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: step.body
						})] })]
					}, step.title))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, {}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 text-sm leading-relaxed text-muted lg:mt-12",
			children: [
				"Quem clica não precisa de conta: o endereço manda direto para a oferta com estoque. Se todas acabarem, a pessoa vê que esgotou. A decisão também responde em",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "font-medium text-fg underline decoration-border underline-offset-4",
					href: `/api/r/${DEMO_CODE}`,
					children: ["/api/r/", DEMO_CODE]
				}),
				"."
			]
		})
	] });
}
function Welcome() {
	const user = useCurrentUser();
	const who = user?.displayName ?? user?.primaryEmail;
	if (!who) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-4 text-sm text-muted",
		children: [
			"Você entrou como ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-fg",
				children: who
			}),
			". O que cadastrar fica só com você."
		]
	});
}
//#endregion
export { Home as component };
