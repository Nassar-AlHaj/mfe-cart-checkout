import { Box, Container, Typography, Stack } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 4, mt: 8 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Cart &amp; Checkout Microfrontend
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Independently deployable · React 19 · MUI · Module: cart-checkout
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
