import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileOverview = ({ walletAddress, totalInvestment, accountCreated, netWorth }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="space-y-6">
      {/* Wallet Information */}
      <div className="glass-morphism rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            Connected Wallet
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success">Connected</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-surface-secondary rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Wallet" size={20} color="white" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Wallet Address</p>
              <p className="font-data text-text-primary">{formatAddress(walletAddress)}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            onClick={handleCopyAddress}
            className="text-text-secondary hover:text-text-primary"
            iconName={copied ? "Check" : "Copy"}
            iconSize={16}
            title={copied ? "Copied!" : "Copy address"}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-morphism rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={16} className="text-primary" />
            </div>
            <span className="text-sm text-text-secondary">Net Worth</span>
          </div>
          <p className="text-2xl font-semibold text-text-primary">
            {formatCurrency(netWorth)}
          </p>
          <p className="text-xs text-success mt-1">
            +12.5% from last month
          </p>
        </div>

        <div className="glass-morphism rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={16} className="text-accent" />
            </div>
            <span className="text-sm text-text-secondary">Total Invested</span>
          </div>
          <p className="text-2xl font-semibold text-text-primary">
            {formatCurrency(totalInvestment)}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            Across all SIPs
          </p>
        </div>

        <div className="glass-morphism rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={16} className="text-secondary" />
            </div>
            <span className="text-sm text-text-secondary">Member Since</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">
            {formatDate(accountCreated)}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            Account created
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-morphism rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="flex-col h-20 space-y-2"
            iconName="Plus"
            iconSize={20}
          >
            <span className="text-sm">Create SIP</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex-col h-20 space-y-2"
            iconName="BarChart3"
            iconSize={20}
          >
            <span className="text-sm">Dashboard</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex-col h-20 space-y-2"
            iconName="Settings"
            iconSize={20}
          >
            <span className="text-sm">Manage SIPs</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex-col h-20 space-y-2"
            iconName="Download"
            iconSize={20}
          >
            <span className="text-sm">Export Data</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;