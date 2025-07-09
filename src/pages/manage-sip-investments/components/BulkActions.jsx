import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedSIPs, onBulkAction, onClearSelection }) => {
  const [showActions, setShowActions] = useState(false);

  if (selectedSIPs.length === 0) return null;

  const handleBulkAction = (action) => {
    onBulkAction(action, selectedSIPs);
    setShowActions(false);
  };

  const getActionCounts = () => {
    const counts = {
      active: 0,
      paused: 0,
      cancelled: 0
    };
    
    selectedSIPs.forEach(sip => {
      counts[sip.status]++;
    });
    
    return counts;
  };

  const actionCounts = getActionCounts();

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="glass-morphism-strong rounded-xl border border-border shadow-elevation-4 p-4">
        <div className="flex items-center space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">
                {selectedSIPs.length}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {selectedSIPs.length} SIP{selectedSIPs.length !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-text-secondary">
                {actionCounts.active} active • {actionCounts.paused} paused • {actionCounts.cancelled} cancelled
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Pause Active SIPs */}
            {actionCounts.active > 0 && (
              <Button
                variant="warning"
                onClick={() => handleBulkAction('pause')}
                iconName="Pause"
                iconSize={16}
                className="text-sm"
              >
                Pause ({actionCounts.active})
              </Button>
            )}

            {/* Resume Paused SIPs */}
            {actionCounts.paused > 0 && (
              <Button
                variant="success"
                onClick={() => handleBulkAction('resume')}
                iconName="Play"
                iconSize={16}
                className="text-sm"
              >
                Resume ({actionCounts.paused})
              </Button>
            )}

            {/* Withdraw from All */}
            <Button
              variant="primary"
              onClick={() => handleBulkAction('withdraw')}
              iconName="ArrowUpRight"
              iconSize={16}
              className="text-sm"
            >
              Withdraw All
            </Button>

            {/* More Actions Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowActions(!showActions)}
                iconName="MoreVertical"
                iconSize={16}
                className="p-2"
              />

              {showActions && (
                <div className="absolute bottom-full right-0 mb-2 w-48 glass-morphism rounded-lg border border-border shadow-elevation-3 py-2">
                  <button
                    onClick={() => handleBulkAction('cancel')}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error/10 transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Cancel All SIPs</span>
                  </button>
                  
                  <button
                    onClick={() => handleBulkAction('export')}
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="Download" size={16} />
                    <span>Export Data</span>
                  </button>
                </div>
              )}
            </div>

            {/* Clear Selection */}
            <Button
              variant="ghost"
              onClick={onClearSelection}
              iconName="X"
              iconSize={16}
              className="p-2"
              title="Clear selection"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;