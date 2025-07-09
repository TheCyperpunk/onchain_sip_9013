import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationMenu = ({ isWalletConnected, currentPath, onNavigate, isMobile = false }) => {
  const navigate = useNavigate();

  const publicMenuItems = [
    {
      label: 'Home',
      path: '/home-landing-page',
      icon: 'Home',
      description: 'Platform overview and features'
    }
  ];

  const authenticatedMenuItems = [
    {
      label: 'Dashboard',
      path: '/investment-dashboard',
      icon: 'BarChart3',
      description: 'Portfolio overview and analytics'
    },
    {
      label: 'Invest',
      path: '/create-sip-investment',
      icon: 'Plus',
      description: 'Create new SIP investment'
    },
    {
      label: 'Manage',
      path: '/manage-sip-investments',
      icon: 'Settings',
      description: 'Manage existing investments'
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'User',
      description: 'Account settings and preferences'
    }
  ];

  const menuItems = isWalletConnected ? authenticatedMenuItems : publicMenuItems;

  const handleNavigation = (path) => {
    navigate(path);
    if (onNavigate) {
      onNavigate();
    }
  };

  const isActivePath = (path) => {
    return currentPath === path;
  };

  if (isMobile) {
    return (
      <nav className="space-y-1" role="navigation" aria-label="Main navigation">
        {menuItems.map((item) => {
          const isActive = isActivePath(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full flex items-center px-3 py-3 rounded-lg text-left transition-smooth
                ${isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50'
                }
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
              `}
              aria-current={isActive ? 'page' : undefined}
              title={item.description}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={`mr-3 ${isActive ? 'text-primary' : 'text-current'}`}
              />
              <div className="flex-1">
                <div className={`font-medium ${isActive ? 'text-primary' : 'text-current'}`}>
                  {item.label}
                </div>
                <div className="text-xs text-text-muted mt-0.5">
                  {item.description}
                </div>
              </div>
              {isActive && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-primary ml-2"
                />
              )}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-1" role="navigation" aria-label="Main navigation">
      {menuItems.map((item) => {
        const isActive = isActivePath(item.path);
        return (
          <Button
            key={item.path}
            variant={isActive ? "primary" : "ghost"}
            onClick={() => handleNavigation(item.path)}
            className={`
              px-4 py-2 text-sm font-medium transition-smooth
              ${isActive 
                ? 'bg-primary text-primary-foreground shadow-elevation-1' 
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50'
              }
            `}
            iconName={item.icon}
            iconSize={16}
            iconPosition="left"
            aria-current={isActive ? 'page' : undefined}
            title={item.description}
          >
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;