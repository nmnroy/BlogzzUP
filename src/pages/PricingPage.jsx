import React, { useState } from 'react';

const PricingPage = ({ onSignIn }) => {
  const [annualBilling, setAnnualBilling] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "Is there a free trial?", a: "Yes. The Starter plan is free for your first month — no credit card required. You get full access to all Starter features for 30 days." },
    { q: "Can I cancel anytime?", a: "Absolutely. Cancel with one click from your dashboard. No cancellation fees, no questions asked." },
    { q: "Do I own the content BlogForge generates?", a: "100%. All content generated and published through BlogForge belongs entirely to you." },
    { q: "Which CMS platforms are supported?", a: "WordPress, Webflow, Shopify, Ghost, Strapi, Sanity, and any platform via custom webhook." },
    { q: "How is this different from ChatGPT?", a: "ChatGPT is a general AI. BlogForge is a purpose-built SEO engine — it clusters keywords, analyzes SERPs, scores content in real time, and auto-publishes. ChatGPT can't do any of that." },
    { q: "What is GEO Optimization?", a: "GEO (Generative Engine Optimization) structures your content to rank both in Google and in AI answer engines like ChatGPT, Perplexity, and Gemini." },
    { q: "How does auto-publishing work?", a: "Connect your CMS once via API. BlogForge generates, schedules, and publishes blogs automatically at your set frequency — no manual steps." },
    { q: "Is the content SEO-optimized?", a: "Yes. Every post is scored across 10 metrics including keyword density, readability, snippet eligibility, and AI detection before it ever gets published." },
    { q: "Can my team use one account?", a: "The Growth and Scale plans include shared team access. You can invite members and assign roles from your dashboard." },
    { q: "Is there a white-label option?", a: "Yes, available on the Scale plan. Contact our sales team for details." }
  ];

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#fff', margin: 0 }}>
          Simple Pricing. <span style={{ background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Serious Results.</span>
        </h1>
        <p style={{ color: '#94A3B8', marginTop: '12px', fontSize: '18px' }}>Start free. Upgrade when you're ready. Cancel anytime.</p>
      </div>

      <div className="pricing-toggle">
        <div className="pt-container">
          <button 
            onClick={() => setAnnualBilling(false)}
            className={`pt-btn ${!annualBilling ? 'active' : 'inactive'}`}
          >Monthly</button>
          <button 
            onClick={() => setAnnualBilling(true)}
            className={`pt-btn ${annualBilling ? 'active' : 'inactive'}`}
          >Yearly (Save 30%)</button>
        </div>
      </div>

      <div className="pricing-grid-3">
        {/* Starter */}
        <div className="pc-card">
          <h3 className="pc-header">Starter</h3>
          <div className="pc-price-wrap">
            <span className="pc-price">{annualBilling ? '₹16,790' : '₹1,999'}</span>
            <span className="pc-per">{annualBilling ? '/year' : '/month'}</span>
          </div>
          <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>(First month free)</div>
          <p className="pc-desc">For early-stage startups building organic presence</p>
          <div className="pc-divider"></div>
          <ul className="pc-feat-list">
            <li className="pc-feat"><span className="pc-feat-check">✓</span> 15 SEO blogs / month</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> Real-time SEO Scorer</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> Auto-publish to 1 website</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> SERP Gap Scanner (5/month)</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> Content Calendar</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> Email support</li>
          </ul>
          <button className="pc-btn-outline" onClick={onSignIn}>Start Free →</button>
        </div>

        {/* Growth */}
        <div className="pc-card popular">
          <div className="pc-most-pop">Most Popular</div>
          <h3 className="pc-header">Growth</h3>
          <div className="pc-price-wrap">
            <span className="pc-price">{annualBilling ? '₹41,990' : '₹4,999'}</span>
            <span className="pc-per">{annualBilling ? '/year' : '/month'}</span>
          </div>
          <p className="pc-desc" style={{ margin: '32px 0 24px' }}>For startups replacing their marketing team</p>
          <div className="pc-divider"></div>
          <ul className="pc-feat-list">
            <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, padding: '6px 0' }}>✓ Everything in Starter</div>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> 50 SEO blogs / month</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> GEO Optimization Engine</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> Content Cluster Map (unlimited)</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> Social Repurpose Engine</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> Voice-to-Blog (10/month)</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> ROI & Traffic Tracker</li>
            <li className="pc-feat"><span className="pc-feat-check">✓</span> Priority support</li>
          </ul>
          <button className="pc-btn-solid" onClick={onSignIn}>Get Started →</button>
        </div>

        {/* Scale */}
        <div className="pc-card">
          <h3 className="pc-header">Scale</h3>
          <div className="pc-price-wrap">
            <span className="pc-price">Custom</span>
          </div>
          <p className="pc-desc" style={{ margin: '48px 0 24px' }}>For agencies and high-growth teams</p>
          <div className="pc-divider"></div>
          <ul className="pc-feat-list">
             <li className="pc-feat"><span className="pc-feat-check">✓</span> Unlimited blogs</li>
             <li className="pc-feat"><span className="pc-feat-check">✓</span> Multi-website support</li>
             <li className="pc-feat"><span className="pc-feat-check">✓</span> Custom brand voice training</li>
             <li className="pc-feat"><span className="pc-feat-check">✓</span> Full API access</li>
             <li className="pc-feat"><span className="pc-feat-check">✓</span> White-label option</li>
             <li className="pc-feat"><span className="pc-feat-check">✓</span> Dedicated onboarding</li>
             <li className="pc-feat"><span className="pc-feat-check">✓</span> SLA + Priority support</li>
             <li className="pc-feat"><span className="pc-feat-check">✓</span> Advanced analytics</li>
          </ul>
          <button className="pc-btn-outline-cyan">Contact Sales →</button>
        </div>
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '13px', color: '#64748B' }}>
        🔒 No credit card required · Cancel anytime · SOC2 Compliant · Used by 500+ Indian startups
      </div>

      <div className="faq-accordion" style={{ marginTop: '80px', maxWidth: '800px', margin: '80px auto 0' }}>
        <h2 style={{ fontSize: '32px', color: '#fff', textAlign: 'center', marginBottom: '32px', fontWeight: 700 }}>Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
           <div 
             key={i} 
             onClick={() => setActiveFaq(activeFaq === i ? null : i)}
             className={`accordion-container ${activeFaq === i ? 'open' : ''}`}
           >
             <div className="accordion-header">
               <span className="accordion-title">{faq.q}</span>
               <span className="accordion-icon">▼</span>
             </div>
             <div className="accordion-body">
               <div className="accordion-answer">{faq.a}</div>
             </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
