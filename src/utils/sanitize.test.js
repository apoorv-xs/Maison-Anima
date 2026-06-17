import { describe, it, expect } from 'vitest';
import { sanitizeInput } from './sanitize';

describe('sanitizeInput', () => {
  it('strips HTML tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('alert("xss")');
    expect(sanitizeInput('<b>bold</b>')).toBe('bold');
    expect(sanitizeInput('<img src="x" onerror="alert(1)">')).toBe('');
  });

  it('strips javascript: protocol', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
    expect(sanitizeInput('JAVASCRIPT:void(0)')).toBe('void(0)');
  });

  it('strips inline event handlers', () => {
    expect(sanitizeInput('onclick=alert(1)')).toBe('alert(1)');
    expect(sanitizeInput('onmouseover=alert(1)')).toBe('alert(1)');
    expect(sanitizeInput('onLoad=alert(1)')).toBe('alert(1)');
  });

  it('returns empty string for non-string input', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
    expect(sanitizeInput(123)).toBe('');
  });

  it('passes through clean text unchanged', () => {
    expect(sanitizeInput('Hello World')).toBe('Hello World');
    expect(sanitizeInput('A.S.')).toBe('A.S.');
    expect(sanitizeInput('')).toBe('');
  });
});
