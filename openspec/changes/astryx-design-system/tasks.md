# Tasks

## 1. Packages and Neutral theme

- [x] 1.1 Add `@astryxdesign/core`, `@stylexjs/stylex`, `@astryxdesign/theme-neutral`, and `@astryxdesign/cli` to `package.json` `dependencies` (not `-D`), add an `astryx` npm script pointing at the CLI bin, run `npm install`, and verify all four packages resolve under `node_modules/@astryxdesign` and `@stylexjs/stylex`.
- [x] 1.2 Copy `AGENTS.md`, run `npx @astryxdesign/cli init`, restore the Grok/Linka contract if the CLI replaced the file and append the cheat sheet instead, and verify platform sections (`npm run dev`, PreviewHostBridge, no `/auth/popup` route) are still present.
- [x] 1.3 Run `npx @astryxdesign/cli theme add neutral` and verify the generated theme module (typically `src/astryx-themes.ts`) imports Neutral built CSS and fonts.
- [x] 1.4 Author local `linka` with `defineTheme({ extends: neutral, color: { accent: "#ff5c39" } })`, run `theme build` and `theme add linka`, and verify the built CSS contains the orange accent and `__built` theme export.

## 2. CSS layers and Theme provider

- [x] 2.1 Rewrite `src/styles.css` with the documented `@layer` order, Astryx reset/`astryx.css`, linka/Neutral theme CSS, and `tailwind-theme.css`; remove Bricolage and dark `@theme` colors; verify the file declares layers before any `@import`.
- [x] 2.2 Wrap `__root.tsx` with `<Theme theme={themes.linka} mode="light">` inside `AuthProvider` (keep `PreviewHostBridge`), set `color-scheme: light` and `theme-color` `#f1f1f1`, drop the Bricolage Google Fonts link, and verify `PreviewHostBridge` and `AuthProvider` still mount.
- [x] 2.3 Render a temporary foundation check (Button, TextInput, Card) and verify a primary button’s computed `paddingInline` is not `0px` and the fill is orange `#ff5c39`.

## 3. Shells

- [x] 3.1 Replace public `AppShell` with Astryx `AppShell`/`TopNav`, keep the account slot only on logged-out `/` and `/login`, and verify `/r/$code` sold-out and `/p/$code` have no Sign out or Links/Plano nav.
- [x] 3.2 Replace `ConsoleShell` with Astryx `AppShell` + `SideNav` + `MobileNav` (Links always; Plano only if billing enabled; Sign out English), and verify signed-in `/` shows Links in the sidebar at desktop width and in a menu at 390px.

## 4. Screens and primitives

- [x] 4.1 Replace CVA `Button`/`buttonVariants` usages with Astryx `Button`/`IconButton` (login, workspace, bench, plan, `/r`, `/p`) and verify filled primary labels (Entrar, Novo link, Ver oferta) are orange with readable type.
- [x] 4.2 Replace login and workspace fields with `TextInput`/`TextArea`/`NumberInput`, stock flags with `Switch`, `SidePanel` with `Dialog` or `Drawer`, and errors with `Banner`; verify create/edit product and `/login` share control density and that failed save/login messages stay pt-BR.
- [x] 4.3 Restyle public home + `Bench`, bio `/p/$code`, sold-out `/r/$code`, and `/plano` on Neutral light without commission on visitor pages, and verify each is light-background with dark text and no theme toggle.
- [x] 4.4 At 390×844, check Links (nav + Novo link) and a bio page (title, price, Ver oferta) and verify no horizontal page scroll and tappable primary actions.

## 5. Token cleanup

- [x] 5.1 Remove leftover Linka aliases (`bg-bg`, `text-fg`, `text-primary` as orange, `shadow-ring`, `font-display`) from `src/` and verify `rg` finds none of those class names under `src/` except any Astryx-bridge `text-primary` meaning body text.
- [x] 5.2 Confirm no StyleX compiler plugin was added to `vite.config.ts` and that Grok contracts remain (`0.0.0.0:8080`, `nitro` vercel + `serverDir`, `grokPwaPlugin`, named `getRouter()`).

## 6. Magalu and repo gates

- [x] 6.1 Run `npm run test:linka`, `npm run typecheck`, and `npm run lint`, and verify all three succeed (do not use `npm test`).
- [x] 6.2 Run `docker compose -p linka build` (or `up -d --build`) and verify the image builds with the Astryx packages present.
- [x] 6.3 Smoke public Magalu URLs `/`, `/login`, a `/p/<code>`, and a sold-out `/r/<code>` and verify light theme, orange primary actions, and no account chrome on `/p` and sold-out `/r`.

## Workflow follow-up

- Archive the change after Magalu smoke so `ui-shell` lands in `openspec/specs/`.
- Do not leave this complete change sitting under `openspec/changes/`.
