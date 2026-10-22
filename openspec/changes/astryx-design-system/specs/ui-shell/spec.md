# Spec Delta

## Purpose

Defines Linka’s product chrome and light visual language so public visitor pages and the signed-in workspace share one look, without changing auth, stock, or smart-link behavior.

## ADDED Requirements

### Requirement: Light theme with orange primary actions
The product MUST present a light visual theme: a light page background and dark body text. Filled primary actions MUST use the Linka orange `#ff5c39` with a contrasting label. The product MUST NOT switch to a dark theme from the operating system or a user control in this capability.

#### Scenario: First paint is light
- **WHEN** a visitor opens `/`, `/login`, `/p/<code>`, or a sold-out `/r/<code>` page
- **THEN** the page background is light and body text is dark, not the previous dark console palette

#### Scenario: Primary action is orange
- **WHEN** a screen shows a filled primary control such as Entrar, Novo link, or Ver oferta
- **THEN** that control uses orange `#ff5c39` and a label that remains readable on that fill

#### Scenario: No dark mode
- **WHEN** the device is set to dark appearance
- **THEN** Linka still renders the light theme and offers no control to switch modes

### Requirement: Public visitor pages have no account chrome
Public `/r/<code>` (sold-out or missing) and `/p/<code>` MUST render without signed-in navigation, account menu, or a Sign out control. Visitors MUST still reach those URLs without an account.

#### Scenario: Bio has no account bar
- **WHEN** an unauthenticated person opens a valid `/p/<code>`
- **THEN** they see the bio identity and product list, not Links/Plano navigation or Sign out

#### Scenario: Sold-out page has no account bar
- **WHEN** a visitor lands on a sold-out `/r/<code>` page
- **THEN** they see the product title and price without account chrome

### Requirement: Signed-in workspace has persistent product navigation
A signed-in person on Links or Plano MUST see product navigation that includes Links. Plano MUST appear in that navigation only when billing is enabled. Sign out MUST keep its English platform label.

#### Scenario: Links is always in the signed-in nav
- **WHEN** a signed-in user opens `/`
- **THEN** they can reach Links from persistent navigation (sidebar on wide viewports, a menu on narrow ones)

#### Scenario: Plano hidden when billing is off
- **WHEN** billing is disabled and a signed-in user opens the workspace
- **THEN** navigation does not include Plano

#### Scenario: Sign out wording
- **WHEN** a signed-in user without a gate session sees Sign out
- **THEN** the control label is English Sign out, not Sair

### Requirement: Shared controls stay consistent and in Portuguese
Interactive product UI (buttons, text fields, boolean stock controls, and the create/edit product overlay) MUST share one control language. New Linka copy on those screens MUST stay pt-BR, including errors.

#### Scenario: Product overlay uses the same controls as login
- **WHEN** the owner opens create or edit product and when a visitor opens `/login`
- **THEN** primary buttons and text fields match in shape, density, and focus treatment

#### Scenario: Stock flag is a labeled boolean control
- **WHEN** the owner sets whether an offer is in stock
- **THEN** they use a labeled on/off control, not an unlabeled custom checkbox

#### Scenario: Error copy stays Portuguese
- **WHEN** login or product save fails with a user-visible message
- **THEN** that message is in Portuguese

### Requirement: Layout works at phone width
Product screens MUST remain usable at 390 CSS pixels wide: primary actions stay tappable, text does not overflow the viewport, and signed-in navigation remains reachable.

#### Scenario: Phone-width Links
- **WHEN** a signed-in user views Links at 390 CSS pixels wide
- **THEN** they can open navigation, read product rows, and activate Novo link without horizontal page scroll

#### Scenario: Phone-width public bio
- **WHEN** a visitor views `/p/<code>` at 390 CSS pixels wide
- **THEN** title, price, and Ver oferta stay inside the viewport and Ver oferta remains tappable
