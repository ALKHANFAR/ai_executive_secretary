// src/components/ui/__tests__/LoadingSpinner.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner, { OverlaySpinner, Skeleton, ContentLoader } from '../LoadingSpinner';

// Mock the AppIcon component
jest.mock('../../AppIcon', () => {
  return function MockIcon({ name, size, className }) {
    return <div data-testid={`icon-${name}`} className={className}>{name}</div>;
  };
});

describe('LoadingSpinner Component', () => {
  test('renders with default props', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('icon-Loader2')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Loader2')).toHaveClass('animate-spin');
  });

  test('renders with custom icon', () => {
    render(<LoadingSpinner icon="CircleNotch" />);
    expect(screen.getByTestId('icon-CircleNotch')).toBeInTheDocument();
  });

  test('renders with loading text', () => {
    render(<LoadingSpinner text="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('applies different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(screen.getByTestId('icon-Loader2').previousSibling).toHaveAttribute('size', '20');
    
    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByTestId('icon-Loader2').previousSibling).toHaveAttribute('size', '32');
  });

  test('applies different colors', () => {
    const { rerender } = render(<LoadingSpinner color="primary" />);
    expect(screen.getByTestId('icon-Loader2')).toHaveClass('text-primary');
    
    rerender(<LoadingSpinner color="success" />);
    expect(screen.getByTestId('icon-Loader2')).toHaveClass('text-success');
    
    rerender(<LoadingSpinner color="error" />);
    expect(screen.getByTestId('icon-Loader2')).toHaveClass('text-error');
  });

  test('renders with RTL support', () => {
    render(<LoadingSpinner text="Loading..." isRTL={true} />);
    expect(screen.getByTestId('icon-Loader2').parentElement).toHaveClass('flex-row-reverse');
  });

  test('applies translucent background when specified', () => {
    render(<LoadingSpinner translucent={true} />);
    expect(screen.getByTestId('icon-Loader2').parentElement).toHaveClass(
      'bg-black/5', 'dark:bg-white/5', 'rounded-lg', 'p-3'
    );
  });
});

describe('OverlaySpinner Component', () => {
  test('renders when isLoading is true', () => {
    render(<OverlaySpinner isLoading={true} text="Loading Content" />);
    expect(screen.getByText('Loading Content')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Loader2')).toBeInTheDocument();
  });

  test('does not render when isLoading is false', () => {
    render(<OverlaySpinner isLoading={false} text="Loading Content" />);
    expect(screen.queryByText('Loading Content')).not.toBeInTheDocument();
  });

  test('applies backdrop blur when enabled', () => {
    render(<OverlaySpinner isLoading={true} blur={true} />);
    expect(screen.getByTestId('icon-Loader2').parentElement.parentElement).toHaveClass('backdrop-blur-sm');
  });
});

describe('Skeleton Component', () => {
  test('renders with default props', () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole('generic');
    expect(skeleton).toHaveClass('w-full', 'h-16', 'rounded-md', 'animate-pulse');
  });

  test('applies custom width and height', () => {
    render(<Skeleton width="64" height="8" />);
    const skeleton = screen.getByRole('generic');
    expect(skeleton).toHaveClass('w-64', 'h-8');
  });

  test('applies different rounded corners', () => {
    render(<Skeleton rounded="full" />);
    expect(screen.getByRole('generic')).toHaveClass('rounded-full');
  });

  test('applies custom className', () => {
    render(<Skeleton className="my-custom-class" />);
    expect(screen.getByRole('generic')).toHaveClass('my-custom-class');
  });
});

describe('ContentLoader Component', () => {
  test('renders text skeleton by default', () => {
    render(<ContentLoader />);
    const skeletons = screen.getAllByRole('generic');
    expect(skeletons.length).toBe(3); // Default 3 lines
  });

  test('renders card skeleton', () => {
    render(<ContentLoader type="card" />);
    const skeletons = screen.getAllByRole('generic');
    expect(skeletons.length).toBeGreaterThan(1);
    expect(skeletons[0]).toHaveClass('rounded-lg'); // Image placeholder
  });

  test('renders profile skeleton', () => {
    render(<ContentLoader type="profile" />);
    const skeletons = screen.getAllByRole('generic');
    expect(skeletons.length).toBeGreaterThan(1);
    expect(skeletons[0]).toHaveClass('rounded-full'); // Avatar placeholder
  });

  test('renders list skeleton with specified lines', () => {
    render(<ContentLoader type="list" lines={5} />);
    const items = screen.getAllByRole('generic');
    
    // Each list item has multiple skeletons (icon + text)
    const uniqueItems = new Set();
    items.forEach(item => {
      uniqueItems.add(item.parentElement);
    });
    
    expect(uniqueItems.size).toBe(5);
  });

  test('applies custom className', () => {
    render(<ContentLoader className="custom-loader" />);
    expect(screen.getByRole('generic').parentElement).toHaveClass('custom-loader');
  });
});