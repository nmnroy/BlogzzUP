/**
 * PromptArchitecture.test.jsx
 * Tests for the PromptArchitecture component (7-stage pipeline viewer).
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PromptArchitecture from '../PromptArchitecture';

const renderPA = (props = {}) =>
  render(<PromptArchitecture onBack={props.onBack ?? vi.fn()} {...props} />);

// ─── Initial render ───────────────────────────────────────────────────────────

describe('PromptArchitecture – initial render', () => {
  it('renders the component heading', () => {
    renderPA();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/7-Stage/i)).toBeInTheDocument();
  });

  it('renders all 7 stage labels in the sidebar stepper', () => {
    renderPA();
    expect(screen.getByText('Keyword Intent Analysis')).toBeInTheDocument();
    expect(screen.getByText('SERP Gap Identification')).toBeInTheDocument();
    expect(screen.getByText('Content Brief Generation')).toBeInTheDocument();
    expect(screen.getByText('Structured Draft')).toBeInTheDocument();
    expect(screen.getByText('SEO Optimization Pass')).toBeInTheDocument();
    expect(screen.getByText('GEO + AI Detection Pass')).toBeInTheDocument();
    expect(screen.getByText('Schema + Snippet Structuring')).toBeInTheDocument();
  });

  it('shows stage 1 as the default active stage', () => {
    renderPA();
    // The prompt card shows "Stage 1 • System Prompt Template"
    expect(screen.getByText(/Stage 1 • System Prompt Template/i)).toBeInTheDocument();
  });

  it('displays the target keyword banner', () => {
    renderPA();
    const badge = document.querySelector('.keyword-badge');
    expect(badge).not.toBeNull();
    expect(badge.textContent).toContain('best AI blog tools India 2026');
  });

  it('renders "Run Mockup" button initially enabled', () => {
    renderPA();
    const runBtn = screen.getByRole('button', { name: /run mockup/i });
    expect(runBtn).not.toBeDisabled();
  });

  it('renders the "Back to Home" button', () => {
    renderPA();
    expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument();
  });
});

// ─── Back button ─────────────────────────────────────────────────────────────

describe('PromptArchitecture – back button', () => {
  it('calls onBack when "Back to Home" is clicked', () => {
    const onBack = vi.fn();
    renderPA({ onBack });
    fireEvent.click(screen.getByRole('button', { name: /back to home/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});

// ─── Manual stage navigation ──────────────────────────────────────────────────

describe('PromptArchitecture – manual stage navigation', () => {
  it('switches to stage 3 when stage 3 step is clicked', () => {
    renderPA();
    fireEvent.click(screen.getByText('Content Brief Generation'));
    expect(screen.getByText(/Stage 3 • System Prompt Template/i)).toBeInTheDocument();
  });

  it('switches to stage 7 when stage 7 step is clicked', () => {
    renderPA();
    fireEvent.click(screen.getByText('Schema + Snippet Structuring'));
    expect(screen.getByText(/Stage 7 • System Prompt Template/i)).toBeInTheDocument();
  });

  it('shows the description for the active stage below the step title', () => {
    renderPA();
    // Stage 1 is active on load; its description should be visible
    expect(
      screen.getByText(/Parse raw keyword, identify search intent/i)
    ).toBeInTheDocument();
  });

  it('shows stage output for stage 1 on initial render', () => {
    renderPA();
    expect(screen.getByText(/Informational\/Commercial Investigation/i)).toBeInTheDocument();
  });
});

// ─── Run pipeline (animated mockup) ──────────────────────────────────────────

describe('PromptArchitecture – run pipeline', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('disables "Run Mockup" button while pipeline is running', () => {
    renderPA();
    const runBtn = screen.getByRole('button', { name: /run mockup/i });
    fireEvent.click(runBtn);
    expect(screen.getByRole('button', { name: /running/i })).toBeDisabled();
  });

  it('shows "Running…" label while pipeline is active', () => {
    renderPA();
    fireEvent.click(screen.getByRole('button', { name: /run mockup/i }));
    expect(screen.getByText(/running/i)).toBeInTheDocument();
  });

  it('advances through stages during pipeline run', async () => {
    renderPA();
    fireEvent.click(screen.getByRole('button', { name: /run mockup/i }));

    // Stage 1 at t=0, stage 2 at t=4000ms
    await act(async () => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText(/Stage 2 • System Prompt Template/i)).toBeInTheDocument();
  });

  it('stops at stage 7 and re-enables button', async () => {
    renderPA();
    fireEvent.click(screen.getByRole('button', { name: /run mockup/i }));

    // Advance past all 7 stages (6 intervals × 4000ms each)
    await act(async () => {
      vi.advanceTimersByTime(7 * 4000);
    });

    expect(screen.getByText(/Stage 7 • System Prompt Template/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /run mockup/i })).not.toBeDisabled();
  });

  it('does not allow clicking stage steps while pipeline is running', async () => {
    renderPA();
    fireEvent.click(screen.getByRole('button', { name: /run mockup/i }));

    // Stage starts at 1 → try clicking step 3 while running
    const step3 = screen.getByText('Content Brief Generation');
    fireEvent.click(step3);

    // Stage should still be 1 (or 2 if timer advanced), NOT 3 because running blocks it
    // We haven't advanced the timer, so active stage stays at 1
    expect(screen.getByText(/Stage 1 • System Prompt Template/i)).toBeInTheDocument();
  });

  it('resets to stage 1 when Run Mockup is clicked again after completion', async () => {
    renderPA();
    fireEvent.click(screen.getByRole('button', { name: /run mockup/i }));

    // Run to completion
    await act(async () => {
      vi.advanceTimersByTime(7 * 4000);
    });

    // Click run again
    fireEvent.click(screen.getByRole('button', { name: /run mockup/i }));
    expect(screen.getByText(/Stage 1 • System Prompt Template/i)).toBeInTheDocument();
  });
});

// ─── Content rendering ────────────────────────────────────────────────────────

describe('PromptArchitecture – content rendering', () => {
  it('renders prompt content for stage 1', () => {
    renderPA();
    expect(screen.getByText(/expert SEO data strategist/i)).toBeInTheDocument();
  });

  it('renders output content for stage 1', () => {
    renderPA();
    expect(screen.getByText(/Marketing Managers, Startup Founders in India/i)).toBeInTheDocument();
  });

  it('renders prompt content for stage 2 when selected', () => {
    renderPA();
    fireEvent.click(screen.getByText('SERP Gap Identification'));
    expect(screen.getByText(/SERP Gap Analysis/i)).toBeInTheDocument();
  });

  it('renders output for stage 4 when selected', () => {
    renderPA();
    fireEvent.click(screen.getByText('Structured Draft'));
    // Stage 4 output contains "₹1,999/mo" which is unique to stage 4
    expect(screen.getByText(/₹1,999\/mo/i)).toBeInTheDocument();
  });
});
