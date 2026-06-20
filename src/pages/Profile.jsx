import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMonogram } from '../context/MonogramContext';
import { gsap } from '../utils/gsap';

function Profile() {
  const { currentUser, logout, userOrders } = useAuth();
  const { monogramPrefs, updatePrefs } = useMonogram();
  const [initials, setInitials] = useState(monogramPrefs?.initials || '');
  const [foil, setFoil] = useState(monogramPrefs?.foil || 'gold');
  const [position, setPosition] = useState(monogramPrefs.position || 'strap');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [registryTokens, setRegistryTokens] = useState([]);

  // Load registry tokens synced on this device
  useEffect(() => {
    document.title = "Maison Anima — Private Client Salon";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Access your Maison Anima Private Client Salon, virtual wardrobe, and default monogram preferences.");
    }

    try {
      const db = JSON.parse(localStorage.getItem('maison_cloud_db') || '{}');
      // Gather all tokens that have items synced
      const tokens = Object.keys(db).map(key => ({
        token: key,
        syncedAt: new Date(db[key].syncedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        itemCount: db[key].cart ? db[key].cart.reduce((sum, item) => sum + item.quantity, 0) : 0
      }));
      setRegistryTokens(tokens);
    } catch {
      setRegistryTokens([]);
    }
  }, []);

  const handlePreferencesSubmit = (e) => {
    e.preventDefault();
    updatePrefs({ initials: initials.toUpperCase(), foil, position });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);

    if (gsap) {
      gsap.fromTo('.save-alert',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 }
      );
    }
  };

  const statusColors = {
    "Steeping in Tuscan Dye Baths": "#B97C52",
    "Saddle Stitching in Progress": "#17382B",
    "Embossing Monogram": "#D4AF37",
    "En Route via Florence Courier": "#5E1914",
    "Delivered": "#17382B"
  };

  return (
    <section className="editorial-section" style={{ minHeight: '100vh', backgroundColor: '#FDFBF7' }}>
      <div className="section-container" style={{ maxWidth: '1200px' }}>
        
        {/* Header */}
        <div className="section-header">
          <span className="section-pretitle">Client Registry</span>
          <h1 className="section-title" style={{ fontSize: '3rem', fontWeight: 300 }}>
            Private Client Salon
          </h1>
          <div className="divider"></div>
        </div>

        <div className="profile-layout">
          
          {/* Left Column: Member ID Card and Preferences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Private Client ID Card */}
            <div style={{
              border: '1px solid #D4AF37',
              borderRadius: '16px',
              backgroundColor: '#1C1B1A',
              color: '#FFFFFF',
              padding: '30px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              position: 'relative',
              backgroundImage: 'radial-gradient(circle at top right, rgba(212,175,55,0.12) 0%, transparent 80%)',
              overflow: 'hidden'
            }}>
              {/* Gold watermark logo */}
              <div style={{
                position: 'absolute',
                bottom: '-20px', right: '-25px',
                fontFamily: 'var(--font-serif)',
                fontSize: '6rem',
                color: 'rgba(212, 175, 55, 0.04)',
                pointerEvents: 'none',
                fontWeight: 'bold',
                userSelect: 'none'
              }}>
                ANIMA
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '40px' }}>
                <div>
                  <span className="font-sans" style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#D4AF37', fontWeight: 600 }}>
                    Maison Member Card
                  </span>
                  <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 300, marginTop: '8px', color: '#FFFFFF' }}>
                    {currentUser.name}
                  </h3>
                  <span className="font-sans" style={{ fontSize: '0.75rem', color: '#9A9895' }}>
                    {currentUser.email}
                  </span>
                </div>
                
                {/* VIP Wax Stamp Badge */}
                <div className="monogram-gold" style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  border: '2px solid #D4AF37',
                  backgroundColor: '#A30026',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(163,0,38,0.3)'
                }}>
                  {currentUser.avatarInitials}
                </div>
              </div>

              <div className="profile-card-details-grid font-sans">
                <div>
                  <span style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9A9895', display: 'block', marginBottom: '4px' }}>Client Level</span>
                  <span style={{ fontSize: '0.78rem', color: '#D4AF37', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>⚜ {currentUser.tier}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9A9895', display: 'block', marginBottom: '4px' }}>Registry Key ID</span>
                  <span style={{ fontSize: '0.72rem', color: '#FFFFFF', letterSpacing: '0.05em' }}>{currentUser.memberId}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9A9895', display: 'block', marginBottom: '4px' }}>Member Since</span>
                  <span style={{ fontSize: '0.78rem', color: '#FFFFFF' }}>{currentUser.since}</span>
                </div>
                <div>
                  <button 
                    onClick={logout}
                    id="logoutBtn"
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#A30026',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginTop: '8px',
                      padding: 0,
                      textAlign: 'left'
                    }}
                  >
                    Logout Session
                  </button>
                </div>
              </div>

            </div>

            {/* Artisanal Monogram Preferences */}
            <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF' }}>
              <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#B97C52', fontSize: '0.7rem', display: 'block', marginBottom: '8px' }}>
                Default Preferences
              </span>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '24px' }}>Bespoke Styling Prefs</h3>
              
              <form onSubmit={handlePreferencesSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="font-sans">
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500 }}>Monogram Initials</label>
                  <input 
                    type="text" 
                    maxLength={4}
                    id="profileInitialsInput"
                    placeholder="A.S." 
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
                    style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', textTransform: 'uppercase', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500 }}>Foil Style</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['gold', 'blind'].map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setFoil(style)}
                        style={{
                          flex: 1,
                          border: foil === style ? '1px solid #B97C52' : '1px solid #E5E2DE',
                          backgroundColor: foil === style ? '#B97C52' : 'transparent',
                          color: foil === style ? '#FFFFFF' : 'var(--text-dark)',
                          padding: '8px',
                          borderRadius: '20px',
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                      >
                        {style === 'gold' ? 'Gold Foil' : 'Blind Deboss'}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500 }}>Stamp Location</label>
                  <select 
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', outline: 'none', background: '#FFFFFF', cursor: 'pointer' }}
                  >
                    <option value="strap">Center Strap</option>
                    <option value="front">Front Panel</option>
                    <option value="clasp">Artisanal Clasp</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  id="profileSavePrefsBtn"
                  className="checkout-btn"
                  style={{ width: '100%', padding: '12px' }}
                >
                  Save Styling Profiles
                </button>

                {saveSuccess && (
                  <p className="save-alert font-sans" style={{ fontSize: '0.75rem', color: '#17382B', margin: 0, textAlign: 'center', fontWeight: 500 }}>
                    ✓ Custom preferences synced to browser session!
                  </p>
                )}
              </form>
            </div>

          </div>

          {/* Right Column: Virtual Wardrobe (Order History) & Registry list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Virtual Wardrobe */}
            <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF' }}>
              <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#17382B', fontSize: '0.7rem', display: 'block', marginBottom: '8px' }}>
                Acquisitions Log
              </span>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '24px' }}>Virtual Wardrobe</h3>
              
              {userOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }} className="font-sans">
                  <p style={{ color: '#6A6764', fontSize: '0.85rem', marginBottom: '20px' }}>You haven't acquired any Maison pieces yet.</p>
                  <Link to="/customizer" className="checkout-btn" style={{ padding: '12px 28px', display: 'inline-block', width: 'auto' }}>Configure Jackie Bag</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  {userOrders.map((order) => (
                    <div key={order.id} style={{ borderBottom: '1px solid #E5E2DE', paddingBottom: '24px' }}>
                      <div className="acquisition-log-header font-sans">
                        <div>
                          <span style={{ fontSize: '0.78rem', fontWeight: 500, color: '#1C1B1A' }}>{order.id}</span>
                          <span style={{ fontSize: '0.75rem', color: '#6A6764', marginLeft: '12px' }}>{order.date}</span>
                        </div>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: statusColors[order.status] }}>
                          ● {order.status}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="wardrobe-item-row">
                            <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', backgroundColor: '#F6F3EF' }} />
                            <div style={{ flexGrow: 1 }} className="font-sans">
                              <h5 className="font-serif" style={{ fontSize: '0.98rem', fontWeight: 500, color: '#1C1B1A', margin: 0 }}>{item.name}</h5>
                              <p style={{ fontSize: '0.68rem', color: '#6A6764', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '2px 0 0' }}>
                                {item.meta} {item.monogram && `• Monogram: "${item.monogram}"`}
                              </p>
                            </div>
                            <span className="font-sans" style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                              ${item.price.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '16px', borderTop: '1px dashed #E5E2DE', paddingTop: '12px' }} className="font-sans">
                        <span style={{ fontSize: '0.75rem', color: '#6A6764' }}>Payment Status: Approved</span>
                        <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Total: ${order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Synced Registries List */}
            <div style={{ border: '1px solid #E5E2DE', borderRadius: '12px', padding: '30px', backgroundColor: '#FFFFFF' }}>
              <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#17382B', fontSize: '0.7rem', display: 'block', marginBottom: '8px' }}>
                Cloud Backup Logs
              </span>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '20px' }}>Synced Cloud Registries</h3>
              
              {registryTokens.length === 0 ? (
                <p className="font-sans" style={{ color: '#6A6764', fontSize: '0.85rem', textAlign: 'center', padding: '20px 0' }}>
                  No active cloud synced registries found on this device.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="font-sans">
                  {registryTokens.map((t, idx) => (
                    <div key={idx} className="synced-registry-row">
                      <div>
                        <Link to={`/registry/${t.token}`} style={{ fontSize: '0.85rem', fontWeight: 600, color: '#B97C52', textDecoration: 'underline' }}>
                          {t.token}
                        </Link>
                        <span style={{ fontSize: '0.68rem', color: '#6A6764', display: 'block', marginTop: '2px' }}>
                          Synced on {t.syncedAt} • {t.itemCount} items
                        </span>
                      </div>
                      <button
                        onClick={async () => {
                          const url = `${window.location.origin}/registry/${t.token}`;
                          try {
                            await navigator.clipboard.writeText(url);
                            alert(`Registry share link copied to clipboard: ${url}`);
                          } catch {
                            window.prompt('Copy this link:', url);
                          }
                        }}
                        style={{
                          border: '1px solid #1C1B1A',
                          padding: '6px 12px',
                          borderRadius: '15px',
                          fontSize: '0.65rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        className="btn-hover-dark"
                      >
                        Share
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Profile;
