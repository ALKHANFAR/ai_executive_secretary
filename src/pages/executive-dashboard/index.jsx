// Enhanced Executive Dashboard with improved UI/UX
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import Toast, { ToastContainer, useToast } from 'components/ui/Toast';

// Enhanced components
import EnhancedAgentSelector from './components/EnhancedAgentSelector';
import EnhancedChatInterface from './components/EnhancedChatInterface';
import DashboardWidgets from './components/DashboardWidgets';
import QuickActions from './components/QuickActions';

const ExecutiveDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState('calendar-manager');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [isRTL, setIsRTL] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  // Enhanced AI Agents data with more details
  const aiAgents = [
    {
      id: 'calendar-manager',
      name: 'Calendar Manager',
      nameAr: 'مدير التقويم',
      description: 'Intelligent scheduling and conflict resolution with advanced time management capabilities',
      descriptionAr: 'الجدولة الذكية وحل التعارضات مع قدرات إدارة الوقت المتقدمة',
      icon: 'Calendar',
      status: 'active',
      lastActivity: '2 min ago',
      lastActivityAr: 'منذ دقيقتين',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      conversations: 3,
      expertise: ['Meeting Scheduling', 'Conflict Resolution', 'Time Management', 'Calendar Optimization'],
      expertiseAr: ['جدولة الاجتماعات', 'حل التعارضات', 'إدارة الوقت', 'تحسين التقويم'],
      performance: 95,
      responseTime: '1.2s'
    },
    {
      id: 'task-tracker',
      name: 'Task Tracker',
      nameAr: 'متتبع المهام',
      description: 'Advanced project management and team coordination with productivity analytics',
      descriptionAr: 'إدارة المشاريع المتقدمة وتنسيق الفريق مع تحليلات الإنتاجية',
      icon: 'CheckSquare',
      status: 'active',
      lastActivity: '5 min ago',
      lastActivityAr: 'منذ 5 دقائق',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      conversations: 7,
      expertise: ['Task Assignment', 'Progress Tracking', 'Team Performance', 'Resource Management'],
      expertiseAr: ['تعيين المهام', 'تتبع التقدم', 'أداء الفريق', 'إدارة الموارد'],
      performance: 92,
      responseTime: '0.8s'
    },
    {
      id: 'communication-agent',
      name: 'Communication Agent',
      nameAr: 'وكيل الاتصالات',
      description: 'Unified communication hub for Email, Slack, Teams, and WhatsApp management',
      descriptionAr: 'مركز الاتصالات الموحد لإدارة البريد الإلكتروني وسلاك وتيمز وواتساب',
      icon: 'MessageCircle',
      status: 'busy',
      lastActivity: '1 min ago',
      lastActivityAr: 'منذ دقيقة واحدة',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      conversations: 12,
      expertise: ['Email Management', 'Slack Integration', 'WhatsApp Business', 'Teams Coordination'],
      expertiseAr: ['إدارة البريد الإلكتروني', 'تكامل سلاك', 'واتساب الأعمال', 'تنسيق الفرق'],
      performance: 88,
      responseTime: '1.5s'
    },
    {
      id: 'meeting-coordinator',
      name: 'Meeting Coordinator',
      nameAr: 'منسق الاجتماعات',
      description: 'Comprehensive end-to-end meeting management with smart scheduling',
      descriptionAr: 'إدارة شاملة للاجتماعات من البداية إلى النهاية مع الجدولة الذكية',
      icon: 'Video',
      status: 'active',
      lastActivity: '10 min ago',
      lastActivityAr: 'منذ 10 دقائق',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      conversations: 2,
      expertise: ['Meeting Setup', 'Agenda Creation', 'Follow-up Actions', 'Room Booking'],
      expertiseAr: ['إعداد الاجتماعات', 'إنشاء جدول الأعمال', 'إجراءات المتابعة', 'حجز القاعات'],
      performance: 94,
      responseTime: '1.0s'
    },
    {
      id: 'reminder-agent',
      name: 'Reminder Agent',
      nameAr: 'وكيل التذكير',
      description: 'Intelligent proactive notifications and smart alert system',
      descriptionAr: 'الإشعارات الاستباقية الذكية ونظام التنبيهات الذكي',
      icon: 'Bell',
      status: 'active',
      lastActivity: '3 min ago',
      lastActivityAr: 'منذ 3 دقائق',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      conversations: 5,
      expertise: ['Smart Reminders', 'Priority Alerts', 'Custom Notifications', 'Deadline Tracking'],
      expertiseAr: ['التذكيرات الذكية', 'تنبيهات الأولوية', 'الإشعارات المخصصة', 'تتبع المواعيد النهائية'],
      performance: 91,
      responseTime: '0.7s'
    },
    {
      id: 'report-writer',
      name: 'Report Writer',
      nameAr: 'كاتب التقارير',
      description: 'Advanced automated insights, analytics, and comprehensive reporting',
      descriptionAr: 'الرؤى الآلية المتقدمة والتحليلات والتقارير الشاملة',
      icon: 'FileText',
      status: 'idle',
      lastActivity: '1 hour ago',
      lastActivityAr: 'منذ ساعة واحدة',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      conversations: 1,
      expertise: ['Performance Reports', 'Data Analysis', 'Executive Summaries', 'KPI Tracking'],
      expertiseAr: ['تقارير الأداء', 'تحليل البيانات', 'الملخصات التنفيذية', 'تتبع مؤشرات الأداء'],
      performance: 89,
      responseTime: '2.1s'
    },
    {
      id: 'improvement-advisor',
      name: 'Improvement Advisor',
      nameAr: 'مستشار التحسين',
      description: 'Strategic recommendations, optimization, and performance enhancement',
      descriptionAr: 'التوصيات الاستراتيجية والتحسين وتعزيز الأداء',
      icon: 'TrendingUp',
      status: 'idle',
      lastActivity: '2 hours ago',
      lastActivityAr: 'منذ ساعتين',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      conversations: 0,
      expertise: ['Process Optimization', 'Strategic Planning', 'Efficiency Analysis', 'Best Practices'],
      expertiseAr: ['تحسين العمليات', 'التخطيط الاستراتيجي', 'تحليل الكفاءة', 'أفضل الممارسات'],
      performance: 93,
      responseTime: '1.8s'
    },
    {
      id: 'orchestrator',
      name: 'Orchestrator',
      nameAr: 'المنسق العام',
      description: 'Advanced multi-agent coordination and intelligent workflow management',
      descriptionAr: 'تنسيق الوكلاء المتعددين المتقدم وإدارة سير العمل الذكي',
      icon: 'Network',
      status: 'active',
      lastActivity: '30 sec ago',
      lastActivityAr: 'منذ 30 ثانية',
      color: 'bg-gradient-to-br from-teal-500 to-teal-600',
      conversations: 8,
      expertise: ['Agent Coordination', 'Workflow Automation', 'System Integration', 'Cross-Platform Sync'],
      expertiseAr: ['تنسيق الوكلاء', 'أتمتة سير العمل', 'تكامل النظام', 'المزامنة عبر المنصات'],
      performance: 96,
      responseTime: '0.9s'
    }
  ];

  useEffect(() => {
    const htmlElement = document.documentElement;
    setIsRTL(htmlElement.dir === 'rtl');

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 1024) {
        setIsRightSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      addToast({
        type: 'success',
        title: isRTL ? 'أهلاً وسهلاً' : 'Welcome Back',
        message: isRTL ? 'تم تحميل لوحة التحكم بنجاح' : 'Dashboard loaded successfully',
        duration: 3000
      });
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleAgentSelect = (agentId) => {
    setSelectedAgent(agentId);
    const agent = aiAgents.find(a => a.id === agentId);
    
    if (isMobileView) {
      setActiveTab('chat');
    }

    addToast({
      type: 'info',
      title: isRTL ? 'تم تغيير الوكيل' : 'Agent Changed',
      message: isRTL ? `تم التبديل إلى ${agent?.nameAr}` : `Switched to ${agent?.name}`,
      duration: 2000
    });
  };

  const getCurrentAgent = () => {
    return aiAgents.find(agent => agent.id === selectedAgent) || aiAgents[0];
  };

  const handleQuickAction = (action) => {
    addToast({
      type: 'info',
      title: isRTL ? 'إجراء سريع' : 'Quick Action',
      message: isRTL ? 'تم تنفيذ الإجراء' : 'Action executed',
      duration: 2000
    });

    switch (action) {
      case 'schedule-meeting':
        setTimeout(() => navigate('/meeting-coordination'), 500);
        break;
      case 'create-task':
        setTimeout(() => navigate('/task-team-management'), 500);
        break;
      case 'check-calendar':
        setTimeout(() => navigate('/calendar-management'), 500);
        break;
      case 'view-communications':
        setTimeout(() => navigate('/communication-hub'), 500);
        break;
      default:
        console.log(`Quick action: ${action}`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-secondary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Icon name="Zap" size={40} color="white" />
          </div>
          <LoadingSpinner 
            size="lg" 
            color="primary" 
            text={isRTL ? 'جاري تحميل لوحة التحكم...' : 'Loading Dashboard...'}
            isRTL={isRTL}
          />
        </div>
      </div>
    );
  }

  // Mobile Layout
  if (isMobileView) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ToastContainer toasts={toasts} onRemove={removeToast} isRTL={isRTL} />
        
        <div className="pt-16 pb-20">
          {activeTab === 'agents' && (
            <div className="h-[calc(100vh-9rem)]">
              <EnhancedAgentSelector
                agents={aiAgents}
                selectedAgent={selectedAgent}
                onAgentSelect={handleAgentSelect}
                isRTL={isRTL}
              />
            </div>
          )}
          
          {activeTab === 'chat' && (
            <div className="h-[calc(100vh-9rem)]">
              <EnhancedChatInterface
                agent={getCurrentAgent()}
                isRTL={isRTL}
                isMobile={true}
              />
            </div>
          )}
          
          {activeTab === 'widgets' && (
            <div className="p-4 h-[calc(100vh-9rem)] overflow-y-auto">
              <DashboardWidgets isRTL={isRTL} isMobile={true} />
            </div>
          )}
        </div>

        {/* Enhanced Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border z-50">
          <div className="flex items-center justify-around py-3">
            {[
              { id: 'agents', icon: 'Bot', label: 'Agents', labelAr: 'الوكلاء' },
              { id: 'chat', icon: 'MessageSquare', label: 'Chat', labelAr: 'المحادثة' },
              { id: 'widgets', icon: 'LayoutGrid', label: 'Dashboard', labelAr: 'لوحة التحكم' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? 'text-primary bg-primary-50 scale-105' :'text-text-secondary hover:text-text-primary hover:scale-105'
                }`}
              >
                <Icon name={tab.icon} size={22} />
                <span className="text-xs font-medium">
                  {isRTL ? tab.labelAr : tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <ToastContainer toasts={toasts} onRemove={removeToast} isRTL={isRTL} />
      
      <div className="lg:ml-80 pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Enhanced Left Sidebar - Agent Selector */}
          <div className="w-80 card-enhanced border-r border-border flex-shrink-0 m-4 mr-0 rounded-r-none">
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-border">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon name="Bot" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-text-primary">
                      {isRTL ? 'فريق الذكاء الاصطناعي' : 'AI Agent Team'}
                    </h1>
                    <p className="text-sm text-text-secondary">
                      {isRTL ? 'اختر وكيلاً للمحادثة' : 'Select an agent to chat with'}
                    </p>
                  </div>
                </div>
                
                {/* Agent Overview Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-success-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-success">
                      {aiAgents.filter(a => a.status === 'active').length}
                    </div>
                    <div className="text-xs text-success-600">
                      {isRTL ? 'نشط' : 'Active'}
                    </div>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">
                      {aiAgents.reduce((sum, a) => sum + a.conversations, 0)}
                    </div>
                    <div className="text-xs text-primary-600">
                      {isRTL ? 'محادثات' : 'Chats'}
                    </div>
                  </div>
                </div>
                
                <QuickActions onAction={handleQuickAction} isRTL={isRTL} />
              </div>
              
              <div className="flex-1 overflow-hidden">
                <EnhancedAgentSelector
                  agents={aiAgents}
                  selectedAgent={selectedAgent}
                  onAgentSelect={handleAgentSelect}
                  isRTL={isRTL}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Center - Chat Interface */}
          <div className="flex-1 flex flex-col min-w-0 m-4 mx-0">
            <div className="card-enhanced flex-1 overflow-hidden">
              <EnhancedChatInterface
                agent={getCurrentAgent()}
                isRTL={isRTL}
                isMobile={false}
              />
            </div>
          </div>

          {/* Enhanced Right Sidebar - Dashboard Widgets */}
          <div className={`
            ${
              isRightSidebarOpen ? 'w-80' : 'w-0'
            } transition-all duration-300 ease-out overflow-hidden
          `}>
            <div className="w-80 h-full m-4 ml-0">
              <div className="card-enhanced h-full flex flex-col rounded-l-none">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="text-lg font-semibold text-text-primary">
                    {isRTL ? 'نظرة عامة' : 'Overview'}
                  </h2>
                  <button
                    onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                    className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-all duration-150"
                    title={isRTL ? 'إخفاء/إظهار الشريط الجانبي' : 'Toggle Sidebar'}
                  >
                    <Icon 
                      name={isRightSidebarOpen ? 'ChevronRight' : 'ChevronLeft'} 
                      size={16}
                      className={isRTL ? 'rtl:rotate-180' : ''}
                    />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <DashboardWidgets isRTL={isRTL} isMobile={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Quick Access */}
      <button 
        className="fab"
        onClick={() => addToast({
          type: 'info',
          title: isRTL ? 'إجراء سريع' : 'Quick Action',
          message: isRTL ? 'كيف يمكنني مساعدتك؟' : 'How can I help you?',
          duration: 3000
        })}
        title={isRTL ? 'مساعدة سريعة' : 'Quick Help'}
      >
        <Icon name="Zap" size={24} color="white" />
      </button>
    </div>
  );
};

export default ExecutiveDashboard;