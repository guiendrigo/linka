import { useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Banner } from "@astryxdesign/core/Banner";
import { Button } from "@astryxdesign/core/Button";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import {
  authClient,
  authEnabled,
  googleLoginEnabled,
  signIn,
  socialProviders,
} from "@/lib/auth/client";

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

  async function onGoogle() {
    setError(null);
    setPending(true);
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (result.error) {
        setError("Não deu para entrar. Tente de novo.");
        setPending(false);
      }
    } catch {
      setError("Não deu para entrar. Tente de novo.");
      setPending(false);
    }
  }

  if (!authEnabled) {
    return <Text color="secondary">Entrar está desligado.</Text>;
  }

  const showSocialDivider = socialProviders.length > 0 || googleLoginEnabled;

  return (
    <VStack gap={3}>
      {googleLoginEnabled ? (
        <Button
          variant="primary"
          width="100%"
          isDisabled={pending}
          label="Continuar com Google"
          onClick={() => void onGoogle()}
        />
      ) : null}

      {socialProviders.map((provider) => (
        <Button
          key={provider.providerId}
          variant={provider.idp === "google" ? "primary" : "secondary"}
          width="100%"
          label={`Continuar com ${provider.label}`}
          onClick={() => signIn(provider.providerId, { callbackURL: "/" })}
        />
      ))}

      {showSocialDivider ? (
        <Text color="secondary" justify="center">
          ou com e-mail
        </Text>
      ) : null}

      <form onSubmit={onSubmit}>
        <VStack gap={3}>
          {mode === "up" ? (
            <TextInput label="Nome" value={name} onChange={setName} autoComplete="name" width="100%" />
          ) : null}
          <TextInput
            label="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            width="100%"
          />
          <TextInput
            label="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete={mode === "up" ? "new-password" : "current-password"}
            width="100%"
          />
          {error ? <Banner status="error" title={error} /> : null}
          <Button
            type="submit"
            width="100%"
            isDisabled={pending}
            isLoading={pending}
            label={pending ? "Entrando…" : mode === "up" ? "Criar conta" : "Entrar com e-mail"}
          />
        </VStack>
      </form>

      <Button
        variant="ghost"
        label={mode === "in" ? "Criar uma conta" : "Já tenho conta"}
        onClick={() => {
          setMode(mode === "in" ? "up" : "in");
          setError(null);
        }}
      />
    </VStack>
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
