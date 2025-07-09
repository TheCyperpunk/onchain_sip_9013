import React from 'react';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Dashboard', href: '/investment-dashboard' },
      { name: 'Create SIP', href: '/create-sip-investment' },
      { name: 'Manage SIPs', href: '/manage-sip-investments' },
      { name: 'Profile', href: '/user-profile-settings' }
    ],
    resources: [
      { name: 'Documentation', href: 'https://docs.onchain-sip.com', external: true },
      { name: 'API Reference', href: 'https://api.onchain-sip.com', external: true },
      { name: 'Smart Contracts', href: 'https://github.com/onchain-sip/contracts', external: true },
      { name: 'Security Audit', href: 'https://audit.onchain-sip.com', external: true }
    ],
    community: [
      { name: 'Discord', href: 'https://discord.gg/onchain-sip', external: true },
      { name: 'Twitter', href: 'https://twitter.com/onchain_sip', external: true },
      { name: 'Telegram', href: 'https://t.me/onchain_sip', external: true },
      { name: 'Medium', href: 'https://medium.com/@onchain-sip', external: true }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Risk Disclosure', href: '/risk-disclosure' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: 'Github', href: 'https://github.com/onchain-sip' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/onchain_sip' },
    { name: 'Discord', icon: 'MessageCircle', href: 'https://discord.gg/onchain-sip' },
    { name: 'Telegram', icon: 'Send', href: 'https://t.me/onchain_sip' }
  ];

  return (
    <footer className="bg-surface/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-semibold text-text-primary font-heading">
                OnChain SIP
              </span>
            </div>
            <p className="text-text-secondary mb-6 max-w-md">
              Automate your cryptocurrency investments with systematic investment plans. 
              Built on BNB Chain for secure, non-custodial DeFi investing.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface-secondary hover:bg-surface-tertiary border border-border rounded-lg flex items-center justify-center transition-smooth hover:border-primary"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} className="text-text-secondary hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-text-secondary hover:text-text-primary transition-smooth text-sm flex items-center"
                  >
                    {link.name}
                    {link.external && (
                      <Icon name="ExternalLink" size={12} className="ml-1" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-smooth text-sm flex items-center"
                  >
                    {link.name}
                    <Icon name="ExternalLink" size={12} className="ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Links Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/onchain-sip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-surface-secondary hover:bg-surface-tertiary border border-border rounded-lg transition-smooth text-text-primary"
              >
                <Icon name="Github" size={16} className="mr-2" />
                GitHub Repository
              </a>
              <a
                href="https://testnet.bscscan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-warning/10 hover:bg-warning/20 border border-warning/20 rounded-lg transition-smooth text-warning"
              >
                <Icon name="Search" size={16} className="mr-2" />
                BNB Testnet Explorer
              </a>
            </div>
            
            <div className="flex flex-wrap gap-4 md:justify-end">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-smooth text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text-secondary text-sm mb-4 md:mb-0">
              © {currentYear} OnChain SIP. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>BNB Chain</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-success" />
                <span>Audited</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={14} className="text-primary" />
                <span>Non-Custodial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;