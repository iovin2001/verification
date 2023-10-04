import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import queryString from 'query-string';
import { WalletProvider, useWallet, ConnectButton } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Inizializza Firebase con la tua chiave di configurazione
const firebaseConfig = {
  apiKey: "AIzaSyB4g24SBwUUm_lFYsrxEBi39SDqwfTea9I",
  authDomain: "users-ada29.firebaseapp.com",
  projectId: "users-ada29",
  storageBucket: "users-ada29.appspot.com",
  messagingSenderId: "557729412960",
  appId: "1:557729412960:web:731e7fc972d4def6209005",
};

const centerContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};


firebase.initializeApp(firebaseConfig);

function hexToText(hex: string): string {
  let text = '';
  for (let i = 0; i < hex.length; i += 2) {
    text += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return text;
}

function App() {
  const userParam = queryString.parse(window.location.search).user;
  const user = typeof userParam === 'string' ? hexToText(userParam) : '';
  const wallet = useWallet();
  console.log("ok");
  useEffect(() => {
    if (wallet.connected) {
      console.log('Connected wallet name:', wallet.name);
      console.log("prima");
      uploadDataToFirestore([{ address: wallet.account?.address, name: user }]);
      console.log("dopo");
    }
  }, [wallet.connected, user]);



  const uploadDataToFirestore = async (userData) => {
    console.log("dentro");
    const db = firebase.firestore();
    const usersRef = db.collection('users');
    console.log("userData:", userData);

    userData.forEach(async ({ address, name }) => {
      try {
        const docRef = await usersRef.add({
          address,
          name,
        });

        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    });
  };

  return (
    <div style={centerContentStyle}>
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WalletComponent user={user} />} />
          </Routes>
        </Router>
      </WalletProvider>
    </div>
  );
}

function WalletComponent({ user }: { user: string }) {
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.connected) {
      console.log('Connected wallet name:', wallet.name);
      console.log('Account address:', wallet.account?.address);
      console.log('Account publicKey:', wallet.account?.publicKey);
      console.log('Firestore data upload started.');
      console.log('Firestore data upload completed.');
    }
  }, [wallet.connected, user]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome {user}</h1>
      <ConnectButton style={{ textAlign: 'center' }} className="myButton">
        Connect
      </ConnectButton>
    </div>
  );
}

export default App;
