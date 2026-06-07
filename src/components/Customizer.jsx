import React, { useState, useEffect } from 'react';

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

const STAMP_LOCATIONS = {
  strap: { label: 'Center Strap', top: '53.5%', left: '50.3%', zoomX: 0, zoomY: -12 },
  front: { label: 'Front Panel', top: '65%', left: '50.3%', zoomX: 0, zoomY: -38 },
  clasp: { label: 'Artisanal Clasp', top: '44%', left: '50.3%', zoomX: 0, zoomY: 10 }
};

function Customizer({ onAddToCart, defaultPrefs, onUpdatePrefs }) {
  const [color, setColor] = useState('original');
  const [colorName, setColorName] = useState('Siena Tan');
  const [monogramInput, setMonogramInput] = useState(defaultPrefs?.initials || '');
  const [appliedMonogram, setAppliedMonogram] = useState(defaultPrefs?.initials || '');
  const [stampLocation, setStampLocation] = useState(defaultPrefs?.position || 'strap');
  const [foil, setFoil] = useState(defaultPrefs?.foil || 'gold'); // gold | blind
  const [isStamped, setIsStamped] = useState(!!defaultPrefs?.initials);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (defaultPrefs) {
      setMonogramInput(defaultPrefs.initials || '');
      setAppliedMonogram(defaultPrefs.initials || '');
      setStampLocation(defaultPrefs.position || 'strap');
      setFoil(defaultPrefs.foil || 'gold');
      setIsStamped(!!defaultPrefs.initials);
    }
  }, [defaultPrefs]);

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
      if (onUpdatePrefs) {
        onUpdatePrefs({ initials: val, foil, position: stampLocation });
      }
      
      // Stamp Animation
      if (window.gsap) {
        const gsap = window.gsap;
        
        // 1. Hot stamp landing flash on stage
        gsap.fromTo('.preview-stage', 
          { filter: 'brightness(1.5) contrast(0.95)' },
          { filter: 'brightness(1) contrast(1)', duration: 0.8, ease: 'power2.out' }
        );

        // 2. Monogram text slams down with 3D scale impact
        gsap.fromTo('.monogram-text-render',
          { scale: 3.5, opacity: 0, filter: 'blur(4px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(2)' }
        );

        // 3. Steam puff effect (represented by a tiny glowing circular expander)
        const stage = document.querySelector('.preview-stage');
        if (stage) {
          const puff = document.createElement('div');
          puff.className = 'steam-puff';
          puff.style.position = 'absolute';
          puff.style.top = STAMP_LOCATIONS[stampLocation].top;
          puff.style.left = STAMP_LOCATIONS[stampLocation].left;
          puff.style.width = '10px';
          puff.style.height = '10px';
          puff.style.borderRadius = '50%';
          puff.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(212,175,55,0) 70%)';
          puff.style.transform = 'translate(-50%, -50%)';
          puff.style.zIndex = '5';
          stage.appendChild(puff);

          gsap.to(puff, {
            width: '120px',
            height: '120px',
            opacity: 0,
            duration: 0.8,
            onComplete: () => puff.remove()
          });
        }

        // 4. Subtle shake on the bag wrapper representing stamping impact
        gsap.fromTo('.bag-zoom-wrapper',
          { y: '+=3px', rotate: 0.5 },
          { y: '0px', rotate: 0, duration: 0.35, ease: 'elastic.out(1, 0.3)' }
        );

        // 5. Monogram input flash
        gsap.fromTo('#monogramInput', 
          { borderColor: '#B97C52', scale: 1.02 },
          { borderColor: '#E5E2DE', scale: 1, duration: 0.6, ease: 'power2.out' }
        );
      }
    } else {
      setAppliedMonogram('');
      setIsStamped(false);
      if (onUpdatePrefs) {
        onUpdatePrefs({ initials: '', foil, position: stampLocation });
      }
    }
  };

  const handleAddCustomToBag = () => {
    const name = "The Custom Jackie Bag";
    const meta = `Finish: ${colorName} • Foil: ${foil === 'gold' ? 'Gold Embossed' : 'Blind Debossed'} • Position: ${STAMP_LOCATIONS[stampLocation].label}`;
    onAddToCart('custom-jackie', name, price, `/assets/jackie_${color}.png`, meta, appliedMonogram);
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
            <div className="preview-stage" style={{ position: 'relative', overflow: 'hidden' }}>
              <div className="stage-backdrop"></div>
              <div 
                className="aura-glow" 
                id="auraGlow" 
                style={{ backgroundColor: auraGlowColors[color] }}
              ></div>

              {/* Dynamic Zoom Wrapper */}
              <div 
                className="bag-zoom-wrapper"
                style={{
                  position: 'relative',
                  zIndex: 3,
                  width: '70%',
                  height: '70%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isZoomed 
                    ? `scale(2.3) translate(${STAMP_LOCATIONS[stampLocation].zoomX}%, ${STAMP_LOCATIONS[stampLocation].zoomY}%)` 
                    : 'scale(1) translate(0, 0)',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Simulated leather grain noise visible when zoomed */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    pointerEvents: 'none',
                    opacity: isZoomed ? 0.08 : 0,
                    transition: 'opacity 0.8s ease',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                    mixBlendMode: 'overlay'
                  }}
                />

                {/* Stack of Bag Colors */}
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {[
                    { key: 'original', src: '/assets/jackie_tan.png' },
                    { key: 'rosso', src: '/assets/jackie_rosso.png' },
                    { key: 'smeraldo', src: '/assets/jackie_smeraldo.png' },
                    { key: 'nero', src: '/assets/jackie_nero.png' }
                  ].map((variant) => (
                    <img
                      key={variant.key}
                      src={variant.src}
                      alt={`Jackie Bag - ${variant.key}`}
                      className="customizer-image"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        position: 'absolute',
                        opacity: color === variant.key ? 1 : 0,
                        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        filter: 'drop-shadow(0 25px 40px rgba(28, 27, 26, 0.12))'
                      }}
                    />
                  ))}

                  {/* Stamped Monogram Overlay */}
                  {appliedMonogram && (
                    <div
                      className={`monogram-text-render ${foil === 'gold' ? 'monogram-gold' : 'monogram-blind-' + color}`}
                      style={{
                        position: 'absolute',
                        top: STAMP_LOCATIONS[stampLocation].top,
                        left: STAMP_LOCATIONS[stampLocation].left,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 4,
                        fontFamily: 'var(--font-serif)',
                        fontSize: isZoomed ? '0.72rem' : '0.4rem',
                        letterSpacing: '0.12em',
                        fontWeight: 600,
                        pointerEvents: 'none',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        transition: 'top 0.6s cubic-bezier(0.16, 1, 0.3, 1), left 0.6s cubic-bezier(0.16, 1, 0.3, 1), font-size 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {appliedMonogram}
                    </div>
                  )}
                </div>
              </div>

              {/* Detail Inspection Controls */}
              {appliedMonogram && (
                <button 
                  className="zoom-inspect-btn"
                  onClick={() => setIsZoomed(!isZoomed)}
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 10,
                    backgroundColor: 'rgba(28, 27, 26, 0.85)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-sans)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    cursor: 'pointer',
                    backdropFilter: 'blur(5px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s'
                  }}
                >
                  {isZoomed ? '✕ Close Zoom' : '🔍 Detail Zoom'}
                </button>
              )}
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

            {/* Stamping Position Selector */}
            <div className="control-group">
              <span className="control-label">Stamping Position</span>
              <div style={{ display: 'flex', gap: '10px' }} className="font-sans">
                {Object.entries(STAMP_LOCATIONS).map(([key, loc]) => (
                  <button 
                    key={key}
                    onClick={() => {
                      setStampLocation(key);
                      if (onUpdatePrefs) {
                        onUpdatePrefs({ initials: appliedMonogram, foil, position: key });
                      }
                      // Visual flash on relocation
                      if (window.gsap && appliedMonogram) {
                        window.gsap.fromTo('.monogram-text-render', 
                          { opacity: 0.3 }, 
                          { opacity: 1, duration: 0.4 }
                        );
                      }
                    }}
                    style={{
                      border: stampLocation === key ? '1px solid #B97C52' : '1px solid #E5E2DE',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: stampLocation === key ? '#FFFFFF' : 'var(--text-dark)',
                      backgroundColor: stampLocation === key ? '#B97C52' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Foil Style Selector */}
            <div className="control-group">
              <span className="control-label">Stamping Foil</span>
              <div style={{ display: 'flex', gap: '16px' }} className="font-sans">
                 <button 
                  onClick={() => {
                    setFoil('gold');
                    if (onUpdatePrefs) {
                      onUpdatePrefs({ initials: appliedMonogram, foil: 'gold', position: stampLocation });
                    }
                  }}
                  style={{
                    border: foil === 'gold' ? '1px solid #B97C52' : '1px solid #E5E2DE',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: foil === 'gold' ? '#FFFFFF' : 'var(--text-dark)',
                    backgroundColor: foil === 'gold' ? '#B97C52' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  Gold Foil
                </button>
                <button 
                  onClick={() => {
                    setFoil('blind');
                    if (onUpdatePrefs) {
                      onUpdatePrefs({ initials: appliedMonogram, foil: 'blind', position: stampLocation });
                    }
                  }}
                  style={{
                    border: foil === 'blind' ? '1px solid #1C1B1A' : '1px solid #E5E2DE',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: foil === 'blind' ? '#FFFFFF' : 'var(--text-dark)',
                    backgroundColor: foil === 'blind' ? '#1C1B1A' : 'transparent',
                    cursor: 'pointer',
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
                  onChange={(e) => {
                    setMonogramInput(e.target.value);
                    setIsStamped(false); // require user to hit stamp again to see impact
                  }}
                  style={{ 
                    background: '#FFFFFF', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '20px',
                    padding: '12px 20px', 
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
                    backgroundColor: '#17382B',
                    color: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '12px 24px', 
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    border: 'none',
                    cursor: 'pointer'
                  } : {
                    border: '1px solid var(--text-dark)', 
                    padding: '12px 24px', 
                    borderRadius: '20px',
                    fontFamily: 'var(--font-sans)', 
                    textTransform: 'uppercase', 
                    fontSize: '0.7rem', 
                    letterSpacing: '0.15em',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {isStamped ? '✓ Stamped' : 'Stamp'}
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