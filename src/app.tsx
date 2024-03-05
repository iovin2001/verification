import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import queryString from 'query-string';
import { WalletProvider, useWallet, ConnectButton } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Import or define your uploadDataToFirestore function here
// Import or define your hexToText function here


function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px', paddingRight: '10px' }}>
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default App;
