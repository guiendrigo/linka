# Proposal

## Why

Linka’s UI is a one-off dark palette (`src/styles.css`) plus a single CVA button. Every other control is hand-rolled Tailwind. Adopting Astryx (Neutral, light, Linka orange) gives one theme, one set of primitives, and a look that matches a public bio/link product instead of a dark console.

## What Changes

- **BREAKING (visual):** the product leaves dark-only (`#141210` / `#ff5c39`) and ships **Neutral light** with accent `#ff5c39`. No dark mode and no OS-follow toggle in this change.
- Add `@astryxdesign/core`, `@stylexjs/stylex`, `@astryxdesign/theme-neutral`, and `@astryxdesign/cli` as runtime/install dependencies (Vercel `omit=dev`). Run `npx @astryxdesign/cli init` (append agent docs; do not overwrite Grok `AGENTS.md` contracts) and **`npx @astryxdesign/cli theme add neutral`**.
- Define a local `linka` theme that extends Neutral with `color.accent: #ff5c39`, wrap the app in `<Theme mode="light">`, and load Astryx CSS through Tailwind v4 cascade layers plus `tailwind-theme.css`. No StyleX compiler.
- Replace public `AppShell` and signed-in `ConsoleShell` with Astryx `AppShell` / `TopNav` / `SideNav` / `MobileNav`. Replace the CVA button, form fields, stock switch, and `SidePanel` with Astryx primitives.
- Drop Linka `@theme` color aliases (`bg-bg`, `text-fg`, `text-primary` as orange). After the Tailwind bridge, `text-primary` means body text, not the brand orange.

Ships on Magalu (`docker compose -p linka`). Vercel/Nitro preview is not the production gate.

## Capabilities

### New Capabilities

- `ui-shell`: Product chrome and visual language — Neutral light with Linka orange, public vs signed-in frames, shared controls, Portuguese copy, no auth chrome on public `/r` and `/p`.

### Modified Capabilities

- None. `bio-page`, `credential-auth`, and `google-sign-in` keep their content and auth-button rules; this change restyles those screens without changing those requirements.

## Impact

- Client: `src/styles.css`, `src/routes/__root.tsx`, `src/components/linka/*`, `src/components/ui/button.tsx`, public routes `/`, `/login`, `/r/$code`, `/p/$code`, `/plano`.
- Dependencies: Astryx core, StyleX peer, theme-neutral, CLI. Generated `src/astryx-themes.ts` (or CLI equivalent) and a built local theme.
- Platform: keep `PreviewHostBridge`, `AuthProvider`, Grok pill, `getRouter()`, no manual `og:*` tags, no CSP that blocks `https://grok.com`.
- Ops: Magalu image must include the new runtime packages; no schema or Caddy change.
- Tests: `npm run test:linka` stays the unit gate; visual check is 390×844 and desktop smoke, plus `docker compose -p linka build`.

## Out of scope

- Auth, stock, smart-link resolution, Magalu SQLite schema, Caddy, Cloudflare.
- Conversational search, click counts, dashboard, PWA, billing, free-account limits.
- Light/dark toggle, `mode="system"`, Gothic/Chocolate/other Astryx packages.
- StyleX compiler, swizzling Astryx components, compiling `node_modules/@astryxdesign`.
- Filling Shopee Affiliate env, `shope.ee` resolution.
- Archiving the already-complete OpenSpec changes under `openspec/changes/`.
- Changing Sign out labels (platform English exception).
