/**
 * CommandPalette.test.jsx
 * Tests for the CommandPalette component.
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommandPalette from '../CommandPalette';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const renderPalette = (props = {}) =>
  render(<CommandPalette onNavigate={props.onNavigate ?? vi.fn()} {...props} />);

// ─── Visibility ───────────────────────────────────────────────────────────────

describe('CommandPalette – visibility', () => {
  it('is not visible on initial render', () => {
    renderPalette();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on Ctrl+K', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog', { name: /command palette/i })).toBeInTheDocument();
  });

  it('opens on Meta+K (Cmd+K)', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.getByRole('dialog', { name: /command palette/i })).toBeInTheDocument();
  });

  it('closes when Escape is pressed', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('toggles closed on second Ctrl+K', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when overlay (backdrop) is clicked', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    // The overlay is the outermost div with class cmd-overlay
    const overlay = document.querySelector('.cmd-overlay');
    expect(overlay).not.toBeNull();
    fireEvent.click(overlay);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does NOT close when the palette body is clicked', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const palette = screen.getByRole('dialog');
    fireEvent.click(palette);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens via window.openCommandPalette()', () => {
    renderPalette();
    act(() => { window.openCommandPalette(); });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('removes window.openCommandPalette on unmount', () => {
    const { unmount } = renderPalette();
    act(() => { window.openCommandPalette(); });
    unmount();
    expect(window.openCommandPalette).toBeUndefined();
  });
});

// ─── Search / filtering ───────────────────────────────────────────────────────

describe('CommandPalette – search and filtering', () => {
  beforeEach(() => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
  });

  it('shows all grouped sections when query is empty', () => {
    expect(screen.getAllByText('Navigate').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
  });

  it('shows "Dashboard Overview" command by default', () => {
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
  });

  it('filters results when typing a search query', async () => {
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'Dashboard');
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
    // Items that don't match should not be shown
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('shows "No results found" for a non-matching query', async () => {
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'xyznotexisting');
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('filters by tag as well as label', async () => {
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'SEO');
    // "SERP Gap Scanner" and "Live SEO Scorer" both have tag "SEO"
    expect(screen.getByText('SERP Gap Scanner')).toBeInTheDocument();
    expect(screen.getByText('Live SEO Scorer')).toBeInTheDocument();
  });

  it('clears the input and resets state after palette reopens', async () => {
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'Analytics');
    fireEvent.keyDown(window, { key: 'Escape' });
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const freshInput = screen.getByRole('combobox');
    expect(freshInput.value).toBe('');
  });
});

// ─── Keyboard navigation ─────────────────────────────────────────────────────

describe('CommandPalette – keyboard navigation', () => {
  it('ArrowDown moves selection to next item', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const input = screen.getByRole('combobox');

    // Initially item at index 0 is selected (aria-selected=true)
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('ArrowUp wraps to last item from first item', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const input = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');

    // Start at 0, press ArrowUp → should wrap to last
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(options[options.length - 1]).toHaveAttribute('aria-selected', 'true');
  });

  it('ArrowDown wraps from last item to first item', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const input = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');

    // Navigate to last item
    for (let i = 0; i < options.length - 1; i++) {
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    }
    expect(options[options.length - 1]).toHaveAttribute('aria-selected', 'true');

    // One more ArrowDown wraps to first
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('Enter key selects the highlighted item and closes palette', () => {
    const onNavigate = vi.fn();
    render(<CommandPalette onNavigate={onNavigate} />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const input = screen.getByRole('combobox');

    // First item is selected by default — press Enter
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

// ─── Item click / navigation ──────────────────────────────────────────────────

describe('CommandPalette – item selection via click', () => {
  it('calls onNavigate with the item id when an item is clicked', () => {
    const onNavigate = vi.fn();
    render(<CommandPalette onNavigate={onNavigate} />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });

    fireEvent.click(screen.getByText('My Blogs'));
    expect(onNavigate).toHaveBeenCalledWith('myblogs');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onNavigate with action when Quick Action item is clicked', () => {
    const onNavigate = vi.fn();
    render(<CommandPalette onNavigate={onNavigate} />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });

    fireEvent.click(screen.getByText('Generate Blog Post'));
    expect(onNavigate).toHaveBeenCalledWith('newblog');
  });

  it('hovering over an item updates the selected index', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const options = screen.getAllByRole('option');
    // Second option
    fireEvent.mouseEnter(options[1]);
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('CommandPalette – accessibility', () => {
  it('dialog has aria-modal=true', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('input has role combobox with aria-expanded=true when open', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('listbox is rendered inside the dialog', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('all items have role=option', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
  });
});

// ─── Keyboard shortcut hint rendering ────────────────────────────────────────

describe('CommandPalette – footer hints', () => {
  it('renders keyboard shortcut hints in footer', () => {
    renderPalette();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    // The footer contains section labels and kbd hint elements
    const kbdElements = document.querySelectorAll('.kbd');
    expect(kbdElements.length).toBeGreaterThan(0);
    // At least one of the section labels is "Navigate"
    const sectionLabels = document.querySelectorAll('.cmd-section-label');
    expect(Array.from(sectionLabels).some(el => el.textContent === 'Navigate')).toBe(true);
  });
});
