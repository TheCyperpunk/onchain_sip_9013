import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';

import GlobalHeader from '../../components/ui/GlobalHeader';
import AuthenticationGate from '../../components/ui/AuthenticationGate';
import ProfileOverview from './components/ProfileOverview';
import CurrentPositions from './components/CurrentPositions';
import TransactionHistory from './components/TransactionHistory';
import SettingsPanel from './components/SettingsPanel';

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const userData = {
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590e4CAF",
    totalInvestment: 15750.00,
    netWorth: 18420.50,
    accountCreated: "2024-01-15T10:30:00Z"
  };

  // Mock positions data
  const positionsData = [
    {
      id: 1,
      token: {
        symbol: "BTC",
        name: "Bitcoin",
        icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png"
      },
      amount: 0.245678,
      investedAmount: 8500.00,
      currentValue: 10250.75,
      growthPercentage: 20.59,
      unrealizedPnL: 1750.75
    },
    {
      id: 2,
      token: {
        symbol: "ETH",
        name: "Ethereum",
        icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
      },
      amount: 3.456789,
      investedAmount: 4200.00,
      currentValue: 4890.25,
      growthPercentage: 16.43,
      unrealizedPnL: 690.25
    },
    {
      id: 3,
      token: {
        symbol: "BNB",
        name: "BNB",
        icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png"
      },
      amount: 12.789456,
      investedAmount: 2050.00,
      currentValue: 2180.50,
      growthPercentage: 6.37,
      unrealizedPnL: 130.50
    },
    {
      id: 4,
      token: {
        symbol: "SOL",
        name: "Solana",
        icon: "https://cryptologos.cc/logos/solana-sol-logo.png"
      },
      amount: 45.123456,
      investedAmount: 1000.00,
      currentValue: 1099.00,
      growthPercentage: 9.90,
      unrealizedPnL: 99.00
    }
  ];

  // Mock transaction history
  const transactionHistory = [
    {
      id: 1,
      timestamp: "2024-12-15T14:30:00Z",
      type: "sip_executed",
      token: "BTC",
      amount: 500.00,
      status: "completed",
      hash: "0x1234567890abcdef1234567890abcdef12345678"
    },
    {
      id: 2,
      timestamp: "2024-12-14T09:15:00Z",
      type: "sip_created",
      token: "ETH",
      amount: 1000.00,
      status: "completed",
      hash: "0x2345678901bcdef12345678901bcdef123456789"
    },
    {
      id: 3,
      timestamp: "2024-12-13T16:45:00Z",
      type: "sip_executed",
      token: "BNB",
      amount: 250.00,
      status: "completed",
      hash: "0x3456789012cdef123456789012cdef1234567890"
    },
    {
      id: 4,
      timestamp: "2024-12-12T11:20:00Z",
      type: "withdrawal",
      token: "SOL",
      amount: 150.00,
      status: "completed",
      hash: "0x456789013def12345678903def12345678901"
    },
    {
      id: 5,
      timestamp: "2024-12-11T13:10:00Z",
      type: "sip_paused",
      token: "BTC",
      amount: 0.00,
      status: "completed",
      hash: "0x56789014ef1234567894ef123456789012"
    },
    {
      id: 6,
      timestamp: "2024-12-10T08:30:00Z",
      type: "sip_resumed",
      token: "BTC",
      amount: 0.00,
      status: "completed",
      hash: "0x6789015f123456785f12345678901234"
    },
    {
      id: 7,
      timestamp: "2024-12-09T15:25:00Z",
      type: "sip_executed",
      token: "ETH",
      amount: 300.00,
      status: "completed",
      hash: "0x789016123456786123456789012345"
    },
    {
      id: 8,
      timestamp: "2024-12-08T12:40:00Z",
      type: "sip_cancelled",
      token: "SOL",
      amount: 0.00,
      status: "completed",
      hash: "0x89017234567871234567890123456"
    }
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'User',
      description: 'Account summary and quick actions'
    },
    {
      id: 'positions',
      label: 'Positions',
      icon: 'TrendingUp',
      description: 'Current token holdings and performance'
    },
    {
      id: 'history',
      label: 'History',
      icon: 'Clock',
      description: 'Transaction history and activity log'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      description: 'Preferences and account settings'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ProfileOverview
            walletAddress={userData.walletAddress}
            totalInvestment={userData.totalInvestment}
            accountCreated={userData.accountCreated}
            netWorth={userData.netWorth}
          />
        );
      case 'positions':
        return <CurrentPositions positions={positionsData} />;
      case 'history':
        return <TransactionHistory transactions={transactionHistory} />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <AuthenticationGate requireAuth={true}>
        <div className="min-h-screen bg-background">
          <GlobalHeader />
          <div className="pt-16 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Loader2" size={20} className="text-primary animate-spin" />
                <span className="text-text-secondary">Loading profile...</span>
              </div>
            </div>
          </div>
        </div>
      </AuthenticationGate>
    );
  }

  return (
    <AuthenticationGate requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>User Profile & Settings - OnChain SIP</title>
          <meta name="description" content="Manage your OnChain SIP profile, view positions, transaction history, and customize settings for your DeFi investment experience." />
        </Helmet>

        <GlobalHeader />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="User" size={20} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-text-primary font-heading">
                    Profile & Settings
                  </h1>
                  <p className="text-text-secondary">
                    Manage your account, view positions, and customize your experience
                  </p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              {/* Desktop Tabs */}
              <div className="hidden md:block">
                <nav className="flex space-x-1 bg-surface/50 rounded-xl p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground shadow-elevation-1'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50'
                      }`}
                      title={tab.description}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Mobile Tabs */}
              <div className="md:hidden">
                <div className="grid grid-cols-2 gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center space-y-1 p-3 rounded-lg text-sm font-medium transition-smooth ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground shadow-elevation-1'
                          : 'text-text-secondary hover:text-text-primary bg-surface/50 hover:bg-surface-secondary/50'
                      }`}
                    >
                      <Icon name={tab.icon} size={20} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="transition-all duration-300 ease-out">
              {renderTabContent()}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-surface border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={14} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-text-primary font-semibold">OnChain SIP</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-text-secondary">
                <a href="#" className="hover:text-text-primary transition-smooth">Privacy Policy</a>
                <a href="#" className="hover:text-text-primary transition-smooth">Terms of Service</a>
                <a href="#" className="hover:text-text-primary transition-smooth">Support</a>
              </div>
              
              <p className="text-sm text-text-muted mt-4 md:mt-0">
                © {new Date().getFullYear()} OnChain SIP. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AuthenticationGate>
  );
};

export default UserProfileSettings;