import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import appCss from "../styles.css?url";

const APP_NAME = "Linka";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Link inteligente para afiliados da Shopee. Se a oferta principal acaba, o clique segue para o backup.",
      },
      { name: "theme-color", content: "#f1f1f1" },
    ],
    links: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }, { rel: "stylesheet", href: appCss }],
  }),
  component: () => (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
