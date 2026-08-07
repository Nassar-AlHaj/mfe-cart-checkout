/**
 * Formats a number as a USD currency string.
 * Centralized so every price displayed in the app is consistent.
 * @param {number} value
 * @returns {string} e.g. "$1,234.50"
 */
export function formatCurrency(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(safeValue);
}
