import React, { useState } from 'react';
import { MaisonCMS } from '../utils/api';
import ProductModal from '../components/ProductModal';
import { useCart } from '../context/CartContext';

const lookbookEntries = [
  {
    id: 1,
    title: 'Autumn Campaign Look 04',
    image: '/assets/hero_campaign.png',
    tag: 'Autumn Runway',
    hotspots: [
      { productId: '1', top: '35%', left: '48%' }, // The Horsebit Chain Pochette
      { productId: '5', top: '65%', left: '52%' }  // GG Heritage Saddle Belt
    ]
  },
  {
    id: 2,
    title: 'The Equestrian Signature Detail',
    image: '/assets/riding_boot.png',
    tag: 'Exquisite Leather Goods',
    hotspots: [
      { productId: '2', top: '50%', left: '42%' }  // Equestrian Leather Riding Boot
    ]
  }
];

function Journal() {
  const { addToCart } = useCart();
  const [activeProductId, setActiveProductId] = useState(null);
  const [productsMap, setProductsMap] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleHotspotClick = async (productId) => {
    if (activeProductId === productId) {
      setActiveProductId(null);
      return;
    }
    
    setActiveProductId(productId);
    
    // Dynamically retrieve product details from CMS if not already loaded
    if (!productsMap[productId]) {
      setLoadingProduct(true);
      try {
        const product = await MaisonCMS.fetchProductById(productId);
        setProductsMap((prev) => ({ ...prev, [productId]: product }));
      } catch (err) {
        console.error("Failed to load hotspot product from Maison registry:", err);
      } finally {
        setLoadingProduct(false);
      }
    }
  };

  const handleAddHotspotItem = (product) => {
    addToCart(product.id, product.name, product.price, product.image, product.meta);
    alert(`${product.name} has been added to your shopping bag.`);
  };

  // 3D Parallax Mouse Handlers
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - box.top) / box.height - 0.5; // -0.5 to 0.5
    
    card.style.transform = `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.02)`;
    
    const img = card.querySelector('.parallax-img');
    if (img) {
      img.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.06)`;
    }

    const row = card.parentElement;
    if (row) {
      const textCard = row.querySelector('.parallax-text-card');
      if (textCard) {
        textCard.style.transform = `translate(${-x * 18}px, ${-y * 18}px)`;
      }
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    
    const img = card.querySelector('.parallax-img');
    if (img) {
      img.style.transform = 'translate(0px, 0px) scale(1)';
    }
    
    const row = card.parentElement;
    if (row) {
      const textCard = row.querySelector('.parallax-text-card');
      if (textCard) {
        textCard.style.transform = 'translate(0px, 0px)';
      }
    }
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
              
              {/* Left Side: Interactive Parallax Hotspot Frame */}
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  position: 'relative', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  backgroundColor: '#F6F3EF',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 20px 45px rgba(28, 27, 26, 0.03)',
                  cursor: 'crosshair'
                }}
              >
                {/* Background Image inside frame */}
                <div style={{ overflow: 'hidden', width: '100%', height: 'auto', maxHeight: '600px' }}>
                  <img 
                    src={entry.image} 
                    alt={entry.title} 
                    className="parallax-img"
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      display: 'block', 
                      maxHeight: '600px', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} 
                  />
                </div>
                
                {/* Hotspots popped out in 3D */}
                {entry.hotspots.map((hs) => (
                  <div 
                    key={hs.productId}
                    style={{
                      position: 'absolute',
                      top: hs.top,
                      left: hs.left,
                      transform: 'translate(-50%, -50%) translateZ(30px)',
                      zIndex: 20
                    }}
                  >
                    <button 
                      onClick={() => handleHotspotClick(hs.productId)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#B97C52',
                        border: '2px solid #FFFFFF',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        animation: 'pulsePin 2s infinite',
                        outline: 'none',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15) translateZ(40px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateZ(30px)'}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Right Side: Editorial Text & Hotspot Details (Offsets in Parallax) */}
              <div 
                className="parallax-text-card"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '30px',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
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
                {activeProductId && entry.hotspots.some(h => h.productId === activeProductId) ? (
                  loadingProduct ? (
                    <div style={{ border: '1px dashed #E5E2DE', borderRadius: '8px', padding: '30px', textAlign: 'center', color: '#6A6764', fontSize: '0.85rem' }}>
                      <div style={{ display: 'inline-block', width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #B97C52', borderTopColor: 'transparent', animation: 'spinLoad 0.8s infinite linear', marginBottom: '8px' }}></div>
                      <p>Querying Maison registry...</p>
                    </div>
                  ) : productsMap[activeProductId] ? (
                    <div className="font-sans" style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E2DE',
                      borderRadius: '8px',
                      padding: '24px',
                      boxShadow: '0 10px 30px rgba(28,27,26,0.03)',
                      animation: 'slideInCard 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                      <span style={{ fontSize: '0.7rem', color: '#B97C52', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
                        Featured Catalog Piece
                      </span>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 500, color: '#1C1B1A', marginBottom: '6px' }}>
                        {productsMap[activeProductId].name}
                      </h4>
                      <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6A6764', marginBottom: '10px' }}>
                        {productsMap[activeProductId].meta}
                      </span>
                      <p style={{ fontSize: '0.82rem', color: '#6A6764', lineHeight: '1.6', marginBottom: '20px' }}>
                        {productsMap[activeProductId].description}
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #E5E2DE', paddingTop: '16px' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 500 }}>
                          ${productsMap[activeProductId].price.toLocaleString()}
                        </span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            onClick={() => setSelectedProduct(productsMap[activeProductId])}
                            style={{
                              backgroundColor: 'transparent',
                              color: '#1C1B1A',
                              border: '1px solid #1C1B1A',
                              padding: '10px 20px',
                              borderRadius: '20px',
                              fontSize: '0.7rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
                              cursor: 'pointer',
                              transition: 'all 0.3s'
                            }}
                            className="btn-hover-dark"
                          >
                            Quick View
                          </button>
                          <button 
                            onClick={() => handleAddHotspotItem(productsMap[activeProductId])}
                            style={{
                              backgroundColor: '#1C1B1A',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '10px 20px',
                              borderRadius: '20px',
                              fontSize: '0.7rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
                              cursor: 'pointer',
                              transition: 'all 0.3s'
                            }}
                            className="btn-hover-siena-bg"
                          >
                            Shop Item
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null
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

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

export default Journal;
