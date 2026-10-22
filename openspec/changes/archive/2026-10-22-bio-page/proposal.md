# Proposal

## Why

Instagram gives the affiliate one link in the bio, but Linka today is one address per product (`/r/<code>`). Pasting a single product wastes the rest of the catalog; pasting nothing leaves the bio unused. The person needs one stable public page that lists the offers they choose, in a Linktree-style stack, with **Ver oferta** still going through the existing stock-aware redirect.

## What Changes

- Add a **public bio page** at `/p/<code>`: opaque, stable code (not a chosen handle). One page per account, created when the account first loads the workspace. Title defaults to the login name; description and photo start empty.
- The visitor sees avatar (if any), title, description, then visible in-stock products as rows of **title, BRL price, Ver oferta**. No commission, no extra links (WhatsApp, Instagram, Pix).
- **Ver oferta** navigates to `/r/<product-code>` in the same tab so stock + HTTPS gating stay in one place.
- Owner curates from the **top of Links**: edit title/description, upload a profile photo from the phone, copy `/p/<code>`, toggle each product’s visibility. New products default to visible. Order matches the Links table (`created_at` desc). The page code never regenerates.
- A product that is hidden, or that has no in-stock HTTPS offer (primary and backups), **does not appear** on the public page. When stock returns, it reappears without a manual toggle. Empty list shows that there is no offer at the moment.
- Store the photo in the database (one image per page, small cap). No object storage.

## Capabilities

### New Capabilities

- `bio-page`: Public per-account vitrine at `/p/<code>` — identity (title, description, photo), owner curation (visibility, copy link), and the visitor list that only shows products which are both marked visible and currently in stock.

### Modified Capabilities

- (none)

## Impact

- New public route `/p/$code` (and a photo URL for the avatar). `/r/$code` is unchanged.
- Schema: `bio_pages` plus `products.bio_visible`. Dual trees: Postgres `migrations/0004_*.sql` and SQLite `migrations/sqlite/0003_*.sql`.
- Server modules under `src/lib/linka/` (`store.server.ts`, new public loader, workspace server fns). Client: `workspace.tsx` / Links home. No new npm dependencies.
- Magalu Cloudflare cache bypass should include `/p/*` the same way as `/r/*`.
- Copy stays pt-BR. Public page has no account chrome.
