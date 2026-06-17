import React from 'react';

/**
 * Shared cart item display component.
 * Used by both Cart.jsx (full view with quantity controls) and BagDrawer.jsx (compact view).
 */
function CartItem({ item, index, onRemove, onUpdateQuantity, compact = false }) {
  let metaText = item.meta || '';
  if (item.monogram) {
    metaText += ` • Monogram: "${item.monogram}"`;
  }

  if (compact) {
    // Bag drawer style (no quantity controls)
    return (
      <div className="cart-item">
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
            <button className="remove-item-btn font-sans" onClick={() => onRemove(index)}>Remove</button>
          </div>
        </div>
      </div>
    );
  }

  // Full cart page style (with quantity controls)
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid #E5E2DE', paddingBottom: '20px' }}>
      <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#F6F3EF' }} />
      <div style={{ flexGrow: 1 }}>
        <h4 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1C1B1A', marginBottom: '4px' }}>{item.name}</h4>
        <p className="font-sans text-muted" style={{ fontSize: '0.7rem', color: '#6A6764', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{metaText}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {onUpdateQuantity ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E2DE', borderRadius: '20px', overflow: 'hidden' }}>
                <button onClick={() => onUpdateQuantity(index, item.quantity - 1)} style={{ padding: '6px 12px', fontSize: '0.9rem', color: '#6A6764' }}>-</button>
                <span className="font-sans" style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: 500 }}>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(index, item.quantity + 1)} style={{ padding: '6px 12px', fontSize: '0.9rem', color: '#6A6764' }}>+</button>
              </div>
              <span className="font-sans" style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                ${(item.price * item.quantity).toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-sans" style={{ fontSize: '0.95rem', fontWeight: 500 }}>
              ${(item.price * item.quantity).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
