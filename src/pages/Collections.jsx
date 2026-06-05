import React, { useEffect } from 'react';
import Editorial from '../components/Editorial';

function Collections({ onAddToCart }) {
  useEffect(() => {
    if (window.gsap) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Scroll Reveal for Editorial Cards (staggered entry)
      gsap.utils.toArray('.editorial-card').forEach((card) => {
          gsap.fromTo(card,
              { opacity: 0, y: 50 },
              {
                  opacity: 1,
                  y: 0,
                  duration: 1.4,
                  ease: 'power3.out',
                  scrollTrigger: {
                      trigger: card,
                      start: 'top 80%',
                      toggleActions: 'play none none none'
                  }
              }
          );
      });
    } else {
      // Fallback
      document.querySelectorAll('.editorial-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
      });
    }
  }, []);

  return (
    <div>
      <Editorial onAddToCart={onAddToCart} />
    </div>
  );
}

export default Collections;
