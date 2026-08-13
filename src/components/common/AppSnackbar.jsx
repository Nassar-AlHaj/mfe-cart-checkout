import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';

/**
 * Purely presentational toast. State (open/message/severity) is owned by
 * SnackbarContext so any component can trigger a notification via
 * useSnackbar() without prop-drilling.
 */
export default function AppSnackbar({ open, message, severity, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

AppSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  onClose: PropTypes.func.isRequired,
};
