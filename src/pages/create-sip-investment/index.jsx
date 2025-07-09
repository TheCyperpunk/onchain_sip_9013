import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import AuthenticationGate from '../../components/ui/AuthenticationGate';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProgressIndicator from './components/ProgressIndicator';
import TokenSelector from './components/TokenSelector';
import AmountInput from './components/AmountInput';
import FrequencyPicker from './components/FrequencyPicker';
import InvestmentSummary from './components/InvestmentSummary';
import ConfirmationModal from './components/ConfirmationModal';

const CreateSIPInvestment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [allocations, setAllocations] = useState({});
  const [amount, setAmount] = useState('');
  const [selectedStablecoin, setSelectedStablecoin] = useState('USDT');
  const [frequency, setFrequency] = useState('');
  const [customInterval, setCustomInterval] = useState({ value: '1', unit: 'days' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  useEffect(() => {
    // Save form data to localStorage for persistence
    const formData = {
      selectedTokens,
      allocations,
      amount,
      selectedStablecoin,
      frequency,
      customInterval
    };
    localStorage.setItem('sipFormData', JSON.stringify(formData));
  }, [selectedTokens, allocations, amount, selectedStablecoin, frequency, customInterval]);

  useEffect(() => {
    // Load saved form data on component mount
    const savedData = localStorage.getItem('sipFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSelectedTokens(parsedData.selectedTokens || []);
        setAllocations(parsedData.allocations || {});
        setAmount(parsedData.amount || '');
        setSelectedStablecoin(parsedData.selectedStablecoin || 'USDT');
        setFrequency(parsedData.frequency || '');
        setCustomInterval(parsedData.customInterval || { value: '1', unit: 'days' });
      } catch (error) {
        console.error('Failed to load saved form data:', error);
      }
    }
  }, []);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (selectedTokens.length === 0) {
          newErrors.tokens = 'Please select at least one token';
        }
        const totalAllocation = Object.values(allocations).reduce((sum, value) => sum + value, 0);
        if (selectedTokens.length > 0 && totalAllocation !== 100) {
          newErrors.allocation = 'Total allocation must equal 100%';
        }
        break;
      case 2:
        if (!amount || parseFloat(amount) <= 0) {
          newErrors.amount = 'Please enter a valid investment amount';
        }
        if (parseFloat(amount) < 10) {
          newErrors.amount = 'Minimum investment amount is $10';
        }
        break;
      case 3:
        if (!frequency) {
          newErrors.frequency = 'Please select an investment frequency';
        }
        if (frequency === 'custom' && (!customInterval.value || parseInt(customInterval.value) <= 0)) {
          newErrors.customInterval = 'Please enter a valid custom interval';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowConfirmation(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmSIP = () => {
    // Clear saved form data
    localStorage.removeItem('sipFormData');
    
    // Navigate to dashboard with success message
    navigate('/investment-dashboard', { 
      state: { 
        message: 'SIP investment created successfully!',
        type: 'success'
      }
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedTokens.length > 0 && 
               Object.values(allocations).reduce((sum, value) => sum + value, 0) === 100;
      case 2:
        return amount && parseFloat(amount) >= 10;
      case 3:
        return frequency && (frequency !== 'custom' || (customInterval.value && parseInt(customInterval.value) > 0));
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TokenSelector
            selectedTokens={selectedTokens}
            onTokenSelect={setSelectedTokens}
            onAllocationChange={setAllocations}
          />
        );
      case 2:
        return (
          <AmountInput
            amount={amount}
            onAmountChange={setAmount}
            selectedStablecoin={selectedStablecoin}
            onStablecoinChange={setSelectedStablecoin}
          />
        );
      case 3:
        return (
          <FrequencyPicker
            frequency={frequency}
            onFrequencyChange={setFrequency}
            customInterval={customInterval}
            onCustomIntervalChange={setCustomInterval}
          />
        );
      case 4:
        return (
          <InvestmentSummary
            selectedTokens={selectedTokens}
            allocations={allocations}
            amount={amount}
            frequency={frequency}
            customInterval={customInterval}
            selectedStablecoin={selectedStablecoin}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AuthenticationGate requireAuth={true}>
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
            
            <div className="bg-surface border border-border rounded-xl p-6 lg:p-8">
              {/* Error Display */}
              {Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Icon name="AlertCircle" size={16} className="text-error mr-2" />
                    <span className="text-sm font-medium text-error">Please fix the following errors:</span>
                  </div>
                  <ul className="text-sm text-error space-y-1">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step Content */}
              <div className="mb-8">
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                <div className="flex-1">
                  {currentStep > 1 && (
                    <Button
                      variant="ghost"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                      className="w-full sm:w-auto"
                    >
                      Previous
                    </Button>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/investment-dashboard')}
                    className="flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    iconName={currentStep === totalSteps ? "Check" : "ChevronRight"}
                    iconPosition="right"
                    className="flex-1 sm:flex-none"
                  >
                    {currentStep === totalSteps ? 'Create SIP' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-accent/10 border border-accent/20 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Icon name="HelpCircle" size={20} className="text-accent mt-0.5" />
                <div>
                  <h3 className="font-medium text-accent mb-2">Need Help?</h3>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p>• SIP (Systematic Investment Plan) helps you invest regularly in crypto</p>
                    <p>• Dollar-cost averaging reduces the impact of market volatility</p>
                    <p>• You can modify or cancel your SIP anytime from the dashboard</p>
                    <p>• All investments are non-custodial and secured by smart contracts</p>
                  </div>
                  <div className="mt-3">
                    <a 
                      href="#" 
                      className="text-accent hover:text-accent-400 text-sm font-medium transition-colors"
                    >
                      Learn more about SIP investing →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmSIP}
          selectedTokens={selectedTokens}
          allocations={allocations}
          amount={amount}
          frequency={frequency}
          customInterval={customInterval}
          selectedStablecoin={selectedStablecoin}
        />
      </div>
    </AuthenticationGate>
  );
};

export default CreateSIPInvestment;