import { o as __toESM } from "../_runtime.mjs";
import { a as resolutionCopy, n as findLink, o as resolveSmartLink, r as formatBrl, s as stockQuery, t as DEMO_CODE } from "./resolve-D_7ToDhA.mjs";
import { C as require_react, S as require_jsx_runtime, _ as Button, a as Switch, c as Banner, i as IconButton, l as TextInput, m as VStack, n as Drawer, p as Card, r as TextArea, t as DrawerHeader, v as Heading, y as Text } from "../_libs/@astryxdesign/core+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { a as parsePhotoBase64, i as cleanBioIdentity } from "./bio-DfR42D11.mjs";
import { a as Link2, i as Plus, n as Trash2, o as Copy, s as Check } from "../_libs/lucide-react.mjs";
import { a as createSsrRpc, i as previewPathPrefix } from "./router-CKwuZXMT.mjs";
import { i as useCurrentUserState, r as useCurrentUser } from "./gates-CdeB3G3x.mjs";
import { t as PublicShell } from "./shell-Dr1Kw_S6.mjs";
import { n as ConsoleShell, t as ConsolePending } from "./console-w3pyHje1.mjs";
import { n as cleanProduct, t as centsToBrlInput } from "./input-DHVI1aSa.mjs";
import { t as authMiddleware } from "./middleware-D1AJi57i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-COW0d1Ol.js
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		padding: 2,
		"aria-label": "Simulador do link",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 3,
			padding: 2,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 1,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							color: "secondary",
							size: "sm",
							children: link.detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							level: 2,
							children: link.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							hasTabularNumbers: true,
							children: [formatBrl(link.priceCents), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
								as: "span",
								color: "accent",
								weight: "semibold",
								children: [
									" ",
									"· ",
									link.commissionPct,
									"% de comissão"
								]
							})]
						})
					]
				}),
				offers.map((offer, index) => {
					const chosen = resolution.status === "ok" && resolution.offer.id === offer.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						padding: 3,
						elevation: chosen ? "low" : "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							label: `${index === 0 ? "Principal" : `Backup ${index}`}: ${offer.shop}`,
							description: offer.inStock ? "Em estoque" : "Sem estoque",
							value: offer.inStock,
							onChange: () => toggle(offer.id),
							width: "100%"
						})
					}, offer.id);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 2,
					padding: 2,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							color: "secondary",
							size: "sm",
							children: "Para onde o clique vai"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							level: 3,
							children: copy.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							color: "secondary",
							size: "sm",
							children: copy.body
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						width: "100%",
						icon: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							size: 16,
							"aria-hidden": "true"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							size: 16,
							"aria-hidden": "true"
						}),
						label: copied ? "Copiado" : "Copiar link",
						onClick: copyLink
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						href: `/r/${DEMO_CODE}?on=${encodeURIComponent(on)}`,
						variant: "secondary",
						label: "Abrir link",
						target: "_blank",
						rel: "noopener noreferrer"
					})]
				})
			]
		})
	});
}
/** Temporary layer-order smoke. Open `/?foundation=1`. */
function FoundationCheck() {
	const [email, setEmail] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-foundation-check": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 4,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					label: "Primary action",
					variant: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					label: "Email",
					placeholder: "você@exemplo.com",
					value: email,
					onChange: setEmail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: "One card with default padding" })
			]
		})
	});
}
var getWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("059bf76fbf611564222d39fd40694a844bb8b9c432118bb9386713e7f2bd5858"));
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
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) throw new Error("Oferta inválida.");
	if (typeof body.inStock !== "boolean") throw new Error("Estoque inválido.");
	return {
		id: body.id,
		inStock: body.inStock
	};
}).handler(createSsrRpc("d1ca61e51831a5144615f1a875a3648c530cb6fd4ccc502959ae70e645cb4b7b"));
var saveBioPage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	return cleanBioIdentity({
		title: typeof body.title === "string" ? body.title : "",
		description: typeof body.description === "string" ? body.description : ""
	});
}).handler(createSsrRpc("671c6231c477b6e3a61a2ad3cbd21c50d3a5daa7a8b1801805f106fb9be3aa94"));
var saveBioPagePhoto = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	const image = typeof body.image === "string" ? body.image : "";
	parsePhotoBase64(image);
	return image;
}).handler(createSsrRpc("d1c866f6bb64598b8e02014942993e825b4a33b18b1135664b5bdf3ce1a93e87"));
var setBioVisible = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
	const body = asRecord(data);
	if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) throw new Error("Produto inválido.");
	if (typeof body.visible !== "boolean") throw new Error("Visibilidade inválida.");
	return {
		id: body.id,
		visible: body.visible
	};
}).handler(createSsrRpc("c1bfa749da67285516a5b0fee467b4817cdff3078f3618c11cb56fb8cf90f0ae"));
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
function useWorkspace() {
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
	return {
		data,
		error,
		setData
	};
}
function SidePanel({ open, title, onClose, children }) {
	function handleOpenChange(next) {
		if (!next) onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		isOpen: open,
		onOpenChange: handleOpenChange,
		label: title,
		side: "end",
		purpose: "form",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerHeader, {
			title,
			onOpenChange: handleOpenChange
		}), children]
	});
}
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
function stockOf(product) {
	const resolution = resolveSmartLink({
		code: product.code,
		title: product.title,
		detail: "",
		priceCents: product.priceCents,
		commissionPct: product.commissionPct,
		offers: product.offers
	});
	return {
		copy: resolutionCopy(resolution),
		status: resolution.status === "ok" ? {
			label: "Em estoque",
			on: true
		} : resolution.status === "all_out" ? {
			label: "Esgotado",
			on: false
		} : {
			label: "Sem destino",
			on: false
		}
	};
}
function WorkspacePending({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-busy": !error,
		children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
			status: "error",
			title: error
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-3xl bg-surface" })
	});
}
function BioBlock({ bio, onChange }) {
	const [title, setTitle] = (0, import_react.useState)(bio.title);
	const [description, setDescription] = (0, import_react.useState)(bio.description);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [photoPending, setPhotoPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [photoNonce, setPhotoNonce] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setTitle(bio.title);
		setDescription(bio.description);
	}, [
		bio.code,
		bio.title,
		bio.description
	]);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const id = window.setTimeout(() => setCopied(false), 1600);
		return () => window.clearTimeout(id);
	}, [copied]);
	async function save(event) {
		event.preventDefault();
		setPending(true);
		setError(null);
		try {
			onChange(await saveBioPage({ data: {
				title,
				description
			} }));
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
	async function onPhoto(file) {
		if (!file) return;
		setPhotoPending(true);
		setError(null);
		try {
			if (file.size > 1e6) throw new Error("A foto precisa ter no máximo 1 MB.");
			const next = await saveBioPagePhoto({ data: { image: await readFileAsDataUrl(file) } });
			setPhotoNonce(Date.now());
			onChange(next);
		} catch (err) {
			setError(messageOf(err));
		} finally {
			setPhotoPending(false);
		}
	}
	const photoSrc = `${typeof window === "undefined" ? "" : previewPathPrefix(window.location.hostname, window.location.pathname) ?? ""}/p/${bio.code}/photo${photoNonce ? `?t=${photoNonce}` : ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		padding: 4,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid size-20 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-body",
				children: [
					bio.hasPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photoSrc,
						alt: "",
						className: "size-20 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						color: "secondary",
						children: "Foto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/jpeg,image/png,image/webp",
						className: "sr-only",
						disabled: photoPending,
						onChange: (event) => {
							const file = event.target.files?.[0];
							event.target.value = "";
							onPhoto(file);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: photoPending ? "Enviando foto" : "Enviar foto de perfil"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
				gap: 1,
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						weight: "medium",
						children: "Página da bio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
						size: "sm",
						color: "secondary",
						children: ["/p/", bio.code]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						icon: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 }),
						label: copied ? "Copiado" : "Copiar link",
						onClick: copyAddress
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "mt-4",
			onSubmit: save,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
				gap: 3,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "Título",
						value: title,
						onChange: setTitle,
						width: "100%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						label: "Descrição",
						value: description,
						onChange: setDescription,
						rows: 3,
						width: "100%"
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
						status: "error",
						title: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						isDisabled: pending || photoPending,
						isLoading: pending,
						label: pending ? "Salvando…" : "Salvar página"
					})
				]
			})
		})]
	});
}
function readFileAsDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result ?? ""));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Não deu para ler a foto."));
		reader.readAsDataURL(file);
	});
}
function LinksPanel({ bio, products, canCheck, onChange, composing, composeNonce, onComposingChange }) {
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
		if (composeNonce === 0) return;
		setEditingId(null);
		setTitle("");
		setPrice("");
		setCommission("12");
		setOffers(blankOffers());
		setError(null);
		setConfirmId(null);
	}, [composeNonce]);
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
			onChange({ products: editingId ? products.map((item) => item.id === product.id ? product : item) : [product, ...products] });
			resetForm();
		} catch (err) {
			setError(messageOf(err));
		} finally {
			setPending(false);
		}
	}
	async function remove(productId) {
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
	async function runCheck(force) {
		setChecking(true);
		try {
			const result = await refreshStock({ data: { force } });
			onChange({ products: result.products });
			setCheckNote(result.detail);
			setCheckAlert(result.state === "rejected" || result.state === "unreachable" || result.state === "throttled" || result.state === "not_configured");
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
	async function toggleVisible(product) {
		const visible = !product.bioVisible;
		setPending(true);
		setError(null);
		try {
			await setBioVisible({ data: {
				id: product.id,
				visible
			} });
			onChange({ products: products.map((item) => item.id === product.id ? {
				...item,
				bioVisible: visible
			} : item) });
		} catch (err) {
			setError(messageOf(err));
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 4,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BioBlock, {
				bio,
				onChange: (next) => onChange({ bio: next })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [checkAlert ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
					status: "warning",
					title: checkNote ?? "Estoque indisponível agora."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					color: "secondary",
					size: "sm",
					children: canCheck ? checking ? "Conferindo na Shopee…" : checkNote ?? "Na visita, a Shopee confirma o estoque quando a URL tem o código …-i.loja.item." : "Você marca o estoque de cada oferta. O clique tenta a principal e cai no backup que ainda estiver marcada."
				}), canCheck ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					label: checking ? "Conferindo…" : "Conferir estoque",
					isDisabled: checking || products.length === 0,
					isLoading: checking,
					onClick: () => runCheck(true)
				}) : null]
			}),
			!composing && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
				status: "error",
				title: error
			}) : null,
			products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				padding: 8,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 3,
					hAlign: "center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
							className: "size-8 text-secondary",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							color: "secondary",
							children: "Nenhum produto ainda."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								size: 16,
								"aria-hidden": "true"
							}),
							label: "Adicionar produto",
							onClick: () => onComposingChange(true)
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VStack, {
				gap: 3,
				className: "lg:hidden",
				children: products.map((product) => {
					const { copy, status } = stockOf(product);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						padding: 4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
							gap: 2,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									label: product.title,
									onClick: () => beginEdit(product)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									color: "secondary",
									children: status.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									size: "sm",
									color: "secondary",
									hasTabularNumbers: true,
									children: [
										formatBrl(product.priceCents),
										" · ",
										product.commissionPct,
										"%"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
									size: "sm",
									color: "secondary",
									children: ["/r/", product.code]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									color: "secondary",
									children: copy.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									label: product.bioVisible ? "Visível na bio" : "Oculto na bio",
									value: product.bioVisible,
									isDisabled: pending,
									onChange: () => toggleVisible(product)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										icon: copied === product.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 }),
										label: copied === product.code ? "Copiado" : "Copiar",
										onClick: () => copyLink(product.code)
									}), confirmId === product.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "destructive",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											size: 16,
											"aria-hidden": "true"
										}),
										label: "Sim",
										isDisabled: pending,
										onClick: () => remove(product.id)
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										label: "Apagar",
										onClick: () => setConfirmId(product.id)
									})]
								})
							]
						})
					}, product.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-x-auto rounded-xl border border-border lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[40rem] border-collapse text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted text-xs font-medium tracking-wide text-secondary uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Produto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Código"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Preço"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Estoque"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Destino"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Bio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Ações"
								})
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: products.map((product) => {
						const { copy, status } = stockOf(product);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										label: product.title,
										onClick: () => beginEdit(product)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
										size: "sm",
										color: "secondary",
										hasTabularNumbers: true,
										children: [product.commissionPct, "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
										size: "sm",
										color: "secondary",
										children: ["/r/", product.code]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										hasTabularNumbers: true,
										children: formatBrl(product.priceCents)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										children: status.label
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "max-w-40 truncate px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
										size: "sm",
										children: copy.title
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										label: product.bioVisible ? "Visível" : "Oculto",
										value: product.bioVisible,
										isDisabled: pending,
										onChange: () => toggleVisible(product)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											variant: "ghost",
											label: copied === product.code ? "Copiado" : "Copiar",
											icon: copied === product.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 }),
											onClick: () => copyLink(product.code)
										}), confirmId === product.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "destructive",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												size: 16,
												"aria-hidden": "true"
											}),
											label: "Sim",
											isDisabled: pending,
											onClick: () => remove(product.id)
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											label: "Apagar",
											onClick: () => setConfirmId(product.id)
										})]
									})
								})
							]
						}, product.id);
					}) })]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidePanel, {
				open: composing,
				title: editingId ? "Editar produto" : "Novo produto",
				onClose: resetForm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex min-h-0 flex-1 flex-col",
					onSubmit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
						gap: 3,
						padding: 4,
						className: "flex-1 overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								color: "secondary",
								size: "sm",
								children: editingId ? "O endereço do link não muda. A primeira oferta é a principal." : "A primeira oferta é a principal. As seguintes são backups."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								color: "secondary",
								size: "sm",
								children: "Link encurtado (shope.ee) sem o código da loja e do item (…-i.loja.item) não entra na conferência. O estoque fica o que você marcar."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Nome",
								value: title,
								onChange: setTitle,
								placeholder: "Sérum de vitamina C",
								width: "100%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: "Preço",
									value: price,
									onChange: setPrice,
									placeholder: "39,90",
									width: "100%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: "Comissão %",
									value: commission,
									onChange: setCommission,
									width: "100%"
								})]
							}),
							offers.map((offer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								padding: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
									gap: 2,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "sm",
											color: "secondary",
											weight: "semibold",
											children: index === 0 ? "Principal" : `Backup ${index}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											label: offer.inStock ? "Em estoque" : "Sem estoque",
											value: offer.inStock,
											onChange: (next) => updateOffer(index, { inStock: next })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											label: "Loja",
											value: offer.shop,
											onChange: (value) => updateOffer(index, { shop: value }),
											width: "100%"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
											label: "Link https",
											value: offer.url,
											onChange: (value) => updateOffer(index, { url: value }),
											width: "100%"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													label: "Subir",
													isDisabled: index === 0,
													onClick: () => moveOffer(index, -1)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													label: "Descer",
													isDisabled: index === offers.length - 1,
													onClick: () => moveOffer(index, 1)
												}),
												offers.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													label: "Tirar",
													onClick: () => setOffers((current) => current.filter((item) => item.key !== offer.key))
												}) : null
											]
										})
									]
								})
							}, offer.key)),
							offers.length < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								label: "Adicionar backup",
								onClick: () => setOffers((current) => [...current, offerRow()])
							}) : null,
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
								status: "error",
								title: error
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 border-t border-border px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							label: "Cancelar",
							onClick: resetForm
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							isDisabled: pending,
							isLoading: pending,
							label: pending ? "Guardando…" : editingId ? "Salvar" : "Criar"
						})]
					})]
				})
			})
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
		onComposingChange(false);
		setError(null);
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
		onComposingChange(true);
	}
}
function NewLinkButton({ onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
			size: 16,
			"aria-hidden": "true"
		}),
		label: "Adicionar produto",
		onClick
	});
}
function messageOf(error) {
	if (error instanceof Error && error.message && error.message !== "Unauthorized") return error.message;
	return "Não deu para salvar. Tente de novo.";
}
var STEPS = [
	{
		title: "Guardar o produto",
		body: "A oferta principal e os backups, na ordem em que o clique deve tentar."
	},
	{
		title: "Colar uma vez",
		body: "O mesmo endereço no story, no grupo ou na bio. O clique cai na oferta com estoque."
	},
	{
		title: "O backup entra se a principal acabar",
		body: "Você marca o que ainda vende. Se a principal sair, o clique vai para o próximo backup."
	}
];
function Home() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePending, {});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinksHome, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicHome, {});
}
function LinksHome() {
	const { data, error, setData } = useWorkspace();
	const [composing, setComposing] = (0, import_react.useState)(false);
	const [composeNonce, setComposeNonce] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsoleShell, {
		current: "links",
		title: "Links",
		subtitle: "A página da bio e os links de cada produto.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewLinkButton, { onClick: () => {
			setComposing(true);
			setComposeNonce((n) => n + 1);
		} }),
		children: !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePending, { error }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinksPanel, {
			bio: data.bio,
			products: data.products,
			canCheck: data.stock.automatic,
			onChange: (patch) => setData({
				...data,
				...patch
			}),
			composing,
			composeNonce,
			onComposingChange: setComposing
		})
	});
}
function PublicHome() {
	const [foundation, setFoundation] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setFoundation(new URLSearchParams(window.location.search).has("foundation"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid items-start gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
				gap: 4,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						color: "accent",
						weight: "semibold",
						children: "Para quem vende na Shopee"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
						level: 1,
						type: "display-1",
						children: "O clique não se perde quando acaba o estoque."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						color: "secondary",
						children: "Um link seu. Se a oferta principal sair do ar, o Linka manda a pessoa para o backup — sem você editar o story de novo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "divide-y divide-border border-y border-border",
						children: STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								color: "accent",
								weight: "semibold",
								children: index + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
								gap: 1,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									weight: "medium",
									children: step.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									color: "secondary",
									size: "sm",
									children: step.body
								})]
							})]
						}, step.title))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
			color: "secondary",
			className: "mt-8 lg:mt-12",
			children: [
				"Quem clica não precisa de conta: o endereço manda direto para a oferta com estoque. Se todas acabarem, a pessoa vê que esgotou. A decisão também responde em",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "font-medium underline",
					href: `/api/r/${DEMO_CODE}`,
					children: ["/api/r/", DEMO_CODE]
				}),
				"."
			]
		}),
		foundation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoundationCheck, {}) : null
	] });
}
//#endregion
export { Home as component };
