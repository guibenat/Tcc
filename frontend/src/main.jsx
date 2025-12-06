// src/main.jsx
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.jsx'; 
import './style/index.css'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "38058878818-61sidunf71010bct2974skbe1hitj0qs.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);