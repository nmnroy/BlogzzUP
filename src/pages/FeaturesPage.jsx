import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { Sparkles } from 'lucide-react';

const FeaturesPage = () => {
  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#fff', margin: 0 }}>
          The Most Advanced <span style={{ background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SEO Engine.</span>
        </h1>
        <p style={{ color: '#94A3B8', marginTop: '12px', fontSize: '18px' }}>Everything you need to automate your organic growth.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <FeatureCard 
          icon="🧠" 
          title="7-Stage Prompt Architecture" 
          description="Our multi-stage pipeline converts any keyword into a full ranking blog. Each stage has a specific role — from intent analysis to schema injection." 
          bullets={["Keyword clustering + intent detection", "Role-based prompt templates", "Naturalness + humanization pass"]}
          mockUI={
            <div className="mock-ui-stages">
              {[ 'Intent Analysis', 'SERP Gap', 'Content Brief', 'Drafting', 'SEO Pass', 'Humanization', 'Schema' ].map((s, i) => (
                <div key={i} className="mock-stage"><span className="mock-stage-num">{i+1}</span> {s}</div>
              ))}
            </div>
          }
        />
        <FeatureCard 
          icon="🎙️" 
          title="Speak It. We Write It." 
          description="Record a 60-second voice note about your topic. BlogForge transcribes it, structures it, and outputs a full SEO-optimized blog post." 
          bullets={["Powered by OpenAI Whisper API", "Auto-structures your spoken ideas", "Full SEO pass on transcription"]}
          mockUI={
            <div style={{ textAlign: 'center' }}>
              <div className="mock-waveform-container">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="mock-wave-bar" style={{ animationDelay: `${(i % 5) * 0.2}s` }}></div>
                ))}
              </div>
              <div style={{ color: '#EF4444', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px' }}>● Recording... 0:23</div>
              <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>Generate Blog</button>
            </div>
          }
        />
        <FeatureCard 
          icon="🎯" 
          title="Your Voice. Every Post." 
          description="Paste 3 of your best blogs and BlogForge learns your writing style. Every generated post matches your tone, vocabulary, and structure." 
          bullets={["Trains on your existing content", "Tone consistency across all posts", "Customize formality level"]}
          mockUI={
            <div>
              <div className="mock-slider-track">
                <div className="mock-slider-thumb"></div>
              </div>
              <div className="mock-slider-labels">
                <span>Casual</span>
                <span>Formal</span>
              </div>
              <div className="mock-tone-tags">
                <span className="mock-tone-tag">Conversational</span>
                <span className="mock-tone-tag">Data-driven</span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default FeaturesPage;
