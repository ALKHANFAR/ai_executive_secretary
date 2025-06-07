// src/components/utils/ArabicTextRenderer.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Enhanced Arabic text renderer component that handles proper Arabic text display
 * @param {Object} props - Component props
 * @param {string} props.text - Text to display
 * @param {string} props.className - Additional CSS classes
 * @param {React.ElementType} props.as - HTML element to render as
 * @param {Object} props.style - Additional inline styles
 * @param {boolean} props.preserveLTR - Whether to preserve LTR direction for mixed content
 * @returns {React.Component} Properly rendered Arabic text component
 */
const ArabicTextRenderer = ({ 
  text, 
  className = '', 
  as: Component = 'span',
  style = {},
  preserveLTR = false,
  ...props 
}) => {
  const { isRTL, currentLanguage } = useLanguage();

  // Function to detect if text contains Arabic characters
  const containsArabic = (str) => {
    if (!str) return false;
    return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(str);
  };

  // Function to detect if text contains numbers or special characters that should remain LTR
  const containsLTRContent = (str) => {
    if (!str) return false;
    return /[0-9a-zA-Z@._-]/.test(str);
  };

  // Function to wrap LTR content in proper direction spans
  const processArabicText = (inputText) => {
    if (!inputText || !isRTL) return inputText;

    // Split text by spaces to process each word
    const words = inputText.split(' ');
    
    return words.map((word, index) => {
      const hasArabic = containsArabic(word);
      const hasLTR = containsLTRContent(word);
      
      // If word contains both Arabic and LTR characters, or is purely LTR
      if (hasLTR && !preserveLTR) {
        return (
          <span 
            key={index} 
            className="inline-block direction-ltr text-left"
            style={{ direction: 'ltr', unicodeBidi: 'embed' }}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        );
      }
      
      return word + (index < words.length - 1 ? ' ' : '');
    });
  };

  // Enhanced styles for Arabic text rendering
  const getArabicStyles = () => {
    if (!isRTL) return {};
    
    return {
      fontFamily: 'Cairo, Amiri, Noto Sans Arabic, system-ui, sans-serif',
      fontFeatureSettings: '"liga" 1, "calt" 1, "kern" 1, "mark" 1, "mkmk" 1',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      direction: 'rtl',
      textAlign: 'right',
      lineHeight: '1.6',
      wordSpacing: '0.1em',
      letterSpacing: '0.02em',
      ...style
    };
  };

  // Combine classes for Arabic text
  const getClassNames = () => {
    const baseClasses = className;
    const arabicClasses = isRTL ? 'arabic-text' : '';
    return `${baseClasses} ${arabicClasses}`.trim();
  };

  const processedText = isRTL ? processArabicText(text) : text;
  const finalStyles = { ...getArabicStyles(), ...style };

  return (
    <Component 
      className={getClassNames()}
      style={finalStyles}
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={currentLanguage === 'ar' ? 'ar' : 'en'}
      {...props}
    >
      {processedText}
    </Component>
  );
};

/**
 * Shorthand components for common use cases
 */
export const ArabicHeading = (props) => (
  <ArabicTextRenderer as="h1" {...props} />
);

export const ArabicParagraph = (props) => (
  <ArabicTextRenderer as="p" {...props} />
);

export const ArabicSpan = (props) => (
  <ArabicTextRenderer as="span" {...props} />
);

export const ArabicDiv = (props) => (
  <ArabicTextRenderer as="div" {...props} />
);

export const ArabicButton = (props) => (
  <ArabicTextRenderer as="button" {...props} />
);

export const ArabicLabel = (props) => (
  <ArabicTextRenderer as="label" {...props} />
);

/**
 * Hook for processing Arabic text in components
 */
export const useArabicText = () => {
  const { isRTL, currentLanguage } = useLanguage();

  const processText = (text, options = {}) => {
    const { preserveLTR = false } = options;
    
    if (!isRTL || !text) return text;

    // Apply Arabic text processing logic
    return text;
  };

  const getTextDirection = (text) => {
    if (!text) return 'ltr';
    
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text) ? 'rtl' : 'ltr';
  };

  const formatArabicNumber = (number) => {
    if (!isRTL) return number;
    
    // Convert to Arabic-Indic numerals if needed
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
  };

  return {
    processText,
    getTextDirection,
    formatArabicNumber,
    isRTL,
    currentLanguage
  };
};

export default ArabicTextRenderer;