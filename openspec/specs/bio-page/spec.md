# bio-page Specification

## Purpose

Gives each signed-in affiliate one public Linktree-style page so an Instagram bio can list curated, in-stock products and send the tap through the existing smart link.

## Requirements

### Requirement: One stable opaque bio address per account
The system MUST give each account exactly one bio page whose public code is an opaque token, not a chosen handle. The code MUST be created the first time that account loads the workspace, MUST be unique among bio pages, and MUST NOT change when the owner edits identity, photo, products, or visibility.

#### Scenario: First workspace load creates the page
- **WHEN** a signed-in user opens Links and has no bio page yet
- **THEN** the system creates one page, shows a copyable `/p/<code>` address, and sets the title to the account display name with empty description and no photo

#### Scenario: Later visits keep the same code
- **WHEN** the same user opens Links again after editing the title or adding products
- **THEN** the bio code is the same value as on first creation

#### Scenario: Two accounts do not share a code
- **WHEN** a second account loads the workspace for the first time
- **THEN** its bio code is different from every existing bio code

### Requirement: Bio page is public
A visitor MUST open `/p/<code>` without signing in. An unknown or malformed code MUST NOT reveal whether an account exists beyond a not-found page. The response MUST NOT be stored for reuse so the next visit can hide newly sold-out products.

#### Scenario: Visitor with the link does not need an account
- **WHEN** an unauthenticated person requests a valid `/p/<code>`
- **THEN** the bio page renders without login chrome or a session

#### Scenario: Unknown code
- **WHEN** a person requests `/p/<code>` that matches no bio page
- **THEN** they see that the link does not exist, not another account's products

#### Scenario: Fresh stock on each visit
- **WHEN** a visitor reloads a valid bio page
- **THEN** the server re-evaluates which visible products still have stock instead of serving a stored list

### Requirement: Owner sets title, description, and photo
The owner MUST be able to set a page title, an optional description, and an optional profile photo from the device. Only that owner MUST change these fields. Title length MUST stay within 2 to 80 characters. Description MUST be at most 280 characters.

#### Scenario: Owner saves identity
- **WHEN** the signed-in owner submits a valid title and description from Links
- **THEN** the public bio page shows the new title and description

#### Scenario: Empty description is omitted
- **WHEN** the owner saves a title and leaves description blank
- **THEN** the public page shows the title and no description block

#### Scenario: Other people cannot edit identity
- **WHEN** a request to change title, description, or photo is not from the page owner
- **THEN** the system rejects it and leaves the page unchanged

### Requirement: Profile photo is uploaded from the phone
The owner MUST upload one profile image from the device (gallery or camera). The system MUST accept JPEG, PNG, or WebP at most 1 MB decoded. A new upload MUST replace the previous photo. The public page MUST show the photo only when one is stored.

#### Scenario: First photo appears on the bio
- **WHEN** the owner uploads a valid JPEG under 1 MB
- **THEN** the public bio page shows that image as the avatar

#### Scenario: Reject oversized or unsupported files
- **WHEN** the owner selects a file larger than 1 MB or a type other than JPEG, PNG, or WebP
- **THEN** the system refuses the upload, keeps the previous photo if any, and shows an error in Portuguese

#### Scenario: Replace photo
- **WHEN** the owner uploads a second valid image
- **THEN** the public page shows only the new image

### Requirement: Public list shows only visible in-stock products
The public bio MUST list a product only when the owner marked it visible and `resolveSmartLink` returns in-stock for that product (at least one HTTPS offer with stock). Hidden products MUST NOT appear. Products with no offers or with every offer out of stock MUST NOT appear, even if visible. When stock returns, a still-visible product MUST reappear without the owner toggling it.

#### Scenario: Visible product with stock is listed
- **WHEN** a visitor opens the bio and a product is visible with at least one in-stock HTTPS offer
- **THEN** that product appears in the list

#### Scenario: Owner hides a product
- **WHEN** the owner turns visibility off for a product that is in stock
- **THEN** the public list omits that product

#### Scenario: Sold-out product disappears
- **WHEN** a visible product has no in-stock offer (principal and backups)
- **THEN** the public list omits that product

#### Scenario: Stock return restores the row
- **WHEN** that product is still visible and at least one offer is in stock again
- **THEN** the public list shows it again without a new visibility action

### Requirement: Each public row is title, price, and Ver oferta
Each listed product MUST show its title, the BRL price, and a **Ver oferta** control. The public page MUST NOT show commission. **Ver oferta** MUST navigate in the same tab to `/r/<product-code>`.

#### Scenario: Row content
- **WHEN** a product appears on the public bio
- **THEN** the row shows its title, the price formatted in BRL, and **Ver oferta**, and does not show the commission percentage

#### Scenario: Ver oferta uses the smart link
- **WHEN** the visitor activates **Ver oferta** on a listed product
- **THEN** the browser goes to `/r/<that product's code>` in the same tab

### Requirement: Empty public list has an honest state
When no product passes the visible-and-in-stock filter, the public page MUST still show the page identity and MUST tell the visitor in Portuguese that there is no offer at the moment, without a fake product row.

#### Scenario: All products hidden
- **WHEN** the owner has products but none are visible
- **THEN** the visitor sees title (and photo/description if set) and copy that no offer is available now

#### Scenario: All visible products are sold out
- **WHEN** every visible product is out of stock
- **THEN** the visitor sees the same empty-offer state, not sold-out rows

### Requirement: Owner curates from the top of Links
Links MUST show a bio block above the product table: title, description, photo upload, the copyable `/p/<code>` address, and a visibility control on each product. A newly created product MUST be visible on the bio. Public list order MUST match the Links table (newest first). The owner MUST NOT be offered a control that regenerates the code.

#### Scenario: Copy address
- **WHEN** the owner activates copy on the bio address
- **THEN** the clipboard receives the public `/p/<code>` URL

#### Scenario: New product is visible
- **WHEN** the owner creates a product
- **THEN** that product is marked visible for the bio without an extra step

#### Scenario: Same order as Links
- **WHEN** the public list has two visible in-stock products
- **THEN** they appear in the same order as on the Links table

### Requirement: Bio is only Linka products
The public bio MUST NOT include owner-authored extra destinations such as WhatsApp, Instagram, or Pix. Only products from that account MAY appear in the list.

#### Scenario: No extra link slots
- **WHEN** the owner opens the bio block on Links
- **THEN** there is no control to add a non-product button to the public page
