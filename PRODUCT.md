# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

Mobile-first. The affiliate works from the phone; the public link and the bio page are opened from Instagram stories, WhatsApp groups, and bios, almost always on a phone. Desktop works but is not the primary scene. Installable PWA is not built yet (see `PROGRESS.md`).

## Users

**Primary: the small/medium Shopee affiliate on Instagram and WhatsApp in Brazil.** They post many affiliate links a day from the phone — in stories, in offer groups, and in their bio. Their recurring pain: a product sells out, the link they already posted now lands on a dead or unavailable offer, and the click (and commission) is lost unless they go back and edit every story or message.

**Secondary: the visitor who clicks.** Someone in a story, group, or bio taps a link. They never have an account, never see Linka's internals, and only want to land on an offer they can actually buy. When nothing is in stock, they should learn that plainly instead of hitting a dead page.

## Product Purpose

Linka gives the affiliate one link per product that keeps working when stock runs out. The affiliate saves a product with a primary offer and up to three backups, in the order the click should try them. The public link `/r/<code>` sends each visitor to the first offer that is still in stock; if all are out, the visitor sees that the offer sold out.

Success: the affiliate pastes a link once — story, group, or bio — and never has to edit it again because a product sold out. Clicks stop being wasted on unavailable offers.

## Positioning

**The automatic backup: a link that never leads to a sold-out offer.** Linktree, Beacons, and Shopee's own short links point to one fixed destination; when that offer sells out, the link dies. Linka re-decides on every visit (no cache) and falls through to the next in-stock backup. The bio page (`/p/<code>`) is an extra built on the same rule — sold-out products disappear from it — not the core claim.

## Operating Context

- The affiliate signs in (Google, X, or e-mail/password) and manages products in the **Links** workspace: bio page header (title, description, photo), product list with price, commission, and 1–4 ordered offers, per-offer stock toggles, copy-link actions.
- Links are distributed by hand into Instagram stories, WhatsApp/Telegram offer groups, and bios. The `/r/<code>` code never changes when the product is edited.
- Stock today (closed beta) is mostly **marked by hand** with a per-offer toggle. Automatic checks use the Shopee Affiliate Open API (`productOfferV2`) with the **platform's** App ID/secret; they only run for URLs carrying shop/item ids, are fresh for 15 minutes, and are shared across accounts pointing at the same item. Short links (`shope.ee`) can't be checked yet; the manual mark holds.
- The public home (`/`) pitches the product with a live simulator (`Bench`) of the demo product `serum-c`; `?on=` is a demo-only stock override.
- Production runs on a Magalu VM (Docker, SQLite); the Grok preview uses an embedded database that resets.

## Capabilities and Constraints

**Exists:** account sign-in; per-user products with primary + up to 3 backups (create, edit, delete, reorder); public smart link `/r/<code>` (302, `no-store`, HTTPS-only destinations); JSON decision at `/api/r/<code>`; sold-out page showing title and price without commission; public bio page `/p/<code>` (opaque code, title/description/photo, per-product visibility, "Ver oferta", sold-out items hidden); manual and automatic stock; RevenueCat billing code (Anual/Mensal, `linka_pro`) behind `VITE_BILLING_ENABLED`, **off** — the beta does not charge.

**Does not exist yet (do not design as if it did):** natural-language product search; free-account limits; dashboard/panel of live vs. fallen-back vs. sold-out links; click counts or history; installable PWA; chosen bio handle or extra bio links (WhatsApp, Instagram, Pix); short-link stock checks.

**Constraints:**
- Visitors never need an account; public routes stay unauthenticated.
- The affiliate never pastes an API key; Shopee credentials are platform-level and never shown.
- Commission is private to the affiliate — never shown on public surfaces.
- The click destination is always the URL the affiliate pasted; Linka never substitutes its own affiliate link.
- Terminology (pt-BR): *oferta principal*, *backup*, *em estoque* / *esgotado*, *link*, *página da bio*, *Links*, *Conferir estoque*, *Ver oferta*. Prices in BRL with comma decimals.
- The platform's sign-out labels remain in English (platform-owned control).

## Brand Commitments

- Name: **Linka**. All product copy is in **Brazilian Portuguese**.
- Visual reference standard (Category Canon): **Shopee / Mercado Livre / Nuvemshop**. E-commerce vernacular of Brazilian retail and affiliate marketing: clean, approachable, high contrast, warm orange/amber cues, crisp product cards, explicit status tags, and trustworthy transactional microcopy. No corporate SaaS jargon, no noisy panfleto-style shouting, no technical ASCII/terminal aesthetics.
- Voice, as established in shipped copy: short, plain, declarative sentences; concrete about the mechanism ("Se a principal sair, o clique vai para o próximo backup"); speaks to the affiliate as *você*; no hype, no exclamation-mark marketing, no promises the code doesn't keep. Honest about the beta (e.g., says stock is marked by hand when automatic checks aren't available).
- Grok App Builder platform chrome (the "Created with Grok" pill, preview bridge) stays.

## Evidence on Hand

- Working product and a live demo: the `serum-c` simulator on the home page and `/r/serum-c`, `/api/r/serum-c`.
- Status and backlog: `PROGRESS.md`; specs under `openspec/specs/`.
- Screenshots: `screenshots/`, `image.png` (mobile Links workspace).
- Share card: `public/og.jpg`, identity in `src/lib/og/site.json`.

**Absent — must not be fabricated:** no public users, no testimonials, no customer logos, no usage numbers, no click/conversion metrics, no pricing to advertise. The product is in closed beta.

## Product Principles

1. **The click is never wasted.** Every decision protects the visitor's path to a buyable offer; a dead end is worse than an honest "esgotou".
2. **Paste once.** Anything that forces the affiliate to go back and edit a posted story or message is a product failure.
3. **Phone first, fast.** The affiliate acts between posts on a phone; core tasks (add product, reorder backups, toggle stock, copy link) must be quick one-handed.
4. **Say only what's true.** Copy describes what the system actually does today, including beta limits; no invented proof or features.
5. **The visitor sees the offer, not the machinery.** Public surfaces stay minimal: no account, no commission, no internals.
