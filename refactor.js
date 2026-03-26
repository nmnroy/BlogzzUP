const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf-8');

// 1. Extract sections
const extract = (regex) => {
  const match = code.match(regex);
  if (match) {
    code = code.replace(match[0], '');
    return match[0];
  }
  return '';
};

// Use non-greedy dot all regex
const hero = extract(/<main className="hero.*?<\/main>/s);
const works = extract(/<section className="works-section.*?<\/section>/s);
const stats = extract(/<section className="stats-section.*?<\/section>/s);
const features = extract(/<section className="spotlight-section.*?<\/section>/s);
const demo = extract(/<section className="demo-section.*?<\/section>/s);
const seoEditor = extract(/<section className="seo-editor-section.*?<\/section>/s);
const integrations = extract(/<section className="integrations-section.*?<\/section>/s);
const pricing = extract(/<section className="pricing-section.*?<\/section>/s);
const finalCta = extract(/<section className="final-cta-section.*?<\/section>/s);

// 2. Build the new routed structure
const newStructure = `
      <div className="page-section" id="page-home" style={{ display: 'none' }}>
        ${hero}
        ${stats}
        ${integrations}
        ${finalCta}
      </div>

      <div className="page-section" id="page-howitworks" style={{ display: 'none' }}>
        ${works}
      </div>

      <div className="page-section" id="page-features" style={{ display: 'none' }}>
        ${features}
      </div>

      <div className="page-section" id="page-demo" style={{ display: 'none' }}>
        ${demo}
        ${seoEditor}
      </div>

      <div className="page-section" id="page-pricing" style={{ display: 'none' }}>
        ${pricing}
      </div>

      <div className="page-section" id="page-blog" style={{ display: 'none' }}>
        <div className="container" style={{padding: '12rem 0 8rem', textAlign: 'center', minHeight: '60vh'}}>
          <h2 className="section-title">Blog <span className="title-accent-violet">Updates</span></h2>
          <p className="section-subtitle">Read the latest news and guides from BlogForge AI.</p>
        </div>
      </div>
`;

// 3. Inject new structure right before the footer
code = code.replace(/<footer className="site-footer"/, newStructure + '\n      <footer className="site-footer"');

// 4. Update the desktop and mobile nav links
// Remove the old hash links and active classes to avoid conflicts
code = code.replace(
  /<ul className="nav-links">[\s\S]*?<\/ul>/,
  `<ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); window.showPage('home'); }} data-nav="home" className="nav-link active">Home</a></li>
            <li><a href="#howitworks" onClick={(e) => { e.preventDefault(); window.showPage('howitworks'); }} data-nav="howitworks" className="nav-link">How it Works</a></li>
            <li><a href="#features" onClick={(e) => { e.preventDefault(); window.showPage('features'); }} data-nav="features" className="nav-link">Features</a></li>
            <li><a href="#demo" onClick={(e) => { e.preventDefault(); window.showPage('demo'); }} data-nav="demo" className="nav-link">Demo</a></li>
            <li><a href="#pricing" onClick={(e) => { e.preventDefault(); window.showPage('pricing'); }} data-nav="pricing" className="nav-link">Pricing</a></li>
            <li><a href="#blog" onClick={(e) => { e.preventDefault(); window.showPage('blog'); }} data-nav="blog" className="nav-link">Blog</a></li>
          </ul>`
);

code = code.replace(
  /<ul className="mobile-nav-links">[\s\S]*?<\/ul>/,
  `<ul className="mobile-nav-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.showPage('home'); }} data-nav="home" className="nav-link active">Home</a></li>
          <li><a href="#howitworks" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.showPage('howitworks'); }} data-nav="howitworks" className="nav-link">How it Works</a></li>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.showPage('features'); }} data-nav="features" className="nav-link">Features</a></li>
          <li><a href="#demo" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.showPage('demo'); }} data-nav="demo" className="nav-link">Demo</a></li>
          <li><a href="#pricing" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.showPage('pricing'); }} data-nav="pricing" className="nav-link">Pricing</a></li>
          <li><a href="#blog" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.showPage('blog'); }} data-nav="blog" className="nav-link">Blog</a></li>
        </ul>`
);

fs.writeFileSync('src/App.jsx', code);
console.log('DOM Refactored Successfully!');
