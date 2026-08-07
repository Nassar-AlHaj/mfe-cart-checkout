# Cart & Checkout — Microfrontend (React + MUI)

Independent, standalone microfrontend implementing the **Cart & Checkout** role of the Microfrontend E-commerce group project.

- **Owns:** Cart, shipping/address step, payment (mocked), order confirmation
- **Framework:** React 19 + Vite
- **Design system:** Material UI (MUI) — Material Design
- **State:** React Context API (`CartContext`, `CheckoutContext`, `ThemeModeContext`, `SnackbarContext`)
- **Forms:** React Hook Form
- **Routing:** React Router v7

This module runs and deploys **completely on its own** — it does not import
code from the Catalog or Account modules. It is seeded with mock product
data so every feature can be graded/reviewed without the other two members'
apps running. Cross-module communication (for when it's embedded in the
Shell) is done through DOM `CustomEvent`s in `src/services/cartBridge.js`,
which works no matter which integration method the group picks (Web
Components, single-spa, Module Federation, or script-tag + event bus).

## Quick start

```bash
npm install
npm run dev       # http://localhost:5174
npm run build     # production build -> dist/
npm run preview   # preview the production build
npm run lint       # ESLint (0 errors)
```

## Routes

| Path                      | Page               | Guard                                    |
|---------------------------|--------------------|-------------------------------------------|
| `/cart`                   | CartPage           | —                                          |
| `/checkout/shipping`      | ShippingPage       | cart must have items                       |
| `/checkout/payment`       | PaymentPage        | shipping info must be submitted            |
| `/checkout/confirmation`  | ConfirmationPage   | an order must have been placed             |
| `*`                       | NotFoundPage       | —                                          |

Guards are implemented in `src/components/common/ProtectedRoute.jsx` and
wired up in `src/routes/AppRoutes.jsx`, so a shopper can't deep-link or hit
"back" into a step whose prerequisites no longer hold.

## Folder structure

```
src/
  components/
    cart/         CartItem, CartSummary, QuantitySelector, EmptyCart
    checkout/     CheckoutStepper
    common/       LoadingSpinner, AppSnackbar, ConfirmDialog, ProtectedRoute
    forms/        ShippingForm, PaymentForm  (React Hook Form + MUI)
    layout/       Navbar, Footer, Layout
  context/        CartContext, CheckoutContext, ThemeModeContext, SnackbarContext
  data/           mockProducts.js
  hooks/          useCart, useCheckout
  pages/          CartPage, ShippingPage, PaymentPage, ConfirmationPage, NotFoundPage
  routes/         AppRoutes.jsx
  services/       productService, orderService, cartBridge
  theme/          theme.js (shared MUI light/dark theme tokens)
  utils/          formatCurrency, validators, generateOrderNumber
  App.jsx, main.jsx, index.css
```

## Features implemented

**Cart** — item list (image/name/price/qty), increase/decrease/remove,
empty-cart state, subtotal/shipping/total calculation with a free-shipping
progress bar, "Continue to Checkout".

**Shipping** — React Hook Form validated fields: full name, email, phone,
country, city, street address, ZIP.

**Payment (mock)** — card holder, formatted card number, MM/YY expiry with
expiry-date validation, CVV; validation only, no real gateway; only the
cardholder name + last 4 digits are retained afterward.

**Confirmation** — success state, generated order number, purchased-items
summary, shipping address, estimated delivery window, "Continue Shopping"
(clears checkout state and re-navigates to `/cart`).

**Cross-cutting** — loading states, 404 page, route protection, dark mode
(persisted to `localStorage`), responsive layout (mobile/tablet/desktop),
toast notifications, destructive-action confirm dialog.

## Integration notes (for the shell)

- **Method:** not yet agreed as a group; this module exposes itself as a
  normal React app (`src/main.jsx`) so it can be wrapped as a Web Component,
  registered with single-spa, or exposed via Module Federation with minimal
  changes.
- **Exposed events:** listens for `mfe:cart:add` (detail:
  `{ id, name, image, price, quantity }`) to accept items pushed from the
  Catalog module; emits `mfe:cart:updated` (detail: `{ itemCount, subtotal }`)
  so the Shell header / Account module can reflect cart state.
- **One thing harder than expected:** guarding checkout steps against
  direct URL access/back-button while still allowing a page refresh to
  resume mid-flow required separating "is there a cart" from "is there
  shipping info" from "is there an order" as three independent, persisted
  pieces of state rather than a single `currentStep` flag.

## Tech requirements checklist

- [x] React 19+
- [x] Vite
- [x] React Router
- [x] Material UI
- [x] Context API
- [x] React Hook Form
- [x] ESLint (flat config, 0 errors/warnings)
- [x] Production build verified (`npm run build`)
