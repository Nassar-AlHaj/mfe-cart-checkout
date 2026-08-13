import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckoutStepper from '../components/checkout/CheckoutStepper';
import PaymentForm from '../components/forms/PaymentForm';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';
import { useSnackbar } from '../context/SnackbarContext';

export default function PaymentPage() {
  const navigate = useNavigate();
  const cart = useCart();
  const { submitPayment, isPlacingOrder, placeOrderError, shippingInfo } = useCheckout();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    const success = await submitPayment(values);
    if (success) {
      showSnackbar('Payment successful — order placed!', 'success');
      navigate('/checkout/confirmation');
    } else {
      showSnackbar('We could not place your order. Please try again.', 'error');
    }
  };

  return (
    <Box>
      <CheckoutStepper activeStep={2} />

      <Typography variant="h4" fontWeight={800} gutterBottom>
        Payment
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Shipping to {shippingInfo?.fullName} · {shippingInfo?.city}, {shippingInfo?.country}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 } }}>
            <PaymentForm
              onSubmit={handleSubmit}
              isSubmitting={isPlacingOrder}
              submitError={placeOrderError}
              submitLabel="Place Order"
            />
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/checkout/shipping')}
              sx={{ mt: 2 }}
              disabled={isPlacingOrder}
            >
              Back to Shipping
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartSummary
            subtotal={cart.subtotal}
            shippingCost={cart.shippingCost}
            total={cart.total}
            freeShippingThreshold={cart.freeShippingThreshold}
            itemCount={cart.itemCount}
            ctaLabel="Place Order"
            ctaDisabled
            onCta={() => {}}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
