import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import queryString from 'query-string';
import { WalletProvider, useWallet, ConnectButton } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Definizione della funzione uploadDataToFirestore
async function uploadDataToFirestore(id, address, name) {
  if (!id || !address || !name) {
    console.error('Invalid data');
    return;
  }

  const db = firebase.firestore();
  const usersRef = db.collection('users');

  try {
    const docRef = usersRef.doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      // Se il documento non esiste (primo inserimento), aggiungi le variabili
      const newUser = {
        address,
        id,
        name,
        address1: 'none',
        address2: 'none',
        address3: 'none',
        address4: 'none',
        nBASC: 'Valore predefinito per nBASC',
        nMASC: 'Valore predefinito per nMASC',
        stake: 'false',
        nPOINT: 'none',
      };

      await docRef.set(newUser);

      console.log('Document written with ID:', id);
    } else {
      // Se il documento esiste, controlla se l'indirizzo è già presente in uno qualsiasi degli indirizzi
      const existingData = docSnapshot.data();
      const availableAddresses = ['address', 'address1', 'address2', 'address3', 'address4'];
      console.log("okokok");
      if (!Object.values(existingData).includes(address)) {
        // Se l'indirizzo non è presente in nessuno degli indirizzi, cerca la prima variabile "none" disponibile e aggiungi l'indirizzo
        for (let i = 1; i <= availableAddresses.length; i++) {
          if (existingData[availableAddresses[i - 1]] === 'none') {
            const updateData = {
              [availableAddresses[i - 1]]: address, // Aggiungi l'indirizzo
            };

            await docRef.update(updateData);
            console.log(`Address added to ${availableAddresses[i - 1]}`);
            break;
          }
        }
      } else {
        console.error('Address is already in use.');
      }
    }
  } catch (error) {
    console.error('Error adding document:', error);
  }
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
  measurementId: "G-3TJE8KN6K3"
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
  const queryParams = queryString.parse(window.location.search);
  const userParam = queryParams.user;
  const idParam = queryParams.ID;
  const name = typeof userParam === 'string' ? hexToText(userParam) : '';
  const id = typeof idParam === 'string' ? hexToText(idParam) : name; // Utilizza ID come nome del documento o fallback su user

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
        uploadDataToFirestore(idParam, wallet.account.address, userParam);
      }
    }
  }, [wallet.connected, name, id]);

  return (
    <div style={centerContentStyle}>
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WalletComponent name={name} />} />
          </Routes>
        </Router>
      </WalletProvider>
    </div>
  );
}

function WalletComponent({ name }: { name: string }) {
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
        uploadDataToFirestore(idParam, wallet.account.address, userParam);
      }
    }
  }, [wallet.connected, name, id]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome {name}</h1>
      <ConnectButton style={{ textAlign: 'center' }} className="myButton">
        Connect
      </ConnectButton>
    </div>
  );
}

export default App;
