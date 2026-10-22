import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Theme } from "@astryxdesign/core/theme";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { defaultThemeSlug, themes } from "@/astryx-themes";
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
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Theme theme={themes[defaultThemeSlug]} mode="light">
            <Outlet />
          </Theme>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
