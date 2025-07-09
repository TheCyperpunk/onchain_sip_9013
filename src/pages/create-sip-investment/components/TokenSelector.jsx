import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const TokenSelector = ({ selectedTokens, onTokenSelect, onAllocationChange }) => {
  const [allocations, setAllocations] = useState({});

  const supportedTokens = [
    {
      id: 'BTC',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: 'Bitcoin',
      price: 43250.75,
      change: 2.45,
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'ETH',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Zap',
      price: 2680.32,
      change: -1.23,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'BNB',
      name: 'BNB Chain',
      symbol: 'BNB',
      icon: 'Triangle',
      price: 315.89,
      change: 3.67,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 'SOL',
      name: 'Solana',
      symbol: 'SOL',
      icon: 'Sun',
      price: 98.45,
      change: 5.12,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const handleTokenToggle = (tokenId) => {
    const isSelected = selectedTokens.includes(tokenId);
    let newSelectedTokens;
    
    if (isSelected) {
      newSelectedTokens = selectedTokens.filter(id => id !== tokenId);
      const newAllocations = { ...allocations };
      delete newAllocations[tokenId];
      setAllocations(newAllocations);
      onAllocationChange(newAllocations);
    } else {
      newSelectedTokens = [...selectedTokens, tokenId];
      const defaultAllocation = selectedTokens.length === 0 ? 100 : Math.floor(100 / (selectedTokens.length + 1));
      const newAllocations = { ...allocations, [tokenId]: defaultAllocation };
      setAllocations(newAllocations);
      onAllocationChange(newAllocations);
    }
    
    onTokenSelect(newSelectedTokens);
  };

  const handleAllocationChange = (tokenId, value) => {
    const newAllocations = { ...allocations, [tokenId]: Math.min(100, Math.max(0, value)) };
    setAllocations(newAllocations);
    onAllocationChange(newAllocations);
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, value) => sum + value, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Select Tokens</h3>
        <p className="text-sm text-text-secondary mb-4">
          Choose the cryptocurrencies you want to invest in through your SIP
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {supportedTokens.map((token) => {
          const isSelected = selectedTokens.includes(token.id);
          return (
            <button
              key={token.id}
              onClick={() => handleTokenToggle(token.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-elevation-2' 
                  : 'border-border hover:border-border-hover bg-surface hover:bg-surface-secondary'
                }
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${token.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={token.icon} size={20} color="white" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{token.symbol}</div>
                    <div className="text-sm text-text-secondary">{token.name}</div>
                  </div>
                </div>
                {isSelected && (
                  <Icon name="Check" size={20} className="text-primary" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-text-primary">
                  {formatPrice(token.price)}
                </div>
                <div className={`text-sm font-medium ${token.change >= 0 ? 'text-success' : 'text-error'}`}>
                  {token.change >= 0 ? '+' : ''}{token.change}%
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedTokens.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-text-primary">Allocation Percentage</h4>
            <div className={`text-sm font-medium ${getTotalAllocation() === 100 ? 'text-success' : 'text-warning'}`}>
              Total: {getTotalAllocation()}%
            </div>
          </div>
          
          <div className="space-y-4">
            {selectedTokens.map((tokenId) => {
              const token = supportedTokens.find(t => t.id === tokenId);
              return (
                <div key={tokenId} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 flex-1">
                    <div className={`w-6 h-6 bg-gradient-to-br ${token.color} rounded-md flex items-center justify-center`}>
                      <Icon name={token.icon} size={12} color="white" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{token.symbol}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={allocations[tokenId] || 0}
                      onChange={(e) => handleAllocationChange(tokenId, parseInt(e.target.value))}
                      className="w-24 h-2 bg-surface-secondary rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="w-12 text-right">
                      <span className="text-sm font-medium text-text-primary">
                        {allocations[tokenId] || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {getTotalAllocation() !== 100 && (
            <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center">
                <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
                <span className="text-sm text-warning">
                  Allocation must total 100%. Current total: {getTotalAllocation()}%
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenSelector;