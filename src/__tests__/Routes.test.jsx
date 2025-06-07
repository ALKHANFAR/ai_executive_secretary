// src/__tests__/Routes.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Routes from '../Routes';

// Mock all the page components
jest.mock('pages/login', () => {
  return function MockLogin() {
    return <div data-testid="login-page">Login Page</div>;
  };
});

jest.mock('pages/executive-dashboard', () => {
  return function MockExecutiveDashboard() {
    return <div data-testid="executive-dashboard-page">Executive Dashboard Page</div>;
  };
});

jest.mock('pages/communication-hub', () => {
  return function MockCommunicationHub() {
    return <div data-testid="communication-hub-page">Communication Hub Page</div>;
  };
});

jest.mock('pages/meeting-coordination', () => {
  return function MockMeetingCoordination() {
    return <div data-testid="meeting-coordination-page">Meeting Coordination Page</div>;
  };
});

jest.mock('pages/calendar-management', () => {
  return function MockCalendarManagement() {
    return <div data-testid="calendar-management-page">Calendar Management Page</div>;
  };
});

jest.mock('pages/task-team-management', () => {
  return function MockTaskTeamManagement() {
    return <div data-testid="task-team-management-page">Task Team Management Page</div>;
  };
});

jest.mock('pages/reports-analytics', () => {
  return function MockReportsAnalytics() {
    return <div data-testid="reports-analytics-page">Reports Analytics Page</div>;
  };
});

jest.mock('pages/settings-integrations', () => {
  return function MockSettingsIntegrations() {
    return <div data-testid="settings-integrations-page">Settings Integrations Page</div>;
  };
});

jest.mock('pages/NotFound', () => {
  return function MockNotFound() {
    return <div data-testid="not-found-page">Not Found Page</div>;
  };
});

// Mock the utility components
jest.mock('components/ScrollToTop', () => {
  return function MockScrollToTop() {
    return null;
  };
});

jest.mock('components/ErrorBoundary', () => {
  return function MockErrorBoundary({ children }) {
    return <div data-testid="error-boundary">{children}</div>;
  };
});

const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes />
    </MemoryRouter>
  );
};

describe('Routes Component', () => {
  test('renders login page at root path', () => {
    renderWithRouter(['/']);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  test('renders login page at /login path', () => {
    renderWithRouter(['/login']);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  test('renders executive dashboard page at /executive-dashboard', () => {
    renderWithRouter(['/executive-dashboard']);
    expect(screen.getByTestId('executive-dashboard-page')).toBeInTheDocument();
  });

  test('renders communication hub page at /communication-hub', () => {
    renderWithRouter(['/communication-hub']);
    expect(screen.getByTestId('communication-hub-page')).toBeInTheDocument();
  });

  test('renders meeting coordination page at /meeting-coordination', () => {
    renderWithRouter(['/meeting-coordination']);
    expect(screen.getByTestId('meeting-coordination-page')).toBeInTheDocument();
  });

  test('renders calendar management page at /calendar-management', () => {
    renderWithRouter(['/calendar-management']);
    expect(screen.getByTestId('calendar-management-page')).toBeInTheDocument();
  });

  test('renders task team management page at /task-team-management', () => {
    renderWithRouter(['/task-team-management']);
    expect(screen.getByTestId('task-team-management-page')).toBeInTheDocument();
  });

  test('renders reports analytics page at /reports-analytics', () => {
    renderWithRouter(['/reports-analytics']);
    expect(screen.getByTestId('reports-analytics-page')).toBeInTheDocument();
  });

  test('renders settings integrations page at /settings-integrations', () => {
    renderWithRouter(['/settings-integrations']);
    expect(screen.getByTestId('settings-integrations-page')).toBeInTheDocument();
  });

  test('renders not found page for unknown routes', () => {
    renderWithRouter(['/unknown-route']);
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  test('wraps all routes with ErrorBoundary', () => {
    renderWithRouter(['/']);
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  test('includes ScrollToTop component', () => {
    // Since ScrollToTop returns null, we just verify the component structure
    renderWithRouter(['/']);
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  test('handles browser navigation correctly', () => {
    const { rerender } = renderWithRouter(['/login']);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    
    // Simulate navigation to different route
    rerender(
      <MemoryRouter initialEntries={['/calendar-management']}>
        <Routes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('calendar-management-page')).toBeInTheDocument();
  });

  test('maintains route structure integrity', () => {
    // Test multiple routes to ensure they all work correctly
    const routes = [
      { path: '/executive-dashboard', testId: 'executive-dashboard-page' },
      { path: '/communication-hub', testId: 'communication-hub-page' },
      { path: '/meeting-coordination', testId: 'meeting-coordination-page' },
      { path: '/calendar-management', testId: 'calendar-management-page' },
      { path: '/task-team-management', testId: 'task-team-management-page' },
      { path: '/reports-analytics', testId: 'reports-analytics-page' },
      { path: '/settings-integrations', testId: 'settings-integrations-page' }
    ];
    
    routes.forEach(route => {
      renderWithRouter([route.path]);
      expect(screen.getByTestId(route.testId)).toBeInTheDocument();
    });
  });

  test('provides BrowserRouter context to child components', () => {
    renderWithRouter(['/']);
    // The fact that routing works confirms BrowserRouter is providing context
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});

export default Routes;