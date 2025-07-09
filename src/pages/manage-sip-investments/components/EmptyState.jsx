import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  const navigate = useNavigate();

  const handleCreateSIP = () => {
    navigate('/create-sip-investment');
  };

  if (hasFilters) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-surface-secondary rounded-xl flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={32} className="text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          No SIPs match your filters
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Try adjusting your filters or search criteria to find the SIP investments you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear Filters
          </Button>
          <Button
            variant="ghost"
            onClick={handleCreateSIP}
            iconName="Plus"
            iconPosition="left"
          >
            Create New SIP
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-6">
        <Icon name="TrendingUp" size={40} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        No SIP Investments Yet
      </h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        Start your automated investment journey by creating your first SIP. Invest regularly in your favorite cryptocurrencies with dollar-cost averaging.
      </p>
      
      <div className="space-y-4">
        <Button
          variant="primary"
          onClick={handleCreateSIP}
          iconName="Plus"
          iconPosition="left"
          className="px-8"
        >
          Create Your First SIP
        </Button>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Non-custodial</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Repeat" size={16} className="text-primary" />
            <span>Automated</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <span>DCA Strategy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;