import React from 'react';
import { Link } from 'react-router-dom';

function MenuDrawer({ isOpen, onClose }) {
  return (
    <div className={`nav-drawer ${isOpen ? 'open' : ''}`} id="navDrawer">
      <div className="drawer-overlay" id="drawerOverlay" onClick={onClose}></div>
      <div className="drawer-content">
        <div className="drawer-header">
          <span className="drawer-title">Explore</span>
          <button className="close-btn" id="closeDrawerBtn" onClick={onClose}>&times;</button>
        </div>
        <nav className="drawer-links">
          <Link to="/" className="drawer-link" onClick={onClose}>Home</Link>
          <Link to="/collections" className="drawer-link" onClick={onClose}>Runway (Leather Goods)</Link>
          <Link to="/customizer" className="drawer-link" onClick={onClose}>Aura Customizer</Link>
          <Link to="/journal" className="drawer-link" onClick={onClose}>Journal Lookbook</Link>
        </nav>
      </div>
    </div>
  );
}

export default MenuDrawer;
