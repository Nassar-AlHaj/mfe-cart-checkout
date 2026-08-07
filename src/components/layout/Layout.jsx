import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 3, md: 5 } }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
