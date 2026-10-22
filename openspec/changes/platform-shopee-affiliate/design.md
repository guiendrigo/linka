# Design

## Context

See proposal.md for motivation. Stock checks live in `checkStock` (`store.server.ts`): parse shop/item from the offer URL, sign `productOfferV2` with per-user `shopee_credentials`, interpret empty nodes as out of stock. `LOOKUP_CAP` is 8 live lookups; `STOCK_FRESH_MS` is 15 minutes on `offers.checked_at`. Auth failure (`looksLikeAuthFailure`) currently treats `10030` (rate limit) as a refused credential. The console nav has a `/shopee` form; `WorkspaceView.shopee` exposes `appId` when connected. Magalu is Docker Compose `linka` + SQLite volume; schema changes need both trees. Affiliate Open API is SHA-256 App ID/secret (no OAuth). Open Platform seller OAuth is a different identity and is not implemented here.

## Goals / Non-Goals

**Goals:**

- Dual-tree drop of `shopee_credentials` and add of `stock_checks`.
- Resolver + Affiliate catalog adapter so `checkStock` does not read env or SQL for secrets.
- Shared shop/item cache with app-supplied timestamps.
- `10030` as `rate_limited`, not auth.
- Console without Shopee onboarding; copy never names App ID/secret.

**Non-Goals:**

- Creating `shopee_connections` or implementing `source: "user"`.
- Open Platform `partner_id` / shop OAuth (stub only).
- Secret encryption / vault.
- Changing `resolveSmartLink` or `/r/$code` HTTPS gating.
- Conversational search or short-link generation.

## Decisions

### 1. Env names, both-or-neither

`SHOPEE_AFFILIATE_APP_ID` and `SHOPEE_AFFILIATE_SECRET` via existing `env()` in `src/lib/env.server.ts`. No `VITE_` prefix. If only one is set, treat as missing (`null`) so a half-configured process does not send a broken signature.

**Why:** Same pattern as other Magalu secrets (`BETTER_AUTH_SECRET`). Optional until Shopee emails the key; Compose already loads host `.env`.

**Rejected:** `VITE_SHOPEE_*` (would leak to the client). A feature flag besides the env itself.

### 2. Two ports, not one Shopee client

```
resolveAffiliateCredential(userId) -> { source: "platform" | "user", appId, secret } | null
affiliateCatalog(cred, shopId, itemId) -> in | out | auth | rate_limited | down

resolveShopAuthorization(userId, shopId) -> { shopId, accessToken, expiresAt } | null
  // always null in this change
```

`affiliateCatalog` MUST NOT import `env` or `getSql`. `checkStock` calls the resolver, then the adapter. Keep pure helpers in `src/lib/linka/shopee.ts` (`parseShopeeItem`, `offerQueryPayload`, `authorizationHeader`, `interpretOfferResponse`). Replace `lookupOffer(appId, secret, …)` in `shopee.server.ts` with the adapter (or a thin `shopee/affiliate.server.ts` next to a `shopee/credentials.server.ts`).

`userId` is unused today but stays on the resolver so a later `source: "user"` branch does not change `checkStock`. Documented precedence for that day: user connection, then platform env. Do not implement the user branch.

**Why:** Affiliate auth is an app secret; Open Platform auth is app-level partner key *plus* a shop token. One client with a switch would mix those.

**Rejected:** A single `ShopeeClient`. Creating `shopee_connections` empty (schema would guess OAuth columns).

### 3. Schema: Postgres `0005`, SQLite `0004`

Postgres `migrations/0005_affiliate_stock.sql`:

```
drop table if exists shopee_credentials;

create table if not exists stock_checks (
  shop_id text not null,
  item_id text not null,
  in_stock boolean not null,
  checked_at timestamptz not null,
  primary key (shop_id, item_id)
);
```

SQLite `migrations/sqlite/0004_affiliate_stock.sql`: same shape with `in_stock integer not null` and `checked_at text not null`. No `now()`, no `timestamptz` in the SQLite file. Writes supply `checked_at` from JavaScript.

**Why:** Cache is keyed by catalog identity, not user. Dropping credentials is the breaking change the proposal named; Magalu has no working user key.

**Rejected:** Keep `shopee_credentials` as unused legacy. Encrypt-at-rest for a table we are deleting.

### 4. Cache before live lookup

For each due shop/item group:

1. If `stock_checks` is fresh (`STOCK_FRESH_MS`), apply `in_stock` to those offers and set `offers.checked_at` from the cache row. No API call.
2. Else call `affiliateCatalog` (still capped at `LOOKUP_CAP` live calls).
3. On `in`/`out`, upsert `stock_checks` and the matching offers with an app timestamp.
4. On `auth` / `rate_limited` / `down` for the first live call, stop and return without writing cache. Later groups in the same run are skipped (same as today).

`StockReport.state`: rename `need_credentials` → `not_configured`. Add `throttled` for `rate_limited`. Keep `rejected` / `unreachable` with copy that does not mention App ID or secret.

If every due group is a cache hit, return `fresh` or `updated` (if applying cache changed a flag). `not_configured` only when a live lookup was needed and the resolver returned null.

**Why:** One platform app, many owners of the same item. Per-offer `checked_at` stays so force-refresh and manual toggles (which already null `checked_at`) still work.

**Rejected:** Cache-only, dropping `offers.checked_at`. In-memory cache (dies with the Magalu process).

### 5. Split `10030` out of auth

`looksLikeAuthFailure` drops `\b10030\b`. New `looksLikeRateLimit` matches `10030` / `rate limit`. Adapter maps: HTTP 401/403 or auth text → `auth`; rate-limit → `rate_limited`; otherwise transport/parse → `down`.

**Why:** With a shared key, a 10030 would otherwise tell every owner their App ID is wrong.

### 6. Tracking invariant in the query, not a comment

`offerQueryPayload` continues to request only `itemId`, `productName`, `shopName`. Unit test asserts the query string does not contain `offerLink`, `generateShortLink`, or `conversionReport`. Adapter/store tests fail if those identifiers appear.

Public `/r/$code` still uses `redirectTarget` on the stored offer URL.

**Why:** `productOfferV2` can return `offerLink` with the **platform** affiliate tracking. Reading it would steal commissions.

### 7. Workspace surface

`WorkspaceView.shopee` is replaced by `stock: { automatic: boolean }` (`automatic` iff the resolver returns a credential). No App ID. Delete `saveShopeeCredentials`, `removeShopeeCredentials`, `cleanCredentials`, `ShopeePanel`, `src/routes/shopee.tsx`, and the console nav item. Let the TanStack plugin regenerate `routeTree.gen.ts`.

**Why:** UI must not sniff env. When a user connection exists later, `automatic` can become `env || user` without a new payload field.

**Rejected:** Keep `/shopee` as a status page. Hide the form but leave the route.

### 8. Open Platform reserved, not built

`resolveShopAuthorization` returns `null`. No `SHOPEE_PARTNER_*` env. Future table (not in this change):

```
shopee_connections (
  user_id, kind /* affiliate | seller */, external_id,
  secret, refresh_token, expires_at, updated_at,
  primary key (user_id, kind, external_id)
)
```

When that ships: HMAC auth_partner URL, single-flight refresh per shop, and seller data only for offers whose parsed `shopId` equals the authorized `shop_id`. Other shops keep Affiliate catalog fields (`shopName` already in the query).

**Why:** Guessing OAuth columns now would rot in two migration trees.

## Risks / Trade-offs

- **[ToS]** Affiliate signature is “in the name of that affiliate account.” → Query only catalog by shop/item; never `offerLink` / short link / conversion report. Register the app as Linka's own tool.
- **[Shared quota]** One App ID for every owner. → Shop/item cache + existing `LOOKUP_CAP` + distinct `throttled` state. No distributed lock; two concurrent misses may double-call (last write wins).
- **[Key revocation]** Shopee disables the platform app. → Every owner degrades to manual stock until env is fixed. Copy does not send them to paste a key.
- **[Secret in env]** Plain text on the Magalu host `.env`. → Same as `BETTER_AUTH_SECRET`. Server-only module; never log the secret. Vault is out of scope.
- **[Dropped rows]** `shopee_credentials` cannot be restored. → Accepted; no working production key.

## Migration Plan

1. Land code + `0005` / sqlite `0004`. Magalu: `docker compose -p linka up -d --build`. SQLite applies `0004` at process start on volume `linka_linka-data`.
2. Ship without env: automatic stock is `not_configured`, manual toggles work, `/shopee` is gone.
3. When Shopee emails App ID/secret, add both to the Magalu host `.env` and recreate the `app` container (Compose `env_file` is read at create).
4. Rollback: revert the image. Dropped `shopee_credentials` stay dropped; stock flags on `offers` remain. Do not re-add a user paste form.

`npm run build` (Vercel/Nitro) is not the production gate.

## Open Questions

None that change specs or this approach. Exact Affiliate QPS is unknown; the cache + cap is the mitigation until a live key exists.
