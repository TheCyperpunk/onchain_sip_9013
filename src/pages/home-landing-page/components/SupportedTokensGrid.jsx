import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SupportedTokensGrid = () => {
  const [tokens, setTokens] = useState([]);

  // Mock token data with simulated price updates
  const mockTokens = [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      price: 43250.00,
      change24h: 2.45,
      marketCap: 847000000000,
      volume24h: 18500000000
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      price: 2650.75,
      change24h: -1.23,
      marketCap: 318000000000,
      volume24h: 12300000000
    },
    {
      id: 'binancecoin',
      symbol: 'BNB',
      name: 'BNB',
      icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      price: 315.20,
      change24h: 3.67,
      marketCap: 48500000000,
      volume24h: 1850000000
    },
    {
      id: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      price: 98.45,
      change24h: -0.89,
      marketCap: 42800000000,
      volume24h: 2100000000
    }
  ];

  useEffect(() => {
    // Simulate real-time price updates
    setTokens(mockTokens);
    
    const interval = setInterval(() => {
      setTokens(prevTokens => 
        prevTokens.map(token => ({
          ...token,
          price: token.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% random change
          change24h: token.change24h + (Math.random() - 0.5) * 0.5
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  return (
    <section id="supported-tokens" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-heading mb-4">
            Supported Cryptocurrencies
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Invest in top-performing cryptocurrencies with automated SIP strategies. 
            All prices are updated in real-time from BNB Chain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="glass-morphism rounded-xl p-6 hover:bg-surface-secondary/50 transition-smooth cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-secondary flex items-center justify-center">
                    <Image
                      src={token.icon}
                      alt={`${token.name} logo`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{token.symbol}</h3>
                    <p className="text-sm text-text-secondary">{token.name}</p>
                  </div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-smooth">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Price</span>
                  <span className="font-semibold text-text-primary">
                    {formatPrice(token.price)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">24h Change</span>
                  <span className={`font-medium flex items-center ${
                    token.change24h >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    <Icon 
                      name={token.change24h >= 0 ? "TrendingUp" : "TrendingDown"} 
                      size={14} 
                      className="mr-1" 
                    />
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Market Cap</span>
                  <span className="font-medium text-text-primary">
                    {formatMarketCap(token.marketCap)}
                  </span>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-center space-x-2 text-primary hover:text-primary-400 transition-smooth">
                    <Icon name="Plus" size={16} />
                    <span className="text-sm font-medium">Add to SIP</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
            <Icon name="Info" size={16} className="text-primary mr-2" />
            <span className="text-sm text-primary">
              More tokens coming soon. Powered by BNB Chain.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedTokensGrid;