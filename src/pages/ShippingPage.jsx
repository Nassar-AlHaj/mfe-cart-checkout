import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid } from '@mui/material';
import CheckoutStepper from '../components/checkout/CheckoutStepper';
import ShippingForm from '../components/forms/ShippingForm';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';

export default function ShippingPage() {
  const navigate = useNavigate();
  const cart = useCart();
  const { shippingInfo, submitShipping } = useCheckout();

  const handleSubmit = (values) => {
    submitShipping(values);
    navigate('/checkout/payment');
  };

  return (
    <Box>
      <CheckoutStepper activeStep={1} />

      <Typography variant="h4" fontWeight={800} gutterBottom>
        Shipping Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Tell us where to send your order.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: { xs: 2.5, md: 4 } }}>
            <ShippingForm defaultValues={shippingInfo} onSubmit={handleSubmit} submitLabel="Continue to Payment" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartSummary
            subtotal={cart.subtotal}
            shippingCost={cart.shippingCost}
            total={cart.total}
            freeShippingThreshold={cart.freeShippingThreshold}
            itemCount={cart.itemCount}
            ctaLabel="Back to Cart"
            onCta={() => navigate('/cart')}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
