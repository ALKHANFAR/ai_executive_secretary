// src/components/__tests__/ScrollToTop.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import '@testing-library/jest-dom';
import ScrollToTop from '../ScrollToTop';

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true
});

// Mock useLocation hook
const mockLocation = {
  pathname: '/test-path',
  search: '',
  hash: '',
  state: null,
  key: 'test-key'
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}));

const useLocationMock = useLocation as jest.MockedFunction<typeof useLocation>;

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    useLocationMock.mockReturnValue(mockLocation);
  });

  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    // Component should render without throwing
    expect(true).toBe(true);
  });

  test('does not render any visible content', () => {
    const { container } = render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('calls scrollTo when location changes', () => {
    const { rerender } = render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    // Initial render should call scrollTo
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    
    // Change location and rerender
    useLocationMock.mockReturnValue({
      ...mockLocation,
      pathname: '/new-path'
    });
    
    rerender(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    // Should call scrollTo again
    expect(mockScrollTo).toHaveBeenCalledTimes(2);
  });

  test('scrolls to top coordinates (0, 0)', () => {
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('works with different location pathnames', () => {
    const paths = ['/home', '/about', '/contact', '/dashboard'];
    
    paths.forEach((path) => {
      useLocationMock.mockReturnValue({
        ...mockLocation,
        pathname: path
      });
      
      render(
        <BrowserRouter>
          <ScrollToTop />
        </BrowserRouter>
      );
    });
    
    expect(mockScrollTo).toHaveBeenCalledTimes(paths.length);
  });

  test('handles location changes with query parameters', () => {
    useLocationMock.mockReturnValue({
      ...mockLocation,
      pathname: '/search',
      search: '?q=test'
    });
    
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('handles location changes with hash fragments', () => {
    useLocationMock.mockReturnValue({
      ...mockLocation,
      pathname: '/page',
      hash: '#section1'
    });
    
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('integrates properly with React Router', () => {
    // Test that useLocation is called
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );
    
    expect(useLocationMock).toHaveBeenCalled();
  });
});

export default ScrollToTop;