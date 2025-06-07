// src/components/ui/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hooks/useTranslation';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    status: 'active',
    avatar: '/assets/images/fahad-avatar.jpg',
    color: 'bg-gradient-to-br from-neon-blue to-neon-purple'
  };

  const quickActions = [
    {
      label: t('New Meeting'),
      action: 'new-meeting',
      icon: 'Plus',
      color: 'bg-gradient-to-br from-neon-blue to-neon-purple'
    },
    {
      label: t('Quick Task'),
      action: 'quick-task',
      icon: 'Zap',
      color: 'bg-gradient-to-br from-neon-purple to-neon-mint'
    },
    {
      label: t('AI Chat'),
      action: 'ai-chat',
      icon: 'MessageSquare',
      color: 'bg-gradient-to-br from-neon-mint to-neon-blue'
    }
  ];

  const navigationItems = [
    { 
      id: 'dashboard',
      label: t('navigation.dashboard'),
      path: '/executive-dashboard', 
      icon: 'LayoutDashboard',
      description: t('pages.dashboard.subtitle'),
      color: 'bg-gradient-to-br from-neon-blue to-neon-purple'
    },
    { 
      id: 'calendar',
      label: t('navigation.calendar'),
      path: '/calendar-management', 
      icon: 'Calendar',
      description: t('pages.calendar.subtitle'),
      color: 'bg-gradient-to-br from-neon-purple to-neon-mint'
    },
    { 
      id: 'tasks',
      label: t('navigation.tasks'),
      path: '/task-team-management', 
      icon: 'Users',
      description: t('pages.tasks.subtitle'),
      color: 'bg-gradient-to-br from-neon-mint to-neon-blue'
    },
    { 
      id: 'communications',
      label: t('navigation.communications'),
      path: '/communication-hub', 
      icon: 'MessageSquare',
      description: t('pages.communications.subtitle'),
      color: 'bg-gradient-to-br from-neon-blue to-neon-purple'
    },
    { 
      id: 'meetings',
      label: t('navigation.meetings'),
      path: '/meeting-coordination', 
      icon: 'Video',
      description: t('pages.meetings.subtitle'),
      color: 'bg-gradient-to-br from-neon-purple to-neon-mint'
    },
    { 
      id: 'analytics',
      label: t('navigation.analytics'),
      path: '/reports-analytics', 
      icon: 'BarChart3',
      description: t('pages.analytics.subtitle'),
      color: 'bg-gradient-to-br from-neon-mint to-neon-blue'
    },
    { 
      id: 'settings',
      label: t('navigation.settings'),
      path: '/settings-integrations', 
      icon: 'Settings',
      description: t('pages.settings.subtitle'),
      color: 'bg-gradient-to-br from-neon-blue to-neon-purple'
    }
  ];

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    switch (action) {
      case 'new-meeting': navigate('/meeting-coordination');
        break;
      case 'quick-task': navigate('/task-team-management');
        break;
      case 'ai-chat': navigate('/communication-hub');
        break;
      default:
        break;
    }
  };

  const getCurrentName = () => {
    return isRTL ? assistantInfo.nameAr : assistantInfo.name;
  };

  const getCurrentTitle = () => {
    return isRTL ? assistantInfo.titleAr : assistantInfo.title;
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={`
      fixed top-16 left-0 rtl:left-auto rtl:right-0 h-[calc(100vh-4rem)] z-50
      ${isCollapsed ? 'w-16' : 'w-80'} 
      dark:bg-dark-bg bg-surface border-r rtl:border-r-0 rtl:border-l border-border shadow-lg
      transition-all duration-300 ease-out
      lg:block hidden
    `}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className={`w-10 h-10 ${assistantInfo.color} rounded-xl flex items-center justify-center shadow-md`}>
                <span className="text-white font-bold text-xl">{getCurrentName().charAt(0)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold dark:text-white text-text-primary">
                  {getCurrentName()}
                </span>
                <span className="text-xs text-text-secondary">
                  {getCurrentTitle()}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 dark:hover:bg-gray-800 transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2"
            title={isCollapsed ? (isRTL ? 'توسيع الشريط الجانبي' : 'Expand Sidebar') : (isRTL ? 'طي الشريط الجانبي' : 'Collapse Sidebar')}
          >
            <Icon 
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
              size={16} 
              className={`${isRTL ? 'rtl:rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-b border-border">
            <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
              {t('Quick Actions')}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className={`
                    ${action.color} text-white p-3 rounded-xl text-xs font-medium
                    hover:opacity-90 transition-all duration-150 ease-out transform hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2
                    shadow-md hover:shadow-lg
                  `}
                  title={action.label}
                >
                  <Icon name={action.icon} size={16} className="mx-auto mb-1" />
                  <div className="truncate">{action.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <h3 className={`text-xs font-medium text-text-secondary uppercase tracking-wider mb-3 ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? t('Menu') : t('Main Menu')}
          </h3>
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`
                  sidebar-item w-full p-3 rounded-xl border glassmorphism transition-all duration-150 ease-out
                  focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2
                  ${isActiveRoute(item.path)
                    ? 'dark:bg-gray-800/50 bg-primary-50 border-neon-blue text-neon-blue shadow-md'
                    : 'dark:bg-dark-bg/50 dark:border-gray-700 bg-surface border-border hover:border-neon-blue hover:shadow-sm'}
                  ${isCollapsed ? 'flex justify-center' : 'text-left rtl:text-right'}
                `}
                title={isCollapsed ? item.label : item.description}
              >
                {isCollapsed ? (
                  <div className="relative">
                    <div className={`w-8 h-8 ${item.color} rounded-xl flex items-center justify-center shadow-md`}>
                      <Icon name={item.icon} size={16} color="white" />
                    </div>
                    {isActiveRoute(item.path) && (
                      <div className="absolute -bottom-1 inset-x-0 h-0.5 bg-neon-blue rounded-full shadow-glow animate-pulse"></div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="relative flex-shrink-0">
                      <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shadow-md`}>
                        <Icon name={item.icon} size={18} color="white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium truncate ${isActiveRoute(item.path) ? 'text-neon-blue subtitle-glow' : 'dark:text-white text-text-primary'}`}>
                          {item.label}
                        </h4>
                      </div>
                      <p className="text-xs text-text-secondary mb-1 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="glassmorphism rounded-xl p-3 shadow-md">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                <Icon name="Sparkles" size={16} className="text-neon-blue" />
                <span className="text-sm font-medium text-neon-blue subtitle-glow">
                  {isRTL ? 'نصيحة من فهد' : 'Fahad Tip'}
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                {isRTL 
                  ? 'تصفح القائمة الجانبية لإدارة جميع جوانب عملك بكفاءة.' :'Navigate the sidebar to efficiently manage all aspects of your business.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;