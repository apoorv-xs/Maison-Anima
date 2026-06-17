import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

function BagDrawer({ isOpen, onClose }) {
  const { cart, removeItem } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`bag-drawer ${isOpen ? 'open' : ''}`} id="bagDrawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="bag-overlay" id="bagOverlay" onClick={onClose}></div>
      <div className="bag-content">
        <div className="drawer-header">
          <span className="drawer-title">Anima Bag</span>
          <button className="close-btn" id="closeBagBtn" onClick={onClose} aria-label="Close shopping bag">&times;</button>
        </div>

        <div className="bag-items" id="bagItems">
          {cart.length === 0 ? (
            <p className="empty-bag-message" id="emptyBagMsg">Your shopping bag is currently empty.</p>
          ) : (
            cart.map((item, index) => (
              <CartItem key={index} item={item} index={index} onRemove={removeItem} compact />
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="bag-footer" id="bagFooter">
            <div className="bag-summary">
              <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}>Subtotal</span>
              <span className="bag-subtotal" id="bagSubtotal">${subtotal.toLocaleString()}</span>
            </div>
            <Link to="/cart" className="checkout-btn" id="checkoutBtn" onClick={onClose} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              View Bag & Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default BagDrawer;
