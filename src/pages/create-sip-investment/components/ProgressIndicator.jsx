import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    {
      id: 1,
      title: 'Select Tokens',
      description: 'Choose cryptocurrencies',
      icon: 'Coins'
    },
    {
      id: 2,
      title: 'Set Amount',
      description: 'Investment amount',
      icon: 'DollarSign'
    },
    {
      id: 3,
      title: 'Choose Frequency',
      description: 'Investment schedule',
      icon: 'Clock'
    },
    {
      id: 4,
      title: 'Review & Create',
      description: 'Confirm details',
      icon: 'Check'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Create SIP Investment</h2>
        <div className="text-sm text-text-secondary">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                    ${status === 'completed' 
                      ? 'bg-success text-white' 
                      : status === 'current' ?'bg-primary text-white' :'bg-surface-secondary text-text-muted border-2 border-border'
                    }
                  `}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step.icon} size={16} />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      status === 'current' ? 'text-primary' : 
                      status === 'completed' ? 'text-success' : 'text-text-muted'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {step.description}
                    </div>
                  </div>
                </div>
                
                {!isLast && (
                  <div className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${
                    status === 'completed' ? 'bg-success' : 'bg-border'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center space-x-2 mb-4">
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            return (
              <div key={step.id} className={`
                flex-1 h-2 rounded-full transition-all duration-200
                ${status === 'completed' 
                  ? 'bg-success' 
                  : status === 'current' ?'bg-primary' :'bg-surface-secondary'
                }
              `} />
            );
          })}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${currentStep <= totalSteps 
              ? 'bg-primary text-white' :'bg-success text-white'
            }
          `}>
            {currentStep <= totalSteps ? (
              <Icon name={steps[currentStep - 1]?.icon} size={14} />
            ) : (
              <Icon name="Check" size={14} />
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">
              {steps[currentStep - 1]?.title || 'Complete'}
            </div>
            <div className="text-xs text-text-secondary">
              {steps[currentStep - 1]?.description || 'SIP created successfully'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;