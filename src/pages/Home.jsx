import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Editorial from '../components/Editorial';
import Customizer from '../components/Customizer';
import Quote from '../components/Quote';
import { useMonogram } from '../context/MonogramContext';
import { gsap, ScrollTrigger } from '../utils/gsap';

function Home() {
  const { monogramPrefs, updatePrefs } = useMonogram();
  useEffect(() => {
    if (gsap) {
      // Hero Entry
      const heroTimeline = gsap.timeline({ delay: 0.2 });
      heroTimeline.to('#heroSubtitle', {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out'
      });
      heroTimeline.to('#heroTitle', {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out'
      }, '-=0.8');
      heroTimeline.to('#heroDesc', {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
      }, '-=0.9');
      heroTimeline.to('#heroCta', {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out'
      }, '-=0.9');

      // Parallax effect
      gsap.to('.hero-parallax-bg', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true
          }
      });

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

      // Immersive Quote Reveal
      gsap.fromTo('.editorial-quote',
          { opacity: 0, scale: 0.95 },
          {
              opacity: 1,
              scale: 1,
              duration: 1.6,
              ease: 'power2.out',
              scrollTrigger: {
                  trigger: '.quote-section',
                  start: 'top 80%'
              }
          }
      );
    } else {
      // Fallback
      const subtitle = document.getElementById('heroSubtitle');
      const title = document.getElementById('heroTitle');
      const desc = document.getElementById('heroDesc');
      const cta = document.getElementById('heroCta');
      if (subtitle) { subtitle.style.opacity = '1'; subtitle.style.transform = 'none'; }
      if (title) { title.style.opacity = '1'; title.style.transform = 'none'; }
      if (desc) { desc.style.opacity = '1'; desc.style.transform = 'none'; }
      if (cta) { cta.style.opacity = '1'; cta.style.transform = 'none'; }

      document.querySelectorAll('.editorial-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
      });
    }
  }, []);

  return (
    <div>
      <Hero />
      <Editorial />
      <Customizer />
      <Quote />
    </div>
  );
}

export default Home;
