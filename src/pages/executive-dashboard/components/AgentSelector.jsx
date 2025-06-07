import React from 'react';
import Icon from 'components/AppIcon';

const AgentSelector = ({ agents, selectedAgent, onAgentSelect, isRTL }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'busy':
        return 'bg-warning';
      case 'idle':
        return 'bg-secondary-400';
      default:
        return 'bg-secondary-400';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      active: isRTL ? 'نشط' : 'Active',
      busy: isRTL ? 'مشغول' : 'Busy',
      idle: isRTL ? 'خامل' : 'Idle'
    };
    return labels[status] || status;
  };

  const getCurrentName = (agent) => {
    return isRTL ? agent.nameAr : agent.name;
  };

  const getCurrentDescription = (agent) => {
    return isRTL ? agent.descriptionAr : agent.description;
  };

  const getCurrentActivity = (agent) => {
    return isRTL ? agent.lastActivityAr : agent.lastActivity;
  };

  const getCurrentExpertise = (agent) => {
    return isRTL ? agent.expertiseAr : agent.expertise;
  };

  return (
    <div className="p-4 space-y-3">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onAgentSelect(agent.id)}
          className={`
            w-full p-4 rounded-xl border transition-all duration-200 ease-out text-left rtl:text-right
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            ${selectedAgent === agent.id
              ? 'bg-primary-50 border-primary shadow-md ring-1 ring-primary/20'
              : 'bg-surface border-border hover:border-secondary-300 hover:shadow-sm'
            }
          `}
        >
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="relative flex-shrink-0">
              <div className={`w-12 h-12 ${agent.color} rounded-xl flex items-center justify-center shadow-sm`}>
                <Icon name={agent.icon} size={20} color="white" />
              </div>
              <div className={`absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 w-4 h-4 ${getStatusColor(agent.status)} rounded-full border-2 border-surface`}></div>
              {agent.conversations > 0 && (
                <div className="absolute -bottom-1 -right-1 rtl:-right-auto rtl:-left-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {agent.conversations > 9 ? '9+' : agent.conversations}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-sm font-semibold truncate ${
                  selectedAgent === agent.id ? 'text-primary' : 'text-text-primary'
                }`}>
                  {getCurrentName(agent)}
                </h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  agent.status === 'active' ? 'bg-success-100 text-success-700' :
                  agent.status === 'busy'? 'bg-warning-100 text-warning-700' : 'bg-secondary-100 text-secondary-700'
                }`}>
                  {getStatusLabel(agent.status)}
                </span>
              </div>
              
              <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                {getCurrentDescription(agent)}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {getCurrentExpertise(agent).slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-secondary-100 text-secondary-700"
                  >
                    {skill}
                  </span>
                ))}
                {getCurrentExpertise(agent).length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-secondary-100 text-secondary-700">
                    +{getCurrentExpertise(agent).length - 2}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary flex items-center space-x-1 rtl:space-x-reverse">
                  <Icon name="Clock" size={12} />
                  <span>{getCurrentActivity(agent)}</span>
                </span>
                {agent.conversations > 0 && (
                  <span className="text-primary font-medium">
                    {agent.conversations} {isRTL ? 'محادثة' : 'chats'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AgentSelector;