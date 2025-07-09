import React from 'react';
import Icon from '../../../components/AppIcon';

const WalletSummaryCard = ({ title, value, change, changeType, icon, iconColor, isLoading = false }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  if (isLoading) {
    return (
      <div className="glass-morphism rounded-xl p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 bg-surface-secondary rounded-lg"></div>
          <div className="w-16 h-4 bg-surface-secondary rounded"></div>
        </div>
        <div className="w-24 h-8 bg-surface-secondary rounded mb-2"></div>
        <div className="w-20 h-4 bg-surface-secondary rounded"></div>
      </div>
    );
  }

  return (
    <div className="glass-morphism rounded-xl p-6 hover:bg-surface/30 transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
          <Icon name={icon} size={20} color="white" strokeWidth={2} />
        </div>
        <div className="text-xs text-text-muted font-medium uppercase tracking-wide">
          {title}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-semibold text-text-primary font-heading">
          {value}
        </div>
        
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span>{change}</span>
            <span className="text-text-muted">24h</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSummaryCard;