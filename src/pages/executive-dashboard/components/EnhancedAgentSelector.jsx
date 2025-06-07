// src/pages/executive-dashboard/components/EnhancedAgentSelector.jsx
import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';

const EnhancedAgentSelector = ({ agents, selectedAgent, onAgentSelect, isRTL }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('conversations');

  // Fahad's info
  const assistantInfo = {
    id: 'fahad',
    name: 'Fahad',
    nameAr: 'فهد',
    title: 'Executive Assistant',
    titleAr: 'المساعد التنفيذي',
    description: 'Your all-in-one executive assistant',
    descriptionAr: 'مساعدك التنفيذي الشامل',
    expertise: ['Task Management', 'Scheduling', 'Communications', 'Analytics'],
    expertiseAr: ['إدارة المهام', 'الجدولة', 'الاتصالات', 'التحليلات'],
    status: 'active',
    lastActivity: 'Just now',
    lastActivityAr: 'الآن',
    avatar: '/assets/images/fahad-avatar.jpg',
    color: 'bg-gradient-to-br from-neon-blue to-neon-purple',
    conversations: 18,
    performance: 98,
    responseTime: '0.5s'
  };

  const filteredAndSortedAgents = useMemo(() => {
    // Return only Fahad as the assistant - hide other agents
    return [assistantInfo];
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return { icon: 'Circle', color: 'text-success', label: isRTL ? 'نشط' : 'Active' };
      case 'busy': return { icon: 'Circle', color: 'text-warning', label: isRTL ? 'مشغول' : 'Busy' };
      case 'idle': return { icon: 'Circle', color: 'text-text-secondary', label: isRTL ? 'خامل' : 'Idle' };
      default: return { icon: 'Circle', color: 'text-error', label: isRTL ? 'غير متصل' : 'Offline' };
    }
  };

  const getCurrentName = (agent) => {
    return isRTL ? agent.nameAr : agent.name;
  };

  const getCurrentDescription = (agent) => {
    return isRTL ? agent.descriptionAr : agent.description;
  };

  const getCurrentExpertise = (agent) => {
    return isRTL ? agent.expertiseAr : agent.expertise;
  };

  const getCurrentLastActivity = (agent) => {
    return isRTL ? agent.lastActivityAr : agent.lastActivity;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Fahad's info */}
      <div className="p-4 border-b border-border glassmorphism sticky top-0 z-10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className={`w-20 h-20 ${assistantInfo.color} rounded-xl flex items-center justify-center shadow-lg mb-3`}>
            <span className="text-white font-bold text-3xl">{assistantInfo.name.charAt(0)}</span>
          </div>
          <h2 className="text-xl font-bold dark:text-white text-text-primary mb-1">
            {getCurrentName(assistantInfo)}
          </h2>
          <p className="text-sm text-neon-blue subtitle-glow font-medium mb-2">
            {isRTL ? assistantInfo.titleAr : assistantInfo.title}
          </p>
          <p className="text-sm text-text-secondary max-w-xs">
            {getCurrentDescription(assistantInfo)}
          </p>
          
          {/* Status indicator */}
          <div className="flex items-center mt-4 px-3 py-1.5 rounded-full bg-success/10 text-success">
            <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
            <span className="text-xs font-medium">
              {isRTL ? 'متصل ومستعد للمساعدة' : 'Online and ready to assist'}
            </span>
          </div>
        </div>
        
        {/* Expertise tags */}
        <div className="mt-3">
          <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
            {isRTL ? 'المهارات' : 'Expertise'}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {getCurrentExpertise(assistantInfo).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary-100 dark:bg-gray-800 text-text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Performance stats */}
        <div className="mt-6">
          <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
            {isRTL ? 'الأداء' : 'Performance'}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-neon-blue">
                {assistantInfo.performance}%
              </div>
              <div className="text-xs text-text-secondary">
                {isRTL ? 'دقة' : 'Accuracy'}
              </div>
            </div>
            <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-neon-purple">
                {assistantInfo.conversations}
              </div>
              <div className="text-xs text-text-secondary">
                {isRTL ? 'محادثات' : 'Chats'}
              </div>
            </div>
            <div className="bg-primary-50 dark:bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-neon-mint">
                {assistantInfo.responseTime}
              </div>
              <div className="text-xs text-text-secondary">
                {isRTL ? 'وقت الرد' : 'Response'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How Fahad can help you section */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <h3 className="text-sm font-semibold dark:text-white text-text-primary mb-3">
          {isRTL ? 'كيف يمكن أن أساعدك اليوم؟' : 'How can I help you today?'}
        </h3>
        
        <div className="space-y-3">
          {/* Task cards */}
          <div className="glassmorphism hover-expand p-4 rounded-xl border border-neon-blue/20 shadow-sm">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className="bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg p-2 shadow-md">
                <Icon name="Calendar" size={18} color="white" />
              </div>
              <div>
                <h4 className="text-sm font-medium dark:text-white text-text-primary mb-1">
                  {isRTL ? 'إدارة جدولك' : 'Manage Your Schedule'}
                </h4>
                <p className="text-xs text-text-secondary">
                  {isRTL ? 'تنظيم المواعيد وجدولة الاجتماعات وإدارة المهام اليومية' : 'Organize appointments, schedule meetings, and manage daily tasks'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="glassmorphism hover-expand p-4 rounded-xl border border-neon-purple/20 shadow-sm">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className="bg-gradient-to-br from-neon-purple to-neon-mint rounded-lg p-2 shadow-md">
                <Icon name="MessageSquare" size={18} color="white" />
              </div>
              <div>
                <h4 className="text-sm font-medium dark:text-white text-text-primary mb-1">
                  {isRTL ? 'تنسيق الاتصالات' : 'Coordinate Communications'}
                </h4>
                <p className="text-xs text-text-secondary">
                  {isRTL ? 'إدارة البريد الإلكتروني والرسائل والمكالمات عبر منصات متعددة' : 'Manage emails, messages, and calls across multiple platforms'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="glassmorphism hover-expand p-4 rounded-xl border border-neon-mint/20 shadow-sm">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className="bg-gradient-to-br from-neon-mint to-neon-blue rounded-lg p-2 shadow-md">
                <Icon name="BarChart2" size={18} color="white" />
              </div>
              <div>
                <h4 className="text-sm font-medium dark:text-white text-text-primary mb-1">
                  {isRTL ? 'رؤى تحليلية' : 'Analytical Insights'}
                </h4>
                <p className="text-xs text-text-secondary">
                  {isRTL ? 'توفير التقارير والتحليلات والرؤى لاتخاذ قرارات أفضل' : 'Provide reports, analytics, and insights for better decision-making'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="glassmorphism hover-expand p-4 rounded-xl border border-neon-blue/20 shadow-sm">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className="bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg p-2 shadow-md">
                <Icon name="Users" size={18} color="white" />
              </div>
              <div>
                <h4 className="text-sm font-medium dark:text-white text-text-primary mb-1">
                  {isRTL ? 'إدارة الفريق' : 'Team Management'}
                </h4>
                <p className="text-xs text-text-secondary">
                  {isRTL ? 'تنسيق المهام وتتبع التقدم وتسهيل التواصل بين أعضاء الفريق' : 'Coordinate tasks, track progress, and facilitate communication between team members'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="glassmorphism hover-expand p-4 rounded-xl border border-neon-purple/20 shadow-sm">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className="bg-gradient-to-br from-neon-purple to-neon-mint rounded-lg p-2 shadow-md">
                <Icon name="FileText" size={18} color="white" />
              </div>
              <div>
                <h4 className="text-sm font-medium dark:text-white text-text-primary mb-1">
                  {isRTL ? 'المستندات والتقارير' : 'Documents & Reports'}
                </h4>
                <p className="text-xs text-text-secondary">
                  {isRTL ? 'إنشاء وتنظيم وتحرير المستندات والتقارير المهمة' : 'Create, organize, and edit important documents and reports'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAgentSelector;