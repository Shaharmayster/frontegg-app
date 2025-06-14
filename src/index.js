import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FronteggProvider } from '@frontegg/react';
import { contextOptions } from './frontegg.config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
      <App />
    </FronteggProvider>
  </React.StrictMode>
);
