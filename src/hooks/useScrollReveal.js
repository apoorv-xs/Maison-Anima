import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';

/**
 * Animate elements with class `selector` on scroll.
 * Default: fade up from { opacity: 0, y: 50 } → { opacity: 1, y: 0 }
 */
export function useScrollReveal(selector, opts = {}) {
  const {
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
    duration = 1.4,
    ease = 'power3.out',
    start = 'top 80%',
    toggleActions = 'play none none none',
    trigger,
  } = opts;

  useEffect(() => {
    const elements = gsap.utils.toArray(selector);
    if (elements.length === 0) return;

    const animations = elements.map((el) =>
      gsap.fromTo(el, from, {
        ...to,
        duration,
        ease,
        scrollTrigger: {
          trigger: trigger || el,
          start,
          toggleActions,
        },
      })
    );

    return () => {
      animations.forEach((a) => a.scrollTrigger?.kill());
      animations.forEach((a) => a.kill());
    };
  }, [selector, trigger, start, duration, ease, toggleActions, JSON.stringify(from), JSON.stringify(to)]);
}
