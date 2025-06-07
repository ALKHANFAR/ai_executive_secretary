// src/components/LocalizedText.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useTranslation from '../hooks/useTranslation';

/**
 * LocalizedText component for displaying localized text based on current language
 * @param {Object} props - Component props
 * @param {string} props.en - English text
 * @param {string} props.ar - Arabic text
 * @param {string} props.translationKey - Translation key to use from translations object
 * @param {Object} props.params - Parameters to replace in translation
 * @param {string} props.className - CSS classes
 * @param {React.ElementType} props.as - HTML element to render as
 * @param {Object} props.style - Inline styles
 * @returns {React.Component} Localized text component
 */
const LocalizedText = ({ 
  en, 
  ar, 
  translationKey, 
  params = {}, 
  className = '', 
  as: Component = 'span',
  style = {},
  ...props 
}) => {
  const { currentLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  // Get text based on priority: translationKey > en/ar props > fallback
  const getText = () => {
    if (translationKey) {
      return t(translationKey, params);
    }
    
    if (currentLanguage === 'ar' && ar) {
      return ar;
    }
    
    return en || ar || '';
  };

  const text = getText();

  // Apply RTL-specific styling if needed
  const finalStyle = {
    ...style,
    ...(isRTL && {
      textAlign: style.textAlign || 'right',
      direction: 'rtl'
    })
  };

  return (
    <Component 
      className={className} 
      style={finalStyle}
      dir={isRTL ? 'rtl' : 'ltr'}
      {...props}
    >
      {text}
    </Component>
  );
};

/**
 * Shorthand components for common use cases
 */
export const LocalizedHeading = (props) => (
  <LocalizedText as="h1" {...props} />
);

export const LocalizedParagraph = (props) => (
  <LocalizedText as="p" {...props} />
);

export const LocalizedSpan = (props) => (
  <LocalizedText as="span" {...props} />
);

export const LocalizedDiv = (props) => (
  <LocalizedText as="div" {...props} />
);

/**
 * Hook for getting localized text in components
 */
export const useLocalizedText = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();

  const getLocalizedText = (en, ar, translationKey, params = {}) => {
    if (translationKey) {
      return t(translationKey, params);
    }
    
    if (currentLanguage === 'ar' && ar) {
      return ar;
    }
    
    return en || ar || '';
  };

  return { getLocalizedText, currentLanguage };
};

export default LocalizedText;