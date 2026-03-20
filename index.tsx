
/**
 * DEEPFENSE.AI - Deepfake Prevention Platform
 * 
 * @copyright 2025 Ho Xuan Nguyen
 * @license Individual Academic Use
 * @author Ho Xuan Nguyen (25NS039)
 * 
 * This source code is the sole intellectual property of the author.
 * Unauthorized reproduction is strictly prohibited.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
