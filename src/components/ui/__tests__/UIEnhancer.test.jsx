// src/components/ui/__tests__/UIEnhancer.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UIEnhancer, { EnhancedCard, EnhancedBanner, EnhancedBadge, EnhancedAvatar } from '../UIEnhancer';

// Mock the language context
jest.mock('../../../context/LanguageContext', () => ({
  useLanguage: () => ({
    isRTL: false,
    currentLanguage: 'en'
  })
}));

// Mock the EnhancedText component
jest.mock('../EnhancedText', () => {
  return function MockEnhancedText({ children, as: Component = 'span', className }) {
    return <Component className={className}>{children}</Component>;
  };
});

// Mock the AppIcon component
jest.mock('../../AppIcon', () => {
  return function MockIcon({ name, size }) {
    return <span data-testid={`icon-${name}`}>{name}</span>;
  };
});

describe('UIEnhancer Component', () => {
  test('renders with default props', () => {
    render(<UIEnhancer>Content</UIEnhancer>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('applies correct color schemes', () => {
    const { rerender } = render(<UIEnhancer colorScheme="primary">Primary</UIEnhancer>);
    expect(screen.getByText('Primary').parentElement).toHaveClass('bg-primary-50');
    
    rerender(<UIEnhancer colorScheme="success">Success</UIEnhancer>);
    expect(screen.getByText('Success').parentElement).toHaveClass('bg-success-50');
    
    rerender(<UIEnhancer colorScheme="error">Error</UIEnhancer>);
    expect(screen.getByText('Error').parentElement).toHaveClass('bg-error-50');
  });

  test('applies elevation when elevate prop is true', () => {
    render(<UIEnhancer elevate>Elevated</UIEnhancer>);
    expect(screen.getByText('Elevated').parentElement).toHaveClass('shadow-md');
  });

  test('applies border when bordered prop is true', () => {
    render(<UIEnhancer bordered>Bordered</UIEnhancer>);
    expect(screen.getByText('Bordered').parentElement).toHaveClass('border');
  });

  test('applies gradient when gradient prop is true', () => {
    render(<UIEnhancer gradient>Gradient</UIEnhancer>);
    expect(screen.getByText('Gradient').parentElement).toHaveClass('bg-gradient-to-br');
  });

  test('applies animation classes when animation prop is provided', () => {
    render(<UIEnhancer animation="pulse">Animated</UIEnhancer>);
    expect(screen.getByText('Animated').parentElement).toHaveClass('animate-pulse');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<UIEnhancer onClick={handleClick}>Clickable</UIEnhancer>);
    
    fireEvent.click(screen.getByText('Clickable').parentElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('EnhancedCard Component', () => {
  test('renders with title and content', () => {
    render(
      <EnhancedCard title="Card Title">
        <p>Card content</p>
      </EnhancedCard>
    );
    
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders with icon', () => {
    render(
      <EnhancedCard title="Card with Icon" icon="Star">
        <p>Content</p>
      </EnhancedCard>
    );
    
    expect(screen.getByTestId('icon-Star')).toBeInTheDocument();
  });

  test('renders with action button', () => {
    const action = <button>Action</button>;
    render(
      <EnhancedCard title="Card with Action" action={action}>
        <p>Content</p>
      </EnhancedCard>
    );
    
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});

describe('EnhancedBanner Component', () => {
  test('renders with title and message', () => {
    render(
      <EnhancedBanner 
        type="info"
        title="Info Banner"
        message="This is an information banner"
      />
    );
    
    expect(screen.getByText('Info Banner')).toBeInTheDocument();
    expect(screen.getByText('This is an information banner')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Info')).toBeInTheDocument();
  });

  test('renders different banner types with correct styling', () => {
    const { rerender } = render(
      <EnhancedBanner type="success" title="Success" message="Operation successful" />
    );
    expect(screen.getByTestId('icon-CheckCircle')).toBeInTheDocument();
    
    rerender(
      <EnhancedBanner type="warning" title="Warning" message="Be careful" />
    );
    expect(screen.getByTestId('icon-AlertTriangle')).toBeInTheDocument();
    
    rerender(
      <EnhancedBanner type="error" title="Error" message="Something went wrong" />
    );
    expect(screen.getByTestId('icon-AlertCircle')).toBeInTheDocument();
  });

  test('handles close button click', () => {
    const handleClose = jest.fn();
    render(
      <EnhancedBanner 
        title="Closable Banner"
        message="This banner can be closed"
        onClose={handleClose}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

describe('EnhancedBadge Component', () => {
  test('renders with default props', () => {
    render(<EnhancedBadge>Badge</EnhancedBadge>);
    expect(screen.getByText('Badge')).toBeInTheDocument();
    expect(screen.getByText('Badge')).toHaveClass('bg-gray-100');
  });

  test('renders different badge types with correct styling', () => {
    const { rerender } = render(<EnhancedBadge type="primary">Primary</EnhancedBadge>);
    expect(screen.getByText('Primary')).toHaveClass('bg-primary-100');
    
    rerender(<EnhancedBadge type="success">Success</EnhancedBadge>);
    expect(screen.getByText('Success')).toHaveClass('bg-success-100');
    
    rerender(<EnhancedBadge type="error">Error</EnhancedBadge>);
    expect(screen.getByText('Error')).toHaveClass('bg-error-100');
  });

  test('renders pill-shaped badge', () => {
    render(<EnhancedBadge pill>Pill</EnhancedBadge>);
    expect(screen.getByText('Pill')).toHaveClass('rounded-full');
  });

  test('renders badge with dot indicator', () => {
    render(<EnhancedBadge withDot>With Dot</EnhancedBadge>);
    const badge = screen.getByText('With Dot');
    expect(badge.firstChild).toHaveClass('w-1.5', 'h-1.5', 'rounded-full');
  });
});

describe('EnhancedAvatar Component', () => {
  test('renders with image', () => {
    render(<EnhancedAvatar src="/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/avatar.jpg');
  });

  test('renders with initials when no image is provided', () => {
    render(<EnhancedAvatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<EnhancedAvatar size="sm" name="Jane" />);
    expect(screen.getByText('J').parentElement).toHaveClass('w-8', 'h-8');
    
    rerender(<EnhancedAvatar size="lg" name="Jane" />);
    expect(screen.getByText('J').parentElement).toHaveClass('w-12', 'h-12');
  });

  test('renders with different shapes', () => {
    const { rerender } = render(<EnhancedAvatar shape="circle" name="Alex" />);
    expect(screen.getByText('A').parentElement).toHaveClass('rounded-full');
    
    rerender(<EnhancedAvatar shape="square" name="Alex" />);
    expect(screen.getByText('A').parentElement).toHaveClass('rounded-md');
  });

  test('renders with status indicator', () => {
    render(<EnhancedAvatar name="User" status="online" />);
    const avatar = screen.getByText('U').parentElement.parentElement;
    const statusIndicator = avatar.querySelector('[aria-label="online"]');
    expect(statusIndicator).toBeInTheDocument();
    expect(statusIndicator).toHaveClass('bg-success-500');
  });
});