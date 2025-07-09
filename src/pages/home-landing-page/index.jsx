import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import HeroSection from './components/HeroSection';
import SupportedTokensGrid from './components/SupportedTokensGrid';
import TrustSignalsSection from './components/TrustSignalsSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';

const HomeLandingPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>OnChain SIP - Automated Crypto Investment Platform | DeFi SIP</title>
        <meta 
          name="description" 
          content="Automate your cryptocurrency investments with OnChain SIP. Create systematic investment plans for BTC, ETH, BNB, and SOL on BNB Chain. Non-custodial, secure, and transparent DeFi investing." 
        />
        <meta 
          name="keywords" 
          content="crypto SIP, DeFi investment, automated crypto investing, BNB Chain, systematic investment plan, dollar cost averaging, non-custodial" 
        />
        <meta name="author" content="OnChain SIP" />
        <meta property="og:title" content="OnChain SIP - Automated Crypto Investment Platform" />
        <meta 
          property="og:description" 
          content="Create automated systematic investment plans for cryptocurrencies. Invest in BTC, ETH, BNB, and SOL with complete control over your funds." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onchain-sip.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OnChain SIP - Automated Crypto Investment Platform" />
        <meta 
          name="twitter:description" 
          content="Automate your crypto investments with systematic investment plans on BNB Chain. Non-custodial and secure." 
        />
        <link rel="canonical" href="https://onchain-sip.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader />
        
        <main>
          <HeroSection />
          <SupportedTokensGrid />
          <TrustSignalsSection />
          <FAQSection />
        </main>
        
        <FooterSection />
      </div>
    </>
  );
};

export default HomeLandingPage;