import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Container, Tooltip } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useThemeMode } from '../../context/ThemeModeContext';

export default function Navbar() {
  const { itemCount } = useCart();
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography
            component={RouterLink}
            to="/cart"
            variant="h6"
            sx={{ flexGrow: 1, color: 'text.primary', textDecoration: 'none', fontWeight: 800 }}
          >
            Cart &amp; Checkout
            <Typography component="span" variant="caption" sx={{ ml: 1, color: 'primary.main', fontWeight: 700 }}>
              MFE
            </Typography>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              <IconButton onClick={toggleMode} color="inherit" aria-label="toggle color mode">
                {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
              </IconButton>
            </Tooltip>
            <IconButton component={RouterLink} to="/cart" color="inherit" aria-label="view cart">
              <Badge badgeContent={itemCount} color="secondary" max={99}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
