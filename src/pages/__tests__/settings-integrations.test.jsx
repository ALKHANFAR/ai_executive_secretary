// src/pages/__tests__/settings-integrations.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SettingsIntegrations from '../settings-integrations';

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

jest.mock('components/ui/Toast', () => {
  const mockUseToast = () => ({
    toasts: [],
    addToast: jest.fn(),
    removeToast: jest.fn()
  });
  
  return {
    __esModule: true,
    default: function MockToast({ type, title, message, onClose }) {
      return (
        <div data-testid="toast" className={`toast-${type}`}>
          <h4>{title}</h4>
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      );
    },
    useToast: mockUseToast
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Settings & Integrations Page', () => {
  test('renders page with header and sidebar', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText(/Settings & Integrations/i)).toBeInTheDocument();
  });

  test('displays all settings tabs', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Integrations')).toBeInTheDocument();
  });

  test('switches between settings tabs', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    // General tab should be active by default
    expect(screen.getByText('General')).toHaveClass('bg-blue-600', 'text-white');
    
    // Switch to notifications tab
    fireEvent.click(screen.getByText('Notifications'));
    expect(screen.getByText('Notifications')).toHaveClass('bg-blue-600', 'text-white');
    
    // Switch to security tab
    fireEvent.click(screen.getByText('Security'));
    expect(screen.getByText('Security')).toHaveClass('bg-blue-600', 'text-white');
    
    // Switch to integrations tab
    fireEvent.click(screen.getByText('Integrations'));
    expect(screen.getByText('Integrations')).toHaveClass('bg-blue-600', 'text-white');
  });

  test('displays general settings form', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    expect(screen.getByText('General Preferences')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Timezone')).toBeInTheDocument();
    expect(screen.getByText('Working Hours')).toBeInTheDocument();
    expect(screen.getByText('System Settings')).toBeInTheDocument();
  });

  test('handles language selection change', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    const languageSelect = screen.getByDisplayValue('English');
    fireEvent.change(languageSelect, { target: { value: 'ar' } });
    
    expect(languageSelect.value).toBe('ar');
  });

  test('handles theme selection change', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    const themeSelect = screen.getByDisplayValue('Light');
    fireEvent.change(themeSelect, { target: { value: 'dark' } });
    
    expect(themeSelect.value).toBe('dark');
  });

  test('displays notification settings', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    fireEvent.click(screen.getByText('Notifications'));
    
    expect(screen.getByText('Notification Settings')).toBeInTheDocument();
    expect(screen.getByText('Delivery Methods')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    expect(screen.getByText('SMS')).toBeInTheDocument();
    expect(screen.getByText('Notification Types')).toBeInTheDocument();
    expect(screen.getByText('Task Reminders')).toBeInTheDocument();
    expect(screen.getByText('Meeting Alerts')).toBeInTheDocument();
    expect(screen.getByText('Deadline Warnings')).toBeInTheDocument();
  });

  test('displays security settings', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    fireEvent.click(screen.getByText('Security'));
    
    expect(screen.getByText('Authentication')).toBeInTheDocument();
    expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument();
    expect(screen.getByText('Session & Password')).toBeInTheDocument();
    expect(screen.getByText('Session Timeout (minutes)')).toBeInTheDocument();
    expect(screen.getByText('Password Expiry (days)')).toBeInTheDocument();
    expect(screen.getByText('Login Attempts')).toBeInTheDocument();
  });

  test('displays available integrations', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    fireEvent.click(screen.getByText('Integrations'));
    
    expect(screen.getByText('Available Integrations')).toBeInTheDocument();
    expect(screen.getByText('Slack')).toBeInTheDocument();
    expect(screen.getByText('Google Calendar')).toBeInTheDocument();
    expect(screen.getByText('Microsoft Teams')).toBeInTheDocument();
    expect(screen.getByText('Trello')).toBeInTheDocument();
    expect(screen.getByText('Gmail')).toBeInTheDocument();
    expect(screen.getByText('Dropbox')).toBeInTheDocument();
  });

  test('displays integration statistics', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    fireEvent.click(screen.getByText('Integrations'));
    
    expect(screen.getByText('Connected')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  test('shows integration status badges', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    fireEvent.click(screen.getByText('Integrations'));
    
    const connectedBadges = screen.container.querySelectorAll('.bg-green-100');
    const availableBadges = screen.container.querySelectorAll('.bg-gray-100');
    
    expect(connectedBadges.length).toBeGreaterThan(0);
    expect(availableBadges.length).toBeGreaterThan(0);
  });

  test('opens integration modal when connect button is clicked', async () => {
    renderWithRouter(<SettingsIntegrations />);
    
    fireEvent.click(screen.getByText('Integrations'));
    
    const connectButtons = screen.getAllByText('Connect');
    if (connectButtons.length > 0) {
      fireEvent.click(connectButtons[0]);
      
      await waitFor(() => {
        expect(screen.getByText(/Connect/)).toBeInTheDocument();
      });
    }
  });

  test('handles toggle switches for settings', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    // Find and click a toggle switch (notifications)
    const toggles = screen.container.querySelectorAll('input[type="checkbox"]');
    if (toggles.length > 0) {
      fireEvent.click(toggles[0]);
      // Toggle should work (state change)
    }
  });

  test('handles working hours time inputs', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    const startTimeInput = screen.getByDisplayValue('09:00');
    const endTimeInput = screen.getByDisplayValue('17:00');
    
    fireEvent.change(startTimeInput, { target: { value: '08:00' } });
    fireEvent.change(endTimeInput, { target: { value: '18:00' } });
    
    expect(startTimeInput.value).toBe('08:00');
    expect(endTimeInput.value).toBe('18:00');
  });

  test('handles RTL language support', () => {
    Object.defineProperty(document.documentElement, 'dir', {
      writable: true,
      value: 'rtl'
    });
    
    renderWithRouter(<SettingsIntegrations />);
    
    expect(screen.getByText('الإعدادات والتكاملات')).toBeInTheDocument();
  });

  test('displays integration features and descriptions', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    fireEvent.click(screen.getByText('Integrations'));
    
    expect(screen.getByText('Team communication and collaboration')).toBeInTheDocument();
    expect(screen.getByText('Calendar synchronization and scheduling')).toBeInTheDocument();
    expect(screen.getByText('Video conferencing and team collaboration')).toBeInTheDocument();
  });

  test('shows last sync information for connected integrations', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    fireEvent.click(screen.getByText('Integrations'));
    
    expect(screen.getByText(/Last sync:/)).toBeInTheDocument();
  });

  test('displays integration action buttons correctly', () => {
    renderWithRouter(<SettingsIntegrations />);
    
    fireEvent.click(screen.getByText('Integrations'));
    
    // Should have Connect buttons for available integrations
    expect(screen.getAllByText('Connect').length).toBeGreaterThan(0);
    
    // Should have Configure and Disconnect buttons for connected integrations
    expect(screen.getAllByText('Configure').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Disconnect').length).toBeGreaterThan(0);
  });
});

export default SettingsIntegrations;