import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SIPCard = ({ sip, onPause, onResume, onCancel, onViewDetails }) => {
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    const calculateTimeUntilNext = () => {
      const now = new Date();
      const nextExecution = new Date(sip.nextExecution);
      const diff = nextExecution - now;

      if (diff <= 0) {
        setTimeUntilNext('Executing soon...');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeUntilNext(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeUntilNext(`${hours}h ${minutes}m`);
      } else {
        setTimeUntilNext(`${minutes}m`);
      }
    };

    calculateTimeUntilNext();
    const interval = setInterval(calculateTimeUntilNext, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [sip.nextExecution]);

  const getStatusColor = () => {
    switch (sip.status) {
      case 'active':
        return 'text-success';
      case 'paused':
        return 'text-warning';
      case 'cancelled':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = () => {
    switch (sip.status) {
      case 'active':
        return 'Play';
      case 'paused':
        return 'Pause';
      case 'cancelled':
        return 'Square';
      default:
        return 'Circle';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="glass-morphism rounded-xl p-6 hover:bg-surface/30 transition-smooth">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {sip.tokens.map((token, index) => (
              <div
                key={token.symbol}
                className={`w-8 h-8 rounded-full border-2 border-surface flex items-center justify-center text-xs font-medium ${token.bgColor} ${token.textColor}`}
                style={{ zIndex: sip.tokens.length - index }}
              >
                {token.symbol.slice(0, 2)}
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">
              {sip.tokens.map(t => t.symbol).join(' + ')} SIP
            </h3>
            <p className="text-sm text-text-secondary">
              {formatCurrency(sip.monthlyAmount)}/month
            </p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
          <Icon name={getStatusIcon()} size={16} />
          <span className="text-sm font-medium capitalize">{sip.status}</span>
        </div>
      </div>

      {/* Token Allocation */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-secondary mb-2">Token Allocation</h4>
        <div className="space-y-2">
          {sip.tokens.map((token) => (
            <div key={token.symbol} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${token.bgColor}`}></div>
                <span className="text-sm text-text-primary">{token.symbol}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">{token.percentage}%</span>
                <span className="text-sm font-medium text-text-primary">
                  {formatCurrency(sip.monthlyAmount * (token.percentage / 100))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance */}
      <div className="mb-4 p-3 bg-surface-secondary/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Total Invested</span>
          <span className="text-sm font-medium text-text-primary">
            {formatCurrency(sip.totalInvested)}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Current Value</span>
          <span className="text-sm font-medium text-text-primary">
            {formatCurrency(sip.currentValue)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">P&L</span>
          <div className={`flex items-center space-x-1 ${sip.pnlPercentage >= 0 ? 'text-success' : 'text-error'}`}>
            <Icon name={sip.pnlPercentage >= 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span className="text-sm font-medium">
              {sip.pnlPercentage >= 0 ? '+' : ''}{sip.pnlPercentage.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Next Execution */}
      {sip.status === 'active' && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm text-text-primary">Next execution</span>
            </div>
            <span className="text-sm font-medium text-primary">{timeUntilNext}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          onClick={() => onViewDetails(sip)}
          className="flex-1 text-sm"
          iconName="Eye"
          iconPosition="left"
          iconSize={16}
        >
          Details
        </Button>
        
        {sip.status === 'active' ? (
          <Button
            variant="outline"
            onClick={() => onPause(sip.id)}
            className="flex-1 text-sm"
            iconName="Pause"
            iconPosition="left"
            iconSize={16}
          >
            Pause
          </Button>
        ) : sip.status === 'paused' ? (
          <Button
            variant="outline"
            onClick={() => onResume(sip.id)}
            className="flex-1 text-sm"
            iconName="Play"
            iconPosition="left"
            iconSize={16}
          >
            Resume
          </Button>
        ) : null}
        
        <Button
          variant="ghost"
          onClick={() => onCancel(sip.id)}
          className="text-error hover:bg-error/10"
          iconName="Trash2"
          iconSize={16}
        />
      </div>
    </div>
  );
};

export default SIPCard;