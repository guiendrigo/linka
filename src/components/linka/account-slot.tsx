import { Button } from "@astryxdesign/core/Button";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AccountSlot() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return <div aria-hidden="true" className="h-11 w-24 animate-pulse rounded-full bg-muted" />;
  }

  if (!user) {
    return <Button href="/login" variant="secondary" label="Entrar" />;
  }

  return (
    <div className="min-w-0 [&_span]:inline-block [&_span]:max-w-28 [&_span]:truncate sm:[&_span]:max-w-44">
      <UserButton />
    </div>
  );
}
