import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

function wrapper({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
    expect(result.current.totalItemsCount).toBe(0);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart('1', 'Bandana', 495, '/img.png', 'Equestrian Silk', '');
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].name).toBe('Bandana');
    expect(result.current.cart[0].quantity).toBe(1);
    expect(result.current.totalItemsCount).toBe(1);
  });

  it('increments quantity for duplicate items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart('1', 'Bandana', 495, '/img.png', '', '');
    });
    act(() => {
      result.current.addToCart('1', 'Bandana', 495, '/img.png', '', '');
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
    expect(result.current.totalItemsCount).toBe(2);
  });

  it('keeps items separate if monogram differs', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart('1', 'Bandana', 495, '/img.png', '', 'AS');
    });
    act(() => {
      result.current.addToCart('1', 'Bandana', 495, '/img.png', '', 'BC');
    });
    expect(result.current.cart).toHaveLength(2);
  });

  it('removes item by index', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart('1', 'Bandana', 495, '/img.png', '', '');
    });
    act(() => {
      result.current.addToCart('2', 'Boots', 1450, '/img2.png', '', '');
    });
    act(() => {
      result.current.removeItem(0);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].name).toBe('Boots');
  });

  it('updates quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart('1', 'Bandana', 495, '/img.png', '', '');
    });
    act(() => {
      result.current.updateQuantity(0, 5);
    });
    expect(result.current.cart[0].quantity).toBe(5);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart('1', 'Bandana', 495, '/img.png', '', '');
    });
    act(() => {
      result.current.addToCart('2', 'Boots', 1450, '/img2.png', '', '');
    });
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.cart).toEqual([]);
    expect(result.current.totalItemsCount).toBe(0);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart('1', 'Bandana', 495, '/img.png', '', '');
    });
    const stored = JSON.parse(localStorage.getItem('maison_anima_cart'));
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Bandana');
  });

  it('loads from localStorage on mount', () => {
    localStorage.setItem('maison_anima_cart', JSON.stringify([
      { id: '1', name: 'Bandana', price: 495, image: '/img.png', meta: '', monogram: '', quantity: 2 }
    ]));
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });
});
