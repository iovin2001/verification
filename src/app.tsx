import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import queryString from 'query-string';
import { WalletProvider, useWallet, ConnectButton } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Inizializza Firebase con la tua chiave di configurazione
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
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
  const [dataUploaded, setDataUploaded] = useState(false);

  useEffect(() => {
    if (wallet.connected && !dataUploaded) {
      console.log('Connected wallet name:', wallet.name);
      console.log('Account address:', wallet.account?.address);
      console.log('Firestore data upload started.');

      const uploadDataToFirestore = async (userData) => {
        const db = firebase.firestore();
        const usersRef = db.collection('users');

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

        setDataUploaded(true);
        console.log('Firestore data upload completed.');
      };

      uploadDataToFirestore([{ address: wallet.account?.address, name: user }]);
    }
  }, [wallet, dataUploaded, user]);

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
