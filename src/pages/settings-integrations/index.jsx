// src/pages/settings-integrations/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import Toast, { useToast } from 'components/ui/Toast';

const SettingsIntegrations = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const { toasts, addToast, removeToast } = useToast();
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    general: {
      language: 'en',
      theme: 'light',
      timezone: 'UTC',
      notifications: true,
      autoBackup: true,
      workingHours: { start: '09:00', end: '17:00' }
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      taskReminders: true,
      meetingAlerts: true,
      deadlineWarnings: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginAttempts: '5'
    }
  });

  const [integrations, setIntegrations] = useState([
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and collaboration',
      descriptionAr: 'التواصل والتعاون الجماعي',
      icon: 'MessageSquare',
      status: 'connected',
      category: 'communication',
      lastSync: '2024-01-15 10:30',
      features: ['Messages', 'Channels', 'File Sharing'],
      featuresAr: ['الرسائل', 'القنوات', 'مشاركة الملفات']
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Calendar synchronization and scheduling',
      descriptionAr: 'مزامنة التقويم والجدولة',
      icon: 'Calendar',
      status: 'connected',
      category: 'productivity',
      lastSync: '2024-01-15 11:15',
      features: ['Events', 'Reminders', 'Shared Calendars'],
      featuresAr: ['الأحداث', 'التذكيرات', 'التقاويم المشتركة']
    },
    {
      id: 'microsoft-teams',
      name: 'Microsoft Teams',
      description: 'Video conferencing and team collaboration',
      descriptionAr: 'مؤتمرات الفيديو والتعاون الجماعي',
      icon: 'Video',
      status: 'available',
      category: 'communication',
      lastSync: null,
      features: ['Video Calls', 'Screen Sharing', 'Chat'],
      featuresAr: ['مكالمات الفيديو', 'مشاركة الشاشة', 'الدردشة']
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Project management and task organization',
      descriptionAr: 'إدارة المشاريع وتنظيم المهام',
      icon: 'CheckSquare',
      status: 'available',
      category: 'productivity',
      lastSync: null,
      features: ['Boards', 'Cards', 'Checklists'],
      featuresAr: ['اللوحات', 'البطاقات', 'قوائم المراجعة']
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Email management and automation',
      descriptionAr: 'إدارة البريد الإلكتروني والأتمتة',
      icon: 'Mail',
      status: 'connected',
      category: 'communication',
      lastSync: '2024-01-15 09:45',
      features: ['Email Sync', 'Auto-Reply', 'Filters'],
      featuresAr: ['مزامنة البريد', 'الرد التلقائي', 'المرشحات']
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Cloud storage and file sharing',
      descriptionAr: 'التخزين السحابي ومشاركة الملفات',
      icon: 'Cloud',
      status: 'available',
      category: 'storage',
      lastSync: null,
      features: ['File Sync', 'Sharing', 'Backup'],
      featuresAr: ['مزامنة الملفات', 'المشاركة', 'النسخ الاحتياطي']
    }
  ]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    setIsRTL(htmlElement.dir === 'rtl');
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'available': return 'Plus';
      case 'error': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'communication': return 'MessageSquare';
      case 'productivity': return 'CheckSquare';
      case 'storage': return 'Cloud';
      default: return 'Package';
    }
  };

  const handleIntegrationAction = (integration, action) => {
    if (action === 'connect') {
      setSelectedIntegration(integration);
      setIsIntegrationModalOpen(true);
    } else if (action === 'disconnect') {
      const updatedIntegrations = integrations.map(int => 
        int.id === integration.id 
          ? { ...int, status: 'available', lastSync: null }
          : int
      );
      setIntegrations(updatedIntegrations);
      addToast({
        type: 'success',
        title: isRTL ? 'تم قطع الاتصال' : 'Disconnected',
        message: isRTL ? `تم قطع الاتصال مع ${integration.name}` : `Disconnected from ${integration.name}`,
        duration: 3000
      });
    }
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    addToast({
      type: 'info',
      title: isRTL ? 'تم الحفظ' : 'Saved',
      message: isRTL ? 'تم حفظ الإعدادات' : 'Settings saved',
      duration: 2000
    });
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      {/* Language & Theme */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isRTL ? 'التفضيلات العامة' : 'General Preferences'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRTL ? 'اللغة' : 'Language'}
            </label>
            <select 
              value={settings.general.language}
              onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">{isRTL ? 'الإنجليزية' : 'English'}</option>
              <option value="ar">{isRTL ? 'العربية' : 'Arabic'}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRTL ? 'المظهر' : 'Theme'}
            </label>
            <select 
              value={settings.general.theme}
              onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">{isRTL ? 'فاتح' : 'Light'}</option>
              <option value="dark">{isRTL ? 'داكن' : 'Dark'}</option>
              <option value="auto">{isRTL ? 'تلقائي' : 'Auto'}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRTL ? 'المنطقة الزمنية' : 'Timezone'}
            </label>
            <select 
              value={settings.general.timezone}
              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT+3">GMT+3 (Riyadh)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isRTL ? 'ساعات العمل' : 'Working Hours'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRTL ? 'بداية العمل' : 'Start Time'}
            </label>
            <input
              type="time"
              value={settings.general.workingHours.start}
              onChange={(e) => handleSettingChange('general', 'workingHours', {
                ...settings.general.workingHours,
                start: e.target.value
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRTL ? 'نهاية العمل' : 'End Time'}
            </label>
            <input
              type="time"
              value={settings.general.workingHours.end}
              onChange={(e) => handleSettingChange('general', 'workingHours', {
                ...settings.general.workingHours,
                end: e.target.value
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isRTL ? 'إعدادات النظام' : 'System Settings'}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                {isRTL ? 'الإشعارات' : 'Notifications'}
              </h4>
              <p className="text-sm text-gray-600">
                {isRTL ? 'تمكين الإشعارات العامة' : 'Enable general notifications'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.general.notifications}
                onChange={(e) => handleSettingChange('general', 'notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                {isRTL ? 'النسخ الاحتياطي التلقائي' : 'Auto Backup'}
              </h4>
              <p className="text-sm text-gray-600">
                {isRTL ? 'إنشاء نسخ احتياطية تلقائية' : 'Automatically create backups'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.general.autoBackup}
                onChange={(e) => handleSettingChange('general', 'autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {isRTL ? 'إعدادات الإشعارات' : 'Notification Settings'}
      </h3>
      
      <div className="space-y-6">
        {/* Delivery Methods */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">
            {isRTL ? 'طرق التسليم' : 'Delivery Methods'}
          </h4>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email', labelAr: 'البريد الإلكتروني' },
              { key: 'push', label: 'Push Notifications', labelAr: 'الإشعارات المنبثقة' },
              { key: 'sms', label: 'SMS', labelAr: 'الرسائل النصية' }
            ].map((method) => (
              <div key={method.key} className="flex items-center justify-between">
                <span className="text-gray-900">{isRTL ? method.labelAr : method.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications[method.key]}
                    onChange={(e) => handleSettingChange('notifications', method.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Notification Types */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">
            {isRTL ? 'أنواع الإشعارات' : 'Notification Types'}
          </h4>
          <div className="space-y-4">
            {[
              { key: 'taskReminders', label: 'Task Reminders', labelAr: 'تذكيرات المهام' },
              { key: 'meetingAlerts', label: 'Meeting Alerts', labelAr: 'تنبيهات الاجتماعات' },
              { key: 'deadlineWarnings', label: 'Deadline Warnings', labelAr: 'تحذيرات المواعيد النهائية' }
            ].map((type) => (
              <div key={type.key} className="flex items-center justify-between">
                <span className="text-gray-900">{isRTL ? type.labelAr : type.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications[type.key]}
                    onChange={(e) => handleSettingChange('notifications', type.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Authentication */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isRTL ? 'المصادقة' : 'Authentication'}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                {isRTL ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}
              </h4>
              <p className="text-sm text-gray-600">
                {isRTL ? 'طبقة حماية إضافية لحسابك' : 'Extra security layer for your account'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Session & Password */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isRTL ? 'الجلسة وكلمة المرور' : 'Session & Password'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRTL ? 'انتهاء الجلسة (دقائق)' : 'Session Timeout (minutes)'}
            </label>
            <select 
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="120">120</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRTL ? 'انتهاء كلمة المرور (أيام)' : 'Password Expiry (days)'}
            </label>
            <select 
              value={settings.security.passwordExpiry}
              onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="90">90</option>
              <option value="never">{isRTL ? 'أبداً' : 'Never'}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRTL ? 'محاولات تسجيل الدخول' : 'Login Attempts'}
            </label>
            <select 
              value={settings.security.loginAttempts}
              onChange={(e) => handleSettingChange('security', 'loginAttempts', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      {/* Integration Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'متصل' : 'Connected'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {integrations?.filter(i => i.status === 'connected')?.length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'متاح' : 'Available'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {integrations?.filter(i => i.status === 'available')?.length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'إجمالي' : 'Total'}</p>
              <p className="text-2xl font-bold text-gray-900">{integrations?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <h3 className="text-lg font-semibold">{isRTL ? 'التكاملات المتاحة' : 'Available Integrations'}</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations?.map((integration) => (
              <div key={integration.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon name={integration.icon} size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{integration.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                        <Icon name={getStatusIcon(integration.status)} size={12} className="mr-1 rtl:mr-0 rtl:ml-1" />
                        {integration.status === 'connected' ? (isRTL ? 'متصل' : 'Connected') : (isRTL ? 'متاح' : 'Available')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {isRTL ? integration.descriptionAr : integration.description}
                </p>
                
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {(isRTL ? integration.featuresAr : integration.features)?.slice(0, 2).map((feature, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {integration.lastSync && (
                  <p className="text-xs text-gray-500 mb-3">
                    {isRTL ? 'آخر مزامنة:' : 'Last sync:'} {integration.lastSync}
                  </p>
                )}
                
                <div className="flex space-x-2 rtl:space-x-reverse">
                  {integration.status === 'connected' ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleIntegrationAction(integration, 'configure')}
                      >
                        <Icon name="Settings" size={14} className="mr-1 rtl:mr-0 rtl:ml-1" />
                        {isRTL ? 'إعداد' : 'Configure'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleIntegrationAction(integration, 'disconnect')}
                      >
                        {isRTL ? 'قطع' : 'Disconnect'}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleIntegrationAction(integration, 'connect')}
                      className="w-full"
                    >
                      <Icon name="Plus" size={14} className="mr-1 rtl:mr-0 rtl:ml-1" />
                      {isRTL ? 'اتصال' : 'Connect'}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-80 pt-16 p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isRTL ? 'الإعدادات والتكاملات' : 'Settings & Integrations'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isRTL ? 'إدارة إعدادات النظام والتكاملات مع التطبيقات الخارجية' : 'Manage system settings and integrations with external applications'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 rtl:space-x-reverse bg-white rounded-lg p-1 shadow-sm w-fit">
            {['general', 'notifications', 'security', 'integrations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeTab === tab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                <Icon 
                  name={tab === 'general' ? 'Settings' : tab === 'notifications' ? 'Bell' : tab === 'security' ? 'Shield' : 'Package'} 
                  size={16} 
                  className="mr-2 rtl:mr-0 rtl:ml-2 inline" 
                />
                {isRTL ? 
                  (tab === 'general' ? 'عام' : tab === 'notifications' ? 'الإشعارات' : tab === 'security' ? 'الأمان' : 'التكاملات') :
                  (tab.charAt(0).toUpperCase() + tab.slice(1))
                }
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && renderGeneralTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'security' && renderSecurityTab()}
        {activeTab === 'integrations' && renderIntegrationsTab()}
      </div>

      {/* Integration Setup Modal */}
      <Modal
        isOpen={isIntegrationModalOpen}
        onClose={() => setIsIntegrationModalOpen(false)}
        title={selectedIntegration ? 
          (isRTL ? `ربط ${selectedIntegration.name}` : `Connect ${selectedIntegration.name}`) : 
          ''
        }
      >
        <div className="p-6">
          {selectedIntegration && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon name={selectedIntegration.icon} size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedIntegration.name}</h3>
                  <p className="text-sm text-gray-600">
                    {isRTL ? selectedIntegration.descriptionAr : selectedIntegration.description}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {isRTL ? 'الميزات المتاحة:' : 'Available Features:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(isRTL ? selectedIntegration.featuresAr : selectedIntegration.features)?.map((feature, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2 rtl:space-x-reverse pt-4">
                <Button 
                  variant="primary" 
                  onClick={() => {
                    const updatedIntegrations = integrations.map(int => 
                      int.id === selectedIntegration.id 
                        ? { ...int, status: 'connected', lastSync: new Date().toLocaleString() }
                        : int
                    );
                    setIntegrations(updatedIntegrations);
                    setIsIntegrationModalOpen(false);
                    addToast({
                      type: 'success',
                      title: isRTL ? 'تم الاتصال' : 'Connected',
                      message: isRTL ? `تم الاتصال بـ ${selectedIntegration.name} بنجاح` : `Successfully connected to ${selectedIntegration.name}`,
                      duration: 3000
                    });
                  }}
                >
                  {isRTL ? 'اتصال' : 'Connect'}
                </Button>
                <Button variant="outline" onClick={() => setIsIntegrationModalOpen(false)}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 rtl:right-auto rtl:left-4 z-50 space-y-2">
        {toasts?.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
            isRTL={isRTL}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsIntegrations;