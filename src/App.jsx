import React, { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import Dashboard from './Dashboard';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import { ArrowUp, ArrowRight } from 'lucide-react';
import './index.css';

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a1a' }}>
    <div style={{ width: 40, height: 40, border: '3px solid #7c3aed', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  const { currentUser, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState('home');

  // When logout happens, reset showAuth to false so landing page shows
  useEffect(() => {
    if (!currentUser) {
      setShowAuth(false);
      setCurrentPage('home'); // Reset to home on logout
    }
  }, [currentUser]);

  useEffect(() => {
    // Legacy Bridge: Maintain window.showPage for Navbar compatibility
    window.showPage = (name) => {
      setCurrentPage(name);
      setShowAuth(false); // If they were on AuthPage, go back to landing
      window.scrollTo(0, 0);
    };

    const hash = window.location.hash.replace('#', '') || 'home';
    if (['home', 'how-it-works', 'features', 'demo', 'pricing', 'blog'].includes(hash)) {
      setCurrentPage(hash);
    }
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (currentUser) {
    return <Dashboard />;
  }

  return (
    <div className="site-wrapper">
      {!showAuth && (
        <Navbar 
          scrolled={scrolled} 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen}
          onSignIn={() => setShowAuth(true)}
          onBackToHome={() => { setShowAuth(false); setCurrentPage('home'); }}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

      {showAuth ? (
        <AuthPage 
          onBack={() => setShowAuth(false)} 
          onNavigate={(pageId) => { setShowAuth(false); setCurrentPage(pageId); }}
        />
      ) : (
        <LandingPage currentPage={currentPage} setCurrentPage={setCurrentPage} onSignIn={() => setShowAuth(true)} />
      )}

      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '20px', color: 'white' }}>
                <span style={{ color: '#7C3AED' }}>✦</span> BlogForge AI
              </div>
              <p className="footer-desc">Empowering Indian startups with autonomous, SEO-winning content engines.</p>
            </div>
            
            <div className="footer-links">
              <h4>Platform</h4>
              <ul>
                <li><a href="#features" onClick={(e) => { e.preventDefault(); if (window.showPage) window.showPage('features'); }}>Features</a></li>
                <li><a href="#pricing" onClick={(e) => { e.preventDefault(); if (window.showPage) window.showPage('pricing'); }}>Pricing</a></li>
                <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); if (window.showPage) window.showPage('how-it-works'); }}>How it Works</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <span>
              © 2026 BlogForge AI. Built in India 🇮🇳. All rights reserved.
            </span>
            <div className="footer-socials" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <a href="#" className="social-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#000', color: 'white', textDecoration: 'none', fontSize: '15px', fontWeight: 900, fontFamily: 'sans-serif'}}>𝕏</a>
              <a href="#" className="social-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#0A66C2', color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 700, fontFamily: 'sans-serif', lineHeight: 1, flexShrink: 0}}>in</a>
              <a href="#" className="social-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)', color: 'white', textDecoration: 'none', fontSize: '16px'}}>◎</a>
              <a href="#" className="social-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#24292E', color: 'white', textDecoration: 'none', fontSize: '18px'}}>⌥</a>
            </div>
          </div>
        </div>
      </footer>

      <button className={`scroll-top ${showTop ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Scroll to top of page">
        <ArrowUp size={24} aria-hidden="true" />
      </button>

      {!currentUser && !showAuth && (
        <div className="mobile-sticky-bottom">
          <button onClick={() => setShowAuth(true)} className="btn btn-primary w-full shadow-lg">Start Free <ArrowRight size={16} className="ml-2"/></button>
        </div>
      )}
    </div>
  );
}

export default App;
