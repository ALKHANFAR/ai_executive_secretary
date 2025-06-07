// src/components/ui/UIEnhancer.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import EnhancedText from './EnhancedText';
import Icon from '../AppIcon';

/**
 * UIEnhancer provides additional styling and visual enhancements to make UI components
 * lighter and more pleasant visually.
 */
const UIEnhancer = ({ 
  children, 
  className = '',
  contentClassName = '', 
  elevate = false,
  glassmorphism = false,
  rounded = 'lg',
  bordered = false,
  gradient = false,
  animation = null,
  colorScheme = 'default',
  onClick = null,
  ...props 
}) => {
  const { isRTL } = useLanguage();
  
  // Color schemes
  const colorSchemes = {
    default: 'bg-surface dark:bg-dark-bg text-text-primary dark:text-white',
    primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300',
    secondary: 'bg-secondary-50 dark:bg-secondary-900/20 text-secondary-800 dark:text-secondary-300',
    success: 'bg-success-50 dark:bg-success-900/20 text-success-800 dark:text-success-300',
    error: 'bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-300',
    warning: 'bg-warning-50 dark:bg-warning-900/20 text-warning-800 dark:text-warning-300',
    info: 'bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300',
    neutral: 'bg-gray-50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-300'
  };
  
  // Rounded options
  const roundedOptions = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
  };
  
  // Animation options
  const animations = {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    fadeIn: 'animate-fade-in',
    slideIn: 'animate-slide-in',
    slideUp: 'animate-slide-up',
    slideDown: 'animate-slide-down'
  };
  
  // Build the class string
  const buildClasses = () => {
    const classes = [];
    
    // Add base classes
    classes.push(colorSchemes[colorScheme] || colorSchemes.default);
    classes.push(roundedOptions[rounded] || roundedOptions.lg);
    
    // Add conditional classes
    if (elevate) {
      classes.push('shadow-md hover:shadow-lg transition-shadow duration-200');
    }
    
    if (glassmorphism) {
      classes.push('glassmorphism backdrop-blur-md bg-opacity-70 dark:bg-opacity-70');
    }
    
    if (bordered) {
      classes.push('border border-border dark:border-gray-700');
    }
    
    if (gradient) {
      classes.push('bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20');
    }
    
    if (animation && animations[animation]) {
      classes.push(animations[animation]);
    }
    
    if (onClick) {
      classes.push('cursor-pointer hover:brightness-95 dark:hover:brightness-110 transition-all duration-200');
    }
    
    // Add custom classes
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };
  
  return (
    <div 
      className={buildClasses()}
      onClick={onClick}
      {...props}
    >
      <div className={`${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

/**
 * Predefined Card component with enhanced visual style
 */
export const EnhancedCard = ({ 
  title,
  titleAr,
  subtitle,
  subtitleAr,
  icon,
  action,
  children,
  ...props 
}) => {
  const { isRTL } = useLanguage();
  
  return (
    <UIEnhancer elevate bordered {...props}>
      {(title || icon) && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {icon && (
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon name={icon} size={20} />
              </div>
            )}
            <div>
              {title && (
                <EnhancedText as="h3" className="text-lg font-semibold">
                  {isRTL && titleAr ? titleAr : title}
                </EnhancedText>
              )}
              {subtitle && (
                <EnhancedText as="p" className="text-sm text-text-secondary">
                  {isRTL && subtitleAr ? subtitleAr : subtitle}
                </EnhancedText>
              )}
            </div>
          </div>
          {action && (
            <div>
              {action}
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </UIEnhancer>
  );
};

/**
 * Banner component for displaying highlighted information
 */
export const EnhancedBanner = ({ 
  type = 'info', 
  title, 
  titleAr,
  message, 
  messageAr,
  icon,
  onClose,
  ...props 
}) => {
  const { isRTL } = useLanguage();
  
  // Banner types
  const bannerTypes = {
    info: {
      colorScheme: 'info',
      icon: icon || 'Info'
    },
    success: {
      colorScheme: 'success',
      icon: icon || 'CheckCircle'
    },
    warning: {
      colorScheme: 'warning',
      icon: icon || 'AlertTriangle'
    },
    error: {
      colorScheme: 'error',
      icon: icon || 'AlertCircle'
    },
    neutral: {
      colorScheme: 'neutral',
      icon: icon || 'MessageCircle'
    }
  };
  
  const bannerConfig = bannerTypes[type] || bannerTypes.info;
  
  return (
    <UIEnhancer
      colorScheme={bannerConfig.colorScheme}
      className="p-0"
      {...props}
    >
      <div className="flex items-start p-4">
        <div className="flex-shrink-0 mr-3 rtl:mr-0 rtl:ml-3">
          <Icon name={bannerConfig.icon} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <EnhancedText as="h4" className="text-sm font-semibold mb-1">
              {isRTL && titleAr ? titleAr : title}
            </EnhancedText>
          )}
          {message && (
            <EnhancedText as="p" className="text-sm">
              {isRTL && messageAr ? messageAr : message}
            </EnhancedText>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-3 rtl:ml-0 rtl:mr-3 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-150"
            aria-label={isRTL ? 'إغلاق' : 'Close'}
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
    </UIEnhancer>
  );
};

/**
 * Enhanced Badge component
 */
export const EnhancedBadge = ({ 
  children, 
  type = 'default',
  size = 'md',
  pill = false,
  withDot = false,
  ...props 
}) => {
  const badgeTypes = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300',
    success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300',
    error: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
  };
  
  const badgeSizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  };
  
  return (
    <span 
      className={`
        inline-flex items-center font-medium
        ${badgeTypes[type] || badgeTypes.default}
        ${badgeSizes[size] || badgeSizes.md}
        ${pill ? 'rounded-full' : 'rounded-md'}
      `}
      {...props}
    >
      {withDot && (
        <span 
          className={`
            w-1.5 h-1.5 rounded-full mr-1.5 rtl:mr-0 rtl:ml-1.5 inline-block
            ${type === 'default' ? 'bg-gray-500' : 
              type === 'primary' ? 'bg-primary-500' :
              type === 'secondary' ? 'bg-secondary-500' :
              type === 'success' ? 'bg-success-500' :
              type === 'error' ? 'bg-error-500' :
              type === 'warning'? 'bg-warning-500' : 'bg-blue-500'}
          `}
        />
      )}
      {children}
    </span>
  );
};

/**
 * Enhanced Avatar component
 */
export const EnhancedAvatar = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  ...props
}) => {
  const { isRTL } = useLanguage();
  
  const avatarSizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-md',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl'
  };
  
  const avatarShapes = {
    circle: 'rounded-full',
    square: 'rounded-md',
    rounded: 'rounded-lg'
  };
  
  const statusColors = {
    online: 'bg-success-500',
    away: 'bg-warning-500',
    busy: 'bg-error-500',
    offline: 'bg-gray-500'
  };
  
  // Get initials from name
  const getInitials = (fullName) => {
    if (!fullName) return '';
    
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  };
  
  const sizeClass = avatarSizes[size] || avatarSizes.md;
  const shapeClass = avatarShapes[shape] || avatarShapes.circle;
  
  // Status badge positioning based on size
  const getStatusPositionClasses = () => {
    const positions = {
      xs: '-bottom-0.5 -right-0.5 w-2 h-2',
      sm: '-bottom-0.5 -right-0.5 w-2.5 h-2.5',
      md: '-bottom-0.5 -right-0.5 w-3 h-3',
      lg: '-bottom-1 -right-1 w-3.5 h-3.5',
      xl: '-bottom-1 -right-1 w-4 h-4',
      '2xl': '-bottom-1.5 -right-1.5 w-5 h-5'
    };
    
    return isRTL 
      ? positions[size].replace('right', 'left')
      : positions[size];
  };
  
  return (
    <div className="relative inline-flex">
      {src ? (
        <img 
          src={src}
          alt={alt || name || 'Avatar'}
          className={`${sizeClass} ${shapeClass} object-cover border-2 border-white dark:border-gray-800`}
          {...props}
        />
      ) : (
        <div 
          className={`
            ${sizeClass} ${shapeClass} 
            flex items-center justify-center
            font-medium text-white
            bg-gradient-to-br from-primary-500 to-primary-700
          `}
          {...props}
        >
          {name ? getInitials(name) : <Icon name="User" size={parseInt(size) * 2} />}
        </div>
      )}
      
      {status && (
        <span 
          className={`
            absolute ${getStatusPositionClasses()} 
            ${statusColors[status] || statusColors.offline} 
            ${avatarShapes[shape] === 'circle' ? 'rounded-full' : 'rounded-full'}
            border-2 border-white dark:border-gray-800
          `}
          aria-label={status}
        />
      )}
    </div>
  );
};

export default UIEnhancer;