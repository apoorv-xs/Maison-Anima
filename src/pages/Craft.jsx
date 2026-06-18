import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../utils/gsap';

function Craft() {
  useEffect(() => {
    document.title = "Maison Anima — Artisanal Crafts";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Explore the Florence artisanal chronology: sorting Tuscan hides, saddle-stitching, heated bamboo bended handles, and hot brass stamping.");
    }

    if (gsap) {

      gsap.fromTo('.craft-desc-1',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.craft-scene-1',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const stitchPath = document.getElementById('stitchPath');
      if (stitchPath) {
        const length = stitchPath.getTotalLength();
        stitchPath.style.strokeDasharray = length;
        stitchPath.style.strokeDashoffset = length;

        gsap.to(stitchPath, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.craft-scene-2',
            start: 'top 50%',
            end: 'bottom 40%',
            scrub: true
          }
        });
      }

      gsap.to('.temp-bar-fill', {
        width: '100%',
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.craft-scene-3',
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true
        }
      });

      // Bending/curving the bamboo handle dynamically as the user scrolls
      gsap.to('#bambooPath', {
        attr: { d: 'M 15,90 C 15,20 85,20 85,90' },
        scrollTrigger: {
          trigger: '.craft-scene-3',
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true
        }
      });

      gsap.to('#bambooGlowPath', {
        attr: { d: 'M 15,90 C 15,20 85,20 85,90' },
        scrollTrigger: {
          trigger: '.craft-scene-3',
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true
        }
      });

      // Counting up the temperature value from 20°C to 180°C in real-time
      const tempObj = { value: 20 };
      const tempValElement = document.querySelector('.temp-value');
      gsap.to(tempObj, {
        value: 180,
        scrollTrigger: {
          trigger: '.craft-scene-3',
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true,
          onUpdate: () => {
            if (tempValElement) {
              tempValElement.textContent = Math.round(tempObj.value);
            }
          }
        }
      });

      gsap.to('.craft-bamboo-img', {
        filter: 'drop-shadow(0 0 25px rgba(212,175,55,0.6)) brightness(1.1)',
        scrollTrigger: {
          trigger: '.craft-scene-3',
          start: 'top 50%',
          end: 'bottom 70%',
          scrub: true
        }
      });

      const stampTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.craft-scene-4',
          start: 'top 60%',
          end: 'bottom 90%',
          toggleActions: 'play none none reverse'
        }
      });

      stampTimeline.fromTo('.craft-stamp-block',
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'bounce.out' }
      );
      stampTimeline.fromTo('.craft-leather-backing',
        { scaleY: 1 },
        { scaleY: 0.96, duration: 0.2, ease: 'power2.out' },
        '-=0.2'
      );
      stampTimeline.fromTo('.craft-gold-imprint',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div className="craft-page" style={{ backgroundColor: '#FDFBF7', color: '#1C1B1A' }}>
      <section className="editorial-section" style={{ padding: '160px 0 60px' }}>
        <div className="section-container" style={{ textAlign: 'center' }}>
          <span className="section-pretitle">The Heritage Studio</span>
          <h1 className="section-title" style={{ fontSize: '4rem', fontWeight: 300, letterSpacing: '0.05em' }}>
            Artisanal Chronology
          </h1>
          <div className="divider"></div>
          <p className="product-description" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.8' }}>
            A visual documentation of the manual processes, raw selections, and ancestral methods that forge every individual luxury bag in our Florentine workshop.
          </p>
        </div>
      </section>

      {/* Scene 1 */}
      <section className="craft-scene-1" style={{ minHeight: '80vh', padding: '100px 0', borderTop: '1px solid #E5E2DE', display: 'flex', alignItems: 'center' }}>
        <div className="section-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'center' }}>
          <div className="craft-desc-1">
            <span style={{ fontSize: '0.75rem', color: '#B97C52', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }} className="font-sans">
              Capitolo Primo
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 400, marginBottom: '24px', lineHeight: '1.2' }}>
              Sorting the Tuscan Hide
            </h2>
            <p className="product-description" style={{ fontSize: '0.98rem', lineHeight: '1.9', color: '#6A6764', marginBottom: '20px' }}>
              Before a cutter touches the hide, every square inch of our Tuscan full-grain leather is inspected by hand. We look for perfect fiber density, uniform weight, and natural growth marks that tell the unique story of the animal's life.
            </p>
            <p className="product-description" style={{ fontSize: '0.98rem', lineHeight: '1.9', color: '#6A6764' }}>
              Only the top 8% of hides qualify for our signature Siena Tan and Ancora Rosso color-steeping baths.
            </p>
          </div>

          <div style={{
            height: '450px',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0,0,0,0.04)',
            backgroundColor: '#B97C52',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 100%)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              opacity: 0.12,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'https://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              color: '#FFFFFF',
              zIndex: 3
            }}>
              <span className="font-sans" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.25em', display: 'block', opacity: 0.8, marginBottom: '6px' }}>Regione</span>
              <span className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 300 }}>Pisa, Toscana</span>
            </div>

            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '280px',
              height: '280px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50%',
              zIndex: 2
            }} />
          </div>
        </div>
      </section>

      {/* Scene 2 */}
      <section className="craft-scene-2" style={{ minHeight: '80vh', padding: '100px 0', backgroundColor: '#F8F5F0', borderTop: '1px solid #E5E2DE', display: 'flex', alignItems: 'center' }}>
        <div className="section-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '12px', border: '1px solid #E5E2DE', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
            <svg viewBox="0 0 400 300" width="100%" height="260">
              <path
                d="M 120,40 L 280,40 C 300,40 300,260 280,260 L 120,260 C 100,260 100,40 120,40 Z"
                fill="none"
                stroke="#E5E2DE"
                strokeWidth="1.5"
              />
              <path
                id="stitchPath"
                d="M 120,40 L 280,40 C 300,40 300,260 280,260 L 120,260 C 100,260 100,40 120,40 Z"
                fill="none"
                stroke="#B97C52"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="10, 8"
              />
              <circle cx="200" cy="150" r="45" fill="#FAF6F0" stroke="#CFAC62" strokeWidth="3" />
              <path d="M 200,120 L 200,180 M 170,150 L 230,150" stroke="#CFAC62" strokeWidth="2.5" />
            </svg>
            <span className="font-sans" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6A6764', marginTop: '20px', display: 'block' }}>
              Interactive Double-Needle Saddle Stitch Path
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#B97C52', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }} className="font-sans">
              Capitolo Secondo
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 400, marginBottom: '24px', lineHeight: '1.2' }}>
              The Dual Saddle-Stitch
            </h2>
            <p className="product-description" style={{ fontSize: '0.98rem', lineHeight: '1.9', color: '#6A6764', marginBottom: '20px' }}>
              We sew using two needles sharing a single thread, crossed in every single puncture. Unlike machine locks, if any stitch of a hand saddle-stitch ever breaks, the opposing side holds firm.
            </p>
            <p className="product-description" style={{ fontSize: '0.98rem', lineHeight: '1.9', color: '#6A6764' }}>
              It requires rigorous alignment, absolute manual tension control, and twelve wax-dipped linen threads woven in unison.
            </p>
          </div>
        </div>
      </section>

      {/* Scene 3 */}
      <section className="craft-scene-3" style={{ minHeight: '80vh', padding: '100px 0', borderTop: '1px solid #E5E2DE', display: 'flex', alignItems: 'center' }}>
        <div className="section-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#B97C52', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }} className="font-sans">
              Capitolo Terzo
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 400, marginBottom: '24px', lineHeight: '1.2' }}>
              Thermo-Bended Bamboo
            </h2>
            <p className="product-description" style={{ fontSize: '0.98rem', lineHeight: '1.9', color: '#6A6764', marginBottom: '20px' }}>
              Imported raw bamboo canes are heated over open gas fires. Under precise temperatures, the wood fibers soften, allowing the artisan to curve the cane into the iconic Anima crescent handle shape.
            </p>
            <p className="product-description" style={{ fontSize: '0.98rem', lineHeight: '1.9', color: '#6A6764', marginBottom: '24px' }}>
              Once cooled, the handles are lacquered in multiple layers and flame-toasted to produce the signature black-burned ridges.
            </p>

            <div className="font-sans" style={{ padding: '20px', border: '1px solid #E5E2DE', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', color: '#6A6764' }}>
                <span>Artisan Flame Temperature</span>
                <span style={{ color: '#5E1914', fontWeight: 'bold' }}><span className="temp-value">20</span>°C (Active)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E2DE', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                <div className="temp-bar-fill" style={{ width: '0%', height: '100%', backgroundColor: '#5E1914', transition: 'width 0.1s linear' }}></div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', padding: '60px', borderRadius: '50%', backgroundColor: '#FAF6F0', border: '1px solid #E5E2DE', position: 'relative' }}>
              <svg
                className="craft-bamboo-img"
                viewBox="0 0 100 100"
                width="200"
                height="200"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.05))' }}
              >
                <path
                  id="bambooPath"
                  d="M 15,90 C 15,90 85,90 85,90"
                  fill="none"
                  stroke="#5C4033"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="12,1,10,1,15,1"
                />
                <path
                  id="bambooGlowPath"
                  d="M 15,90 C 15,90 85,90 85,90"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="12,1,10,1,15,1"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 4 */}
      <section className="craft-scene-4" style={{ minHeight: '90vh', padding: '100px 0', backgroundColor: '#F8F5F0', borderTop: '1px solid #E5E2DE', display: 'flex', alignItems: 'center' }}>
        <div className="section-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: '400px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E2DE', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'absolute', top: '20px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6A6764' }} className="font-sans">
              Hot Brass Emboss Simulation
            </div>

            <div className="craft-stamp-block" style={{
              width: '180px',
              padding: '16px',
              backgroundColor: '#D4AF37',
              border: '3px solid #BF953F',
              borderRadius: '6px',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              position: 'relative',
              zIndex: 3,
              transformStyle: 'preserve-3d'
            }}>
              <span className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.2em' }}>
                ANIMA
              </span>
              <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '8px', backgroundColor: '#BF953F' }}></div>
            </div>

            <div className="craft-leather-backing" style={{
              width: '280px',
              height: '100px',
              backgroundColor: '#B97C52',
              borderRadius: '8px',
              marginTop: '40px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transformOrigin: 'center bottom'
            }}>
              <span className="craft-gold-imprint monogram-gold" style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                zIndex: 2
              }}>
                ANIMA
              </span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: '#B97C52', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }} className="font-sans">
              Capitolo Quarto
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.8rem', fontWeight: 400, marginBottom: '24px', lineHeight: '1.2' }}>
              The Hot Brass Stamp
            </h2>
            <p className="product-description" style={{ fontSize: '0.98rem', lineHeight: '1.9', color: '#6A6764', marginBottom: '20px' }}>
              The final signature. A heavy brass block carved with the Maison's seal is heated to 110°C and pressed into the leather fibers under three metric tons of static pressure.
            </p>
            <p className="product-description" style={{ fontSize: '0.98rem', lineHeight: '1.9', color: '#6A6764', marginBottom: '36px' }}>
              If gold foil is selected, a micro-thin layer of metallic leaf is fused permanently into the deep debossed grooves, ensuring it never flakes or fades.
            </p>

            <Link
              to="/customizer"
              className="checkout-btn"
              style={{ display: 'inline-block', width: 'auto', padding: '16px 36px' }}
            >
              Configure Your Monogram
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', textAlign: 'center', borderTop: '1px solid #E5E2DE' }}>
        <h3 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 400, marginBottom: '20px' }}>Ready to explore customization?</h3>
        <Link
          to="/customizer"
          className="luxury-cta"
          style={{ border: '1px solid #1C1B1A', opacity: 1, transform: 'none' }}
        >
          Open Aura Customizer
        </Link>
      </section>
    </div>
  );
}

export default Craft;
