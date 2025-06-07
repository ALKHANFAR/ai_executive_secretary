// src/utils/__tests__/testUtils.test.js
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders, createMockHook, mockLanguageContextRTL, mockFetch, mockFetchError, waitForTime } from '../testUtils';

describe('Test Utilities', () => {
  describe('renderWithProviders', () => {
    test('renders component with all required providers', () => {
      const TestComponent = () => <div>Test Component</div>;
      renderWithProviders(<TestComponent />);
      
      expect(screen.getByText('Test Component')).toBeInTheDocument();
    });

    test('sets custom route when provided', () => {
      const TestComponent = () => <div>Custom Route Test</div>;
      renderWithProviders(<TestComponent />, { route: '/custom-route' });
      
      expect(window.location.pathname).toBe('/custom-route');
    });
  });

  describe('createMockHook', () => {
    test('returns a function that returns the provided mock values', () => {
      const mockValues = { data: 'test data', loading: false, error: null };
      const mockHook = createMockHook(mockValues);
      
      expect(typeof mockHook).toBe('function');
      expect(mockHook()).toEqual(mockValues);
    });
  });

  describe('mockLanguageContext', () => {
    test('RTL context has correct values', () => {
      expect(mockLanguageContextRTL.isRTL).toBe(true);
      expect(mockLanguageContextRTL.currentLanguage).toBe('ar');
      expect(mockLanguageContextRTL.getTextAlignment()).toBe('right');
      expect(mockLanguageContextRTL.getFlexDirection()).toBe('row-reverse');
    });

    test('LTR context has correct values', () => {
      expect(mockLanguageContextLTL.isRTL).toBe(false);
      expect(mockLanguageContextLTL.currentLanguage).toBe('en');
      expect(mockLanguageContextLTL.getTextAlignment()).toBe('left');
      expect(mockLanguageContextLTL.getFlexDirection()).toBe('row');
    });
  });

  describe('mockFetch', () => {
    test('returns a mock fetch function that resolves with provided data', async () => {
      const mockData = { id: 1, name: 'Test' };
      const fetchMock = mockFetch(mockData);
      
      const response = await fetchMock();
      expect(response.ok).toBe(true);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data).toEqual(mockData);
    });

    test('supports custom status codes', async () => {
      const fetchMock = mockFetch({ message: 'Created' }, { status: 201 });
      
      const response = await fetchMock();
      expect(response.ok).toBe(true);
      expect(response.status).toBe(201);
    });
  });

  describe('mockFetchError', () => {
    test('returns a mock fetch function that rejects with error', async () => {
      const fetchMock = mockFetchError(404, 'Not Found');
      
      await expect(fetchMock()).rejects.toEqual({
        status: 404,
        message: 'Not Found'
      });
    });
  });

  describe('waitForTime', () => {
    test('resolves after specified time', async () => {
      const startTime = Date.now();
      await waitForTime(100);
      const endTime = Date.now();
      
      const elapsed = endTime - startTime;
      expect(elapsed).toBeGreaterThanOrEqual(90); // Allow small timing variations
    });
  });
});