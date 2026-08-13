import { useCartContext } from '../context/CartContext';

/**
 * Public hook for interacting with the cart. Wrapping useCartContext keeps
 * a single import path for components/pages and gives us a seam to add
 * cross-cutting logic (analytics, logging) later without touching every
 * call site.
 */
export function useCart() {
  return useCartContext();
}
