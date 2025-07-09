import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityInfo = () => {
  const securityFeatures = [
    {
      icon: "Shield",
      title: "Non-Custodial",
      description: "Your private keys never leave your wallet. We never store or access your funds."
    },
    {
      icon: "Lock",
      title: "Secure Connection",
      description: "All connections are encrypted and secured using industry-standard protocols."
    },
    {
      icon: "Eye",
      title: "Transparent",
      description: "All smart contracts are open-source and audited for maximum transparency."
    },
    {
      icon: "Zap",
      title: "Fast & Reliable",
      description: "Built on BNB Chain for fast transactions and low fees."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Why Connect Your Wallet?
        </h3>
        <p className="text-sm text-text-secondary">
          Your wallet connection enables secure, decentralized investment management
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {securityFeatures.map((feature, index) => (
          <div 
            key={index}
            className="flex items-start space-x-3 p-4 bg-surface-secondary/50 border border-border rounded-lg"
          >
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-text-primary text-sm mb-1">
                {feature.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-warning text-sm mb-1">
              Important Notice
            </h4>
            <p className="text-xs text-text-secondary">
              Make sure you're on the correct website before connecting your wallet. 
              OnChain SIP will never ask for your seed phrase or private keys.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityInfo;