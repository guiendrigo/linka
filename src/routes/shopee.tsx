import { createFileRoute } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { ConsolePending, ConsoleShell } from "@/components/linka/console";
import { useWorkspace } from "@/components/linka/use-workspace";
import { ShopeePanel, WorkspacePending } from "@/components/linka/workspace";

export const Route = createFileRoute("/shopee")({
  head: () => ({ meta: [{ title: "Shopee · Linka" }] }),
  component: ShopeePage,
});

function ShopeePage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <ConsolePending />;
  if (!user) return <RedirectToSignIn />;
  return <ShopeeHome />;
}

function ShopeeHome() {
  const { data, error, setData } = useWorkspace();

  return (
    <ConsoleShell
      current="shopee"
      title="Shopee"
      subtitle="App ID e segredo para conferir estoque. O segredo fica no servidor e não volta para esta tela."
    >
      {!data ? (
        <WorkspacePending error={error} />
      ) : (
        <ShopeePanel shopee={data.shopee} onChange={(shopee) => setData({ ...data, shopee })} />
      )}
    </ConsoleShell>
  );
}
