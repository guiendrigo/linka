# Spec Delta

## Purpose

Resolves a public product code to the first in-stock HTTPS offer, or to an honest sold-out page, without exposing owner-private fields or letting the home simulator override a real product.

## ADDED Requirements

### Requirement: First in-stock HTTPS offer wins
For a known product code, `/r/<code>` MUST redirect with 302 and `cache-control: no-store` to the first offer that is in stock and whose URL is https without credentials or whitespace. If none qualify, the visitor MUST see a sold-out or blocked page instead of following a dead URL.

#### Scenario: Primary in stock
- **WHEN** a visitor opens `/r/<code>` for a stored product whose first offer is in stock and https
- **THEN** the response is 302 to that offer URL with `cache-control: no-store`

#### Scenario: Fallback after primary is out
- **WHEN** the primary offer is out of stock and a later offer is in stock and https
- **THEN** the response is 302 to that later offer URL with `cache-control: no-store`

#### Scenario: All offers out
- **WHEN** every offer is out of stock
- **THEN** the visitor sees a sold-out page and is not redirected

### Requirement: Visitor pages omit commission
Public `/r/<code>` pages shown to a visitor (sold-out, missing destination, or blocked non-https) MUST show the product title and MAY show the BRL price. They MUST NOT show the owner's commission percentage.

#### Scenario: Sold-out page has no commission
- **WHEN** a visitor opens `/r/<code>` for a stored product with no in-stock offer
- **THEN** the HTML does not include the commission percentage

#### Scenario: Simulator may still show commission
- **WHEN** a signed-out visitor uses the home simulator for the demo product
- **THEN** the simulator MAY show commission as an affiliate teaching aid

### Requirement: Demo stock override is demo-only
The `?on=` query MUST change which offers count as in stock only for the hardcoded demo catalog code. For any stored product code, `/r/<code>` MUST ignore `?on=` and use persisted stock flags.

#### Scenario: Demo code honors on
- **WHEN** a visitor opens `/r/serum-c?on=` with a list of demo offer ids
- **THEN** resolution uses only those ids as in stock

#### Scenario: Stored product ignores on
- **WHEN** a visitor opens `/r/<stored-code>?on=` with any value
- **THEN** resolution uses the product's saved stock flags, not the query

### Requirement: JSON resolution matches the HTML path
`GET /api/r/<code>` MUST run the same stock-freshen step as `/r/<code>` before deciding, MUST NOT require authentication, and MUST NOT include commission or Affiliate secrets. Unknown codes MUST be 404. Malformed codes MUST be 400.

#### Scenario: Same decision as HTML
- **WHEN** a stored product has one in-stock HTTPS offer
- **THEN** `/api/r/<code>` returns that offer's shop and URL as the resolution and `/r/<code>` redirects to the same URL

#### Scenario: Freshen runs on the JSON route
- **WHEN** `/api/r/<code>` is requested for a stored code
- **THEN** the server attempts the same stock freshen used by `/r/<code>` before reading offers

#### Scenario: Invalid code
- **WHEN** the path code is not a 1–64 character `a-z0-9-` token
- **THEN** the JSON response status is 400
