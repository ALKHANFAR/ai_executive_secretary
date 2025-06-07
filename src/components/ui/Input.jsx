// src/components/ui/Input.jsx
import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Icon from '../AppIcon';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  required = false,
  error,
  label,
  helpText,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'default',
  className = '',
  autoComplete,
  autoFocus = false,
  maxLength,
  minLength,
  pattern,
  readOnly = false,
  id,
  name,
  ...props
}) => {
  const { isRTL } = useLanguage();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const baseClasses = `
    w-full px-4 py-2 border rounded-lg font-medium
    transition-all duration-150 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
    ${isRTL ? 'text-right' : 'text-left'}
    ${className}
  `;

  const variants = {
    default: `
      border-border bg-surface text-text-primary
      hover:border-secondary-300 focus:border-primary focus:ring-primary/20
      dark:bg-secondary-800 dark:border-secondary-700 dark:text-white
      dark:hover:border-secondary-600 dark:focus:border-primary
    `,
    filled: `
      border-transparent bg-secondary-100 text-text-primary
      hover:bg-secondary-200 focus:bg-surface focus:border-primary focus:ring-primary/20
      dark:bg-secondary-800 dark:text-white dark:hover:bg-secondary-700
      dark:focus:bg-secondary-800 dark:focus:border-primary
    `,
    flushed: `
      border-transparent border-b-2 border-b-border bg-transparent text-text-primary
      hover:border-b-secondary-300 focus:border-b-primary focus:ring-0
      rounded-none px-0
      dark:text-white dark:border-b-secondary-700
      dark:hover:border-b-secondary-600 dark:focus:border-b-primary
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base'
  };

  const errorClasses = error ? `
    border-error focus:border-error focus:ring-error/20
    dark:border-error dark:focus:border-error
  ` : '';

  const iconPadding = {
    left: leftIcon ? (isRTL ? '' : 'pl-10') : '',
    right: rightIcon || type === 'password' ? (isRTL ? 'pr-10' : 'pl-10') : ''
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          htmlFor={id || name}
          className={`
            block text-sm font-medium text-text-primary mb-2
            ${required ? 'after:content-["*"] after:text-error after:ml-1 rtl:after:mr-1' : ''}
            dark:text-white
          `}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className={`
            absolute top-1/2 transform -translate-y-1/2 
            ${isRTL ? 'right-3' : 'left-3'} 
            text-text-secondary
            ${focused ? 'text-primary' : ''}
            ${error ? 'text-error' : ''}
          `}>
            <Icon name={leftIcon} size={20} />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={inputRef}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          readOnly={readOnly}
          id={id || name}
          name={name}
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`
            ${baseClasses} ${variants[variant]} ${sizes[size]} 
            ${errorClasses} ${iconPadding.left} ${iconPadding.right}
          `}
          {...props}
        />

        {/* Right Icon or Password Toggle */}
        {(rightIcon || type === 'password') && (
          <div className={`
            absolute top-1/2 transform -translate-y-1/2 
            ${isRTL ? 'left-3' : 'right-3'}
            ${type === 'password' ? 'cursor-pointer' : ''}
            text-text-secondary
            ${focused ? 'text-primary' : ''}
            ${error ? 'text-error' : ''}
          `}>
            {type === 'password' ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="p-1 hover:text-text-primary transition-colors duration-150 focus:outline-none"
                tabIndex={-1}
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            ) : (
              <Icon name={rightIcon} size={20} />
            )}
          </div>
        )}

        {/* Error Icon */}
        {error && !rightIcon && type !== 'password' && (
          <div className={`
            absolute top-1/2 transform -translate-y-1/2 
            ${isRTL ? 'left-3' : 'right-3'} 
            text-error
          `}>
            <Icon name="AlertCircle" size={20} />
          </div>
        )}
      </div>

      {/* Help Text or Error Message */}
      {(helpText || error) && (
        <div className="mt-2 flex items-start space-x-1 rtl:space-x-reverse">
          {error && (
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0 mt-0.5" />
          )}
          <p className={`text-sm ${
            error ? 'text-error' : 'text-text-secondary'
          }`}>
            {error || helpText}
          </p>
        </div>
      )}
    </div>
  );
};

// Preset input variants for common use cases
export const TextInput = (props) => (
  <Input type="text" {...props} />
);

export const EmailInput = (props) => (
  <Input type="email" leftIcon="Mail" {...props} />
);

export const PasswordInput = (props) => (
  <Input type="password" leftIcon="Lock" {...props} />
);

export const SearchInput = (props) => (
  <Input type="search" leftIcon="Search" {...props} />
);

export const NumberInput = (props) => (
  <Input type="number" {...props} />
);

export const TelInput = (props) => (
  <Input type="tel" leftIcon="Phone" {...props} />
);

export const UrlInput = (props) => (
  <Input type="url" leftIcon="Link" {...props} />
);

export default Input;