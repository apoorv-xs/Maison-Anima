import React from 'react';

function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-parallax-bg" style={{ backgroundImage: "url('/assets/hero_campaign.png')" }}></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h5 className="hero-subtitle font-sans" id="heroSubtitle">Autumn Collection</h5>
        <h1 className="hero-title" id="heroTitle">EQUESTRIAN LUXURY</h1>
        <p className="hero-desc" id="heroDesc">
          A conceptual study of classic Italian heritage re-imagined for the modern avant-garde collection.
        </p>
        <a href="#editorial" className="luxury-cta font-sans" id="heroCta">Explore Collection</a>
      </div>
    </section>
  );
}

export default Hero;