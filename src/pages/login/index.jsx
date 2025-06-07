import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const navigate = useNavigate();

  // Mock credentials for different user types
  const mockCredentials = {
    executive: {
      email: 'executive@company.com',
      password: 'Executive123!',
      mfa: '123456'
    },
    manager: {
      email: 'manager@company.com',
      password: 'Manager123!',
      mfa: '654321'
    },
    admin: {
      email: 'admin@company.com',
      password: 'Admin123!',
      mfa: '789012'
    }
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [isRTL, currentLanguage]);

  const handleLanguageToggle = (language) => {
    setCurrentLanguage(language);
    setIsRTL(language === 'ar');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = isRTL ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isRTL ? 'البريد الإلكتروني غير صحيح' : 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = isRTL ? 'كلمة المرور مطلوبة' : 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMFA = () => {
    if (!mfaCode) {
      setErrors({ mfa: isRTL ? 'رمز التحقق مطلوب' : 'Verification code is required' });
      return false;
    }
    if (mfaCode.length !== 6) {
      setErrors({ mfa: isRTL ? 'رمز التحقق يجب أن يكون 6 أرقام' : 'Verification code must be 6 digits' });
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      const isValidCredentials = Object.values(mockCredentials).some(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (!isValidCredentials) {
        setErrors({
          general: isRTL 
            ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة. استخدم: executive@company.com / Executive123!' :'Invalid email or password. Use: executive@company.com / Executive123!'
        });
        setIsLoading(false);
        return;
      }

      // Show MFA step
      setShowMFA(true);
      setIsLoading(false);

    } catch (error) {
      setErrors({
        general: isRTL ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during login'
      });
      setIsLoading(false);
    }
  };

  const handleMFASubmit = async (e) => {
    e.preventDefault();
    
    if (!validateMFA()) return;

    setIsLoading(true);

    try {
      // Simulate MFA verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check MFA code
      const userCred = Object.values(mockCredentials).find(
        cred => cred.email === formData.email
      );

      if (userCred && userCred.mfa === mfaCode) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/executive-dashboard');
      } else {
        setErrors({
          mfa: isRTL 
            ? 'رمز التحقق غير صحيح. استخدم: 123456' :'Invalid verification code. Use: 123456'
        });
      }
    } catch (error) {
      setErrors({
        mfa: isRTL ? 'حدث خطأ أثناء التحقق' : 'An error occurred during verification'
      });
    }

    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleRequestDemo = () => {
    console.log('Request demo clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-secondary-100 flex items-center justify-center px-4">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 rtl:right-auto rtl:left-4 z-50">
        <div className="flex items-center space-x-2 rtl:space-x-reverse bg-surface rounded-lg p-2 shadow-md border border-border">
          <button
            onClick={() => handleLanguageToggle('en')}
            className={`px-3 py-1 rounded text-sm font-medium transition-all duration-150 ${
              currentLanguage === 'en' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageToggle('ar')}
            className={`px-3 py-1 rounded text-sm font-medium transition-all duration-150 ${
              currentLanguage === 'ar' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            العربية
          </button>
        </div>
      </div>

      {/* Main Login Container */}
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-surface rounded-2xl shadow-xl border border-border p-8 animate-fade-in">
          {/* Logo and Branding */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              {isRTL ? 'مساعد تنفيذي ذكي' : 'Executive AI Secretary'}
            </h1>
            <p className="text-text-secondary">
              {isRTL 
                ? 'منصة متعددة الوكلاء للمساعدة التنفيذية' :'Multi-Agent Executive Assistance Platform'
              }
            </p>
          </div>

          {!showMFA ? (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-error-50 border border-error-100 rounded-lg p-3 flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
                  <span className="text-sm text-error">{errors.general}</span>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input-field pr-10 rtl:pr-4 rtl:pl-10 ${errors.email ? 'border-error focus:ring-error' : ''}`}
                    placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <Icon 
                    name="Mail" 
                    size={18} 
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 text-text-secondary" 
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-error flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="AlertCircle" size={14} />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {isRTL ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`input-field pr-20 rtl:pr-4 rtl:pl-20 ${errors.password ? 'border-error focus:ring-error' : ''}`}
                    placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <div className="absolute top-1/2 transform -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 flex items-center space-x-2 rtl:space-x-reverse">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-text-secondary hover:text-text-primary transition-colors duration-150 focus:outline-none"
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
                    </button>
                    <Icon name="Lock" size={18} className="text-text-secondary" />
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="AlertCircle" size={14} />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={20} className="animate-spin" />
                    <span>{isRTL ? 'جاري تسجيل الدخول...' : 'Signing In...'}</span>
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={20} />
                    <span>{isRTL ? 'تسجيل الدخول' : 'Sign In'}</span>
                  </>
                )}
              </button>

              {/* Additional Links */}
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-primary hover:text-primary-700 transition-colors duration-150 focus:outline-none focus:underline"
                >
                  {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                </button>
                <button
                  type="button"
                  onClick={handleRequestDemo}
                  className="text-secondary-600 hover:text-secondary-700 transition-colors duration-150 focus:outline-none focus:underline"
                >
                  {isRTL ? 'طلب عرض تجريبي' : 'Request Demo'}
                </button>
              </div>
            </form>
          ) : (
            /* MFA Form */
            <form onSubmit={handleMFASubmit} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  {isRTL ? 'التحقق الثنائي' : 'Two-Factor Authentication'}
                </h2>
                <p className="text-sm text-text-secondary">
                  {isRTL 
                    ? 'أدخل رمز التحقق المرسل إلى جهازك' :'Enter the verification code sent to your device'
                  }
                </p>
              </div>

              {/* MFA Error */}
              {errors.mfa && (
                <div className="bg-error-50 border border-error-100 rounded-lg p-3 flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
                  <span className="text-sm text-error">{errors.mfa}</span>
                </div>
              )}

              {/* MFA Code Field */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {isRTL ? 'رمز التحقق' : 'Verification Code'}
                </label>
                <input
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`input-field text-center text-lg tracking-widest ${errors.mfa ? 'border-error focus:ring-error' : ''}`}
                  placeholder="000000"
                  maxLength="6"
                />
              </div>

              {/* MFA Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={20} className="animate-spin" />
                    <span>{isRTL ? 'جاري التحقق...' : 'Verifying...'}</span>
                  </>
                ) : (
                  <>
                    <Icon name="Check" size={20} />
                    <span>{isRTL ? 'تحقق' : 'Verify'}</span>
                  </>
                )}
              </button>

              {/* Back to Login */}
              <button
                type="button"
                onClick={() => {
                  setShowMFA(false);
                  setMfaCode('');
                  setErrors({});
                }}
                className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 focus:outline-none focus:underline"
              >
                {isRTL ? 'العودة إلى تسجيل الدخول' : 'Back to Login'}
              </button>
            </form>
          )}
        </div>

        {/* Security Indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse text-xs text-text-secondary">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Icon name="Shield" size={14} className="text-success" />
              <span>{isRTL ? 'آمن بتقنية SSL' : 'SSL Secured'}</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Icon name="Lock" size={14} className="text-success" />
              <span>{isRTL ? 'مشفر' : 'Encrypted'}</span>
            </div>
            <button className="text-primary hover:text-primary-700 transition-colors duration-150 focus:outline-none focus:underline">
              {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">
              {isRTL ? 'بيانات تجريبية' : 'Demo Credentials'}
            </span>
          </div>
          <div className="text-xs text-text-secondary space-y-1">
            <p><strong>{isRTL ? 'البريد:' : 'Email:'}</strong> executive@company.com</p>
            <p><strong>{isRTL ? 'كلمة المرور:' : 'Password:'}</strong> Executive123!</p>
            <p><strong>{isRTL ? 'رمز التحقق:' : 'MFA Code:'}</strong> 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;