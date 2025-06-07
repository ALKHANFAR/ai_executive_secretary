// src/pages/__tests__/reports-analytics.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ReportsAnalytics from '../reports-analytics';

// Mock recharts
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  AreaChart: ({ children }) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />
}));

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

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Reports & Analytics Page', () => {
  test('renders page with header and sidebar', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText(/Reports & Analytics/i)).toBeInTheDocument();
  });

  test('displays tab navigation', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Trends')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  test('switches between tabs', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    // Overview tab should be active by default
    expect(screen.getByText('Overview')).toHaveClass('bg-blue-600', 'text-white');
    
    // Switch to trends tab
    fireEvent.click(screen.getByText('Trends'));
    expect(screen.getByText('Trends')).toHaveClass('bg-blue-600', 'text-white');
    
    // Switch to reports tab
    fireEvent.click(screen.getByText('Reports'));
    expect(screen.getByText('Reports')).toHaveClass('bg-blue-600', 'text-white');
  });

  test('displays KPI cards in overview tab', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    expect(screen.getByText('Task Completion Rate')).toBeInTheDocument();
    expect(screen.getByText('Team Efficiency')).toBeInTheDocument();
    expect(screen.getByText('Meeting Productivity')).toBeInTheDocument();
    expect(screen.getByText('On-Time Delivery')).toBeInTheDocument();
    
    expect(screen.getByText('94.5%')).toBeInTheDocument();
    expect(screen.getByText('89.8%')).toBeInTheDocument();
    expect(screen.getByText('87.3%')).toBeInTheDocument();
    expect(screen.getByText('91.7%')).toBeInTheDocument();
  });

  test('displays charts in overview tab', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    expect(screen.getByText('Daily Productivity')).toBeInTheDocument();
    expect(screen.getByText('Task Distribution')).toBeInTheDocument();
    expect(screen.getByText('Team Performance by Department')).toBeInTheDocument();
    
    expect(screen.getAllByTestId('responsive-container')).toHaveLength(3);
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  test('displays trend analysis in trends tab', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    fireEvent.click(screen.getByText('Trends'));
    
    expect(screen.getByText('Monthly Trends')).toBeInTheDocument();
    expect(screen.getByText('Task Growth')).toBeInTheDocument();
    expect(screen.getByText('Team Efficiency')).toBeInTheDocument();
    expect(screen.getByText('Time Saved')).toBeInTheDocument();
    
    expect(screen.getByText('+23.5%')).toBeInTheDocument();
    expect(screen.getByText('89.8%')).toBeInTheDocument();
    expect(screen.getByText('124h')).toBeInTheDocument();
  });

  test('displays recent reports in reports tab', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    fireEvent.click(screen.getByText('Reports'));
    
    expect(screen.getByText('Generate Custom Report')).toBeInTheDocument();
    expect(screen.getByText('Recent Reports')).toBeInTheDocument();
    expect(screen.getByText('Weekly Productivity Report')).toBeInTheDocument();
    expect(screen.getByText('Team Performance Analysis')).toBeInTheDocument();
    expect(screen.getByText('Monthly Executive Summary')).toBeInTheDocument();
  });

  test('opens report generation modal', async () => {
    renderWithRouter(<ReportsAnalytics />);
    
    fireEvent.click(screen.getByText('Reports'));
    
    const generateButton = screen.getByText('Generate Report');
    fireEvent.click(generateButton);
    
    await waitFor(() => {
      expect(screen.getByText('Generate New Report')).toBeInTheDocument();
    });
  });

  test('handles date range selection in trends tab', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    fireEvent.click(screen.getByText('Trends'));
    
    const dateRangeSelect = screen.getByDisplayValue('6 Months');
    fireEvent.change(dateRangeSelect, { target: { value: '1year' } });
    
    expect(dateRangeSelect.value).toBe('1year');
  });

  test('displays trend icons and colors correctly', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    const trendUpIcons = screen.getAllByTestId('icon-TrendingUp');
    const trendDownIcons = screen.getAllByTestId('icon-TrendingDown');
    
    expect(trendUpIcons.length).toBeGreaterThan(0);
    expect(trendDownIcons.length).toBeGreaterThan(0);
  });

  test('handles RTL language support', () => {
    Object.defineProperty(document.documentElement, 'dir', {
      writable: true,
      value: 'rtl'
    });
    
    renderWithRouter(<ReportsAnalytics />);
    
    expect(screen.getByText('التقارير والتحليلات')).toBeInTheDocument();
  });

  test('displays export functionality', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    expect(screen.getByText('Export')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Download')).toBeInTheDocument();
  });

  test('displays refresh data functionality', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    expect(screen.getByText('Refresh Data')).toBeInTheDocument();
    expect(screen.getByTestId('icon-RefreshCw')).toBeInTheDocument();
  });

  test('displays report status indicators', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    fireEvent.click(screen.getByText('Reports'));
    
    expect(screen.getByText('Ready')).toBeInTheDocument();
    expect(screen.getByText('Generating')).toBeInTheDocument();
  });

  test('shows different chart time periods', () => {
    renderWithRouter(<ReportsAnalytics />);
    
    expect(screen.getByText('Last 7 days')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Trends'));
    
    const lineChart = screen.getByTestId('line-chart');
    expect(lineChart).toBeInTheDocument();
  });
});

export default ReportsAnalytics;