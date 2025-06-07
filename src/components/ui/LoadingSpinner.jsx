// src/components/ui/LoadingSpinner.jsx
import React from 'react';
import Icon from '../AppIcon';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  text, 
  textAr,
  isRTL = false,
  className = '',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error'
  };

  const getCurrentText = () => {
    return isRTL && textAr ? textAr : text;
  };

  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
        <div className="flex space-x-1 rtl:space-x-reverse">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full animate-bounce ${colorClasses[color]} bg-current`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
        {text && (
          <p className={`text-sm ${colorClasses[color]} font-medium`}>
            {getCurrentText()}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
        <div className={`${sizeClasses[size]} rounded-full animate-pulse ${colorClasses[color]} bg-current opacity-75`} />
        {text && (
          <p className={`text-sm ${colorClasses[color]} font-medium`}>
            {getCurrentText()}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'circular') {
    const radius = size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 20 : 28;
    const circumference = 2 * Math.PI * radius;
    
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
        <div className="relative">
          <svg 
            className={`${sizeClasses[size]} animate-spin`} 
            viewBox="0 0 50 50"
          >
            <circle
              cx="25"
              cy="25"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * 0.25}
              className={`${colorClasses[color]} opacity-25`}
            />
            <circle
              cx="25"
              cy="25"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * 0.75}
              className={`${colorClasses[color]} progress-ring`}
            />
          </svg>
        </div>
        {text && (
          <p className={`text-sm ${colorClasses[color]} font-medium`}>
            {getCurrentText()}
          </p>
        )}
      </div>
    );
  }

  // Default spinner with icon
  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <Icon 
        name="Loader2" 
        size={size === 'sm' ? 16 : size === 'md' ? 24 : size === 'lg' ? 32 : 48}
        className={`animate-spin ${colorClasses[color]}`}
      />
      {text && (
        <p className={`text-sm ${colorClasses[color]} font-medium`}>
          {getCurrentText()}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;