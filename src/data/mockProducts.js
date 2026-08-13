/**
 * Mock catalog data.
 *
 * The Cart & Checkout module owns nothing about how products are browsed or
 * searched - that lives in the Catalog & Discovery microfrontend. In the
 * integrated shell, a shopper arrives here because the Catalog module has
 * already pushed items into the shared cart (via a custom event / postMessage
 * bus - see src/services/cartBridge.js).
 *
 * For standalone development and grading, we seed the cart with this mock
 * data so every feature (quantity control, totals, checkout, confirmation)
 * can be exercised without any other team's module running.
 */

export const MOCK_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Everyday Canvas Tote Bag',
    image:
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop',
    price: 24.99,
    quantity: 2,
  },
  {
    id: 'prod-002',
    name: 'Wireless Noise-Cancelling Headphones',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: 129.0,
    quantity: 1,
  },
  {
    id: 'prod-003',
    name: 'Ceramic Pour-Over Coffee Set',
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    price: 42.5,
    quantity: 1,
  },
  {
    id: 'prod-004',
    name: 'Recycled Wool Throw Blanket',
    image:
      'https://images.unsplash.com/photo-1600369672433-d40695966e19?w=400&h=400&fit=crop',
    price: 58.0,
    quantity: 3,
  },
];

export const SHIPPING_METHODS = {
  STANDARD: { id: 'standard', label: 'Standard (5-7 business days)', cost: 4.99 },
  EXPRESS: { id: 'express', label: 'Express (2-3 business days)', cost: 14.99 },
};

export const FREE_SHIPPING_THRESHOLD = 100;

export const TAX_RATE = 0.0; // Kept explicit and centralized in case a tax line is added later.
