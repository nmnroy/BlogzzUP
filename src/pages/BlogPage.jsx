import React from 'react';

const BlogPage = () => {
  const posts = [
    { title: "How BlogForge AI is Disrupting Martech in India", tag: "AI & SEO", emoji: "🤖", grad: "linear-gradient(135deg,#1E0B4B,#2D1B69)" },
    { title: "How to Get 10x Organic Traffic Without Writing a Single Blog", tag: "Growth", emoji: "📈", grad: "linear-gradient(135deg,#0C2340,#1E3A5F)" },
    { title: "The 7-Stage Prompt Architecture That Beats Human Writers", tag: "SEO Tips", emoji: "🔍", grad: "linear-gradient(135deg,#0B3D2E,#1A5940)" },
    { title: "Why GEO Optimization is the Next Frontier for Indian Startups", tag: "GEO", emoji: "🌍", grad: "linear-gradient(135deg,#3D1A0B,#5C2810)" },
    { title: "Content Cluster Maps: The Secret Weapon of Top SEO Agencies", tag: "Strategy", emoji: "🗺️", grad: "linear-gradient(135deg,#1A0B3D,#2D1A5C)" },
    { title: "How a Delhi SaaS Startup Got 50,000 Monthly Visitors in 90 Days", tag: "Case Study", emoji: "🚀", grad: "linear-gradient(135deg,#0B1A3D,#1A2D5C)" }
  ];

  return (
    <div className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '48px', color: '#fff', margin: 0, fontWeight: 800 }}>Latest from BlogForge</h1>
        <p style={{ color: '#94A3B8', marginTop: '12px', fontSize: '18px' }}>Insights, strategies, and playbooks on AI content and SEO</p>
      </div>

      <div className="blog-grid">
        {posts.map((post, i) => (
          <div key={i} className="blog-card">
            <div className="blog-thumb" style={{ background: post.grad }}>
              {post.emoji}
            </div>
            <div className="blog-body">
              <div>
                <span className="blog-tag">{post.tag}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <div className="blog-meta">
                <span>📅 Mar 2026</span>
                <span>⏱ 7 min read</span>
              </div>
              <div className="blog-read-more">Read More →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
