import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import NavigationMenu from './NavigationMenu';
import WalletConnector from './WalletConnector';

const GlobalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkWalletConnection = () => {
      const walletStatus = localStorage.getItem('walletConnected');
      setIsWalletConnected(walletStatus === 'true');
    };

    checkWalletConnection();
    window.addEventListener('storage', checkWalletConnection);
    window.addEventListener('walletConnectionChange', checkWalletConnection);

    return () => {
      window.removeEventListener('storage', checkWalletConnection);
      window.removeEventListener('walletConnectionChange', checkWalletConnection);
    };
  }, []);

  const handleLogoClick = () => {
    navigate('/home-landing-page');
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleWalletConnectionChange = (connected) => {
    setIsWalletConnected(connected);
    if (connected) {
      navigate('/investment-dashboard');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 transition-smooth hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg p-1"
              aria-label="OnChain SIP Home"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-semibold text-text-primary font-heading">
                OnChain SIP
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu 
              isWalletConnected={isWalletConnected}
              currentPath={location.pathname}
              onNavigate={handleMenuClose}
            />
          </div>

          {/* Desktop Wallet Connector */}
          <div className="hidden md:block">
            <WalletConnector 
              isConnected={isWalletConnected}
              onConnectionChange={handleWalletConnectionChange}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={handleMenuToggle}
              className="p-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <Icon 
                name={isMenuOpen ? "X" : "Menu"} 
                size={24} 
                color="currentColor" 
              />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-surface/95 backdrop-blur-md rounded-lg mt-2 border border-border shadow-elevation-3">
              <NavigationMenu 
                isWalletConnected={isWalletConnected}
                currentPath={location.pathname}
                onNavigate={handleMenuClose}
                isMobile={true}
              />
              
              {/* Mobile Wallet Connector */}
              <div className="pt-4 border-t border-border">
                <WalletConnector 
                  isConnected={isWalletConnected}
                  onConnectionChange={handleWalletConnectionChange}
                  isMobile={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;