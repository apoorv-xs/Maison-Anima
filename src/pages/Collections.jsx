import React, { useEffect } from 'react';
import Editorial from '../components/Editorial';
import { gsap } from '../utils/gsap';

function Collections() {
  useEffect(() => {
    if (gsap) {

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
      <Editorial />
    </div>
  );
}

export default Collections;
