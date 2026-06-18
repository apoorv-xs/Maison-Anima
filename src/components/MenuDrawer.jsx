import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function MenuDrawer({ isOpen, onClose }) {
  const { currentUser } = useAuth();

  return (
    <div className={`nav-drawer ${isOpen ? 'open' : ''}`} id="navDrawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="drawer-overlay" id="drawerOverlay" onClick={onClose}></div>
      <div className="drawer-content">
        <div className="drawer-header">
          <span className="drawer-title">Explore</span>
          <button className="close-btn" id="closeDrawerBtn" onClick={onClose} aria-label="Close navigation menu">&times;</button>
        </div>
        <nav className="drawer-links">
          <NavLink to="/" className="drawer-link" onClick={onClose}>Home</NavLink>
          <NavLink to="/collections" className="drawer-link" onClick={onClose}>Runway (Leather Goods)</NavLink>
          <NavLink to="/customizer" className="drawer-link" onClick={onClose}>Aura Customizer</NavLink>
          <NavLink to="/craft" className="drawer-link" onClick={onClose}>Artisanal Crafts</NavLink>
          <NavLink to="/journal" className="drawer-link" onClick={onClose}>Journal Lookbook</NavLink>

          <div style={{ margin: '20px 0', borderTop: '1px solid var(--border-color)' }}></div>

          {currentUser ? (
            <Link to="/profile" className="drawer-link" onClick={onClose} style={{ color: 'var(--accent-siena)' }}>
              ⚜ Private Salon
            </Link>
          ) : (
            <Link to="/login" className="drawer-link" onClick={onClose}>
              Client Sign In
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}

export default MenuDrawer;
