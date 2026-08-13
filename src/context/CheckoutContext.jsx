import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const CheckoutContext = createContext(undefined);

export function CheckoutProvider({ children }) {
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentSummary, setPaymentSummary] = useState(null); // { cardHolder, last4 } only - never store full card data
  const [order, setOrder] = useState(null);

  const value = useMemo(
    () => ({
      shippingInfo,
      setShippingInfo,
      paymentSummary,
      setPaymentSummary,
      order,
      setOrder,
      resetCheckout: () => {
        setShippingInfo(null);
        setPaymentSummary(null);
        setOrder(null);
      },
    }),
    [shippingInfo, paymentSummary, order]
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

CheckoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useCheckoutContext() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckoutContext must be used within a CheckoutProvider');
  return ctx;
}
