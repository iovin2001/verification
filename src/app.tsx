import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider, useWallet, ConnectButton } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

const centerContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

function App() {
  return (
    <div style={centerContentStyle}>
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WalletComponent />} />
          </Routes>
        </Router>
      </WalletProvider>
    </div>
  );
}

function WalletComponent() {
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.connected) {
      console.log('Connected wallet name:', wallet.name);
      console.log('Account address:', wallet.account?.address);
      console.log('Account publicKey:', wallet.account?.publicKey);
    }
  }, [wallet.connected]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Welcome</h1>
      <ConnectButton style={{ textAlign: 'center' }} className="myButton">
        Connect
      </ConnectButton>
    </div>
  );
}

export default App;
