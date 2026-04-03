# Recent Features Export

This document contains the isolated code blocks for the three recent features you requested. You can copy and paste these directly into your other repository.

---

## 1. GenZ Tone Feature

### A. CSS Styles (add to your global CSS, e.g., `index.css`)
```css
@keyframes genz-border {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* =============================================
   GENZ TONE CARD - SPECIAL STYLING
   ============================================= */

/* GenZ card gradient border animation */
[class*="toneCard"][class*="genz"],
[class*="tone-card"][class*="genz"],
[class*="genzCard"],
[class*="genz-card"] {
  position: relative !important;
  background: transparent !important;
  border: none !important;
  padding: 2px !important;
  border-radius: 12px !important;
}

/* Rainbow gradient hover on GenZ card */
[class*="toneCard"][class*="genz"]:hover,
[class*="genzCard"]:hover {
  transform: translateY(-4px) scale(1.02) !important;
  box-shadow: 
    0 8px 32px rgba(199, 125, 255, 0.3),
    0 0 0 1px rgba(255, 107, 107, 0.3) !important;
}

/* GenZ card when selected */
[class*="toneCard"][class*="genz"][class*="active"],
[class*="genzCard"][class*="selected"] {
  animation: genz-border 3s ease infinite !important;
}

/* Pulse effect on GenZ card */
[class*="genzCard"]::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  background: linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF, #C77DFF);
  background-size: 300% 300%;
  animation: genz-border 3s ease infinite;
  z-index: -1;
  opacity: 0.6;
}

/* Light mode GenZ card */
[data-theme="light"] [class*="genzCard"],
[data-theme="light"] [class*="toneCard"][class*="genz"] {
  box-shadow: 0 4px 20px rgba(199, 125, 255, 0.15) !important;
}

/* Dark mode GenZ extra glow */
[data-theme="dark"] [class*="genzCard"]:hover,
[data-theme="dark"] [class*="toneCard"][class*="genz"]:hover {
  box-shadow: 
    0 8px 40px rgba(199, 125, 255, 0.4),
    0 0 60px rgba(255, 107, 107, 0.15) !important;
}
```

### B. React UI component (Toast function)
*(Place this before your React component returning the UI)*
```javascript
const showGenZToast = () => {
  const existing = document.getElementById('genz-activation-toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.id = 'genz-activation-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%) translateY(0px);
    background: linear-gradient(135deg, #FF6B6B, #FFD93D, #C77DFF);
    background-size: 200%;
    animation: genz-border 2s ease infinite;
    color: white;
    padding: 12px 24px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 700;
    z-index: 9999;
    box-shadow: 0 8px 32px rgba(199, 125, 255, 0.5);
    white-space: nowrap;
    letter-spacing: 0.3px;
  `;
  toast.textContent = '⚡ GenZ Mode activated — no cap fr fr 🔥';
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
};
```

### C. JSX Code for the GenZ Button
```jsx
<label
  key="genz"
  className={`be-tone-card genz-card${tone === 'genz' ? ' selected' : ''}`}
  style={{
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    gridColumn: 'span 2',
    padding: 0,
    border: 'none',
    background: 'none'
  }}
>
  <input
    type="radio" name="tone" value="genz"
    checked={tone === 'genz'}
    onChange={() => {
      setTone('genz');
      showGenZToast();
    }}
    className="sr-only"
  />
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF, #C77DFF)',
    backgroundSize: '300% 300%',
    animation: 'genz-border 3s ease infinite',
    borderRadius: 'inherit',
    zIndex: 0,
    padding: '2px'
  }}/>
  <div style={{
    position: 'relative',
    zIndex: 1,
    background: tone === 'genz' ? 'transparent' : 'var(--color-bg-card, #141B2D)',
    borderRadius: 'inherit',
    padding: '12px 16px',
    height: '100%',
    boxSizing: 'border-box'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
      <span style={{ fontSize: '20px' }}>⚡</span>
      <span style={{
        fontWeight: 700,
        fontSize: '15px',
        background: 'linear-gradient(135deg, #FF6B6B, #FFD93D, #C77DFF)',
        backgroundSize: '200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'genz-border 2s ease infinite'
      }}>
        GenZ Mode 🔥
      </span>
      <span style={{
        fontSize: '10px',
        background: 'linear-gradient(135deg, #FF6B6B, #C77DFF)',
        color: 'white',
        borderRadius: '999px',
        padding: '2px 8px',
        fontWeight: 700,
        WebkitTextFillColor: 'white'
      }}>NEW</span>
    </div>
    <span style={{ fontSize: '13px', color: tone === 'genz' ? 'white' : '#94A3B8' }}>
      No cap, hits different fr fr ✨
    </span>
  </div>
</label>
```

---

## 2. Billing / Pricing Updation
*The key fix here was moving the `.pc-most-pop` structural layout so it wouldn't clip outside the boundaries on varying screen sizes and applying Ivory gold properties natively.*

### A. Pricing Growth Component
```jsx
{/* Growth */}
<div className="pc-card popular">
  <div className="pc-most-pop">Most Popular</div>
  <h3 className="pc-header">Growth</h3>
  <div className="pc-price-wrap">
    <span className="pc-price">{annualBilling ? '₹41,990' : '₹4,999'}</span>
    <span className="pc-per">{annualBilling ? '/year' : '/month'}</span>
  </div>
  <p className="pc-desc" style={{margin: '32px 0 24px'}}>For startups replacing their marketing team</p>
  <div className="pc-divider"></div>
  <ul className="pc-feat-list">
    <div style={{fontSize: '14px', color: '#fff', fontWeight: 600, padding: '6px 0'}}>✓ Everything in Starter</div>
    <li className="pc-feat"><span className="pc-feat-check">✓</span> 50 SEO blogs / month</li>
    <li className="pc-feat"><span className="pc-feat-check">✓</span> GEO Optimization Engine</li>
    <li className="pc-feat"><span className="pc-feat-check">✓</span> Content Cluster Map (unlimited)</li>
    <li className="pc-feat"><span className="pc-feat-check">✓</span> Social Repurpose Engine</li>
    <li className="pc-feat"><span className="pc-feat-check">✓</span> Voice-to-Blog (10/month)</li>
    <li className="pc-feat"><span className="pc-feat-check">✓</span> ROI & Traffic Tracker</li>
    <li className="pc-feat"><span className="pc-feat-check">✓</span> Priority support</li>
  </ul>
  <button className="pc-btn-solid" onClick={() => window.showPage('auth')}>Get Started →</button>
</div>
```

---

## 3. Light Theme Global Fixes
*Add this to your global CSS stylesheet to handle the "Ivory & Gold" comprehensive light mode layout changes across standard dashboard elements and form UI.*

```css
/* High fidelity Light mode overrides for structural elements */
[data-theme="light"] {
  --color-bg-base: #FFFFFF !important;
  --color-bg-panel: #F8F9FA !important;
  --color-bg-card: #FFFFFF !important;
  --text-primary: #1E293B !important;
  --text-secondary: #475569 !important;
  --text-subtle: #64748B !important;
  --border-subtle: rgba(0, 0, 0, 0.1) !important;
  --color-primary-400: #C4974A !important;
  --color-primary-500: #8B7355 !important;
}

[data-theme="light"] body {
  background-color: #FAFAFA !important;
  color: #1E293B !important;
}

/* Light Theme Card Borders and Text Colors */
[data-theme="light"] .form-input,
[data-theme="light"] .form-textarea,
[data-theme="light"] select {
  background-color: #FFFFFF !important;
  border-color: rgba(0,0,0,0.15) !important;
  color: #1E293B !important;
}

[data-theme="light"] .form-input:focus,
[data-theme="light"] .form-textarea:focus {
  border-color: #C4974A !important;
  box-shadow: 0 0 0 2px rgba(196, 151, 74, 0.2) !important;
}

[data-theme="light"] .pc-card {
  background: #FFFFFF !important;
  border: 1px solid rgba(139, 115, 85, 0.3) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05) !important;
}

[data-theme="light"] .pc-card.popular {
  background: linear-gradient(135deg, #FDFDFD, #F9F6F0) !important;
  border: 1px solid rgba(196, 151, 74, 0.8) !important;
}

[data-theme="light"] .pc-most-pop {
  background: linear-gradient(135deg, #C4974A, #8B7355) !important;
  color: #FFFFFF !important;
}

[data-theme="light"] .pc-header,
[data-theme="light"] .pc-price {
  color: #2C1A0E !important;
}
```
