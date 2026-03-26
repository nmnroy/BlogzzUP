import React from 'react';

const FeatureCard = ({ icon, title, description, bullets, mockUI }) => (
  <div className="feat-card">
    <div className="feat-left">
      <div className="feat-icon">{icon}</div>
      <h3 className="feat-title">{title}</h3>
      <p className="feat-desc">{description}</p>
      <ul className="feat-bullets">
        {bullets.map((b, i) => (
          <li key={i}><span className="check">✓</span> {b}</li>
        ))}
      </ul>
    </div>
    <div className="feat-right">
      {mockUI}
    </div>
  </div>
);

export default FeatureCard;
