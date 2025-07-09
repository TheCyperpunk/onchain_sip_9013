import React from 'react';
import WalletOption from './WalletOption';

const WalletGrid = ({ 
  wallets, 
  isConnecting, 
  connectingWallet, 
  onWalletConnect, 
  connectedWallet 
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Choose Your Wallet
        </h3>
        <p className="text-sm text-text-secondary">
          Select a wallet to connect and start your DeFi investment journey
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {wallets.map((wallet) => (
          <WalletOption
            key={wallet.id}
            wallet={wallet}
            isConnecting={isConnecting}
            connectingWallet={connectingWallet}
            onConnect={onWalletConnect}
            isConnected={connectedWallet === wallet.id}
          />
        ))}
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-text-muted">
          Don't have a wallet?{' '}
          <a 
            href="https://metamask.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-400 transition-smooth underline"
          >
            Get MetaMask
          </a>
          {' '}or{' '}
          <a 
            href="https://rainbow.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-400 transition-smooth underline"
          >
            Download Rainbow
          </a>
        </p>
      </div>
    </div>
  );
};

export default WalletGrid;