import React, { useState } from 'react';
import Icon from 'components/AppIcon';


const DashboardWidgets = ({ isRTL, isMobile }) => {
  const [selectedMetric, setSelectedMetric] = useState('productivity');

  const todaySchedule = [
    {
      id: 1,
      title: 'Team Standup',
      titleAr: 'اجتماع الفريق اليومي',
      time: '9:00 AM',
      timeAr: '9:00 صباحاً',
      duration: '30 min',
      durationAr: '30 دقيقة',
      type: 'meeting',
      status: 'upcoming',
      attendees: 8
    },
    {
      id: 2,
      title: 'Client Presentation',
      titleAr: 'عرض تقديمي للعميل',
      time: '10:30 AM',
      timeAr: '10:30 صباحاً',
      duration: '1 hour',
      durationAr: 'ساعة واحدة',
      type: 'presentation',
      status: 'in-progress',
      attendees: 5
    },
    {
      id: 3,
      title: 'Lunch with Marketing',
      titleAr: 'غداء مع فريق التسويق',
      time: '12:00 PM',
      timeAr: '12:00 ظهراً',
      duration: '1 hour',
      durationAr: 'ساعة واحدة',
      type: 'meal',
      status: 'upcoming',
      attendees: 4
    }
  ];

  const urgentTasks = [
    {
      id: 1,
      title: 'Review Q4 Budget Proposal',
      titleAr: 'مراجعة اقتراح ميزانية الربع الرابع',
      priority: 'high',
      dueDate: 'Today',
      dueDateAr: 'اليوم',
      assignee: 'Finance Team',
      assigneeAr: 'فريق المالية',
      progress: 75
    },
    {
      id: 2,
      title: 'Approve Marketing Campaign',
      titleAr: 'الموافقة على الحملة التسويقية',
      priority: 'high',
      dueDate: 'Tomorrow',
      dueDateAr: 'غداً',
      assignee: 'Marketing Team',
      assigneeAr: 'فريق التسويق',
      progress: 90
    },
    {
      id: 3,
      title: 'Sign Partnership Agreement',
      titleAr: 'توقيع اتفاقية الشراكة',
      priority: 'medium',
      dueDate: 'This Week',
      dueDateAr: 'هذا الأسبوع',
      assignee: 'Legal Team',
      assigneeAr: 'الفريق القانوني',
      progress: 60
    }
  ];

  const communications = [
    {
      id: 1,
      type: 'email',
      count: 12,
      label: 'Unread Emails',
      labelAr: 'رسائل غير مقروءة',
      priority: 'high',
      lastUpdate: '5 min ago',
      lastUpdateAr: 'منذ 5 دقائق'
    },
    {
      id: 2,
      type: 'slack',
      count: 8,
      label: 'Slack Messages',
      labelAr: 'رسائل سلاك',
      priority: 'medium',
      lastUpdate: '10 min ago',
      lastUpdateAr: 'منذ 10 دقائق'
    },
    {
      id: 3,
      type: 'whatsapp',
      count: 3,
      label: 'WhatsApp Business',
      labelAr: 'واتساب الأعمال',
      priority: 'low',
      lastUpdate: '1 hour ago',
      lastUpdateAr: 'منذ ساعة واحدة'
    }
  ];

  const performanceMetrics = [
    {
      id: 'productivity',
      label: 'Productivity',
      labelAr: 'الإنتاجية',
      value: 87,
      change: '+5%',
      trend: 'up',
      color: 'text-success'
    },
    {
      id: 'efficiency',
      label: 'Efficiency',
      labelAr: 'الكفاءة',
      value: 92,
      change: '+3%',
      trend: 'up',
      color: 'text-success'
    },
    {
      id: 'team-satisfaction',
      label: 'Team Satisfaction',
      labelAr: 'رضا الفريق',
      value: 94,
      change: '+2%',
      trend: 'up',
      color: 'text-success'
    },
    {
      id: 'goal-completion',
      label: 'Goal Completion',
      labelAr: 'إنجاز الأهداف',
      value: 78,
      change: '-2%',
      trend: 'down',
      color: 'text-warning'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'text-primary bg-primary-50';
      case 'in-progress':
        return 'text-success bg-success-50';
      case 'completed':
        return 'text-secondary-600 bg-secondary-100';
      default:
        return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error-50';
      case 'medium':
        return 'text-warning bg-warning-50';
      case 'low':
        return 'text-success bg-success-50';
      default:
        return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'meeting':
        return 'Users';
      case 'presentation':
        return 'Presentation';
      case 'meal':
        return 'Coffee';
      case 'email':
        return 'Mail';
      case 'slack':
        return 'MessageSquare';
      case 'whatsapp':
        return 'MessageCircle';
      default:
        return 'Calendar';
    }
  };

  const getCurrentTitle = (item) => {
    return isRTL && item.titleAr ? item.titleAr : item.title;
  };

  const getCurrentLabel = (item) => {
    return isRTL && item.labelAr ? item.labelAr : item.label;
  };

  const getCurrentTime = (item) => {
    return isRTL && item.timeAr ? item.timeAr : item.time;
  };

  const getCurrentDuration = (item) => {
    return isRTL && item.durationAr ? item.durationAr : item.duration;
  };

  const getCurrentDueDate = (item) => {
    return isRTL && item.dueDateAr ? item.dueDateAr : item.dueDate;
  };

  const getCurrentAssignee = (item) => {
    return isRTL && item.assigneeAr ? item.assigneeAr : item.assignee;
  };

  const getCurrentUpdate = (item) => {
    return isRTL && item.lastUpdateAr ? item.lastUpdateAr : item.lastUpdate;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Today's Schedule */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {isRTL ? 'جدول اليوم' : "Today's Schedule"}
          </h3>
          <button className="text-primary hover:text-primary-700 text-sm font-medium">
            {isRTL ? 'عرض الكل' : 'View All'}
          </button>
        </div>
        
        <div className="space-y-3">
          {todaySchedule.map((event) => (
            <div key={event.id} className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg hover:bg-secondary-50 transition-all duration-150">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(event.status)}`}>
                <Icon name={getTypeIcon(event.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary truncate">
                  {getCurrentTitle(event)}
                </h4>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-text-secondary">
                  <span>{getCurrentTime(event)}</span>
                  <span>•</span>
                  <span>{getCurrentDuration(event)}</span>
                  {event.attendees && (
                    <>
                      <span>•</span>
                      <span>{event.attendees} {isRTL ? 'مشارك' : 'attendees'}</span>
                    </>
                  )}
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary rtl:rotate-180" />
            </div>
          ))}
        </div>
      </div>

      {/* Urgent Tasks */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {isRTL ? 'المهام العاجلة' : 'Urgent Tasks'}
          </h3>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error-100 text-error-700">
            {urgentTasks.length} {isRTL ? 'عاجل' : 'urgent'}
          </span>
        </div>
        
        <div className="space-y-3">
          {urgentTasks.map((task) => (
            <div key={task.id} className="p-3 rounded-lg border border-border hover:border-secondary-300 transition-all duration-150">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-text-primary flex-1">
                  {getCurrentTitle(task)}
                </h4>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                <span>{getCurrentDueDate(task)}</span>
                <span>{getCurrentAssignee(task)}</span>
              </div>
              
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-text-secondary mt-1 text-right rtl:text-left">
                {task.progress}% {isRTL ? 'مكتمل' : 'complete'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Communications */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {isRTL ? 'الاتصالات' : 'Communications'}
          </h3>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-text-secondary">
              {isRTL ? 'مباشر' : 'Live'}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          {communications.map((comm) => (
            <div key={comm.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary-50 transition-all duration-150">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Icon name={getTypeIcon(comm.type)} size={16} className="text-text-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">
                    {getCurrentLabel(comm)}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {getCurrentUpdate(comm)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {comm.count > 0 && (
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                    comm.priority === 'high' ? 'bg-error text-white' :
                    comm.priority === 'medium'? 'bg-warning text-white' : 'bg-secondary-400 text-white'
                  }`}>
                    {comm.count > 9 ? '9+' : comm.count}
                  </span>
                )}
                <Icon name="ChevronRight" size={14} className="text-text-secondary rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {isRTL ? 'مقاييس الأداء' : 'Performance Metrics'}
          </h3>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="text-xs border border-border rounded-lg px-2 py-1 bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="productivity">{isRTL ? 'هذا الأسبوع' : 'This Week'}</option>
            <option value="monthly">{isRTL ? 'هذا الشهر' : 'This Month'}</option>
            <option value="quarterly">{isRTL ? 'هذا الربع' : 'This Quarter'}</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {performanceMetrics.map((metric) => (
            <div key={metric.id} className="p-3 rounded-lg bg-secondary-50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-text-secondary">
                  {getCurrentLabel(metric)}
                </span>
                <span className={`text-xs font-medium ${metric.color}`}>
                  {metric.change}
                </span>
              </div>
              
              <div className="flex items-end space-x-2 rtl:space-x-reverse">
                <span className="text-2xl font-bold text-text-primary">
                  {metric.value}%
                </span>
                <Icon 
                  name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                  className={metric.color}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200 p-4">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={16} color="white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-primary mb-1">
              {isRTL ? 'رؤية ذكية' : 'AI Insight'}
            </h4>
            <p className="text-sm text-text-primary">
              {isRTL 
                ? 'لديك 3 اجتماعات متتالية اليوم. أقترح جدولة فترات راحة قصيرة بينها لتحسين التركيز والإنتاجية.' :'You have 3 back-to-back meetings today. I suggest scheduling short breaks between them to improve focus and productivity.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;