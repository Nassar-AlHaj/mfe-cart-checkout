/**
 * Centralized validation patterns and React Hook Form rule builders.
 * Keeping these in one place avoids duplicated regex/messages across forms.
 */

export const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Accepts formats like +1 555-123-4567, (555) 123 4567, 5551234567
  phone: /^[+]?[\d\s()-]{7,20}$/,
  zip: /^[A-Za-z0-9][A-Za-z0-9\s-]{2,9}$/,
  cardNumber: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
  cardHolder: /^[A-Za-z\s'-]{3,60}$/,
  expiry: /^(0[1-9]|1[0-2])\/\d{2}$/,
  cvv: /^\d{3,4}$/,
};

export const required = (label) => ({
  required: `${label} is required`,
});

export const rules = {
  fullName: {
    required: 'Full name is required',
    minLength: { value: 2, message: 'Full name must be at least 2 characters' },
    maxLength: { value: 60, message: 'Full name is too long' },
  },
  email: {
    required: 'Email is required',
    pattern: { value: PATTERNS.email, message: 'Enter a valid email address' },
  },
  phone: {
    required: 'Phone number is required',
    pattern: { value: PATTERNS.phone, message: 'Enter a valid phone number' },
  },
  country: {
    required: 'Country is required',
  },
  city: {
    required: 'City is required',
    minLength: { value: 2, message: 'City must be at least 2 characters' },
  },
  street: {
    required: 'Street address is required',
    minLength: { value: 4, message: 'Enter a complete street address' },
  },
  zip: {
    required: 'ZIP / postal code is required',
    pattern: { value: PATTERNS.zip, message: 'Enter a valid ZIP / postal code' },
  },
  cardHolder: {
    required: 'Cardholder name is required',
    pattern: { value: PATTERNS.cardHolder, message: 'Enter the name as it appears on the card' },
  },
  cardNumber: {
    required: 'Card number is required',
    pattern: { value: PATTERNS.cardNumber, message: 'Enter a valid 16-digit card number' },
  },
  expiry: {
    required: 'Expiry date is required',
    pattern: { value: PATTERNS.expiry, message: 'Use MM/YY format' },
    validate: (value) => {
      if (!PATTERNS.expiry.test(value)) return true; // pattern message already covers this
      const [month, year] = value.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return 'Card has expired';
      }
      return true;
    },
  },
  cvv: {
    required: 'CVV is required',
    pattern: { value: PATTERNS.cvv, message: 'CVV must be 3 or 4 digits' },
  },
};
