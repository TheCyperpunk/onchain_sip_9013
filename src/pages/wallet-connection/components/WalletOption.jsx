import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletOption = ({ 
  wallet, 
  isConnecting, 
  connectingWallet, 
  onConnect, 
  isConnected = false 
}) => {
  const isCurrentlyConnecting = isConnecting && connectingWallet === wallet.id;

  return (
    <Button
      variant={isConnected ? "success" : "ghost"}
      onClick={() => onConnect(wallet)}
      disabled={isConnecting}
      className={`
        w-full p-6 h-auto flex-col space-y-3 border-2 transition-all duration-300
        ${isConnected 
          ? 'border-success bg-success/10 hover:bg-success/20' :'border-border hover:border-primary/50 hover:bg-surface-secondary/50'
        }
        ${isCurrentlyConnecting ? 'animate-pulse' : ''}
        focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
      `}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-surface-secondary to-surface-tertiary">
        <Icon 
          name={wallet.icon} 
          size={32} 
          className={isConnected ? 'text-success' : 'text-text-primary'}
        />
      </div>
      
      <div className="text-center">
        <h3 className={`font-semibold text-lg ${isConnected ? 'text-success' : 'text-text-primary'}`}>
          {wallet.name}
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          {wallet.description}
        </p>
      </div>

      {isCurrentlyConnecting && (
        <div className="flex items-center justify-center space-x-2 mt-2">
          <Icon name="Loader2" size={16} className="text-primary animate-spin" />
          <span className="text-sm text-primary">Connecting...</span>
        </div>
      )}

      {isConnected && (
        <div className="flex items-center justify-center space-x-2 mt-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">Connected</span>
        </div>
      )}
    </Button>
  );
};

export default WalletOption;