import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is OnChain SIP and how does it work?",
      answer: `OnChain SIP is a decentralized systematic investment plan platform that allows you to automatically invest in cryptocurrencies using dollar-cost averaging strategy.\n\nYou connect your wallet, choose your preferred tokens (BTC, ETH, BNB, SOL), set your investment amount and frequency, and our smart contracts handle the rest. Your funds are automatically converted from stablecoins to your chosen crypto assets at regular intervals.`
    },
    {
      question: "Is my money safe? How does non-custodial work?",
      answer: `Your funds are completely safe because OnChain SIP is non-custodial. This means:\n\n• Your private keys never leave your wallet\n• You maintain full control over your funds at all times\n• Smart contracts only execute trades when you authorize them\n• No central authority can access or freeze your assets\n• You can withdraw or pause your SIP anytime`
    },
    {
      question: "What cryptocurrencies can I invest in?",
      answer: `Currently, OnChain SIP supports four major cryptocurrencies:\n\n• Bitcoin (BTC) - The original cryptocurrency\n• Ethereum (ETH) - Smart contract platform\n• BNB - Binance ecosystem token\n• Solana (SOL) - High-performance blockchain\n\nAll investments are made using stablecoins (USDT/BUSD) and converted to wrapped versions of these tokens on BNB Chain.`
    },
    {
      question: "What are the fees and costs involved?",
      answer: `OnChain SIP has transparent, minimal fees:\n\n• Platform fee: 0.5% per transaction\n• BNB Chain gas fees: ~$0.10-0.50 per transaction\n• No hidden fees or subscription costs\n• No withdrawal fees\n• No account maintenance fees\n\nYou only pay when transactions are executed, making it cost-effective for regular investing.`
    },
    {
      question: "How do I get started with OnChain SIP?",
      answer: `Getting started is simple:\n\n1. Connect your Web3 wallet (MetaMask, WalletConnect)\n2. Ensure you have USDT or BUSD in your wallet\n3. Choose your investment tokens and allocation\n4. Set your investment frequency (daily, weekly, monthly)\n5. Confirm and activate your SIP\n\nYour first investment will be executed immediately, and subsequent investments will follow your chosen schedule.`
    },
    {
      question: "Can I modify or cancel my SIP anytime?",
      answer: `Yes, you have complete flexibility:\n\n• Pause your SIP temporarily\n• Resume paused investments\n• Modify investment amounts\n• Change token allocation\n• Cancel SIP completely\n• Withdraw accumulated tokens anytime\n\nAll changes take effect immediately, giving you full control over your investment strategy.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-heading mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary">
            Everything you need to know about OnChain SIP and automated crypto investing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-morphism rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-surface-secondary/30 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold text-text-primary pr-4">
                  {faq.question}
                </h3>
                <div className={`transform transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <Icon 
                    name="ChevronDown" 
                    size={20} 
                    className="text-text-secondary" 
                  />
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-border">
                    <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-morphism rounded-xl p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="MessageCircle" size={24} className="text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Still have questions?
            </h3>
            <p className="text-text-secondary mb-4">
              Join our community or check out our documentation for more detailed information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/onchain-sip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-surface-secondary hover:bg-surface-tertiary border border-border rounded-lg transition-smooth text-text-primary"
              >
                <Icon name="Github" size={16} className="mr-2" />
                View Documentation
              </a>
              <a
                href="https://discord.gg/onchain-sip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-600 text-primary-foreground rounded-lg transition-smooth"
              >
                <Icon name="Users" size={16} className="mr-2" />
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;