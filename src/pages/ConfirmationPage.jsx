import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Divider,
  Avatar,
  Button,
  Chip,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckoutStepper from '../components/checkout/CheckoutStepper';
import { useCheckout } from '../hooks/useCheckout';
import { formatCurrency } from '../utils/formatCurrency';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { order, resetCheckout } = useCheckout();

  const handleContinueShopping = () => {
    resetCheckout();
    navigate('/cart');
  };

  if (!order) return null; // guarded by ProtectedRoute; keeps this render pure

  const { orderNumber, estimatedDelivery, items, shippingInfo, subtotal, shippingCost, total } = order;

  return (
    <Box>
      <CheckoutStepper activeStep={3} />

      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 64, color: 'success.main', mb: 1 }} />
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Thanks, {shippingInfo?.fullName?.split(' ')[0]}. A confirmation has been &ldquo;sent&rdquo; to {shippingInfo?.email}.
        </Typography>
        <Chip
          label={`Order ${orderNumber}`}
          color="primary"
          variant="outlined"
          sx={{ mt: 2, fontWeight: 700, fontSize: '0.9rem', px: 1 }}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Items ({items.length})
            </Typography>
            <Stack divider={<Divider />} spacing={2} sx={{ mt: 2 }}>
              {items.map((item) => (
                <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                  <Avatar src={item.image} alt={item.name} variant="rounded" sx={{ width: 56, height: 56 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight={600}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Qty {item.quantity} × {formatCurrency(item.price)}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={700}>
                    {formatCurrency(item.price * item.quantity)}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                <Typography variant="body2">{formatCurrency(subtotal)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Shipping</Typography>
                <Typography variant="body2">{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={800}>Total</Typography>
                <Typography variant="subtitle1" fontWeight={800}>{formatCurrency(total)}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 }, mb: 3 }}>
            <Typography variant="h6" fontWeight={800} gutterBottom>
              Shipping Address
            </Typography>
            <Typography variant="body2">{shippingInfo?.fullName}</Typography>
            <Typography variant="body2">{shippingInfo?.street}</Typography>
            <Typography variant="body2">
              {shippingInfo?.city}, {shippingInfo?.zip}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{shippingInfo?.country}</Typography>
            <Typography variant="body2" color="text.secondary">{shippingInfo?.phone}</Typography>
          </Paper>

          <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <LocalShippingOutlinedIcon color="primary" />
              <Typography variant="h6" fontWeight={800}>
                Estimated Delivery
              </Typography>
            </Stack>
            <Typography variant="body1" fontWeight={600}>
              {estimatedDelivery}
            </Typography>
          </Paper>

          <Button fullWidth size="large" variant="contained" onClick={handleContinueShopping} sx={{ mt: 3 }}>
            Continue Shopping
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
