import React from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatus = ({ 
  isConnecting, 
  connectingWallet, 
  connectionError, 
  isConnected,
  walletName 
}) => {
  if (isConnected) {
    return (
      <div className="text-center p-6 bg-success/10 border border-success/20 rounded-xl">
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-success mb-2">
          Wallet Connected Successfully!
        </h3>
        <p className="text-sm text-text-secondary">
          {walletName} is now connected. Redirecting to dashboard...
        </p>
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className="text-center p-6 bg-error/10 border border-error/20 rounded-xl">
        <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertCircle" size={32} className="text-error" />
        </div>
        <h3 className="text-lg font-semibold text-error mb-2">
          Connection Failed
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          {connectionError}
        </p>
        <div className="flex items-center justify-center space-x-2 text-text-muted">
          <Icon name="RefreshCw" size={16} />
          <span className="text-sm">Please try again</span>
        </div>
      </div>
    );
  }

  if (isConnecting && connectingWallet) {
    return (
      <div className="text-center p-6 bg-primary/10 border border-primary/20 rounded-xl">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Loader2" size={32} className="text-primary animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">
          Connecting to {connectingWallet}...
        </h3>
        <p className="text-sm text-text-secondary">
          Please approve the connection in your wallet
        </p>
      </div>
    );
  }

  return null;
};

export default ConnectionStatus;