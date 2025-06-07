// src/pages/reports-analytics/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const ReportsAnalytics = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7days');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const navigate = useNavigate();

  // Sample data for charts
  const productivityData = [
    { name: 'Mon', tasks: 12, meetings: 4, efficiency: 85 },
    { name: 'Tue', tasks: 15, meetings: 6, efficiency: 92 },
    { name: 'Wed', tasks: 8, meetings: 3, efficiency: 78 },
    { name: 'Thu', tasks: 18, meetings: 8, efficiency: 95 },
    { name: 'Fri', tasks: 14, meetings: 5, efficiency: 88 },
    { name: 'Sat', tasks: 6, meetings: 2, efficiency: 70 },
    { name: 'Sun', tasks: 4, meetings: 1, efficiency: 65 }
  ];

  const teamPerformanceData = [
    { name: 'Frontend', completed: 24, pending: 8, efficiency: 92 },
    { name: 'Backend', completed: 18, pending: 6, efficiency: 88 },
    { name: 'Design', completed: 15, pending: 4, efficiency: 94 },
    { name: 'DevOps', completed: 12, pending: 3, efficiency: 85 },
    { name: 'QA', completed: 20, pending: 5, efficiency: 90 }
  ];

  const taskDistributionData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'In Progress', value: 25, color: '#3B82F6' },
    { name: 'Pending', value: 8, color: '#F59E0B' },
    { name: 'Overdue', value: 2, color: '#EF4444' }
  ];

  const monthlyTrendsData = [
    { month: 'Jan', tasks: 145, meetings: 32, productivity: 87 },
    { month: 'Feb', tasks: 158, meetings: 28, productivity: 91 },
    { month: 'Mar', tasks: 172, meetings: 35, productivity: 89 },
    { month: 'Apr', tasks: 165, meetings: 41, productivity: 93 },
    { month: 'May', tasks: 189, meetings: 38, productivity: 95 },
    { month: 'Jun', tasks: 201, meetings: 45, productivity: 92 }
  ];

  const kpiData = [
    {
      title: 'Task Completion Rate',
      titleAr: 'معدل إنجاز المهام',
      value: '94.5%',
      change: '+5.2%',
      trend: 'up',
      icon: 'CheckCircle',
      color: 'green'
    },
    {
      title: 'Team Efficiency',
      titleAr: 'كفاءة الفريق',
      value: '89.8%',
      change: '+2.1%',
      trend: 'up',
      icon: 'Users',
      color: 'blue'
    },
    {
      title: 'Meeting Productivity',
      titleAr: 'إنتاجية الاجتماعات',
      value: '87.3%',
      change: '-1.5%',
      trend: 'down',
      icon: 'Video',
      color: 'yellow'
    },
    {
      title: 'On-Time Delivery',
      titleAr: 'التسليم في الوقت المحدد',
      value: '91.7%',
      change: '+3.8%',
      trend: 'up',
      icon: 'Clock',
      color: 'purple'
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Weekly Productivity Report',
      titleAr: 'تقرير الإنتاجية الأسبوعي',
      type: 'productivity',
      date: '2024-01-15',
      size: '2.4 MB',
      status: 'ready'
    },
    {
      id: 2,
      title: 'Team Performance Analysis',
      titleAr: 'تحليل أداء الفريق',
      type: 'performance',
      date: '2024-01-12',
      size: '1.8 MB',
      status: 'ready'
    },
    {
      id: 3,
      title: 'Monthly Executive Summary',
      titleAr: 'الملخص التنفيذي الشهري',
      type: 'executive',
      date: '2024-01-10',
      size: '3.2 MB',
      status: 'generating'
    }
  ];

  useEffect(() => {
    const htmlElement = document.documentElement;
    setIsRTL(htmlElement.dir === 'rtl');
  }, []);

  const getColorByIndex = (index) => {
    const colors = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-purple-100 text-purple-800', 'bg-yellow-100 text-yellow-800'];
    return colors[index % colors.length];
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                kpi.color === 'green' ? 'bg-green-100' :
                kpi.color === 'blue' ? 'bg-blue-100' :
                kpi.color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'
              }`}>
                <Icon name={kpi.icon} size={24} className={`${
                  kpi.color === 'green' ? 'text-green-600' :
                  kpi.color === 'blue' ? 'text-blue-600' :
                  kpi.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'
                }`} />
              </div>
              <div className={`flex items-center ${getTrendColor(kpi.trend)}`}>
                <Icon name={getTrendIcon(kpi.trend)} size={16} className="mr-1" />
                <span className="text-sm font-medium">{kpi.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-sm text-gray-600">{isRTL ? kpi.titleAr : kpi.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Productivity Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {isRTL ? 'الإنتاجية اليومية' : 'Daily Productivity'}
            </h3>
            <div className="text-sm text-gray-500">{isRTL ? 'آخر 7 أيام' : 'Last 7 days'}</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Area type="monotone" dataKey="efficiency" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              <Area type="monotone" dataKey="tasks" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {isRTL ? 'توزيع المهام' : 'Task Distribution'}
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {taskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Performance Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {isRTL ? 'أداء الفريق حسب القسم' : 'Team Performance by Department'}
          </h3>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
            {isRTL ? 'تصدير' : 'Export'}
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={teamPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Legend />
            <Bar dataKey="completed" fill="#10B981" name={isRTL ? 'مكتملة' : 'Completed'} radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="#F59E0B" name={isRTL ? 'معلقة' : 'Pending'} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTrendsTab = () => (
    <div className="space-y-6">
      {/* Monthly Trends Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {isRTL ? 'الاتجاهات الشهرية' : 'Monthly Trends'}
          </h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="6months">{isRTL ? '6 أشهر' : '6 Months'}</option>
              <option value="1year">{isRTL ? 'سنة واحدة' : '1 Year'}</option>
              <option value="2years">{isRTL ? 'سنتان' : '2 Years'}</option>
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="tasks" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name={isRTL ? 'المهام' : 'Tasks'}
            />
            <Line 
              type="monotone" 
              dataKey="meetings" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name={isRTL ? 'الاجتماعات' : 'Meetings'}
            />
            <Line 
              type="monotone" 
              dataKey="productivity" 
              stroke="#F59E0B" 
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              name={isRTL ? 'الإنتاجية' : 'Productivity'}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">
              {isRTL ? 'نمو المهام' : 'Task Growth'}
            </h4>
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">+23.5%</p>
          <p className="text-sm text-gray-600">
            {isRTL ? 'زيادة في إنجاز المهام مقارنة بالشهر الماضي' : 'Increase in task completion vs last month'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">
              {isRTL ? 'كفاءة الفريق' : 'Team Efficiency'}
            </h4>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">89.8%</p>
          <p className="text-sm text-gray-600">
            {isRTL ? 'متوسط كفاءة الفريق الإجمالية' : 'Average overall team efficiency'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">
              {isRTL ? 'توفير الوقت' : 'Time Saved'}
            </h4>
          </div>
          <p className="text-3xl font-bold text-purple-600 mb-2">124h</p>
          <p className="text-sm text-gray-600">
            {isRTL ? 'إجمالي الوقت الموفر هذا الشهر' : 'Total time saved this month'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      {/* Generate Report Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">
              {isRTL ? 'إنشاء تقرير مخصص' : 'Generate Custom Report'}
            </h3>
            <p className="text-blue-100">
              {isRTL ? 'إنشاء تقارير مفصلة حسب احتياجاتك' : 'Create detailed reports tailored to your needs'}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsReportModalOpen(true)}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Icon name="Plus" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
            {isRTL ? 'إنشاء تقرير' : 'Generate Report'}
          </Button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {isRTL ? 'التقارير الحديثة' : 'Recent Reports'}
          </h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {isRTL ? report.titleAr : report.title}
                    </h4>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 mt-1">
                      <span>{report.date}</span>
                      <span>{report.size}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status === 'ready' ? (isRTL ? 'جاهز' : 'Ready') : (isRTL ? 'جاري الإنشاء' : 'Generating')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {report.status === 'ready' && (
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
                      {isRTL ? 'تحميل' : 'Download'}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
                    {isRTL ? 'عرض' : 'View'}
                  </Button>
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
                {isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isRTL ? 'رؤى مفصلة حول الأداء والإنتاجية والاتجاهات' : 'Detailed insights into performance, productivity, and trends'}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="sm">
                <Icon name="RefreshCw" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
                {isRTL ? 'تحديث البيانات' : 'Refresh Data'}
              </Button>
              <Button variant="primary" size="sm" onClick={() => setIsReportModalOpen(true)}>
                <Icon name="FileText" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
                {isRTL ? 'تقرير جديد' : 'New Report'}
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 rtl:space-x-reverse bg-white rounded-lg p-1 shadow-sm w-fit">
            {['overview', 'trends', 'reports'].map((tab) => (
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
                  name={tab === 'overview' ? 'BarChart3' : tab === 'trends' ? 'TrendingUp' : 'FileText'} 
                  size={16} 
                  className="mr-2 rtl:mr-0 rtl:ml-2 inline" 
                />
                {isRTL ? 
                  (tab === 'overview' ? 'نظرة عامة' : tab === 'trends' ? 'الاتجاهات' : 'التقارير') :
                  (tab.charAt(0).toUpperCase() + tab.slice(1))
                }
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'trends' && renderTrendsTab()}
        {activeTab === 'reports' && renderReportsTab()}
      </div>

      {/* Report Generation Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title={isRTL ? 'إنشاء تقرير جديد' : 'Generate New Report'}
      >
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? 'نوع التقرير' : 'Report Type'}
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>{isRTL ? 'تقرير الإنتاجية' : 'Productivity Report'}</option>
                <option>{isRTL ? 'تقرير أداء الفريق' : 'Team Performance Report'}</option>
                <option>{isRTL ? 'الملخص التنفيذي' : 'Executive Summary'}</option>
                <option>{isRTL ? 'تقرير مخصص' : 'Custom Report'}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? 'النطاق الزمني' : 'Date Range'}
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>{isRTL ? 'آخر أسبوع' : 'Last Week'}</option>
                <option>{isRTL ? 'آخر شهر' : 'Last Month'}</option>
                <option>{isRTL ? 'آخر ربع' : 'Last Quarter'}</option>
                <option>{isRTL ? 'آخر سنة' : 'Last Year'}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? 'التنسيق' : 'Format'}
              </label>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <label className="flex items-center">
                  <input type="radio" name="format" value="pdf" className="mr-2 rtl:mr-0 rtl:ml-2" defaultChecked />
                  PDF
                </label>
                <label className="flex items-center">
                  <input type="radio" name="format" value="excel" className="mr-2 rtl:mr-0 rtl:ml-2" />
                  Excel
                </label>
                <label className="flex items-center">
                  <input type="radio" name="format" value="csv" className="mr-2 rtl:mr-0 rtl:ml-2" />
                  CSV
                </label>
              </div>
            </div>
            
            <div className="flex space-x-2 rtl:space-x-reverse pt-4">
              <Button variant="primary">
                <Icon name="Play" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
                {isRTL ? 'إنشاء التقرير' : 'Generate Report'}
              </Button>
              <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReportsAnalytics;