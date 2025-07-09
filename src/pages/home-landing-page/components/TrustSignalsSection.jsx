import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsSection = () => {
  const trustSignals = [
    {
      icon: 'Shield',
      title: 'Non-Custodial Security',
      description: 'Your private keys never leave your wallet. Complete control over your funds at all times.',
      color: 'success'
    },
    {
      icon: 'Code',
      title: 'Smart Contract Transparency',
      description: 'Open-source smart contracts audited by security experts. View code on GitHub.',
      color: 'primary'
    },
    {
      icon: 'Zap',
      title: 'BNB Chain Integration',
      description: 'Built on BNB Chain for fast, low-cost transactions with high security standards.',
      color: 'warning'
    },
    {
      icon: 'Users',
      title: 'Community Driven',
      description: 'Governed by the community with transparent development and regular updates.',
      color: 'secondary'
    },
    {
      icon: 'Lock',
      title: 'Decentralized Protocol',
      description: 'No central authority. Fully decentralized investment protocol with automated execution.',
      color: 'accent'
    },
    {
      icon: 'TrendingUp',
      title: 'Proven Strategy',
      description: 'Dollar-cost averaging strategy proven to reduce volatility and improve long-term returns.',
      color: 'primary'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'bg-success/10 border-success/20 text-success',
      primary: 'bg-primary/10 border-primary/20 text-primary',
      warning: 'bg-warning/10 border-warning/20 text-warning',
      secondary: 'bg-secondary/10 border-secondary/20 text-secondary',
      accent: 'bg-accent/10 border-accent/20 text-accent'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-heading mb-4">
            Why Choose OnChain SIP?
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Built with security, transparency, and user control at its core. 
            Experience the future of automated cryptocurrency investing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustSignals.map((signal, index) => (
            <div
              key={index}
              className="glass-morphism rounded-xl p-6 hover:bg-surface-secondary/30 transition-smooth group"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getColorClasses(signal.color)} group-hover:scale-110 transition-smooth`}>
                  <Icon name={signal.icon} size={24} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-smooth">
                    {signal.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">Audited Smart Contracts</h4>
            <p className="text-text-secondary text-sm">
              Security audited by leading blockchain security firms
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Globe" size={32} className="text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">Global Accessibility</h4>
            <p className="text-text-secondary text-sm">
              Access from anywhere in the world, 24/7 availability
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Smartphone" size={32} className="text-accent" />
            </div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">Mobile Optimized</h4>
            <p className="text-text-secondary text-sm">
              Fully responsive design for seamless mobile experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;