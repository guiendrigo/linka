import { o as __toESM } from "../_runtime.mjs";
import { a as resolutionCopy, o as resolveSmartLink, r as formatBrl } from "./resolve-Czhe8mfX.mjs";
import { C as require_jsx_runtime, Q as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { i as hasGateSessionMarker } from "./server-gRi9Ky3U.mjs";
import { a as Plus, c as Copy, i as Store, l as Check, o as Menu, r as Trash2, s as Link2, t as X } from "../_libs/lucide-react.mjs";
import { i as createSsrRpc, r as previewPathPrefix } from "./router-DnyDjaPg.mjs";
import { i as signOut } from "./client-hY9gS4ye.mjs";
import { a as cn, o as useCurrentUser, t as Button } from "./gates-vBYncvM2.mjs";
import { n as cleanCredentials, r as cleanProduct, t as centsToBrlInput } from "./input-Bpl--re0.mjs";
import { t as authMiddleware } from "./middleware-l5McdudQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-BADdwCVv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [{
	id: "links",
	to: "/",
	label: "Links",
	icon: Link2
}, {
	id: "shopee",
	to: "/shopee",
	label: "Shopee",
	icon: Store
}];
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
function ConsoleShell({ current, title, subtitle, action, children }) {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const titleId = (0, import_react.useId)();
	(0, import_react.useEffect)(() => {
		if (!menuOpen) return;
		function onKey(event) {
			if (event.key === "Escape") setMenuOpen(false);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menuOpen]);
	(0, import_react.useEffect)(() => {
		setMenuOpen(false);
	}, [current]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden w-60 shrink-0 flex-col border-r border-border bg-surface lg:flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, { current })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center gap-3 border-b border-border px-4 py-3 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-full text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
							"aria-expanded": menuOpen,
							"aria-controls": titleId,
							onClick: () => setMenuOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
								className: "size-5",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Abrir menu"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
							children: "Linka"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3 px-5 py-6 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl leading-none font-semibold tracking-tight sm:text-3xl",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-md text-sm leading-relaxed text-muted",
								children: subtitle
							})]
						}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex shrink-0 flex-wrap gap-2",
							children: action
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 px-5 pb-10 sm:px-8",
						children
					})
				]
			})]
		}), menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-40 lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute inset-0 bg-bg/70",
				"aria-label": "Fechar menu",
				onClick: () => setMenuOpen(false)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: titleId,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Menu",
				className: "relative flex h-full w-60 flex-col bg-surface shadow-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end px-2 pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-full text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
						onClick: () => setMenuOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-5",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Fechar menu"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, { current })]
			})]
		}) : null]
	});
}
function SidebarBody({ current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountBlock, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "Conta",
			className: "flex flex-1 flex-col gap-0.5 px-3 py-2",
			children: NAV.map((item) => {
				const Icon = item.icon;
				const active = item.id === current;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					"aria-current": active ? "page" : void 0,
					className: cn("flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-4 shrink-0",
						"aria-hidden": "true"
					}), item.label]
				}, item.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutControl, {})
	] });
}
function AccountBlock() {
	const user = useCurrentUser();
	const name = user?.displayName ?? user?.primaryEmail ?? "Conta";
	const email = user?.primaryEmail;
	const initial = name.trim().charAt(0).toUpperCase() || "L";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 px-4 py-5",
		children: [user?.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: user.profileImageUrl,
			alt: "",
			className: "size-10 shrink-0 rounded-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-10 shrink-0 place-items-center rounded-full bg-surface-2 text-sm font-semibold",
			children: initial
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium",
				children: name
			}), email && email !== name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs text-muted",
				children: email
			}) : null]
		})]
	});
}
function SignOutControl() {
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if ((0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-3 pb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: signingOut,
			onClick: () => {
				setSigningOut(true);
				signOut().catch(() => setSigningOut(false));
			},
			className: "flex min-h-11 w-full items-center rounded-2xl px-3 text-left text-sm text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-wait",
			children: signingOut ? "Signing out…" : "Sign out"
		})
	});
}
function ConsolePending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg",
		"aria-busy": "true"
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
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => {
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
	const titleId = (0, import_react.useId)();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onKey(event) {
			if (event.key === "Escape") onClose();
		}
		window.addEventListener("keydown", onKey);
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = previous;
		};
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/70",
			"aria-label": "Fechar",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			className: "absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border bg-surface shadow-ring",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border px-6 py-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: titleId,
					className: "text-lg font-semibold tracking-tight",
					children: title
				})
			}), children]
		})]
	});
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
function WorkspacePending({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-busy": !error,
		children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-primary",
			children: error
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-3xl bg-surface" })
	});
}
function ShopeePanel({ shopee, onChange }) {
	const [appId, setAppId] = (0, import_react.useState)("");
	const [secret, setSecret] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(shopee.connected === false);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const id = window.setTimeout(() => setCopied(false), 1600);
		return () => window.clearTimeout(id);
	}, [copied]);
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
	async function copyAppId(value) {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-md rounded-3xl border border-dashed border-border bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
					className: "size-5",
					"aria-hidden": "true"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Shopee"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 flex items-center gap-1.5 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("size-1.5 rounded-full", shopee.connected && !editing ? "bg-primary" : "bg-muted"),
						"aria-hidden": "true"
					}), shopee.connected && !editing ? "Conectado" : "Não conectado"]
				})]
			})]
		}), shopee.connected && !editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 truncate font-mono text-sm",
					children: shopee.appId
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "grid size-11 shrink-0 place-items-center rounded-full text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
					onClick: () => copyAppId(shopee.appId),
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: copied ? "Copiado" : "Copiar App ID"
					})]
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
		})]
	});
}
function LinksPanel({ products, canCheck, onChange, composing, composeNonce, onComposingChange }) {
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
			onChange(editingId ? products.map((item) => item.id === product.id ? product : item) : [product, ...products]);
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
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-sm leading-snug", checkAlert ? "text-primary" : "text-muted"),
					children: checking ? "Conferindo na Shopee…" : checkNote ?? "Na visita, a Shopee confirma o estoque quando a URL tem o código …-i.loja.item."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "shrink-0",
					onClick: () => runCheck(true),
					disabled: checking || products.length === 0,
					children: checking ? "Conferindo…" : "Conferir estoque"
				})]
			}),
			!composing && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[40rem] border-collapse text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface-2 text-xs font-medium tracking-wide text-muted uppercase",
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Ações"
								})
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						colSpan: 6,
						className: "px-4 py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
								className: "mx-auto size-8 text-muted",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "Nenhum produto ainda."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-4",
								onClick: () => onComposingChange(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "size-4",
									"aria-hidden": "true"
								}), "Adicionar produto"]
							})
						]
					}) }) : products.map((product) => {
						const resolution = resolveSmartLink({
							code: product.code,
							title: product.title,
							detail: "",
							priceCents: product.priceCents,
							commissionPct: product.commissionPct,
							offers: product.offers
						});
						const copy = resolutionCopy(resolution);
						const status = resolution.status === "ok" ? {
							label: "Em estoque",
							on: true
						} : resolution.status === "all_out" ? {
							label: "Esgotado",
							on: false
						} : {
							label: "Sem destino",
							on: false
						};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-left font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
										onClick: () => beginEdit(product),
										children: product.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-xs text-muted tabular-nums",
										children: [product.commissionPct, "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 font-mono text-xs text-muted",
									children: ["/r/", product.code]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-sm tabular-nums",
									children: formatBrl(product.priceCents)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("size-1.5 rounded-full", status.on ? "bg-primary" : "bg-muted"),
											"aria-hidden": "true"
										}), status.label]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "max-w-40 truncate px-4 py-3 text-sm",
									children: copy.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											className: "min-h-9 px-2",
											onClick: () => copyLink(product.code),
											children: [copied === product.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "sr-only",
												children: copied === product.code ? "Copiado" : "Copiar"
											})]
										}), confirmId === product.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											className: "min-h-9 px-2",
											onClick: () => remove(product.id),
											disabled: pending,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												className: "size-4",
												"aria-hidden": "true"
											}), "Sim"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											className: "min-h-9 px-2",
											onClick: () => setConfirmId(product.id),
											children: "Apagar"
										})]
									})
								})
							]
						}, product.id);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidePanel, {
				open: composing,
				title: editingId ? "Editar produto" : "Novo produto",
				onClose: resetForm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex min-h-0 flex-1 flex-col",
					onSubmit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto px-6 py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: editingId ? "O endereço do link não muda. A primeira oferta é a principal." : "A primeira oferta é a principal. As seguintes são backups."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 flex flex-col gap-1.5 text-sm font-medium",
								children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: title,
									onChange: (event) => setTitle(event.target.value),
									placeholder: "Sérum de vitamina C",
									className: fieldClass
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2",
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
								className: "mt-3 rounded-2xl bg-bg px-3 py-3",
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
								className: "mt-2 min-h-11 text-sm font-medium text-fg",
								onClick: () => setOffers((current) => [...current, offerRow()]),
								children: "Adicionar backup"
							}) : null,
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-primary",
								children: error
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 border-t border-border px-6 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 px-3 text-sm font-medium text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
							onClick: resetForm,
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: pending,
							children: pending ? "Guardando…" : editingId ? "Salvar" : "Criar"
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
			className: "size-4",
			"aria-hidden": "true"
		}), "Adicionar produto"]
	});
}
function messageOf(error) {
	if (error instanceof Error && error.message && error.message !== "Unauthorized") return error.message;
	return "Não deu para salvar. Tente de novo.";
}
//#endregion
export { ShopeePanel as a, NewLinkButton as i, ConsoleShell as n, WorkspacePending as o, LinksPanel as r, useWorkspace as s, ConsolePending as t };
