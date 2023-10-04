
import {WalletProvider} from '@suiet/wallet-kit';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.tsx'; // Assicurati che il percorso sia corretto
import '@suiet/wallet-kit/style.css';
import './styles.css'; 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
