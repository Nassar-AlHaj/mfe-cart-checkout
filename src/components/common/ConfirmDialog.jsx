import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

/**
 * Generic confirm/cancel dialog. Used for destructive actions like removing
 * a cart item, so a shopper never loses something with a single misclick.
 */
export default function ConfirmDialog({ open, title, description, confirmLabel, cancelLabel, onConfirm, onCancel, severity }) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} color="inherit">
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm} color={severity} variant="contained">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  severity: PropTypes.oneOf(['error', 'primary', 'warning']),
};

ConfirmDialog.defaultProps = {
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  severity: 'error',
};
