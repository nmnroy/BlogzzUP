/**
 * ToastSystem.jsx
 * Global toast notification system for BlogzzUP.
 * Usage:
 *   import { useToast, ToastContainer } from './ToastSystem';
 *   const { addToast } = useToast();
 *   addToast({ type: 'success', title: 'Saved!', message: 'Your blog was saved.' });
 *
 * Types: 'success' | 'warning' | 'danger' | 'info'
 * Wrap your app root with <ToastProvider><App /><ToastContainer /></ToastProvider>
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

const ToastContext = createContext(null);

// ─── Icons ────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const DangerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ICONS = { success: CheckIcon, warning: WarningIcon, danger: DangerIcon, info: InfoIcon };

// ─── Toast Item ────────────────────────────────────────────────────────────────
const Toast = ({ id, type = 'info', title, message, onClose }) => {
  const [exiting, setExiting] = useState(false);
  const Icon = ICONS[type] || InfoIcon;

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onClose(id), 400);
  };

  // Auto-dismiss after 4s
  useEffect(() => {
    const timer = setTimeout(handleClose, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`toast toast-${type}${exiting ? ' toast-exit' : ''}`}
      onClick={handleClose}
      role="alert"
      aria-live="polite"
    >
      <span className="toast-icon" aria-hidden="true"><Icon /></span>
      <div className="toast-body">
        {title && <div className="toast-title">{title}</div>}
        {message && <div className="toast-message">{message}</div>}
      </div>
      <button
        className="toast-close"
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
        aria-label="Dismiss notification"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', title, message }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, title, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" aria-label="Notifications" role="region">
        {toasts.map(t => (
          <Toast key={t.id} {...t} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Return a no-op if used outside provider (graceful degradation)
    return { addToast: () => {} };
  }
  return ctx;
};

export default ToastProvider;
