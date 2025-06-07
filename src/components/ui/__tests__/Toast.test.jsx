// src/components/ui/__tests__/Toast.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast, { useToast } from '../Toast';

describe('Toast Component', () => {
  test('renders toast with title and message', () => {
    render(
      <Toast
        type="success"
        title="Success"
        message="Operation completed successfully"
        onClose={() => {}}
      />
    );
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
  });

  test('renders different toast types with correct styling', () => {
    const { rerender } = render(
      <Toast type="success" title="Success" message="Test" onClose={() => {}} />
    );
    
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50', 'border-green-200');
    
    rerender(
      <Toast type="error" title="Error" message="Test" onClose={() => {}} />
    );
    
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50', 'border-red-200');
    
    rerender(
      <Toast type="warning" title="Warning" message="Test" onClose={() => {}} />
    );
    
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50', 'border-yellow-200');
    
    rerender(
      <Toast type="info" title="Info" message="Test" onClose={() => {}} />
    );
    
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50', 'border-blue-200');
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Toast
        type="info"
        title="Test"
        message="Test message"
        onClose={handleClose}
      />
    );
    
    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('auto-closes after duration', async () => {
    const handleClose = jest.fn();
    render(
      <Toast
        type="info"
        title="Test"
        message="Test message"
        onClose={handleClose}
        duration={1000}
      />
    );
    
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    }, { timeout: 1500 });
  });

  test('renders with RTL support', () => {
    render(
      <Toast
        type="info"
        title="اختبار"
        message="رسالة اختبار"
        onClose={() => {}}
        isRTL={true}
      />
    );
    
    expect(screen.getByRole('alert')).toHaveClass('rtl:pr-12', 'rtl:pl-4');
  });
});

describe('useToast Hook', () => {
  test('provides toast management functions', () => {
    let toastUtils;
    
    function TestComponent() {
      toastUtils = useToast();
      return null;
    }
    
    render(<TestComponent />);
    
    expect(toastUtils).toHaveProperty('toasts');
    expect(toastUtils).toHaveProperty('addToast');
    expect(toastUtils).toHaveProperty('removeToast');
    expect(Array.isArray(toastUtils.toasts)).toBe(true);
  });
});

export default Toast;