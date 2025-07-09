import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/wallet-connection');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                <Icon name="Zap" size={16} className="mr-2" />
                Automated DeFi Investing
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary font-heading mb-6">
              Smart Crypto
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                SIP Investing
              </span>
              Made Simple
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
              Automate your cryptocurrency investments with systematic investment plans. 
              Dollar-cost average into BTC, ETH, BNB, and SOL with complete control over your funds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                onClick={handleGetStarted}
                className="px-8 py-4 text-lg"
                iconName="Wallet"
                iconPosition="left"
              >
                Connect Wallet & Start
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => document.getElementById('supported-tokens').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-lg"
                iconName="ArrowDown"
                iconPosition="right"
              >
                Explore Tokens
              </Button>
            </div>

            {/* Key Features */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-success" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-text-primary text-sm">Non-Custodial</div>
                  <div className="text-xs text-text-secondary">Your keys, your crypto</div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Repeat" size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-text-primary text-sm">Automated</div>
                  <div className="text-xs text-text-secondary">Set it and forget it</div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-text-primary text-sm">DCA Strategy</div>
                  <div className="text-xs text-text-secondary">Reduce volatility risk</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative z-10">
              <div className="glass-morphism-strong rounded-2xl p-8 border border-border">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Portfolio Growth</h3>
                  <p className="text-text-secondary text-sm">Simulated DCA performance</p>
                </div>

                {/* Mock Chart */}
                <div className="h-48 bg-surface-secondary rounded-lg p-4 mb-6">
                  <div className="h-full flex items-end justify-between space-x-1">
                    {[40, 55, 35, 70, 45, 85, 60, 95, 75, 100, 80, 120].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-primary to-primary/50 rounded-t flex-1"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="text-lg font-semibold text-success">+24.5%</div>
                    <div className="text-xs text-text-secondary">Total Return</div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="text-lg font-semibold text-primary">$12,450</div>
                    <div className="text-xs text-text-secondary">Portfolio Value</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-secondary to-secondary/50 rounded-full flex items-center justify-center">
              <Icon name="TrendingUp" size={24} color="white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent to-accent/50 rounded-full flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;