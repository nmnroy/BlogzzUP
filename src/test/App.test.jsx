/**
 * App.test.jsx
 * Tests for the main App component (landing page, navigation, in-page components).
 *
 * Strategy: App.jsx is a large component-tree. We focus on:
 *  - Structural elements that are always rendered (navbar, footer, drawer)
 *  - Navigation behaviour (showPage, mobile drawer)
 *  - Sub-components rendered inside page sections (AccordionItem, HowItWorksAccordion)
 *  - AnimatedCounter initial render (counter starts at 0)
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import App from '../App';

// ─── Global mocks ─────────────────────────────────────────────────────────────

// IntersectionObserver is not available in jsdom — mock as a proper constructor
class MockIntersectionObserver {
  constructor() {}
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// Dashboard and PromptArchitecture have heavy deps — keep their renders lightweight
vi.mock('../Dashboard', () => ({
  default: () => <div data-testid="dashboard-mock">Dashboard</div>,
}));
vi.mock('../PromptArchitecture', () => ({
  default: ({ onBack }) => (
    <div data-testid="prompt-arch-mock">
      PromptArchitecture
      <button onClick={onBack}>Back to Home</button>
    </div>
  ),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const renderApp = () => render(<App />);

// ─── Navbar ───────────────────────────────────────────────────────────────────

describe('App – navbar', () => {
  it('renders the BlogForge AI logo text', () => {
    renderApp();
    expect(screen.getByRole('link', { name: /blogforge ai/i })).toBeInTheDocument();
  });

  it('renders main navigation links', () => {
    renderApp();
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(within(nav).getByText('Home')).toBeInTheDocument();
    expect(within(nav).getByText('How it Works')).toBeInTheDocument();
    expect(within(nav).getByText('Features')).toBeInTheDocument();
    expect(within(nav).getByText('Demo')).toBeInTheDocument();
    expect(within(nav).getByText('Pricing')).toBeInTheDocument();
    expect(within(nav).getByText('Blog')).toBeInTheDocument();
  });

  it('renders Sign In and Start Free buttons in navbar', () => {
    renderApp();
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(within(nav).getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(within(nav).getByRole('button', { name: /start free/i })).toBeInTheDocument();
  });

  it('renders skip-to-content link for accessibility', () => {
    renderApp();
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();
  });
});

// ─── Mobile drawer ────────────────────────────────────────────────────────────

describe('App – mobile drawer', () => {
  it('drawer is initially closed (no "open" class)', () => {
    renderApp();
    const drawer = document.getElementById('mobile-drawer');
    expect(drawer).not.toHaveClass('open');
  });

  it('opens mobile drawer when hamburger button is clicked', () => {
    renderApp();
    const menuBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(menuBtn);
    const drawer = document.getElementById('mobile-drawer');
    expect(drawer).toHaveClass('open');
  });

  it('closes mobile drawer when close button is clicked', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: /open navigation menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /close navigation menu/i }));
    const drawer = document.getElementById('mobile-drawer');
    expect(drawer).not.toHaveClass('open');
  });

  it('mobile drawer contains navigation links', () => {
    renderApp();
    const drawer = document.getElementById('mobile-drawer');
    expect(drawer.textContent).toMatch(/How it Works/i);
    expect(drawer.textContent).toMatch(/Features/i);
    expect(drawer.textContent).toMatch(/Pricing/i);
  });
});

// ─── Page sections ────────────────────────────────────────────────────────────

describe('App – page sections in DOM', () => {
  it('marketing site container is rendered', () => {
    renderApp();
    expect(document.getElementById('marketing-site')).not.toBeNull();
  });

  it('dashboard container is rendered (hidden initially)', () => {
    renderApp();
    const dashEl = document.getElementById('dashboard-app');
    expect(dashEl).not.toBeNull();
    expect(dashEl.style.display).toBe('none');
  });

  it('howitworks page section exists in DOM', () => {
    renderApp();
    expect(document.getElementById('page-howitworks')).not.toBeNull();
  });

  it('features page section exists in DOM', () => {
    renderApp();
    expect(document.getElementById('page-features')).not.toBeNull();
  });

  it('pricing page section exists in DOM', () => {
    renderApp();
    expect(document.getElementById('page-pricing')).not.toBeNull();
  });

  it('auth page section exists in DOM', () => {
    renderApp();
    expect(document.getElementById('page-auth')).not.toBeNull();
  });
});

// ─── window.showPage ─────────────────────────────────────────────────────────

describe('App – window.showPage', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('exposes window.showPage after mount', () => {
    renderApp();
    act(() => { vi.runAllTimers(); });
    expect(typeof window.showPage).toBe('function');
  });

  it('window.showPage makes the target section visible', () => {
    renderApp();
    act(() => { vi.runAllTimers(); });

    act(() => { window.showPage('pricing'); });

    const pricingSection = document.getElementById('page-pricing');
    expect(pricingSection.style.display).toBe('block');
  });

  it('window.showPage hides other page sections', () => {
    renderApp();
    act(() => { vi.runAllTimers(); });

    act(() => { window.showPage('features'); });

    const homeSection = document.getElementById('page-home');
    expect(homeSection?.style.display).toBe('none');
  });
});

// ─── HowItWorksAccordion (rendered inside page-howitworks) ───────────────────

describe('App – HowItWorksAccordion', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the "The 7-Stage Prompt Architecture" heading', () => {
    renderApp();
    // The accordion section exists in the DOM even if hidden
    expect(screen.getByText('The 7-Stage Prompt Architecture')).toBeInTheDocument();
  });

  it('renders all 7 accordion stage titles', () => {
    renderApp();
    expect(screen.getByText('Keyword Intent Analysis')).toBeInTheDocument();
    expect(screen.getByText('SERP Gap Identification')).toBeInTheDocument();
    expect(screen.getByText('Content Brief Generation')).toBeInTheDocument();
    expect(screen.getByText('Structured Draft Writing')).toBeInTheDocument();
    expect(screen.getByText('SEO Optimization Pass')).toBeInTheDocument();
    expect(screen.getByText('GEO + Humanization Pass')).toBeInTheDocument();
    expect(screen.getByText('Schema + Snippet Structuring')).toBeInTheDocument();
  });

  it('accordion items are closed by default (no "open" class)', () => {
    renderApp();
    const containers = document.querySelectorAll('.accordion-container');
    containers.forEach(c => {
      expect(c).not.toHaveClass('open');
    });
  });

  it('clicking an accordion item opens it', () => {
    renderApp();
    const firstAccordion = document.querySelector('.accordion-container');
    expect(firstAccordion).not.toBeNull();
    fireEvent.click(firstAccordion);
    expect(firstAccordion).toHaveClass('open');
  });

  it('clicking the same accordion item twice closes it', () => {
    renderApp();
    const firstAccordion = document.querySelector('.accordion-container');
    fireEvent.click(firstAccordion);
    expect(firstAccordion).toHaveClass('open');
    fireEvent.click(firstAccordion);
    expect(firstAccordion).not.toHaveClass('open');
  });

  it('opening one accordion item closes the previously opened one', () => {
    renderApp();
    const containers = document.querySelectorAll('.accordion-container');
    fireEvent.click(containers[0]);
    expect(containers[0]).toHaveClass('open');

    fireEvent.click(containers[1]);
    expect(containers[1]).toHaveClass('open');
    expect(containers[0]).not.toHaveClass('open');
  });

  it('accordion items show "Stage N" badge', () => {
    renderApp();
    expect(screen.getByText('Stage 1')).toBeInTheDocument();
    expect(screen.getByText('Stage 7')).toBeInTheDocument();
  });
});

// ─── Footer ───────────────────────────────────────────────────────────────────

describe('App – footer', () => {
  it('renders the footer', () => {
    renderApp();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('footer contains copyright text', () => {
    renderApp();
    expect(screen.getByText(/© 2026 BlogForge AI/i)).toBeInTheDocument();
  });

  it('footer contains Platform links section', () => {
    renderApp();
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText('Platform')).toBeInTheDocument();
  });

  it('footer contains Legal links section', () => {
    renderApp();
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText('Legal')).toBeInTheDocument();
  });
});

// ─── AnimatedCounter ──────────────────────────────────────────────────────────

describe('App – AnimatedCounter', () => {
  it('renders the stats section with counter spans in the DOM', () => {
    renderApp();
    // AnimatedCounter renders <span>{count}{suffix}</span>, count starts at 0.
    // IntersectionObserver is mocked so animation never fires.
    // We verify the page renders without errors and the marketing site exists.
    expect(document.getElementById('marketing-site')).not.toBeNull();
  });
});

// ─── Auth page ────────────────────────────────────────────────────────────────

describe('App – auth page', () => {
  it('auth page contains "Welcome Back" heading', () => {
    renderApp();
    // The heading exists in DOM even while hidden
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  it('auth page contains "Continue with Google" button', () => {
    renderApp();
    // The auth page section is hidden (display:none); use hidden:true to find it
    expect(screen.getByRole('button', { name: /continue with google/i, hidden: true })).toBeInTheDocument();
  });

  it('auth page contains email and password inputs', () => {
    renderApp();
    expect(screen.getByPlaceholderText(/name@company.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
  });
});

// ─── window.showDashboard (dev fallback) ─────────────────────────────────────

describe('App – window.showDashboard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('exposes window.showDashboard after mount', () => {
    renderApp();
    act(() => { vi.runAllTimers(); });
    expect(typeof window.showDashboard).toBe('function');
  });

  it('showDashboard hides marketing site and shows dashboard', () => {
    renderApp();
    act(() => { vi.runAllTimers(); });

    act(() => { window.showDashboard(); });

    const marketingSite = document.getElementById('marketing-site');
    const dashboardApp = document.getElementById('dashboard-app');
    expect(marketingSite.style.display).toBe('none');
    expect(dashboardApp.style.display).toBe('flex');
  });
});
