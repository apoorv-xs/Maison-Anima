import { useState, useEffect } from 'react';

/**
 * Returns true when the page has scrolled past `threshold` pixels.
 * Used to add background/shadow to the fixed header.
 */
export function useScrollPosition(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
