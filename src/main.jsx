import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Standalone React application
if (document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Register the Web Component
import './cart-checkout-element';