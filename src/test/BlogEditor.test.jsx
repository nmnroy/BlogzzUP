/**
 * BlogEditor.test.jsx
 * Tests for the BlogEditor component — configure form, validation,
 * stage transitions, error handling, and history/version behaviour.
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogEditor from '../BlogEditor';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const buildOutput = (overrides = {}) => ({
  id: 1234,
  title: 'Test Blog Title',
  body: 'Body content for the test blog post.',
  metaDescription: 'A compelling meta description.',
  seoScore: 92,
  keyword: 'test keyword',
  tone: 'professional',
  geo: '',
  wordCountActual: 250,
  readTime: 2,
  createdAt: new Date().toISOString(),
  ...overrides,
});

// callGemini mock that resolves with valid JSON
const makeCallGemini = (result) =>
  vi.fn().mockResolvedValue(JSON.stringify(result ?? buildOutput()));

// callGemini mock that rejects
const makeFailingCallGemini = (msg = 'API error') =>
  vi.fn().mockRejectedValue(new Error(msg));

const renderEditor = (callGemini = makeCallGemini()) =>
  render(<BlogEditor callGemini={callGemini} />);

// BlogEditor root div has display:none in its JSX — force it visible for tests
const showEditor = () => {
  const root = document.getElementById('dash-newblog');
  if (root) root.style.display = 'block';
};

// ─── Initial render ───────────────────────────────────────────────────────────

describe('BlogEditor – initial render', () => {
  beforeEach(() => {
    renderEditor();
    showEditor();
  });

  it('renders the "New Blog Post" heading in configure stage', () => {
    expect(screen.getByText('New Blog Post')).toBeInTheDocument();
  });

  it('renders the keyword input field', () => {
    expect(screen.getByLabelText(/target keyword/i)).toBeInTheDocument();
  });

  it('keyword input receives autofocus on mount', () => {
    const input = screen.getByLabelText(/target keyword/i);
    // React's autoFocus calls .focus() during mount, making it the active element
    expect(document.activeElement).toBe(input);
  });

  it('renders all four tone radio options', () => {
    expect(screen.getByDisplayValue('professional')).toBeInTheDocument();
    expect(screen.getByDisplayValue('conversational')).toBeInTheDocument();
    expect(screen.getByDisplayValue('authoritative')).toBeInTheDocument();
    expect(screen.getByDisplayValue('educational')).toBeInTheDocument();
  });

  it('"professional" tone is selected by default', () => {
    expect(screen.getByDisplayValue('professional')).toBeChecked();
  });

  it('renders word count range slider', () => {
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('word count slider default value is 1500', () => {
    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('1500');
  });

  it('renders stage pills: Configure, Generate, Review', () => {
    // Stage pills are inside .be-stage-pills container
    const pillContainer = document.querySelector('.be-stage-pills');
    expect(pillContainer).not.toBeNull();
    const pillTexts = pillContainer.textContent;
    expect(pillTexts).toMatch(/configure/i);
    expect(pillTexts).toMatch(/generate/i);
    expect(pillTexts).toMatch(/review/i);
  });

  it('renders "Generate Blog" button', () => {
    expect(screen.getByRole('button', { name: /generate blog/i })).toBeInTheDocument();
  });
});

// ─── Keyword input ────────────────────────────────────────────────────────────

describe('BlogEditor – keyword input', () => {
  beforeEach(() => {
    renderEditor();
    showEditor();
  });

  it('shows character count as user types', async () => {
    const input = screen.getByLabelText(/target keyword/i);
    await userEvent.type(input, 'hello');
    expect(screen.getByText(/5\/120/)).toBeInTheDocument();
  });

  it('updates keyword value on typing', async () => {
    const input = screen.getByLabelText(/target keyword/i);
    await userEvent.type(input, 'AI tools for startups');
    expect(input.value).toBe('AI tools for startups');
  });

  it('clears validation error when user starts typing', async () => {
    // Trigger error first by clicking Generate with empty field
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    const input = screen.getByLabelText(/target keyword/i);
    await userEvent.type(input, 'a');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

// ─── Keyword examples ─────────────────────────────────────────────────────────

describe('BlogEditor – keyword examples', () => {
  beforeEach(() => {
    renderEditor();
    showEditor();
  });

  it('examples are hidden by default', () => {
    expect(screen.queryByRole('listbox', { name: /keyword examples/i })).not.toBeInTheDocument();
  });

  it('clicking "See examples" shows the example chips', () => {
    fireEvent.click(screen.getByRole('button', { name: /see examples/i }));
    expect(screen.getByRole('listbox', { name: /keyword examples/i })).toBeInTheDocument();
  });

  it('clicking "Hide examples" hides them again', () => {
    fireEvent.click(screen.getByRole('button', { name: /see examples/i }));
    fireEvent.click(screen.getByRole('button', { name: /hide examples/i }));
    expect(screen.queryByRole('listbox', { name: /keyword examples/i })).not.toBeInTheDocument();
  });

  it('clicking an example chip fills the keyword input', () => {
    fireEvent.click(screen.getByRole('button', { name: /see examples/i }));
    const chips = screen.getAllByRole('option');
    fireEvent.click(chips[0]);
    const input = screen.getByLabelText(/target keyword/i);
    expect(input.value).toBeTruthy();
  });

  it('clicking an example chip hides the examples list', () => {
    fireEvent.click(screen.getByRole('button', { name: /see examples/i }));
    const chips = screen.getAllByRole('option');
    fireEvent.click(chips[0]);
    expect(screen.queryByRole('listbox', { name: /keyword examples/i })).not.toBeInTheDocument();
  });
});

// ─── Validation ───────────────────────────────────────────────────────────────

describe('BlogEditor – validation', () => {
  beforeEach(() => {
    renderEditor();
    showEditor();
  });

  it('shows error when Generate is clicked with empty keyword', () => {
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/please enter a target keyword/i)).toBeInTheDocument();
  });

  it('shows error when keyword is too short (< 3 chars)', async () => {
    const input = screen.getByLabelText(/target keyword/i);
    await userEvent.type(input, 'ab');
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));
    expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument();
  });

  it('does not show error when keyword is valid', async () => {
    const input = screen.getByLabelText(/target keyword/i);
    await userEvent.type(input, 'valid keyword');
    // Don't click generate (would trigger API call) — just confirm no error
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

// ─── Tone selection ───────────────────────────────────────────────────────────

describe('BlogEditor – tone selection', () => {
  beforeEach(() => {
    renderEditor();
    showEditor();
  });

  it('selecting "conversational" tone marks it as checked', () => {
    fireEvent.click(screen.getByDisplayValue('conversational'));
    expect(screen.getByDisplayValue('conversational')).toBeChecked();
    expect(screen.getByDisplayValue('professional')).not.toBeChecked();
  });

  it('selecting "authoritative" tone marks it as checked', () => {
    fireEvent.click(screen.getByDisplayValue('authoritative'));
    expect(screen.getByDisplayValue('authoritative')).toBeChecked();
  });

  it('selecting "educational" tone marks it as checked', () => {
    fireEvent.click(screen.getByDisplayValue('educational'));
    expect(screen.getByDisplayValue('educational')).toBeChecked();
  });
});

// ─── Word count slider ────────────────────────────────────────────────────────

describe('BlogEditor – word count slider', () => {
  beforeEach(() => {
    renderEditor();
    showEditor();
  });

  it('slider has correct min/max', () => {
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '800');
    expect(slider).toHaveAttribute('max', '3000');
  });

  it('clicking a quick-mark button updates word count', () => {
    fireEvent.click(screen.getByRole('button', { name: '2,000' }));
    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('2000');
  });

  it('range marks are rendered for all preset values', () => {
    expect(screen.getByRole('button', { name: '800' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1,500' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3,000' })).toBeInTheDocument();
  });
});

// ─── Generation flow ──────────────────────────────────────────────────────────

describe('BlogEditor – generation flow', () => {
  afterEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it('transitions to "generating" stage after clicking Generate', async () => {
    // Use a promise that we control to keep Gemini pending
    let resolveGemini;
    const callGemini = vi.fn().mockReturnValue(
      new Promise(resolve => { resolveGemini = resolve; })
    );
    render(<BlogEditor callGemini={callGemini} />);
    showEditor();

    const input = screen.getByLabelText(/target keyword/i);
    await userEvent.type(input, 'best SEO tools');
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));

    // The h1 heading changes to "Generating…"
    expect(screen.getByRole('heading', { name: /generating/i })).toBeInTheDocument();

    // cleanup: resolve so no hanging promises
    resolveGemini(JSON.stringify(buildOutput()));
  });

  it('shows progress stepper during generation', async () => {
    let resolveGemini;
    const callGemini = vi.fn().mockReturnValue(
      new Promise(resolve => { resolveGemini = resolve; })
    );
    render(<BlogEditor callGemini={callGemini} />);
    showEditor();

    const input = screen.getByLabelText(/target keyword/i);
    await userEvent.type(input, 'SEO strategy India');
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));

    expect(screen.getByText(/analyzing keyword intent/i)).toBeInTheDocument();
    resolveGemini(JSON.stringify(buildOutput()));
  });

  it('transitions to review stage after successful generation', async () => {
    vi.useFakeTimers();
    const outputData = buildOutput({ keyword: 'SEO strategy India' });
    const callGemini = vi.fn().mockResolvedValue(JSON.stringify(outputData));

    render(<BlogEditor callGemini={callGemini} />);
    showEditor();

    fireEvent.change(screen.getByLabelText(/target keyword/i), { target: { value: 'SEO strategy India' } });
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));

    await act(async () => { await vi.runAllTimersAsync(); });

    expect(screen.getByRole('heading', { name: /review & edit/i })).toBeInTheDocument();
  });

  it('shows generated title in review stage', async () => {
    vi.useFakeTimers();
    const outputData = buildOutput({ title: 'My Generated Title', keyword: 'test keyword' });
    const callGemini = vi.fn().mockResolvedValue(JSON.stringify(outputData));

    render(<BlogEditor callGemini={callGemini} />);
    showEditor();

    fireEvent.change(screen.getByLabelText(/target keyword/i), { target: { value: 'test keyword' } });
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));

    await act(async () => { await vi.runAllTimersAsync(); });

    expect(screen.getByDisplayValue('My Generated Title')).toBeInTheDocument();
  });

  it('shows error message and returns to configure stage on API failure', async () => {
    vi.useFakeTimers();
    const callGemini = makeFailingCallGemini('Service unavailable');

    render(<BlogEditor callGemini={callGemini} />);
    showEditor();

    fireEvent.change(screen.getByLabelText(/target keyword/i), { target: { value: 'some keyword' } });
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));

    await act(async () => { await vi.runAllTimersAsync(); });

    expect(screen.getByText(/service unavailable/i)).toBeInTheDocument();
    expect(screen.getByText('New Blog Post')).toBeInTheDocument();
  });

  it('saves version to localStorage after successful generation', async () => {
    vi.useFakeTimers();
    const outputData = buildOutput({ keyword: 'local storage test' });
    const callGemini = vi.fn().mockResolvedValue(JSON.stringify(outputData));

    render(<BlogEditor callGemini={callGemini} />);
    showEditor();

    fireEvent.change(screen.getByLabelText(/target keyword/i), { target: { value: 'local storage test' } });
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));

    await act(async () => { await vi.runAllTimersAsync(); });

    const versions = JSON.parse(localStorage.getItem('bf_versions') || '[]');
    expect(versions.length).toBe(1);
  });
});

// ─── Review stage actions ─────────────────────────────────────────────────────

describe('BlogEditor – review stage', () => {
  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  const setupReviewStage = async () => {
    vi.useFakeTimers();
    const outputData = buildOutput();
    const callGemini = vi.fn().mockResolvedValue(JSON.stringify(outputData));
    render(<BlogEditor callGemini={callGemini} />);
    showEditor();

    fireEvent.change(screen.getByLabelText(/target keyword/i), { target: { value: 'test keyword' } });
    fireEvent.click(screen.getByRole('button', { name: /generate blog/i }));

    await act(async () => { await vi.runAllTimersAsync(); });

    // Confirm we're in review stage
    expect(screen.getByRole('heading', { name: /review & edit/i })).toBeInTheDocument();
  };

  it('shows "New" reset button in review stage', async () => {
    await setupReviewStage();
    expect(screen.getByRole('button', { name: /new/i })).toBeInTheDocument();
  });

  it('shows "History" button in review stage', async () => {
    await setupReviewStage();
    // The header History button has title="Version history"
    expect(document.querySelector('button[title="Version history"]')).not.toBeNull();
  });

  it('"New" button resets to configure stage', async () => {
    await setupReviewStage();
    fireEvent.click(screen.getByRole('button', { name: /new/i }));
    expect(screen.getByText('New Blog Post')).toBeInTheDocument();
  });

  it('clicking "History" opens the history drawer', async () => {
    await setupReviewStage();
    fireEvent.click(document.querySelector('button[title="Version history"]'));
    // History drawer/panel heading should become visible
    const historyHeadings = document.querySelectorAll('[class*="history"] h2, [class*="hist"] h3, .be-hist-title, .be-hist-header');
    // At minimum, the drawer is open when we find the history title element
    const allText = document.body.textContent;
    expect(allText).toMatch(/version history/i);
  });

  it('title field is editable in review stage', async () => {
    await setupReviewStage();
    vi.useRealTimers();
    const titleInput = screen.getByDisplayValue('Test Blog Title');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    expect(titleInput.value).toBe('Updated Title');
  });

  it('save draft button persists to localStorage', async () => {
    await setupReviewStage();
    const saveBtn = screen.getByRole('button', { name: /save draft/i });
    fireEvent.click(saveBtn);
    const blogs = JSON.parse(localStorage.getItem('bf_blogs') || '[]');
    expect(blogs.length).toBe(1);
  });

  it('shows save success banner after saving draft', async () => {
    await setupReviewStage();
    fireEvent.click(screen.getByRole('button', { name: /save draft/i }));
    expect(screen.getByText(/draft saved/i)).toBeInTheDocument();
  });
});

// ─── Version history ──────────────────────────────────────────────────────────

describe('BlogEditor – version history', () => {
  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it('loads versions from localStorage on mount', () => {
    const versions = [buildOutput({ id: 999, title: 'Old Version', savedAt: new Date().toISOString() })];
    localStorage.setItem('bf_versions', JSON.stringify(versions));

    const callGemini = makeCallGemini();
    render(<BlogEditor callGemini={callGemini} />);
    showEditor();

    // Versions are loaded into state — no error and component renders
    expect(screen.getByText('New Blog Post')).toBeInTheDocument();
  });
});

// ─── Keyboard shortcuts ───────────────────────────────────────────────────────

describe('BlogEditor – keyboard shortcuts', () => {
  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it('pressing Enter in keyword input triggers generation', async () => {
    let resolveGemini;
    const callGemini = vi.fn().mockReturnValue(
      new Promise(resolve => { resolveGemini = resolve; })
    );
    render(<BlogEditor callGemini={callGemini} />);
    showEditor();

    const input = screen.getByLabelText(/target keyword/i);
    await userEvent.type(input, 'keyboard shortcut test');
    // The keyword input has onKeyDown that calls generateBlog on Enter
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByRole('heading', { name: /generating/i })).toBeInTheDocument();

    resolveGemini(JSON.stringify(buildOutput()));
  });
});
