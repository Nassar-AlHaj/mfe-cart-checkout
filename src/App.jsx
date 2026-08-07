import { BrowserRouter } from 'react-router-dom';
import { ThemeModeProvider } from './context/ThemeModeContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';
import AppRoutes from './routes/AppRoutes';

/**
 * Provider order matters: Theme first (so everything below can use MUI),
 * then Snackbar (so Cart/Checkout actions can surface toasts), then the
 * domain contexts. Kept as a standalone <BrowserRouter> so this module
 * runs fully independently; when embedded in the Shell via Web
 * Components/single-spa, the shell can choose to mount this at a base path
 * or let the router basename be configured via an env var if needed.
 */
export default function App() {
  return (
    <ThemeModeProvider>
      <SnackbarProvider>
        <CartProvider>
          <CheckoutProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </CheckoutProvider>
        </CartProvider>
      </SnackbarProvider>
    </ThemeModeProvider>
  );
}
