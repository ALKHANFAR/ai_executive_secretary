// src/components/ui/EnhancedText.jsx
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import useTranslation from '../../hooks/useTranslation';

/**
 * Enhanced text component that properly handles Arabic and RTL text rendering
 * @param {Object} props - Component props
 * @param {string} props.children - Text content or translation key
 * @param {string} props.translationKey - Translation key to use
 * @param {Object} props.translationParams - Parameters for translation
 * @param {string} props.fallback - Fallback text if translation not found
 * @param {string} props.className - CSS classes
 * @param {React.ElementType} props.as - HTML element to render as
 * @param {Object} props.style - Inline styles
 * @param {boolean} props.autoDirection - Auto-detect text direction
 * @param {boolean} props.preserveFormatting - Preserve text formatting
 * @returns {React.Component} Enhanced text component
 */
const EnhancedText = ({
  children,
  translationKey,
  translationParams = {},
  fallback = '',
  className = '',
  as: Component = 'span',
  style = {},
  autoDirection = true,
  preserveFormatting = false,
  ...props
}) => {
  const { isRTL, currentLanguage, getTextAlignment } = useLanguage();
  const { t } = useTranslation();

  // Get the text content
  const getText = () => {
    if (translationKey) {
      return t(translationKey, translationParams);
    }
    return children || fallback;
  };

  // Detect if text contains Arabic characters
  const containsArabic = (text) => {
    if (!text) return false;
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text);
  };

  // Detect if text contains numbers or LTR content
  const containsLTRContent = (text) => {
    if (!text) return false;
    return /[0-9a-zA-Z@._\-+=%&*(){}\[\]|\\:;"'<>?,.\/]/.test(text);
  };

  // Get appropriate text direction
  const getTextDirection = (text) => {
    if (!autoDirection) return isRTL ? 'rtl' : 'ltr';
    
    if (containsArabic(text)) return 'rtl';
    if (containsLTRContent(text)) return 'ltr';
    return isRTL ? 'rtl' : 'ltr';
  };

  // Process text for proper display
  const processText = (text) => {
    if (!text || !isRTL || !preserveFormatting) return text;

    // Split text by spaces and process each segment
    const segments = text.split(/\s+/);
    
    return segments.map((segment, index) => {
      const isLTRSegment = containsLTRContent(segment) && !containsArabic(segment);
      
      if (isLTRSegment) {
        return (
          <span
            key={index}
            className="inline-block"
            style={{
              direction: 'ltr',
              unicodeBidi: 'embed',
              textAlign: 'left'
            }}
          >
            {segment}
          </span>
        );
      }
      
      return segment;
    }).reduce((prev, curr, index) => {
      if (index === 0) return [curr];
      return [...prev, ' ', curr];
    }, []);
  };

  const text = getText();
  const textDirection = getTextDirection(text);
  const processedText = processText(text);

  // Enhanced styles for proper text rendering
  const getEnhancedStyles = () => {
    const baseStyles = {
      direction: textDirection,
      textAlign: textDirection === 'rtl' ? 'right' : 'left',
      ...style
    };

    // Apply Arabic-specific styles if needed
    if (textDirection === 'rtl' || containsArabic(text)) {
      return {
        ...baseStyles,
        fontFamily: 'Cairo, Amiri, Noto Sans Arabic, system-ui, sans-serif',
        fontFeatureSettings: '"liga" 1, "calt" 1, "kern" 1',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        lineHeight: '1.6',
        wordSpacing: '0.05em',
        letterSpacing: '0.01em'
      };
    }

    return baseStyles;
  };

  // Enhanced class names
  const getEnhancedClassNames = () => {
    let classes = className;
    
    if (textDirection === 'rtl') {
      classes += ' rtl-text';
    }
    
    if (containsArabic(text)) {
      classes += ' arabic-text';
    }
    
    return classes.trim();
  };

  return (
    <Component
      className={getEnhancedClassNames()}
      style={getEnhancedStyles()}
      dir={textDirection}
      lang={textDirection === 'rtl' ? 'ar' : 'en'}
      {...props}
    >
      {processedText}
    </Component>
  );
};

/**
 * Predefined components for common use cases
 */
export const EnhancedHeading = ({ level = 1, ...props }) => {
  const HeadingComponent = `h${level}`;
  return <EnhancedText as={HeadingComponent} {...props} />;
};

export const EnhancedParagraph = (props) => (
  <EnhancedText as="p" preserveFormatting={true} {...props} />
);

export const EnhancedLabel = (props) => (
  <EnhancedText as="label" {...props} />
);

export const EnhancedButton = (props) => (
  <EnhancedText as="button" {...props} />
);

export const EnhancedSpan = (props) => (
  <EnhancedText as="span" {...props} />
);

export const EnhancedDiv = (props) => (
  <EnhancedText as="div" preserveFormatting={true} {...props} />
);

/**
 * Hook for enhanced text processing
 */
export const useEnhancedText = () => {
  const { isRTL, currentLanguage } = useLanguage();
  const { t } = useTranslation();

  const formatText = (text, options = {}) => {
    const {
      preserveNumbers = true,
      preserveEmails = true,
      preserveUrls = true
    } = options;

    if (!text || !isRTL) return text;

    let formattedText = text;

    // Preserve numbers in LTR format
    if (preserveNumbers) {
      formattedText = formattedText.replace(
        /\b\d+([.,]\d+)*\b/g,
        (match) => `\u202D${match}\u202C`
      );
    }

    // Preserve emails in LTR format
    if (preserveEmails) {
      formattedText = formattedText.replace(
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
        (match) => `\u202D${match}\u202C`
      );
    }

    // Preserve URLs in LTR format
    if (preserveUrls) {
      formattedText = formattedText.replace(
        /https?:\/\/[^\s]+/g,
        (match) => `\u202D${match}\u202C`
      );
    }

    return formattedText;
  };

  const getTextMetrics = (text) => {
    const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
    const latinChars = (text.match(/[a-zA-Z]/g) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    
    return {
      total: text.length,
      arabicChars,
      latinChars,
      numbers,
      spaces,
      isRTL: arabicChars > latinChars,
      isMixed: arabicChars > 0 && latinChars > 0
    };
  };

  return {
    formatText,
    getTextMetrics,
    isRTL,
    currentLanguage,
    t
  };
};

export default EnhancedText;