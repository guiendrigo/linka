import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Q as require_react, b as Navigate, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { t as GROK_PROVIDERS } from "./server-LbsNkczH.mjs";
import { n as Button, s as useCurrentUserState, t as AppShell } from "./shell-DN6vqT4R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Cl_q0ECd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPanel() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		setError(null);
		const cleanEmail = email.trim().toLowerCase();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
			setError("Digite um e-mail válido.");
			return;
		}
		if (password.length < 8) {
			setError("A senha precisa de pelo menos 8 caracteres.");
			return;
		}
		if (mode === "up" && name.trim().length < 2) {
			setError("Diga como quer ser chamado.");
			return;
		}
		setPending(true);
		try {
			const result = mode === "up" ? await authClient.signUp.email({
				name: name.trim(),
				email: cleanEmail,
				password,
				callbackURL: "/"
			}) : await authClient.signIn.email({
				email: cleanEmail,
				password,
				callbackURL: "/"
			});
			if (result.error) {
				setError(messageFor(result.error.message, result.error.code));
				setPending(false);
				return;
			}
			await navigate({ to: "/" });
		} catch {
			setError("Não deu para entrar. Tente de novo.");
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: provider.idp === "google" ? "primary" : "ghost",
				className: "w-full",
				onClick: () => signIn(provider.providerId, { callbackURL: "/" }),
				children: ["Continuar com ", provider.label]
			}, provider.providerId)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 py-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
					"ou com e-mail",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit,
				children: [
					mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 text-sm font-medium",
						children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (event) => setName(event.target.value),
							autoComplete: "name",
							className: "min-h-11 rounded-2xl border border-border bg-bg px-4 text-base font-normal text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 text-sm font-medium",
						children: ["E-mail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (event) => setEmail(event.target.value),
							autoComplete: "email",
							inputMode: "email",
							className: "min-h-11 rounded-2xl border border-border bg-bg px-4 text-base font-normal text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 text-sm font-medium",
						children: ["Senha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: password,
							onChange: (event) => setPassword(event.target.value),
							autoComplete: mode === "up" ? "new-password" : "current-password",
							className: "min-h-11 rounded-2xl border border-border bg-bg px-4 text-base font-normal text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: pending,
						children: pending ? "Entrando…" : mode === "up" ? "Criar conta" : "Entrar com e-mail"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 text-sm font-medium text-fg underline decoration-border underline-offset-4",
				onClick: () => {
					setMode(mode === "in" ? "up" : "in");
					setError(null);
				},
				children: mode === "in" ? "Criar uma conta" : "Já tenho conta"
			})
		]
	});
}
function messageFor(message, code) {
	const text = `${code ?? ""} ${message ?? ""}`.toLowerCase();
	if (text.includes("already") || text.includes("exist")) return "Já existe uma conta com esse e-mail.";
	if (text.includes("invalid") || text.includes("password") || text.includes("credential")) return "E-mail ou senha não conferem.";
	return "Não deu para entrar. Tente de novo.";
}
function LoginPage() {
	const { user, isPending } = useCurrentUserState();
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		account: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-10 w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl leading-none font-semibold tracking-tight",
					children: "Entrar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "A conta é sua. Quem abre o link inteligente não precisa entrar."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": "true",
						className: "h-64 animate-pulse rounded-3xl bg-surface"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPanel, {})
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
