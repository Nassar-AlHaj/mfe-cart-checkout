import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { fetchInitialCart } from '../services/productService';
import { subscribeToExternalAddItem, broadcastCartUpdated } from '../services/cartBridge';
import { SHIPPING_METHODS, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '../data/mockProducts';

const STORAGE_KEY = 'mfe-cart-checkout:cart';

const CartContext = createContext(undefined);

const ACTIONS = {
  LOAD_START: 'LOAD_START',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_ERROR: 'LOAD_ERROR',
  ADD_ITEM: 'ADD_ITEM',
  INCREASE_QTY: 'INCREASE_QTY',
  DECREASE_QTY: 'DECREASE_QTY',
  SET_QTY: 'SET_QTY',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_SHIPPING_METHOD: 'SET_SHIPPING_METHOD',
  CLEAR_CART: 'CLEAR_CART',
};

const MAX_QTY_PER_ITEM = 10;

const initialState = {
  items: [],
  status: 'idle', // idle | loading | success | error
  error: null,
  shippingMethodId: SHIPPING_METHODS.STANDARD.id,
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_START:
      return { ...state, status: 'loading', error: null };
    case ACTIONS.LOAD_SUCCESS:
      return { ...state, status: 'success', items: action.payload };
    case ACTIONS.LOAD_ERROR:
      return { ...state, status: 'error', error: action.payload };
    case ACTIONS.ADD_ITEM: {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.min(item.quantity + (action.payload.quantity || 1), MAX_QTY_PER_ITEM) }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }] };
    }
    case ACTIONS.INCREASE_QTY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QTY_PER_ITEM) }
            : item
        ),
      };
    case ACTIONS.DECREASE_QTY:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };
    case ACTIONS.SET_QTY:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.min(Math.max(action.payload.quantity, 0), MAX_QTY_PER_ITEM) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case ACTIONS.REMOVE_ITEM:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case ACTIONS.SET_SHIPPING_METHOD:
      return { ...state, shippingMethodId: action.payload };
    case ACTIONS.CLEAR_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initial load: prefer anything already persisted (e.g. shopper refreshed
  // the page mid-checkout); otherwise fall back to the mock "seeded from
  // Catalog module" cart so this MFE works fully standalone.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      dispatch({ type: ACTIONS.LOAD_START });
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (!cancelled) dispatch({ type: ACTIONS.LOAD_SUCCESS, payload: parsed });
          return;
        }
        const data = await fetchInitialCart();
        if (!cancelled) dispatch({ type: ACTIONS.LOAD_SUCCESS, payload: data });
      } catch (err) {
        if (!cancelled) dispatch({ type: ACTIONS.LOAD_ERROR, payload: err.message });
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist on every change (once past initial load) so a refresh mid-flow
  // doesn't lose the cart.
  useEffect(() => {
    if (state.status === 'success') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.status]);

  // Listen for "add to cart" events dispatched by sibling microfrontends
  // (Catalog module) once this app is embedded in the Shell.
  useEffect(() => {
    return subscribeToExternalAddItem((item) => {
      dispatch({ type: ACTIONS.ADD_ITEM, payload: item });
    });
  }, []);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    broadcastCartUpdated({ itemCount, subtotal });
  }, [itemCount, subtotal]);

  const shippingMethod =
    Object.values(SHIPPING_METHODS).find((m) => m.id === state.shippingMethodId) ||
    SHIPPING_METHODS.STANDARD;
  const shippingCost = state.items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shippingMethod.cost;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingCost + tax;

  const value = useMemo(
    () => ({
      items: state.items,
      status: state.status,
      error: state.error,
      itemCount,
      subtotal,
      shippingCost,
      shippingMethod,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      tax,
      total,
      shippingMethods: SHIPPING_METHODS,
      addItem: (item) => dispatch({ type: ACTIONS.ADD_ITEM, payload: item }),
      increaseQty: (id) => dispatch({ type: ACTIONS.INCREASE_QTY, payload: id }),
      decreaseQty: (id) => dispatch({ type: ACTIONS.DECREASE_QTY, payload: id }),
      setQty: (id, quantity) => dispatch({ type: ACTIONS.SET_QTY, payload: { id, quantity } }),
      removeItem: (id) => dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id }),
      setShippingMethod: (id) => dispatch({ type: ACTIONS.SET_SHIPPING_METHOD, payload: id }),
      clearCart: () => dispatch({ type: ACTIONS.CLEAR_CART }),
      maxQtyPerItem: MAX_QTY_PER_ITEM,
    }),
    [state, itemCount, subtotal, shippingCost, shippingMethod, tax, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within a CartProvider');
  return ctx;
}
