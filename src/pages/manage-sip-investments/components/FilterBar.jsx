import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterBar = ({ onFilterChange, onSortChange, totalSIPs, activeSIPs }) => {
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    token: 'all',
    frequency: 'all',
    performance: 'all'
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const tokenOptions = [
    { value: 'all', label: 'All Tokens' },
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'BNB', label: 'BNB Chain (BNB)' },
    { value: 'SOL', label: 'Solana (SOL)' }
  ];

  const frequencyOptions = [
    { value: 'all', label: 'All Frequencies' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' }
  ];

  const performanceOptions = [
    { value: 'all', label: 'All Performance' },
    { value: 'positive', label: 'Positive Returns' },
    { value: 'negative', label: 'Negative Returns' }
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Creation Date' },
    { value: 'totalInvested', label: 'Total Invested' },
    { value: 'currentValue', label: 'Current Value' },
    { value: 'performance', label: 'Performance' },
    { value: 'nextExecution', label: 'Next Execution' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (newSortBy) => {
    let newSortOrder = 'desc';
    if (sortBy === newSortBy && sortOrder === 'desc') {
      newSortOrder = 'asc';
    }
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    onSortChange(newSortBy, newSortOrder);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Implement search functionality
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      status: 'all',
      token: 'all',
      frequency: 'all',
      performance: 'all'
    };
    setActiveFilters(defaultFilters);
    setSearchQuery('');
    onFilterChange(defaultFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all').length;
  };

  return (
    <div className="space-y-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Stats */}
        <div className="flex items-center space-x-6">
          <div>
            <p className="text-sm text-text-secondary">Total SIPs</p>
            <p className="text-lg font-semibold text-text-primary">{totalSIPs}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Active SIPs</p>
            <p className="text-lg font-semibold text-success">{activeSIPs}</p>
          </div>
        </div>

        {/* Search and Filter Toggle */}
        <div className="flex items-center space-x-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <Input
              type="search"
              placeholder="Search SIPs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          
          <Button
            variant={showFilters ? "primary" : "ghost"}
            onClick={() => setShowFilters(!showFilters)}
            iconName="Filter"
            iconSize={16}
            className="relative"
          >
            <span className="hidden sm:inline">Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="glass-morphism rounded-xl p-4 border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={activeFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Token Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Token
              </label>
              <select
                value={activeFilters.token}
                onChange={(e) => handleFilterChange('token', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {tokenOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Frequency Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Frequency
              </label>
              <select
                value={activeFilters.frequency}
                onChange={(e) => handleFilterChange('frequency', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Performance Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Performance
              </label>
              <select
                value={activeFilters.performance}
                onChange={(e) => handleFilterChange('performance', e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {performanceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-text-primary">
                Sort by:
              </label>
              <div className="flex items-center space-x-2">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "primary" : "ghost"}
                    onClick={() => handleSortChange(option.value)}
                    className="text-xs"
                    iconName={sortBy === option.value ? (sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown') : undefined}
                    iconSize={12}
                    iconPosition="right"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                iconName="X"
                iconSize={14}
                className="text-text-secondary hover:text-text-primary"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;