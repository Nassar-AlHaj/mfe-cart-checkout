import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import CartPage from '../pages/CartPage';
import ShippingPage from '../pages/ShippingPage';
import PaymentPage from '../pages/PaymentPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import NotFoundPage from '../pages/NotFoundPage';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';

/**
 * Navigation protection strategy:
 *  - /checkout/shipping requires a non-empty cart
 *  - /checkout/payment requires shipping info to already be captured
 *  - /checkout/confirmation requires an order to have actually been placed
 * This stops a shopper from deep-linking or hitting "back" into a step
 * whose prerequisites no longer hold (e.g. an emptied cart).
 */
export default function AppRoutes() {
  const { itemCount, status } = useCart();
  const { hasShippingInfo, hasOrder } = useCheckout();

  const cartHasItems = status !== 'success' ? true : itemCount > 0; // avoid false redirect while loading

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/cart" replace />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/checkout/shipping"
          element={
            <ProtectedRoute when={cartHasItems} redirectTo="/cart">
              <ShippingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout/payment"
          element={
            <ProtectedRoute when={cartHasItems && hasShippingInfo} redirectTo="/checkout/shipping">
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout/confirmation"
          element={
            <ProtectedRoute when={hasOrder} redirectTo="/cart">
              <ConfirmationPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
