import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const [isRTL, setIsRTL] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const htmlElement = document.documentElement;
    setIsRTL(htmlElement.dir === 'rtl');
  }, []);

  const handleGoHome = () => {
    navigate('/executive-dashboard');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center mb-6">
            <Icon name="AlertTriangle" size={64} color="white" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-text-secondary mb-8">
            {isRTL 
              ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.' :'Sorry, the page you are looking for does not exist or has been moved to another location.'
            }
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <Icon name="Home" size={20} />
            <span>{isRTL ? 'العودة إلى الرئيسية' : 'Go to Dashboard'}</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <Icon name="ArrowLeft" size={20} className={isRTL ? 'rtl:rotate-180' : ''} />
            <span>{isRTL ? 'العودة للخلف' : 'Go Back'}</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-surface rounded-lg border border-border">
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
            <Icon name="HelpCircle" size={20} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">
              {isRTL ? 'تحتاج مساعدة؟' : 'Need Help?'}
            </span>
          </div>
          <p className="text-xs text-text-secondary">
            {isRTL 
              ? 'إذا كنت تواجه مشاكل في الوصول إلى صفحة معينة، يرجى التواصل مع فريق الدعم.' :'If you are having trouble accessing a specific page, please contact our support team.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;