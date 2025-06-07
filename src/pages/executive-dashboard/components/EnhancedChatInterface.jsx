// src/pages/executive-dashboard/components/EnhancedChatInterface.jsx
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import { useToast } from 'components/ui/Toast';

const EnhancedChatInterface = ({ agent, isRTL, isMobile }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceRecordingTime, setVoiceRecordingTime] = useState(0);
  const [quickReplies, setQuickReplies] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageReactions, setMessageReactions] = useState({});
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const voiceRecorderRef = useRef(null);
  const { addToast } = useToast();

  // Fahad's information
  const assistantInfo = {
    name: 'Fahad',
    nameAr: 'فهد',
    title: 'Executive Assistant',
    titleAr: 'المساعد التنفيذي',
    avatar: '/assets/images/fahad-avatar.jpg', 
    color: 'bg-gradient-to-br from-neon-blue to-neon-purple'
  };

  const mockMessages = [
    {
      id: 1,
      type: 'assistant',
      content: `Hello! I'm Fahad, your Executive Assistant. I'm here to help you manage your schedule, tasks, communications, and provide strategic insights. How can I assist you today?`,
      contentAr: `مرحباً! أنا فهد، مساعدك التنفيذي. أنا هنا لمساعدتك في إدارة جدولك ومهامك واتصالاتك وتقديم رؤى استراتيجية. كيف يمكنني مساعدتك اليوم؟`,
      timestamp: new Date(Date.now() - 300000),
      suggestions: [
        { text: 'Show my schedule', textAr: 'أظهر جدولي' },
        { text: 'Schedule a new meeting', textAr: 'جدولة اجتماع جديد' },
        { text: 'Summarize my emails', textAr: 'لخص رسائل البريد الإلكتروني' }
      ]
    }
  ];

  const commonEmojis = ['👍', '❤️', '😊', '🎉', '🤔', '👎', '😢', '😮'];

  const defaultQuickReplies = [
    { text: 'Yes, please', textAr: 'نعم، من فضلك' },
    { text: 'No, thank you', textAr: 'لا، شكراً' },
    { text: 'Tell me more', textAr: 'أخبرني المزيد' },
    { text: 'Can you help with this?', textAr: 'هل يمكنك المساعدة في هذا؟' }
  ];

  useEffect(() => {
    setMessages(mockMessages);
    setQuickReplies(defaultQuickReplies);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let interval;
    if (isVoiceRecording) {
      interval = setInterval(() => {
        setVoiceRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setVoiceRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isVoiceRecording]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (messageText = inputValue) => {
    if (!messageText.trim() && attachments.length === 0) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setAttachments([]);
    setQuickReplies([]);

    // Simulate assistant typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const assistantResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: "I understand your request. Let me process that information and get back to you with the best solution.",
        contentAr: "أفهم طلبك. دعني أعالج هذه المعلومات وأعود إليك بأفضل حل.",
        timestamp: new Date(),
        suggestions: [
          { text: 'More details', textAr: 'تفاصيل أكثر' },
          { text: 'Alternative options', textAr: 'خيارات بديلة' }
        ]
      };
      setMessages(prev => [...prev, assistantResponse]);
      setQuickReplies(defaultQuickReplies);
    }, 2000);
  };

  const handleVoiceRecord = () => {
    if (isVoiceRecording) {
      // Stop recording
      setIsVoiceRecording(false);
      addToast({
        type: 'success',
        title: isRTL ? 'تم التسجيل' : 'Recording Complete',
        message: isRTL ? 'تم حفظ التسجيل الصوتي' : 'Voice recording saved',
        duration: 3000
      });
    } else {
      // Start recording
      setIsVoiceRecording(true);
      addToast({
        type: 'info',
        title: isRTL ? 'جاري التسجيل' : 'Recording Started',
        message: isRTL ? 'يتم تسجيل صوتك الآن' : 'Recording your voice now',
        duration: 2000
      });
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        addToast({
          type: 'error',
          title: isRTL ? 'حجم الملف كبير جداً' : 'File Too Large',
          message: isRTL ? `${file.name} يتجاوز 10 ميجابايت` : `${file.name} exceeds 10MB limit`,
          duration: 4000
        });
        return false;
      }
      return true;
    });

    const newAttachments = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleEmojiSelect = (emoji) => {
    setInputValue(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleMessageReaction = (messageId, emoji) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), emoji]
    }));
  };

  const handleQuickReply = (reply) => {
    const text = isRTL ? reply.textAr : reply.text;
    handleSendMessage(text);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatVoiceTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentContent = (message) => {
    return isRTL && message.contentAr ? message.contentAr : message.content;
  };

  const getCurrentName = () => {
    return isRTL ? assistantInfo.nameAr : assistantInfo.name;
  };

  const getCurrentTitle = () => {
    return isRTL ? assistantInfo.titleAr : assistantInfo.title;
  };

  return (
    <div className="flex flex-col h-full dark:bg-dark-bg bg-surface">
      {/* Enhanced Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border glassmorphism">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className={`w-12 h-12 ${assistantInfo.color} rounded-xl flex items-center justify-center relative shadow-md`}>
            <span className="text-white font-bold text-xl">{getCurrentName().charAt(0)}</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface status-pulse"></div>
          </div>
          <div>
            <h2 className="text-lg font-semibold dark:text-white text-text-primary">
              {getCurrentName()}
            </h2>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-text-secondary">
                  {isRTL ? 'متصل الآن' : 'Online now'}
                </span>
              </div>
              {isTyping && (
                <div className="flex items-center space-x-1 rtl:space-x-reverse text-neon-blue">
                  <Icon name="Edit3" size={12} />
                  <span className="text-xs">
                    {isRTL ? 'يكتب...' : 'typing...'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button 
            className="p-2.5 rounded-lg text-text-secondary hover:text-neon-blue hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-150"
            title={isRTL ? 'مكالمة صوتية' : 'Voice Call'}
          >
            <Icon name="Phone" size={18} />
          </button>
          <button 
            className="p-2.5 rounded-lg text-text-secondary hover:text-neon-blue hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-150"
            title={isRTL ? 'مكالمة فيديو' : 'Video Call'}
          >
            <Icon name="Video" size={18} />
          </button>
          <button 
            className="p-2.5 rounded-lg text-text-secondary hover:text-neon-blue hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-150"
            title={isRTL ? 'معلومات المساعد' : 'Assistant Info'}
          >
            <Icon name="Info" size={18} />
          </button>
        </div>
      </div>

      {/* Enhanced Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar dark:bg-gradient-to-b dark:from-dark-bg dark:to-gray-900/50 bg-gradient-to-b from-surface to-secondary-50/30">
        {messages.map((message) => {
          const reactions = messageReactions[message.id] || [];
          
          return (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 rtl:space-x-reverse max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse rtl:flex-row' : ''}`}>
                {message.type === 'assistant' && (
                  <div className={`w-8 h-8 ${assistantInfo.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <span className="text-white font-bold text-sm">{getCurrentName().charAt(0)}</span>
                  </div>
                )}
                
                <div className="flex flex-col space-y-2">
                  <div 
                    className={`message-bubble group relative rounded-2xl px-4 py-3 ${
                      message.type === 'user' ? 'bg-gradient-to-br from-neon-blue to-neon-purple text-white shadow-md' : 'glassmorphism dark:bg-gray-800/70 dark:text-white text-text-primary border shadow-sm'
                    }`}
                    onDoubleClick={() => {
                      // Quick reaction on double click
                      handleMessageReaction(message.id, '👍');
                    }}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {getCurrentContent(message)}
                    </div>
                    
                    {message.attachments && (
                      <div className="mt-3 space-y-2">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-white/10 rounded-lg">
                            <Icon name="Paperclip" size={14} />
                            <span className="text-xs flex-1">{attachment.name}</span>
                            <span className="text-xs opacity-70">{formatFileSize(attachment.size)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Quick Reaction Button */}
                    <button 
                      className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-surface dark:bg-gray-800 border border-border rounded-full p-1 shadow-sm"
                      onClick={() => handleMessageReaction(message.id, '👍')}
                    >
                      <Icon name="Heart" size={12} className="text-text-secondary" />
                    </button>
                    
                    <div className={`text-xs mt-2 opacity-70 ${message.type === 'user' ? 'text-right rtl:text-left' : 'text-left rtl:text-right'}`}>
                      {message.timestamp.toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  
                  {/* Message Reactions */}
                  {reactions.length > 0 && (
                    <div className="flex items-center space-x-1 px-2">
                      {reactions.slice(0, 3).map((reaction, index) => (
                        <span key={index} className="text-sm">{reaction}</span>
                      ))}
                      {reactions.length > 3 && (
                        <span className="text-xs text-text-secondary">+{reactions.length - 3}</span>
                      )}
                    </div>
                  )}
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, index) => {
                        const suggestionText = isRTL ? suggestion.textAr : suggestion.text;
                        return (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(suggestionText)}
                            className="px-3 py-1.5 text-xs bg-primary-50 dark:bg-gray-800/50 text-neon-blue border border-neon-blue/20 rounded-full hover:bg-neon-blue/10 transition-colors duration-150 shadow-sm"
                          >
                            {suggestionText}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className={`w-8 h-8 ${assistantInfo.color} rounded-lg flex items-center justify-center shadow-md`}>
                <span className="text-white font-bold text-sm">{getCurrentName().charAt(0)}</span>
              </div>
              <div className="glassmorphism dark:bg-gray-800/70 rounded-2xl px-4 py-3 border shadow-sm">
                <LoadingSpinner variant="dots" size="sm" color="secondary" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {quickReplies.length > 0 && (
        <div className="px-4 py-2 border-t border-border dark:bg-gray-900/50 bg-secondary-50/50">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => {
              const replyText = isRTL ? reply.textAr : reply.text;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1.5 text-sm bg-surface dark:bg-gray-800 border border-border dark:border-gray-700 rounded-full hover:bg-primary-50 dark:hover:bg-gray-700 hover:border-neon-blue/30 hover:text-neon-blue transition-all duration-150 shadow-sm"
                >
                  {replyText}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-3 border-t border-border dark:bg-gray-900/50 bg-secondary-50">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center space-x-2 rtl:space-x-reverse glassmorphism dark:bg-gray-800/70 rounded-lg px-3 py-2 border border-border shadow-sm">
                <Icon name="File" size={16} className="text-text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium dark:text-white text-text-primary truncate">{attachment.name}</p>
                  <p className="text-xs text-text-secondary">{formatFileSize(attachment.size)}</p>
                </div>
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="p-1 rounded-full text-text-secondary hover:text-error hover:bg-error-50 dark:hover:bg-error-900/20 transition-all duration-150"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Input Area */}
      <div className="p-4 border-t border-border glassmorphism dark:bg-dark-bg/90">
        {/* Voice Recording Indicator */}
        {isVoiceRecording && (
          <div className="mb-3 flex items-center justify-center space-x-2 rtl:space-x-reverse p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-700 rounded-lg">
            <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-error">
              {isRTL ? 'جاري التسجيل' : 'Recording'}
            </span>
            <span className="text-sm text-error font-mono">
              {formatVoiceTime(voiceRecordingTime)}
            </span>
          </div>
        )}

        <div className="flex items-end space-x-3 rtl:space-x-reverse">
          {/* File Upload */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-xl text-text-secondary hover:text-neon-blue hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-150 flex-shrink-0"
            title={isRTL ? 'إرفاق ملف' : 'Attach file'}
          >
            <Icon name="Paperclip" size={20} />
          </button>
          
          {/* Emoji Picker */}
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-3 rounded-xl text-text-secondary hover:text-neon-blue hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-150 flex-shrink-0"
              title={isRTL ? 'الرموز التعبيرية' : 'Emojis'}
            >
              <Icon name="Smile" size={20} />
            </button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 left-0 glassmorphism dark:bg-gray-900/95 border border-border rounded-lg shadow-lg p-3 z-10">
                <div className="grid grid-cols-8 gap-1">
                  {commonEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="p-2 rounded hover:bg-secondary-50 dark:hover:bg-gray-800 transition-colors duration-150"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Text Input */}
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
              className="w-full px-4 py-3 rounded-xl border border-border bg-surface dark:bg-gray-800 dark:text-white text-text-primary placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all duration-150"
              rows="1"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          
          {/* Voice Recording */}
          <button
            onClick={handleVoiceRecord}
            className={`p-3 rounded-xl transition-all duration-150 flex-shrink-0 ${isVoiceRecording ? 'bg-error text-white hover:bg-error-600 shadow-md' :'text-text-secondary hover:text-neon-blue hover:bg-primary-50 dark:hover:bg-gray-800'}`}
            title={isRTL ? 'تسجيل صوتي' : 'Voice message'}
          >
            <Icon name={isVoiceRecording ? 'Square' : 'Mic'} size={20} />
          </button>
          
          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() && attachments.length === 0}
            className="p-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex-shrink-0 shadow-md hover:shadow-lg"
            title={isRTL ? 'إرسال' : 'Send'}
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
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.mp3"
        />
      </div>
    </div>
  );
};

export default EnhancedChatInterface;