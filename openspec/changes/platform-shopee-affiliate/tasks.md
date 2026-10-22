# Tasks

## 1. Schema

- [x] 1.1 Add `migrations/0005_affiliate_stock.sql` that `drop table if exists shopee_credentials` and creates `stock_checks (shop_id, item_id, in_stock boolean, checked_at timestamptz, primary key (shop_id, item_id))` with no `now()` default; verify the file has no `now()` and no `shopee_credentials` recreate
- [x] 1.2 Add `migrations/sqlite/0004_affiliate_stock.sql` with the same drop plus SQLite types (`in_stock integer`, `checked_at text`) and no `timestamptz` / `now()`; verify a temp `SQLITE_PATH` apply records `0004_affiliate_stock.sql` and `select name from sqlite_master` has `stock_checks` and not `shopee_credentials`
- [x] 1.3 Update `src/lib/db-sqlite.test.ts` so recorded migrations include `0003_bio_page.sql` and `0004_affiliate_stock.sql`, replace the credential upsert with a `stock_checks` insert that stores the supplied `checked_at`, and keep the product-delete cascade; verify `node --experimental-strip-types --test src/lib/db-sqlite.test.ts` passes

## 2. Affiliate helpers

- [x] 2.1 Split `looksLikeAuthFailure` so it no longer matches `10030`, add `looksLikeRateLimit` for `10030` / rate-limit text, and keep `offerQueryPayload` requesting only `itemId`, `productName`, `shopName`; verify `node --experimental-strip-types --test src/lib/linka/shopee.test.ts` asserts `10030` is rate-limit not auth, `10020`/`10035` stay auth, and the query string does not contain `offerLink`, `generateShortLink`, or `conversionReport`

## 3. Resolver and catalog adapter

- [x] 3.1 Add `resolveAffiliateCredential(userId)` that returns `{ source: "platform", appId, secret }` only when both `SHOPEE_AFFILIATE_APP_ID` and `SHOPEE_AFFILIATE_SECRET` are non-empty (one-of is `null`), never reads SQL, and does not use `VITE_*`; add `resolveShopAuthorization` that returns `null`; verify a unit test covers both-set / one-set / unset without touching the database
- [x] 3.2 Replace `lookupOffer(appId, secret, …)` with `affiliateCatalog(cred, shopId, itemId)` that maps transport to `in | out | auth | rate_limited | down` and does not import `env` or `getSql`; verify a unit test with a fake `fetch` returns `rate_limited` on `10030` and `auth` on `10020`

## 4. Stock check and workspace payload

- [x] 4.1 Change `checkStock` to resolve the credential, reuse fresh `stock_checks` before any live call (still `LOOKUP_CAP` on live calls), upsert cache + `offers` with an app timestamp on `in`/`out`, map missing cred → `not_configured`, `rate_limited` → `throttled`, and never mention App ID/secret in `detail`; verify a test that user B within 15 minutes of user A's same shop/item does not call the catalog and that `not_configured` leaves `in_stock` unchanged
- [x] 4.2 Replace `WorkspaceView.shopee` with `stock: { automatic: boolean }` derived from the resolver, delete `saveCredentials` / `clearCredentials` / `saveShopeeCredentials` / `removeShopeeCredentials` / `cleanCredentials`, and stop selecting `shopee_credentials`; verify typecheck of these modules and that no remaining SQL references `shopee_credentials`

## 5. Console

- [x] 5.1 Delete `src/routes/shopee.tsx` and `ShopeePanel`, remove the Shopee item from `NAV` in `console.tsx`, and let `routeTree.gen.ts` regenerate without `/shopee`; verify `rg -n "ShopeePanel|/shopee" src` has no route or nav hit (generated tree gone) and Links copy on `throttled` / `not_configured` is pt-BR without App ID
- [x] 5.2 Rewrite the Shopee credentials section of `PROGRESS.md` (pt-BR): platform env, no user paste, cache, rate-limit vs auth, and keep “O que ainda não existe” from claiming search/dashboard/PWA/seller OAuth as done; verify that file no longer tells the user to paste App ID/secret

## 6. Magalu gate

- [x] 6.1 Run `npm run test:linka`, `npm run typecheck`, and `npm run lint` and verify all three exit 0
- [x] 6.2 Run `docker compose -p linka up -d --build` (not `npm run build` as the production gate) and verify the `app` container is healthy
- [x] 6.3 Smoke `https://linka.guiendrigo.com/`: signed-out home still renders, `/shopee` is not a credential form, and `/r/serum-c` still redirects or shows sold-out without console errors; do not require Affiliate env for this smoke

## Workflow follow-up

- Archive the change after review so `affiliate-stock` lands in `openspec/specs/` and `sqlite-store` is synced.
- After Shopee emails the platform App ID/secret, add both to the Magalu host `.env` and recreate the `app` container.
- Do not treat `npm test` as a gate: template-ownership assertions still fail on purpose.
