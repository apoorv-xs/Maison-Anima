import React from 'react';
import { Link } from 'react-router-dom';

function Header({ bagCount, onMenuOpen, onBagOpen, isScrolled, currentUser }) {
  return (
    <header className={`glass-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="nav-left">
          <button className="nav-item nav-btn menu-btn mobile-only" id="menuBtn" onClick={onMenuOpen}>
            <span className="btn-text">Menu</span>
          </button>
          <Link to="/collections" className="nav-item desktop-only">Runway</Link>
          <Link to="/customizer" className="nav-item desktop-only">Customizer</Link>
          <Link to="/craft" className="nav-item desktop-only">Crafts</Link>
          <Link to="/journal" className="nav-item desktop-only">Journal</Link>
        </div>
        
        <Link to="/" className="brand-logo">ANIMA</Link>
        
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {currentUser ? (
            <Link 
              to="/profile" 
              className="nav-item" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontWeight: 500,
                color: 'var(--text-dark)'
              }}
            >
              <span className="desktop-only" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {currentUser.name.split(' ')[0]}
              </span>
              {/* Circular wax seal style monogram initials */}
              <span 
                className="monogram-gold"
                style={{ 
                  width: '26px', 
                  height: '26px', 
                  borderRadius: '50%', 
                  backgroundColor: '#A30026', 
                  border: '1.5px solid #D4AF37', 
                  color: '#FFFFFF',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 6px rgba(163,0,38,0.25)'
                }}
              >
                {currentUser.avatarInitials}
              </span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="nav-item" 
              style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              Sign In
            </Link>
          )}

          <button className="nav-item nav-btn bag-btn" id="bagBtn" onClick={onBagOpen}>
            <span className="btn-text">Anima Bag</span>
            <span className="bag-count" id="bagCount" style={{ marginLeft: '8px' }}>{bagCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;