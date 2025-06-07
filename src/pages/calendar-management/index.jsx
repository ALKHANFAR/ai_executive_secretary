// src/pages/calendar-management/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';

const CalendarManagement = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      titleAr: 'اجتماع الفريق',
      date: new Date(),
      time: '10:00',
      duration: '1h',
      type: 'meeting',
      priority: 'high',
      attendees: 5
    },
    {
      id: 2,
      title: 'Project Review',
      titleAr: 'مراجعة المشروع',
      date: addDays(new Date(), 1),
      time: '14:30',
      duration: '2h',
      type: 'review',
      priority: 'medium',
      attendees: 3
    },
    {
      id: 3,
      title: 'Client Presentation',
      titleAr: 'عرض العميل',
      date: addDays(new Date(), 3),
      time: '09:00',
      duration: '45m',
      type: 'presentation',
      priority: 'high',
      attendees: 8
    }
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const htmlElement = document.documentElement;
    setIsRTL(htmlElement.dir === 'rtl');
  }, []);

  const getCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const getWeekDays = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  };

  const getEventsForDate = (date) => {
    return events?.filter(event => isSameDay(event.date, date)) || [];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return 'Users';
      case 'review': return 'FileText';
      case 'presentation': return 'Presentation';
      case 'call': return 'Phone';
      default: return 'Calendar';
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (viewMode === 'month') {
      setViewMode('day');
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const renderMonthView = () => {
    const days = getCalendarDays();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayNamesAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Icon name="ChevronLeft" size={20} className={isRTL ? 'rotate-180' : ''} />
              </button>
              <h2 className="text-xl font-bold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Icon name="ChevronRight" size={20} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                {isRTL ? 'اليوم' : 'Today'}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateEvent}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Icon name="Plus" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
                {isRTL ? 'حدث جديد' : 'New Event'}
              </Button>
            </div>
          </div>
          
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1">
            {(isRTL ? dayNamesAr : dayNames).map((day, index) => (
              <div key={index} className="text-center text-sm font-medium p-2 text-white/80">
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 p-4">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, selectedDate);

            return (
              <div
                key={index}
                onClick={() => handleDateClick(day)}
                className={`
                  min-h-[100px] p-2 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200
                  ${isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'}
                  ${isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                  ${isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
                  hover:shadow-md
                `}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents?.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                      className={`
                        text-xs p-1 rounded text-white cursor-pointer hover:opacity-80
                        ${getPriorityColor(event.priority)}
                      `}
                    >
                      {isRTL ? event.titleAr : event.title}
                    </div>
                  ))}
                  {dayEvents?.length > 2 && (
                    <div className="text-xs text-gray-500 font-medium">
                      +{dayEvents.length - 2} {isRTL ? 'المزيد' : 'more'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getWeekDays();
    
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {format(days[0], 'MMM d')} - {format(days[6], 'MMM d, yyyy')}
            </h2>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateEvent}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Icon name="Plus" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
              {isRTL ? 'حدث جديد' : 'New Event'}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 p-4">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <div key={index} className="min-h-[300px] border border-gray-200 rounded-lg p-2">
                <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : ''}`}>
                  {format(day, 'EEE d')}
                </div>
                <div className="space-y-1">
                  {dayEvents?.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`
                        text-xs p-2 rounded text-white cursor-pointer hover:opacity-80
                        ${getPriorityColor(event.priority)}
                      `}
                    >
                      <div className="font-medium">{isRTL ? event.titleAr : event.title}</div>
                      <div className="opacity-80">{event.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(selectedDate);
    
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h2>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateEvent}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Icon name="Plus" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
              {isRTL ? 'حدث جديد' : 'New Event'}
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {dayEvents?.length > 0 ? (
            <div className="space-y-4">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 rtl:space-x-reverse">
                      <div className={`w-3 h-3 rounded-full mt-1 ${getPriorityColor(event.priority)}`}></div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {isRTL ? event.titleAr : event.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.time} • {event.duration}
                        </p>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                          <Icon name={getEventTypeIcon(event.type)} size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {event.attendees} {isRTL ? 'مشاركين' : 'attendees'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="Calendar" size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {isRTL ? 'لا توجد أحداث في هذا اليوم' : 'No events scheduled for this day'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

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
                {isRTL ? 'إدارة التقويم' : 'Calendar Management'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isRTL ? 'إدارة الجدولة والأحداث والاجتماعات' : 'Manage scheduling, events, and meetings'}
              </p>
            </div>
            
            {/* View Mode Selector */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white rounded-lg p-1 shadow-sm">
              {['month', 'week', 'day'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${viewMode === mode
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  {isRTL ? 
                    (mode === 'month' ? 'شهر' : mode === 'week' ? 'أسبوع' : 'يوم') :
                    (mode.charAt(0).toUpperCase() + mode.slice(1))
                  }
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="space-y-6">
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'day' && renderDayView()}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{isRTL ? 'إجمالي الأحداث' : 'Total Events'}</p>
                <p className="text-2xl font-bold text-gray-900">{events?.length || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{isRTL ? 'اجتماعات اليوم' : 'Today\'s Meetings'}</p>
                <p className="text-2xl font-bold text-gray-900">{getEventsForDate(new Date())?.length || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{isRTL ? 'أولوية عالية' : 'High Priority'}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events?.filter(e => e.priority === 'high')?.length || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{isRTL ? 'إجمالي المشاركين' : 'Total Attendees'}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events?.reduce((sum, e) => sum + e.attendees, 0) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title={selectedEvent ? 
          (isRTL ? 'تفاصيل الحدث' : 'Event Details') : 
          (isRTL ? 'حدث جديد' : 'New Event')
        }
      >
        <div className="p-6">
          {selectedEvent ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {isRTL ? selectedEvent.titleAr : selectedEvent.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'التاريخ' : 'Date'}</label>
                  <p className="font-medium">{format(selectedEvent.date, 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'الوقت' : 'Time'}</label>
                  <p className="font-medium">{selectedEvent.time}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'المدة' : 'Duration'}</label>
                  <p className="font-medium">{selectedEvent.duration}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'الأولوية' : 'Priority'}</label>
                  <p className={`font-medium capitalize ${selectedEvent.priority === 'high' ? 'text-red-600' : selectedEvent.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {selectedEvent.priority}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse pt-4">
                <Button variant="primary" size="sm">
                  {isRTL ? 'تعديل' : 'Edit'}
                </Button>
                <Button variant="outline" size="sm">
                  {isRTL ? 'حذف' : 'Delete'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                {isRTL ? 'إنشاء حدث جديد في التقويم' : 'Create a new event in the calendar'}
              </p>
              <Button variant="primary">
                {isRTL ? 'إنشاء حدث' : 'Create Event'}
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CalendarManagement;