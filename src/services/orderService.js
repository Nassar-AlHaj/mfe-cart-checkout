import { generateOrderNumber, estimateDeliveryRange } from '../utils/generateOrderNumber';

const SIMULATED_LATENCY_MS = 900;

/**
 * Simulates submitting an order to a payment/order-processing backend.
 * No real payment gateway is involved - this only validates shape and
 * resolves a mock confirmation, matching the assignment's "Validation only"
 * requirement for the payment step.
 *
 * @param {{ items: Array, shippingInfo: object, totals: object }} payload
 * @returns {Promise<{ orderNumber: string, estimatedDelivery: string, placedAt: string }>}
 */
export function placeOrder(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!payload || !payload.items || payload.items.length === 0) {
        reject(new Error('Cannot place an order with an empty cart.'));
        return;
      }
      resolve({
        orderNumber: generateOrderNumber(),
        estimatedDelivery: estimateDeliveryRange(5, 7),
        placedAt: new Date().toISOString(),
      });
    }, SIMULATED_LATENCY_MS);
  });
}
