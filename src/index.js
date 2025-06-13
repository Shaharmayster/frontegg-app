import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FronteggProvider } from '@frontegg/react';
import { contextOptions } from './frontegg.config';

const authOptions = {
  loginBox: {
    showRememberMe: true,
    showSignUp: true,
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FronteggProvider contextOptions={contextOptions} authOptions={authOptions} hostedLoginBox={false}>
      <App />
    </FronteggProvider>
  </React.StrictMode>
);
