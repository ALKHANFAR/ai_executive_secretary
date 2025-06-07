import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';


const ChatInterface = ({ agent, isRTL, isMobile }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const mockMessages = [
    {
      id: 1,
      type: 'agent',
      content: `Hello! I'm your ${agent.name}. I'm here to help you with scheduling, conflict resolution, and time management. How can I assist you today?`,
      contentAr: `مرحباً! أنا ${agent.nameAr}. أنا هنا لمساعدتك في الجدولة وحل التعارضات وإدارة الوقت. كيف يمكنني مساعدتك اليوم؟`,
      timestamp: new Date(Date.now() - 300000),
      avatar: agent.color
    },
    {
      id: 2,
      type: 'user',
      content: "Can you show me my schedule for today and check if there are any conflicts?",
      contentAr: "هل يمكنك إظهار جدولي لليوم والتحقق من وجود أي تعارضات؟",
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: 3,
      type: 'agent',
      content: `I've analyzed your calendar for today. You have 6 meetings scheduled, and I found 1 potential conflict that needs your attention.

**Today's Schedule:**
• 9:00 AM - Team Standup (30 min)
• 10:30 AM - Client Presentation (1 hour)
• 12:00 PM - Lunch with Marketing Team
• 2:00 PM - Budget Review Meeting
• 3:30 PM - Quarterly Planning Session
• 5:00 PM - One-on-One with Sarah

**⚠️ Conflict Detected:**
Your "Budget Review Meeting" at 2:00 PM might run over into your "Quarterly Planning Session" at 3:30 PM. I recommend extending the buffer time or rescheduling one of these meetings.

Would you like me to suggest alternative times or send rescheduling requests?`,
      contentAr: `لقد قمت بتحليل تقويمك لليوم. لديك 6 اجتماعات مجدولة، ووجدت تعارضاً محتملاً واحداً يحتاج إلى انتباهك.

**جدول اليوم:**
• 9:00 صباحاً - اجتماع الفريق اليومي (30 دقيقة)
• 10:30 صباحاً - عرض تقديمي للعميل (ساعة واحدة)
• 12:00 ظهراً - غداء مع فريق التسويق
• 2:00 ظهراً - اجتماع مراجعة الميزانية
• 3:30 عصراً - جلسة التخطيط الربعي
• 5:00 مساءً - اجتماع فردي مع سارة

**⚠️ تعارض مكتشف:**
قد يمتد "اجتماع مراجعة الميزانية" في الساعة 2:00 ظهراً إلى "جلسة التخطيط الربعي" في الساعة 3:30 عصراً. أوصي بتمديد الوقت الفاصل أو إعادة جدولة أحد هذين الاجتماعين.

هل تريد مني اقتراح أوقات بديلة أو إرسال طلبات إعادة الجدولة؟`,
      timestamp: new Date(Date.now() - 180000),
      avatar: agent.color,
      hasTable: true
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, [agent.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() && attachments.length === 0) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setAttachments([]);

    // Simulate agent typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse = {
        id: Date.now() + 1,
        type: 'agent',
        content: "I understand your request. Let me process that information and get back to you with the best solution.",
        contentAr: "أفهم طلبك. دعني أعالج هذه المعلومات وأعود إليك بأفضل حل.",
        timestamp: new Date(),
        avatar: agent.color
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCurrentContent = (message) => {
    return isRTL && message.contentAr ? message.contentAr : message.content;
  };

  const getCurrentName = () => {
    return isRTL ? agent.nameAr : agent.name;
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className={`w-10 h-10 ${agent.color} rounded-xl flex items-center justify-center`}>
            <Icon name={agent.icon} size={20} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {getCurrentName()}
            </h2>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-text-secondary">
                {isRTL ? 'متصل الآن' : 'Online now'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-all duration-150">
            <Icon name="Phone" size={18} />
          </button>
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-all duration-150">
            <Icon name="Video" size={18} />
          </button>
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-all duration-150">
            <Icon name="MoreVertical" size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 rtl:space-x-reverse max-w-[80%] ${
              message.type === 'user' ? 'flex-row-reverse rtl:flex-row' : ''
            }`}>
              {message.type === 'agent' && (
                <div className={`w-8 h-8 ${message.avatar} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={agent.icon} size={16} color="white" />
                </div>
              )}
              
              <div className={`rounded-2xl px-4 py-3 ${
                message.type === 'user' ?'bg-primary text-white' :'bg-secondary-100 text-text-primary'
              }`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {getCurrentContent(message)}
                </div>
                
                {message.attachments && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-white/10 rounded-lg">
                        <Icon name="Paperclip" size={14} />
                        <span className="text-xs">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className={`text-xs mt-2 opacity-70 ${
                  message.type === 'user' ? 'text-right rtl:text-left' : 'text-left rtl:text-right'
                }`}>
                  {message.timestamp.toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className={`w-8 h-8 ${agent.color} rounded-lg flex items-center justify-center`}>
                <Icon name={agent.icon} size={16} color="white" />
              </div>
              <div className="bg-secondary-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t border-border bg-secondary-50">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center space-x-2 rtl:space-x-reverse bg-surface rounded-lg px-3 py-2 border border-border">
                <Icon name="File" size={16} className="text-text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{attachment.name}</p>
                  <p className="text-xs text-text-secondary">{formatFileSize(attachment.size)}</p>
                </div>
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="p-1 rounded-full text-text-secondary hover:text-error hover:bg-error-50 transition-all duration-150"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex items-end space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-all duration-150 flex-shrink-0"
          >
            <Icon name="Paperclip" size={20} />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-150"
              rows="1"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() && attachments.length === 0}
            className="p-3 rounded-xl bg-primary text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex-shrink-0"
          >
            <Icon name="Send" size={20} />
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatInterface;