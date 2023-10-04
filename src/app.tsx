import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import queryString from 'query-string';
import { WalletProvider, useWallet, ConnectButton } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Definizione della funzione uploadDataToFirestore
function uploadDataToFirestore(userData) {
  const db = firebase.firestore();
  const usersRef = db.collection('users');

  userData.forEach(async ({ address, name }) => {
    try {
      // Utilizza il nome dell'utente come nome del documento
      const docRef = await usersRef.doc(name).set({
        address,
        name,
      });

      console.log('Document written with name: ', name);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  });
}

const centerContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

// Inizializza Firebase con la tua chiave di configurazione
const firebaseConfig = {

  apiKey: "AIzaSyB4g24SBwUUm_lFYsrxEBi39SDqwfTea9I",

  authDomain: "users-ada29.firebaseapp.com",

  projectId: "users-ada29",

  storageBucket: "users-ada29.appspot.com",

  messagingSenderId: "557729412960",

  appId: "1:557729412960:web:731e7fc972d4def6209005",
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

  useEffect(() => {
    if (wallet.connected) {
      console.log('Connected wallet name:', wallet.name);
      console.log('Account address:', wallet.account?.address);
      console.log('Account publicKey:', wallet.account?.publicKey);

      // Inserisci l'utente nel database Firestore se non esiste già
      if (wallet.account?.address) {
        console.log("carico");
        // Chiamata alla funzione per caricare i dati in Firestore
        uploadDataToFirestore([{ address: wallet.account.address, name: user }]);
      }
    }
  }, [wallet.connected, user]);

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
      console.log("ok");
      if (wallet.account?.address) {
        console.log("carico");
        // Chiamata alla funzione per caricare i dati in Firestore
        uploadDataToFirestore([{ address: wallet.account.address, name: user }]);
      }
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
