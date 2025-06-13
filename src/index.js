import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-2s55dwpeeoii.frontegg.com',
  clientId: 'd792a79c-a4a6-4368-a829-7610367e8a2d',
  appId: 'f1989c90-10f2-4189-9b74-1019f259a966',
};

const authOptions = {
  keepSessionAlive: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FronteggProvider
    contextOptions={contextOptions}
    hostedLoginBox={true}
    authOptions={authOptions}
  >
    <App />
  </FronteggProvider>
);





