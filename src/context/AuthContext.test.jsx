import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

function wrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it('starts with no user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.currentUser).toBeNull();
    expect(result.current.userOrders).toEqual([]);
  });

  it('logs in a user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const user = { name: 'Test User', email: 'test@test.com' };
    act(() => {
      result.current.loginSuccess(user);
    });
    expect(result.current.currentUser).toEqual(user);
  });

  it('persists user to localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const user = { name: 'Test User', email: 'test@test.com' };
    act(() => {
      result.current.loginSuccess(user);
    });
    const stored = JSON.parse(localStorage.getItem('maison_current_user'));
    expect(stored.name).toBe('Test User');
  });

  it('logs out', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.loginSuccess({ name: 'Test', email: 't@t.com' });
    });
    act(() => {
      result.current.logout();
    });
    expect(result.current.currentUser).toBeNull();
  });

  it('adds checkout order', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const items = [{ name: 'Bandana', price: 495 }];
    act(() => {
      result.current.checkoutSuccess(items, 495);
    });
    expect(result.current.userOrders).toHaveLength(1);
    expect(result.current.userOrders[0].total).toBe(495);
    expect(result.current.userOrders[0].status).toBe('Steeping in Tuscan Dye Baths');
  });

  it('loads user from localStorage on mount', () => {
    localStorage.setItem('maison_current_user', JSON.stringify({ name: 'Saved User', email: 's@s.com' }));
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.currentUser.name).toBe('Saved User');
  });
});
