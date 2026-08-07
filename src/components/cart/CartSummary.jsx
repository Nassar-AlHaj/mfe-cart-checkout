import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Stack, Divider, Button, LinearProgress, Box } from '@mui/material';
import { formatCurrency } from '../../utils/formatCurrency';

export default function CartSummary({
  subtotal,
  shippingCost,
  total,
  freeShippingThreshold,
  itemCount,
  ctaLabel,
  onCta,
  ctaDisabled,
}) {
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <Card elevation={0}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={800} gutterBottom>
          Order Summary
        </Typography>

        {remainingForFreeShipping > 0 ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Add {formatCurrency(remainingForFreeShipping)} more for free shipping
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mt: 0.5, height: 6, borderRadius: 999 }}
            />
          </Box>
        ) : (
          <Typography variant="caption" color="success.main" fontWeight={700} sx={{ display: 'block', mb: 2 }}>
            You&apos;ve unlocked free shipping!
          </Typography>
        )}

        <Stack spacing={1.25}>
          <Row label={`Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`} value={formatCurrency(subtotal)} />
          <Row label="Shipping" value={shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)} />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Row label="Total" value={formatCurrency(total)} emphasize />

        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={onCta}
          disabled={ctaDisabled}
          sx={{ mt: 3 }}
        >
          {ctaLabel}
        </Button>
      </CardContent>
    </Card>
  );
}

function Row({ label, value, emphasize }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant={emphasize ? 'subtitle1' : 'body2'} color={emphasize ? 'text.primary' : 'text.secondary'} fontWeight={emphasize ? 800 : 400}>
        {label}
      </Typography>
      <Typography variant={emphasize ? 'subtitle1' : 'body2'} fontWeight={emphasize ? 800 : 600}>
        {value}
      </Typography>
    </Stack>
  );
}

Row.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  emphasize: PropTypes.bool,
};

Row.defaultProps = { emphasize: false };

CartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  shippingCost: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  freeShippingThreshold: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  ctaLabel: PropTypes.string.isRequired,
  onCta: PropTypes.func.isRequired,
  ctaDisabled: PropTypes.bool,
};

CartSummary.defaultProps = {
  ctaDisabled: false,
};
