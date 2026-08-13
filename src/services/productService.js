import { MOCK_PRODUCTS } from '../data/mockProducts';

const SIMULATED_LATENCY_MS = 500;

/**
 * Simulates fetching the shopper's current cart contents from a backend.
 * In production this would call the real cart/session API; here it just
 * resolves the mock data after a short delay so the UI's loading state
 * is exercised honestly.
 * @returns {Promise<Array>}
 */
export function fetchInitialCart() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(structuredClone(MOCK_PRODUCTS));
    }, SIMULATED_LATENCY_MS);
  });
}
