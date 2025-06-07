// src/utils/__tests__/testHelpers.js
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Custom render function that includes Router context
 * @param {React.Component} ui - Component to render
 * @param {Object} options - Additional options
 * @returns {Object} - Render result
 */
export const renderWithRouter = (ui, options = {}) => {
  const { initialEntries = ['/'], ...renderOptions } = options;
  
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * Custom render function that includes multiple providers
 * @param {React.Component} ui - Component to render
 * @param {Object} options - Additional options
 * @returns {Object} - Render result
 */
export const renderWithProviders = (ui, options = {}) => {
  const { initialEntries = ['/'], ...renderOptions } = options;
  
  const AllTheProviders = ({ children }) => {
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    );
  };
  
  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

/**
 * Mock implementation for common components
 */
export const mockComponents = {
  Header: () => <div data-testid="header">Header</div>,
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
  Modal: ({ isOpen, children, title, onClose }) => 
    isOpen ? (
      <div data-testid="modal" role="dialog">
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
  Button: ({ children, onClick, variant, size, disabled, className }) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn ${variant} ${size} ${className}`}
      data-testid="button"
    >
      {children}
    </button>
  ),
  Icon: ({ name, size, className }) => (
    <span data-testid={`icon-${name}`} className={className}>
      {name}
    </span>
  ),
  ProgressBar: ({ progress, className }) => (
    <div data-testid="progress-bar" className={className}>
      {progress}%
    </div>
  ),
  Toast: ({ type, title, message, onClose }) => (
    <div data-testid="toast" className={`toast-${type}`}>
      <h4>{title}</h4>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  )
};

/**
 * Mock data generators
 */
export const mockData = {
  events: [
    {
      id: 1,
      title: 'Test Meeting',
      date: new Date(),
      time: '10:00',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Project Review',
      date: new Date(),
      time: '14:00',
      priority: 'medium'
    }
  ],
  tasks: [
    {
      id: 1,
      title: 'Test Task',
      status: 'in-progress',
      priority: 'high',
      progress: 75
    },
    {
      id: 2,
      title: 'Another Task',
      status: 'completed',
      priority: 'low',
      progress: 100
    }
  ],
  teamMembers: [
    {
      id: 1,
      name: 'John Doe',
      role: 'Developer',
      status: 'active',
      efficiency: 95
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Designer',
      status: 'busy',
      efficiency: 88
    }
  ]
};

/**
 * Test utilities
 */
export const testUtils = {
  /**
   * Wait for element to appear with timeout
   */
  waitForElement: async (getElement, timeout = 5000) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      try {
        const element = getElement();
        if (element) return element;
      } catch (error) {
        // Element not found, continue waiting
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Element not found within ${timeout}ms`);
  },
  
  /**
   * Mock async operation
   */
  mockAsyncOperation: (result, delay = 100) => {
    return new Promise(resolve => {
      setTimeout(() => resolve(result), delay);
    });
  },
  
  /**
   * Generate test ID selector
   */
  testId: (id) => `[data-testid="${id}"]`,
  
  /**
   * Mock event object
   */
  mockEvent: (overrides = {}) => ({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    target: { value: '' },
    ...overrides
  })
};

export default {
  renderWithRouter,
  renderWithProviders,
  mockComponents,
  mockData,
  testUtils
};