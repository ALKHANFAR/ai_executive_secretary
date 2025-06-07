import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';


const MeetingCoordination = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, calendar, list
  const [filterStatus, setFilterStatus] = useState('all'); // all, upcoming, today, pending
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Mock data for meetings
  const meetings = [
    {
      id: 1,
      title: "Quarterly Business Review",
      titleAr: "مراجعة الأعمال الفصلية",
      date: "2024-01-15",
      time: "09:00",
      duration: 120,
      status: "confirmed",
      priority: "high",
      location: "Conference Room A",
      locationAr: "قاعة الاجتماعات أ",
      meetingType: "in-person",
      organizer: "Sarah Johnson",
      organizerAr: "سارة جونسون",
      attendees: [
        { name: "Ahmed Al-Rashid", nameAr: "أحمد الراشد", email: "ahmed@company.com", status: "accepted", role: "CFO" },
        { name: "Maria Garcia", nameAr: "ماريا غارسيا", email: "maria@company.com", status: "pending", role: "COO" },
        { name: "David Chen", nameAr: "ديفيد تشين", email: "david@company.com", status: "accepted", role: "CTO" },
        { name: "Lisa Thompson", nameAr: "ليزا تومسون", email: "lisa@company.com", status: "declined", role: "CMO" }
      ],
      agenda: [
        { item: "Q4 Financial Performance Review", itemAr: "مراجعة الأداء المالي للربع الرابع", duration: 30, presenter: "Ahmed Al-Rashid", completed: true },
        { item: "Market Expansion Strategy", itemAr: "استراتيجية التوسع في السوق", duration: 45, presenter: "Maria Garcia", completed: false },
        { item: "Technology Roadmap 2024", itemAr: "خارطة طريق التكنولوجيا 2024", duration: 30, presenter: "David Chen", completed: false },
        { item: "Q&A and Next Steps", itemAr: "الأسئلة والأجوبة والخطوات التالية", duration: 15, presenter: "All", completed: false }
      ],
      documents: [
        { name: "Q4 Financial Report.pdf", nameAr: "تقرير مالي الربع الرابع.pdf", size: "2.4 MB", uploaded: true },
        { name: "Market Analysis.pptx", nameAr: "تحليل السوق.pptx", size: "5.1 MB", uploaded: true },
        { name: "Tech Roadmap.pdf", nameAr: "خارطة طريق التكنولوجيا.pdf", size: "1.8 MB", uploaded: false }
      ],
      preparation: {
        completed: 3,
        total: 5,
        tasks: [
          { task: "Review financial reports", taskAr: "مراجعة التقارير المالية", completed: true },
          { task: "Prepare presentation slides", taskAr: "إعداد شرائح العرض", completed: true },
          { task: "Send agenda to attendees", taskAr: "إرسال جدول الأعمال للحضور", completed: true },
          { task: "Book conference room", taskAr: "حجز قاعة الاجتماعات", completed: false },
          { task: "Set up video equipment", taskAr: "إعداد معدات الفيديو", completed: false }
        ]
      },
      notes: "This is a critical quarterly review meeting. Ensure all department heads are prepared with their reports.",
      notesAr: "هذا اجتماع مراجعة فصلية مهم. تأكد من أن جميع رؤساء الأقسام مستعدون بتقاريرهم."
    },
    {
      id: 2,
      title: "Product Launch Planning",
      titleAr: "تخطيط إطلاق المنتج",
      date: "2024-01-16",
      time: "14:00",
      duration: 90,
      status: "pending",
      priority: "medium",
      location: "Virtual Meeting",
      locationAr: "اجتماع افتراضي",
      meetingType: "virtual",
      organizer: "Executive User",
      organizerAr: "المستخدم التنفيذي",
      attendees: [
        { name: "John Smith", nameAr: "جون سميث", email: "john@company.com", status: "pending", role: "Product Manager" },
        { name: "Emma Wilson", nameAr: "إيما ويلسون", email: "emma@company.com", status: "pending", role: "Marketing Director" },
        { name: "Michael Brown", nameAr: "مايكل براون", email: "michael@company.com", status: "pending", role: "Sales Director" }
      ],
      agenda: [
        { item: "Product Features Overview", itemAr: "نظرة عامة على ميزات المنتج", duration: 30, presenter: "John Smith", completed: false },
        { item: "Marketing Strategy", itemAr: "الاستراتيجية التسويقية", duration: 30, presenter: "Emma Wilson", completed: false },
        { item: "Sales Projections", itemAr: "توقعات المبيعات", duration: 20, presenter: "Michael Brown", completed: false },
        { item: "Launch Timeline", itemAr: "الجدول الزمني للإطلاق", duration: 10, presenter: "All", completed: false }
      ],
      documents: [
        { name: "Product Specifications.pdf", nameAr: "مواصفات المنتج.pdf", size: "3.2 MB", uploaded: false },
        { name: "Marketing Plan.docx", nameAr: "الخطة التسويقية.docx", size: "1.5 MB", uploaded: false }
      ],
      preparation: {
        completed: 1,
        total: 4,
        tasks: [
          { task: "Finalize product specifications", taskAr: "وضع اللمسات الأخيرة على مواصفات المنتج", completed: true },
          { task: "Create marketing materials", taskAr: "إنشاء المواد التسويقية", completed: false },
          { task: "Prepare sales forecasts", taskAr: "إعداد توقعات المبيعات", completed: false },
          { task: "Schedule follow-up meetings", taskAr: "جدولة اجتماعات المتابعة", completed: false }
        ]
      },
      notes: "Focus on coordinating between product, marketing, and sales teams for successful launch.",
      notesAr: "التركيز على التنسيق بين فرق المنتج والتسويق والمبيعات لإطلاق ناجح."
    },
    {
      id: 3,
      title: "Team Performance Review",
      titleAr: "مراجعة أداء الفريق",
      date: "2024-01-17",
      time: "11:00",
      duration: 60,
      status: "confirmed",
      priority: "low",
      location: "Conference Room B",
      locationAr: "قاعة الاجتماعات ب",
      meetingType: "in-person",
      organizer: "Executive User",
      organizerAr: "المستخدم التنفيذي",
      attendees: [
        { name: "Sarah Johnson", nameAr: "سارة جونسون", email: "sarah@company.com", status: "accepted", role: "HR Director" },
        { name: "Robert Davis", nameAr: "روبرت ديفيس", email: "robert@company.com", status: "accepted", role: "Team Lead" }
      ],
      agenda: [
        { item: "Individual Performance Metrics", itemAr: "مقاييس الأداء الفردي", duration: 25, presenter: "Sarah Johnson", completed: false },
        { item: "Team Collaboration Assessment", itemAr: "تقييم التعاون الجماعي", duration: 20, presenter: "Robert Davis", completed: false },
        { item: "Development Plans", itemAr: "خطط التطوير", duration: 15, presenter: "All", completed: false }
      ],
      documents: [
        { name: "Performance Reports.xlsx", nameAr: "تقارير الأداء.xlsx", size: "2.1 MB", uploaded: true }
      ],
      preparation: {
        completed: 2,
        total: 3,
        tasks: [
          { task: "Compile performance data", taskAr: "تجميع بيانات الأداء", completed: true },
          { task: "Prepare individual assessments", taskAr: "إعداد التقييمات الفردية", completed: true },
          { task: "Draft development recommendations", taskAr: "صياغة توصيات التطوير", completed: false }
        ]
      },
      notes: "Regular monthly review to ensure team alignment and growth.",
      notesAr: "مراجعة شهرية منتظمة لضمان توافق الفريق ونموه."
    }
  ];

  // Mock chat messages
  const initialMessages = [
    {
      id: 1,
      sender: "Meeting Coordinator",
      senderAr: "منسق الاجتماعات",
      message: "Good morning! I\'m your Meeting Coordinator AI. I can help you schedule meetings, manage agendas, coordinate with attendees, and handle all meeting-related tasks. How can I assist you today?",
      messageAr: "صباح الخير! أنا منسق الاجتماعات بالذكاء الاصطناعي. يمكنني مساعدتك في جدولة الاجتماعات وإدارة جداول الأعمال والتنسيق مع الحضور والتعامل مع جميع المهام المتعلقة بالاجتماعات. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(Date.now() - 300000),
      type: "ai"
    }
  ];

  useEffect(() => {
    const htmlElement = document.documentElement;
    setIsRTL(htmlElement.dir === 'rtl');
    setChatMessages(initialMessages);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "You",
      senderAr: "أنت",
      message: inputMessage,
      messageAr: inputMessage,
      timestamp: new Date(),
      type: "user"
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "Meeting Coordinator",
        senderAr: "منسق الاجتماعات",
        message: "I understand you\'d like assistance with meeting coordination. Let me help you with that. I can schedule new meetings, update existing ones, manage attendees, or help with agenda preparation. What specific task would you like me to handle?",
        messageAr: "أفهم أنك تريد المساعدة في تنسيق الاجتماعات. دعني أساعدك في ذلك. يمكنني جدولة اجتماعات جديدة أو تحديث الموجودة أو إدارة الحضور أو المساعدة في إعداد جدول الأعمال. ما المهمة المحددة التي تريد مني التعامل معها؟",
        timestamp: new Date(),
        type: "ai"
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error text-white';
      case 'medium':
        return 'bg-warning text-white';
      case 'low':
        return 'bg-success text-white';
      default:
        return 'bg-secondary-400 text-white';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-100 text-success-700';
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'cancelled':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getAttendeeStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'declined':
        return 'text-error';
      default:
        return 'text-secondary-400';
    }
  };

  const getCurrentTitle = (meeting) => {
    return isRTL ? meeting.titleAr : meeting.title;
  };

  const getCurrentLocation = (meeting) => {
    return isRTL ? meeting.locationAr : meeting.location;
  };

  const getCurrentMessage = (msg) => {
    return isRTL ? msg.messageAr : msg.message;
  };

  const getCurrentSender = (msg) => {
    return isRTL ? msg.senderAr : msg.sender;
  };

  const filteredMeetings = meetings.filter(meeting => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return meeting.date === today;
    }
    return meeting.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-80 pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Main Content Area - Meeting Timeline */}
          <div className="flex-1 flex flex-col lg:w-[65%]">
            {/* Header Section */}
            <div className="bg-surface border-b border-border p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">
                    {isRTL ? 'تنسيق الاجتماعات' : 'Meeting Coordination'}
                  </h1>
                  <p className="text-text-secondary">
                    {isRTL 
                      ? 'إدارة وتنسيق الاجتماعات مع المساعدة الذكية' :'Manage and coordinate meetings with intelligent assistance'
                    }
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  {/* View Mode Toggle */}
                  <div className="flex bg-secondary-100 rounded-lg p-1">
                    {['timeline', 'calendar', 'list'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                          viewMode === mode
                            ? 'bg-surface text-primary shadow-sm'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <Icon 
                          name={mode === 'timeline' ? 'Clock' : mode === 'calendar' ? 'Calendar' : 'List'} 
                          size={16} 
                          className="mr-2 rtl:mr-0 rtl:ml-2" 
                        />
                        {isRTL 
                          ? (mode === 'timeline' ? 'الجدول الزمني' : mode === 'calendar' ? 'التقويم' : 'القائمة')
                          : (mode === 'timeline' ? 'Timeline' : mode === 'calendar' ? 'Calendar' : 'List')
                        }
                      </button>
                    ))}
                  </div>

                  {/* Filter Dropdown */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="input-field w-auto min-w-[120px]"
                  >
                    <option value="all">{isRTL ? 'جميع الاجتماعات' : 'All Meetings'}</option>
                    <option value="today">{isRTL ? 'اليوم' : 'Today'}</option>
                    <option value="upcoming">{isRTL ? 'القادمة' : 'Upcoming'}</option>
                    <option value="pending">{isRTL ? 'في الانتظار' : 'Pending'}</option>
                  </select>

                  {/* New Meeting Button */}
                  <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                    <Icon name="Plus" size={16} />
                    <span>{isRTL ? 'اجتماع جديد' : 'New Meeting'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Meetings List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {filteredMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className={`card p-6 cursor-pointer transition-all duration-150 hover:shadow-lg ${
                      selectedMeeting?.id === meeting.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    {/* Meeting Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                          <h3 className="text-lg font-semibold text-text-primary">
                            {getCurrentTitle(meeting)}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(meeting.priority)}`}>
                            {isRTL 
                              ? (meeting.priority === 'high' ? 'عالية' : meeting.priority === 'medium' ? 'متوسطة' : 'منخفضة')
                              : meeting.priority
                            }
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                            {isRTL 
                              ? (meeting.status === 'confirmed' ? 'مؤكد' : meeting.status === 'pending' ? 'في الانتظار' : 'ملغي')
                              : meeting.status
                            }
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-text-secondary">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Icon name="Calendar" size={14} />
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Icon name="Clock" size={14} />
                            <span>{meeting.time} ({meeting.duration} min)</span>
                          </div>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Icon name={meeting.meetingType === 'virtual' ? 'Video' : 'MapPin'} size={14} />
                            <span>{getCurrentLocation(meeting)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-150">
                          <Icon name="Edit" size={16} />
                        </button>
                        <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-150">
                          <Icon name="MoreVertical" size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Attendees */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text-primary mb-2">
                        {isRTL ? 'الحضور' : 'Attendees'} ({meeting.attendees.length})
                      </h4>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {meeting.attendees.slice(0, 4).map((attendee, index) => (
                          <div key={index} className="relative">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-white">
                                {(isRTL ? attendee.nameAr : attendee.name).charAt(0)}
                              </span>
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface ${getAttendeeStatusColor(attendee.status)}`}>
                              <Icon 
                                name={attendee.status === 'accepted' ? 'Check' : attendee.status === 'declined' ? 'X' : 'Clock'} 
                                size={8} 
                              />
                            </div>
                          </div>
                        ))}
                        {meeting.attendees.length > 4 && (
                          <div className="w-8 h-8 bg-secondary-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-text-secondary">
                              +{meeting.attendees.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Preparation Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-text-primary">
                          {isRTL ? 'التحضير' : 'Preparation'}
                        </h4>
                        <span className="text-sm text-text-secondary">
                          {meeting.preparation.completed}/{meeting.preparation.total}
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(meeting.preparation.completed / meeting.preparation.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Agenda Preview */}
                    <div>
                      <h4 className="text-sm font-medium text-text-primary mb-2">
                        {isRTL ? 'جدول الأعمال' : 'Agenda'} ({meeting.agenda.length} {isRTL ? 'عناصر' : 'items'})
                      </h4>
                      <div className="space-y-1">
                        {meeting.agenda.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                            <Icon 
                              name={item.completed ? 'CheckCircle' : 'Circle'} 
                              size={14} 
                              className={item.completed ? 'text-success' : 'text-secondary-400'} 
                            />
                            <span className={item.completed ? 'text-text-secondary line-through' : 'text-text-primary'}>
                              {isRTL ? item.itemAr : item.item}
                            </span>
                            <span className="text-text-secondary">({item.duration} min)</span>
                          </div>
                        ))}
                        {meeting.agenda.length > 2 && (
                          <div className="text-sm text-text-secondary">
                            +{meeting.agenda.length - 2} {isRTL ? 'عناصر أخرى' : 'more items'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Chat Panel */}
          <div className="hidden lg:flex lg:w-[35%] border-l rtl:border-l-0 rtl:border-r border-border bg-surface flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Icon name="Video" size={20} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">
                    {isRTL ? 'منسق الاجتماعات' : 'Meeting Coordinator'}
                  </h3>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-text-secondary">
                      {isRTL ? 'متاح الآن' : 'Available now'}
                    </span>
                  </div>
                </div>
                <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-colors duration-150">
                  <Icon name="Settings" size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' ?'bg-primary text-white' :'bg-secondary-100 text-text-primary'
                    }`}>
                      <p className="text-sm">{getCurrentMessage(message)}</p>
                    </div>
                    <div className={`flex items-center mt-1 space-x-1 rtl:space-x-reverse ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span className="text-xs text-text-secondary">
                        {getCurrentSender(message)}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
                    className="input-field resize-none h-12 pr-12 rtl:pr-4 rtl:pl-12"
                    rows="1"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-primary text-white disabled:bg-secondary-300 disabled:text-secondary-500 transition-colors duration-150"
                  >
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { label: 'Schedule Meeting', labelAr: 'جدولة اجتماع', action: 'schedule' },
                  { label: 'Check Availability', labelAr: 'فحص التوفر', action: 'availability' },
                  { label: 'Send Invites', labelAr: 'إرسال دعوات', action: 'invites' }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(isRTL ? action.labelAr : action.label)}
                    className="px-3 py-1 bg-secondary-100 text-text-secondary rounded-full text-xs hover:bg-secondary-200 transition-colors duration-150"
                  >
                    {isRTL ? action.labelAr : action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetingCoordination;