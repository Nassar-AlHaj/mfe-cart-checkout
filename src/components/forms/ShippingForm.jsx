import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Button, Box } from '@mui/material';
import { rules } from '../../utils/validators';

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Palestine',
  'Jordan',
  'United Arab Emirates',
  'Australia',
  'India',
];

/**
 * Shipping details form. All validation is declared through the shared
 * `rules` map (utils/validators.js) so the same constraints could be reused
 * by a profile/address-book form in the Account module later.
 */
export default function ShippingForm({ defaultValues, onSubmit, submitLabel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues || {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      street: '',
      zip: '',
    },
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('fullName', rules.fullName)}
            label="Full Name"
            fullWidth
            required
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('email', rules.email)}
            label="Email"
            type="email"
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('phone', rules.phone)}
            label="Phone"
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone?.message}
            placeholder="+1 555-123-4567"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('country', rules.country)}
            select
            SelectProps={{ native: true }}
            label="Country"
            fullWidth
            required
            error={!!errors.country}
            helperText={errors.country?.message}
            defaultValue=""
          >
            <option value="" disabled></option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('city', rules.city)}
            label="City"
            fullWidth
            required
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('zip', rules.zip)}
            label="ZIP / Postal Code"
            fullWidth
            required
            error={!!errors.zip}
            helperText={errors.zip?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('street', rules.street)}
            label="Street Address"
            fullWidth
            required
            multiline
            minRows={2}
            error={!!errors.street}
            helperText={errors.street?.message}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting} sx={{ mt: 4 }}>
        {submitLabel}
      </Button>
    </Box>
  );
}

ShippingForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

ShippingForm.defaultProps = {
  defaultValues: null,
  submitLabel: 'Continue to Payment',
};
