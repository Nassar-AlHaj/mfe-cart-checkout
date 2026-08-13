import React from 'react';
import { createRoot } from 'react-dom/client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import App from './App';

class CartCheckoutElement extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.mountPoint = document.createElement('div');

    this.shadow.appendChild(this.mountPoint);

    this.cache = createCache({
      key: 'cart-checkout',
      container: this.shadow,
    });
  }

  connectedCallback() {
    if (this.root) return;

    this.root = createRoot(this.mountPoint);

    this.root.render(
      <CacheProvider value={this.cache}>
        <App embedded />
      </CacheProvider>
    );
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

if (!customElements.get('cart-checkout-app')) {
  customElements.define('cart-checkout-app', CartCheckoutElement);
}