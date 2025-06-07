// src/components/ui/ProgressBar.jsx
import React from 'react';
import Icon from '../AppIcon';


const ProgressBar = ({ 
  value = 0, 
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  labelAr,
  isRTL = false,
  animated = false,
  striped = false,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
    xl: 'h-6'
  };

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    gradient: 'bg-gradient-to-r from-primary to-primary-700'
  };

  const getCurrentLabel = () => {
    return isRTL && labelAr ? labelAr : label;
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">
            {getCurrentLabel()}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-secondary-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`
            ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out
            ${colorClasses[color]}
            ${striped ? 'bg-stripe' : ''}
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ 
            width: `${percentage}%`,
            transform: isRTL ? 'scaleX(-1)' : 'none'
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={getCurrentLabel()}
        />
      </div>
    </div>
  );
};

// Circular Progress Bar Component
export const CircularProgress = ({ 
  value = 0, 
  max = 100,
  size = 'md',
  color = 'primary',
  thickness = 'md',
  showLabel = false,
  label,
  labelAr,
  isRTL = false,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: { size: 40, textSize: 'text-xs' },
    md: { size: 60, textSize: 'text-sm' },
    lg: { size: 80, textSize: 'text-base' },
    xl: { size: 120, textSize: 'text-lg' }
  };

  const thicknessClasses = {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6
  };

  const colorClasses = {
    primary: 'stroke-primary',
    secondary: 'stroke-secondary',
    success: 'stroke-success',
    warning: 'stroke-warning',
    error: 'stroke-error'
  };

  const { size: circleSize, textSize } = sizeClasses[size];
  const strokeWidth = thicknessClasses[thickness];
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getCurrentLabel = () => {
    return isRTL && labelAr ? labelAr : label;
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg
          width={circleSize}
          height={circleSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-secondary-200"
          />
          
          {/* Progress circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${colorClasses[color]} transition-all duration-500 ease-out`}
          />
        </svg>
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-semibold text-text-primary ${textSize}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      
      {(showLabel || label) && (
        <span className="mt-2 text-sm font-medium text-text-secondary text-center">
          {getCurrentLabel()}
        </span>
      )}
    </div>
  );
};

// Step Progress Component
export const StepProgress = ({ 
  steps = [], 
  currentStep = 0,
  isRTL = false,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const stepNumber = index + 1;
          
          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300 ease-out
                  ${
                    isCompleted 
                      ? 'bg-success text-white' 
                      : isCurrent 
                      ? 'bg-primary text-white' :'bg-secondary-200 text-text-secondary'
                  }
                `}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    stepNumber
                  )}
                </div>
                
                {/* Step Label */}
                <div className="ml-2 rtl:mr-2 rtl:ml-0">
                  <p className={`text-sm font-medium ${
                    isCompleted || isCurrent 
                      ? 'text-text-primary' :'text-text-secondary'
                  }`}>
                    {isRTL && step.labelAr ? step.labelAr : step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-text-secondary">
                      {isRTL && step.descriptionAr ? step.descriptionAr : step.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`h-0.5 w-full transition-colors duration-300 ${
                    isCompleted ? 'bg-success' : 'bg-secondary-200'
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;