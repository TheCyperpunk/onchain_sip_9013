import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: {
      sipExecutions: true,
      priceAlerts: false,
      weeklyReports: true,
      systemUpdates: true
    },
    displayCurrency: 'USD',
    language: 'en',
    autoRefresh: true,
    refreshInterval: 30
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (category, key, value) => {
    if (category) {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    setIsSaving(false);
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'dark',
      notifications: {
        sipExecutions: true,
        priceAlerts: false,
        weeklyReports: true,
        systemUpdates: true
      },
      displayCurrency: 'USD',
      language: 'en',
      autoRefresh: true,
      refreshInterval: 30
    };
    
    setSettings(defaultSettings);
    localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && (
          <p className="text-xs text-text-secondary mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
          enabled ? 'bg-primary' : 'bg-surface-tertiary'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="glass-morphism rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
          Appearance
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Theme
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSettingChange(null, 'theme', 'dark')}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-smooth ${
                  settings.theme === 'dark' ?'border-primary bg-primary/10 text-primary' :'border-border bg-surface-secondary text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="Moon" size={16} />
                <span className="text-sm font-medium">Dark</span>
              </button>
              
              <button
                onClick={() => handleSettingChange(null, 'theme', 'light')}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-smooth ${
                  settings.theme === 'light' ?'border-primary bg-primary/10 text-primary' :'border-border bg-surface-secondary text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="Sun" size={16} />
                <span className="text-sm font-medium">Light</span>
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Display Currency
            </label>
            <select
              value={settings.displayCurrency}
              onChange={(e) => handleSettingChange(null, 'displayCurrency', e.target.value)}
              className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="BTC">BTC (₿)</option>
              <option value="ETH">ETH (Ξ)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="glass-morphism rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
          Notifications
        </h3>
        
        <div className="space-y-1">
          <ToggleSwitch
            enabled={settings.notifications.sipExecutions}
            onChange={(value) => handleSettingChange('notifications', 'sipExecutions', value)}
            label="SIP Executions"
            description="Get notified when your SIP investments are executed"
          />
          
          <ToggleSwitch
            enabled={settings.notifications.priceAlerts}
            onChange={(value) => handleSettingChange('notifications', 'priceAlerts', value)}
            label="Price Alerts"
            description="Receive alerts for significant price movements"
          />
          
          <ToggleSwitch
            enabled={settings.notifications.weeklyReports}
            onChange={(value) => handleSettingChange('notifications', 'weeklyReports', value)}
            label="Weekly Reports"
            description="Get weekly portfolio performance summaries"
          />
          
          <ToggleSwitch
            enabled={settings.notifications.systemUpdates}
            onChange={(value) => handleSettingChange('notifications', 'systemUpdates', value)}
            label="System Updates"
            description="Important platform updates and maintenance notices"
          />
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="glass-morphism rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
          Data & Privacy
        </h3>
        
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.autoRefresh}
            onChange={(value) => handleSettingChange(null, 'autoRefresh', value)}
            label="Auto Refresh"
            description="Automatically refresh portfolio data"
          />
          
          {settings.autoRefresh && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Refresh Interval (seconds)
              </label>
              <select
                value={settings.refreshInterval}
                onChange={(e) => handleSettingChange(null, 'refreshInterval', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
              </select>
            </div>
          )}
          
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full mb-3"
              iconName="Download"
              iconPosition="left"
            >
              Export My Data
            </Button>
            
            <Button
              variant="danger"
              className="w-full"
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="glass-morphism rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary font-heading mb-4">
          Advanced
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              RPC Endpoint
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value="https://bsc-dataseed.binance.org/"
                readOnly
                className="flex-1 px-3 py-2 bg-surface-secondary border border-border rounded-lg text-text-primary font-data text-sm focus:outline-none"
              />
              <Button
                variant="ghost"
                iconName="Copy"
                iconSize={16}
                className="text-text-secondary hover:text-text-primary"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Network
            </label>
            <div className="flex items-center space-x-2 p-3 bg-surface-secondary rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-text-primary">BNB Smart Chain</span>
              <span className="text-xs text-text-secondary ml-auto">Chain ID: 56</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleResetSettings}
          iconName="RotateCcw"
          iconPosition="left"
          className="text-text-secondary hover:text-text-primary"
        >
          Reset to Defaults
        </Button>
        
        <Button
          variant="primary"
          onClick={handleSaveSettings}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;