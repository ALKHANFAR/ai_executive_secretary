// src/components/ui/LanguageSwitcher.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Icon from '../AppIcon';
import useTranslation from '../../hooks/useTranslation';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentLanguage, changeLanguage, languages, isRTL } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-primary-50 dark:hover:bg-gray-800 transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2"
        title={t('common.language')}
      >
        <span className="text-lg">{getCurrentLanguage().flag}</span>
        <span className="text-sm font-medium hidden sm:block">
          {getCurrentLanguage().nameInNative}
        </span>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 w-48 glassmorphism dark:bg-dark-bg/95 border border-border rounded-xl shadow-lg py-2 animate-fade-in z-50">
          <div className="px-4 py-2 border-b border-border">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {t('common.language')}
            </span>
          </div>
          
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`
                  w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-sm
                  transition-colors duration-150 hover:bg-primary-50 dark:hover:bg-gray-800
                  ${
                    currentLanguage === language.code
                      ? 'text-neon-blue bg-primary-50 dark:bg-gray-800 font-medium' :'dark:text-white text-text-primary'
                  }
                `}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex-1 text-left rtl:text-right">
                  <div className="font-medium">{language.nameInNative}</div>
                  <div className="text-xs text-text-secondary">{language.name}</div>
                </div>
                {currentLanguage === language.code && (
                  <Icon name="Check" size={16} className="text-neon-blue" />
                )}
              </button>
            ))}
          </div>
          
          <div className="px-4 py-2 border-t border-border">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="Globe" size={14} className="text-text-secondary" />
              <span className="text-xs text-text-secondary">
                {isRTL ? 'اتجاه النص: من اليمين إلى اليسار' : 'Text Direction: Left to Right'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;