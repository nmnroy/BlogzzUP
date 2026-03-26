import React, { useState } from 'react';

const DemoPage = ({ onSignIn }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedMeta, setTypedMeta] = useState('');
  const [typedPara, setTypedPara] = useState('');

  const fullTitle = "Top 10 AI Tools for Indian Startups in 2026 — Ranked by ROI";
  const fullMeta = "Discover the best AI tools Indian startups are using to cut costs, automate workflows, and grow 10x faster. Ranked by real ROI data from 500+ founders.";
  const fullPara = "India's startup ecosystem is moving fast — and AI tools are the new competitive edge. From automating customer support to generating SEO content at scale, the right AI stack can save an early-stage startup lakhs of rupees every month. In this guide, we've ranked the top 10 AI tools actually being used by Indian founders in 2026, based on ROI data collected from over 500 startups.";

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setShowResults(true);
    setTypedTitle('');
    setTypedMeta('');
    setTypedPara('');

    let titleIdx = 0;
    let metaIdx = 0;
    let paraIdx = 0;

    const typePara = () => {
      if (paraIdx < fullPara.length) {
        setTypedPara(fullPara.substring(0, paraIdx + 1));
        paraIdx++;
        setTimeout(typePara, 15);
      } else {
        setIsGenerating(false);
      }
    };

    const typeMeta = () => {
      if (metaIdx < fullMeta.length) {
        setTypedMeta(fullMeta.substring(0, metaIdx + 1));
        metaIdx++;
        setTimeout(typeMeta, 15);
      } else {
        setTimeout(typePara, 200);
      }
    };

    const typeTitle = () => {
      if (titleIdx < fullTitle.length) {
        setTypedTitle(fullTitle.substring(0, titleIdx + 1));
        titleIdx++;
        setTimeout(typeTitle, 15);
      } else {
        setTimeout(typeMeta, 200);
      }
    };

    typeTitle();
  };

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#fff', margin: 0 }}>Try BlogForge AI Live</h1>
        <p style={{ color: '#94A3B8', marginTop: '12px', fontSize: '18px' }}>No signup required. See the engine work in real time.</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', background: '#0D1526', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
            <div style={{ padding: '14px 20px', background: '#080E1C', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginLeft: '8px' }}>BlogForge AI — Content Engine</div>
            </div>
            
            <div style={{ display: 'flex', height: '480px' }}>
              <div style={{ width: '160px', background: '#080E1C', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '16px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: 600, marginBottom: '20px' }}>⚡ BlogForge</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#64748B', cursor: 'pointer' }}>+ New Project</div>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#64748B', cursor: 'pointer' }}>📄 My Documents</div>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#64748B', cursor: 'pointer' }}>🗺️ Cluster Map</div>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#64748B', cursor: 'pointer' }}>📅 Content Calendar</div>
                  <div style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#64748B', cursor: 'pointer' }}>⚙️ Settings</div>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '999px', padding: '4px 10px', fontSize: '11px', marginBottom: '6px', display: 'block' }}>● SEO Optimizer</span>
                  <span style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '999px', padding: '4px 10px', fontSize: '11px', display: 'block' }}>● Auto Publisher</span>
                </div>
              </div>

              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#0D1526' }}>
                <div style={{ alignSelf: 'flex-end', background: '#7C3AED', color: '#fff', padding: '10px 16px', borderRadius: '18px 18px 4px 18px', maxWidth: '75%', fontSize: '13px', lineHeight: 1.5 }}>
                  Write an SEO blog about AI tools for Indian startups
                </div>
                <div style={{ alignSelf: 'flex-start', background: '#141B2D', color: '#94A3B8', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', maxWidth: '85%', fontSize: '13px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                  Analyzing SERP gap... Found 3 low-competition keywords ✓<br/>
                  Clustering topics... Done ✓<br/>
                  Drafting blog with 94% SEO score... ✓<br/>
                  Generating featured snippet structure... ✓
                </div>
                <div style={{ alignSelf: 'flex-end', background: '#7C3AED', color: '#fff', padding: '10px 16px', borderRadius: '18px 18px 4px 18px', maxWidth: '75%', fontSize: '13px', lineHeight: 1.5 }}>
                  Optimize for GEO — target Delhi and Bangalore
                </div>
                <div style={{ alignSelf: 'flex-start', background: '#141B2D', color: '#94A3B8', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', maxWidth: '85%', fontSize: '13px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                  Adding location-specific entities... ✓<br/>
                  Injecting local search modifiers... ✓<br/>
                  Applying regional schema markup... ✓<br/>
                  Your blog is ready to publish!
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ flex: '1 1 40%', background: '#080E1C', borderLeft: '1px solid rgba(124,58,237,0.15)', padding: '28px', display: 'flex', flexDirection: 'column', minWidth: '250px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '20px' }}>Live SEO Score</div>
            
            <div style={{ margin: '0 auto 24px', width: '100px', height: '100px', position: 'relative', borderRadius: '50%', background: 'conic-gradient(#7C3AED 0% 94%, #1E293B 94% 100%)' }}>
              <div style={{ position: 'absolute', top: '8px', left: '8px', width: '84px', height: '84px', background: '#080E1C', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>94</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>/100</div>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#10B981', textAlign: 'center', marginTop: '-16px', marginBottom: '24px' }}>Excellent</div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                ["Keyword Density", "1.8% ✓"],
                ["Readability", "78/100 ✓"],
                ["AI Detection", "3% ✓"],
                ["Snippet Ready", "Yes ✓"],
                ["Featured Snippet", "Eligible ✓"]
              ].map((metric, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '13px' }}>
                  <span style={{ color: '#94A3B8' }}>{metric[0]}</span>
                  <span style={{ color: '#10B981', fontWeight: 500 }}>{metric[1]}</span>
                </div>
              ))}
            </div>

            <button onClick={onSignIn} style={{ marginTop: 'auto', width: '100%', background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', color: '#fff', borderRadius: '10px', padding: '13px', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
              Generate Full Blog →
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '64px' }}>
        <h2 style={{ fontSize: '32px', color: '#fff', textAlign: 'center', margin: 0, fontWeight: 700 }}>Try It Yourself</h2>
        <p style={{ color: '#94A3B8', textAlign: 'center', marginBottom: '32px', marginTop: '12px' }}>Enter any keyword and watch the AI work</p>
        
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Enter a keyword, e.g. AI tools for startups..." style={{ flex: 1, background: '#141B2D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 20px', color: '#fff', fontSize: '15px' }} />
          <button onClick={handleGenerate} style={{ background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', color: '#fff', borderRadius: '12px', padding: '14px 24px', fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Generate →
          </button>
        </div>

        {showResults && (
          <div style={{ maxWidth: '600px', margin: '20px auto 0', background: '#141B2D', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>📌 Blog Title</div>
            <div style={{ fontSize: '18px', color: '#fff', fontWeight: 600, marginBottom: '20px', minHeight: '27px' }}>{typedTitle}</div>
            
            <div style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>📝 Meta Description</div>
            <div style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '20px', minHeight: '42px' }}>{typedMeta}</div>
            
            <div style={{ fontSize: '11px', color: '#7C3AED', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>✍️ First Paragraph</div>
            <div style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.7, minHeight: '100px' }}>{typedPara}</div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '64px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#94A3B8' }}>Ready for the real thing?</p>
        <button onClick={onSignIn} style={{ background: 'linear-gradient(135deg,#7C3AED,#9333EA)', color: '#fff', borderRadius: '999px', padding: '14px 32px', fontSize: '16px', fontWeight: '600', border: 'none', cursor: 'pointer', marginTop: '16px' }}>
          Start Free — First Month on Us →
        </button>
      </div>
    </div>
  );
};

export default DemoPage;
