import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
        <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
      </div>
      <div className="flex items-center space-x-2">
        <Icon name="Loader2" size={20} className="text-primary animate-spin" />
        <span className="text-text-secondary">{message}</span>
      </div>
    </div>
  );
};

export default LoadingState;