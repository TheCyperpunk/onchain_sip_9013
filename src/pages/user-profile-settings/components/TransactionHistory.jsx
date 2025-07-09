import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransactionHistory = ({ transactions }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    type: 'all',
    token: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 10;

  const transactionTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'sip_created', label: 'SIP Created' },
    { value: 'sip_executed', label: 'SIP Executed' },
    { value: 'sip_paused', label: 'SIP Paused' },
    { value: 'sip_resumed', label: 'SIP Resumed' },
    { value: 'sip_cancelled', label: 'SIP Cancelled' },
    { value: 'withdrawal', label: 'Withdrawal' }
  ];

  const tokens = [
    { value: 'all', label: 'All Tokens' },
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'BNB', label: 'BNB (BNB)' },
    { value: 'SOL', label: 'Solana (SOL)' }
  ];

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getTransactionIcon = (type) => {
    const iconMap = {
      sip_created: 'Plus',
      sip_executed: 'ArrowRight',
      sip_paused: 'Pause',
      sip_resumed: 'Play',
      sip_cancelled: 'X',
      withdrawal: 'ArrowUp'
    };
    return iconMap[type] || 'Activity';
  };

  const getTransactionColor = (type) => {
    const colorMap = {
      sip_created: 'text-success',
      sip_executed: 'text-primary',
      sip_paused: 'text-warning',
      sip_resumed: 'text-success',
      sip_cancelled: 'text-error',
      withdrawal: 'text-accent'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', label: 'Completed' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending' },
      failed: { color: 'bg-error/10 text-error', label: 'Failed' }
    };
    
    const config = statusConfig[status] || statusConfig.completed;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
    setCurrentPage(1);
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...transactions];

    if (currentFilters.dateFrom) {
      filtered = filtered.filter(tx => new Date(tx.timestamp) >= new Date(currentFilters.dateFrom));
    }

    if (currentFilters.dateTo) {
      filtered = filtered.filter(tx => new Date(tx.timestamp) <= new Date(currentFilters.dateTo));
    }

    if (currentFilters.type !== 'all') {
      filtered = filtered.filter(tx => tx.type === currentFilters.type);
    }

    if (currentFilters.token !== 'all') {
      filtered = filtered.filter(tx => tx.token === currentFilters.token);
    }

    setFilteredTransactions(filtered);
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create CSV content
    const csvContent = [
      ['Date', 'Type', 'Token', 'Amount', 'Status', 'Transaction Hash'].join(','),
      ...filteredTransactions.map(tx => [
        formatDate(tx.timestamp),
        tx.type.replace('_', ' ').toUpperCase(),
        tx.token,
        tx.amount,
        tx.status.toUpperCase(),
        tx.hash
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `onchain-sip-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setIsExporting(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      dateFrom: '',
      dateTo: '',
      type: 'all',
      token: 'all'
    };
    setFilters(clearedFilters);
    applyFilters(clearedFilters);
    setCurrentPage(1);
  };

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass-morphism rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            Transaction Filters
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={clearFilters}
              iconName="RotateCcw"
              iconSize={16}
              className="text-text-secondary hover:text-text-primary"
            >
              Clear
            </Button>
            <Button
              variant="primary"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconSize={16}
              iconPosition="left"
            >
              Export CSV
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              From Date
            </label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              To Date
            </label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Transaction Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {transactionTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Token
            </label>
            <select
              value={filters.token}
              onChange={(e) => handleFilterChange('token', e.target.value)}
              className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {tokens.map(token => (
                <option key={token.value} value={token.value}>
                  {token.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block glass-morphism rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="text-left p-4 font-medium text-text-secondary">Date</th>
                <th className="text-left p-4 font-medium text-text-secondary">Type</th>
                <th className="text-left p-4 font-medium text-text-secondary">Token</th>
                <th className="text-left p-4 font-medium text-text-secondary">Amount</th>
                <th className="text-left p-4 font-medium text-text-secondary">Status</th>
                <th className="text-left p-4 font-medium text-text-secondary">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-t border-border hover:bg-surface-secondary/50 transition-smooth">
                  <td className="p-4">
                    <p className="text-text-primary">{formatDate(transaction.timestamp)}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getTransactionIcon(transaction.type)} 
                        size={16} 
                        className={getTransactionColor(transaction.type)}
                      />
                      <span className="text-text-primary capitalize">
                        {transaction.type.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-text-primary font-medium">{transaction.token}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-text-primary">{formatCurrency(transaction.amount)}</span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      onClick={() => window.open(`https://bscscan.com/tx/${transaction.hash}`, '_blank')}
                      className="text-primary hover:text-primary-400 font-data text-sm"
                      iconName="ExternalLink"
                      iconSize={14}
                      iconPosition="right"
                    >
                      {transaction.hash.slice(0, 8)}...
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedTransactions.map((transaction) => (
          <div key={transaction.id} className="glass-morphism rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getTransactionIcon(transaction.type)} 
                  size={16} 
                  className={getTransactionColor(transaction.type)}
                />
                <span className="text-text-primary font-medium capitalize">
                  {transaction.type.replace('_', ' ')}
                </span>
              </div>
              {getStatusBadge(transaction.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs text-text-secondary mb-1">Token</p>
                <p className="text-sm text-text-primary font-medium">{transaction.token}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Amount</p>
                <p className="text-sm text-text-primary">{formatCurrency(transaction.amount)}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <p className="text-xs text-text-secondary">{formatDate(transaction.timestamp)}</p>
              <Button
                variant="ghost"
                onClick={() => window.open(`https://bscscan.com/tx/${transaction.hash}`, '_blank')}
                className="text-primary hover:text-primary-400 font-data text-xs p-1"
                iconName="ExternalLink"
                iconSize={12}
                iconPosition="right"
              >
                {transaction.hash.slice(0, 8)}...
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconSize={16}
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "ghost"}
                onClick={() => setCurrentPage(page)}
                className="w-10 h-10"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconSize={16}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;