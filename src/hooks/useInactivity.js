import { useEffect } from 'react';
import { INACTIVITY_TIMEOUT_MS } from '../utils/constants';

/**
 * Calls onTimeout after INACTIVITY_TIMEOUT_MS of user inactivity.
 * Resets on mousemove, keydown, click, scroll, touchstart.
 */
export function useInactivity(onTimeout) {

  useEffect(() => {
    if (!onTimeout) return;

    let timeoutId;

    const handleTimeout = () => {
      onTimeout();
    };

    const resetTimerInner = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleTimeout, INACTIVITY_TIMEOUT_MS);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimerInner));

    resetTimerInner();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimerInner));
    };
  }, [onTimeout]);
}
