# Design

## Context

See proposal.md for motivation. Today each product has a unique `code` and `/r/$code` 302s via `resolveSmartLink`. Accounts have Better Auth `user.name` / `image` but no public slug. Products have no visibility flag. There is no upload pipeline. Persistence is three backends behind `getSql()` (SQLite file, Neon, PGLite) with **separate** migration trees. Magalu Cloudflare already bypasses cache for `/r/*` and `/api/*`. Public `/r/$code` uses `AppShell` without account chrome and `cache-control: no-store`.

## Goals / Non-Goals

**Goals:**

- Dual-schema `bio_pages` + `products.bio_visible` that works on Postgres and SQLite.
- Get-or-create on `loadWorkspace` so the copyable address exists without a Better Auth hook.
- Public loader that filters with the existing `resolveSmartLink` (no second stock engine).
- Photo in the database, served on its own URL, never in the client product payload.
- Owner mutations through `authMiddleware` + `context.userId` only.

**Non-Goals:**

- Object storage, image CDN, or HEIC transcode.
- Chosen handles, custom domains, themes, extra non-product buttons.
- Regenerating codes, drag-and-drop order, click counts.
- Changing `/r/$code` behavior.

## Decisions

### 1. Table `bio_pages`, flag on `products`

```
bio_pages (
  user_id PK,
  code unique,
  title,
  description default '',
  photo_mime nullable,
  photo_bytes nullable,
  created_at
)
products.bio_visible not null default true
```

Postgres: `0004_bio_page.sql` (`bytea`, `boolean`, `timestamptz`). SQLite: `0003_bio_page.sql` (`blob`, integer 0/1, text timestamps). Existing rows become visible, which matches “new product already on the bio”.

**Why:** One page per account is a 1:1 with `user_id`. Visibility is a product property, not a join table, because this slice has no extra link types.

**Rejected:** `page_items` table (needed only for mixed link types). Handle column (user chose opaque codes).

### 2. Opaque code: 8 chars, retry like products

Alphabet `abcdefghjkmnpqrstuvwxyz23456789` (no `0/o/1/l/i`). Validator aligned with product codes: `^[a-z0-9]{8}$` on `/p/$code`. Generate with `crypto.getRandomValues`, retry on unique violation (same 5-attempt loop as `createProduct`).

**Why:** Short enough for Instagram; no collision with `/r/<title>-<4>`.

**Rejected:** UUID in the URL. Title slug (looks like a handle, can clash).

### 3. Ensure row inside `loadWorkspace`

`loadWorkspace` (already authed) SELECTs `bio_pages` for `context.userId`; if missing, INSERT with `title` from `"user"."name"` (fallback `Minha página`), empty description, null photo. `WorkspaceView` grows `bio: { code, title, description, hasPhoto }` — **not** bytes.

**Why:** First Links render is the natural “account exists” moment. Avoids editing frozen Better Auth hooks.

**Rejected:** Lazy create on first `/p/` hit (no public URL to copy until then). Create on signup (auth `server.ts` is platform-wired).

### 4. Public payload has no offer URLs

Loader for `/p/$code`:

1. Find page by code → 404 if missing.
2. Optionally `checkStock(ownerId, { force: false })` so stale Shopee rows refresh under the existing `LOOKUP_CAP` / 15-minute window; ignore network failures (same as `/r`).
3. Load that owner's products, keep those with `bio_visible` and `resolveSmartLink(link).status === "ok"`.
4. Return `{ title, description, hasPhoto, products: [{ code, title, priceCents }] }` in Links order (`created_at` desc).

**Ver oferta** is `<a href="/r/${code}">` (respect `previewPathPrefix`). `/r` still does HTTPS + 302.

**Why:** A public HTML list must not dump backup URLs or commission. Stock decision stays in one function.

**Rejected:** Redirecting from the bio row straight to Shopee (would duplicate `redirectTarget`). Embedding offers in the page JSON.

### 5. Photo as DB bytes, separate GET

Store decoded bytes + `photo_mime` (`image/jpeg` | `image/png` | `image/webp`). Cap **1_000_000** bytes after decode. Magic-byte check on the server; reject anything else (including HEIC) with Portuguese copy.

Upload: owner `createServerFn` POST. Client reads `File` as `ArrayBuffer`, sends base64 in JSON (existing server-fn style, no multipart stack). Server decodes, validates, UPDATE scoped by `user_id`.

Serve: public `GET /p/$code/photo` with `content-type` + `cache-control: no-store`. `<img>` only when `hasPhoto`. Replacing the photo overwrites bytes; no second row.

**Why:** No S3 on Grok preview or Magalu. `getSql().query` already takes JS params; `Buffer`/`Uint8Array` works on `pg` (bytea) and better-sqlite3 (blob). Do not put base64 in `WorkspaceView` or the HTML.

**Rejected:** Filesystem under `/data` (breaks Vercel/PGLite). Data-URL in the page (huge HTML, cache weirdness). Using Google `user.image` as the bio avatar (owner asked for a phone upload).

### 6. Public layout is not the console

`src/routes/p/$code.tsx` is public (no `authMiddleware`). No `ConsoleShell`, no `AccountSlot`. Centered column (max-width ~24rem), tokens `bg-bg` / `text-fg` / `bg-surface`, avatar, title, description, stacked rows, empty copy **Nenhuma oferta no momento**. Tiny Linka mark in the footer is allowed; do not strip the Grok pill. `head` title = page title. Headers: `cache-control: no-store`.

Owner UI: block above the table in `LinksPanel` (photo file input `accept="image/jpeg,image/png,image/webp"`, title, description, copy button, per-row visibility switch). No “regenerate code” control.

### 7. Cloudflare `/p/*`

Document a cache bypass for `/p/*` next to `/r/*` in `docs/magalu-cloudflare.md`. Same reason: list depends on stock.

## Risks / Trade-offs

- [Binary params through `getSql()`] → Spike in implementation: if PGLite rejects `bytea`, store photo as `text` base64 in both trees instead of inventing a third driver. Keep the 1 MB decoded cap either way.
- [Instagram in-app browser + 1 MB image] → Cap + JPEG/WebP; no-store on the photo URL so a replace is visible.
- [Stock refresh vs many products] → Reuse `LOOKUP_CAP` 8; extra visible rows use last known `in_stock`. Same as the workspace.
- [PGLite wipe on dev restart] → Bio page and photo disappear with the rest of the account. Expected, not a bug.
- [Default visible on migrate] → Existing catalogs appear on the new bio until the owner hides rows. Matches the agreed default.
- [Code squatting / enumeration] → 8 chars from a 32-symbol alphabet is enough at this scale; unknown codes share one not-found page.

## Migration Plan

1. Add Postgres and SQLite migrations; apply via existing startup/`npm run build` paths (do not run Postgres files on SQLite).
2. Deploy app code that get-or-creates pages. Empty `bio_pages` is fine; first login fills it.
3. Rollback: drop the public route and owner UI; leftover columns/tables are unused. No data backfill required.

## Open Questions

None. Photo storage dialect (bytea vs base64 text) is an implementation fallback under Decision 5, not a spec change.
