// src/components/ui/LoadingSpinner.jsx
import React from 'react';
import Icon from '../AppIcon';

/**
 * Enhanced loading spinner with improved aesthetics and customization
 * @param {Object} props - Component props
 * @param {string} props.size - Spinner size (xs, sm, md, lg, xl)
 * @param {string} props.color - Spinner color (primary, secondary, success, error, warning)
 * @param {string} props.text - Optional loading text
 * @param {string} props.icon - Optional icon name to use instead of default spinner
 * @param {boolean} props.centered - Whether to center the spinner
 * @param {boolean} props.translucent - Whether to make the spinner background translucent
 * @param {boolean} props.isRTL - Whether the text should be displayed RTL
 * @param {string} props.className - Additional CSS classes
 */
const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  text,
  icon = 'Loader2',
  centered = false,
  translucent = false,
  isRTL = false,
  className = ''
}) => {
  // Size mappings
  const sizeMap = {
    xs: { icon: 16, text: 'text-xs', gap: 'gap-1' },
    sm: { icon: 20, text: 'text-sm', gap: 'gap-1.5' },
    md: { icon: 24, text: 'text-sm', gap: 'gap-2' },
    lg: { icon: 32, text: 'text-base', gap: 'gap-3' },
    xl: { icon: 40, text: 'text-lg', gap: 'gap-3' }
  };

  // Color mappings
  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary-600',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    white: 'text-white',
    gray: 'text-gray-500'
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const currentColor = colorMap[color] || colorMap.primary;

  // Container classes
  const containerClasses = [
    'flex',
    isRTL ? 'flex-row-reverse' : 'flex-row',
    'items-center',
    currentSize.gap,
    centered ? 'justify-center' : '',
    translucent ? 'bg-black/5 dark:bg-white/5 rounded-lg p-3' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <Icon
        name={icon}
        size={currentSize.icon}
        className={`${currentColor} animate-spin`}
      />
      {text && (
        <span className={`${currentSize.text} ${currentColor} font-medium`}>
          {text}
        </span>
      )}
    </div>
  );
};

/**
 * Overlay spinner that covers an entire container
 */
export const OverlaySpinner = ({
  isLoading = true,
  text,
  size = 'lg',
  color = 'primary',
  blur = true,
  isRTL = false
}) => {
  if (!isLoading) return null;

  return (
    <div className={`
      absolute inset-0 
      flex items-center justify-center 
      bg-white/80 dark:bg-gray-900/80 
      ${blur ? 'backdrop-blur-sm' : ''}
      z-10 rounded-lg
    `}>
      <LoadingSpinner
        size={size}
        color={color}
        text={text}
        isRTL={isRTL}
        centered
      />
    </div>
  );
};

/**
 * Skeleton loading placeholder
 */
export const Skeleton = ({
  width = 'full',
  height = '16',
  rounded = 'md',
  className = ''
}) => {
  // Width classes
  const widthClasses = {
    full: 'w-full',
    auto: 'w-auto',
    screen: 'w-screen'
  };

  // Pre-defined width with pixels
  const widthClass = widthClasses[width] || `w-${width}`;
  
  // Pre-defined height with pixels
  const heightClass = `h-${height}`;
  
  // Rounded corners
  const roundedClass = `rounded-${rounded}`;

  return (
    <div
      className={`
        ${widthClass} ${heightClass} ${roundedClass}
        animate-pulse bg-gray-200 dark:bg-gray-700
        ${className}
      `}
      aria-hidden="true"
    />
  );
};

/**
 * Content loader for various layouts
 */
export const ContentLoader = ({
  type = 'text',
  lines = 3,
  imageSize = 'md',
  className = ''
}) => {
  // Image size classes
  const imageSizes = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-80'
  };

  switch (type) {
    case 'card':
      return (
        <div className={`space-y-3 ${className}`}>
          <Skeleton height={imageSizes[imageSize].replace('h-', '')} rounded="lg" />
          <Skeleton height="6" width="3/4" />
          <div className="space-y-2">
            <Skeleton height="4" />
            <Skeleton height="4" />
            <Skeleton height="4" width="5/6" />
          </div>
        </div>
      );

    case 'profile':
      return (
        <div className={`flex space-x-4 rtl:space-x-reverse ${className}`}>
          <Skeleton height="16" width="16" rounded="full" />
          <div className="space-y-2 flex-1">
            <Skeleton height="5" width="1/3" />
            <Skeleton height="4" width="1/2" />
            <Skeleton height="4" />
          </div>
        </div>
      );

    case 'list':
      return (
        <div className={`space-y-4 ${className}`}>
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3 rtl:space-x-reverse">
              <Skeleton height="10" width="10" rounded="md" />
              <div className="space-y-1 flex-1">
                <Skeleton height="4" width="3/4" />
                <Skeleton height="3" width="1/2" />
              </div>
            </div>
          ))}
        </div>
      );

    case 'text':
    default:
      return (
        <div className={`space-y-2 ${className}`}>
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton 
              key={i} 
              height="4" 
              width={i === lines - 1 && lines > 1 ? '3/4' : 'full'} 
            />
          ))}
        </div>
      );
  }
};

export default LoadingSpinner;