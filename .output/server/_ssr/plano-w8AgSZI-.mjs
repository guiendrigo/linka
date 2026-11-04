import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Z as require_react, b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Check, a as ShieldCheck, f as ExternalLink, g as CircleCheck, l as Lock, o as RotateCcw, p as CreditCard, t as Zap } from "../_libs/lucide-react.mjs";
import { a as Card, c as Heading, d as Text, i as Button, m as VStack, n as Badge, r as Banner, s as HStack } from "./ui-BbZxOCNN.mjs";
import { c as useCurrentUserState, r as RedirectToSignIn } from "./shell-1ZOA9Gcm.mjs";
import { t as billingEnabled } from "./purchases-CIxOrcXK.mjs";
import { d as usePurchases, n as ConsoleShell, t as ConsolePending } from "./console-CXZma-IZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plano-w8AgSZI-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlanPanel() {
	const { status, isPro, hasPaywall, managementURL, packages, error, presentPaywall, purchasePlan, openCustomerCenter, refresh } = usePurchases();
	const [pending, setPending] = (0, import_react.useState)(false);
	async function run(action) {
		if (pending) return;
		setPending(true);
		try {
			await action();
		} finally {
			setPending(false);
		}
	}
	if (status === "loading" || status === "idle") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 4,
		maxWidth: 720,
		className: "w-full",
		"aria-busy": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-44 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]" })]
		})]
	});
	if (isPro) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 4,
		maxWidth: 720,
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
			status: "success",
			title: "Assinatura Pro Ativa",
			description: "Sua conta está com proteção total de comissões, monitoramento automático de estoque na Shopee e múltiplos links de backup ativados."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			padding: 5,
			elevation: "low",
			className: "border border-[var(--color-border)] bg-[var(--color-surface)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
				gap: 4,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HStack, {
						gap: 3,
						vAlign: "center",
						justify: "between",
						wrap: "wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HStack, {
							gap: 2,
							vAlign: "center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-10 items-center justify-center rounded-xl bg-[var(--color-accent-muted)] text-[var(--color-text-accent)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
									className: "size-5",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
								gap: 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
									level: 2,
									className: "text-lg font-bold sm:text-xl",
									children: "Você é Linka Pro"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									color: "secondary",
									children: "Suas vendas e comissões na Shopee estão 100% protegidas"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "success",
							label: "Assinatura Pro Ativa"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "sm",
						color: "secondary",
						className: "leading-relaxed",
						children: "Todos os seus links inteligentes monitoram a disponibilidade de estoque na Shopee. Se uma loja zerar o produto, seus seguidores são enviados automaticamente para as ofertas reservas cadastradas."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2.5 sm:grid-cols-2 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									className: "size-4 shrink-0 text-emerald-600",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									children: "Checagem contínua no catálogo Shopee"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									className: "size-4 shrink-0 text-emerald-600",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									children: "Até 3 backups por produto"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									className: "size-4 shrink-0 text-emerald-600",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									children: "Redirecionamento automático sem tela de erro"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									className: "size-4 shrink-0 text-emerald-600",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "sm",
									children: "Vitrine de bio (/p/...) sempre atualizada"
								})]
							})
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
						status: "error",
						title: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
						gap: 2,
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							label: "Gerenciar assinatura",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								className: "size-4",
								"aria-hidden": "true"
							}),
							isDisabled: !managementURL || pending,
							onClick: () => openCustomerCenter()
						}), !managementURL ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
							size: "xsm",
							color: "secondary",
							children: "O painel de gerenciamento de faturamento é sincronizado diretamente pelo provedor de checkout seguro."
						}) : null]
					})
				]
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 5,
		maxWidth: 720,
		className: "w-full",
		children: [
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
				status: "error",
				title: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				padding: 5,
				className: "border border-[var(--color-border)] bg-[var(--color-surface)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 4,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
							gap: 1,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
								level: 2,
								className: "text-lg font-medium sm:text-xl",
								children: "O clique cai no backup"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "sm",
								color: "secondary",
								children: "Quando a principal esgota, o seguidor vai para a primeira loja com estoque. Você não reedita o Story."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
							gap: 2,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
										gap: .5,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											weight: "medium",
											size: "sm",
											children: "Grátis"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xsm",
											color: "secondary",
											children: "1 achadinho — o suficiente para colar o /r uma vez e ver o hop."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "neutral",
										label: "Agora"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3 rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-background-body)] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
										gap: .5,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											weight: "medium",
											size: "sm",
											children: "Pro"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xsm",
											color: "secondary",
											children: "Até 10 achadinhos. O plano que a afiliada que já vende precisa."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "orange",
										label: "O que vendemos"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3 rounded-xl border border-[var(--color-border)] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
										gap: .5,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											weight: "medium",
											size: "sm",
											children: "Ilimitado"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xsm",
											color: "secondary",
											children: "Sem teto de achadinhos. Âncora — ainda não está à venda."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "neutral",
										label: "Âncora"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2.5 sm:grid-cols-2 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										className: "size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
										gap: .5,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											weight: "medium",
											size: "sm",
											children: "O clique cai no backup"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xsm",
											color: "secondary",
											children: "Primeiro em estoque ganha. Esgotado de verdade, a página diz isso."
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
										className: "size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
										gap: .5,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											weight: "medium",
											size: "sm",
											children: "Conferência na Shopee"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xsm",
											color: "secondary",
											children: "Catálogo a cada visita, com teto de consultas."
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										className: "size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
										gap: .5,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											weight: "medium",
											size: "sm",
											children: "Até 3 backups por link"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xsm",
											color: "secondary",
											children: "Cadastre até 3 ofertas reservas para cada achadinho divulgado."
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-body)] p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
										className: "size-4 mt-0.5 shrink-0 text-[var(--color-text-secondary)]",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
										gap: .5,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											weight: "medium",
											size: "sm",
											children: "Anual ou mensal"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
											size: "xsm",
											color: "secondary",
											children: "Mesmo Pro. Só muda a cadência do pagamento."
										})]
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				size: "sm",
				color: "secondary",
				children: "Anual e mensal não são planos diferentes. São a forma de pagar o Pro."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
					pkg: packages.anual,
					kind: "anual",
					featured: true,
					disabled: status !== "ready",
					pending,
					onPick: (kind) => run(() => purchasePlan(kind))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
					pkg: packages.mensal,
					kind: "mensal",
					featured: false,
					disabled: status !== "ready",
					pending,
					onPick: (kind) => run(() => purchasePlan(kind))
				})]
			}),
			status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				width: "100%",
				variant: "secondary",
				label: "Tentar novamente",
				isDisabled: pending,
				onClick: () => void run(refresh)
			}) : hasPaywall ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				width: "100%",
				variant: "ghost",
				label: "Ver todas as opções e ofertas",
				isDisabled: pending,
				onClick: () => void run(presentPaywall)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				padding: 4,
				className: "border border-[var(--color-border)] bg-[var(--color-surface)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
								className: "size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
								gap: .5,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									weight: "medium",
									size: "sm",
									children: "Cancele quando quiser"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "xsm",
									color: "secondary",
									children: "Sem contrato de fidelidade ou taxas de cancelamento."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								className: "size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
								gap: .5,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									weight: "medium",
									size: "sm",
									children: "Pagamento seguro"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "xsm",
									color: "secondary",
									children: "Criptografia de ponta a ponta processada via RevenueCat."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
								className: "size-4 shrink-0 text-[var(--color-text-accent)] mt-0.5",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
								gap: .5,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									weight: "medium",
									size: "sm",
									children: "Ativação imediata"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
									size: "xsm",
									color: "secondary",
									children: "Sua conta Pro é liberada no mesmo instante da confirmação."
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				size: "xsm",
				color: "secondary",
				className: "text-center px-2",
				children: "Valores cobrados em Reais (BRL). Todos os planos incluem suporte e atualizações contínuas das regras de catálogo da Shopee."
			})
		]
	});
}
function PlanCard({ pkg, kind, featured = false, disabled, pending = false, onPick }) {
	const isAnnual = kind === "anual";
	const defaultLabel = isAnnual ? "Plano Anual" : "Plano Mensal";
	const label = pkg?.label ?? defaultLabel;
	const priceDisplay = pkg?.formattedPrice || (disabled ? "Carregando..." : "Consulte");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		padding: 5,
		elevation: featured ? "low" : "none",
		className: `relative flex flex-col justify-between rounded-2xl border transition-all ${featured ? "border-2 border-[var(--color-accent)] bg-[var(--color-surface)] shadow-sm" : "border-[var(--color-border)] bg-[var(--color-surface)]"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 4,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HStack, {
					gap: 2,
					vAlign: "center",
					justify: "between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						weight: "bold",
						size: "lg",
						children: label
					}), featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "orange",
						label: "Mais vantajoso"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "neutral",
						label: "Sem fidelidade"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					size: "xsm",
					color: "secondary",
					children: isAnnual ? "Economize no pacote anual e garanta links ativos o ano todo para suas divulgações." : "Flexibilidade para testar e pagar mês a mês conforme suas vendas crescem."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 1,
					className: "py-2 border-y border-[var(--color-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HStack, {
						gap: 1,
						vAlign: "end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							level: 2,
							className: "text-2xl font-medium tabular-nums sm:text-3xl",
							children: priceDisplay
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Text, {
							size: "sm",
							color: "secondary",
							weight: "medium",
							className: "pb-0.5",
							children: ["/", isAnnual ? "ano" : "mês"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
						size: "xsm",
						color: "secondary",
						children: isAnnual ? "Melhor custo-benefício · Pagamento anual único" : "Cobrança mensal recorrente · Cancele quando quiser"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 2,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-4 shrink-0 text-[var(--color-text-accent)]",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xsm",
								children: "Até 10 achadinhos no Pro"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-4 shrink-0 text-[var(--color-text-accent)]",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xsm",
								children: "Até 3 ofertas reservas por produto"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-4 shrink-0 text-[var(--color-text-accent)]",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xsm",
								children: "Checagem contínua na Shopee"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-4 shrink-0 text-[var(--color-text-accent)]",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xsm",
								children: "Página de bio completa sem estoque zerado"
							})]
						}),
						isAnnual ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-4 shrink-0 text-[var(--color-text-accent)]",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								size: "xsm",
								color: "accent",
								children: "Economia garantida no plano anual"
							})]
						}) : null
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 pt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				width: "100%",
				variant: featured ? "primary" : "secondary",
				isDisabled: disabled || !pkg || pending,
				label: isAnnual ? "Pagar Pro por ano" : "Pagar Pro por mês",
				onClick: () => void onPick(kind)
			})
		})]
	});
}
function PlanoPage() {
	const { user, isPending } = useCurrentUserState();
	if (!billingEnabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsolePending, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsoleShell, {
		current: "plano",
		title: "Plano e Assinatura",
		subtitle: "O clique cai no backup. Anual e mensal são a cadência do Pro.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanPanel, {})
	});
}
//#endregion
export { PlanoPage as component };
