# Spec Delta

## Purpose

Checks whether a pasted Shopee offer is still in the affiliate catalog, using one platform Affiliate Open API credential, so affiliates never paste an App ID or secret.

## ADDED Requirements

### Requirement: Platform credential drives automatic stock
Automatic stock checks MUST authenticate to the Shopee Affiliate Open API with a platform App ID and secret from server configuration. They MUST NOT read an App ID or secret supplied by the signed-in user.

#### Scenario: Env present checks catalog
- **WHEN** both platform Affiliate env values are set and an offer URL contains shop and item ids
- **THEN** the server queries `productOfferV2` for that shop and item and updates the offer's in-stock flag from the catalog result

#### Scenario: User has no stored key
- **WHEN** the signed-in user has no Shopee credential row
- **THEN** automatic stock still runs if the platform env is set

### Requirement: Missing platform credential leaves manual stock
When the platform Affiliate App ID or secret is unset or empty, the system MUST skip the catalog call, MUST leave each offer's last known in-stock flag unchanged, and MUST report that automatic checks are not configured.

#### Scenario: Env absent
- **WHEN** a stock check runs without both platform Affiliate env values
- **THEN** no Affiliate API request is made and offers keep the stock the owner marked

### Requirement: Catalog lookup keys on shop and item from the offer URL
The catalog query MUST use shop and item ids parsed from the offer URL the owner pasted. URLs without those ids MUST be skipped and keep the marked stock.

#### Scenario: Classic Shopee path
- **WHEN** the offer URL contains `…-i.<shop>.<item>`
- **THEN** the catalog query uses those two ids

#### Scenario: Short link without ids
- **WHEN** the offer URL is a `shope.ee` short link without shop and item ids
- **THEN** the catalog is not queried for that offer and its marked stock remains

### Requirement: Stock result is shared across users for the same product
A successful catalog result for a shop and item MUST be reused for every offer with those ids until it is older than 15 minutes. A later check for the same pair within that window MUST NOT call the Affiliate API again.

#### Scenario: Two owners, one item
- **WHEN** user A and user B both have an offer for the same shop and item, and A's check just wrote a fresh result
- **THEN** B's check within 15 minutes uses A's result and does not call the Affiliate API

### Requirement: Throttling is distinct from credential failure
Affiliate API rate-limit responses (`10030`) MUST be treated as temporary unavailability. They MUST NOT be reported as a refused credential. Offers MUST keep their last known stock.

#### Scenario: Rate limit
- **WHEN** the Affiliate API returns `10030`
- **THEN** stock flags are unchanged and the owner is told the check is unavailable now, not that an App ID is wrong

#### Scenario: Invalid signature
- **WHEN** the Affiliate API returns `10020` or `10035`
- **THEN** stock flags are unchanged and the owner is told automatic checking is unavailable, without mentioning App ID or secret

### Requirement: Redirects never use platform tracking
Stock checks MUST NOT read, store, or follow Affiliate `offerLink`, `generateShortLink`, or `conversionReport` results. `/r/<code>` MUST keep redirecting to the HTTPS URL the owner pasted.

#### Scenario: Catalog node includes offerLink
- **WHEN** `productOfferV2` returns a node that includes `offerLink`
- **THEN** the stored offer URL is still the owner's URL and the public redirect uses that URL

### Requirement: Affiliates have no credential onboarding
The signed-in console MUST NOT offer a form, route, or nav item to paste or display a Shopee App ID or secret. Workspace payloads MUST NOT include Affiliate credentials.

#### Scenario: Console has no Shopee page
- **WHEN** a signed-in user opens the console
- **THEN** there is no Shopee nav item and `/shopee` is not a workspace page

#### Scenario: Workspace payload
- **WHEN** the workspace is loaded
- **THEN** the payload does not include an App ID, a secret, or a Shopee connected flag
