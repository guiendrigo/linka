# Spec Delta

## Purpose

Tells the signed-in owner, in Portuguese, whether stock is manual or automatic, without asking for a Shopee App ID, and warns that short links without shop and item ids keep the marked flag.

## ADDED Requirements

### Requirement: Manual stock is the path when automatic is off
When platform Affiliate credentials are unset, Links MUST treat the owner's in-stock flags as the source of truth, MUST NOT call the Affiliate catalog, and MUST NOT ask the owner to paste an App ID or secret.

#### Scenario: No platform key
- **WHEN** a signed-in owner opens Links and both platform Affiliate env values are empty
- **THEN** workspace payload `stock.automatic` is false and offer stock stays as the owner marked it

#### Scenario: No credential form
- **WHEN** that owner uses the console
- **THEN** there is no form, route, or nav item to paste a Shopee App ID or secret

### Requirement: Copy matches the live stock mode
While automatic checks are off, public home and Links MUST NOT claim that stock updates itself from Shopee. Copy MUST stay in pt-BR and MUST describe backup fallback from the flags the owner marks.

#### Scenario: Home does not promise a live catalog
- **WHEN** a signed-out visitor opens `/`
- **THEN** the pitch does not say that stock resolves by itself from Shopee

#### Scenario: Links explains manual stock
- **WHEN** a signed-in owner opens Links with `stock.automatic` false
- **THEN** the page tells them in Portuguese that they mark stock and that the click still uses those flags for backup

### Requirement: Short links without ids stay on the marked flag
Links MUST warn, in Portuguese, that a Shopee short link without shop and item ids is not auto-checked. Pasting such a URL MUST still save, and the offer MUST keep the in-stock flag the owner set.

#### Scenario: Warning on the offer field
- **WHEN** a signed-in owner opens the new or edit product panel
- **THEN** the offer URL area warns that `shope.ee` and other short links without the product code are not auto-checked

#### Scenario: Short link saves
- **WHEN** the owner saves an https `shope.ee` URL with an in-stock flag
- **THEN** the offer is stored with that URL and that flag
