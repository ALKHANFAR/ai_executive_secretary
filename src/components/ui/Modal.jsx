// src/components/ui/Modal.jsx
import React, { useEffect, useRef } from 'react';
import Icon from '../AppIcon';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  titleAr,
  children, 
  size = 'md',
  isRTL = false,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = ''
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl mx-4'
  };

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      
      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      
      // Return focus to previously active element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const getCurrentTitle = () => {
    return isRTL && titleAr ? titleAr : title;
  };

  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed inset-0 z-modal flex items-center justify-center p-4
        bg-black/50 backdrop-blur-sm
        transition-all duration-300 ease-out
        ${overlayClassName}
      `}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className={`
          relative w-full ${sizeClasses[size]}
          bg-surface rounded-2xl shadow-xl
          transform transition-all duration-300 ease-out
          animate-fade-in
          ${className}
        `}
        tabIndex={-1}
        role="document"
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            {title && (
              <h2 id="modal-title" className="text-xl font-semibold text-text-primary">
                {getCurrentTitle()}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="
                  p-2 rounded-lg text-text-secondary hover:text-text-primary 
                  hover:bg-secondary-100 transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                "
                aria-label={isRTL ? 'إغلاق النافذة' : 'Close modal'}
              >
                <Icon name="X" size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Modal Header Component
export const ModalHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

// Modal Body Component  
export const ModalBody = ({ children, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    {children}
  </div>
);

// Modal Footer Component
export const ModalFooter = ({ children, className = '' }) => (
  <div className={`flex items-center justify-end space-x-3 rtl:space-x-reverse pt-4 border-t border-border ${className}`}>
    {children}
  </div>
);

// Confirmation Modal Component
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  titleAr,
  message,
  messageAr,
  confirmLabel = 'Confirm',
  confirmLabelAr = 'تأكيد',
  cancelLabel = 'Cancel',
  cancelLabelAr = 'إلغاء',
  isRTL = false,
  type = 'warning'
}) => {
  const typeConfig = {
    warning: {
      icon: 'AlertTriangle',
      iconColor: 'text-warning',
      iconBg: 'bg-warning-50',
      confirmBg: 'bg-warning hover:bg-warning-600'
    },
    danger: {
      icon: 'AlertCircle',
      iconColor: 'text-error',
      iconBg: 'bg-error-50',
      confirmBg: 'bg-error hover:bg-error-600'
    },
    info: {
      icon: 'Info',
      iconColor: 'text-primary',
      iconBg: 'bg-primary-50',
      confirmBg: 'bg-primary hover:bg-primary-700'
    }
  };

  const config = typeConfig[type];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      isRTL={isRTL}
      className="max-w-md"
    >
      <div className="text-center">
        <div className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full ${config.iconBg} mb-4`}>
          <Icon name={config.icon} size={24} className={config.iconColor} />
        </div>
        
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {isRTL && titleAr ? titleAr : title}
        </h3>
        
        <p className="text-text-secondary mb-6">
          {isRTL && messageAr ? messageAr : message}
        </p>
        
        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-secondary-500"
          >
            {isRTL ? cancelLabelAr : cancelLabel}
          </button>
          
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.confirmBg}`}
          >
            {isRTL ? confirmLabelAr : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;