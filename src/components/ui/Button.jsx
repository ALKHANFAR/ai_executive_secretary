// src/components/ui/Button.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Icon from '../AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const { isRTL } = useLanguage();

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-primary to-primary-700 text-white
      hover:from-primary-600 hover:to-primary-800 
      focus:ring-primary-500 shadow-md hover:shadow-lg
      active:scale-95 transform
    `,
    secondary: `
      bg-secondary-100 text-secondary-700 border border-secondary-200
      hover:bg-secondary-200 hover:border-secondary-300
      focus:ring-secondary-500 dark:bg-secondary-800 dark:text-secondary-100
      dark:border-secondary-700 dark:hover:bg-secondary-700
    `,
    outline: `
      bg-transparent border-2 border-primary text-primary
      hover:bg-primary hover:text-white
      focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400
      dark:hover:bg-primary-400 dark:hover:text-white
    `,
    ghost: `
      bg-transparent text-text-secondary
      hover:bg-secondary-100 hover:text-text-primary
      focus:ring-secondary-500 dark:hover:bg-secondary-800
    `,
    danger: `
      bg-gradient-to-r from-error to-red-700 text-white
      hover:from-red-600 hover:to-red-800
      focus:ring-error shadow-md hover:shadow-lg
      active:scale-95 transform
    `,
    success: `
      bg-gradient-to-r from-success to-green-700 text-white
      hover:from-green-600 hover:to-green-800
      focus:ring-success shadow-md hover:shadow-lg
      active:scale-95 transform
    `,
    warning: `
      bg-gradient-to-r from-warning to-yellow-600 text-white
      hover:from-yellow-600 hover:to-yellow-700
      focus:ring-warning shadow-md hover:shadow-lg
      active:scale-95 transform
    `,
    gradient: `
      bg-gradient-to-r from-neon-blue to-neon-purple text-white
      hover:from-neon-purple hover:to-neon-blue
      focus:ring-neon-blue shadow-md hover:shadow-lg
      active:scale-95 transform
    `
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const getIconSpacing = () => {
    if (isRTL) {
      return {
        left: rightIcon ? 'ml-2' : '',
        right: leftIcon ? 'mr-2' : ''
      };
    }
    return {
      left: leftIcon ? 'mr-2' : '',
      right: rightIcon ? 'ml-2' : ''
    };
  };

  const iconSpacing = getIconSpacing();

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <Icon 
          name="Loader2" 
          size={size === 'xs' ? 14 : size === 'sm' ? 16 : 20} 
          className={`animate-spin ${children ? (isRTL ? 'ml-2' : 'mr-2') : ''}`} 
        />
      )}
      
      {/* Left icon (or right in RTL) */}
      {!loading && (isRTL ? rightIcon : leftIcon) && (
        <Icon 
          name={isRTL ? rightIcon : leftIcon} 
          size={size === 'xs' ? 14 : size === 'sm' ? 16 : 20} 
          className={iconSpacing.left}
        />
      )}
      
      {/* Button content */}
      {children && (
        <span className={loading ? 'opacity-75' : ''}>
          {children}
        </span>
      )}
      
      {/* Right icon (or left in RTL) */}
      {!loading && (isRTL ? leftIcon : rightIcon) && (
        <Icon 
          name={isRTL ? leftIcon : rightIcon} 
          size={size === 'xs' ? 14 : size === 'sm' ? 16 : 20} 
          className={iconSpacing.right}
        />
      )}
    </button>
  );
};

// Preset button variants for common use cases
export const PrimaryButton = (props) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton = (props) => (
  <Button variant="secondary" {...props} />
);

export const OutlineButton = (props) => (
  <Button variant="outline" {...props} />
);

export const GhostButton = (props) => (
  <Button variant="ghost" {...props} />
);

export const DangerButton = (props) => (
  <Button variant="danger" {...props} />
);

export const SuccessButton = (props) => (
  <Button variant="success" {...props} />
);

export const WarningButton = (props) => (
  <Button variant="warning" {...props} />
);

export const GradientButton = (props) => (
  <Button variant="gradient" {...props} />
);

export default Button;