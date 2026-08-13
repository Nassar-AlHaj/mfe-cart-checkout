# mfe-cart-checkout

Cart & Checkout microfrontend for the Microfrontend E-Commerce Project.

**Role:** Cart & Checkout
**Framework:** React + Vite
**Design system:** MUI (Material UI)
**Live URL (standalone app):** https://mfe-cart-checkout.vercel.app/cart
**Live URL (Web Component entry):** https://mfe-cart-checkout.vercel.app/assets/cart-element.js

---

## What it does

This microfrontend implements the full cart and checkout flow for the e-commerce application:

- **Cart** — view items, adjust quantities, remove items
- **Shipping / address step**
- **Payment** (mocked)
- **Order confirmation**

It can run in two modes from the same codebase:

1. **Standalone application** — a normal React app, available at `/cart`, useful for local development and independent testing.
2. **Web Component** — the same UI compiled into a custom element (`<cart-checkout-app>`) that other applications (such as the Shell) can embed directly.

---

## Integration — exposed custom element

The microfrontend registers itself as a custom element:

```html
<cart-checkout-app></cart-checkout-app>
```

### How to load it

Consuming applications should load the Web Component entry script at runtime and then render the tag:

```html
<script type="module" src="https://mfe-cart-checkout.vercel.app/assets/cart-element.js"></script>

<cart-checkout-app></cart-checkout-app>
```

The script registers the element via `customElements.define('cart-checkout-app', ...)`, guarded so it only registers once even if the script is loaded multiple times.

### Style isolation

The component renders inside a **Shadow DOM** (`attachShadow({ mode: 'open' })`), with an **Emotion cache** scoped to the shadow root. This means:

- MUI styles used by the Cart component do not leak into the host application.
- The host application's global CSS does not affect the Cart component's internal styling.

Consuming apps do not need to add any CSS resets or overrides for this component to render correctly.

### Exposed events

> ⚠️ To be confirmed / update this section with the exact event names and payloads actually dispatched by the component (e.g. via `CustomEvent`) before final submission.

Example (update once verified):

| Event name | When it fires | `event.detail` payload |
|---|---|---|
| `checkout-success` | Order successfully placed | e.g. `{ orderId, total }` |
| `checkout-error` | Payment/order step fails | e.g. `{ message }` |

Consumers can listen like this:

```js
const cartEl = document.querySelector('cart-checkout-app');
cartEl.addEventListener('checkout-success', (e) => {
  console.log(e.detail);
});
```

---

## Local development

```bash
npm install
npm run dev
```

Runs the standalone app at `http://localhost:5174/cart`.

## Build

```bash
npm run build
```

Produces two relevant outputs in `dist/`:

- The standalone app bundle (`index.html` + hashed assets)
- The Web Component entry at a **stable, non-hashed filename**:
  ```
  dist/assets/cart-element.js
  ```

The stable filename is intentional — it lets consuming applications (like the Shell) reference one fixed URL without needing to update it after every Cart deployment. This is configured via a custom `entryFileNames` function in `vite.config.js`.

## Lint

```bash
npm run lint
```

---

## Deployment

Deployed independently on Vercel from the `feature/cart-checkout-module` branch.

- Standalone app: https://mfe-cart-checkout.vercel.app/cart
- Web Component script: https://mfe-cart-checkout.vercel.app/assets/cart-element.js

---

## Notes for integrators (e.g. the Shell)

- Do **not** iframe or navigate to `/cart` directly if using the Web Component integration method — that route serves the full standalone page, not the embeddable component.
- Load the JS entry above, wait for it to load, then render `<cart-checkout-app>`.
- Recommended pattern: check `customElements.get('cart-checkout-app')` before injecting the script again, to avoid duplicate loads (especially relevant in React StrictMode, where effects run twice in development).
