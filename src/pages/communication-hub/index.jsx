// src/pages/communication-hub/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Modal from 'components/ui/Modal';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hooks/useTranslation';

const CommunicationHub = () => {
  const [selectedChannel, setSelectedChannel] = useState('email');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Mock communication data
  const [communications, setCommunications] = useState([
    {
      id: 1,
      type: 'email',
      sender: 'john.smith@company.com',
      senderAr: 'جون سميث',
      subject: 'Q4 Financial Report Review',
      subjectAr: 'مراجعة التقرير المالي للربع الرابع',
      preview: 'Please find attached the financial report for Q4...',
      previewAr: 'يرجى الاطلاع على التقرير المالي المرفق للربع الرابع...',
      timestamp: new Date().setHours(new Date().getHours() - 2),
      isRead: false,
      priority: 'high',
      hasAttachment: true
    },
    {
      id: 2,
      type: 'slack',
      sender: 'Sarah Chen',
      senderAr: 'سارة تشين',
      subject: 'Marketing Team Channel',
      subjectAr: 'قناة فريق التسويق',
      preview: 'New campaign ideas for next quarter',
      previewAr: 'أفكار حملات جديدة للربع القادم',
      timestamp: new Date().setHours(new Date().getHours() - 1),
      isRead: true,
      priority: 'medium',
      hasAttachment: false
    },
    {
      id: 3,
      type: 'whatsapp',
      sender: 'Mike Johnson',
      senderAr: 'مايك جونسون',
      subject: 'Project Status Update',
      subjectAr: 'تحديث حالة المشروع',
      preview: 'Project is on track for next week delivery',
      previewAr: 'المشروع على المسار الصحيح للتسليم الأسبوع القادم',
      timestamp: new Date().setMinutes(new Date().getMinutes() - 30),
      isRead: false,
      priority: 'high',
      hasAttachment: false
    },
    {
      id: 4,
      type: 'teams',
      sender: 'Lisa Wilson',
      senderAr: 'ليزا ويلسون',
      subject: 'Weekly Standup Meeting',
      subjectAr: 'اجتماع التقارير الأسبوعي',
      preview: 'Reminder: Weekly standup at 10 AM tomorrow',
      previewAr: 'تذكير: التقرير الأسبوعي في الساعة 10 صباحاً غداً',
      timestamp: new Date().setMinutes(new Date().getMinutes() - 15),
      isRead: true,
      priority: 'low',
      hasAttachment: false
    }
  ]);

  const channels = [
    {
      id: 'all',
      name: t('All Communications'),
      nameAr: 'جميع الاتصالات',
      icon: 'MessageSquare',
      count: communications.length,
      color: 'bg-blue-500'
    },
    {
      id: 'email',
      name: t('Email'),
      nameAr: 'البريد الإلكتروني',
      icon: 'Mail',
      count: communications.filter(c => c.type === 'email').length,
      color: 'bg-red-500'
    },
    {
      id: 'slack',
      name: t('Slack'),
      nameAr: 'سلاك',
      icon: 'Hash',
      count: communications.filter(c => c.type === 'slack').length,
      color: 'bg-purple-500'
    },
    {
      id: 'whatsapp',
      name: t('WhatsApp'),
      nameAr: 'واتساب',
      icon: 'MessageCircle',
      count: communications.filter(c => c.type === 'whatsapp').length,
      color: 'bg-green-500'
    },
    {
      id: 'teams',
      name: t('Teams'),
      nameAr: 'تيمز',
      icon: 'Video',
      count: communications.filter(c => c.type === 'teams').length,
      color: 'bg-indigo-500'
    }
  ];

  const getFilteredCommunications = () => {
    let filtered = communications;
    
    if (selectedChannel !== 'all') {
      filtered = filtered.filter(comm => comm.type === selectedChannel);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(comm => 
        comm.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comm.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (isRTL && (
          comm.senderAr?.includes(searchTerm) ||
          comm.subjectAr?.includes(searchTerm) ||
          comm.previewAr?.includes(searchTerm)
        ))
      );
    }
    
    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getChannelIcon = (type) => {
    switch (type) {
      case 'email': return 'Mail';
      case 'slack': return 'Hash';
      case 'whatsapp': return 'MessageCircle';
      case 'teams': return 'Video';
      default: return 'MessageSquare';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return isRTL ? `منذ ${diffInMinutes} دقيقة` : `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return isRTL ? `منذ ${hours} ساعة` : `${hours}h ago`;
    } else {
      return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US');
    }
  };

  const handleCommunicationClick = (communication) => {
    setCommunications(prev => 
      prev.map(comm => 
        comm.id === communication.id ? { ...comm, isRead: true } : comm
      )
    );
  };

  const handleCompose = () => {
    setIsComposeModalOpen(true);
  };

  const unreadCount = communications.filter(c => !c.isRead).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-80 pt-16 p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                {t('pages.communications.title')}
              </h1>
              <p className="text-text-secondary mt-1">
                {t('pages.communications.subtitle')}
              </p>
            </div>
            
            <Button
              variant="gradient"
              onClick={handleCompose}
              leftIcon="Plus"
            >
              {isRTL ? 'رسالة جديدة' : 'New Message'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Channels Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {isRTL ? 'القنوات' : 'Channels'}
              </h3>
              
              <div className="space-y-2">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-xl transition-all duration-150
                      ${selectedChannel === channel.id
                        ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className={`w-8 h-8 ${channel.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={channel.icon} size={16} color="white" />
                      </div>
                      <span className="font-medium">
                        {isRTL ? channel.nameAr : channel.name}
                      </span>
                    </div>
                    <span className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${selectedChannel === channel.id
                        ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary'
                      }
                    `}>
                      {channel.count}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{unreadCount}</div>
                    <div className="text-xs text-text-secondary">
                      {isRTL ? 'غير مقروءة' : 'Unread'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{communications.length}</div>
                    <div className="text-xs text-text-secondary">
                      {isRTL ? 'المجموع' : 'Total'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Communications List */}
          <div className="lg:col-span-3">
            <div className="bg-surface rounded-2xl shadow-sm">
              {/* Search Header */}
              <div className="p-6 border-b border-border">
                <Input
                  type="search"
                  placeholder={isRTL ? 'البحث في الرسائل...' : 'Search messages...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon="Search"
                  className="w-full"
                />
              </div>
              
              {/* Communications List */}
              <div className="divide-y divide-border max-h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar">
                {getFilteredCommunications().length > 0 ? (
                  getFilteredCommunications().map((communication) => (
                    <div
                      key={communication.id}
                      onClick={() => handleCommunicationClick(communication)}
                      className={`
                        p-6 hover:bg-secondary-50 transition-colors duration-150 cursor-pointer
                        ${!communication.isRead ? 'bg-primary-50' : ''}
                      `}
                    >
                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        {/* Channel Icon */}
                        <div className="flex-shrink-0">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${communication.type === 'email' ? 'bg-red-100 text-red-600' :
                              communication.type === 'slack' ? 'bg-purple-100 text-purple-600' :
                              communication.type === 'whatsapp'? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
                            }
                          `}>
                            <Icon name={getChannelIcon(communication.type)} size={20} />
                          </div>
                        </div>
                        
                        {/* Message Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-medium ${!communication.isRead ? 'text-text-primary' : 'text-text-secondary'}`}>
                              {isRTL ? communication.senderAr : communication.sender}
                            </h4>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              {communication.hasAttachment && (
                                <Icon name="Paperclip" size={14} className="text-text-secondary" />
                              )}
                              <span className="text-xs text-text-secondary">
                                {formatTimestamp(communication.timestamp)}
                              </span>
                            </div>
                          </div>
                          
                          <h5 className={`text-sm mb-1 ${!communication.isRead ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                            {isRTL ? communication.subjectAr : communication.subject}
                          </h5>
                          
                          <p className="text-sm text-text-secondary line-clamp-2">
                            {isRTL ? communication.previewAr : communication.preview}
                          </p>
                        </div>
                        
                        {/* Priority Indicator */}
                        <div className="flex-shrink-0">
                          <div className={`
                            w-3 h-3 rounded-full
                            ${communication.priority === 'high' ? 'bg-red-500' :
                              communication.priority === 'medium'? 'bg-yellow-500' : 'bg-green-500'
                            }
                          `} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                      {isRTL ? 'لا توجد رسائل' : 'No messages found'}
                    </h3>
                    <p className="text-text-secondary">
                      {isRTL 
                        ? 'لا توجد رسائل تطابق معايير البحث الخاصة بك' :'No messages match your search criteria'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-surface rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Icon name="Mail" size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">{isRTL ? 'رسائل البريد' : 'Emails'}</p>
                <p className="text-2xl font-bold text-text-primary">
                  {communications.filter(c => c.type === 'email').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Icon name="Hash" size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">{isRTL ? 'رسائل سلاك' : 'Slack Messages'}</p>
                <p className="text-2xl font-bold text-text-primary">
                  {communications.filter(c => c.type === 'slack').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon name="MessageCircle" size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">{isRTL ? 'رسائل واتساب' : 'WhatsApp'}</p>
                <p className="text-2xl font-bold text-text-primary">
                  {communications.filter(c => c.type === 'whatsapp').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Icon name="Video" size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">{isRTL ? 'رسائل تيمز' : 'Teams Messages'}</p>
                <p className="text-2xl font-bold text-text-primary">
                  {communications.filter(c => c.type === 'teams').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      <Modal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
        title={isRTL ? 'رسالة جديدة' : 'New Message'}
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {isRTL ? 'القناة' : 'Channel'}
            </label>
            <select className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
              <option value="email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</option>
              <option value="slack">{isRTL ? 'سلاك' : 'Slack'}</option>
              <option value="whatsapp">{isRTL ? 'واتساب' : 'WhatsApp'}</option>
              <option value="teams">{isRTL ? 'تيمز' : 'Teams'}</option>
            </select>
          </div>
          
          <Input
            label={isRTL ? 'المستقبل' : 'To'}
            placeholder={isRTL ? 'أدخل عنوان البريد الإلكتروني' : 'Enter recipient email'}
          />
          
          <Input
            label={isRTL ? 'الموضوع' : 'Subject'}
            placeholder={isRTL ? 'موضوع الرسالة' : 'Message subject'}
          />
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {isRTL ? 'الرسالة' : 'Message'}
            </label>
            <textarea
              rows={6}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={() => setIsComposeModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" leftIcon="Send">
              {isRTL ? 'إرسال' : 'Send Message'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CommunicationHub;