import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AmountInput = ({ amount, onAmountChange, selectedStablecoin, onStablecoinChange }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const stablecoins = [
    {
      id: 'USDT',
      name: 'Tether USD',
      symbol: 'USDT',
      icon: 'DollarSign',
      balance: 2500.75,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'BUSD',
      name: 'Binance USD',
      symbol: 'BUSD',
      icon: 'DollarSign',
      balance: 1850.32,
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  const selectedCoin = stablecoins.find(coin => coin.id === selectedStablecoin) || stablecoins[0];

  useEffect(() => {
    setWalletBalance(selectedCoin.balance);
  }, [selectedCoin]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
      onAmountChange(value);
    }
  };

  const handlePercentageClick = (percentage) => {
    const calculatedAmount = (walletBalance * percentage / 100).toFixed(2);
    onAmountChange(calculatedAmount);
  };

  const handleMaxClick = () => {
    onAmountChange(walletBalance.toString());
  };

  const formatBalance = (balance) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(balance);
  };

  const getAmountError = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > walletBalance) {
      return 'Amount exceeds wallet balance';
    }
    if (numAmount < 10) {
      return 'Minimum investment amount is $10';
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Investment Amount</h3>
        <p className="text-sm text-text-secondary mb-4">
          Enter the amount you want to invest in each SIP execution
        </p>
      </div>

      {/* Stablecoin Selector */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-text-primary">Select Stablecoin</label>
          <div className="text-sm text-text-secondary">
            Balance: {formatBalance(selectedCoin.balance)}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {stablecoins.map((coin) => (
            <button
              key={coin.id}
              onClick={() => onStablecoinChange(coin.id)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200 text-left
                ${selectedStablecoin === coin.id
                  ? 'border-primary bg-primary/10' :'border-border hover:border-border-hover bg-surface-secondary hover:bg-surface-tertiary'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-br ${coin.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={coin.icon} size={16} color="white" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">{coin.symbol}</div>
                  <div className="text-xs text-text-secondary">{formatBalance(coin.balance)}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Amount per SIP execution
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <div className={`w-6 h-6 bg-gradient-to-br ${selectedCoin.color} rounded-md flex items-center justify-center`}>
                <Icon name={selectedCoin.icon} size={12} color="white" />
              </div>
              <span className="text-sm font-medium text-text-primary">{selectedCoin.symbol}</span>
            </div>
            <Input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="pl-20 pr-16 py-4 text-lg font-semibold bg-surface-secondary border-border focus:border-primary"
              min="0"
              step="0.01"
            />
            <button
              onClick={handleMaxClick}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-medium text-primary hover:text-primary-400 transition-colors"
            >
              MAX
            </button>
          </div>
          
          {getAmountError() && (
            <div className="mt-2 flex items-center text-error text-sm">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {getAmountError()}
            </div>
          )}
        </div>

        {/* Quick Percentage Buttons */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Quick Select
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 75, 100].map((percentage) => (
              <Button
                key={percentage}
                variant="outline"
                onClick={() => handlePercentageClick(percentage)}
                className="py-2 text-sm font-medium"
              >
                {percentage}%
              </Button>
            ))}
          </div>
          <div className="text-xs text-text-muted text-center">
            Percentage of your {selectedCoin.symbol} balance
          </div>
        </div>
      </div>

      {/* Amount Summary */}
      {amount && parseFloat(amount) > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Investment Summary</span>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Amount per execution:</span>
              <span className="font-medium text-text-primary">{formatBalance(parseFloat(amount || 0))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Remaining balance:</span>
              <span className="font-medium text-text-primary">
                {formatBalance(walletBalance - parseFloat(amount || 0))}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmountInput;