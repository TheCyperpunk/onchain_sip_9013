import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CurrentPositions = ({ positions }) => {
  const [sortBy, setSortBy] = useState('value');
  const [sortOrder, setSortOrder] = useState('desc');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (percentage) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  const formatTokenAmount = (amount, symbol) => {
    return `${amount.toFixed(6)} ${symbol}`;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedPositions = [...positions].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'token') {
      aValue = a.token.symbol;
      bValue = b.token.symbol;
    }
    
    if (typeof aValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const SortButton = ({ field, children }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="text-left justify-start p-2 font-medium text-text-secondary hover:text-text-primary"
      iconName={sortBy === field ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'}
      iconPosition="right"
      iconSize={14}
    >
      {children}
    </Button>
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-morphism rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Coins" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">Total Positions</span>
          </div>
          <p className="text-xl font-semibold text-text-primary">{positions.length}</p>
        </div>
        
        <div className="glass-morphism rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Total Value</span>
          </div>
          <p className="text-xl font-semibold text-text-primary">
            {formatCurrency(positions.reduce((sum, pos) => sum + pos.currentValue, 0))}
          </p>
        </div>
        
        <div className="glass-morphism rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Percent" size={16} className="text-accent" />
            <span className="text-sm text-text-secondary">Avg. Growth</span>
          </div>
          <p className="text-xl font-semibold text-success">
            {formatPercentage(positions.reduce((sum, pos) => sum + pos.growthPercentage, 0) / positions.length)}
          </p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block glass-morphism rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="text-left p-4">
                  <SortButton field="token">Token</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton field="amount">Holdings</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton field="investedAmount">Invested</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton field="currentValue">Current Value</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton field="growthPercentage">Growth</SortButton>
                </th>
                <th className="text-left p-4">
                  <SortButton field="unrealizedPnL">P&L</SortButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPositions.map((position) => (
                <tr key={position.id} className="border-t border-border hover:bg-surface-secondary/50 transition-smooth">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={position.token.icon}
                        alt={position.token.name}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                      <div>
                        <p className="font-medium text-text-primary">{position.token.symbol}</p>
                        <p className="text-sm text-text-secondary">{position.token.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-data text-text-primary">
                      {formatTokenAmount(position.amount, position.token.symbol)}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-text-primary">{formatCurrency(position.investedAmount)}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-text-primary">{formatCurrency(position.currentValue)}</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      position.growthPercentage >= 0 
                        ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                    }`}>
                      <Icon 
                        name={position.growthPercentage >= 0 ? "TrendingUp" : "TrendingDown"} 
                        size={12} 
                        className="mr-1" 
                      />
                      {formatPercentage(position.growthPercentage)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`font-medium ${
                      position.unrealizedPnL >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {formatCurrency(position.unrealizedPnL)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {sortedPositions.map((position) => (
          <div key={position.id} className="glass-morphism rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={position.token.icon}
                  alt={position.token.name}
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <div>
                  <p className="font-medium text-text-primary">{position.token.symbol}</p>
                  <p className="text-sm text-text-secondary">{position.token.name}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                position.growthPercentage >= 0 
                  ? 'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                <Icon 
                  name={position.growthPercentage >= 0 ? "TrendingUp" : "TrendingDown"} 
                  size={12} 
                  className="mr-1" 
                />
                {formatPercentage(position.growthPercentage)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-secondary mb-1">Holdings</p>
                <p className="font-data text-sm text-text-primary">
                  {formatTokenAmount(position.amount, position.token.symbol)}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Invested</p>
                <p className="text-sm text-text-primary">{formatCurrency(position.investedAmount)}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Current Value</p>
                <p className="text-sm text-text-primary">{formatCurrency(position.currentValue)}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">P&L</p>
                <p className={`text-sm font-medium ${
                  position.unrealizedPnL >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {formatCurrency(position.unrealizedPnL)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentPositions;