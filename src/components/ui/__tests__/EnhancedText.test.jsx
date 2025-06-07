// src/components/ui/__tests__/EnhancedText.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EnhancedText, { EnhancedHeading, EnhancedParagraph } from '../EnhancedText';
import { mockLanguageContextLTR, mockLanguageContextRTL } from '../../../utils/testUtils';

// Mock the language context
jest.mock('../../../context/LanguageContext', () => ({
  useLanguage: () => mockLanguageContextLTR
}));

// Mock the translation hook
jest.mock('../../../hooks/useTranslation', () => ({
  __esModule: true,
  default: () => ({
    t: (key, params) => key
  })
}));

describe('EnhancedText Component', () => {
  test('renders text content correctly', () => {
    render(<EnhancedText>Hello World</EnhancedText>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('renders with different HTML elements using as prop', () => {
    const { rerender } = render(<EnhancedText as="h1">Heading</EnhancedText>);
    expect(screen.getByText('Heading').tagName).toBe('H1');
    
    rerender(<EnhancedText as="p">Paragraph</EnhancedText>);
    expect(screen.getByText('Paragraph').tagName).toBe('P');
    
    rerender(<EnhancedText as="button">Button</EnhancedText>);
    expect(screen.getByText('Button').tagName).toBe('BUTTON');
  });

  test('applies custom className', () => {
    render(<EnhancedText className="custom-class">Text with Class</EnhancedText>);
    expect(screen.getByText('Text with Class')).toHaveClass('custom-class');
  });

  test('applies custom inline styles', () => {
    render(
      <EnhancedText style={{ color: 'red', fontWeight: 'bold' }}>
        Text with Style
      </EnhancedText>
    );
    const element = screen.getByText('Text with Style');
    expect(element).toHaveStyle('color: red');
    expect(element).toHaveStyle('font-weight: bold');
  });

  test('applies dir attribute based on text content', () => {
    const { rerender } = render(<EnhancedText>English text</EnhancedText>);
    expect(screen.getByText('English text')).toHaveAttribute('dir', 'ltr');
    
    // Mock Arabic text detection
    const containsArabic = jest.spyOn(String.prototype, 'match');
    containsArabic.mockImplementation((regex) => {
      if (regex.toString().includes('\u0600-\u06FF')) {
        return ['مرحبا']; // Mock Arabic character match
      }
      return null;
    });
    
    rerender(<EnhancedText>مرحبا</EnhancedText>);
    expect(screen.getByText('مرحبا')).toHaveAttribute('dir', 'rtl');
    
    containsArabic.mockRestore();
  });
});

describe('EnhancedText with RTL context', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('../../../context/LanguageContext', () => ({
      useLanguage: () => mockLanguageContextRTL
    }));
  });

  test('applies RTL-specific styles', () => {
    render(<EnhancedText>RTL Text</EnhancedText>);
    const element = screen.getByText('RTL Text');
    expect(element).toHaveStyle('direction: rtl');
    expect(element).toHaveStyle('text-align: right');
  });
});

describe('Predefined Enhanced Text Components', () => {
  test('EnhancedHeading renders with correct heading level', () => {
    const { rerender } = render(<EnhancedHeading level={1}>H1 Heading</EnhancedHeading>);
    expect(screen.getByText('H1 Heading').tagName).toBe('H1');
    
    rerender(<EnhancedHeading level={2}>H2 Heading</EnhancedHeading>);
    expect(screen.getByText('H2 Heading').tagName).toBe('H2');
    
    rerender(<EnhancedHeading level={3}>H3 Heading</EnhancedHeading>);
    expect(screen.getByText('H3 Heading').tagName).toBe('H3');
  });

  test('EnhancedParagraph renders as paragraph with preserveFormatting', () => {
    render(<EnhancedParagraph>Paragraph Text</EnhancedParagraph>);
    const element = screen.getByText('Paragraph Text');
    expect(element.tagName).toBe('P');
  });
});

describe('EnhancedText with Translation Key', () => {
  test('uses translation key if provided', () => {
    render(<EnhancedText translationKey="greeting.welcome">Fallback Text</EnhancedText>);
    expect(screen.getByText('greeting.welcome')).toBeInTheDocument();
  });

  test('uses fallback if no translation key or children', () => {
    render(<EnhancedText fallback="Fallback Content" />);
    expect(screen.getByText('Fallback Content')).toBeInTheDocument();
  });
});