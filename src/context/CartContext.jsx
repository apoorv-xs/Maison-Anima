/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('maison_anima_cart', []);

  const addToCart = useCallback((id, name, price, image, meta = '', monogram = '') => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item =>
        item.id === id && item.meta === meta && item.monogram === monogram
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + 1,
        };
        return newCart;
      } else {
        return [...prevCart, { id, name, price, image, meta, monogram, quantity: 1 }];
      }
    });
  }, [setCart]);

  const removeItem = useCallback((index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  }, [setCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const updateQuantity = useCallback((index, quantity) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index] = { ...newCart[index], quantity };
      return newCart;
    });
  }, [setCart]);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeItem,
      clearCart,
      updateQuantity,
      totalItemsCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
