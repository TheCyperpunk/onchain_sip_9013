import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type, 
  title, 
  description, 
  actionLabel, 
  onAction, 
  icon = "Package" 
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-surface-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon name={icon} size={32} className="text-text-muted" />
      </div>
      
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>
      
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          iconName="Plus"
          iconPosition="left"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;