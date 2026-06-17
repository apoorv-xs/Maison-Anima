import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MonogramContext = createContext(null);

const DEFAULT_PREFS = { initials: '', foil: 'gold', position: 'strap' };

export function MonogramProvider({ children }) {
  const [monogramPrefs, setMonogramPrefs] = useLocalStorage('maison_monogram_prefs', DEFAULT_PREFS);

  const updatePrefs = useCallback((prefs) => {
    setMonogramPrefs(prefs);
  }, [setMonogramPrefs]);

  return (
    <MonogramContext.Provider value={{ monogramPrefs, updatePrefs }}>
      {children}
    </MonogramContext.Provider>
  );
}

export function useMonogram() {
  const ctx = useContext(MonogramContext);
  if (!ctx) throw new Error('useMonogram must be used within a MonogramProvider');
  return ctx;
}
