/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useInactivity } from '../hooks/useInactivity';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage('maison_current_user', null);
  const [userOrders, setUserOrders] = useLocalStorage('maison_user_orders', []);

  const loginSuccess = useCallback((user) => {
    setCurrentUser(user);
  }, [setCurrentUser]);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, [setCurrentUser]);

  const checkoutSuccess = useCallback((items, total) => {
    const newOrder = {
      id: `ORDER-ANIMA-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...items],
      total: total,
      status: 'Steeping in Tuscan Dye Baths'
    };
    setUserOrders((prev) => [newOrder, ...prev]);
  }, [setUserOrders]);

  // Auto-logout on inactivity
  useInactivity(
    currentUser
      ? () => {
          logout();
          alert("Session Expired: You have been automatically logged out of the Private Salon due to inactivity.");
          window.location.href = '/login';
        }
      : null
  );

  return (
    <AuthContext.Provider value={{
      currentUser,
      userOrders,
      loginSuccess,
      logout,
      checkoutSuccess,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
