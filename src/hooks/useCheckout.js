import { useCallback, useState } from 'react';
import { useCheckoutContext } from '../context/CheckoutContext';
import { useCart } from './useCart';
import { placeOrder as placeOrderRequest } from '../services/orderService';

export function useCheckout() {
  const { shippingInfo, setShippingInfo, paymentSummary, setPaymentSummary, order, setOrder, resetCheckout } =
    useCheckoutContext();
  const cart = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [placeOrderError, setPlaceOrderError] = useState(null);

  const submitShipping = useCallback(
    (formValues) => {
      setShippingInfo(formValues);
    },
    [setShippingInfo]
  );

  const submitPayment = useCallback(
    async (formValues) => {
      setIsPlacingOrder(true);
      setPlaceOrderError(null);
      try {
        const result = await placeOrderRequest({
          items: cart.items,
          shippingInfo,
          totals: { subtotal: cart.subtotal, shipping: cart.shippingCost, total: cart.total },
        });
        setPaymentSummary({
          cardHolder: formValues.cardHolder,
          last4: formValues.cardNumber.replace(/\s/g, '').slice(-4),
        });
        setOrder({
          ...result,
          items: cart.items,
          shippingInfo,
          subtotal: cart.subtotal,
          shippingCost: cart.shippingCost,
          total: cart.total,
        });
        cart.clearCart();
        return true;
      } catch (err) {
        setPlaceOrderError(err.message || 'Something went wrong placing your order.');
        return false;
      } finally {
        setIsPlacingOrder(false);
      }
    },
    [cart, shippingInfo, setOrder, setPaymentSummary]
  );

  return {
    shippingInfo,
    paymentSummary,
    order,
    submitShipping,
    submitPayment,
    isPlacingOrder,
    placeOrderError,
    resetCheckout,
    hasShippingInfo: Boolean(shippingInfo),
    hasOrder: Boolean(order),
  };
}
