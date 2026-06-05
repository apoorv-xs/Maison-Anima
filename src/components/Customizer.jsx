import React, { useState } from 'react';


const swatchesList = [
  { color: 'original', name: 'Siena Tan', hex: '#B97C52' },
  { color: 'rosso', name: 'Ancora Rosso', hex: '#5E1914' },
  { color: 'smeraldo', name: 'Verde Smeraldo', hex: '#17382B' },
  { color: 'nero', name: 'Nero Matt', hex: '#333333' }
];

const auraGlowColors = {
  original: '#B97C52',
  rosso: '#5E1914',
  smeraldo: '#17382B',
  nero: '#333333'
};

function Customizer({ onAddToCart }) {
  const [color, setColor] = useState('original');
  const [colorName, setColorName] = useState('Siena Tan');
  const [monogramInput, setMonogramInput] = useState('');
  const [appliedMonogram, setAppliedMonogram] = useState('');
  const [foil, setFoil] = useState('gold'); // gold | blind
  const [isStamped, setIsStamped] = useState(false);

  const price = 2950;

  const handleSwatchClick = (swatch) => {
    setColor(swatch.color);
    setColorName(swatch.name);
    
    if (window.gsap) {
      window.gsap.fromTo('#selectedColorName', 
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  const handleApplyMonogram = () => {
    const val = monogramInput.trim().toUpperCase();
    if (val) {
      setAppliedMonogram(val);
      setIsStamped(true);
      if (window.gsap) {
        // Stamping flash glow simulation
        window.gsap.fromTo('.preview-stage', 
          { backgroundColor: '#FFFFFF' },
          { backgroundColor: '#EDEDE8', duration: 0.8, ease: 'power2.out' }
        );
        window.gsap.fromTo('#monogramInput', 
          { borderColor: '#B97C52', scale: 1.02 },
          { borderColor: '#E5E2DE', scale: 1, duration: 0.6, ease: 'power2.out' }
        );
      }
    } else {
      setAppliedMonogram('');
      setIsStamped(false);
    }
  };

  const handleAddCustomToBag = () => {
    const name = "The Custom Jackie Bag";
    const meta = `Finish: ${colorName} • Foil: ${foil === 'gold' ? 'Gold Embossed' : 'Blind Debossed'}`;
    onAddToCart('custom-jackie', name, price, '/assets/jackie_bag.png', meta, appliedMonogram);
  };

  return (
    <section id="customizer" className="customizer-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-pretitle">Maison Customization</span>
          <h2 className="section-title">Aura Jackie Customizer</h2>
          <div className="divider"></div>
        </div>
        <div className="customizer-layout">
          <div className="customizer-preview">
            <div className="preview-stage" style={{ position: 'relative' }}>
              <div className="stage-backdrop"></div>
              <div 
                className="aura-glow" 
                id="auraGlow" 
                style={{ backgroundColor: auraGlowColors[color] }}
              ></div>

              {/* 4 stacked bag images — cross-fade between colors */}
              <div style={{ position: 'relative', zIndex: 3, width: '70%' }}>
                {[
                  { key: 'original', src: '/assets/jackie_tan.png' },
                  { key: 'rosso', src: '/assets/jackie_rosso.png' },
                  { key: 'smeraldo', src: '/assets/jackie_smeraldo.png' },
                  { key: 'nero', src: '/assets/jackie_nero.png' }
                ].map((variant, i) => (
                  <img
                    key={variant.key}
                    src={variant.src}
                    alt={`Jackie Bag - ${variant.key}`}
                    className="customizer-image"
                    style={{
                      width: '100%',
                      position: i === 0 ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      opacity: color === variant.key ? 1 : 0,
                      transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="customizer-controls">
            <p className="customizer-intro">
              Personalize the iconic Jackie Bag. Stamped with custom hot-embossed monograms and select artisanal leather finishes.
            </p>
            
            {/* Finish Selector */}
            <div className="control-group">
              <span className="control-label">Artisanal Finish</span>
              <div className="swatches-container">
                {swatchesList.map((swatch) => (
                  <button 
                    key={swatch.color}
                    className={`swatch ${color === swatch.color ? 'active' : ''}`} 
                    style={{ backgroundColor: swatch.hex }}
                    onClick={() => handleSwatchClick(swatch)}
                  ></button>
                ))}
              </div>
              <span className="selected-color-name" id="selectedColorName">{colorName}</span>
            </div>

            {/* Foil Style Selector */}
            <div className="control-group">
              <span className="control-label">Stamping Foil</span>
              <div style={{ display: 'flex', gap: '16px' }} className="font-sans">
                <button 
                  onClick={() => setFoil('gold')}
                  style={{
                    border: foil === 'gold' ? '1px solid #B97C52' : '1px solid #E5E2DE',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: foil === 'gold' ? '#FFFFFF' : 'var(--text-dark)',
                    backgroundColor: foil === 'gold' ? '#B97C52' : 'transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  Gold Foil
                </button>
                <button 
                  onClick={() => setFoil('blind')}
                  style={{
                    border: foil === 'blind' ? '1px solid #1C1B1A' : '1px solid #E5E2DE',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: foil === 'blind' ? '#FFFFFF' : 'var(--text-dark)',
                    backgroundColor: foil === 'blind' ? '#1C1B1A' : 'transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  Blind Debossed
                </button>
              </div>
            </div>

            {/* Monogram Stamping */}
            <div className="control-group">
              <span className="control-label">Initials Hot Stamping</span>
              <div className="monogram-input-wrapper">
                <input 
                  type="text" 
                  id="monogramInput" 
                  className="monogram-input" 
                  placeholder="A.S." 
                  maxLength={4} 
                  value={monogramInput}
                  onChange={(e) => setMonogramInput(e.target.value)}
                  style={{ 
                    background: 'transparent', 
                    border: '1px solid var(--border-color)', 
                    padding: '12px', 
                    color: 'var(--text-dark)', 
                    fontFamily: 'var(--font-sans)', 
                    textTransform: 'uppercase' 
                  }} 
                />
                <button 
                  id="applyMonogramBtn" 
                  className="apply-monogram-btn" 
                  onClick={handleApplyMonogram}
                  style={isStamped ? { 
                    backgroundColor: '#B97C52',
                    color: '#FFFFFF'
                  } : {
                    border: '1px solid var(--text-dark)', 
                    padding: '12px 24px', 
                    fontFamily: 'var(--font-sans)', 
                    textTransform: 'uppercase', 
                    fontSize: '0.7rem', 
                    letterSpacing: '0.15em'
                  }}
                >
                  {isStamped ? 'Stamped' : 'Stamp'}
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="control-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                <span className="font-serif text-2xl" id="customizerPrice" style={{ fontSize: '1.8rem' }}>
                  ${price.toLocaleString()}
                </span>
              </div>
              <button 
                id="addCustomBtn" 
                className="checkout-btn" 
                onClick={handleAddCustomToBag}
                style={{ maxWidth: '320px' }}
              >
                Curate and Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Styles for gold shimmer keyframe animation */}
      <style>{`
        @keyframes goldShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}

export default Customizer;