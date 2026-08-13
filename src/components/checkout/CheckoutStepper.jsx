import PropTypes from 'prop-types';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

const CHECKOUT_STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

/**
 * @param {number} activeStep - 0-indexed current step
 */
export default function CheckoutStepper({ activeStep }) {
  return (
    <Box sx={{ mb: { xs: 3, md: 5 } }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {CHECKOUT_STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

CheckoutStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
};
