import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const MetaMaskConnector = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      // Modern DApp browsers (like MetaMask)
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Subscribe to accounts change
          window.ethereum.on('accountsChanged', (newAccounts) => {
            setAccounts(newAccounts);
            setSelectedAccount(newAccounts[0] || '');
          });
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      }
      // Legacy dApp browsers
      else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
      }
      // Non-dApp browsers
      else {
        console.log('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  return (
    <div>
      <h1>MetaMask Connector</h1>
      {web3 ? (
        <>
          <p>Connected to MetaMask</p>
          <p>Accounts:</p>
          <select value={selectedAccount} onChange={handleAccountChange}>
            {accounts.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
          <p>Selected Account: {selectedAccount}</p>
        </>
      ) : (
        <p>Connecting to MetaMask...</p>
      )}
    </div>
  );
};

export default MetaMaskConnector;
