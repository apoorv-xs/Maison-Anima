import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="luxury-footer">
      <div className="footer-container font-sans">
        <div className="footer-brand-col">
          <div className="footer-logo">ANIMA</div>
          <p className="footer-tagline">
            Preserving classical equestrian foundations through contemporary design, premium Italian artisanal leatherwork, and digital customization.
          </p>
        </div>
        
        <div className="footer-links-grid">
          <div className="links-col">
            <span className="links-title">Maison</span>
            <Link to="/">The Concept</Link>
            <Link to="/collections">Runway</Link>
            <Link to="/customizer">Aura Jackie</Link>
            <Link to="/journal">Maison Journal</Link>
          </div>
          
          <div className="links-col">
            <span className="links-title">Services</span>
            <a href="#">Exclusive Gifting</a>
            <a href="#">Virtual Appointment</a>
            <a href="#">Maison Care</a>
          </div>
          
          <div className="links-col">
            <span className="links-title">Legal</span>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom font-sans">
        <span>© 2026 Maison Anima Concept. All Rights Reserved.</span>
        <span>Premium Experience Virtual Registry</span>
      </div>
    </footer>
  );
}

export default Footer;
