import { useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { authClient, authEnabled, signIn, socialProviders } from "@/lib/auth/client";

type Mode = "in" | "up";

export function LoginPanel() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
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
      const result =
        mode === "up"
          ? await authClient.signUp.email({
              name: name.trim(),
              email: cleanEmail,
              password,
              callbackURL: "/",
            })
          : await authClient.signIn.email({
              email: cleanEmail,
              password,
              callbackURL: "/",
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

  if (!authEnabled) {
    return <p className="text-sm text-muted">Entrar está desligado.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {socialProviders.map((provider) => (
        <Button
          key={provider.providerId}
          variant={provider.idp === "google" ? "primary" : "ghost"}
          className="w-full"
          onClick={() => signIn(provider.providerId, { callbackURL: "/" })}
        >
          Continuar com {provider.label}
        </Button>
      ))}

      {socialProviders.length > 0 ? (
        <div className="flex items-center gap-3 py-2 text-sm text-muted">
          <span className="h-px flex-1 bg-border" />
          ou com e-mail
          <span className="h-px flex-1 bg-border" />
        </div>
      ) : null}

      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        {mode === "up" ? (
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Nome
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              className="min-h-11 rounded-2xl border border-border bg-bg px-4 text-base font-normal text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </label>
        ) : null}
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          E-mail
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            inputMode="email"
            className="min-h-11 rounded-2xl border border-border bg-bg px-4 text-base font-normal text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Senha
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === "up" ? "new-password" : "current-password"}
            className="min-h-11 rounded-2xl border border-border bg-bg px-4 text-base font-normal text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </label>
        {error ? <p className="text-sm text-primary">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Entrando…" : mode === "up" ? "Criar conta" : "Entrar com e-mail"}
        </Button>
      </form>

      <button
        type="button"
        className="min-h-11 text-sm font-medium text-fg underline decoration-border underline-offset-4"
        onClick={() => {
          setMode(mode === "in" ? "up" : "in");
          setError(null);
        }}
      >
        {mode === "in" ? "Criar uma conta" : "Já tenho conta"}
      </button>
    </div>
  );
}

function messageFor(message: string | undefined, code: string | undefined): string {
  const text = `${code ?? ""} ${message ?? ""}`.toLowerCase();
  if (text.includes("already") || text.includes("exist")) return "Já existe uma conta com esse e-mail.";
  if (text.includes("invalid") || text.includes("password") || text.includes("credential")) {
    return "E-mail ou senha não conferem.";
  }
  return "Não deu para entrar. Tente de novo.";
}
