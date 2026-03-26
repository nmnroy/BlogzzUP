import React from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

const Navbar = ({ 
  scrolled, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  onSignIn, 
  onBackToHome,
  currentPage,
  setCurrentPage,
  onNavigate
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How it Works' },
    { id: 'features', label: 'Features' },
    { id: 'demo', label: 'Demo' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' }
  ];

  const handleNavClick = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      setCurrentPage(id);
    }
    if (setMobileMenuOpen) setMobileMenuOpen(false);
    // Explicitly update hash for secondary detection and URL consistency
    window.location.hash = id === 'home' ? '' : id;
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container">
          <a href="#" className="logo" aria-label="BlogForge AI — home" onClick={(e) => { e.preventDefault(); onBackToHome(); setCurrentPage('home'); }}>
            <Sparkles className="logo-icon" size={24} aria-hidden="true" />
            BlogForge AI
          </a>
          
          <ul className="nav-links" role="list" aria-label="Site pages">
            {navItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }} 
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions" role="group" aria-label="Account actions">
            <button className="btn btn-ghost" onClick={onSignIn}>Sign In</button>
            <button className="btn btn-primary" onClick={onSignIn} aria-label="Start free for 30 days">Start Free</button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-drawer">
            <Menu size={24} color="#fff" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileMenuOpen}
      >
        <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation menu">
          <X size={24} color="#fff" aria-hidden="true" />
        </button>
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }} 
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-actions">
          <button onClick={() => { onSignIn(); setMobileMenuOpen(false); }} className="btn btn-outline-white w-full">Sign In</button>
          <button onClick={() => { onSignIn(); setMobileMenuOpen(false); }} className="btn btn-primary w-full mt-4">Start Free</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
