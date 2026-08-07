/**
 * Integration bridge for the Shell application.
 *
 * This module is deployed and developed standalone, but it must eventually
 * live inside a shell that also mounts the Catalog and Account modules.
 * Rather than importing anything from those modules (which would break
 * independent deployability), we communicate through DOM CustomEvents.
 * This works regardless of which integration method the group ultimately
 * picks (Web Components, single-spa, Module Federation, or script-tag +
 * event bus) because it never assumes a specific host framework.
 *
 * Events consumed (fired by Catalog module or the Shell):
 *   'mfe:cart:add'    detail: { id, name, image, price, quantity }
 *
 * Events emitted (for the Shell / Account module to react to):
 *   'mfe:cart:updated' detail: { itemCount, subtotal }
 */

const EVENT_ADD_ITEM = 'mfe:cart:add';
const EVENT_CART_UPDATED = 'mfe:cart:updated';

/**
 * Subscribes to "add to cart" requests coming from outside this microfrontend.
 * @param {(item: object) => void} handler
 * @returns {() => void} unsubscribe function
 */
export function subscribeToExternalAddItem(handler) {
  const listener = (event) => handler(event.detail);
  window.addEventListener(EVENT_ADD_ITEM, listener);
  return () => window.removeEventListener(EVENT_ADD_ITEM, listener);
}

/**
 * Broadcasts the current cart state so a Shell header / mini-cart badge
 * (or the Account module) can stay in sync without direct coupling.
 * @param {{ itemCount: number, subtotal: number }} state
 */
export function broadcastCartUpdated(state) {
  window.dispatchEvent(new CustomEvent(EVENT_CART_UPDATED, { detail: state }));
}
