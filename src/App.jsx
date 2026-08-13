import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ThemeModeProvider } from './context/ThemeModeContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';
import AppRoutes from './routes/AppRoutes';

export default function App({ embedded = false }) {
  return (
    <ThemeModeProvider>
      <SnackbarProvider>
        <CartProvider>
          <CheckoutProvider>
            {embedded ? (
              <MemoryRouter initialEntries={['/cart']}>
                <AppRoutes />
              </MemoryRouter>
            ) : (
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            )}
          </CheckoutProvider>
        </CartProvider>
      </SnackbarProvider>
    </ThemeModeProvider>
  );
}