import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import HomeFeaturesSection from '../components/HomeFeaturesSection';
import HowItWorksAccordion from '../components/HowItWorksAccordion';
import FeaturesPage from './FeaturesPage';
import DemoPage from './DemoPage';
import PricingPage from './PricingPage';
import BlogPage from './BlogPage';
import { Sparkles, ArrowRight, Search, Brain, Globe2, Link as LinkIcon, Rocket } from 'lucide-react';

const LandingPage = ({ currentPage, setCurrentPage, onSignIn }) => {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (['home', 'how-it-works', 'features', 'demo', 'pricing', 'blog'].includes(hash)) {
      setCurrentPage(hash);
    }
  }, [setCurrentPage]);

  const renderView = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="page-section active" id="page-home">
            <HeroSection onSignIn={onSignIn} />
            <div className="container">
              <div className="home-stats-strip">
                <div className="home-stats-flex">
                  <div className="home-stat-item"><div className="home-stat-num">92%</div><div className="home-stat-label">Time Saved</div></div>
                  <div className="home-stat-divider"></div>
                  <div className="home-stat-item"><div className="home-stat-num">4x</div><div className="home-stat-label">Better ROI</div></div>
                  <div className="home-stat-divider"></div>
                  <div className="home-stat-item"><div className="home-stat-num">15x</div><div className="home-stat-label">Faster Publishing</div></div>
                  <div className="home-stat-divider"></div>
                  <div className="home-stat-item"><div className="home-stat-num">500+</div><div className="home-stat-label">Startups</div></div>
                </div>
              </div>

              <div className="home-marquee-section">
                <div className="home-marquee-title">Publishes everywhere you already are</div>
                <div className="home-marquee-container-wrapper" style={{ overflow: 'hidden' }}>
                  <div className="home-marquee-container">
                    <div style={{ display: 'flex', gap: '16px' }}>
                      {['WordPress', 'Webflow', 'Shopify', 'Ghost', 'Strapi', 'Sanity', 'Medium', 'LinkedIn', 'Notion'].map(p => (
                        <div key={p} className="home-marquee-pill">{p}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <HomeFeaturesSection onSignIn={onSignIn} />
            </div>
          </div>
        );
      case 'how-it-works':
        return (
          <div className="page-section active" id="page-how-it-works">
            <div className="container" style={{ paddingTop: '8rem' }}>
              <div className="hiw-header">
                <h1 className="hiw-title">How BlogForge Works</h1>
                <p className="hiw-subtitle">From keyword to ranked blog post in under 10 minutes</p>
              </div>
              
              <div style={{ margin: '3rem auto 5rem', maxWidth: '1000px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', padding: '0 20px', boxSizing: 'border-box' }}>
                <div style={{ position: 'absolute', top: '50%', left: '12%', right: '12%', height: '2px', background: 'linear-gradient(90deg, rgba(124,58,237,0) 0%, rgba(124,58,237,0.5) 50%, rgba(6,182,212,0) 100%)', zIndex: 0 }}></div>
                <div className="glass-card" style={{ padding: '24px', textAlign: 'center', width: '220px', flexShrink: 0, zIndex: 2 }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--text-muted)' }}><Search size={32} /></div>
                  <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 8px', fontWeight: 700 }}>1. Discovery</h3>
                  <p style={{ color: 'var(--text-subtle)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>Keyword & SERP analysis automatically extracts missing competitor topics.</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #1A1333, #0D1526)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: '24px', padding: '32px', textAlign: 'center', width: '240px', flexShrink: 0, zIndex: 2, boxShadow: '0 0 40px rgba(124,58,237,0.25)', position: 'relative' }}>
                  <div style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white' }}><Brain size={40} /></div>
                  <h3 style={{ color: 'white', fontSize: '22px', margin: '0 0 6px', fontWeight: 800 }}>AI Engine</h3>
                  <p style={{ color: '#A78BFA', fontSize: '13px', margin: 0 }}>Generates, scores & optimises NLP content in real time.</p>
                </div>
                <div className="glass-card" style={{ padding: '24px', textAlign: 'center', width: '220px', flexShrink: 0, zIndex: 2 }}>
                  <div style={{ background: 'rgba(6,182,212,0.1)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#06B6D4' }}><Globe2 size={32} /></div>
                  <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 8px', fontWeight: 700 }}>3. Publishing</h3>
                  <p style={{ color: 'var(--text-subtle)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>One-click sync to major CMS platforms like WordPress or Ghost.</p>
                </div>
              </div>
              
              <section className="works-section fade-section" id="works">
                <div className="container">
                  <div className="timeline-grid">
                    <div className="timeline-line-animated"></div>
                    <div className="step-card">
                      <div className="step-header">
                        <div className="step-icon-wrapper cyan"><LinkIcon size={32} /></div>
                        <h3 className="step-title">1. Connect Your Brand</h3>
                        <p className="step-desc">Connect your CMS and paste your URL. BlogForge reads your brand in 60 seconds.</p>
                      </div>
                    </div>
                    <div className="step-card">
                      <div className="step-header">
                        <div className="step-icon-wrapper violet"><Sparkles size={32} /></div>
                        <h3 className="step-title">2. AI Does Everything</h3>
                        <p className="step-desc">Our 7-stage engine researches, writes, scores, and optimizes — automatically.</p>
                      </div>
                    </div>
                    <div className="step-card">
                      <div className="step-header">
                        <div className="step-icon-wrapper amber"><Rocket size={32} /></div>
                        <h3 className="step-title">3. Blogs Go Live</h3>
                        <p className="step-desc">Blogs auto-publish on your schedule. You get compounding organic traffic.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <HowItWorksAccordion onSignIn={onSignIn} />
            </div>
          </div>
        );
      case 'features':
        return <div className="page-section active" id="page-features"><FeaturesPage /></div>;
      case 'demo':
        return <div className="page-section active" id="page-demo"><DemoPage onSignIn={onSignIn} /></div>;
      case 'pricing':
        return <div className="page-section active" id="page-pricing"><PricingPage onSignIn={onSignIn} /></div>;
      case 'blog':
        return <div className="page-section active" id="page-blog"><BlogPage /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="landing-content">
      <div className="bg-grid" role="presentation" aria-hidden="true"></div>
      <div className="bg-glow" role="presentation" aria-hidden="true"></div>
      {renderView()}
    </div>
  );
};

export default LandingPage;
