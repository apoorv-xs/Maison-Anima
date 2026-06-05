import React from 'react';
import { Link } from 'react-router-dom';

function Header({ bagCount, onMenuOpen, onBagOpen, isScrolled }) {
  return (
    <header className={`glass-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="nav-left">
          <button className="nav-item nav-btn menu-btn" id="menuBtn" onClick={onMenuOpen}>
            <span className="btn-text">Collections</span>
          </button>
        </div>
        
        <Link to="/" className="brand-logo">ANIMA</Link>
        
        <div className="nav-right">
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