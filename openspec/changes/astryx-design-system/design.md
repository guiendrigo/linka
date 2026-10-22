# Design

## Context

See proposal.md for motivation and `specs/ui-shell/spec.md` for the visual contract. Magalu is production (`docker compose -p linka`). No schema change: neither `migrations/*.sql` nor `migrations/sqlite/*.sql` is touched.

Today: Tailwind v4 `@theme` tokens in `src/styles.css` (dark-only, `#ff5c39`), Figtree + Bricolage via Google Fonts, one CVA `Button`, hand-rolled `AppShell` / `ConsoleShell` / `SidePanel`. Radix packages in `package.json` are unused. `vercel.json` installs with `--omit=dev`.

## Goals / Non-Goals

**Goals:**

- Wire Astryx Neutral (light) plus a local `linka` accent theme without a StyleX compile step.
- Keep TanStack Start, Better Auth, PreviewHostBridge, and Grok platform chrome intact.
- Migrate shells and primitives so leftover `text-primary` no longer means orange.

**Non-Goals:**

- Compiling StyleX, swizzling components, or importing Astryx package source.
- Theme toggle, `mode="system"`, or additional theme packages.
- Removing unused Radix/shadcn packages unless it is free of Grok-template risk.
- Any migration file.

## Decisions

### 1. Tailwind v4 coexistence, not StyleX-for-app-code

Keep Tailwind for leftover layout. Load Astryx prebuilt CSS. Declare layers before any `@import`:

```
@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;
```

Then `tailwindcss/theme.css` → preflight in `base` → `@astryxdesign/core/reset.css` + `astryx.css` → Neutral/linka theme CSS → `@astryxdesign/core/tailwind-theme.css` → utilities.

Install `@stylexjs/stylex` as the peer only. Do not add `@stylexjs/rollup-plugin`.

Alternative: drop Tailwind and style everything with Astryx layout primitives. Rejected — the app is already Tailwind v4; the documented migration path is coexistence.

Alternative: StyleX compiler for app styles. Rejected — extra Vite plugin and SSR surface for no gain until we swizzle.

### 2. `theme add neutral`, then a built local `linka` theme

```
npx @astryxdesign/cli theme add neutral
```

That generates the app theme module (typically `src/astryx-themes.ts`) importing Neutral’s built CSS and fonts. Then `defineTheme({ name: "linka", extends: neutralTheme, color: { accent: "#ff5c39" } })`, `theme build`, and `theme add linka` so SSR gets compiled CSS (no hydration flash).

`<Theme theme={themes.linka} mode="light">` in `__root.tsx` inside `AuthProvider`, after `PreviewHostBridge`. `html` `color-scheme: light`. `theme-color` meta becomes Neutral light body (`#f1f1f1`), not `#141210`.

Use the `color.accent` seed, not a lone `--color-accent` token, so `--color-on-accent` is generated. Do not keep Bricolage; Neutral Figtree covers body and headings.

Alternative: Neutral with no local theme. Rejected — default Neutral accent is near-black, not Linka orange.

Alternative: `mode="system"`. Rejected — spec forbids dark.

### 3. Dependencies include the CLI

`@astryxdesign/core`, `@stylexjs/stylex`, `@astryxdesign/theme-neutral`, and `@astryxdesign/cli` go in `dependencies`, not `-D`, because Vercel and a Magalu image that omits devDependencies would otherwise drop the CLI needed for `theme build` / agent docs.

Add `"astryx": "node node_modules/@astryxdesign/cli/clients/cli/bin/astryx.mjs"` for reliable invocation.

### 4. `init` must not wipe Grok `AGENTS.md`

Copy `AGENTS.md` first. Run `npx @astryxdesign/cli init`. If the file is replaced, restore the Grok/Linka contract and append the Astryx cheat sheet. Do not add a CSP. Do not strip the Grok pill or invent `og:*` tags.

### 5. Replace shells and primitives; drop Linka color aliases

| Surface | Replace with |
| --- | --- |
| `ConsoleShell` | Astryx `AppShell` + `SideNav` + `MobileNav` |
| Public `AppShell` | Astryx `AppShell` / `TopNav` (account slot only where it exists today: `/` logged-out and `/login`) |
| CVA `Button` | `Button` / `IconButton`; `buttonVariants` on `<Link>` becomes `Button` as child or Astryx link styling |
| `fieldClass` inputs | `TextInput` / `TextArea` / `NumberInput` |
| Stock toggle | `Switch` |
| `SidePanel` | `Dialog` or `Drawer` |
| Product/bio rows | `ListItem` / `Card` |
| Inline error `<p className="text-primary">` | `Banner` |

Delete `@theme` colors in `src/styles.css` once screens no longer use `bg-bg`, `text-fg`, `text-primary` (orange), `shadow-ring`. After the bridge, `text-primary` is body text. Orange labels use accent/text-accent tokens.

Foundation smoke (Button, TextInput, Card with non-zero padding) before migrating routes. Then public shell, console shell, login, workspace, bio, `/r` sold-out, `/plano`, `Bench`.

### 6. Import each Astryx component from its own entry

Follow CLI output (`@astryxdesign/core/Button`, not a barrel) to keep the client bundle small. Do not import `pg` or server modules from these files.

## Risks / Trade-offs

- **[Unlayered reset zeroes component padding]** → Foundation smoke page/assert `paddingInline !== 0px` before any route migration.
- **[`init` overwrites `AGENTS.md`]** → Backup; restore + append.
- **[Tailwind `text-primary` collision]** → Remove Linka aliases in the same change as the bridge, not after.
- **[`#ff5c39` as small text fails contrast]** → Orange is fill + generated text-accent, not body-size orange on white.
- **[Astryx beta]** → Pin versions in `package.json`; Magalu rebuild is the gate.
- **[SSR flash if runtime theme is used]** → Only built theme + CSS in `__root` stylesheet links / CSS imports.

## Migration Plan

1. Install packages, backup `AGENTS.md`, `init`, `theme add neutral`, author and build `linka`, layer CSS, mount `<Theme mode="light">`.
2. Smoke primitives.
3. Migrate shells, then screens. Keep copy pt-BR.
4. Magalu: `docker compose -p linka build` (or `up -d --build`) and smoke `/`, `/login`, a `/p/<code>`, sold-out `/r/<code>` on the public host.
5. Rollback: previous image. No database to reverse. `AGENTS.md` restore from git if `init` was wrong.

## Open Questions

None. Neutral light, `#ff5c39`, no Bricolage, no system mode, and `theme add neutral` are decided.
