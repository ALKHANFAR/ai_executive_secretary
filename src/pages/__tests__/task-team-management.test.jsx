// src/pages/__tests__/task-team-management.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import TaskTeamManagement from '../task-team-management';

// Mock the components
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

jest.mock('components/ui/ProgressBar', () => {
  return function MockProgressBar({ progress, className }) {
    return <div data-testid="progress-bar" className={className}>{progress}%</div>;
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Task & Team Management Page', () => {
  test('renders page with header and sidebar', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText(/Task & Team Management/i)).toBeInTheDocument();
  });

  test('displays task and team tabs', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
  });

  test('switches between tasks and team tabs', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    // Tasks tab should be active by default
    expect(screen.getByText('Tasks')).toHaveClass('bg-blue-600', 'text-white');
    
    // Switch to team tab
    fireEvent.click(screen.getByText('Team'));
    expect(screen.getByText('Team')).toHaveClass('bg-blue-600', 'text-white');
    
    // Switch back to tasks tab
    fireEvent.click(screen.getByText('Tasks'));
    expect(screen.getByText('Tasks')).toHaveClass('bg-blue-600', 'text-white');
  });

  test('displays task statistics in tasks tab', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });

  test('displays task list with progress bars', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    expect(screen.getByText('Website Redesign')).toBeInTheDocument();
    expect(screen.getByText('API Integration')).toBeInTheDocument();
    expect(screen.getByText('Security Audit')).toBeInTheDocument();
    
    // Check for progress bars
    const progressBars = screen.getAllByTestId('progress-bar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  test('opens task details modal when task is clicked', async () => {
    renderWithRouter(<TaskTeamManagement />);
    
    const websiteTask = screen.getByText('Website Redesign');
    fireEvent.click(websiteTask);
    
    await waitFor(() => {
      expect(screen.getByText('Task Details')).toBeInTheDocument();
    });
  });

  test('displays team members in team tab', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    // Switch to team tab
    fireEvent.click(screen.getByText('Team'));
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Sarah Smith')).toBeInTheDocument();
    expect(screen.getByText('Mike Johnson')).toBeInTheDocument();
    expect(screen.getByText('Lisa Chen')).toBeInTheDocument();
  });

  test('displays team statistics in team tab', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    // Switch to team tab
    fireEvent.click(screen.getByText('Team'));
    
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Avg Efficiency')).toBeInTheDocument();
    expect(screen.getByText('Tasks Completed')).toBeInTheDocument();
  });

  test('opens team member details modal when member is clicked', async () => {
    renderWithRouter(<TaskTeamManagement />);
    
    // Switch to team tab
    fireEvent.click(screen.getByText('Team'));
    
    const johnDoe = screen.getByText('John Doe');
    fireEvent.click(johnDoe);
    
    await waitFor(() => {
      expect(screen.getByText('Member Details')).toBeInTheDocument();
    });
  });

  test('displays task status badges', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    const statusBadges = screen.container.querySelectorAll('.bg-green-100, .bg-blue-100, .bg-yellow-100');
    expect(statusBadges.length).toBeGreaterThan(0);
  });

  test('displays priority indicators', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    const priorityIndicators = screen.container.querySelectorAll('.bg-red-500, .bg-yellow-500, .bg-green-500');
    expect(priorityIndicators.length).toBeGreaterThan(0);
  });

  test('displays member status indicators', () => {
    renderWithRouter(<TaskTeamManagement />);
    
    // Switch to team tab
    fireEvent.click(screen.getByText('Team'));
    
    const statusIndicators = screen.container.querySelectorAll('.bg-green-500, .bg-yellow-500, .bg-gray-500');
    expect(statusIndicators.length).toBeGreaterThan(0);
  });

  test('handles RTL language support', () => {
    Object.defineProperty(document.documentElement, 'dir', {
      writable: true,
      value: 'rtl'
    });
    
    renderWithRouter(<TaskTeamManagement />);
    
    expect(screen.getByText('إدارة المهام والفريق')).toBeInTheDocument();
  });

  test('opens new task modal when create button is clicked', async () => {
    renderWithRouter(<TaskTeamManagement />);
    
    const createButton = screen.getByText('New Task');
    fireEvent.click(createButton);
    
    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('opens add member modal when add button is clicked', async () => {
    renderWithRouter(<TaskTeamManagement />);
    
    // Switch to team tab
    fireEvent.click(screen.getByText('Team'));
    
    const addButton = screen.getByText('Add Member');
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('Add New Member')).toBeInTheDocument();
    });
  });
});

export default TaskTeamManagement;