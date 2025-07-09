import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthenticationGate from '../../components/ui/AuthenticationGate';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SIPCard from './components/SIPCard';
import FilterBar from './components/FilterBar';
import ConfirmationModal from './components/ConfirmationModal';
import BulkActions from './components/BulkActions';
import EmptyState from './components/EmptyState';

const ManageSIPInvestments = () => {
  const navigate = useNavigate();
  const [sips, setSips] = useState([]);
  const [filteredSips, setFilteredSips] = useState([]);
  const [selectedSips, setSelectedSips] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    token: 'all',
    frequency: 'all',
    performance: 'all'
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    action: null,
    sipData: null
  });

  // Mock SIP data
  const mockSIPs = [
    {
      id: 'sip_001',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'active',
      frequency: 'Weekly',
      amountPerExecution: 100,
      totalInvested: 1200,
      currentValue: 1380.50,
      performance: 15.04,
      executionCount: 12,
      nextExecution: '2024-02-01T10:30:00Z',
      tokens: [
        {
          symbol: 'BTC',
          allocation: 50,
          amount: 0.0234,
          value: 690.25
        },
        {
          symbol: 'ETH',
          allocation: 30,
          amount: 0.1876,
          value: 414.15
        },
        {
          symbol: 'BNB',
          allocation: 20,
          amount: 0.8432,
          value: 276.10
        }
      ]
    },
    {
      id: 'sip_002',
      createdAt: '2024-01-20T14:15:00Z',
      status: 'paused',
      frequency: 'Daily',
      amountPerExecution: 25,
      totalInvested: 500,
      currentValue: 465.80,
      performance: -6.84,
      executionCount: 20,
      nextExecution: null,
      tokens: [
        {
          symbol: 'ETH',
          allocation: 60,
          amount: 0.1245,
          value: 279.48
        },
        {
          symbol: 'SOL',
          allocation: 40,
          amount: 2.1567,
          value: 186.32
        }
      ]
    },
    {
      id: 'sip_003',
      createdAt: '2024-01-25T09:45:00Z',
      status: 'active',
      frequency: 'Monthly',
      amountPerExecution: 500,
      totalInvested: 1000,
      currentValue: 1125.30,
      performance: 12.53,
      executionCount: 2,
      nextExecution: '2024-02-25T09:45:00Z',
      tokens: [
        {
          symbol: 'BTC',
          allocation: 70,
          amount: 0.0267,
          value: 787.71
        },
        {
          symbol: 'BNB',
          allocation: 30,
          amount: 1.0234,
          value: 337.59
        }
      ]
    }
  ];

  useEffect(() => {
    const loadSIPs = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSips(mockSIPs);
        setFilteredSips(mockSIPs);
      } catch (error) {
        toast.error('Failed to load SIP investments');
      } finally {
        setIsLoading(false);
      }
    };

    loadSIPs();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [sips, filters, sortBy, sortOrder]);

  const applyFiltersAndSort = () => {
    let filtered = [...sips];

    // Apply filters
    if (filters.status !== 'all') {
      filtered = filtered.filter(sip => sip.status === filters.status);
    }

    if (filters.token !== 'all') {
      filtered = filtered.filter(sip => 
        sip.tokens.some(token => token.symbol === filters.token)
      );
    }

    if (filters.frequency !== 'all') {
      filtered = filtered.filter(sip => sip.frequency === filters.frequency);
    }

    if (filters.performance !== 'all') {
      if (filters.performance === 'positive') {
        filtered = filtered.filter(sip => sip.performance > 0);
      } else if (filters.performance === 'negative') {
        filtered = filtered.filter(sip => sip.performance < 0);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'createdAt' || sortBy === 'nextExecution') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredSips(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleSIPAction = (action, sipId) => {
    const sipData = sips.find(sip => sip.id === sipId);
    setConfirmationModal({
      isOpen: true,
      action,
      sipData
    });
  };

  const handleConfirmAction = async (sipId) => {
    const { action } = confirmationModal;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSips(prevSips => 
        prevSips.map(sip => {
          if (sip.id === sipId) {
            switch (action) {
              case 'pause':
                return { ...sip, status: 'paused', nextExecution: null };
              case 'resume':
                return { 
                  ...sip, 
                  status: 'active', 
                  nextExecution: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                };
              case 'cancel':
                return { ...sip, status: 'cancelled', nextExecution: null };
              case 'withdraw':
                // In real app, this would update the token amounts
                return sip;
              default:
                return sip;
            }
          }
          return sip;
        })
      );

      const actionMessages = {
        pause: 'SIP investment paused successfully',
        resume: 'SIP investment resumed successfully',
        cancel: 'SIP investment cancelled successfully',
        withdraw: 'Funds withdrawn successfully'
      };

      toast.success(actionMessages[action]);
    } catch (error) {
      toast.error(`Failed to ${action} SIP investment`);
    }
  };

  const handleBulkAction = async (action, selectedSipIds) => {
    try {
      // Simulate bulk API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      selectedSipIds.forEach(sipId => {
        handleConfirmAction(sipId);
      });
      
      setSelectedSips([]);
      toast.success(`Bulk ${action} completed successfully`);
    } catch (error) {
      toast.error(`Failed to perform bulk ${action}`);
    }
  };

  const handleSipSelection = (sipId, isSelected) => {
    if (isSelected) {
      setSelectedSips(prev => [...prev, sips.find(sip => sip.id === sipId)]);
    } else {
      setSelectedSips(prev => prev.filter(sip => sip.id !== sipId));
    }
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      status: 'all',
      token: 'all',
      frequency: 'all',
      performance: 'all'
    };
    setFilters(defaultFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');
  const activeSipsCount = sips.filter(sip => sip.status === 'active').length;

  if (isLoading) {
    return (
      <AuthenticationGate requireAuth={true}>
        <div className="min-h-screen bg-background">
          <GlobalHeader />
          <div className="pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-4" />
                  <p className="text-text-secondary">Loading your SIP investments...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticationGate>
    );
  }

  return (
    <AuthenticationGate requireAuth={true}>
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
              <button
                onClick={() => navigate('/investment-dashboard')}
                className="hover:text-text-primary transition-smooth"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-text-primary">Manage SIPs</span>
            </nav>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary font-heading mb-2">
                  Manage SIP Investments
                </h1>
                <p className="text-text-secondary">
                  Control your automated investment strategies and track performance
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center space-x-1 bg-surface-secondary rounded-lg p-1">
                  <Button
                    variant={viewMode === 'cards' ? 'primary' : 'ghost'}
                    onClick={() => setViewMode('cards')}
                    className="p-2"
                    iconName="Grid3X3"
                    iconSize={16}
                    title="Card view"
                  />
                  <Button
                    variant={viewMode === 'table' ? 'primary' : 'ghost'}
                    onClick={() => setViewMode('table')}
                    className="p-2"
                    iconName="List"
                    iconSize={16}
                    title="Table view"
                  />
                </div>

                <Button
                  variant="primary"
                  onClick={() => navigate('/create-sip-investment')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create SIP
                </Button>
              </div>
            </div>

            {/* Filter Bar */}
            <FilterBar
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              totalSIPs={sips.length}
              activeSIPs={activeSipsCount}
            />

            {/* Content */}
            {filteredSips.length === 0 ? (
              <EmptyState 
                hasFilters={hasActiveFilters}
                onClearFilters={clearAllFilters}
              />
            ) : (
              <div className="mt-8">
                {viewMode === 'cards' ? (
                  /* Card View */
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSips.map((sip) => (
                      <SIPCard
                        key={sip.id}
                        sip={sip}
                        onPause={(id) => handleSIPAction('pause', id)}
                        onResume={(id) => handleSIPAction('resume', id)}
                        onWithdraw={(id) => handleSIPAction('withdraw', id)}
                        onCancel={(id) => handleSIPAction('cancel', id)}
                        isMobile={true}
                      />
                    ))}
                  </div>
                ) : (
                  /* Table View */
                  <div className="glass-morphism rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-surface-secondary">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                              />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Created / Frequency
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Tokens
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Invested
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Current Value
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Next Execution
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {filteredSips.map((sip) => (
                            <SIPCard
                              key={sip.id}
                              sip={sip}
                              onPause={(id) => handleSIPAction('pause', id)}
                              onResume={(id) => handleSIPAction('resume', id)}
                              onWithdraw={(id) => handleSIPAction('withdraw', id)}
                              onCancel={(id) => handleSIPAction('cancel', id)}
                              isMobile={false}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bulk Actions */}
        <BulkActions
          selectedSIPs={selectedSips}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedSips([])}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={() => setConfirmationModal({ isOpen: false, action: null, sipData: null })}
          action={confirmationModal.action}
          sipData={confirmationModal.sipData}
          onConfirm={handleConfirmAction}
        />
      </div>
    </AuthenticationGate>
  );
};

export default ManageSIPInvestments;