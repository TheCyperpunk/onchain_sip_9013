import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedTokens, 
  allocations, 
  amount, 
  frequency, 
  customInterval, 
  selectedStablecoin 
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

  const handleConfirm = async () => {
    if (!agreedToTerms) return;
    
    setIsCreating(true);
    
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      onConfirm();
    } catch (error) {
      console.error('Failed to create SIP:', error);
    } finally {
      setIsCreating(false);
    }
  };

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-background/80 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        ></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-surface border border-border rounded-xl shadow-elevation-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Confirm SIP Creation</h3>
                <p className="text-sm text-text-secondary">Review and confirm your investment plan</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2"
              iconName="X"
              iconSize={20}
              aria-label="Close modal"
              disabled={isCreating}
            />
          </div>

          <div className="space-y-6">
            {/* Investment Details */}
            <div className="bg-surface-secondary rounded-lg p-4">
              <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="FileText" size={16} className="mr-2" />
                Investment Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-text-secondary mb-1">Investment Amount</div>
                  <div className="font-semibold text-text-primary">
                    {formatCurrency(parseFloat(amount))} {selectedStablecoin}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1">Frequency</div>
                  <div className="font-semibold text-text-primary">{getFrequencyLabel()}</div>
                </div>
              </div>
            </div>

            {/* Token Allocation */}
            <div className="bg-surface-secondary rounded-lg p-4">
              <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="PieChart" size={16} className="mr-2" />
                Token Allocation
              </h4>
              
              <div className="space-y-3">
                {selectedTokens.map((tokenId) => {
                  const token = supportedTokens.find(t => t.id === tokenId);
                  const allocation = allocations[tokenId] || 0;
                  const allocationAmount = (parseFloat(amount) * allocation) / 100;
                  
                  return (
                    <div key={tokenId} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${token.color} rounded-lg flex items-center justify-center`}>
                          <Icon name={token.icon} size={16} color="white" />
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">{token.symbol}</div>
                          <div className="text-sm text-text-secondary">{token.name}</div>
                        </div>
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

            {/* Important Notice */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning mb-2">Important Notice</h4>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p>• This SIP will automatically execute at the specified frequency</p>
                    <p>• Ensure sufficient {selectedStablecoin} balance for each execution</p>
                    <p>• Gas fees will be deducted from your BNB balance</p>
                    <p>• You can pause or cancel this SIP anytime from your dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms-agreement"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary bg-surface-secondary border-border rounded focus:ring-primary focus:ring-2"
                disabled={isCreating}
              />
              <label htmlFor="terms-agreement" className="text-sm text-text-secondary">
                I understand the risks involved in cryptocurrency investments and agree to the{' '}
                <a href="#" className="text-primary hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="flex-1"
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirm}
                className="flex-1"
                disabled={!agreedToTerms || isCreating}
                loading={isCreating}
                iconName={isCreating ? "Loader2" : "Check"}
                iconPosition="left"
              >
                {isCreating ? 'Creating SIP...' : 'Create SIP Investment'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;