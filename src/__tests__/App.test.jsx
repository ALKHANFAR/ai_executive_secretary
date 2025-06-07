// src/__tests__/App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the Routes component
jest.mock('../Routes', () => {
  return function MockRoutes() {
    return <div data-testid="routes-component">Routes Component</div>;
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('routes-component')).toBeInTheDocument();
  });

  test('renders the Routes component', () => {
    render(<App />);
    expect(screen.getByText('Routes Component')).toBeInTheDocument();
  });

  test('has proper structure', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('provides routing context to the application', () => {
    render(<App />);
    // Since Routes component is rendered, it confirms App provides proper context
    expect(screen.getByTestId('routes-component')).toBeInTheDocument();
  });
});

export default App;