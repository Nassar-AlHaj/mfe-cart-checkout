import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Alert } from '@mui/material';
import { useCart } from '../hooks/useCart';
import { useSnackbar } from '../context/SnackbarContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ConfirmDialog from '../components/common/ConfirmDialog';
import CheckoutStepper from '../components/checkout/CheckoutStepper';
import { fetchInitialCart } from '../services/productService';

export default function CartPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [pendingRemoval, setPendingRemoval] = useState(null);

  const handleConfirmRemove = () => {
    if (pendingRemoval) {
      cart.removeItem(pendingRemoval.id);
      showSnackbar(`${pendingRemoval.name} removed from cart`, 'info');
    }
    setPendingRemoval(null);
  };

  const handleReseedCart = async () => {
    const data = await fetchInitialCart();
    data.forEach((item) => cart.addItem(item));
    showSnackbar('Sample items added to your cart', 'success');
  };

  if (cart.status === 'loading' || cart.status === 'idle') {
    return <LoadingSpinner label="Loading your cart..." fullHeight />;
  }

  if (cart.status === 'error') {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        We couldn&apos;t load your cart right now: {cart.error}. Please refresh the page.
      </Alert>
    );
  }

  return (
    <Box>
      <CheckoutStepper activeStep={0} />

      <Typography variant="h4" fontWeight={800} gutterBottom>
        Your Cart
      </Typography>

      {cart.items.length === 0 ? (
        <EmptyCart onContinueShopping={handleReseedCart} />
      ) : (
        <Grid container spacing={4} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={8}>
            <Box>
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  maxQty={cart.maxQtyPerItem}
                  onIncrease={cart.increaseQty}
                  onDecrease={cart.decreaseQty}
                  onRemove={setPendingRemoval}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <CartSummary
              subtotal={cart.subtotal}
              shippingCost={cart.shippingCost}
              total={cart.total}
              freeShippingThreshold={cart.freeShippingThreshold}
              itemCount={cart.itemCount}
              ctaLabel="Continue to Checkout"
              onCta={() => navigate('/checkout/shipping')}
            />
          </Grid>
        </Grid>
      )}

      <ConfirmDialog
        open={!!pendingRemoval}
        title="Remove item?"
        description={pendingRemoval ? `Remove "${pendingRemoval.name}" from your cart? This can't be undone.` : ''}
        confirmLabel="Remove"
        onConfirm={handleConfirmRemove}
        onCancel={() => setPendingRemoval(null)}
        severity="error"
      />
    </Box>
  );
}
