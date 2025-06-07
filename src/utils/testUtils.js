// src/utils/testUtils.js
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';

/**
 * Custom render function for testing components with necessary providers
 * @param {React.ReactElement} ui - The component to render
 * @param {Object} options - Additional options for rendering
 * @returns {Object} Rendered component with utilities
 */
export const renderWithProviders = (ui, options = {}) => {
  const {
    route = '/',
    initialLanguage = 'en',
    ...renderOptions
  } = options;

  // Set initial route
  window.history.pushState({}, 'Test page', route);

  // Create wrapper with all required providers
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <LanguageProvider initialLanguage={initialLanguage}>
          {children}
        </LanguageProvider>
      </BrowserRouter>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * Mock hook to simulate responses for testing purposes
 * @param {Object} mockReturns - The mock returns for the hook
 * @returns {Function} Mock hook function
 */
export const createMockHook = (mockReturns) => {
  return () => mockReturns;
};

/**
 * Helper to mock language context for RTL testing
 * @returns {Object} Mock language context values
 */
export const mockLanguageContextRTL = {
  currentLanguage: 'ar',
  isRTL: true,
  changeLanguage: jest.fn(),
  getLocalizedText: (en, ar) => ar || en,
  formatNumber: (num) => num.toString(),
  formatDate: (date) => date.toString(),
  getTextAlignment: () => 'right',
  getFlexDirection: () => 'row-reverse',
  languages: [
    { code: 'en', name: 'English', direction: 'ltr' },
    { code: 'ar', name: 'Arabic', direction: 'rtl' }
  ],
  getCurrentLanguageObject: () => ({ code: 'ar', name: 'Arabic', direction: 'rtl' })
};

/**
 * Helper to mock language context for LTR testing
 * @returns {Object} Mock language context values
 */
export const mockLanguageContextLTR = {
  currentLanguage: 'en',
  isRTL: false,
  changeLanguage: jest.fn(),
  getLocalizedText: (en, ar) => en || ar,
  formatNumber: (num) => num.toString(),
  formatDate: (date) => date.toString(),
  getTextAlignment: () => 'left',
  getFlexDirection: () => 'row',
  languages: [
    { code: 'en', name: 'English', direction: 'ltr' },
    { code: 'ar', name: 'Arabic', direction: 'rtl' }
  ],
  getCurrentLanguageObject: () => ({ code: 'en', name: 'English', direction: 'ltr' })
};

/**
 * Mock for ResizeObserver when testing components that use it
 */
export class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

/**
 * Helper to setup mocks for DOM elements and browser APIs
 */
export const setupDomMocks = () => {
  // Mock ResizeObserver
  global.ResizeObserver = MockResizeObserver;
  
  // Mock matchMedia
  global.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  });
  
  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
  };
};

/**
 * Helper for testing async components
 * @param {number} ms - Time to wait in milliseconds
 * @returns {Promise} Promise that resolves after specified time
 */
export const waitForTime = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Helper to mock toast notifications for testing
 */
export const mockToast = {
  toasts: [],
  addToast: jest.fn(),
  removeToast: jest.fn(),
  removeAllToasts: jest.fn(),
  updateToast: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  info: jest.fn()
};

/**
 * Mock fetch function for testing API calls
 * @param {Object} data - The data to return in the response
 * @param {Object} options - Additional options for the mock
 * @returns {Function} Mock fetch function
 */
export const mockFetch = (data, options = {}) => {
  const {
    status = 200,
    headers = { 'Content-Type': 'application/json' },
    delay = 0
  } = options;

  return jest.fn().mockImplementation(() =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: status >= 200 && status < 300,
          status,
          headers: new Headers(headers),
          json: () => Promise.resolve(data)
        });
      }, delay);
    })
  );
};

/**
 * Helper to create a mock error response for fetch
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @returns {Function} Mock fetch function that rejects
 */
export const mockFetchError = (status = 500, message = 'Internal Server Error') => {
  return jest.fn().mockImplementation(() =>
    Promise.reject({
      status,
      message
    })
  );
};