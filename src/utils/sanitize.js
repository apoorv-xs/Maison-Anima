/**
 * Sanitize user input to prevent XSS.
 * Strips HTML tags, javascript: protocol, and inline event handlers.
 */
export function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}
