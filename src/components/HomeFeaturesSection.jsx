import React, { useState } from 'react';
import { PenTool, Network, Search, LineChart, UploadCloud, Mic, Sparkles } from 'lucide-react';

const HomeFeaturesSection = ({ onSignIn }) => {
  const [active, setActive] = useState('generator');
  
  const features = [
    { id: 'generator', icon: <PenTool size={20}/>, title: 'AI Blog Generator', desc: 'Generate 2,500+ word SEO-optimized articles in one click with real-time NLP suggestions.' },
    { id: 'cluster', icon: <Network size={20}/>, title: 'Cluster Map Planner', desc: 'Visually map out your pillar pages and topic clusters to build topical authority.' },
    { id: 'serp', icon: <Search size={20}/>, title: 'SERP Gap Scanner', desc: 'Analyze the top 10 search results to instantly find missing topics and keyword gaps.' },
    { id: 'seo', icon: <LineChart size={20}/>, title: 'Live SEO Scorer', desc: 'Get a real-time out-of-100 score on readability, keyword density, and snippet targeting.' },
    { id: 'publish', icon: <UploadCloud size={20}/>, title: 'Auto-Publisher', desc: 'Connect directly to WordPress, Webflow, or Shopify to automate your entire pipeline.' },
    { id: 'voice', icon: <Mic size={20}/>, title: 'Brand Voice Control', desc: 'Train the AI on your exact tone of voice, target audience, and negative keywords.' }
  ];

  const renderMockup = (id) => {
    switch(id) {
      case 'generator':
        return (
          <div style={{display:'flex', gap:'12px', width:'100%', height:'100%', padding:'16px', boxSizing:'border-box', background:'#111827', borderRadius:'0 0 16px 16px'}}>
             <div style={{flex: 1, display:'flex', flexDirection:'column', gap:'12px'}}>
               <div>
                 <div style={{fontSize:'11px', color:'#94A3B8', marginBottom:'4px'}}>Target Keyword</div>
                 <div style={{background:'#1E293B', padding:'8px 12px', borderRadius:'6px', color:'white', fontSize:'12px', border:'1px solid rgba(255,255,255,0.05)'}}>SaaS Marketing Strategies</div>
               </div>
               <div>
                 <div style={{fontSize:'11px', color:'#94A3B8', marginBottom:'4px'}}>Tone of Voice</div>
                 <div style={{background:'#1E293B', padding:'8px 12px', borderRadius:'6px', color:'white', fontSize:'12px', border:'1px solid rgba(255,255,255,0.05)'}}>Authoritative & Actionable</div>
               </div>
               <button onClick={onSignIn} style={{marginTop:'auto', background:'linear-gradient(135deg, #7C3AED, #5B21B6)', color:'white', border:'none', padding:'10px', borderRadius:'6px', fontSize:'12px', cursor:'pointer', fontWeight:'bold'}}>Generate Blog →</button>
             </div>
             <div style={{flex: 1.5, background:'#0F172A', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'8px', padding:'12px', position:'relative', overflow:'hidden'}}>
               <div style={{width:'70%', height:'14px', background:'#334155', borderRadius:'4px', marginBottom:'12px'}}></div>
               <div style={{width:'100%', height:'8px', background:'#1E293B', borderRadius:'4px', marginBottom:'8px'}}></div>
               <div style={{width:'90%', height:'8px', background:'#1E293B', borderRadius:'4px', marginBottom:'8px'}}></div>
               <div style={{width:'95%', height:'8px', background:'#1E293B', borderRadius:'4px', marginBottom:'16px'}}></div>
               <div style={{position:'absolute', bottom:0, left:0, right:0, height:'40px', background:'linear-gradient(to top, #0F172A, transparent)'}}></div>
               <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', background:'rgba(16,185,129,0.2)', color:'#10B981', padding:'4px 12px', borderRadius:'12px', fontSize:'10px', fontWeight:'bold', border:'1px solid rgba(16,185,129,0.3)'}}>Processing AI Generation...</div>
             </div>
          </div>
        );
      case 'cluster':
        return (
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', background:'#111827', position:'relative', borderRadius:'0 0 16px 16px', flex:1}}>
             <div style={{position:'absolute', width:'100px', height:'2px', background:'#334155', zIndex:1}}></div>
             <div style={{position:'absolute', width:'2px', height:'80px', background:'#334155', zIndex:1, left:'65%'}}></div>
             <div style={{zIndex:2, background:'#5B21B6', padding:'10px 16px', borderRadius:'8px', color:'white', fontSize:'12px', fontWeight:'bold', marginRight:'120px', boxShadow:'0 0 15px rgba(124,58,237,0.4)'}}>Pillar: SEO Strategy</div>
             <div style={{display:'flex', flexDirection:'column', gap:'16px', zIndex:2}}>
                <div style={{background:'#1E293B', border:'1px solid #334155', padding:'8px 12px', borderRadius:'6px', color:'#E2E8F0', fontSize:'11px'}}>Technical SEO Tips</div>
                <div style={{background:'#1E293B', border:'1px solid #334155', padding:'8px 12px', borderRadius:'6px', color:'#E2E8F0', fontSize:'11px'}}>Backlink Outreach</div>
             </div>
          </div>
        );
      case 'serp':
        return (
          <div style={{width:'100%', height:'100%', background:'#111827', padding:'16px', boxSizing:'border-box', borderRadius:'0 0 16px 16px', flex:1}}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 2fr 1fr', gap:'8px', color:'#94A3B8', fontSize:'10px', borderBottom:'1px solid #334155', paddingBottom:'8px', marginBottom:'8px'}}>
               <div>COMPETITOR</div><div>IDENTIFIED GAP</div><div>OPPORTUNITY</div>
            </div>
            {[
              {domain:'hubspot.com', gap:'Programmatic SEO execution', opp:'High'},
              {domain:'ahrefs.com', gap:'AI content safeguards', opp:'Medium'},
            ].map(row => (
              <div key={row.domain} style={{display:'grid', gridTemplateColumns:'1fr 2fr 1fr', gap:'8px', color:'white', fontSize:'11px', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                 <div style={{color:'#A78BFA'}}>{row.domain}</div>
                 <div>{row.gap}</div>
                 <div><span style={{background:'rgba(16,185,129,0.1)', color:'#10B981', padding:'2px 6px', borderRadius:'4px'}}>{row.opp}</span></div>
              </div>
            ))}
            <button onClick={onSignIn} style={{width:'100%', marginTop:'12px', background:'#1E293B', border:'1px dashed #334155', padding:'8px', color:'#A78BFA', fontSize:'11px', borderRadius:'6px', cursor:'pointer'}}>Scan New Seed Keyword</button>
          </div>
        );
      case 'seo':
        return (
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'32px', width:'100%', height:'100%', background:'#111827', padding:'20px', boxSizing:'border-box', borderRadius:'0 0 16px 16px', flex:1}}>
             <div style={{position:'relative', width:'100px', height:'100px', borderRadius:'50%', background:'conic-gradient(#10B981 92%, #1E293B 0)', display:'flex', alignItems:'center', justifyContent:'center'}}>
               <div style={{position:'absolute', inset:'8px', background:'#111827', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                 <span style={{fontSize:'24px', fontWeight:'bold', color:'white'}}>92</span>
                 <span style={{fontSize:'9px', color:'#94A3B8'}}>SCORE</span>
               </div>
             </div>
             <div style={{display:'flex', flexDirection:'column', gap:'12px', flex:1}}>
               <div>
                 <div style={{display:'flex', justifyContent:'space-between', fontSize:'10px', color:'#94A3B8', marginBottom:'4px'}}><span>Readability</span><span>Great</span></div>
                 <div style={{height:'6px', background:'#1E293B', borderRadius:'3px'}}><div style={{width:'85%', height:'100%', background:'#10B981', borderRadius:'3px'}}></div></div>
               </div>
               <div>
                 <div style={{display:'flex', justifyContent:'space-between', fontSize:'10px', color:'#94A3B8', marginBottom:'4px'}}><span>Keyword Density</span><span>1.2%</span></div>
                 <div style={{height:'6px', background:'#1E293B', borderRadius:'3px'}}><div style={{width:'100%', height:'100%', background:'#10B981', borderRadius:'3px'}}></div></div>
               </div>
               <div>
                 <div style={{display:'flex', justifyContent:'space-between', fontSize:'10px', color:'#94A3B8', marginBottom:'4px'}}><span>Target Snippets</span><span>Missing</span></div>
                 <div style={{height:'6px', background:'#1E293B', borderRadius:'3px'}}><div style={{width:'40%', height:'100%', background:'#F59E0B', borderRadius:'3px'}}></div></div>
               </div>
             </div>
          </div>
        );
      case 'publish':
        return (
          <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'16px', width:'100%', height:'100%', background:'#111827', borderRadius:'0 0 16px 16px', flex:1}}>
             <div style={{width:'50px', height:'50px', background:'#5B21B6', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}><Sparkles size={24}/></div>
             <div style={{display:'flex', gap:'4px'}}>
               <div style={{width:'6px', height:'6px', background:'#334155', borderRadius:'50%'}}></div>
               <div style={{width:'6px', height:'6px', background:'#334155', borderRadius:'50%'}}></div>
               <div style={{width:'6px', height:'6px', background:'#334155', borderRadius:'50%'}}></div>
             </div>
             <div style={{background:'#1E293B', border:'1px solid rgba(16,185,129,0.3)', width:'60px', height:'60px', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'30px', position:'relative'}}>
                <img src="https://cdn.simpleicons.org/wordpress/white" width="30" alt="WP" />
                <div style={{position:'absolute', top:'-6px', right:'-6px', background:'#10B981', color:'white', fontSize:'8px', padding:'2px 4px', borderRadius:'4px', fontWeight:'bold'}}>Synced</div>
             </div>
          </div>
        );
      case 'voice':
        return (
          <div style={{display:'flex', flexDirection:'column', gap:'12px', width:'100%', height:'100%', background:'#111827', padding:'20px', boxSizing:'border-box', borderRadius:'0 0 16px 16px', flex:1}}>
            <textarea readOnly style={{width:'100%', flex:1, background:'#0F172A', border:'1px solid #334155', borderRadius:'8px', color:'#A78BFA', padding:'12px', fontSize:'11px', resize:'none', outline:'none', fontFamily:'monospace'}} value="CORE_DIRECTIVE: Always maintain a professional yet engaging tone. Avoid jargon where possible. Refer to the reader as 'you'." />
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontSize:'11px', color:'#94A3B8'}}>Creativity Temperature: <span style={{color:'white'}}>1.0</span></div>
              <div style={{background:'rgba(124,58,237,0.1)', color:'#A78BFA', padding:'4px 8px', borderRadius:'4px', fontSize:'10px', border:'1px solid rgba(124,58,237,0.3)'}}>Active Profile</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container" style={{padding: '8rem 0'}}>
      <div style={{textAlign: 'center', marginBottom: '4rem'}}>
        <h2 style={{fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1rem'}}>Everything you need to <span className="title-accent-violet">dominate search.</span></h2>
        <p style={{color: '#94A3B8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>Navigate through all our core modules natively right here.</p>
      </div>
      
      <div style={{display: 'flex', flexDirection: window.innerWidth <= 768 ? 'column' : 'row', gap: '2rem', background: '#0D1526', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2rem'}}>
        {/* Sidebar Toolbar */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px', borderRight: window.innerWidth <= 768 ? 'none' : '1px solid rgba(255,255,255,0.05)', borderBottom: window.innerWidth <= 768 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingRight: window.innerWidth <= 768 ? '0' : '2rem', paddingBottom: window.innerWidth <= 768 ? '2rem' : '0', minWidth: '280px'}}>
          {features.map(f => (
            <button key={f.id} onClick={() => setActive(f.id)} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px',
              background: active === f.id ? 'rgba(124,58,237,0.1)' : 'transparent',
              border: active === f.id ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
              color: active === f.id ? 'white' : '#94A3B8',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', width: '100%'
            }}>
              <div style={{color: active === f.id ? '#A78BFA' : '#64748B', display: 'flex'}}>{f.icon}</div>
              <span style={{fontWeight: 600, fontSize: '15px'}}>{f.title}</span>   
            </button>
          ))}
        </div>
        
        {/* Right Panel Display */}
        <div style={{flex: 1, padding: window.innerWidth <= 768 ? '0' : '1rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '350px'}}>
           {features.map(f => (
             <div key={f.id} style={{display: active === f.id ? 'flex' : 'none', animation: 'fadeIn 0.4s ease forwards', height: '100%', flexDirection: 'column'}}>
               <h3 style={{fontSize: '2rem', color: 'white', marginBottom: '1rem'}}>{f.title}</h3>
               <p style={{color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem'}}>{f.desc}</p>
               
               <div style={{background: '#141B2D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', minHeight: '260px'}}>
                  <div style={{height: '40px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '6px', width: '100%', boxSizing: 'border-box'}}>
                    <div style={{width: 10, height: 10, borderRadius: '50%', background: '#EF4444'}}></div>
                    <div style={{width: 10, height: 10, borderRadius: '50%', background: '#F59E0B'}}></div>
                    <div style={{width: 10, height: 10, borderRadius: '50%', background: '#10B981'}}></div>
                    <div style={{marginLeft: 'auto', fontSize: '10px', color: '#64748B', fontFamily: 'monospace'}}>blogforge.ai/dash/{f.id}</div>
                  </div>
                  {renderMockup(f.id)}
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFeaturesSection;
