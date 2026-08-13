/**
 * Generates a human-friendly, reasonably-unique order number for the
 * mock checkout flow, e.g. "ORD-2508-7F3K9".
 */
export function generateOrderNumber() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ORD-${yy}${mm}-${random}`;
}

/**
 * Returns a formatted estimated delivery date range string.
 * @param {number} minDays
 * @param {number} maxDays
 */
export function estimateDeliveryRange(minDays = 5, maxDays = 7) {
  const format = (d) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const start = new Date();
  start.setDate(start.getDate() + minDays);
  const end = new Date();
  end.setDate(end.getDate() + maxDays);
  return `${format(start)} - ${format(end)}`;
}
