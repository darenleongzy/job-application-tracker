import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ThemedApp from './ThemedApp';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Read the clientID from .env file
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <ThemedApp />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
reportWebVitals();
