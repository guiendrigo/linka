# Tasks

## 1. Schema

- [x] 1.1 Add `migrations/0004_bio_page.sql` with `bio_pages` (`user_id` PK, unique `code`, `title`, `description` default `''`, nullable `photo_mime` / `photo_bytes bytea`, `created_at timestamptz`) and `products.bio_visible boolean not null default true`; verify the file uses `if not exists` / `add column if not exists` and no `now()`
- [x] 1.2 Add `migrations/sqlite/0003_bio_page.sql` with the same shape using SQLite types (`blob`, integer 0/1, text timestamps) and `bio_visible integer not null default 1`; verify it contains no `timestamptz`, `bytea`, or `now()`

## 2. Pure helpers

- [x] 2.1 Add `src/lib/linka/bio.ts` with opaque 8-char `bioCode()`, `cleanBioIdentity({ title, description })` (title 2–80, description max 280), `PHOTO_MAX_BYTES = 1_000_000`, mime/magic-byte validation for JPEG/PNG/WebP, and `bioListItems(products)` that keeps `bio_visible` plus `resolveSmartLink` status `ok` and maps to `{ code, title, priceCents }` in input order; verify `node --experimental-strip-types --test src/lib/linka/bio.test.ts` covers unique-looking codes, identity errors in Portuguese, oversized/HEIC rejection, hidden and `all_out` omission, and BRL-ready cents without commission

## 3. Store and server functions

- [x] 3.1 Extend `WorkspaceView` / `WorkspaceProduct` with `bio: { code, title, description, hasPhoto }` and `bioVisible`, and make `loadWorkspace` get-or-create `bio_pages` (title from `"user"."name"` or `Minha página`) without returning photo bytes; verify typecheck and that a second load keeps the same `code`
- [x] 3.2 Add authed server fns (`authMiddleware`, `context.userId` only) to save identity, toggle `bio_visible`, and replace the photo (base64 in, decode + validate, UPDATE bytes/mime); verify validators reject other users’ ids if sent and never log bytes
- [x] 3.3 Add a **public** loader `loadPublicBio(code)` that 404s on unknown code, runs `checkStock(ownerId, { force: false })` ignoring Shopee failures, then returns identity + `bioListItems` (no offer URLs, no commission); verify a unit or store test that a hidden or sold-out product is absent and an in-stock visible one is present
- [x] 3.4 If `photo_bytes` as `Uint8Array`/`Buffer` fails on PGLite, switch both migration trees to text and store base64 under the same 1 MB decoded cap; verify a round-trip write/read on the active `getSql()` backend

## 4. Public routes

- [x] 4.1 Add `src/routes/p/$code.tsx`: unauthenticated, no console/account chrome, `cache-control: no-store`, Linktree column (avatar if `hasPhoto` → `/p/$code/photo`, title, description if non-empty, rows with title, `formatBrl`, **Ver oferta** linking same-tab to `/r/$code` via `previewPathPrefix`), empty copy **Nenhuma oferta no momento**, not-found page for missing codes; verify pt-BR copy and that commission never renders
- [x] 4.2 Add public `GET /p/$code/photo` that streams stored bytes with the stored content-type and `cache-control: no-store`, 404 when missing; verify it does not require a session
- [x] 4.3 Update `docs/magalu-cloudflare.md` cache bypass to include `/p/*` beside `/r/*` and `/api/*`; verify the runbook names all three prefixes

## 5. Owner UI on Links

- [x] 5.1 Add a bio block above the product table: file input `accept="image/jpeg,image/png,image/webp"`, title, description, copy `/p/<code>` (prefixed), no regenerate control; verify a successful save updates the block and an invalid photo shows a Portuguese error without clearing a previous photo
- [x] 5.2 Add a visibility switch per product (default on for new rows) that calls the toggle fn; verify the table still orders by `created_at` desc and new products do not require an extra step to appear
- [x] 5.3 Note the bio page in `PROGRESS.md` (what works / what does not: no handle, no extra links, no click counts) in pt-BR; verify the “O que ainda não existe” list is not claiming dashboard/PWA/search as done

## 6. Integration

- [x] 6.1 Run `npm run typecheck`, `npm run lint`, and `npm run build` and verify all three exit 0
- [x] 6.2 Run `node --experimental-strip-types --test src/lib/linka/input.test.ts src/lib/linka/resolve.test.ts src/lib/linka/shopee.test.ts src/lib/linka/bio.test.ts` and verify they pass
- [x] 6.3 Browser smoke not run here: host is `/opt/linka` (not `/workspace`) and `npm run dev` fails because `SQLITE_PATH` points at unwritable `/data`. Typecheck/lint/build and unit tests above are the verification in this environment.

## Workflow follow-up

- Archive the change after review.
- Do not treat `npm test` as a gate: template-ownership assertions still fail on purpose (auth on, app migrations, OG identity).
