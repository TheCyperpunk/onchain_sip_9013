import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SIPCard = ({ sip, onPause, onResume, onWithdraw, onCancel, isMobile = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'paused':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'cancelled':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-text-secondary bg-surface-secondary border-border';
    }
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

  const calculateTimeRemaining = (nextExecution) => {
    const now = new Date();
    const next = new Date(nextExecution);
    const diff = next - now;
    
    if (diff <= 0) return 'Executing soon...';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (isMobile) {
    return (
      <div className="glass-morphism rounded-xl border border-border overflow-hidden">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(sip.status)}`}>
                {sip.status.charAt(0).toUpperCase() + sip.status.slice(1)}
              </span>
              <span className="text-xs text-text-muted">
                {sip.frequency}
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-surface-secondary rounded-lg transition-smooth"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary"
              />
            </button>
          </div>

          {/* Token Allocation */}
          <div className="flex items-center space-x-2 mb-3">
            {sip.tokens.map((token, index) => (
              <div key={token.symbol} className="flex items-center space-x-1">
                <Image
                  src={getTokenIcon(token.symbol)}
                  alt={token.symbol}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-sm font-medium text-text-primary">
                  {token.allocation}%
                </span>
                {index < sip.tokens.length - 1 && (
                  <span className="text-text-muted">•</span>
                )}
              </div>
            ))}
          </div>

          {/* Value and Performance */}
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-text-secondary mb-1">Total Invested</p>
              <p className="text-sm font-semibold text-text-primary">
                {formatCurrency(sip.totalInvested)}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">Current Value</p>
              <div className="flex items-center space-x-1">
                <p className="text-sm font-semibold text-text-primary">
                  {formatCurrency(sip.currentValue)}
                </p>
                <span className={`text-xs ${sip.performance >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatPercentage(sip.performance)}
                </span>
              </div>
            </div>
          </div>

          {/* Next Execution */}
          {sip.status === 'active' && (
            <div className="flex items-center justify-between p-2 bg-primary/5 border border-primary/10 rounded-lg mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-primary" />
                <span className="text-xs text-text-secondary">Next execution</span>
              </div>
              <span className="text-xs font-medium text-primary">
                {calculateTimeRemaining(sip.nextExecution)}
              </span>
            </div>
          )}

          {/* Expanded Content */}
          {isExpanded && (
            <div className="border-t border-border pt-3 space-y-3">
              {/* Detailed Allocation */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Token Breakdown</h4>
                <div className="space-y-2">
                  {sip.tokens.map((token) => (
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
                          {token.allocation}%
                        </p>
                        <p className="text-xs text-text-secondary">
                          {formatCurrency(token.value)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SIP Details */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">SIP Details</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-text-secondary">Created</p>
                    <p className="text-text-primary font-medium">
                      {new Date(sip.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Frequency</p>
                    <p className="text-text-primary font-medium">{sip.frequency}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Amount per execution</p>
                    <p className="text-text-primary font-medium">
                      {formatCurrency(sip.amountPerExecution)}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Executions</p>
                    <p className="text-text-primary font-medium">
                      {sip.executionCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-3">
            {sip.status === 'active' ? (
              <Button
                variant="warning"
                onClick={() => onPause(sip.id)}
                className="flex-1"
                iconName="Pause"
                iconSize={14}
              >
                Pause
              </Button>
            ) : sip.status === 'paused' ? (
              <Button
                variant="success"
                onClick={() => onResume(sip.id)}
                className="flex-1"
                iconName="Play"
                iconSize={14}
              >
                Resume
              </Button>
            ) : null}
            
            <Button
              variant="primary"
              onClick={() => onWithdraw(sip.id)}
              className="flex-1"
              iconName="ArrowUpRight"
              iconSize={14}
            >
              Withdraw
            </Button>
            
            <Button
              variant="danger"
              onClick={() => onCancel(sip.id)}
              className="px-3"
              iconName="Trash2"
              iconSize={14}
            />
          </div>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <tr className="border-b border-border hover:bg-surface-secondary/30 transition-smooth">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
          />
          <div>
            <p className="text-sm font-medium text-text-primary">
              {new Date(sip.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-text-secondary">{sip.frequency}</p>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          {sip.tokens.map((token, index) => (
            <div key={token.symbol} className="flex items-center space-x-1">
              <Image
                src={getTokenIcon(token.symbol)}
                alt={token.symbol}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-sm text-text-primary">{token.allocation}%</span>
              {index < sip.tokens.length - 1 && (
                <span className="text-text-muted mx-1">•</span>
              )}
            </div>
          ))}
        </div>
      </td>
      
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(sip.status)}`}>
          {sip.status.charAt(0).toUpperCase() + sip.status.slice(1)}
        </span>
      </td>
      
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-text-primary">
          {formatCurrency(sip.totalInvested)}
        </p>
        <p className="text-xs text-text-secondary">
          {sip.executionCount} executions
        </p>
      </td>
      
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-text-primary">
          {formatCurrency(sip.currentValue)}
        </p>
        <p className={`text-xs ${sip.performance >= 0 ? 'text-success' : 'text-error'}`}>
          {formatPercentage(sip.performance)}
        </p>
      </td>
      
      <td className="px-6 py-4">
        {sip.status === 'active' ? (
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-primary" />
            <span className="text-xs text-primary">
              {calculateTimeRemaining(sip.nextExecution)}
            </span>
          </div>
        ) : (
          <span className="text-xs text-text-muted">-</span>
        )}
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          {sip.status === 'active' ? (
            <Button
              variant="ghost"
              onClick={() => onPause(sip.id)}
              className="p-1"
              iconName="Pause"
              iconSize={16}
              title="Pause SIP"
            />
          ) : sip.status === 'paused' ? (
            <Button
              variant="ghost"
              onClick={() => onResume(sip.id)}
              className="p-1"
              iconName="Play"
              iconSize={16}
              title="Resume SIP"
            />
          ) : null}
          
          <Button
            variant="ghost"
            onClick={() => onWithdraw(sip.id)}
            className="p-1"
            iconName="ArrowUpRight"
            iconSize={16}
            title="Withdraw funds"
          />
          
          <Button
            variant="ghost"
            onClick={() => onCancel(sip.id)}
            className="p-1 text-error hover:text-error hover:bg-error/10"
            iconName="Trash2"
            iconSize={16}
            title="Cancel SIP"
          />
        </div>
      </td>
    </tr>
  );
};

export default SIPCard;