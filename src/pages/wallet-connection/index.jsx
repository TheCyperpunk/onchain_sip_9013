import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WalletGrid from './components/WalletGrid';
import ConnectionStatus from './components/ConnectionStatus';
import SecurityInfo from './components/SecurityInfo';

const WalletConnection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(null);
  const [connectionError, setConnectionError] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/investment-dashboard';

  const wallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      description: 'Connect using MetaMask browser extension'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      description: 'Connect with mobile wallet via QR code'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      description: 'Connect using Coinbase Wallet'
    },
    {
      id: 'rainbow',
      name: 'Rainbow',
      icon: 'Zap',
      description: 'Connect using Rainbow wallet'
    }
  ];

  useEffect(() => {
    // Check if wallet is already connected
    const walletConnected = localStorage.getItem('walletConnected') === 'true';
    const savedWallet = localStorage.getItem('connectedWallet');
    
    if (walletConnected && savedWallet) {
      setIsConnected(true);
      setConnectedWallet(savedWallet);
      
      // Redirect after a brief delay to show success state
      setTimeout(() => {
        navigate(returnTo);
      }, 2000);
    }
  }, [navigate, returnTo]);

  const handleWalletConnect = async (wallet) => {
    setIsConnecting(true);
    setConnectingWallet(wallet.name);
    setConnectionError('');

    try {
      // Simulate wallet connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random connection failure (20% chance)
      if (Math.random() < 0.2) {
        throw new Error(`Failed to connect to ${wallet.name}. Please make sure your wallet is unlocked and try again.`);
      }

      // Mock wallet address generation
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      
      // Save connection state
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', mockAddress);
      localStorage.setItem('connectedWallet', wallet.id);
      
      setIsConnected(true);
      setConnectedWallet(wallet.id);
      
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('walletConnectionChange'));
      
      // Redirect after showing success state
      setTimeout(() => {
        navigate(returnTo);
      }, 2000);
      
    } catch (error) {
      setConnectionError(error.message);
    } finally {
      setIsConnecting(false);
      setConnectingWallet(null);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleToggleSecurityInfo = () => {
    setShowSecurityInfo(!showSecurityInfo);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-md">
      <div className="flex items-center justify-center min-h-screen px-4 pt-20 pb-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1"></div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-text-primary font-heading">
                    OnChain SIP
                  </h1>
                  <p className="text-sm text-text-secondary">
                    Connect Your Wallet
                  </p>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="p-2"
                  iconName="X"
                  iconSize={20}
                  aria-label="Close wallet connection"
                />
              </div>
            </div>
            
            <p className="text-text-secondary max-w-md mx-auto">
              Connect your wallet to access automated DeFi investment strategies and start building your crypto portfolio.
            </p>
          </div>

          {/* Main Content */}
          <div className="glass-morphism-strong rounded-2xl p-6 sm:p-8 space-y-8">
            {/* Connection Status */}
            <ConnectionStatus
              isConnecting={isConnecting}
              connectingWallet={connectingWallet}
              connectionError={connectionError}
              isConnected={isConnected}
              walletName={connectedWallet ? wallets.find(w => w.id === connectedWallet)?.name : ''}
            />

            {/* Wallet Grid - Only show if not connected and not connecting */}
            {!isConnected && !isConnecting && (
              <WalletGrid
                wallets={wallets}
                isConnecting={isConnecting}
                connectingWallet={connectingWallet}
                onWalletConnect={handleWalletConnect}
                connectedWallet={connectedWallet}
              />
            )}

            {/* Security Info Toggle */}
            {!isConnected && (
              <div className="border-t border-border pt-6">
                <Button
                  variant="ghost"
                  onClick={handleToggleSecurityInfo}
                  className="w-full justify-between"
                  iconName={showSecurityInfo ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  <span className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} />
                    <span>Security & Privacy Information</span>
                  </span>
                </Button>
                
                {showSecurityInfo && (
                  <div className="mt-6">
                    <SecurityInfo />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-text-muted">
              By connecting your wallet, you agree to our{' '}
              <button className="text-primary hover:text-primary-400 transition-smooth underline">
                Terms of Service
              </button>
              {' '}and{' '}
              <button className="text-primary hover:text-primary-400 transition-smooth underline">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;