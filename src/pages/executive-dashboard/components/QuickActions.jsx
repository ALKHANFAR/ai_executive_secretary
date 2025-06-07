import React from 'react';
import Icon from 'components/AppIcon';

const QuickActions = ({ onAction, isRTL }) => {
  const quickActions = [
    {
      id: 'schedule-meeting',
      label: 'Schedule Meeting',
      labelAr: 'جدولة اجتماع',
      icon: 'Calendar',
      color: 'bg-primary hover:bg-primary-700',
      description: 'Create a new meeting',
      descriptionAr: 'إنشاء اجتماع جديد'
    },
    {
      id: 'create-task',
      label: 'Create Task',
      labelAr: 'إنشاء مهمة',
      icon: 'Plus',
      color: 'bg-accent hover:bg-accent-500',
      description: 'Add a new task',
      descriptionAr: 'إضافة مهمة جديدة'
    },
    {
      id: 'check-calendar',
      label: 'Check Calendar',
      labelAr: 'تحقق من التقويم',
      icon: 'Clock',
      color: 'bg-secondary-600 hover:bg-secondary-700',
      description: 'View your schedule',
      descriptionAr: 'عرض جدولك'
    },
    {
      id: 'view-communications',
      label: 'Communications',
      labelAr: 'الاتصالات',
      icon: 'MessageSquare',
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Check messages',
      descriptionAr: 'تحقق من الرسائل'
    }
  ];

  const getCurrentLabel = (action) => {
    return isRTL ? action.labelAr : action.label;
  };

  const getCurrentDescription = (action) => {
    return isRTL ? action.descriptionAr : action.description;
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {quickActions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction(action.id)}
          className={`
            ${action.color} text-white p-3 rounded-xl text-left rtl:text-right
            transition-all duration-150 ease-out transform hover:scale-105 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            shadow-sm hover:shadow-md
          `}
          title={getCurrentDescription(action)}
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
            <Icon name={action.icon} size={16} />
            <span className="text-sm font-medium truncate">
              {getCurrentLabel(action)}
            </span>
          </div>
          <p className="text-xs opacity-90 truncate">
            {getCurrentDescription(action)}
          </p>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;