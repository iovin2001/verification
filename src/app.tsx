import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import queryString from 'query-string';
import { WalletProvider, useWallet, ConnectButton } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Import or define your uploadDataToFirestore function here
// Import or define your hexToText function here

const firebaseConfig = {
  // Your Firebase configuration
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const topBarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
};

const infoTextStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '20px',
};

function App() {
  // App logic remains the same
}

function WalletComponent({ name, idParam, userParam }: { name: string, idParam: string, userParam: string }) {
  const wallet = useWallet();

  useEffect(() => {
    // WalletComponent useEffect logic remains the same
  }, [wallet.connected, name, idParam, userParam]);

  return (
    <div>
      <div style={topBarStyle}>
        <span>LOGO</span>
        <ConnectButton>Connect</ConnectButton>
      </div>
      <div style={infoTextStyle}>
        <p>1) The migration will begin on March 5th 2024 at 11:59 PM UTC+12 and the deadline will be on April 7th 2024 at 11:59 PM UTC+12, with a total duration of 33 days.</p>
        <p>2) If you have your Bored Ape Sui Clubs or Mutant Ape Sui Clubs listed, delist them from the marketplaces to migrate to Ape Sui Society NFT.</p>
        <p>3) Ape Sui Society NFTs that won't be migrated before the deadline will be burned or used for future promotions and rewards to the community (decision will be made by DAO).</p>
        <p>4) All the Bored Ape Sui Clubs & Mutant Ape Sui Clubs that won't be migrated will be useless in future and will not receive any benefits from future project developments (rewards, staking, airdrop, etc.).</p>
        <p>5) In order to migrate you will need to burn your Bored Ape Sui Clubs or Mutant Ape Sui Clubs within this website (www.casuino.xyz), NFTs must be burned ONLY through our dapp.</p>
        <p>6) Press the MIGRATE key to burn your BASC/MASCs. There will be a small fee of 0.50 $SUI for each NFT you are going to burn, after doing the burn you will automatically receive the new NFT within a few minutes directly into the wallet.</p>
      </div>
      <h1 style={{ textAlign: 'center' }}>Welcome {name}</h1>
    </div>
  );
}

export default App;
