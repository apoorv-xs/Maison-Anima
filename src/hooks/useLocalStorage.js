import { useState, useCallback } from 'react';

/**
 * Generic hook for localStorage read/write with JSON serialization.
 * Returns [value, setValue] — same API as useState.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    setStoredValue((prev) => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {
        console.error(`Failed to save to localStorage key "${key}":`, e);
      }
      return newValue;
    });
  }, [key]);

  return [storedValue, setValue];
}
