import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const WalletConnector = ({ isConnected, onConnectionChange, isMobile = false }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [connectionError, setConnectionError] = useState('');

  useEffect(() => {
    if (isConnected) {
      const savedAddress = localStorage.getItem('walletAddress');
      if (savedAddress) {
        setWalletAddress(savedAddress);
      }
    }
  }, [isConnected]);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionError('');
    
    try {
      // Simulate wallet connection process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock wallet address generation
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      
      // Save connection state
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', mockAddress);
      setWalletAddress(mockAddress);
      
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('walletConnectionChange'));
      
      if (onConnectionChange) {
        onConnectionChange(true);
      }
      
      setShowModal(false);
    } catch (error) {
      setConnectionError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    setWalletAddress('');
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('walletConnectionChange'));
    
    if (onConnectionChange) {
      onConnectionChange(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setConnectionError('');
  };

  const closeModal = () => {
    setShowModal(false);
    setConnectionError('');
    setIsConnecting(false);
  };

  if (isConnected) {
    return (
      <div className={`flex items-center ${isMobile ? 'w-full' : 'space-x-3'}`}>
        <div className={`flex items-center ${isMobile ? 'flex-1' : 'space-x-2'} bg-success/10 border border-success/20 rounded-lg px-3 py-2`}>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-data text-success ml-2">
            {formatAddress(walletAddress)}
          </span>
        </div>
        
        <Button
          variant="ghost"
          onClick={handleDisconnect}
          className={`${isMobile ? 'ml-2' : ''} text-text-secondary hover:text-error`}
          iconName="LogOut"
          iconSize={16}
          title="Disconnect wallet"
        >
          {isMobile ? 'Disconnect' : ''}
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={openModal}
        className={isMobile ? 'w-full justify-center' : ''}
        iconName="Wallet"
        iconPosition="left"
        iconSize={16}
      >
        Connect Wallet
      </Button>

      {/* Connection Modal */}
      {showModal && (
        <div className="fixed inset-0 z-60 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-background/80 backdrop-blur-sm"
              onClick={closeModal}
              aria-hidden="true"
            ></div>

            {/* Modal panel */}
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-surface border border-border rounded-xl shadow-elevation-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary font-heading">
                  Connect Your Wallet
                </h3>
                <Button
                  variant="ghost"
                  onClick={closeModal}
                  className="p-1"
                  iconName="X"
                  iconSize={20}
                  aria-label="Close modal"
                />
              </div>

              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  Connect your wallet to start investing in DeFi SIP strategies. Your wallet will be used to authenticate and execute transactions.
                </p>

                {connectionError && (
                  <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center">
                      <Icon name="AlertCircle" size={16} className="text-error mr-2" />
                      <span className="text-sm text-error">{connectionError}</span>
                    </div>
                  </div>
                )}

                {/* Wallet Options */}
                <div className="space-y-3">
                  <button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-between p-4 bg-surface-secondary hover:bg-surface-tertiary border border-border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                        <Icon name="Wallet" size={16} color="white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-text-primary">MetaMask</div>
                        <div className="text-xs text-text-secondary">Connect using MetaMask wallet</div>
                      </div>
                    </div>
                    {isConnecting ? (
                      <Icon name="Loader2" size={20} className="text-primary animate-spin" />
                    ) : (
                      <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                    )}
                  </button>

                  <button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-between p-4 bg-surface-secondary hover:bg-surface-tertiary border border-border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <Icon name="Wallet" size={16} color="white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-text-primary">WalletConnect</div>
                        <div className="text-xs text-text-secondary">Connect using WalletConnect</div>
                      </div>
                    </div>
                    {isConnecting ? (
                      <Icon name="Loader2" size={20} className="text-primary animate-spin" />
                    ) : (
                      <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                    )}
                  </button>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-text-muted text-center">
                    By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnector;