import '@testing-library/jest-dom';

// Mock CSS imports so Vitest doesn't try to parse them
vi.mock('../index.css', () => ({}));
vi.mock('../App.css', () => ({}));
vi.mock('../BlogEditor.css', () => ({}));
vi.mock('../Dashboard.css', () => ({}));
vi.mock('../PromptArchitecture.css', () => ({}));
vi.mock('../a11y.css', () => ({}));
vi.mock('../interactions.css', () => ({}));
vi.mock('../tokens.css', () => ({}));
