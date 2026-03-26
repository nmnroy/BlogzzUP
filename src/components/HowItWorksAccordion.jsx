import React from 'react';

const AccordionItem = ({ stage, title, description, code, isOpen, onClick }) => (
  <div className={`accordion-container ${isOpen ? 'open' : ''}`} onClick={onClick}>
    <div className="accordion-header">
      <div className="accordion-header-left">
        <span className="accordion-badge">Stage {stage}</span>
        <span className="accordion-title">{title}</span>
      </div>
      <div className="accordion-icon">▼</div>
    </div>
    <div className="accordion-body">
      <div className="accordion-desc">{description}</div>
      <div className="accordion-code">{code}</div>
    </div>
  </div>
);

const HowItWorksAccordion = ({ onSignIn }) => {
  const [activeIdx, setActiveIdx] = React.useState(null);
  const items = [
    { stage: 1, title: 'Keyword Intent Analysis', description: 'Classify search intent. Extract primary keyword + 5 LSI keywords. Identify long-tail opportunities.', code: "Analyze the keyword '[KEYWORD]'. Classify intent as informational/commercial/navigational. List 5 semantically related LSI keywords. Identify 3 long-tail variations with estimated search volume > 500/mo." },
    { stage: 2, title: 'SERP Gap Identification', description: 'Compare top 10 results. Find gaps competitors miss. Flag snippet opportunities.', code: "Review the top 10 SERP results for '[KEYWORD]'. List subtopics covered by fewer than 3 results. Identify unanswered questions in PAA boxes. Flag 2 featured snippet opportunities." },
    { stage: 3, title: 'Content Brief Generation', description: 'Generate full H1/H2/H3 hierarchy, word count target, entity list, tone guidelines.', code: "Create a content brief for '[KEYWORD]'. Include: H1 + 5 H2s + H3s per section. Target word count: 1800-2400. Required NLP entities: [list]. Brand tone: [TONE]. Competitor differentiation: [GAP]." },
    { stage: 4, title: 'Structured Draft Writing', description: 'Write section by section using role-based prompting and brand voice.', code: "You are an expert SEO content writer for [NICHE] targeting [AUDIENCE] in India. Write section '[H2]' for the blog '[TITLE]'. Include primary keyword in first 100 words. Use transition sentences. Target Flesch score 65-75. Word count: [N] words." },
    { stage: 5, title: 'SEO Optimization Pass', description: 'Keyword density check, NLP entity injection, meta generation, internal link suggestions.', code: "Review the draft for '[TITLE]'. Check keyword density: target 1.5-2.5%. Inject missing NLP entities: [LIST]. Suggest 3 internal link anchors. Write meta title <60 chars with keyword. Write meta description <155 chars with CTA." },
    { stage: 6, title: 'GEO + Humanization Pass', description: 'Add local signals, vary sentence length, remove robotic patterns, target <5% AI detection.', code: "Optimize for [CITY/REGION]. Add location entities: [LIST]. Vary sentence length between 8-28 words. Replace robotic patterns. Add 2 rhetorical questions. Rewrite passive voice. Target Originality.ai score <5%." },
    { stage: 7, title: 'Schema + Snippet Structuring', description: 'Add FAQ and HowTo schema, format featured snippet answer block.', code: "Add JSON-LD FAQ schema for top 3 questions. Add HowTo schema if applicable. Format one section as a 40-60 word direct answer block for featured snippet. Suggest image alt text for 3 images." }
  ];

  return (
    <div className="accordion-section" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '8rem' }}>
      <h2 className="accordion-section-title">The 7-Stage Prompt Architecture</h2>
      <p className="accordion-subtitle">The exact prompt pipeline that turns a keyword into a ranking blog</p>
      {items.map((item, idx) => (
        <AccordionItem 
          key={idx} 
          {...item} 
          isOpen={activeIdx === idx} 
          onClick={() => setActiveIdx(activeIdx === idx ? null : idx)} 
        />
      ))}
      <div className="cta-bottom">
        <button className="btn btn-primary" onClick={onSignIn}>See the Engine in Action →</button>
      </div>
    </div>
  );
};

export default HowItWorksAccordion;
