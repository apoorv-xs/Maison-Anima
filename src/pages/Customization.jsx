import React, { useEffect } from 'react';
import Customizer from '../components/Customizer';

function Customization({ onAddToCart, monogramPrefs, onUpdatePrefs }) {
  useEffect(() => {
    if (window.gsap) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Scroll Reveal for Customizer Section Elements
      gsap.fromTo('.customizer-preview',
          { opacity: 0, x: -60 },
          {
              opacity: 1,
              x: 0,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                  trigger: '.customizer-section',
                  start: 'top 70%'
              }
          }
      );
      gsap.fromTo('.customizer-controls',
          { opacity: 0, x: 60 },
          {
              opacity: 1,
              x: 0,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                  trigger: '.customizer-section',
                  start: 'top 70%'
              }
          }
      );
    } else {
      // Fallback
      const preview = document.querySelector('.customizer-preview');
      const controls = document.querySelector('.customizer-controls');
      if (preview) { preview.style.opacity = '1'; preview.style.transform = 'none'; }
      if (controls) { controls.style.opacity = '1'; controls.style.transform = 'none'; }
    }
  }, []);

  return (
    <div>
      <Customizer onAddToCart={onAddToCart} defaultPrefs={monogramPrefs} onUpdatePrefs={onUpdatePrefs} />
    </div>
  );
}

export default Customization;
