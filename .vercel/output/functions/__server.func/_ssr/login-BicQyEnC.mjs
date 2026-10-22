import { o as __toESM } from "../_runtime.mjs";
import { C as require_react, S as require_jsx_runtime, _ as Button, c as Banner, l as TextInput, m as VStack, v as Heading, y as Text } from "../_libs/@astryxdesign/core+[...].mjs";
import { b as Navigate, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as signIn, o as socialProviders, r as googleLoginEnabled, t as authClient } from "./client-DwTeyJR6.mjs";
import { i as useCurrentUserState } from "./gates-CdeB3G3x.mjs";
import { t as PublicShell } from "./shell-Dr1Kw_S6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BicQyEnC.js
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
	async function onGoogle() {
		setError(null);
		setPending(true);
		try {
			if ((await authClient.signIn.social({
				provider: "google",
				callbackURL: "/"
			})).error) {
				setError("Não deu para entrar. Tente de novo.");
				setPending(false);
			}
		} catch {
			setError("Não deu para entrar. Tente de novo.");
			setPending(false);
		}
	}
	const showSocialDivider = socialProviders.length > 0 || googleLoginEnabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
		gap: 3,
		children: [
			googleLoginEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				width: "100%",
				isDisabled: pending,
				label: "Continuar com Google",
				onClick: () => void onGoogle()
			}) : null,
			socialProviders.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: provider.idp === "google" ? "primary" : "secondary",
				width: "100%",
				label: `Continuar com ${provider.label}`,
				onClick: () => signIn(provider.providerId, { callbackURL: "/" })
			}, provider.providerId)),
			showSocialDivider ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
				color: "secondary",
				justify: "center",
				children: "ou com e-mail"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
					gap: 3,
					children: [
						mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Nome",
							value: name,
							onChange: setName,
							autoComplete: "name",
							width: "100%"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "E-mail",
							type: "email",
							value: email,
							onChange: setEmail,
							autoComplete: "email",
							width: "100%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							label: "Senha",
							type: "password",
							value: password,
							onChange: setPassword,
							autoComplete: mode === "up" ? "new-password" : "current-password",
							width: "100%"
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
							status: "error",
							title: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							width: "100%",
							isDisabled: pending,
							isLoading: pending,
							label: pending ? "Entrando…" : mode === "up" ? "Criar conta" : "Entrar com e-mail"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				label: mode === "in" ? "Criar uma conta" : "Já tenho conta",
				onClick: () => {
					setMode(mode === "in" ? "up" : "in");
					setError(null);
				}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicShell, {
		account: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VStack, {
			gap: 4,
			maxWidth: 360,
			className: "mx-auto mt-10 w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					level: 1,
					type: "display-2",
					children: "Entrar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
					color: "secondary",
					children: "A conta é sua. Quem abre o link inteligente não precisa entrar."
				}),
				isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "h-64 animate-pulse rounded-3xl bg-surface"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPanel, {})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
