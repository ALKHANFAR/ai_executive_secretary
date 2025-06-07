// src/pages/task-team-management/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import ProgressBar from 'components/ui/ProgressBar';

const TaskTeamManagement = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Website Redesign',
      titleAr: 'إعادة تصميم الموقع',
      description: 'Complete redesign of company website',
      descriptionAr: 'إعادة تصميم كاملة لموقع الشركة',
      status: 'in-progress',
      priority: 'high',
      progress: 65,
      assignee: 'John Doe',
      assigneeAr: 'جون دو',
      dueDate: '2024-01-15',
      category: 'Design',
      categoryAr: 'التصميم',
      team: 'Frontend',
      estimatedHours: 40,
      actualHours: 26
    },
    {
      id: 2,
      title: 'API Integration',
      titleAr: 'تكامل واجهة برمجة التطبيقات',
      description: 'Integrate third-party payment API',
      descriptionAr: 'دمج واجهة برمجة التطبيقات للدفع من طرف ثالث',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      assignee: 'Sarah Smith',
      assigneeAr: 'سارة سميث',
      dueDate: '2024-01-10',
      category: 'Development',
      categoryAr: 'التطوير',
      team: 'Backend',
      estimatedHours: 20,
      actualHours: 18
    },
    {
      id: 3,
      title: 'Security Audit',
      titleAr: 'تدقيق الأمان',
      description: 'Comprehensive security review',
      descriptionAr: 'مراجعة شاملة للأمان',
      status: 'pending',
      priority: 'high',
      progress: 0,
      assignee: 'Mike Johnson',
      assigneeAr: 'مايك جونسون',
      dueDate: '2024-01-20',
      category: 'Security',
      categoryAr: 'الأمان',
      team: 'DevOps',
      estimatedHours: 30,
      actualHours: 0
    }
  ]);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      nameAr: 'جون دو',
      role: 'Frontend Developer',
      roleAr: 'مطور واجهة أمامية',
      email: 'john@company.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      status: 'active',
      department: 'Frontend',
      departmentAr: 'الواجهة الأمامية',
      tasksCompleted: 24,
      tasksInProgress: 3,
      efficiency: 92,
      joinDate: '2023-06-15'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      nameAr: 'سارة سميث',
      role: 'Backend Developer',
      roleAr: 'مطور خلفي',
      email: 'sarah@company.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      status: 'active',
      department: 'Backend',
      departmentAr: 'النظام الخلفي',
      tasksCompleted: 31,
      tasksInProgress: 2,
      efficiency: 95,
      joinDate: '2023-03-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      nameAr: 'مايك جونسون',
      role: 'DevOps Engineer',
      roleAr: 'مهندس DevOps',
      email: 'mike@company.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      status: 'busy',
      department: 'DevOps',
      departmentAr: 'DevOps',
      tasksCompleted: 18,
      tasksInProgress: 4,
      efficiency: 88,
      joinDate: '2023-08-10'
    },
    {
      id: 4,
      name: 'Lisa Chen',
      nameAr: 'ليزا تشين',
      role: 'UI/UX Designer',
      roleAr: 'مصمم واجهة المستخدم',
      email: 'lisa@company.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      status: 'active',
      department: 'Design',
      departmentAr: 'التصميم',
      tasksCompleted: 27,
      tasksInProgress: 1,
      efficiency: 94,
      joinDate: '2023-05-12'
    }
  ]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    setIsRTL(htmlElement.dir === 'rtl');
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getMemberStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsTeamModalOpen(true);
  };

  const renderTasksTab = () => (
    <div className="space-y-6">
      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'إجمالي المهام' : 'Total Tasks'}</p>
              <p className="text-2xl font-bold text-gray-900">{tasks?.length || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'مكتملة' : 'Completed'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks?.filter(t => t.status === 'completed')?.length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'قيد التنفيذ' : 'In Progress'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks?.filter(t => t.status === 'in-progress')?.length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'أولوية عالية' : 'High Priority'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks?.filter(t => t.priority === 'high')?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{isRTL ? 'قائمة المهام' : 'Task List'}</h2>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSelectedTask(null);
                setIsTaskModalOpen(true);
              }}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Icon name="Plus" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
              {isRTL ? 'مهمة جديدة' : 'New Task'}
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {tasks?.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                      <h3 className="font-semibold text-gray-900">
                        {isRTL ? task.titleAr : task.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {isRTL ? task.descriptionAr : task.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-500">
                      <span>{isRTL ? 'المكلف:' : 'Assignee:'} {isRTL ? task.assigneeAr : task.assignee}</span>
                      <span>{isRTL ? 'الموعد النهائي:' : 'Due:'} {task.dueDate}</span>
                      <span>{isRTL ? 'الفريق:' : 'Team:'} {task.team}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">{isRTL ? 'التقدم' : 'Progress'}</span>
                        <span className="text-xs text-gray-700 font-medium">{task.progress}%</span>
                      </div>
                      <ProgressBar progress={task.progress} className="h-2" />
                    </div>
                  </div>
                  
                  <Icon name="ChevronRight" size={16} className="text-gray-400 ml-4 rtl:ml-0 rtl:mr-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-6">
      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'أعضاء الفريق' : 'Team Members'}</p>
              <p className="text-2xl font-bold text-gray-900">{teamMembers?.length || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'نشط' : 'Active'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {teamMembers?.filter(m => m.status === 'active')?.length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'متوسط الكفاءة' : 'Avg Efficiency'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(teamMembers?.reduce((acc, m) => acc + m.efficiency, 0) / teamMembers?.length) || 0}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{isRTL ? 'المهام المكتملة' : 'Tasks Completed'}</p>
              <p className="text-2xl font-bold text-gray-900">
                {teamMembers?.reduce((acc, m) => acc + m.tasksCompleted, 0) || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{isRTL ? 'أعضاء الفريق' : 'Team Members'}</h2>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSelectedMember(null);
                setIsTeamModalOpen(true);
              }}
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Icon name="UserPlus" size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
              {isRTL ? 'إضافة عضو' : 'Add Member'}
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers?.map((member) => (
              <div
                key={member.id}
                onClick={() => handleMemberClick(member)}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={isRTL ? member.nameAr : member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getMemberStatusColor(member.status)}`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {isRTL ? member.nameAr : member.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isRTL ? member.roleAr : member.role}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {isRTL ? member.departmentAr : member.department}
                    </p>
                    
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">{isRTL ? 'الكفاءة' : 'Efficiency'}</span>
                        <span className="font-medium">{member.efficiency}%</span>
                      </div>
                      <ProgressBar progress={member.efficiency} className="h-1" />
                    </div>
                    
                    <div className="flex items-center space-x-4 rtl:space-x-reverse mt-3 text-xs text-gray-500">
                      <span>{member.tasksCompleted} {isRTL ? 'مكتملة' : 'completed'}</span>
                      <span>{member.tasksInProgress} {isRTL ? 'قيد التنفيذ' : 'in progress'}</span>
                    </div>
                  </div>
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
                {isRTL ? 'إدارة المهام والفريق' : 'Task & Team Management'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isRTL ? 'إدارة المشاريع وتنسيق الفريق ومتابعة التقدم' : 'Manage projects, coordinate team, and track progress'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 rtl:space-x-reverse bg-white rounded-lg p-1 shadow-sm w-fit">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`
                px-6 py-2 rounded-md text-sm font-medium transition-colors
                ${activeTab === 'tasks' ?'bg-blue-600 text-white shadow-sm' :'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <Icon name="CheckSquare" size={16} className="mr-2 rtl:mr-0 rtl:ml-2 inline" />
              {isRTL ? 'المهام' : 'Tasks'}
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`
                px-6 py-2 rounded-md text-sm font-medium transition-colors
                ${activeTab === 'team' ?'bg-blue-600 text-white shadow-sm' :'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <Icon name="Users" size={16} className="mr-2 rtl:mr-0 rtl:ml-2 inline" />
              {isRTL ? 'الفريق' : 'Team'}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'tasks' && renderTasksTab()}
        {activeTab === 'team' && renderTeamTab()}
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title={selectedTask ? 
          (isRTL ? 'تفاصيل المهمة' : 'Task Details') : 
          (isRTL ? 'مهمة جديدة' : 'New Task')
        }
      >
        <div className="p-6">
          {selectedTask ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {isRTL ? selectedTask.titleAr : selectedTask.title}
              </h3>
              <p className="text-gray-600">
                {isRTL ? selectedTask.descriptionAr : selectedTask.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'الحالة' : 'Status'}</label>
                  <p className={`font-medium px-2 py-1 rounded text-xs w-fit ${getStatusColor(selectedTask.status)}`}>
                    {selectedTask.status}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'الأولوية' : 'Priority'}</label>
                  <p className={`font-medium capitalize ${selectedTask.priority === 'high' ? 'text-red-600' : selectedTask.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {selectedTask.priority}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'المكلف' : 'Assignee'}</label>
                  <p className="font-medium">{isRTL ? selectedTask.assigneeAr : selectedTask.assignee}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'الموعد النهائي' : 'Due Date'}</label>
                  <p className="font-medium">{selectedTask.dueDate}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600">{isRTL ? 'التقدم' : 'Progress'}</label>
                <div className="mt-1">
                  <ProgressBar progress={selectedTask.progress} className="h-3" />
                  <p className="text-sm text-gray-600 mt-1">{selectedTask.progress}% {isRTL ? 'مكتمل' : 'complete'}</p>
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
                {isRTL ? 'إنشاء مهمة جديدة وتعيينها لعضو في الفريق' : 'Create a new task and assign it to a team member'}
              </p>
              <Button variant="primary">
                {isRTL ? 'إنشاء مهمة' : 'Create Task'}
              </Button>
            </div>
          )}
        </div>
      </Modal>

      {/* Team Member Modal */}
      <Modal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        title={selectedMember ? 
          (isRTL ? 'تفاصيل العضو' : 'Member Details') : 
          (isRTL ? 'إضافة عضو جديد' : 'Add New Member')
        }
      >
        <div className="p-6">
          {selectedMember ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <img
                  src={selectedMember.avatar}
                  alt={isRTL ? selectedMember.nameAr : selectedMember.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {isRTL ? selectedMember.nameAr : selectedMember.name}
                  </h3>
                  <p className="text-gray-600">
                    {isRTL ? selectedMember.roleAr : selectedMember.role}
                  </p>
                  <p className="text-sm text-gray-500">{selectedMember.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'القسم' : 'Department'}</label>
                  <p className="font-medium">{isRTL ? selectedMember.departmentAr : selectedMember.department}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'تاريخ الانضمام' : 'Join Date'}</label>
                  <p className="font-medium">{selectedMember.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'المهام المكتملة' : 'Tasks Completed'}</label>
                  <p className="font-medium">{selectedMember.tasksCompleted}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">{isRTL ? 'قيد التنفيذ' : 'In Progress'}</label>
                  <p className="font-medium">{selectedMember.tasksInProgress}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600">{isRTL ? 'الكفاءة' : 'Efficiency'}</label>
                <div className="mt-1">
                  <ProgressBar progress={selectedMember.efficiency} className="h-3" />
                  <p className="text-sm text-gray-600 mt-1">{selectedMember.efficiency}%</p>
                </div>
              </div>
              
              <div className="flex space-x-2 rtl:space-x-reverse pt-4">
                <Button variant="primary" size="sm">
                  {isRTL ? 'تعديل' : 'Edit'}
                </Button>
                <Button variant="outline" size="sm">
                  {isRTL ? 'عرض المهام' : 'View Tasks'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                {isRTL ? 'إضافة عضو جديد إلى الفريق' : 'Add a new member to the team'}
              </p>
              <Button variant="primary">
                {isRTL ? 'إضافة عضو' : 'Add Member'}
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TaskTeamManagement;