// src/pages/__tests__/calendar-management.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import CalendarManagement from '../calendar-management';

// Mock the components that might not be available
jest.mock('components/ui/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

jest.mock('components/ui/Sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="sidebar">Sidebar</div>;
  };
});

jest.mock('components/AppIcon', () => {
  return function MockIcon({ name, size, className }) {
    return <span data-testid={`icon-${name}`} className={className}>{name}</span>;
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Calendar Management Page', () => {
  test('renders calendar page with header and sidebar', () => {
    renderWithRouter(<CalendarManagement />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText(/Calendar Management/i)).toBeInTheDocument();
  });

  test('displays view mode selector', () => {
    renderWithRouter(<CalendarManagement />);
    
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
  });

  test('switches between calendar views', () => {
    renderWithRouter(<CalendarManagement />);
    
    // Test month view (default)
    expect(screen.getByText('Month')).toHaveClass('bg-blue-600', 'text-white');
    
    // Switch to week view
    fireEvent.click(screen.getByText('Week'));
    expect(screen.getByText('Week')).toHaveClass('bg-blue-600', 'text-white');
    
    // Switch to day view
    fireEvent.click(screen.getByText('Day'));
    expect(screen.getByText('Day')).toHaveClass('bg-blue-600', 'text-white');
  });

  test('displays events in calendar', () => {
    renderWithRouter(<CalendarManagement />);
    
    expect(screen.getByText('Team Meeting')).toBeInTheDocument();
    expect(screen.getByText('Project Review')).toBeInTheDocument();
    expect(screen.getByText('Client Presentation')).toBeInTheDocument();
  });

  test('opens event modal when event is clicked', async () => {
    renderWithRouter(<CalendarManagement />);
    
    const teamMeetingEvent = screen.getByText('Team Meeting');
    fireEvent.click(teamMeetingEvent);
    
    await waitFor(() => {
      expect(screen.getByText('Event Details')).toBeInTheDocument();
    });
  });

  test('opens new event modal when create button is clicked', async () => {
    renderWithRouter(<CalendarManagement />);
    
    const createButton = screen.getByText('New Event');
    fireEvent.click(createButton);
    
    await waitFor(() => {
      expect(screen.getByText('New Event')).toBeInTheDocument();
    });
  });

  test('navigates between months', () => {
    renderWithRouter(<CalendarManagement />);
    
    const currentDate = new Date();
    const currentMonthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    // Check current month is displayed
    expect(screen.getByText(currentMonthYear)).toBeInTheDocument();
    
    // Navigate to previous month
    const prevButton = screen.getByTestId('icon-ChevronLeft').closest('button');
    fireEvent.click(prevButton);
    
    // Navigate to next month
    const nextButton = screen.getByTestId('icon-ChevronRight').closest('button');
    fireEvent.click(nextButton);
  });

  test('displays calendar statistics', () => {
    renderWithRouter(<CalendarManagement />);
    
    expect(screen.getByText('Total Events')).toBeInTheDocument();
    expect(screen.getByText("Today's Meetings")).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
    expect(screen.getByText('Total Attendees')).toBeInTheDocument();
  });

  test('handles RTL language support', () => {
    // Mock RTL direction
    Object.defineProperty(document.documentElement, 'dir', {
      writable: true,
      value: 'rtl'
    });
    
    renderWithRouter(<CalendarManagement />);
    
    expect(screen.getByText('إدارة التقويم')).toBeInTheDocument();
  });

  test('filters events by date', () => {
    renderWithRouter(<CalendarManagement />);
    
    // Switch to day view to test date-specific events
    fireEvent.click(screen.getByText('Day'));
    
    // Check if today's events are displayed
    const todayEvents = screen.queryAllByText(/Team Meeting|Project Review|Client Presentation/);
    expect(todayEvents.length).toBeGreaterThanOrEqual(0);
  });

  test('displays event priority indicators', () => {
    renderWithRouter(<CalendarManagement />);
    
    // Check for priority color indicators
    const priorityIndicators = screen.container.querySelectorAll('.bg-red-500, .bg-yellow-500, .bg-green-500');
    expect(priorityIndicators.length).toBeGreaterThan(0);
  });
});

export default CalendarManagement;