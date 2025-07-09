import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TransactionRow = ({ transaction, isMobile = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getTypeIcon = () => {
    switch (transaction.type) {
      case 'sip_execution':
        return 'Repeat';
      case 'manual_buy':
        return 'ShoppingCart';
      case 'withdrawal':
        return 'ArrowUpRight';
      case 'deposit':
        return 'ArrowDownLeft';
      default:
        return 'Activity';
    }
  };

  const getTypeColor = () => {
    switch (transaction.type) {
      case 'sip_execution':
        return 'text-primary';
      case 'manual_buy':
        return 'text-accent';
      case 'withdrawal':
        return 'text-error';
      case 'deposit':
        return 'text-success';
      default:
        return 'text-text-secondary';
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

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isMobile) {
    return (
      <div className="glass-morphism rounded-lg p-4 mb-3">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center ${getTypeColor()}`}>
              <Icon name={getTypeIcon()} size={16} />
            </div>
            <div>
              <div className="font-medium text-text-primary text-sm">
                {transaction.description}
              </div>
              <div className="text-xs text-text-secondary">
                {formatDate(transaction.timestamp)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="font-medium text-text-primary text-sm">
                {formatCurrency(transaction.amount)}
              </div>
              <div className={`flex items-center space-x-1 text-xs ${getStatusColor()}`}>
                <Icon name={getStatusIcon()} size={12} />
                <span className="capitalize">{transaction.status}</span>
              </div>
            </div>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-text-secondary"
            />
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Token:</span>
                <div className="font-medium text-text-primary">{transaction.token}</div>
              </div>
              <div>
                <span className="text-text-secondary">Amount:</span>
                <div className="font-medium text-text-primary">
                  {transaction.tokenAmount} {transaction.token}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Price:</span>
                <div className="font-medium text-text-primary">
                  {formatCurrency(transaction.price)}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Gas Fee:</span>
                <div className="font-medium text-text-primary">
                  {formatCurrency(transaction.gasFee)}
                </div>
              </div>
            </div>
            
            {transaction.txHash && (
              <div className="pt-2 border-t border-border">
                <span className="text-text-secondary text-sm">Transaction Hash:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-data text-sm text-text-primary">
                    {formatAddress(transaction.txHash)}
                  </span>
                  <button
                    onClick={() => window.open(`https://bscscan.com/tx/${transaction.txHash}`, '_blank')}
                    className="text-primary hover:text-primary-400 transition-smooth"
                  >
                    <Icon name="ExternalLink" size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <tr className="hover:bg-surface-secondary/30 transition-smooth">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center ${getTypeColor()}`}>
            <Icon name={getTypeIcon()} size={16} />
          </div>
          <div>
            <div className="font-medium text-text-primary text-sm">
              {transaction.description}
            </div>
            <div className="text-xs text-text-secondary">
              {formatDate(transaction.timestamp)}
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <div className={`w-6 h-6 rounded-full ${transaction.tokenColor} flex items-center justify-center text-xs font-medium text-white`}>
            {transaction.token.slice(0, 2)}
          </div>
          <span className="text-sm font-medium text-text-primary">{transaction.token}</span>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
        {transaction.tokenAmount} {transaction.token}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
        {formatCurrency(transaction.amount)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
        {formatCurrency(transaction.price)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
          <Icon name={getStatusIcon()} size={14} />
          <span className="text-sm font-medium capitalize">{transaction.status}</span>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        {transaction.txHash && (
          <button
            onClick={() => window.open(`https://bscscan.com/tx/${transaction.txHash}`, '_blank')}
            className="flex items-center space-x-1 text-primary hover:text-primary-400 transition-smooth"
          >
            <span className="font-data text-sm">{formatAddress(transaction.txHash)}</span>
            <Icon name="ExternalLink" size={14} />
          </button>
        )}
      </td>
    </tr>
  );
};

export default TransactionRow;