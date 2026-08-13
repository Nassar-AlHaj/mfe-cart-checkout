import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}>
      <SearchOffIcon sx={{ fontSize: 72, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h3" fontWeight={800} gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        This page doesn&apos;t exist in the Cart &amp; Checkout module.
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/cart')} sx={{ mt: 3 }}>
        Go to Cart
      </Button>
    </Box>
  );
}
