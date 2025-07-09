import React from 'react';
import Icon from '../../../components/AppIcon';

const InvestmentSummary = ({ 
  selectedTokens, 
  allocations, 
  amount, 
  frequency, 
  customInterval, 
  selectedStablecoin 
}) => {
  const supportedTokens = [
    {
      id: 'BTC',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: 'Bitcoin',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'ETH',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Zap',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'BNB',
      name: 'BNB Chain',
      symbol: 'BNB',
      icon: 'Triangle',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 'SOL',
      name: 'Solana',
      symbol: 'SOL',
      icon: 'Sun',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const getFrequencyLabel = () => {
    switch (frequency) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      case 'custom':
        return `Every ${customInterval.value} ${customInterval.unit}`;
      default:
        return 'Not selected';
    }
  };

  const getEstimatedGasFee = () => {
    // Mock gas fee calculation based on number of tokens
    const baseGas = 0.005;
    const perTokenGas = 0.002;
    return baseGas + (selectedTokens.length * perTokenGas);
  };

  const getMonthlyInvestment = () => {
    const amountNum = parseFloat(amount || 0);
    switch (frequency) {
      case 'daily':
        return amountNum * 30;
      case 'weekly':
        return amountNum * 4.33;
      case 'monthly':
        return amountNum;
      case 'custom':
        const intervalDays = customInterval.unit === 'days' ? parseInt(customInterval.value) :
                           customInterval.unit === 'weeks' ? parseInt(customInterval.value) * 7 :
                           parseInt(customInterval.value) * 30;
        return (amountNum * 30) / intervalDays;
      default:
        return 0;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatCrypto = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    }).format(value);
  };

  if (!selectedTokens.length || !amount || !frequency) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">Investment Summary</h3>
          <p className="text-text-secondary">
            Complete the form above to see your investment summary
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Investment Summary</h3>
        <p className="text-sm text-text-secondary mb-4">
          Review your SIP configuration before creating the investment
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
        {/* Investment Amount */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={16} className="text-text-secondary" />
            <span className="text-text-secondary">Amount per execution</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-text-primary">
              {formatCurrency(parseFloat(amount))}
            </div>
            <div className="text-sm text-text-secondary">{selectedStablecoin}</div>
          </div>
        </div>

        {/* Frequency */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-text-secondary">Frequency</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-text-primary">{getFrequencyLabel()}</div>
            <div className="text-sm text-text-secondary">
              ~{formatCurrency(getMonthlyInvestment())}/month
            </div>
          </div>
        </div>

        {/* Token Allocation */}
        <div className="py-3 border-b border-border">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="PieChart" size={16} className="text-text-secondary" />
            <span className="text-text-secondary">Token Allocation</span>
          </div>
          <div className="space-y-3">
            {selectedTokens.map((tokenId) => {
              const token = supportedTokens.find(t => t.id === tokenId);
              const allocation = allocations[tokenId] || 0;
              const allocationAmount = (parseFloat(amount) * allocation) / 100;
              
              return (
                <div key={tokenId} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 bg-gradient-to-br ${token.color} rounded-md flex items-center justify-center`}>
                      <Icon name={token.icon} size={12} color="white" />
                    </div>
                    <span className="font-medium text-text-primary">{token.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-text-primary">
                      {formatCurrency(allocationAmount)}
                    </div>
                    <div className="text-sm text-text-secondary">{allocation}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estimated Fees */}
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-text-secondary" />
            <span className="text-text-secondary">Estimated gas fee</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-text-primary">
              {formatCrypto(getEstimatedGasFee())} BNB
            </div>
            <div className="text-sm text-text-secondary">
              ~{formatCurrency(getEstimatedGasFee() * 315.89)}
            </div>
          </div>
        </div>

        {/* Total Investment */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="font-medium text-primary">Total per execution</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {formatCurrency(parseFloat(amount) + (getEstimatedGasFee() * 315.89))}
              </div>
              <div className="text-sm text-primary/80">
                Investment + Gas fees
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Strategy Info */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-accent mb-2">Smart Investment Strategy</h4>
            <div className="text-sm text-text-secondary space-y-1">
              <p>• Your {selectedStablecoin} will be automatically converted to selected tokens</p>
              <p>• Investments execute at market prices during each interval</p>
              <p>• You can pause, resume, or cancel your SIP anytime</p>
              <p>• All transactions are recorded on BNB Chain for transparency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSummary;