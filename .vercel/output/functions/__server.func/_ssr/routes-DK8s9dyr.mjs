import { o as __toESM } from "../_runtime.mjs";
import { a as stockQuery, i as resolveSmartLink, r as resolutionCopy, t as formatBrl } from "./resolve-BPVOCpaa.mjs";
import { C as require_jsx_runtime, Q as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as findLink, t as DEMO_CODE } from "./catalog-CFJ_kwzB.mjs";
import { l as Copy, u as Check } from "../_libs/lucide-react.mjs";
import { i as previewPathPrefix } from "./router-CU9M-4iV.mjs";
import { i as useCurrentUserState } from "./gates-DWE7aa1w.mjs";
import { n as buttonVariants, r as cn, t as Button } from "./button-D41xaRju.mjs";
import { t as AppShell } from "./shell-CFWNRFIK.mjs";
import { n as ConsoleShell, t as ConsolePending } from "./console-B5XuQQFf.mjs";
import { a as useWorkspace, i as WorkspacePending, n as NewLinkButton, t as LinksPanel } from "./workspace-C9GmfapI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DK8s9dyr.js
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
			canCheck: data.shopee.connected,
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
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
	})] });
}
//#endregion
export { Home as component };
