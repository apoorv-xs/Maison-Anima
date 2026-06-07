import React from 'react';
import { Link } from 'react-router-dom';

function BagDrawer({ isOpen, onClose, cart, onRemoveItem }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`bag-drawer ${isOpen ? 'open' : ''}`} id="bagDrawer">
      <div className="bag-overlay" id="bagOverlay" onClick={onClose}></div>
      <div className="bag-content">
        <div className="drawer-header">
          <span className="drawer-title">Anima Bag</span>
          <button className="close-btn" id="closeBagBtn" onClick={onClose}>&times;</button>
        </div>

        <div className="bag-items" id="bagItems">
          {cart.length === 0 ? (
            <p className="empty-bag-message" id="emptyBagMsg">Your shopping bag is currently empty.</p>
          ) : (
            cart.map((item, index) => {
              let metaText = item.meta || '';
              if (item.monogram) {
                metaText += ` • Monogram: "${item.monogram}"`;
              }
              return (
                <div className="cart-item" key={index}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-meta">{metaText}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '8px' }}>
                      <span className="cart-item-price">
                        ${(item.price * item.quantity).toLocaleString()}
                        {item.quantity > 1 && (
                          <span style={{ fontSize: '0.72rem', color: '#6A6764', fontWeight: 'normal', marginLeft: '6px' }}>
                            ({item.quantity} × ${item.price.toLocaleString()})
                          </span>
                        )}
                      </span>
                      <button className="remove-item-btn font-sans" onClick={() => onRemoveItem(index)}>Remove</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="bag-footer" id="bagFooter">
            <div className="bag-summary">
              <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}>Subtotal</span>
              <span className="bag-subtotal" id="bagSubtotal">${subtotal.toLocaleString()}</span>
            </div>
            <Link 
              to="/cart" 
              className="checkout-btn" 
              id="checkoutBtn"
              onClick={onClose}
              style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
            >
              View Bag & Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default BagDrawer;
