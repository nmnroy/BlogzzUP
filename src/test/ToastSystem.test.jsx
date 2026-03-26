/**
 * ToastSystem.test.jsx
 * Tests for ToastProvider, useToast hook, and Toast component behaviour.
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { ToastProvider, useToast } from '../ToastSystem';

// ─── Helper component that exposes addToast via a button ─────────────────────
const ToastTrigger = ({ type = 'info', title, message }) => {
  const { addToast } = useToast();
  return (
    <button onClick={() => addToast({ type, title, message })}>
      Add Toast
    </button>
  );
};

const renderWithProvider = (ui, providerProps) =>
  render(<ToastProvider {...providerProps}>{ui}</ToastProvider>);

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ToastProvider', () => {
  it('renders children', () => {
    renderWithProvider(<span>child content</span>);
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('renders the notification region container', () => {
    renderWithProvider(<span />);
    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument();
  });

  it('starts with no toasts visible', () => {
    renderWithProvider(<span />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('useToast – addToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds an info toast with title and message', () => {
    renderWithProvider(
      <ToastTrigger type="info" title="Hello" message="World" />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('adds a success toast', () => {
    renderWithProvider(
      <ToastTrigger type="success" title="Saved!" message="Your blog was saved." />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-success');
  });

  it('adds a warning toast', () => {
    renderWithProvider(
      <ToastTrigger type="warning" title="Heads up" message="Check this." />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-warning');
  });

  it('adds a danger toast', () => {
    renderWithProvider(
      <ToastTrigger type="danger" title="Error" message="Something went wrong." />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-danger');
  });

  it('adds multiple toasts simultaneously', () => {
    const MultiTrigger = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => {
          addToast({ type: 'info', title: 'First' });
          addToast({ type: 'success', title: 'Second' });
          addToast({ type: 'warning', title: 'Third' });
        }}>
          Add Three
        </button>
      );
    };
    renderWithProvider(<MultiTrigger />);
    fireEvent.click(screen.getByText('Add Three'));
    expect(screen.getAllByRole('alert')).toHaveLength(3);
  });

  it('renders toast without a title when title is omitted', () => {
    renderWithProvider(
      <ToastTrigger type="info" message="Only message" />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Only message')).toBeInTheDocument();
  });

  it('renders toast without a message when message is omitted', () => {
    renderWithProvider(
      <ToastTrigger type="info" title="Only title" />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByText('Only title')).toBeInTheDocument();
  });
});

describe('Toast – auto-dismiss', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('removes toast after 4 seconds', () => {
    renderWithProvider(
      <ToastTrigger type="info" title="Auto dismiss" />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Advance past auto-dismiss (4000ms) + exit animation (400ms)
    act(() => {
      vi.advanceTimersByTime(4500);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('Toast – manual dismissal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('removes toast when close button is clicked', () => {
    renderWithProvider(
      <ToastTrigger type="info" title="Closable" />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /dismiss notification/i });
    fireEvent.click(closeBtn);

    // Advance past exit animation (400ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('removes toast when clicking the toast body', () => {
    renderWithProvider(
      <ToastTrigger type="info" title="Click me" />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    const toast = screen.getByRole('alert');

    fireEvent.click(toast);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('close button has accessible label', () => {
    renderWithProvider(
      <ToastTrigger type="info" title="Accessible" />
    );
    fireEvent.click(screen.getByText('Add Toast'));
    expect(
      screen.getByRole('button', { name: /dismiss notification/i })
    ).toBeInTheDocument();
  });
});

describe('useToast – outside provider', () => {
  it('returns a no-op addToast and does not throw', () => {
    const Outer = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast({ type: 'info', title: 'Noop' })}>
          No Provider
        </button>
      );
    };
    // Rendered WITHOUT ToastProvider
    render(<Outer />);
    expect(() => fireEvent.click(screen.getByText('No Provider'))).not.toThrow();
  });
});
