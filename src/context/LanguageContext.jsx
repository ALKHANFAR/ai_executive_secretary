// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create language context
const LanguageContext = createContext();

// Available languages
export const languages = [
  { 
    code: 'en', 
    name: 'English', 
    nameInNative: 'English',
    direction: 'ltr',
    flag: '🇺🇸',
    locale: 'en-US',
    fontFamily: 'Satoshi, Space Grotesk, Inter, system-ui, sans-serif'
  },
  { 
    code: 'ar', 
    name: 'Arabic', 
    nameInNative: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦',
    locale: 'ar-SA',
    fontFamily: 'Cairo, Amiri, Noto Sans Arabic, system-ui, sans-serif'
  }
];

// Provider component
export const LanguageProvider = ({ children }) => {
  // Check for existing language preference or use browser language
  const getBrowserLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    return languages.find(lang => lang.code === browserLang) ? browserLang : 'en';
  };

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || getBrowserLanguage();
  });

  // Get current language object
  const getCurrentLanguageObject = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  // Is the current language RTL?
  const isRTL = getCurrentLanguageObject().direction === 'rtl';

  // Load Arabic fonts dynamically
  const loadArabicFonts = () => {
    if (!document.getElementById('arabic-fonts')) {
      const fontLink = document.createElement('link');
      fontLink.id = 'arabic-fonts';
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap';
      fontLink.onload = () => {
        console.log('Arabic fonts loaded successfully');
      };
      fontLink.onerror = () => {
        console.error('Failed to load Arabic fonts');
      };
      document.head.appendChild(fontLink);
    }
  };

  // Update HTML attributes and fonts when language changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const currentLangObj = getCurrentLanguageObject();
    
    // Store language preference
    localStorage.setItem('language', currentLanguage);
    
    // Update HTML lang and dir attributes
    htmlElement.lang = currentLangObj.locale;
    htmlElement.dir = currentLangObj.direction;
    
    // Apply language-specific font family
    bodyElement.style.fontFamily = currentLangObj.fontFamily;
    
    // Load Arabic fonts if switching to Arabic
    if (currentLanguage === 'ar') {
      loadArabicFonts();
      
      // Apply RTL-specific styles
      htmlElement.classList.add('rtl-layout');
      bodyElement.classList.add('arabic-text');
      
      // Ensure proper text rendering for Arabic
      bodyElement.style.textAlign = 'right';
      bodyElement.style.direction = 'rtl';
    } else {
      // Remove RTL-specific classes and styles for LTR languages
      htmlElement.classList.remove('rtl-layout');
      bodyElement.classList.remove('arabic-text');
      bodyElement.style.textAlign = '';
      bodyElement.style.direction = '';
    }

    // Add transition class to prevent flash of unstyled content
    bodyElement.classList.add('language-transition');
    
    // Remove transition class after a short delay
    const transitionTimeout = setTimeout(() => {
      bodyElement.classList.remove('language-transition');
    }, 300);

    return () => {
      clearTimeout(transitionTimeout);
    };
  }, [currentLanguage]);

  // Function to change language
  const changeLanguage = (langCode) => {
    if (languages.some(lang => lang.code === langCode)) {
      setCurrentLanguage(langCode);
      
      // Trigger a custom event for language change
      window.dispatchEvent(new CustomEvent('languageChange', {
        detail: { 
          newLanguage: langCode, 
          isRTL: languages.find(lang => lang.code === langCode)?.direction === 'rtl' 
        }
      }));
    }
  };

  // Get a localized value based on the current language
  const getLocalizedText = (enText, arText) => {
    if (currentLanguage === 'ar' && arText) {
      return arText;
    }
    return enText || arText || '';
  };

  // Format numbers according to current locale
  const formatNumber = (number, options = {}) => {
    const currentLangObj = getCurrentLanguageObject();
    return new Intl.NumberFormat(currentLangObj.locale, options).format(number);
  };

  // Format dates according to current locale
  const formatDate = (date, options = {}) => {
    const currentLangObj = getCurrentLanguageObject();
    const defaultOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Intl.DateTimeFormat(currentLangObj.locale, { ...defaultOptions, ...options }).format(date);
  };

  // Get proper text alignment based on language direction
  const getTextAlignment = () => {
    return isRTL ? 'right' : 'left';
  };

  // Get proper flex direction for RTL
  const getFlexDirection = (defaultDirection = 'row') => {
    if (!isRTL) return defaultDirection;
    
    switch (defaultDirection) {
      case 'row':
        return 'row-reverse';
      case 'row-reverse':
        return 'row';
      default:
        return defaultDirection;
    }
  };

  return (
    <LanguageContext.Provider 
      value={{
        currentLanguage,
        isRTL,
        changeLanguage,
        getLocalizedText,
        formatNumber,
        formatDate,
        getTextAlignment,
        getFlexDirection,
        languages,
        getCurrentLanguageObject
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for easy context usage
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;