import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Check, c as Plus, f as ExternalLink, h as Clock, i as ShoppingBag, m as Copy, r as Trash2, s as RefreshCw, v as ArrowUp, y as ArrowDown } from "../_libs/lucide-react.mjs";
import { a as Card, c as Heading, d as Text, f as TextArea, i as Button, l as IconButton, m as VStack, o as DrawerPanel, p as TextInput, r as Banner, u as Switch } from "./ui-BbZxOCNN.mjs";
import { c as useCurrentUserState, n as PublicShell, s as useCurrentUser } from "./shell-1ZOA9Gcm.mjs";
import { a as resolutionCopy, n as findLink, o as resolveSmartLink, r as formatBrl, s as stockQuery, t as DEMO_CODE } from "./resolve-D_7ToDhA.mjs";
import { i as previewPathPrefix } from "./router-DU8Z9w-x.mjs";
import { t as HopNow } from "./hop-now-FtGZJZ_U.mjs";
import { t as billingEnabled } from "./purchases-CIxOrcXK.mjs";
import { t as centsToBrlInput } from "./input-DHVI1aSa.mjs";
import { a as getWorkspace, c as saveBioPage, d as usePurchases, i as editProduct, l as saveBioPagePhoto, n as ConsoleShell, o as refreshStock, r as addProduct, s as removeProduct, t as ConsolePending, u as setBioVisible } from "./console-CXZma-IZ.mjs";
import { i as productCap, n as lastVisitCopy, t as canAddProduct } from "./plans-BR9BKYkz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-tpQxLfc5.js
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
		padding: 5,
		"aria-label": "Simulador do link inteligente",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 5,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3 border-b border-[var(--color-border)] pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						color: "secondary",
						children: "Simulador"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						color: "secondary",
						children: "Marque o estoque"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 1,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
						level: 2,
						children: link.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl font-medium tabular-nums text-[var(--color-text-primary)]",
							children: formatBrl(link.priceCents)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-[var(--color-text-secondary)]",
							children: [link.commissionPct, "% de comissão"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VStack, {
					gap: 2,
					children: offers.map((offer, index) => {
						const isChosen = resolution.status === "ok" && resolution.offer.id === offer.id;
						const roleLabel = index === 0 ? "Oferta principal" : `Backup ${index}`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-xl border p-3 transition-colors ${isChosen ? "border-[var(--color-accent)] bg-[var(--color-surface)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"} ${offer.inStock ? "" : "opacity-60"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-[var(--color-text-secondary)]",
											children: roleLabel
										}), isChosen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HopNow, {}) : null]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium text-[var(--color-text-primary)]",
										children: offer.shop
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									label: offer.inStock ? "Em estoque" : "Esgotado",
									value: offer.inStock,
									onChange: () => toggle(offer.id)
								})]
							})
						}, offer.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							color: "secondary",
							children: "Destino da visita"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-medium text-[var(--color-text-primary)]",
								children: copy.title
							}), resolution.status === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HopNow, {}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "sm",
							color: "secondary",
							className: "mt-1",
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
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							size: 16,
							"aria-hidden": "true"
						}),
						label: "Testar clique",
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
function useWorkspace() {
	const user = useCurrentUser();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let cancelled = false;
		function load() {
			getWorkspace().then((next) => {
				if (!cancelled) {
					setData(next);
					setError(null);
				}
			}).catch(() => {
				if (!cancelled) setError("Não deu para carregar a sua conta.");
			});
		}
		load();
		function onVisible() {
			if (document.visibilityState === "visible") load();
		}
		document.addEventListener("visibilitychange", onVisible);
		window.addEventListener("focus", onVisible);
		return () => {
			cancelled = true;
			document.removeEventListener("visibilitychange", onVisible);
			window.removeEventListener("focus", onVisible);
		};
	}, [user?.id]);
	return {
		data,
		error,
		setData
	};
}
function SidePanel({ open, title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerPanel, {
		open,
		title,
		onClose,
		children
	});
}
var PASTE_CHANNEL_KEY = "linka-paste-channel";
var COPIED_CODES_KEY = "linka-copied-codes";
var PASTE_CHANNELS = [
	{
		id: "story",
		label: "Story"
	},
	{
		id: "grupo",
		label: "Grupo"
	},
	{
		id: "bio",
		label: "Bio"
	}
];
function readCopiedCodes() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.sessionStorage.getItem(COPIED_CODES_KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
	} catch {
		return [];
	}
}
function rememberCopied(code) {
	const next = Array.from(/* @__PURE__ */ new Set([...readCopiedCodes(), code]));
	window.sessionStorage.setItem(COPIED_CODES_KEY, JSON.stringify(next));
}
function activationPct(productCount, copied) {
	if (copied) return 100;
	if (productCount > 0) return 60;
	return 20;
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
function WorkspacePending({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-busy": !error,
		children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
			status: "error",
			title: error
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-2xl bg-[var(--color-surface)]" })
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
	const prefix = typeof window === "undefined" ? "" : previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
	const photoSrc = `${prefix}/p/${bio.code}/photo${photoNonce ? `?t=${photoNonce}` : ""}`;
	const bioUrl = `${prefix}/p/${bio.code}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		padding: 4,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative grid size-20 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full border-2 border-[var(--color-border)] bg-[var(--color-background-body)] shadow-sm hover:border-[var(--color-accent)] transition-colors",
				children: [
					bio.hasPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photoSrc,
						alt: bio.title,
						className: "size-20 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-0.5 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
							size: 20,
							className: "text-[var(--color-text-secondary)]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-medium text-[var(--color-text-secondary)]",
							children: "Foto"
						})]
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
						children: photoPending ? "Enviando foto…" : "Enviar foto de perfil"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
				gap: 1,
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base font-medium text-[var(--color-text-primary)]",
							children: bio.title || "Sua página da bio"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-[var(--color-text-secondary)]",
						children: ["Endereço público: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[var(--color-text-primary)]",
							children: ["/p/", bio.code]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							icon: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 }),
							label: copied ? "Copiado" : "Copiar link da bio",
							onClick: copyAddress
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							href: bioUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 16 }),
							label: "Abrir bio"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "mt-4 border-t border-[var(--color-border)] pt-4",
			onSubmit: save,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
				gap: 3,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						label: "Nome da página ou perfil",
						value: title,
						onChange: setTitle,
						placeholder: "Ex: Achadinhos da Mari · Shopee",
						width: "100%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						label: "Descrição para seus seguidores",
						value: description,
						onChange: setDescription,
						placeholder: "Ex: Ofertas da Shopee que eu indico",
						rows: 2,
						width: "100%"
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
						status: "error",
						title: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end pt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							isDisabled: pending || photoPending,
							isLoading: pending,
							label: pending ? "Salvando…" : "Salvar informações da bio"
						})
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
function ActivationBar({ pct }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 1,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
			size: "xsm",
			color: "secondary",
			children: [pct, "% do caminho até colar o /r no Story"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-border)]",
			role: "progressbar",
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuenow": pct,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-full rounded-full bg-[var(--color-accent)] ${pct >= 100 ? "w-full" : pct >= 60 ? "w-3/5" : "w-1/5"}` })
		})]
	});
}
function ActivationEmpty({ onCompose, onDemoDraft }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 4,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivationBar, { pct: 20 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				padding: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 4,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
							gap: 2,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
								level: 2,
								className: "text-lg font-medium",
								children: "Monte o link e cole no Story"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								color: "secondary",
								className: "max-w-md text-sm",
								children: "Uma ação nesta tela. A bio espera o primeiro /r. Marque onde você cola o achadinho e cadastre a principal com um backup."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
							gap: 2,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								weight: "medium",
								children: "Onde você cola o link?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: PASTE_CHANNELS.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									label: channel.label,
									onClick: () => onCompose(channel.id)
								}, channel.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									size: 16,
									"aria-hidden": "true"
								}),
								label: "Montar meu primeiro link",
								onClick: () => onCompose()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								label: "Usar o sérum de exemplo",
								onClick: onDemoDraft
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bench, {})
		]
	});
}
function LinksPanel({ bio, products, canCheck, pollMs, onChange, composing, composeNonce, onComposingChange }) {
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
	const [justCreated, setJustCreated] = (0, import_react.useState)(null);
	const [copiedCodes, setCopiedCodes] = (0, import_react.useState)([]);
	const [capHit, setCapHit] = (0, import_react.useState)(false);
	const { isPro } = usePurchases();
	const cap = productCap({
		billingEnabled,
		isPro
	});
	const canAdd = canAddProduct(products.length, cap);
	(0, import_react.useEffect)(() => {
		if (!canCheck || products.length === 0) return;
		let stop = false;
		runCheck(false);
		const id = window.setInterval(() => {
			if (!stop) runCheck(false);
		}, pollMs);
		return () => {
			stop = true;
			window.clearInterval(id);
		};
	}, [
		canCheck,
		pollMs,
		products.length
	]);
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
		setCopiedCodes(readCopiedCodes());
	}, []);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const id = window.setTimeout(() => setCopied(null), 1600);
		return () => window.clearTimeout(id);
	}, [copied]);
	(0, import_react.useEffect)(() => {
		if (!composing || editingId || canAdd) return;
		onComposingChange(false);
		setCapHit(true);
	}, [
		canAdd,
		composing,
		editingId,
		onComposingChange
	]);
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
			if (!editingId) {
				setJustCreated(product.code);
				copyLink(product.code);
			}
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
			rememberCopied(code);
			setCopiedCodes(readCopiedCodes());
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
	function beginCompose(channel) {
		if (!canAdd) {
			setCapHit(true);
			return;
		}
		if (channel) window.sessionStorage.setItem(PASTE_CHANNEL_KEY, channel);
		setEditingId(null);
		setError(null);
		onComposingChange(true);
	}
	function fillDemoDraft() {
		const seed = findLink(DEMO_CODE);
		if (!seed) {
			beginCompose();
			return;
		}
		if (!canAdd) {
			setCapHit(true);
			return;
		}
		setEditingId(null);
		setTitle(seed.title);
		setPrice(centsToBrlInput(seed.priceCents));
		setCommission(String(seed.commissionPct));
		setOffers(seed.offers.map((offer) => offerRow({
			shop: offer.shop,
			url: offer.url,
			inStock: offer.inStock
		})));
		setError(null);
		onComposingChange(true);
	}
	const hasCopied = products.some((item) => copiedCodes.includes(item.code));
	const progress = activationPct(products.length, hasCopied);
	const publicPrefix = typeof window === "undefined" ? "" : previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 4,
		children: [
			products.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BioBlock, {
				bio,
				onChange: (next) => onChange({ bio: next })
			}) : null,
			products.length > 0 && progress < 100 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivationBar, { pct: progress }) : null,
			justCreated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
				status: "success",
				title: `Cole /r/${justCreated} no Story`,
				description: "Esse é o valor: um endereço que não precisa reeditar quando a loja zera."
			}) : null,
			capHit && billingEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
				gap: 2,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
					status: "warning",
					title: isPro ? "O Pro guarda até 10 achadinhos" : "Você tentou o 2º achadinho",
					description: isPro ? "Esse é o teto deste plano." : "A conta grátis guarda 1. Ative o Pro para não perder o backup extra."
				}), !isPro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					href: "/plano",
					label: "Ativar Pro"
				}) : null]
			}) : null,
			products.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
						size: 16,
						className: "shrink-0 text-[var(--color-text-secondary)]",
						"aria-hidden": "true"
					}), checkAlert ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-[var(--color-text-secondary)]",
						children: checkNote ?? "Estoque indisponível agora."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-[var(--color-text-secondary)]",
						children: canCheck ? checking ? "Conferindo disponibilidade no catálogo Shopee…" : checkNote ?? "Conferência automática ativa: a Shopee verifica o estoque de links com código a cada 15 min." : "Controle de estoque manual: você marca o que vende. O clique tenta a principal e cai no backup ativo."
					})]
				}), canCheck ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						size: 14,
						className: checking ? "animate-spin" : ""
					}),
					label: checking ? "Conferindo…" : "Conferir agora",
					isDisabled: checking || products.length === 0,
					isLoading: checking,
					onClick: () => runCheck(true)
				}) : null]
			}) : null,
			!composing && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
				status: "error",
				title: error
			}) : null,
			products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivationEmpty, {
				onCompose: beginCompose,
				onDemoDraft: fillDemoDraft
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3 lg:hidden",
				children: products.map((product) => {
					const { status } = product;
					const inStock = status.on;
					const isCopied = copied === product.code;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-left text-base font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-text-accent)] focus-visible:outline-none",
									onClick: () => beginEdit(product),
									children: product.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex shrink-0 items-center gap-2 text-xs text-[var(--color-text-secondary)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `size-1.5 rounded-full ${inStock ? "bg-[#16a34a]" : "bg-[#dc2626]"}`,
										"aria-hidden": "true"
									}), status.label]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base font-medium tabular-nums text-[var(--color-text-primary)]",
									children: formatBrl(product.priceCents)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-[var(--color-text-secondary)]",
									children: [product.commissionPct, "% de comissão"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-lg bg-[var(--color-background-body)] p-3 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 text-[var(--color-text-secondary)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Destino" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex min-w-0 items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate font-medium text-[var(--color-text-primary)]",
												children: product.destinationTitle
											}), inStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HopNow, {}) : null]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center justify-between font-mono text-[11px] text-[var(--color-text-secondary)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["/r/", product.code] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] text-[var(--color-text-accent)]",
											children: [
												product.offers.length,
												" ",
												product.offers.length === 1 ? "oferta" : "ofertas"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-[11px] text-[var(--color-text-secondary)]",
										children: lastVisitCopy(product.lastVisit)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									label: product.bioVisible ? "Na bio" : "Oculto",
									value: product.bioVisible,
									isDisabled: pending,
									onChange: () => toggleVisible(product)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											href: `${publicPrefix}/r/${product.code}`,
											target: "_blank",
											rel: "noopener noreferrer",
											label: "Testar clique"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "secondary",
											icon: isCopied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 }),
											label: isCopied ? "Copiado" : "Copiar",
											onClick: () => copyLink(product.code)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											label: "Editar",
											onClick: () => beginEdit(product)
										}),
										confirmId === product.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "destructive",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												size: 14,
												"aria-hidden": "true"
											}),
											label: "Confirmar",
											isDisabled: pending,
											onClick: () => remove(product.id)
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
											variant: "ghost",
											label: "Apagar",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												size: 14,
												"aria-hidden": "true"
											}),
											onClick: () => setConfirmId(product.id)
										})
									]
								})]
							})
						]
					}, product.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[46rem] border-collapse text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-[var(--color-background-body)] text-xs font-medium text-[var(--color-text-secondary)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Produto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Link"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Preço"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Estoque"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Destino"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Na bio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right",
								children: "Ações"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-[var(--color-border)]",
						children: products.map((product) => {
							const { status } = product;
							const inStock = status.on;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-[var(--color-background-body)]/40 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-left font-semibold text-sm text-[var(--color-text-primary)] hover:text-[var(--color-text-accent)] focus-visible:outline-none",
											onClick: () => beginEdit(product),
											children: product.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-[var(--color-text-secondary)]",
											children: [product.commissionPct, "% de comissão estimada"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs text-[var(--color-text-secondary)]",
											children: ["/r/", product.code]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold tabular-nums text-[var(--color-text-primary)]",
											children: formatBrl(product.priceCents)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2 text-xs text-[var(--color-text-secondary)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `size-1.5 rounded-full ${inStock ? "bg-[#16a34a]" : "bg-[#dc2626]"}`,
												"aria-hidden": "true"
											}), status.label]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "max-w-72 px-4 py-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate text-xs font-medium text-[var(--color-text-primary)]",
												children: product.destinationTitle
											}), inStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HopNow, {}) : null]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-[var(--color-text-secondary)]",
											children: lastVisitCopy(product.lastVisit)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											label: product.bioVisible ? "Sim" : "Não",
											value: product.bioVisible,
											isDisabled: pending,
											onChange: () => toggleVisible(product)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-end gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													href: `${publicPrefix}/r/${product.code}`,
													target: "_blank",
													rel: "noopener noreferrer",
													label: "Testar clique"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "secondary",
													icon: copied === product.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 }),
													label: copied === product.code ? "Copiado" : "Copiar",
													onClick: () => copyLink(product.code)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													label: "Editar",
													onClick: () => beginEdit(product)
												}),
												confirmId === product.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "destructive",
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
														size: 14,
														"aria-hidden": "true"
													}),
													label: "Confirmar",
													isDisabled: pending,
													onClick: () => remove(product.id)
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
													variant: "ghost",
													label: "Apagar",
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
														size: 14,
														"aria-hidden": "true"
													}),
													onClick: () => setConfirmId(product.id)
												})
											]
										})
									})
								]
							}, product.id);
						})
					})]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidePanel, {
				open: composing,
				title: editingId ? "Editar achadinho" : "Novo achadinho",
				onClose: resetForm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex min-h-0 flex-1 flex-col",
					onSubmit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
						gap: 4,
						padding: 4,
						className: "flex-1 overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-xs text-[var(--color-text-secondary)]",
								children: editingId ? "O endereço público do link não muda. A primeira oferta é sempre a principal que o clique tenta primeiro." : "Cadastre o produto da Shopee. A primeira oferta é a principal; as seguintes são os backups que assumem quando o estoque zerar."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: "Nome do produto",
								value: title,
								onChange: setTitle,
								placeholder: "Ex: Sérum Vitamina C 30ml",
								width: "100%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: "Preço aproximado (R$)",
									value: price,
									onChange: setPrice,
									placeholder: "39,90",
									width: "100%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: "Comissão estimada (%)",
									value: commission,
									onChange: setCommission,
									placeholder: "18",
									width: "100%"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-[var(--color-border)] pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-medium text-[var(--color-text-secondary)]",
										children: [
											"Lojas e ofertas (",
											offers.length,
											" de 4)"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[var(--color-text-secondary)]",
										children: "Ordem de tentativa do clique"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
									gap: 3,
									children: [offers.map((offer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
										padding: 3,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
											gap: 2,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-medium text-[var(--color-text-secondary)]",
														children: index === 0 ? "1. Oferta principal" : `${index + 1}. Backup ${index}`
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
														label: offer.inStock ? "Em estoque" : "Esgotado",
														value: offer.inStock,
														onChange: (next) => updateOffer(index, { inStock: next })
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
													label: "Nome da loja na Shopee",
													value: offer.shop,
													onChange: (value) => updateOffer(index, { shop: value }),
													placeholder: "Ex: Loja Oficial Shopee",
													width: "100%"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
													label: "Link de afiliado Shopee (https://)",
													value: offer.url,
													onChange: (value) => updateOffer(index, { url: value }),
													placeholder: "https://shopee.com.br/produto...",
													width: "100%"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between pt-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															variant: "ghost",
															icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { size: 14 }),
															label: "Subir",
															isDisabled: index === 0,
															onClick: () => moveOffer(index, -1)
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															variant: "ghost",
															icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { size: 14 }),
															label: "Descer",
															isDisabled: index === offers.length - 1,
															onClick: () => moveOffer(index, 1)
														})]
													}), offers.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }),
														label: "Remover",
														onClick: () => setOffers((current) => current.filter((item) => item.key !== offer.key))
													}) : null]
												})
											]
										})
									}, offer.key)), offers.length < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }),
										label: "Adicionar loja de backup",
										onClick: () => setOffers((current) => [...current, offerRow()])
									}) : null]
								})]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
								status: "error",
								title: error
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-2 border-t border-[var(--color-border)] px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-[var(--color-surface)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							label: "Cancelar",
							onClick: resetForm
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							isDisabled: pending,
							isLoading: pending,
							label: pending ? "Salvando…" : editingId ? "Salvar alterações" : "Criar achadinho"
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
		variant: "primary",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
			size: 16,
			"aria-hidden": "true"
		}),
		label: "Novo achadinho",
		onClick
	});
}
function messageOf(error) {
	if (error instanceof Error && error.message && error.message !== "Unauthorized") return error.message;
	return "Não deu para salvar. Tente de novo.";
}
var STEPS = [
	{
		title: "O story de ontem ainda aponta pra esgotado",
		body: "Quem clica cai numa loja vazia. Você perde o clique e a comissão, e ainda reedita o Story no meio do expediente."
	},
	{
		title: "Cole um único /r no Story, no grupo e na bio",
		body: "Guarde a oferta principal e até 3 backups. O endereço não muda quando a loja zera."
	},
	{
		title: "O clique cai na loja com estoque",
		body: "Se a principal esgotar, o seguidor vai para a primeira reserva disponível. Sem você trocar o link."
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
		subtitle: data && data.products.length === 0 ? "Uma ação: montar o link e colar no Story." : "Cole o /r no Story. O clique cai no backup.",
		action: data && data.products.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewLinkButton, { onClick: () => {
			setComposing(true);
			setComposeNonce((n) => n + 1);
		} }) : void 0,
		children: !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspacePending, { error }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinksPanel, {
			bio: data.bio,
			products: data.products,
			canCheck: data.stock.automatic,
			pollMs: data.pollMs,
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-center gap-12 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-2 lg:gap-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 6,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 4,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							level: 1,
							type: "display-1",
							children: "O clique não se perde quando acaba o estoque na Shopee"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							color: "secondary",
							className: "max-w-xl text-base sm:text-lg",
							children: "Pra quem posta achadinho no Story, no grupo e na bio. Se a loja principal esgotar, o Linka manda o seguidor para o backup com estoque — sem você reeditar o Story."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							color: "secondary",
							className: "max-w-xl text-sm",
							children: "O story de ontem ainda aponta pra esgotado."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						href: "/login",
						variant: "primary",
						label: "Montar meu link agora"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						color: "secondary",
						children: "2 min, sem cartão"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]",
					children: STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 shrink-0 font-mono text-sm text-[var(--color-text-secondary)] tabular-nums",
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
	}), foundation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoundationCheck, {}) : null] });
}
//#endregion
export { Home as component };
