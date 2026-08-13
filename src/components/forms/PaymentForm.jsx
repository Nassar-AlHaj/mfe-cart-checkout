import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Grid, TextField, Button, Box, Alert, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { rules } from '../../utils/validators';

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/**
 * Mock payment form - "Validation only" per the assignment brief. No card
 * data is sent anywhere; useCheckout only keeps the cardholder name and
 * last 4 digits for the confirmation summary, then discards the rest.
 */
export default function PaymentForm({ onSubmit, submitLabel, isSubmitting, submitError }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { cardHolder: '', cardNumber: '', expiry: '', cvv: '' },
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Alert severity="info" icon={<LockOutlinedIcon fontSize="small" />} sx={{ mb: 3 }}>
        This is a mock payment step for demo purposes. No real card is charged and no card data leaves your browser.
      </Alert>

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            {...register('cardHolder', rules.cardHolder)}
            label="Card Holder"
            fullWidth
            required
            error={!!errors.cardHolder}
            helperText={errors.cardHolder?.message}
            placeholder="Name as shown on card"
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="cardNumber"
            control={control}
            rules={rules.cardNumber}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                label="Card Number"
                fullWidth
                required
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="expiry"
            control={control}
            rules={rules.expiry}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => field.onChange(formatExpiry(e.target.value))}
                label="Expiry (MM/YY)"
                fullWidth
                required
                inputMode="numeric"
                placeholder="MM/YY"
                error={!!errors.expiry}
                helperText={errors.expiry?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            {...register('cvv', rules.cvv)}
            label="CVV"
            type="password"
            fullWidth
            required
            inputMode="numeric"
            placeholder="123"
            error={!!errors.cvv}
            helperText={errors.cvv?.message}
          />
        </Grid>
      </Grid>

      {submitError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {submitError}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 4 }}
      >
        {isSubmitting ? 'Placing Order...' : submitLabel}
      </Button>
    </Box>
  );
}

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  isSubmitting: PropTypes.bool,
  submitError: PropTypes.string,
};

PaymentForm.defaultProps = {
  submitLabel: 'Place Order',
  isSubmitting: false,
  submitError: null,
};
