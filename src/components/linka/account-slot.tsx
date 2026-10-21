import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { buttonVariants } from "@/components/ui/button";

export function AccountSlot() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return <div aria-hidden="true" className="h-11 w-24 animate-pulse rounded-full bg-surface-2" />;
  }

  if (!user) {
    return (
      <Link to="/login" className={buttonVariants({ variant: "ghost" })}>
        Entrar
      </Link>
    );
  }

  return (
    <div className="min-w-0 [&_span]:inline-block [&_span]:max-w-28 [&_span]:truncate sm:[&_span]:max-w-44">
      <UserButton />
    </div>
  );
}
