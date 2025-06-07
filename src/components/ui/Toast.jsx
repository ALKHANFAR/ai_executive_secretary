// src/components/ui/Toast.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';
import Icon from '../AppIcon';

// Toast Component
const Toast = ({ 
  id,
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose,
  action,
  persistent = false,
  position = 'top-right'
}) => {
  const { isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Show animation
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    
    // Auto dismiss
    let dismissTimer;
    if (!persistent && duration > 0) {
      dismissTimer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [duration, persistent]);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose?.(id);
    }, 300); // Animation duration
  }, [id, onClose]);

  const toastTypes = {
    success: {
      icon: 'CheckCircle',
      bgColor: 'bg-success-50 dark:bg-success-900/20',
      borderColor: 'border-success-200 dark:border-success-700',
      iconColor: 'text-success-600 dark:text-success-400',
      titleColor: 'text-success-800 dark:text-success-300',
      messageColor: 'text-success-700 dark:text-success-400'
    },
    error: {
      icon: 'XCircle',
      bgColor: 'bg-error-50 dark:bg-error-900/20',
      borderColor: 'border-error-200 dark:border-error-700',
      iconColor: 'text-error-600 dark:text-error-400',
      titleColor: 'text-error-800 dark:text-error-300',
      messageColor: 'text-error-700 dark:text-error-400'
    },
    warning: {
      icon: 'AlertTriangle',
      bgColor: 'bg-warning-50 dark:bg-warning-900/20',
      borderColor: 'border-warning-200 dark:border-warning-700',
      iconColor: 'text-warning-600 dark:text-warning-400',
      titleColor: 'text-warning-800 dark:text-warning-300',
      messageColor: 'text-warning-700 dark:text-warning-400'
    },
    info: {
      icon: 'Info',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
      borderColor: 'border-primary-200 dark:border-primary-700',
      iconColor: 'text-primary-600 dark:text-primary-400',
      titleColor: 'text-primary-800 dark:text-primary-300',
      messageColor: 'text-primary-700 dark:text-primary-400'
    }
  };

  const currentType = toastTypes[type] || toastTypes.info;

  const getPositionClasses = () => {
    const positions = {
      'top-right': isRTL ? 'top-4 left-4' : 'top-4 right-4',
      'top-left': isRTL ? 'top-4 right-4' : 'top-4 left-4',
      'bottom-right': isRTL ? 'bottom-4 left-4' : 'bottom-4 right-4',
      'bottom-left': isRTL ? 'bottom-4 right-4' : 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };
    return positions[position] || positions['top-right'];
  };

  const getAnimationClasses = () => {
    if (isLeaving) {
      return 'animate-fade-out translate-x-full opacity-0';
    }
    if (isVisible) {
      return 'animate-slide-in translate-x-0 opacity-100';
    }
    return 'translate-x-full opacity-0';
  };

  return (
    <div
      className={`
        fixed z-toast w-full max-w-sm p-4 glassmorphism
        border rounded-xl shadow-lg transition-all duration-300 ease-out
        ${currentType.bgColor} ${currentType.borderColor}
        ${getPositionClasses()} ${getAnimationClasses()}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3 rtl:space-x-reverse">
        {/* Icon */}
        <div className={`flex-shrink-0 ${currentType.iconColor}`}>
          <Icon name={currentType.icon} size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`text-sm font-semibold ${currentType.titleColor} mb-1`}>
              {title}
            </h4>
          )}
          {message && (
            <p className={`text-sm ${currentType.messageColor}`}>
              {message}
            </p>
          )}
          
          {/* Action Button */}
          {action && (
            <div className="mt-3">
              <button
                onClick={action.onClick}
                className={`
                  text-sm font-medium underline hover:no-underline
                  transition-colors duration-150
                  ${currentType.iconColor} hover:opacity-80
                `}
              >
                {action.label}
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`
            flex-shrink-0 p-1 rounded-md transition-colors duration-150
            ${currentType.iconColor} hover:bg-black/10 dark:hover:bg-white/10
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
          `}
          aria-label={isRTL ? 'إغلاق الإشعار' : 'Close notification'}
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Progress Bar */}
      {!persistent && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 rounded-b-xl overflow-hidden">
          <div 
            className={`h-full ${currentType.iconColor} bg-current rounded-b-xl`}
            style={{
              animation: `toast-progress ${duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts = [], onRemove, position = 'top-right', isRTL }) => {
  if (!toasts.length) return null;

  return createPortal(
    <div className="fixed z-toast pointer-events-none">
      <div className="space-y-2">
        {toasts.map((toast, index) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              {...toast}
              onClose={onRemove}
              position={position}
              style={{
                '--toast-index': index
              }}
            />
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};

// Toast Hook
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      ...toast
    };

    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const updateToast = useCallback((id, updates) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, ...updates } : toast
    ));
  }, []);

  // Convenience methods
  const success = useCallback((title, message, options = {}) => {
    return addToast({ type: 'success', title, message, ...options });
  }, [addToast]);

  const error = useCallback((title, message, options = {}) => {
    return addToast({ type: 'error', title, message, ...options });
  }, [addToast]);

  const warning = useCallback((title, message, options = {}) => {
    return addToast({ type: 'warning', title, message, ...options });
  }, [addToast]);

  const info = useCallback((title, message, options = {}) => {
    return addToast({ type: 'info', title, message, ...options });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    success,
    error,
    warning,
    info
  };
};

// CSS for animations (add to your global CSS)
const toastStyles = `
@keyframes toast-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

@keyframes animate-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes animate-fade-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

[dir="rtl"] @keyframes animate-slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

[dir="rtl"] @keyframes animate-fade-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}
`;

// Inject styles if they don't exist
if (typeof document !== 'undefined' && !document.getElementById('toast-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'toast-styles';
  styleSheet.textContent = toastStyles;
  document.head.appendChild(styleSheet);
}

export default Toast;