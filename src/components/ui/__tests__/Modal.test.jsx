// src/components/ui/__tests__/Modal.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../Modal';

describe('Modal Component', () => {
  test('renders modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    
    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when backdrop is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    
    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when Escape key is pressed', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test" size="sm">
        <div>Content</div>
      </Modal>
    );
    
    expect(screen.getByRole('dialog')).toHaveClass('max-w-md');
    
    rerender(
      <Modal isOpen={true} onClose={() => {}} title="Test" size="lg">
        <div>Content</div>
      </Modal>
    );
    
    expect(screen.getByRole('dialog')).toHaveClass('max-w-4xl');
  });
});

export default Modal;