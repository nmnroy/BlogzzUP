import React from 'react';
import { Play } from 'lucide-react';

const HeroSection = ({ onSignIn }) => {
  return (
    <main className="hero fade-section" id="main-content" style={{ position: 'relative' }} tabIndex={-1}>
      <div className="hero-glow-orb"></div>
      <div className="container hero-content">
        <div className="badge stagger-in-item">
          <span className="badge-dot"></span>
          ✦ India's #1 AI Blog Engine — Now in Beta
        </div>
        
        <h1 className="hero-title stagger-in-item">
          Publish <span className="title-accent-violet">10x Output</span><br />
          With Zero Writing.
        </h1>
        
        <p className="subheading stagger-in-item">
          Stop fighting writer's block. BlogForge researches, writes, optimizes, and automatically publishes high-ranking SEO content directly to your WordPress, Webflow, or custom CMS.
        </p>

        <div className="hero-actions stagger-in-item">
          <button className="btn btn-primary btn-lg" onClick={onSignIn}>Start Free Trial →</button>
          <button className="btn btn-outline btn-lg" onClick={() => window.showPage('demo')}>
            <Play size={18} style={{ marginRight: '8px' }} /> Watch Demo
          </button>
        </div>

        <div className="feature-pill-grid stagger-in">
          <div className="fp-card glass-card" onClick={(e) => { e.preventDefault(); if (window.showPage) window.showPage('how-it-works'); }}>
            <div className="fp-card-header"><span style={{ fontSize: '20px' }}>🧠</span><span className="fp-title">AI Prompt Engine</span></div>
            <div className="fp-desc">7-stage pipeline from keyword to publish</div>
            <span className="fp-arrow">→</span>
          </div>
          <div className="fp-card glass-card" onClick={(e) => { e.preventDefault(); window.showPage('features'); }}>
            <div className="fp-card-header"><span style={{ fontSize: '20px' }}>🔍</span><span className="fp-title">SERP Gap Scanner</span></div>
            <div className="fp-desc">Find what competitors missed</div>
            <span className="fp-arrow">→</span>
          </div>
          <div className="fp-card glass-card" onClick={(e) => { e.preventDefault(); window.showPage('blog'); }}>
            <div className="fp-card-header"><span style={{ fontSize: '20px' }}>⚡</span><span className="fp-title">Instant Publish</span></div>
            <div className="fp-desc">WordPress, Webflow & more</div>
            <span className="fp-arrow">→</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
