import PropTypes from 'prop-types';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function QuantitySelector({ quantity, min, max, onIncrease, onDecrease, disabled }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 999,
      }}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={disabled || quantity <= min}
        aria-label="decrease quantity"
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography
        variant="body2"
        sx={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}
        aria-live="polite"
      >
        {quantity}
      </Typography>
      <IconButton
        size="small"
        onClick={onIncrease}
        disabled={disabled || quantity >= max}
        aria-label="increase quantity"
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

QuantitySelector.defaultProps = {
  min: 1,
  max: 10,
  disabled: false,
};
