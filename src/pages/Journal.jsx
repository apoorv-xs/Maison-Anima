import React, { useState } from 'react';

const lookbookEntries = [
  {
    id: 1,
    title: 'Autumn Campaign Look 04',
    image: '/assets/hero_campaign.png',
    tag: 'Autumn Runway',
    hotspots: [
      { id: 'hs-1', name: 'Classic Silk Bandana', price: 495, top: '35%', left: '48%', meta: 'Equestrian Silk' },
      { id: 'hs-2', name: 'Leather Harness Waist Belt', price: 690, top: '65%', left: '52%', meta: 'Archival Collection' }
    ]
  },
  {
    id: 2,
    title: 'The Equestrian Signature Detail',
    image: '/assets/riding_boot.png',
    tag: 'Exquisite Leather Goods',
    hotspots: [
      { id: 'hs-3', name: 'Equestrian Riding Boots', price: 1450, top: '50%', left: '42%', meta: 'Vintage Archive' }
    ]
  }
];

function Journal({ onAddToCart }) {
  const [activeHotspot, setActiveHotspot] = useState(null);

  const handleAddHotspotItem = (item) => {
    onAddToCart(item.id, item.name, item.price, '/assets/jackie_bag.png', item.meta);
    alert(`${item.name} has been added to your shopping bag.`);
  };

  return (
    <section className="editorial-section" style={{ minHeight: '100vh', backgroundColor: '#FDFBF7' }}>
      <div className="section-container" style={{ maxWidth: '1200px' }}>
        <div className="section-header">
          <span className="section-pretitle">Maison Lookbook</span>
          <h2 className="section-title">Equestrian Journal</h2>
          <div className="divider"></div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
          {lookbookEntries.map((entry) => (
            <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
              
              {/* Left Side: Interactive Hotspot Image */}
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#F6F3EF' }}>
                <img 
                  src={entry.image} 
                  alt={entry.title} 
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '600px', objectFit: 'cover' }} 
                />
                
                {/* Hotspots */}
                {entry.hotspots.map((hs) => (
                  <div 
                    key={hs.id}
                    style={{
                      position: 'absolute',
                      top: hs.top,
                      left: hs.left,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 20
                    }}
                  >
                    <button 
                      onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#B97C52',
                        border: '2px solid #FFFFFF',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        animation: 'pulsePin 2s infinite',
                        outline: 'none'
                      }}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Right Side: Editorial Text & Hotspot Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}>
                  {entry.tag}
                </span>
                <h3 className="font-serif" style={{ fontSize: '2.4rem', fontWeight: 400, color: '#1C1B1A', lineHeight: '1.2' }}>
                  {entry.title}
                </h3>
                <p className="product-description" style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                  A study in equestrian balance. Exploring classic lines styled with contemporary proportions, this look honors the foundational saddle-making heritage of the House.
                </p>
                
                {/* Selected Hotspot Card */}
                {activeHotspot && entry.hotspots.some(h => h.id === activeHotspot.id) ? (
                  <div className="font-sans" style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E2DE',
                    borderRadius: '8px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(28,27,26,0.03)',
                    animation: 'slideInCard 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    <span style={{ fontSize: '0.7rem', color: '#B97C52', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
                      Featured Item
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1C1B1A', marginBottom: '6px' }}>
                      {activeHotspot.name}
                    </h4>
                    <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, marginBottom: '16px' }}>
                      ${activeHotspot.price.toLocaleString()}
                    </span>
                    <button 
                      onClick={() => handleAddHotspotItem(activeHotspot)}
                      style={{
                        backgroundColor: '#1C1B1A',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#B97C52'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#1C1B1A'}
                    >
                      Shop Item
                    </button>
                  </div>
                ) : (
                  <div style={{
                    border: '1px dashed #E5E2DE',
                    borderRadius: '8px',
                    padding: '24px',
                    textAlign: 'center',
                    color: '#6A6764',
                    fontSize: '0.85rem'
                  }}>
                    Click the <span style={{ color: '#B97C52', fontWeight: 500 }}>+</span> pins on the campaign photograph to explore and shop items worn by the model.
                  </div>
                )}
              </div>
              
            </div>
          ))}
        </div>
      </div>
      
      {/* Styles for Pin Pulse Animation */}
      <style>{`
        @keyframes pulsePin {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(185, 124, 82, 0.5); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(185, 124, 82, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(185, 124, 82, 0); }
        }
        @keyframes slideInCard {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default Journal;
