import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ConfirmationModal = ({ isOpen, onClose, action, sipData, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [gasEstimate] = useState(0.0023); // Mock gas estimate

  if (!isOpen || !sipData) return null;

  const getActionDetails = () => {
    switch (action) {
      case 'pause':
        return {
          title: 'Pause SIP Investment',
          description: 'This will pause your SIP investment. No further automatic investments will be made until you resume.',
          icon: 'Pause',
          iconColor: 'text-warning',
          confirmText: 'Pause SIP',
          confirmVariant: 'warning'
        };
      case 'resume':
        return {
          title: 'Resume SIP Investment',
          description: 'This will resume your SIP investment. Automatic investments will continue according to your schedule.',
          icon: 'Play',
          iconColor: 'text-success',
          confirmText: 'Resume SIP',
          confirmVariant: 'success'
        };
      case 'withdraw':
        return {
          title: 'Withdraw Funds',
          description: 'This will withdraw all accumulated tokens from your SIP investment to your wallet.',
          icon: 'ArrowUpRight',
          iconColor: 'text-primary',
          confirmText: 'Withdraw Funds',
          confirmVariant: 'primary'
        };
      case 'cancel':
        return {
          title: 'Cancel SIP Investment',
          description: 'This will permanently cancel your SIP investment. All accumulated tokens will be withdrawn to your wallet.',
          icon: 'Trash2',
          iconColor: 'text-error',
          confirmText: 'Cancel SIP',
          confirmVariant: 'danger'
        };
      default:
        return {
          title: 'Confirm Action',
          description: 'Please confirm this action.',
          icon: 'AlertCircle',
          iconColor: 'text-text-secondary',
          confirmText: 'Confirm',
          confirmVariant: 'primary'
        };
    }
  };

  const actionDetails = getActionDetails();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getTokenIcon = (symbol) => {
    const tokenIcons = {
      'BTC': 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      'ETH': 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      'BNB': 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      'SOL': 'https://cryptologos.cc/logos/solana-sol-logo.png'
    };
    return tokenIcons[symbol] || '/assets/images/no_image.png';
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onConfirm(sipData.id);
      onClose();
    } catch (error) {
      console.error('Transaction failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-background/80 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        ></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-surface border border-border rounded-xl shadow-elevation-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-surface-secondary ${actionDetails.iconColor}`}>
                <Icon name={actionDetails.icon} size={20} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary font-heading">
                {actionDetails.title}
              </h3>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-1"
              iconName="X"
              iconSize={20}
              disabled={isProcessing}
            />
          </div>

          {/* SIP Details */}
          <div className="glass-morphism rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-text-secondary">SIP Investment</span>
              <span className="text-sm font-medium text-text-primary">
                Created {new Date(sipData.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Token Allocation */}
            <div className="flex items-center space-x-2 mb-3">
              {sipData.tokens.map((token, index) => (
                <div key={token.symbol} className="flex items-center space-x-1">
                  <Image
                    src={getTokenIcon(token.symbol)}
                    alt={token.symbol}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-sm font-medium text-text-primary">
                    {token.allocation}%
                  </span>
                  {index < sipData.tokens.length - 1 && (
                    <span className="text-text-muted">•</span>
                  )}
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Total Invested</p>
                <p className="font-semibold text-text-primary">
                  {formatCurrency(sipData.totalInvested)}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">Current Value</p>
                <p className="font-semibold text-text-primary">
                  {formatCurrency(sipData.currentValue)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Description */}
          <div className="mb-6">
            <p className="text-sm text-text-secondary leading-relaxed">
              {actionDetails.description}
            </p>
          </div>

          {/* Withdraw Details */}
          {(action === 'withdraw' || action === 'cancel') && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-text-primary mb-3">
                Tokens to be withdrawn:
              </h4>
              <div className="space-y-2">
                {sipData.tokens.map((token) => (
                  <div key={token.symbol} className="flex items-center justify-between p-2 bg-surface-secondary rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={getTokenIcon(token.symbol)}
                        alt={token.symbol}
                        className="w-4 h-4 rounded-full"
                      />
                      <span className="text-sm text-text-primary">{token.symbol}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-text-primary">
                        {token.amount} {token.symbol}
                      </p>
                      <p className="text-xs text-text-secondary">
                        ≈ {formatCurrency(token.value)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gas Estimate */}
          <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-warning" />
              <span className="text-sm text-text-secondary">Estimated Gas Fee</span>
            </div>
            <span className="text-sm font-medium text-text-primary">
              {gasEstimate} BNB
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant={actionDetails.confirmVariant}
              onClick={handleConfirm}
              className="flex-1"
              disabled={isProcessing}
              loading={isProcessing}
              iconName={isProcessing ? "Loader2" : actionDetails.icon}
              iconSize={16}
              iconPosition="left"
            >
              {isProcessing ? 'Processing...' : actionDetails.confirmText}
            </Button>
          </div>

          {/* Warning for destructive actions */}
          {(action === 'cancel') && (
            <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-error">Warning</p>
                  <p className="text-xs text-error/80 mt-1">
                    This action cannot be undone. Your SIP investment will be permanently cancelled.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;