import React from 'react';
import { sanitizeInput } from '../utils/sanitize';

function GiftWrapping({ giftWrapping, setGiftWrapping, isGift, setIsGift, giftNote, setGiftNote }) {
  return (
    <div className="section-card">
      <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#B97C52', fontSize: '0.7rem', display: 'block', marginBottom: '8px' }}>
        Signature Services
      </span>
      <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '20px' }}>Maison Gifting & Packaging</h3>

      <div className="gifting-options-layout font-sans">
        <div
          onClick={() => setGiftWrapping('signature')}
          style={{
            border: giftWrapping === 'signature' ? '2px solid #B97C52' : '1px solid #E5E2DE',
            borderRadius: '8px',
            padding: '20px',
            cursor: 'pointer',
            backgroundColor: giftWrapping === 'signature' ? 'rgba(185, 124, 82, 0.02)' : 'transparent',
            transition: 'all 0.3s'
          }}
        >
          <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1C1B1A', marginBottom: '6px' }}>Signature Rosso Box</h4>
          <p style={{ fontSize: '0.75rem', color: '#6A6764', lineHeight: '1.4' }}>Complimentary signature Ancora Rosso boxes tied with green-red satin ribbon hooks.</p>
        </div>
        <div
          onClick={() => setGiftWrapping('eco')}
          style={{
            border: giftWrapping === 'eco' ? '2px solid #1C1B1A' : '1px solid #E5E2DE',
            borderRadius: '8px',
            padding: '20px',
            cursor: 'pointer',
            backgroundColor: giftWrapping === 'eco' ? 'rgba(28, 27, 26, 0.02)' : 'transparent',
            transition: 'all 0.3s'
          }}
        >
          <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1C1B1A', marginBottom: '6px' }}>Eco-Canvas Wrap</h4>
          <p style={{ fontSize: '0.75rem', color: '#6A6764', lineHeight: '1.4' }}>Minimalist unbleached cotton canvas dustbag paired with recycled paper boxes.</p>
        </div>
      </div>

      <div className="font-sans" style={{ borderTop: '1px solid #E5E2DE', paddingTop: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', color: '#1C1B1A', fontWeight: 500 }}>
          <input
            type="checkbox"
            checked={isGift}
            onChange={(e) => setIsGift(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          Add a complimentary handwritten calligraphic gift note
        </label>

        {isGift && (
          <div style={{ marginTop: '16px', animation: 'slideInCard 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <textarea
              placeholder="Write your personal message here (e.g., 'Happy Anniversary. With love, A.')"
              maxLength={180}
              value={giftNote}
              onChange={(e) => setGiftNote(sanitizeInput(e.target.value))}
              style={{
                width: '100%',
                height: '80px',
                border: '1px solid #E5E2DE',
                borderRadius: '8px',
                padding: '12px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: '#1C1B1A',
                resize: 'none',
                outline: 'none',
                marginBottom: '20px'
              }}
            />

            <div style={{
              border: '1px solid #D4AF37',
              borderRadius: '8px',
              backgroundColor: '#FAF6F0',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(185, 124, 82, 0.05)',
              backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.02) 0%, transparent 100%)'
            }}>
              <div style={{
                textAlign: 'center',
                fontFamily: 'var(--font-serif)',
                fontSize: '0.9rem',
                letterSpacing: '0.3em',
                color: '#D4AF37',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                paddingBottom: '12px',
                marginBottom: '16px'
              }}>
                ANIMA
              </div>

              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                lineHeight: '1.8',
                color: '#1C1B1A',
                minHeight: '60px',
                textAlign: 'center',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }}>
                {giftNote ? `"${giftNote}"` : '"Your personal message will be handwritten here by our calligraphers..."'}
              </div>

              <div style={{
                textAlign: 'center',
                fontSize: '0.6rem',
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#6A6764',
                marginTop: '20px'
              }}>
                Calligrafia di Firenze
              </div>
            </div>

            <span style={{ fontSize: '0.7rem', color: '#6A6764', display: 'block', textAlign: 'right', marginTop: '10px' }}>
              {giftNote.length}/180 characters
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default GiftWrapping;
