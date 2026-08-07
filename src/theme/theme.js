import { createTheme } from '@mui/material/styles';

/**
 * Shared design tokens.
 *
 * Per the project brief, every member's module must follow Material Design
 * via each framework's Material library (MUI here) so the three pieces look
 * like one app once integrated - same palette, type scale, spacing, and
 * component shapes. These tokens should be treated as the group's shared
 * contract: if the Catalog/Account members also copy this file, the shell
 * will feel seamless.
 */

const palette = {
  primary: { main: '#00695C', light: '#4A9F94', dark: '#003D33', contrastText: '#FFFFFF' }, // deep teal
  secondary: { main: '#E8A33D', light: '#F3C077', dark: '#B67617', contrastText: '#1A1A1A' }, // warm amber accent
  success: { main: '#2E7D32' },
  error: { main: '#C62828' },
  warning: { main: '#ED6C02' },
  info: { main: '#0288D1' },
};

const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontFamily: '"Manrope", sans-serif', fontWeight: 800, letterSpacing: '-0.02em' },
  h2: { fontFamily: '"Manrope", sans-serif', fontWeight: 800, letterSpacing: '-0.02em' },
  h3: { fontFamily: '"Manrope", sans-serif', fontWeight: 700, letterSpacing: '-0.01em' },
  h4: { fontFamily: '"Manrope", sans-serif', fontWeight: 700 },
  h5: { fontFamily: '"Manrope", sans-serif', fontWeight: 700 },
  h6: { fontFamily: '"Manrope", sans-serif', fontWeight: 600 },
  button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
};

const shape = { borderRadius: 12 };

function buildTheme(mode) {
  const isLight = mode === 'light';
  return createTheme({
    palette: {
      mode,
      ...palette,
      background: isLight
        ? { default: '#F6F7F5', paper: '#FFFFFF' }
        : { default: '#0F1613', paper: '#161F1B' },
    },
    typography,
    shape,
    spacing: 8,
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 10, paddingTop: 10, paddingBottom: 10 },
          sizeLarge: { paddingTop: 12, paddingBottom: 12, fontSize: '1rem' },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: isLight ? '1px solid #E4E7E4' : '1px solid #26332D',
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 600 } },
      },
    },
  });
}

export const lightTheme = buildTheme('light');
export const darkTheme = buildTheme('dark');
