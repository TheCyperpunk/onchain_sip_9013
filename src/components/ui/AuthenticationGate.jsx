import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticationGate = ({ children, requireAuth = true }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnectPrompt, setShowConnectPrompt] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      const walletConnected = localStorage.getItem('walletConnected') === 'true';
      setIsAuthenticated(walletConnected);
      setIsLoading(false);
      
      if (requireAuth && !walletConnected) {
        setShowConnectPrompt(true);
      }
    };

    checkAuthentication();

    const handleWalletConnectionChange = () => {
      checkAuthentication();
    };

    window.addEventListener('storage', handleWalletConnectionChange);
    window.addEventListener('walletConnectionChange', handleWalletConnectionChange);

    return () => {
      window.removeEventListener('storage', handleWalletConnectionChange);
      window.removeEventListener('walletConnectionChange', handleWalletConnectionChange);
    };
  }, [requireAuth]);

  const handleConnectWallet = () => {
    navigate('/wallet-connection', { 
      state: { returnTo: location.pathname } 
    });
  };

  const handleGoHome = () => {
    navigate('/home-landing-page');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Loader2" size={20} className="text-primary animate-spin" />
            <span className="text-text-secondary">Checking wallet connection...</span>
          </div>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated && showConnectPrompt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-6">
              <Icon name="Lock" size={32} color="white" strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-semibold text-text-primary font-heading mb-2">
              Wallet Connection Required
            </h1>
            <p className="text-text-secondary">
              You need to connect your wallet to access this feature. Connect your wallet to continue with your DeFi investment journey.
            </p>
          </div>

          <div className="glass-morphism rounded-xl p-6 space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <Icon name="Shield" size={20} className="text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-text-primary text-sm">Secure Connection</h3>
                <p className="text-xs text-text-secondary mt-1">
                  Your wallet connection is encrypted and secure. We never store your private keys.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <Icon name="Zap" size={20} className="text-accent mt-0.5" />
              <div>
                <h3 className="font-medium text-text-primary text-sm">Quick Setup</h3>
                <p className="text-xs text-text-secondary mt-1">
                  Connect in seconds and start investing in automated DeFi strategies.
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                variant="primary"
                onClick={handleConnectWallet}
                className="w-full"
                iconName="Wallet"
                iconPosition="left"
              >
                Connect Wallet
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleGoHome}
                className="w-full"
                iconName="Home"
                iconPosition="left"
              >
                Back to Home
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-text-muted">
              Don't have a wallet?{' '}
              <a 
                href="https://metamask.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-400 transition-smooth"
              >
                Get MetaMask
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!requireAuth || isAuthenticated) {
    return children;
  }

  return null;
};

export default AuthenticationGate;