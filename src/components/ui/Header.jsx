// src/components/ui/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import useTranslation from '../../hooks/useTranslation';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const profileRef = useRef(null);
  const themeRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  // Fahad's info
  const assistantInfo = {
    name: 'Fahad',
    nameAr: 'فهد',
    title: 'Executive Assistant',
    titleAr: 'المساعد التنفيذي',
    avatar: '/assets/images/fahad-avatar.jpg',
    status: 'active'
  };

  const navigationItems = [
    { 
      label: t('navigation.dashboard'),
      path: '/executive-dashboard', 
      icon: 'LayoutDashboard',
      tooltip: t('pages.dashboard.subtitle')
    },
    { 
      label: t('navigation.calendar'),
      path: '/calendar-management', 
      icon: 'Calendar',
      tooltip: t('pages.calendar.subtitle')
    },
    { 
      label: t('navigation.tasks'),
      path: '/task-team-management', 
      icon: 'Users',
      tooltip: t('pages.tasks.subtitle')
    },
    { 
      label: t('navigation.communications'),
      path: '/communication-hub', 
      icon: 'MessageSquare',
      tooltip: t('pages.communications.subtitle')
    },
    { 
      label: t('navigation.meetings'),
      path: '/meeting-coordination', 
      icon: 'Video',
      tooltip: t('pages.meetings.subtitle')
    },
    { 
      label: t('navigation.analytics'),
      path: '/reports-analytics', 
      icon: 'BarChart3',
      tooltip: t('pages.analytics.subtitle')
    }
  ];

  const profileMenuItems = [
    { 
      label: t('common.settings'),
      path: '/settings-integrations', 
      icon: 'Settings',
      tooltip: t('pages.settings.subtitle')
    },
    { 
      label: t('common.profile'),
      action: 'profile', 
      icon: 'User',
      tooltip: t('Profile settings')
    },
    { 
      label: t('common.help'),
      action: 'help', 
      icon: 'HelpCircle',
      tooltip: t('Get help and documentation')
    },
    { 
      label: t('common.logout'),
      action: 'logout', 
      icon: 'LogOut',
      tooltip: t('Sign out securely')
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target) && 
          event.target.id !== 'theme-toggle' && !event.target.closest('#theme-toggle')) {
        // Close any theme-related dropdowns if needed
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Check for dark mode preference
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    document.documentElement.classList.toggle('dark', darkModePreference);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const handleProfileAction = (action, path) => {
    if (path) {
      navigate(path);
    } else {
      switch (action) {
        case 'profile': console.log('Opening profile settings');
          break;
        case 'help': console.log('Opening help center');
          break;
        case 'logout': console.log('Logging out user');
          navigate('/login');
          break;
        default:
          break;
      }
    }
    setIsProfileOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const getCurrentName = () => {
    return isRTL ? assistantInfo.nameAr : assistantInfo.name;
  };

  const getCurrentTitle = () => {
    return isRTL ? assistantInfo.titleAr : assistantInfo.title;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-navigation glassmorphism dark:bg-dark-bg/90 bg-surface/90 border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center shadow-md">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold dark:text-white text-text-primary">
                {isRTL ? 'مساعد فهد' : 'Fahad Assistant'}
              </span>
              <span className="text-xs text-text-secondary -mt-1">
                {isRTL ? 'منصة الذكاء المتقدمة' : 'Advanced AI Platform'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl text-sm font-medium 
                transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2
                ${isActiveRoute(item.path)
                  ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-md'
                  : 'dark:text-gray-300 text-text-secondary hover:text-neon-blue hover:bg-primary-50 dark:hover:bg-gray-800'}
              `}
              title={item.tooltip}
            >
              <Icon 
                name={item.icon} 
                size={16} 
                className={isActiveRoute(item.path) ? 'text-white' : 'text-current'} 
              />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Section - Theme Toggle, Language Toggle & Profile */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle"
            onClick={handleDarkModeToggle}
            className="p-2 rounded-lg dark:text-gray-300 text-text-secondary hover:text-neon-blue dark:hover:text-neon-blue hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2"
            title={isDarkMode ? t('common.lightMode') : t('common.darkMode')}
          >
            <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={18} />
          </button>
          
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 rounded-xl hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2"
              title={t('Assistant Menu')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold">{getCurrentName().charAt(0)}</span>
              </div>
              <div className="hidden md:flex flex-col items-start rtl:items-end">
                <span className="text-sm font-medium dark:text-white text-text-primary">
                  {getCurrentName()}
                </span>
                <span className="text-xs text-text-secondary">
                  {getCurrentTitle()}
                </span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className={`text-text-secondary transition-transform duration-150 ${isProfileOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {isProfileOpen && (
              <div className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 w-64 glassmorphism dark:bg-dark-bg/95 border border-border rounded-xl shadow-lg py-2 animate-fade-in">
                <div className="px-4 py-3 border-b border-border">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">{getCurrentName().charAt(0)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium dark:text-white text-text-primary">
                        {getCurrentName()}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {getCurrentTitle()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  {profileMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleProfileAction(item.action, item.path)}
                      className="w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm dark:text-white text-text-primary hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors duration-150"
                      title={item.tooltip}
                    >
                      <Icon name={item.icon} size={16} className="text-text-secondary" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-lg dark:text-gray-300 text-text-secondary hover:text-neon-blue dark:hover:text-neon-blue hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2">
            <Icon name="Menu" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;