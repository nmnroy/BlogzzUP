import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Terminal, Code2, CheckCircle2, Loader2 } from 'lucide-react';
import './PromptArchitecture.css';

const stages = [
  {
    id: 1,
    title: "Keyword Intent Analysis",
    description: "Parse raw keyword, identify search intent (informational/commercial), cluster related long-tails.",
    prompt: `[System] You are an expert SEO data strategist.
[User] Analyze the raw keyword: "best AI blog tools India 2026".
1. Determine Primary Search Intent
2. Identify Secondary Keywords (LSI)
3. Extract Target Audience Persona
4. Output as strict JSON.`,
    output: `{
  "intent": "Informational/Commercial Investigation",
  "audience": "Marketing Managers, Startup Founders in India",
  "lsis": ["content automation", "SEO writing software", "AI blog generator", "Indic language support"]
}`
  },
  {
    id: 2,
    title: "SERP Gap Identification",
    description: "Compare top 10 results, find content gaps, identify featured snippet opportunities.",
    prompt: `[System] Provide a SERP Gap Analysis.
[Context] Live Top 10 ranking URLs for "best AI blog tools India 2026".
[User] Identify information missing from the top 10 results. What specific H2/H3 headings would satisfy user queries that competitors missed? Format to win the snippet.`,
    output: `Missing Context Identified:
- Pricing comparison charts (INR ₹)
- "Made in India" vs Global tools
- Native CMS integration support (WordPress/Shopify)

Recommended Snippet Target:
[H2] What are the top AI blogging tools in India?
[List] 1. BlogForge AI 2. Jasper 3. Copy.ai 4. Writesonic`
  },
  {
    id: 3,
    title: "Content Brief Generation",
    description: "Create H1, H2, H3 hierarchy, word count target, entity list, competitor differentiators.",
    prompt: `[System] Generate an SEO-optimized Content Brief.
[Data] Keyword: "best AI blog tools India 2026"
[Data] Gaps: INR pricing, CMS integrations
[User] Build a hierarchical outline (H1, H2, H3). Include target word count and primary NLP entities to include.`,
    output: `TARGET METRICS:
Word Count: 1,800 - 2,200 words
Primary Entities: LLM, WordPress, SEO Score, ROI, Startups, Bangalore

OUTLINE:
H1: 7 Best AI Blog Tools for Indian Startups in 2026 (Ranked & Reviewed)
 H2: Why Traditional Content Writing is Dead
 H2: The Top AI Content Generators available in India
  H3: 1. BlogForge AI (Best Automated SEO)
  H3: 2. Writesonic (Best for Short-Form)
 H2: Pricing Comparison (INR)`
  },
  {
    id: 4,
    title: "Structured Draft",
    description: "Write section by section using role-based prompting (expert SEO writer for [niche]).",
    prompt: `[System] You are a highly sought-after tech journalist and SEO expert in India.
[Task] Draft the section "H3: 1. BlogForge AI" from the brief.
[Constraints] Use short paragraphs, active voice, bullet points. No fluff. Do not hallucinate features.`,
    output: `### 1. BlogForge AI (Best Automated SEO)

When it comes to full-cycle content automation, BlogForge AI stands completely apart from the pack. Unlike typical generic LLMs that just spit out text, BlogForge acts as an autonomous marketing agent. 

**Key Differentiators in 2026:**
- **Live SEO Scoring:** Grades your content against top Indian SERPs.
- **Auto-Publishing:** Connects directly to WordPress and Shopify.
- **GEO Optimization:** Localizes terms specifically for Tier-1 and Tier-2 Indian cities (e.g., Bangalore, NCR).

*Pricing starts at ₹1,999/mo.*`
  },
  {
    id: 5,
    title: "SEO Optimization Pass",
    description: "Keyword density check, NLP entity injection, internal link suggestions, meta generation.",
    prompt: `[System] You are an On-Page SEO Auditor.
[Context] Draft provided in previous step.
[User] 
1. Inject missing NLP entities naturally.
2. Ensure primary keyword density is between 1.5% - 2.5%.
3. Generate a 155-character Meta Description.
4. Suggest 2 internal link anchor texts.`,
    output: `META DESCRIPTION:
Discover the best AI blog tools in India for 2026. Compare pricing, features, and CMS integrations to put your startup's SEO on autopilot. (142 chars)

ENTITIES INJECTED:
+ "generative models" (Paragraph 2)
+ "search engine results pages (SERPs)" (Paragraph 3)

INTERNAL LINK SUGGESTIONS:
1. "content automation ROI" -> link to /blog/content-roi
2. "keyword clustering" -> link to /features/cluster-map`
  },
  {
    id: 6,
    title: "GEO + AI Detection Pass",
    description: "Add local signals, humanize AI patterns, vary sentence structure, Flesch-Kincaid target 65-75.",
    prompt: `[System] You are a senior editor with a strict standard for readability and human-like cadence.
[User] Review the entire draft. 
1. Vary sentence length (rhythm).
2. Ensure Flesch-Kincaid ease is between 65-75. 
3. Remove robotic transition words like "Furthermore", "In conclusion", "It is important to note".
4. Add Indian localized context (UPI payments, local tech hubs).`,
    output: `[Analyzing Syntax Patterns...]
- Burstiness Score Initial: 34 (Low/Robotic)
- Burstiness Score Adjusted: 72 (High/Human)
- Readability Score: 68 (Grade 8)

REVISIONS MADE:
Removed: "In conclusion, these tools are highly effective."
Added: "Bottom line: if your marketing team isn't leveraging tools like BlogForge, you're already losing traffic to competitors who do."
Added: "Supports standard domestic billing via UPI and credit cards."`
  },
  {
    id: 7,
    title: "Schema + Snippet Structuring",
    description: "Add FAQ schema, HowTo schema, format for featured snippet eligibility.",
    prompt: `[System] You are a Technical SEO Engineer.
[User] The blog is finalized. Now, generate the JSON-LD Schema markup.
1. Create FAQPage Schema based on the H2/H3 questions in the text.
2. Structure the top list into HTML table format for Google's Featured Snippet parser.`,
    output: `<!-- JSON-LD FAQ Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What are the top AI blogging tools in India?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The top tools for Indian startups in 2026 include BlogForge AI for full automation, Jasper for enterprise, and Writesonic for short-form copy."
    }
  }]
}
</script>

<!-- Snippet Optimized Table -->
<table class="snippet-table">
  <tr><th>Tool</th><th>Best For</th><th>Starting Price</th></tr>
  <tr><td>BlogForge AI</td><td>SEO Automation</td><td>₹1,999/mo</td></tr>
</table>`
  }
];

const PromptArchitecture = ({ onBack }) => {
  const [activeStage, setActiveStage] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setActiveStage(prev => {
          if (prev >= 7) {
            setIsRunning(false);
            return 7;
          }
          return prev + 1;
        });
      }, 4000); // 4 seconds per stage
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const activeData = stages.find(s => s.id === activeStage);

  const startPipeline = () => {
    setActiveStage(1);
    setIsRunning(true);
  };

  return (
    <div className="prompt-arch-container">
      <div className="pa-header">
        <button className="btn-ghost" onClick={onBack}>
          <ArrowLeft size={18} className="mr-2"/> Back to Home
        </button>
        <div className="pa-title-block">
          <h1>Our <span className="title-accent-violet">7-Stage</span> Prompt Architecture</h1>
          <p>Behind the scenes of the world's most advanced autonomous SEO engine.</p>
        </div>
      </div>

      <div className="pa-layout">
        <div className="pa-sidebar">
          <div className="pa-sidebar-header">
            <h3>The Pipeline</h3>
            <button className={`btn btn-sm btn-primary ${isRunning ? 'disabled' : ''}`} onClick={startPipeline} disabled={isRunning}>
              {isRunning ? <><Loader2 size={16} className="spin mr-2"/> Running...</> : <><Play size={16} className="mr-2"/> Run Mockup</>}
            </button>
          </div>
          
          <div className="pa-stepper">
            {stages.map((stage) => {
              const isActive = stage.id === activeStage;
              const isPast = stage.id < activeStage;
              
              return (
                <div key={stage.id} className={`pa-step ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`} onClick={() => !isRunning && setActiveStage(stage.id)}>
                  <div className="pa-step-indicator">
                    <div className="pa-step-line"></div>
                    <div className="pa-step-dot">
                      {isPast ? <CheckCircle2 size={14}/> : stage.id}
                    </div>
                  </div>
                  <div className="pa-step-content">
                    <h4>{stage.title}</h4>
                    {isActive && <p className="pa-step-desc fadeIn">{stage.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pa-main">
          <div className="pa-top-bar">
            Target Keyword: <span className="keyword-badge">"best AI blog tools India 2026"</span>
          </div>

          <div className="pa-cards-grid">
            {/* Prompt Card */}
            <div className="pa-card">
              <div className="pa-card-header">
                <Code2 size={16} className="text-violet-400"/>
                <span>Stage {activeStage} • System Prompt Template</span>
              </div>
              <div className="pa-card-body">
                <pre key={`prompt-${activeStage}`} className="typewriter-text">
                  <code>{activeData.prompt}</code>
                </pre>
              </div>
            </div>

            {/* Output Card */}
            <div className="pa-card">
              <div className="pa-card-header">
                <Terminal size={16} className="text-cyan-400"/>
                <span>AI Execution Output</span>
              </div>
              <div className="pa-card-body console-body">
                {isRunning ? (
                  <div className="console-loading">
                    <Loader2 size={24} className="spin text-cyan-400"/>
                    <span>Processing Stage {activeStage}...</span>
                  </div>
                ) : (
                  <pre key={`output-${activeStage}`} className="typewriter-text delayed">
                    <code>{activeData.output}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptArchitecture;
