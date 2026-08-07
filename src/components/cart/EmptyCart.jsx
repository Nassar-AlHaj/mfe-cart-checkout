import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

/**
 * In the integrated shell this would link back to the Catalog module's
 * home route. Standalone, it re-seeds the mock cart so graders/reviewers
 * can immediately see the populated-cart experience again.
 */
export default function EmptyCart({ onContinueShopping }) {
  return (
    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 10 }, px: 2 }}>
      <ShoppingCartOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h5" fontWeight={800} gutterBottom>
        Your cart is empty
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, mx: 'auto', mb: 3 }}>
        Looks like you haven&apos;t added anything yet. Items you add from the catalog will show up here.
      </Typography>
      <Button variant="contained" size="large" onClick={onContinueShopping}>
        Browse sample items
      </Button>
    </Box>
  );
}

EmptyCart.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};
