import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Button from '../../components/ui/Button';
import AuthenticationGate from '../../components/ui/AuthenticationGate';
import WalletSummaryCard from './components/WalletSummaryCard';
import SIPCard from './components/SIPCard';
import TransactionRow from './components/TransactionRow';
import TabNavigation from './components/TabNavigation';
import FilterControls from './components/FilterControls';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';

const InvestmentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active-sips');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedToken, setSelectedToken] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Mock data
  const walletSummary = {
    totalPortfolioValue: 15420.50,
    totalPortfolioChange: 8.5,
    totalPortfolioChangeType: 'positive',
    activeSIPs: 3,
    activeSIPsChange: 0,
    activeSIPsChangeType: 'neutral',
    monthlyInvestment: 1200.00,
    monthlyInvestmentChange: 12.5,
    monthlyInvestmentChangeType: 'positive'
  };

  const mockSIPs = [
    {
      id: 1,
      tokens: [
        { symbol: 'BTC', percentage: 50, bgColor: 'bg-orange-500', textColor: 'text-white' },
        { symbol: 'ETH', percentage: 30, bgColor: 'bg-blue-500', textColor: 'text-white' },
        { symbol: 'BNB', percentage: 20, bgColor: 'bg-yellow-500', textColor: 'text-white' }
      ],
      monthlyAmount: 500.00,
      totalInvested: 2500.00,
      currentValue: 2750.00,
      pnlPercentage: 10.0,
      status: 'active',
      nextExecution: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      frequency: 'monthly',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      tokens: [
        { symbol: 'ETH', percentage: 60, bgColor: 'bg-blue-500', textColor: 'text-white' },
        { symbol: 'SOL', percentage: 40, bgColor: 'bg-purple-500', textColor: 'text-white' }
      ],
      monthlyAmount: 400.00,
      totalInvested: 1600.00,
      currentValue: 1520.00,
      pnlPercentage: -5.0,
      status: 'active',
      nextExecution: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      frequency: 'weekly',
      createdAt: new Date('2024-02-01')
    },
    {
      id: 3,
      tokens: [
        { symbol: 'BTC', percentage: 100, bgColor: 'bg-orange-500', textColor: 'text-white' }
      ],
      monthlyAmount: 300.00,
      totalInvested: 900.00,
      currentValue: 945.00,
      pnlPercentage: 5.0,
      status: 'paused',
      nextExecution: null,
      frequency: 'monthly',
      createdAt: new Date('2024-03-01')
    }
  ];

  const mockTransactions = [
    {
      id: 1,
      type: 'sip_execution',
      description: 'BTC + ETH + BNB SIP Execution',
      token: 'BTC',
      tokenAmount: 0.0125,
      amount: 250.00,
      price: 20000.00,
      gasFee: 2.50,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
      tokenColor: 'bg-orange-500'
    },
    {
      id: 2,
      type: 'sip_execution',
      description: 'BTC + ETH + BNB SIP Execution',
      token: 'ETH',
      tokenAmount: 0.075,
      amount: 150.00,
      price: 2000.00,
      gasFee: 1.80,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      txHash: '0x2345678901bcdef12345678901bcdef123456789',
      tokenColor: 'bg-blue-500'
    },
    {
      id: 3,
      type: 'sip_execution',
      description: 'ETH + SOL SIP Execution',
      token: 'ETH',
      tokenAmount: 0.12,
      amount: 240.00,
      price: 2000.00,
      gasFee: 2.20,
      status: 'pending',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      txHash: '0x3456789012cdef123456789012cdef1234567890',
      tokenColor: 'bg-blue-500'
    },
    {
      id: 4,
      type: 'manual_buy',
      description: 'Manual BTC Purchase',
      token: 'BTC',
      tokenAmount: 0.025,
      amount: 500.00,
      price: 20000.00,
      gasFee: 3.50,
      status: 'completed',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      txHash: '0x4567890123def1234567890123def12345678901',
      tokenColor: 'bg-orange-500'
    },
    {
      id: 5,
      type: 'withdrawal',
      description: 'ETH Withdrawal',
      token: 'ETH',
      tokenAmount: 0.5,
      amount: 1000.00,
      price: 2000.00,
      gasFee: 5.00,
      status: 'failed',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      txHash: '0x567890124ef123456789024ef123456789012345',
      tokenColor: 'bg-blue-500'
    }
  ];

  const availableTokens = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'BNB' },
    { symbol: 'SOL', name: 'Solana' }
  ];

  const tabs = [
    {
      id: 'active-sips',
      label: 'Active SIPs',
      icon: 'Repeat',
      count: mockSIPs.filter(sip => sip.status === 'active').length
    },
    {
      id: 'transaction-history',
      label: 'Transaction History',
      icon: 'History',
      count: mockTransactions.length
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateSIP = () => {
    navigate('/create-sip-investment');
  };

  const handleManageSIPs = () => {
    navigate('/manage-sip-investments');
  };

  const handlePauseSIP = (sipId) => {
    console.log('Pausing SIP:', sipId);
    // Implementation would update SIP status
  };

  const handleResumeSIP = (sipId) => {
    console.log('Resuming SIP:', sipId);
    // Implementation would update SIP status
  };

  const handleCancelSIP = (sipId) => {
    console.log('Cancelling SIP:', sipId);
    // Implementation would cancel SIP
  };

  const handleViewSIPDetails = (sip) => {
    console.log('Viewing SIP details:', sip);
    navigate('/manage-sip-investments', { state: { selectedSIP: sip.id } });
  };

  const handleClearFilters = () => {
    setSelectedToken('all');
    setDateRange('all');
    setSortBy('newest');
  };

  const filterTransactions = (transactions) => {
    let filtered = [...transactions];

    // Filter by token
    if (selectedToken !== 'all') {
      filtered = filtered.filter(tx => tx.token === selectedToken);
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const days = parseInt(dateRange.replace('d', ''));
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(tx => new Date(tx.timestamp) >= cutoffDate);
    }

    // Sort transactions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'amount_high':
          return b.amount - a.amount;
        case 'amount_low':
          return a.amount - b.amount;
        case 'newest':
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });

    return filtered;
  };

  const filteredTransactions = filterTransactions(mockTransactions);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (isLoading) {
    return (
      <AuthenticationGate requireAuth={true}>
        <div className="min-h-screen bg-background pt-16">
          <LoadingState message="Loading your investment dashboard..." />
        </div>
      </AuthenticationGate>
    );
  }

  return (
    <AuthenticationGate requireAuth={true}>
      <Helmet>
        <title>Investment Dashboard - OnChain SIP</title>
        <meta name="description" content="Monitor your DeFi SIP investments, track portfolio performance, and manage automated cryptocurrency investments on BNB Chain." />
      </Helmet>

      <div className="min-h-screen bg-background pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary font-heading">
                  Investment Dashboard
                </h1>
                <p className="text-text-secondary mt-2">
                  Monitor your DeFi SIP investments and portfolio performance
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  variant="outline"
                  onClick={handleManageSIPs}
                  iconName="Settings"
                  iconPosition="left"
                  className="sm:w-auto"
                >
                  Manage SIPs
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreateSIP}
                  iconName="Plus"
                  iconPosition="left"
                  className="sm:w-auto"
                >
                  Create New SIP
                </Button>
              </div>
            </div>
          </div>

          {/* Wallet Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <WalletSummaryCard
              title="Total Portfolio"
              value={formatCurrency(walletSummary.totalPortfolioValue)}
              change={`${walletSummary.totalPortfolioChange >= 0 ? '+' : ''}${walletSummary.totalPortfolioChange}%`}
              changeType={walletSummary.totalPortfolioChangeType}
              icon="TrendingUp"
              iconColor="bg-gradient-to-br from-primary to-secondary"
            />
            
            <WalletSummaryCard
              title="Active SIPs"
              value={walletSummary.activeSIPs.toString()}
              change={walletSummary.activeSIPsChange > 0 ? `+${walletSummary.activeSIPsChange}` : null}
              changeType={walletSummary.activeSIPsChangeType}
              icon="Repeat"
              iconColor="bg-gradient-to-br from-accent to-emerald-600"
            />
            
            <WalletSummaryCard
              title="Monthly Investment"
              value={formatCurrency(walletSummary.monthlyInvestment)}
              change={`${walletSummary.monthlyInvestmentChange >= 0 ? '+' : ''}${walletSummary.monthlyInvestmentChange}%`}
              changeType={walletSummary.monthlyInvestmentChangeType}
              icon="Calendar"
              iconColor="bg-gradient-to-br from-secondary to-purple-600"
            />
          </div>

          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs}
          />

          {/* Active SIPs Tab */}
          {activeTab === 'active-sips' && (
            <div>
              {mockSIPs.length === 0 ? (
                <EmptyState
                  type="sips"
                  title="No Active SIPs"
                  description="You haven't created any SIP investments yet. Start your automated investment journey by creating your first SIP."
                  actionLabel="Create Your First SIP"
                  onAction={handleCreateSIP}
                  icon="Repeat"
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockSIPs.map((sip) => (
                    <SIPCard
                      key={sip.id}
                      sip={sip}
                      onPause={handlePauseSIP}
                      onResume={handleResumeSIP}
                      onCancel={handleCancelSIP}
                      onViewDetails={handleViewSIPDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Transaction History Tab */}
          {activeTab === 'transaction-history' && (
            <div>
              <FilterControls
                selectedToken={selectedToken}
                onTokenChange={setSelectedToken}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
                availableTokens={availableTokens}
              />

              {filteredTransactions.length === 0 ? (
                <EmptyState
                  type="transactions"
                  title="No Transactions Found"
                  description="No transactions match your current filters. Try adjusting your filter criteria or create a new SIP investment."
                  actionLabel="Create New SIP"
                  onAction={handleCreateSIP}
                  icon="History"
                />
              ) : (
                <>
                  {/* Mobile View */}
                  {isMobile ? (
                    <div className="space-y-3">
                      {filteredTransactions.map((transaction) => (
                        <TransactionRow
                          key={transaction.id}
                          transaction={transaction}
                          isMobile={true}
                        />
                      ))}
                    </div>
                  ) : (
                    /* Desktop View */
                    <div className="glass-morphism rounded-xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-border">
                          <thead className="bg-surface-secondary/50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                Transaction
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                Token
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                Amount
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                Value
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                Price
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                Tx Hash
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {filteredTransactions.map((transaction) => (
                              <TransactionRow
                                key={transaction.id}
                                transaction={transaction}
                                isMobile={false}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Floating Action Button (Mobile) */}
          {isMobile && (
            <div className="fixed bottom-6 right-6 z-40">
              <Button
                variant="primary"
                onClick={handleCreateSIP}
                className="w-14 h-14 rounded-full shadow-elevation-4"
                iconName="Plus"
                iconSize={24}
              />
            </div>
          )}
        </div>
      </div>
    </AuthenticationGate>
  );
};

export default InvestmentDashboard;