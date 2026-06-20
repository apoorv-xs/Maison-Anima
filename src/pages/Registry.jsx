import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MaisonCloudDB } from '../utils/api';
import { sanitizeInput } from '../utils/sanitize';
import { useCart } from '../context/CartContext';
import { gsap } from '../utils/gsap';

function Registry() {
  const { addToCart } = useCart();
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sharedCart, setSharedCart] = useState([]);
  const [giftNote, setGiftNote] = useState('');
  const [giftWrapping, setGiftWrapping] = useState('signature');
  const [error, setError] = useState('');
  
  // Guestbook comments state
  const [comments, setComments] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [guestInitials, setGuestInitials] = useState('');
  const [guestComment, setGuestComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    document.title = `Maison Anima — Registry ${token}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", `View and adopt the shared curation registry capsule: ${token}.`);
    }

    let active = true;
    setLoading(true);
    setError('');

    MaisonCloudDB.retrieveCart(token)
      .then((cartData) => {
        if (!active) return;
        setSharedCart(cartData);
        
        // Load simulated gift note data (stored alongside cart in localStorage in retrieveCart helper)
        try {
          const remoteDB = JSON.parse(localStorage.getItem('maison_cloud_db') || '{}');
          const record = remoteDB[token.trim().toUpperCase()];
          if (record) {
            // Retrieve gift details if synced
            // For this simulation, we check if there was a note
            // Or fallback to a gorgeous default welcome message
            setGiftNote(record.giftNote || "A curated capsule selected for you. Built with fine leather and finished with bespoke monogramming.");
            setGiftWrapping(record.giftWrapping || "signature");
          }
        } catch {
          setGiftNote("A curated capsule selected for you.");
        }

        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || 'Registry token not found.');
        setLoading(false);
      });

    // Retrieve comments for this token
    try {
      const savedComments = JSON.parse(localStorage.getItem(`maison_guestbook_${token}`) || '[]');
      setComments(savedComments);
    } catch {
      setComments([]);
    }

    return () => {
      active = false;
    };
  }, [token]);

  const handleAdoptCuration = () => {
    sharedCart.forEach((item) => {
      // Add each item to parent cart state
      addToCart(item.id, item.name, item.price, item.image, item.meta, item.monogram);
    });
    // Open bag or redirect to cart
    navigate('/cart');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestComment.trim()) return;
    
    setSubmittingComment(true);
    
    const cleanName = sanitizeInput(guestName);
    const cleanComment = sanitizeInput(guestComment);
    const cleanInitials = sanitizeInput(guestInitials);
    
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        name: cleanName,
        initials: (cleanInitials || cleanName.substring(0, 2)).toUpperCase().substring(0, 4),
        text: cleanComment,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      localStorage.setItem(`maison_guestbook_${token}`, JSON.stringify(updated));

      // Reset form
      setGuestName('');
      setGuestInitials('');
      setGuestComment('');
      setSubmittingComment(false);

      if (gsap) {
        gsap.fromTo('.comment-card-new',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 }
        );
      }
    }, 800);
  };

  // 3D Card tilt effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 14}deg) rotateY(${x / 14}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const subtotal = sharedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return (
      <section className="editorial-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="shimmer" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #B97C52', borderTopColor: 'transparent', animation: 'syncPulse 1s infinite linear', margin: '0 auto 20px' }}></div>
          <span className="font-sans text-xs uppercase tracking-widest text-muted">Retrieving Shared Curation...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="editorial-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '40px', border: '1px solid #E5E2DE', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: '16px' }}>⚠</span>
          <h3 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: '16px' }}>Registry Retrieval Failed</h3>
          <p className="product-description" style={{ marginBottom: '30px' }}>{error}</p>
          <Link to="/collections" className="checkout-btn" style={{ padding: '12px 28px' }}>Explore Collections</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="editorial-section" style={{ minHeight: '100vh', backgroundColor: '#FDFBF7' }}>
      <div className="section-container" style={{ maxWidth: '1200px' }}>
        
        {/* Header */}
        <div className="section-header">
          <span className="section-pretitle">Maison Co-Curated Registry</span>
          <h1 className="section-title" style={{ fontSize: '3rem', fontWeight: 300 }}>
            Shared Boutique Capsule
          </h1>
          <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ display: 'block', marginTop: '10px' }}>
            Registry Key: {token}
          </span>
          <div className="divider"></div>
        </div>

        <div className="registry-layout">
          
          {/* Left Column: Shared Items and Guestbook */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* 3D-Tilt Calligraphic Note Card */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="calligraphic-note-card"
            >
              <div style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif)',
                fontSize: '0.95rem',
                letterSpacing: '0.35em',
                color: '#D4AF37',
                borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                paddingBottom: '16px',
                marginBottom: '24px',
                transform: 'translateZ(20px)'
              }}>
                Maison Anima
              </div>
              
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                lineHeight: '1.9',
                color: '#1C1B1A',
                minHeight: '80px',
                textAlign: 'center',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                transform: 'translateZ(30px)'
              }}>
                "{giftNote}"
              </div>
              
              <div style={{
                textAlign: 'center',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#6A6764',
                marginTop: '30px',
                transform: 'translateZ(20px)'
              }}>
                Artisan Registry Bureau • Firenze
              </div>
            </div>

            {/* Shared Items List */}
            <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF' }}>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '24px' }}>Curated Items</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {sharedCart.map((item, index) => (
                  <div key={index} className="registry-item-card" style={{ borderBottom: index < sharedCart.length - 1 ? '1px solid #E5E2DE' : 'none', paddingBottom: index < sharedCart.length - 1 ? '30px' : '0' }}>
                    
                    {/* Item Image with Monogram rendered if it is custom bag */}
                    <div className="registry-item-img-wrapper">
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {item.monogram && (
                        <div 
                          className="monogram-gold"
                          style={{
                            position: 'absolute',
                            top: '51%',
                            left: '50.3%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '0.55rem',
                            fontFamily: 'var(--font-serif)',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            zIndex: 3,
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {item.monogram}
                        </div>
                      )}
                    </div>

                    {/* Item details */}
                    <div>
                      <h4 className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1C1B1A', marginBottom: '8px' }}>
                        {item.name}
                      </h4>
                      <p className="font-sans text-muted" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', lineHeight: '1.5' }}>
                        {item.meta} {item.monogram && `• Custom Monogram: "${item.monogram}"`}
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span className="font-sans text-xs text-muted">Quantity: {item.quantity}</span>
                        <span className="font-sans" style={{ fontSize: '1.05rem', fontWeight: 500 }}>
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Guestbook Section */}
            <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF' }}>
              <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#B97C52', fontSize: '0.7rem', display: 'block', marginBottom: '8px' }}>
                Boutique Registry Log
              </span>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '24px' }}>Registry Guestbook</h3>
              
              {/* Comment submission form */}
              <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }} className="font-sans">
                <div className="guestbook-fields-layout">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6A6764' }}>Guest Name</label>
                    <input 
                      type="text" 
                      required
                      id="guestNameInput"
                      placeholder="Aldo Anima" 
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6A6764' }}>Seal Initials</label>
                    <input 
                      type="text" 
                      maxLength={2}
                      id="guestInitialsInput"
                      placeholder="A.G." 
                      value={guestInitials}
                      onChange={(e) => setGuestInitials(e.target.value)}
                      style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', outline: 'none', textTransform: 'uppercase' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6A6764' }}>Congratulatory Message</label>
                  <textarea 
                    required
                    id="guestCommentInput"
                    placeholder="Leave a bespoke note in the curation registry..." 
                    value={guestComment}
                    onChange={(e) => setGuestComment(e.target.value)}
                    style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '12px 16px', fontSize: '0.85rem', outline: 'none', minHeight: '80px', resize: 'none', fontFamily: 'var(--font-sans)' }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submittingComment || !guestName || !guestComment}
                  id="guestCommentSubmitBtn"
                  style={{
                    backgroundColor: '#1C1B1A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    transition: 'all 0.3s'
                  }}
                  className="btn-hover-siena-bg"
                >
                  {submittingComment ? 'Stamping Seal...' : 'Stamp Guest Note'}
                </button>
              </form>

              {/* Guestbook List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {comments.length === 0 ? (
                  <p className="font-sans" style={{ textAlign: 'center', color: '#6A6764', fontSize: '0.85rem', padding: '20px 0' }}>
                    No handwritten guest notes yet. Be the first to leave a message.
                  </p>
                ) : (
                  comments.map((c, i) => (
                    <div 
                      key={c.id} 
                      className={`comment-card ${i === 0 ? 'comment-card-new' : ''}`}
                    >
                      {/* Wax Seal Initials */}
                      <div className="monogram-gold" style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        border: '2px solid #CFAC62',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '0.82rem',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em',
                        flexShrink: 0,
                        boxShadow: '0 4px 10px rgba(185,124,82,0.1)'
                      }}>
                        {c.initials}
                      </div>
                      
                      <div style={{ flexGrow: 1 }} className="font-sans">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 500, fontSize: '0.9rem', color: '#1C1B1A' }}>{c.name}</span>
                          <span style={{ fontSize: '0.72rem', color: '#6A6764' }}>{c.date}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#1C1B1A' }}>
                          {c.text}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>

          {/* Right Column: Registry Summary & Adopt Curation */}
          <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF', position: 'sticky', top: '100px' }}>
            <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '24px' }}>Registry Curation</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid #E5E2DE', paddingBottom: '20px', marginBottom: '24px' }} className="font-sans">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6A6764' }}>
                <span>Curated Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6A6764' }}>
                <span>Delivery Packaging</span>
                <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', color: '#17382B', fontWeight: 500 }}>
                  {giftWrapping === 'signature' ? 'Signature Box' : 'Eco-Canvas Wrap'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', color: '#1C1B1A', fontWeight: 500 }}>
                <span>Total Value</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <p className="font-sans" style={{ fontSize: '0.8rem', color: '#6A6764', lineHeight: '1.6', marginBottom: '30px' }}>
              By adopting this curation, all items in this registry—including specific leather colors, foils, and monograms—will be loaded directly into your active shopping session.
            </p>

            <button 
              onClick={handleAdoptCuration}
              id="adoptCurationBtn"
              className="checkout-btn"
              style={{ width: '100%' }}
            >
              Adopt Design to Bag
            </button>
            
            <Link 
              to="/collections" 
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '16px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#6A6764',
                transition: 'color 0.3s'
              }}
              className="link-hover-siena"
            >
              Explore Other Collections
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Registry;
