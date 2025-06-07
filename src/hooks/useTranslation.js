// src/hooks/useTranslation.js
import { useLanguage } from '../context/LanguageContext';
import translations from '../context/localization/translations';

/**
 * Custom hook for handling translations throughout the application
 * @returns {Object} Translation utility functions
 */
const useTranslation = () => {
  const { currentLanguage } = useLanguage();

  /**
   * Get a translated string from the translations object
   * @param {string} path - Dot notation path to the translation (e.g. 'common.save')
   * @param {Object} params - Optional parameters to replace placeholders in the translation
   * @returns {string} The translated string
   */
  const t = (path, params = {}) => {
    // Split the path into parts
    const parts = path.split('.');
    
    // Navigate through the translations object to find the requested string
    let result = translations;
    for (const part of parts) {
      if (result[part] === undefined) {
        console.warn(`Translation missing: ${path}`);
        return path; // Return the key if translation not found
      }
      result = result[part];
    }

    // Get the translation for the current language or fall back to English
    const translatedText = result[currentLanguage] || result['en'] || path;
    
    // Replace any parameters in the translation string
    if (params && Object.keys(params).length > 0) {
      return Object.entries(params).reduce((str, [key, value]) => {
        return str.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
      }, translatedText);
    }
    
    return translatedText;
  };

  /**
   * Format a date according to the current language
   * @param {Date} date - The date to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string} The formatted date string
   */
  const formatDate = (date, options = {}) => {
    const defaultOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return new Intl.DateTimeFormat(
      currentLanguage === 'ar' ? 'ar-SA' : 'en-US', 
      { ...defaultOptions, ...options }
    ).format(date);
  };

  /**
   * Format a number according to the current language
   * @param {number} number - The number to format
   * @param {Object} options - Intl.NumberFormat options
   * @returns {string} The formatted number string
   */
  const formatNumber = (number, options = {}) => {
    return new Intl.NumberFormat(
      currentLanguage === 'ar' ? 'ar-SA' : 'en-US', 
      options
    ).format(number);
  };

  /**
   * Get day names in the current language
   * @param {string} format - 'long', 'short', or 'narrow'
   * @returns {Array} Array of day names
   */
  const getDayNames = (format = 'short') => {
    const days = [];
    const date = new Date(2021, 0, 3); // Start with a Sunday (Jan 3, 2021)
    
    for (let i = 0; i < 7; i++) {
      days.push(
        new Intl.DateTimeFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
          weekday: format
        }).format(date)
      );
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };

  /**
   * Get month names in the current language
   * @param {string} format - 'long', 'short', or 'narrow'
   * @returns {Array} Array of month names
   */
  const getMonthNames = (format = 'long') => {
    const months = [];
    const date = new Date(2021, 0, 1);
    
    for (let i = 0; i < 12; i++) {
      months.push(
        new Intl.DateTimeFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
          month: format
        }).format(date)
      );
      date.setMonth(date.getMonth() + 1);
    }
    
    return months;
  };

  return {
    t,
    formatDate,
    formatNumber,
    getDayNames,
    getMonthNames
  };
};

export default useTranslation;