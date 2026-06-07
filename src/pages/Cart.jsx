import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MaisonCloudDB } from '../utils/api';

function Cart({ cart, onRemoveItem, onClearCart, onUpdateQuantity, currentUser, onCheckoutSuccess }) {
  const [giftWrapping, setGiftWrapping] = useState('signature'); // signature | eco
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  
  // Checkout flow states
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart | success
  const [name, setName] = useState(currentUser ? currentUser.name : '');
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cloud Sync states
  const [syncToken, setSyncToken] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [restoreToken, setRestoreToken] = useState('');
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreError, setRestoreError] = useState('');
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (index, delta) => {
    const item = cart[index];
    const newQty = item.quantity + delta;
    if (newQty > 0) {
      onUpdateQuantity(index, newQty);
    } else {
      onRemoveItem(index);
    }
  };

  const sanitizeInput = (text) => {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  };

  const validateCard = (cardNum) => {
    const cleanNum = cardNum.replace(/[\s-]/g, '');
    if (!/^\d{13,19}$/.test(cleanNum)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanNum.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNum.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!name || !address) {
      alert("Please fill in shipping name and address details.");
      return;
    }
    
    // E-commerce card validation (Luhn Algorithm)
    if (!validateCard(card)) {
      alert("Security Validation Failed: Please enter a valid 13-19 digit card number conforming to Luhn check rules.");
      return;
    }

    // Mask sensitive details to prevent telemetry leakage (PCI-DSS compliance)
    const cardDigits = card.replace(/[\s-]/g, '');
    const maskedCard = cardDigits.slice(-4).padStart(16, '*');
    console.log(`[Maison Security Audit] Secure payment processing for client: ${name.toUpperCase()} (Card: ${maskedCard})`);

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutStep('success');
      if (onCheckoutSuccess) {
        onCheckoutSuccess(cart, subtotal);
      } else {
        onClearCart();
      }
    }, 2000);
  };

  if (checkoutStep === 'success') {
    return (
      <section className="editorial-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDFBF7' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '40px', border: '1px solid #E5E2DE', borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '3rem', color: '#17382B', marginBottom: '24px' }}>✓</div>
          <span style={{ fontSize: '0.75rem', color: '#B97C52', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }} className="font-sans">
            Maison Virtual Registry
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 400, color: '#1C1B1A', marginBottom: '20px' }}>
            Order Curated
          </h2>
          <p className="product-description" style={{ fontSize: '0.95rem', lineHeight: '1.8', color: '#6A6764', marginBottom: '30px' }}>
            Thank you. Your order has been successfully registered with our virtual boutique registry. Our Tuscan artisans are preparing your curated selection with complementary signature Ancora Rosso wrapping.
          </p>
          <Link 
            to="/" 
            style={{
              display: 'inline-block',
              backgroundColor: '#1C1B1A',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              padding: '16px 36px',
              borderRadius: '25px',
              transition: 'all 0.3s'
            }}
          >
            Return to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="editorial-section" style={{ minHeight: '100vh', backgroundColor: '#FDFBF7' }}>
      <div className="section-container" style={{ maxWidth: '1200px' }}>
        <div className="section-header">
          <span className="section-pretitle">Shopping Bag</span>
          <h2 className="section-title">Anima Checkout</h2>
          <div className="divider"></div>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p className="empty-bag-message" style={{ marginBottom: '30px' }}>Your shopping bag is currently empty.</p>
            <Link 
              to="/collections" 
              style={{
                display: 'inline-block',
                border: '1px solid #1C1B1A',
                padding: '16px 36px',
                borderRadius: '25px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                transition: 'all 0.3s'
              }}
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '60px', alignItems: 'start' }}>
            
            {/* Left Column: Cart list and Gifting */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Items List */}
              <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF' }}>
                <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '24px' }}>Items</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {cart.map((item, index) => {
                    let metaText = item.meta || '';
                    if (item.monogram) {
                      metaText += ` • Monogram: "${item.monogram}"`;
                    }
                    return (
                      <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid #E5E2DE', paddingBottom: '20px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#F6F3EF' }} />
                        <div style={{ flexGrow: 1 }}>
                          <h4 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1C1B1A', marginBottom: '4px' }}>{item.name}</h4>
                          <p className="font-sans text-muted" style={{ fontSize: '0.7rem', color: '#6A6764', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{metaText}</p>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Quantity buttons */}
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E2DE', borderRadius: '20px', overflow: 'hidden' }}>
                              <button onClick={() => handleQuantityChange(index, -1)} style={{ padding: '6px 12px', fontSize: '0.9rem', color: '#6A6764' }}>-</button>
                              <span className="font-sans" style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: 500 }}>{item.quantity}</span>
                              <button onClick={() => handleQuantityChange(index, 1)} style={{ padding: '6px 12px', fontSize: '0.9rem', color: '#6A6764' }}>+</button>
                            </div>
                            
                            <span className="font-sans" style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gifting Packaging */}
              <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF' }}>
                <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#B97C52', fontSize: '0.7rem', display: 'block', marginBottom: '8px' }}>
                  Signature Services
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '20px' }}>Maison Gifting & Packaging</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }} className="font-sans">
                  {/* Signature Box */}
                  <div 
                    onClick={() => setGiftWrapping('signature')}
                    style={{
                      border: giftWrapping === 'signature' ? '2px solid #B97C52' : '1px solid #E5E2DE',
                      borderRadius: '8px',
                      padding: '20px',
                      cursor: 'pointer',
                      backgroundColor: giftWrapping === 'signature' ? 'rgba(185, 124, 82, 0.02)' : 'transparent',
                      transition: 'all 0.3s'
                    }}
                  >
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1C1B1A', marginBottom: '6px' }}>Signature Rosso Box</h4>
                    <p style={{ fontSize: '0.75rem', color: '#6A6764', lineHeight: '1.4' }}>Complimentary signature Ancora Rosso boxes tied with green-red satin ribbon hooks.</p>
                  </div>
                  {/* Eco Wrapping */}
                  <div 
                    onClick={() => setGiftWrapping('eco')}
                    style={{
                      border: giftWrapping === 'eco' ? '2px solid #1C1B1A' : '1px solid #E5E2DE',
                      borderRadius: '8px',
                      padding: '20px',
                      cursor: 'pointer',
                      backgroundColor: giftWrapping === 'eco' ? 'rgba(28, 27, 26, 0.02)' : 'transparent',
                      transition: 'all 0.3s'
                    }}
                  >
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1C1B1A', marginBottom: '6px' }}>Eco-Canvas Wrap</h4>
                    <p style={{ fontSize: '0.75rem', color: '#6A6764', lineHeight: '1.4' }}>Minimalist unbleached cotton canvas dustbag paired with recycled paper boxes.</p>
                  </div>
                </div>

                {/* Calligraphic Gift Note */}
                <div className="font-sans" style={{ borderTop: '1px solid #E5E2DE', paddingTop: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', color: '#1C1B1A', fontWeight: 500 }}>
                    <input 
                      type="checkbox" 
                      checked={isGift} 
                      onChange={(e) => setIsGift(e.target.checked)} 
                      style={{ cursor: 'pointer' }}
                    />
                    Add a complimentary handwritten calligraphic gift note
                  </label>
                  
                  {isGift && (
                    <div style={{ marginTop: '16px', animation: 'slideInCard 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                      <textarea 
                        placeholder="Write your personal message here (e.g., 'Happy Anniversary. With love, A.')" 
                        maxLength={180}
                        value={giftNote}
                        onChange={(e) => setGiftNote(sanitizeInput(e.target.value))}
                        style={{
                          width: '100%',
                          height: '80px',
                          border: '1px solid #E5E2DE',
                          borderRadius: '8px',
                          padding: '12px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          color: '#1C1B1A',
                          resize: 'none',
                          outline: 'none',
                          marginBottom: '20px'
                        }}
                      />
                      
                      {/* Calligraphic Card Preview */}
                      <div style={{
                        border: '1px solid #D4AF37',
                        borderRadius: '8px',
                        backgroundColor: '#FAF6F0',
                        padding: '30px',
                        boxShadow: '0 10px 30px rgba(185, 124, 82, 0.05)',
                        position: 'relative',
                        backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.02) 0%, transparent 100%)'
                      }}>
                        <div style={{
                          textAlign: 'center',
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.9rem',
                          letterSpacing: '0.3em',
                          color: '#D4AF37',
                          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                          paddingBottom: '12px',
                          marginBottom: '16px'
                        }}>
                          ANIMA
                        </div>
                        
                        <div style={{
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontStyle: 'italic',
                          fontSize: '1.15rem',
                          lineHeight: '1.8',
                          color: '#1C1B1A',
                          minHeight: '60px',
                          textAlign: 'center',
                          wordBreak: 'break-word',
                          whiteSpace: 'pre-wrap'
                        }}>
                          {giftNote ? `"${giftNote}"` : '"Your personal message will be handwritten here by our calligraphers..."'}
                        </div>
                        
                        <div style={{
                          textAlign: 'center',
                          fontSize: '0.6rem',
                          fontFamily: 'var(--font-sans)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          color: '#6A6764',
                          marginTop: '20px'
                        }}>
                          Calligrafia di Firenze
                        </div>
                      </div>
                      
                      <span style={{ fontSize: '0.7rem', color: '#6A6764', display: 'block', textAlign: 'right', marginTop: '10px' }}>
                        {giftNote.length}/180 characters
                      </span>
                    </div>
                  )}
                </div>

              </div>

              {/* Cloud Sync Section */}
              <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF' }}>
                <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#17382B', fontSize: '0.7rem', display: 'block', marginBottom: '8px' }}>
                  Cross-Device Persistence
                </span>
                <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '12px' }}>Maison Cloud Sync</h3>
                <p className="font-sans" style={{ fontSize: '0.82rem', color: '#6A6764', lineHeight: 1.6, marginBottom: '24px' }}>
                  Securely back up your curated shopping bag to the Maison cloud registry. Retrieve it from any device using your personal sync token.
                </p>

                {/* Save to Cloud */}
                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #E5E2DE' }}>
                  <button
                    onClick={async () => {
                      setIsSyncing(true);
                      setSyncSuccess(false);
                      setSyncToken('');
                      const token = await MaisonCloudDB.syncCart(cart, giftNote, giftWrapping);
                      setIsSyncing(false);
                      if (token) {
                        setSyncToken(token);
                        setSyncSuccess(true);
                      }
                    }}
                    disabled={isSyncing || cart.length === 0}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '25px',
                      border: '1px solid #17382B',
                      backgroundColor: isSyncing ? '#17382B' : 'transparent',
                      color: isSyncing ? '#FFFFFF' : '#17382B',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      fontWeight: 500,
                      cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                      opacity: cart.length === 0 ? 0.4 : 1,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {isSyncing ? 'Encrypting & Syncing...' : 'Sync Bag to Cloud'}
                  </button>

                  {syncSuccess && syncToken && (
                    <div style={{
                      marginTop: '16px',
                      padding: '20px',
                      borderRadius: '10px',
                      backgroundColor: '#F0FAF4',
                      border: '1px solid rgba(23, 56, 43, 0.15)',
                      animation: 'slideInCard 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                      <span className="font-sans" style={{ fontSize: '0.68rem', color: '#17382B', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '8px', fontWeight: 500 }}>
                        ✓ Synced Successfully
                      </span>
                      <div style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.6rem',
                        color: '#17382B',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textAlign: 'center',
                        padding: '12px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        border: '1px dashed rgba(23, 56, 43, 0.25)',
                        userSelect: 'all',
                        cursor: 'text'
                      }}>
                        {syncToken}
                      </div>
                      
                      <button
                        onClick={() => {
                          const url = `${window.location.origin}/registry/${syncToken}`;
                          navigator.clipboard.writeText(url);
                          setLinkCopied(true);
                          setTimeout(() => setLinkCopied(false), 2000);
                        }}
                        style={{
                          marginTop: '16px',
                          width: '100%',
                          padding: '12px',
                          borderRadius: '20px',
                          border: 'none',
                          backgroundColor: '#B97C52',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                      >
                        {linkCopied ? '✓ Link Copied!' : '📋 Copy Shareable Link'}
                      </button>

                      <p className="font-sans" style={{ fontSize: '0.7rem', color: '#6A6764', marginTop: '12px', textAlign: 'center' }}>
                        Save this token or share the link with a partner to co-curate.
                      </p>
                    </div>
                  )}
                </div>

                {/* Restore from Cloud */}
                <div>
                  <span className="font-sans" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500, display: 'block', marginBottom: '10px' }}>
                    Restore From Token
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="ANIMA-XXXXX"
                      value={restoreToken}
                      onChange={(e) => { setRestoreToken(e.target.value); setRestoreError(''); setRestoreSuccess(false); }}
                      style={{
                        flex: 1,
                        border: '1px solid #E5E2DE',
                        borderRadius: '20px',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-sans)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        outline: 'none'
                      }}
                    />
                    <button
                      onClick={async () => {
                        if (!restoreToken.trim()) return;
                        setIsRestoring(true);
                        setRestoreError('');
                        setRestoreSuccess(false);
                        try {
                          const restoredCart = await MaisonCloudDB.retrieveCart(restoreToken);
                          // Replace cart via clearing and direct persistence
                          onClearCart();
                          // Use a small timeout to let clear propagate, then write restored cart
                          setTimeout(() => {
                            localStorage.setItem('maison_anima_cart', JSON.stringify(restoredCart));
                            setIsRestoring(false);
                            setRestoreSuccess(true);
                            // Reload to pick up the restored cart from localStorage
                            setTimeout(() => window.location.reload(), 800);
                          }, 200);
                        } catch (err) {
                          setIsRestoring(false);
                          setRestoreError(err.message || 'Invalid token.');
                        }
                      }}
                      disabled={isRestoring || !restoreToken.trim()}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: '1px solid #B97C52',
                        backgroundColor: isRestoring ? '#B97C52' : 'transparent',
                        color: isRestoring ? '#FFFFFF' : '#B97C52',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: 500,
                        cursor: !restoreToken.trim() ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {isRestoring ? 'Restoring...' : 'Restore'}
                    </button>
                  </div>

                  {restoreError && (
                    <p className="font-sans" style={{ fontSize: '0.75rem', color: '#9B2C2C', marginTop: '10px', animation: 'slideInCard 0.3s ease' }}>
                      ⚠ {restoreError}
                    </p>
                  )}

                  {restoreSuccess && (
                    <p className="font-sans" style={{ fontSize: '0.75rem', color: '#17382B', marginTop: '10px', animation: 'slideInCard 0.3s ease' }}>
                      ✓ Bag restored successfully. Reloading...
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Checkout Summary Form */}
            <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF', position: 'sticky', top: '100px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '24px' }}>Checkout Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid #E5E2DE', paddingBottom: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6A6764' }} className="font-sans">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6A6764' }} className="font-sans">
                  <span>Delivery</span>
                  <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', color: '#17382B', fontWeight: 500 }}>Complimentary</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', color: '#1C1B1A', fontWeight: 500 }} className="font-sans">
                  <span>Total</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Shipping Form */}
              <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="font-sans">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500 }}>Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Guccio Gucci" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500 }}>Shipping Address</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Via de' Tornabuoni, 73r, Florence" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500 }}>Card Details</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="•••• •••• •••• 1921" 
                    value={card} 
                    onChange={(e) => setCard(e.target.value.replace(/[^0-9\s-]/g, ''))}
                    maxLength={19}
                    autoComplete="off"
                    style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="checkout-btn"
                  style={{ width: '100%', marginTop: '20px', padding: '16px' }}
                >
                  {isSubmitting ? 'Registering with Maison...' : 'Register Curated Order'}
                </button>
              </form>

            </div>

          </div>
        )}
      </div>
      
      {/* Styles for Note Card Entry Animations */}
      <style>{`
        @keyframes slideInCard {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes syncPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}

export default Cart;
