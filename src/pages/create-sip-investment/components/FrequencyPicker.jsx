import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const FrequencyPicker = ({ frequency, onFrequencyChange, customInterval, onCustomIntervalChange }) => {
  const [showCustom, setShowCustom] = useState(frequency === 'custom');

  const presetFrequencies = [
    {
      id: 'daily',
      label: 'Daily',
      description: 'Execute every day',
      icon: 'Calendar',
      interval: '1 day',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'weekly',
      label: 'Weekly',
      description: 'Execute every week',
      icon: 'CalendarDays',
      interval: '1 week',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'monthly',
      label: 'Monthly',
      description: 'Execute every month',
      icon: 'CalendarRange',
      interval: '1 month',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'custom',
      label: 'Custom',
      description: 'Set your own interval',
      icon: 'Settings',
      interval: 'Custom',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const handleFrequencySelect = (frequencyId) => {
    onFrequencyChange(frequencyId);
    setShowCustom(frequencyId === 'custom');
  };

  const handleCustomIntervalChange = (field, value) => {
    onCustomIntervalChange({
      ...customInterval,
      [field]: value
    });
  };

  const getNextExecutionDate = () => {
    const now = new Date();
    let nextDate = new Date(now);

    switch (frequency) {
      case 'daily':
        nextDate.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case 'custom':
        if (customInterval.unit === 'days') {
          nextDate.setDate(now.getDate() + parseInt(customInterval.value || 1));
        } else if (customInterval.unit === 'weeks') {
          nextDate.setDate(now.getDate() + (parseInt(customInterval.value || 1) * 7));
        } else if (customInterval.unit === 'months') {
          nextDate.setMonth(now.getMonth() + parseInt(customInterval.value || 1));
        }
        break;
      default:
        nextDate.setDate(now.getDate() + 1);
    }

    return nextDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Investment Frequency</h3>
        <p className="text-sm text-text-secondary mb-4">
          Choose how often you want to execute your SIP investment
        </p>
      </div>

      {/* Frequency Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {presetFrequencies.map((freq) => (
          <button
            key={freq.id}
            onClick={() => handleFrequencySelect(freq.id)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${frequency === freq.id
                ? 'border-primary bg-primary/10 shadow-elevation-2'
                : 'border-border hover:border-border-hover bg-surface hover:bg-surface-secondary'
              }
            `}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${freq.color} rounded-lg flex items-center justify-center`}>
                <Icon name={freq.icon} size={20} color="white" />
              </div>
              <div>
                <div className="font-semibold text-text-primary">{freq.label}</div>
                <div className="text-sm text-text-secondary">{freq.description}</div>
              </div>
              {frequency === freq.id && (
                <Icon name="Check" size={20} className="text-primary ml-auto" />
              )}
            </div>
            <div className="text-sm font-medium text-text-primary">
              {freq.interval}
            </div>
          </button>
        ))}
      </div>

      {/* Custom Interval Settings */}
      {showCustom && (
        <div className="bg-surface border border-border rounded-xl p-6">
          <h4 className="font-semibold text-text-primary mb-4">Custom Interval</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Interval Value
              </label>
              <Input
                type="number"
                value={customInterval.value}
                onChange={(e) => handleCustomIntervalChange('value', e.target.value)}
                placeholder="1"
                min="1"
                max="365"
                className="bg-surface-secondary border-border focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Time Unit
              </label>
              <select
                value={customInterval.unit}
                onChange={(e) => handleCustomIntervalChange('unit', e.target.value)}
                className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-text-primary focus:border-primary focus:outline-none transition-colors"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
          
          {customInterval.value && (
            <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center">
                <Icon name="Clock" size={16} className="text-accent mr-2" />
                <span className="text-sm text-accent">
                  SIP will execute every {customInterval.value} {customInterval.unit}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Next Execution Preview */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Calendar" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Next Execution</span>
        </div>
        <div className="text-text-primary font-medium">
          {getNextExecutionDate()}
        </div>
        <div className="text-sm text-text-secondary mt-1">
          Your first SIP investment will be executed on this date
        </div>
      </div>

      {/* Frequency Benefits */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <h4 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="TrendingUp" size={16} className="text-accent mr-2" />
          Dollar-Cost Averaging Benefits
        </h4>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span>Reduces impact of market volatility</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span>Automated investing removes emotional decisions</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span>Builds discipline in long-term investing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequencyPicker;