import React from 'react';
import { MaisonCloudDB } from '../utils/api';
import { useCart } from '../context/CartContext';

function CloudSync({ giftNote, giftWrapping }) {
  const { cart, clearCart } = useCart();
  const [syncToken, setSyncToken] = React.useState('');
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [syncSuccess, setSyncSuccess] = React.useState(false);
  const [restoreToken, setRestoreToken] = React.useState('');
  const [isRestoring, setIsRestoring] = React.useState(false);
  const [restoreError, setRestoreError] = React.useState('');
  const [restoreSuccess, setRestoreSuccess] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);

  return (
    <div className="section-card">
      <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#17382B', fontSize: '0.7rem', display: 'block', marginBottom: '8px' }}>
        Cross-Device Persistence
      </span>
      <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '12px' }}>Maison Cloud Sync</h3>
      <p className="font-sans" style={{ fontSize: '0.82rem', color: '#6A6764', lineHeight: 1.6, marginBottom: '24px' }}>
        Securely back up your curated shopping bag to the Maison cloud registry. Retrieve it from any device using your personal sync token.
      </p>

      {/* Save to Cloud */}
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #E5E2DE' }}>
        <button
          onClick={async () => {
            setIsSyncing(true);
            setSyncSuccess(false);
            setSyncToken('');
            const token = await MaisonCloudDB.syncCart(cart, giftNote, giftWrapping);
            setIsSyncing(false);
            if (token) {
              setSyncToken(token);
              setSyncSuccess(true);
            }
          }}
          disabled={isSyncing || cart.length === 0}
          className="checkout-btn"
          style={{ width: '100%', padding: '14px', cursor: cart.length === 0 ? 'not-allowed' : 'pointer', opacity: cart.length === 0 ? 0.4 : 1 }}
        >
          {isSyncing ? 'Encrypting & Syncing...' : 'Sync Bag to Cloud'}
        </button>

        {syncSuccess && syncToken && (
          <div style={{ marginTop: '16px', padding: '20px', borderRadius: '10px', backgroundColor: '#F0FAF4', border: '1px solid rgba(23, 56, 43, 0.15)', animation: 'slideInCard 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <span className="font-sans" style={{ fontSize: '0.68rem', color: '#17382B', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              ✓ Synced Successfully
            </span>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#17382B', fontWeight: 500, letterSpacing: '0.08em', textAlign: 'center', padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px dashed rgba(23, 56, 43, 0.25)', userSelect: 'all', cursor: 'text' }}>
              {syncToken}
            </div>

            <button
              onClick={() => {
                const url = `${window.location.origin}/registry/${syncToken}`;
                navigator.clipboard.writeText(url);
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
              }}
              style={{ marginTop: '16px', width: '100%', padding: '12px', borderRadius: '20px', border: 'none', backgroundColor: '#B97C52', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s' }}
            >
              {linkCopied ? '✓ Link Copied!' : '📋 Copy Shareable Link'}
            </button>

            <p className="font-sans" style={{ fontSize: '0.7rem', color: '#6A6764', marginTop: '12px', textAlign: 'center' }}>
              Save this token or share the link with a partner to co-curate.
            </p>
          </div>
        )}
      </div>

      {/* Restore from Cloud */}
      <div>
        <span className="font-sans" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500, display: 'block', marginBottom: '10px' }}>
          Restore From Token
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="ANIMA-XXXXX"
            value={restoreToken}
            onChange={(e) => { setRestoreToken(e.target.value); setRestoreError(''); setRestoreSuccess(false); }}
            className="font-sans"
            style={{ flex: 1, border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', outline: 'none' }}
          />
          <button
            onClick={async () => {
              if (!restoreToken.trim()) return;
              setIsRestoring(true);
              setRestoreError('');
              setRestoreSuccess(false);
              try {
                const restoredCart = await MaisonCloudDB.retrieveCart(restoreToken);
                clearCart();
                setTimeout(() => {
                  localStorage.setItem('maison_anima_cart', JSON.stringify(restoredCart));
                  setIsRestoring(false);
                  setRestoreSuccess(true);
                  setTimeout(() => window.location.reload(), 800);
                }, 200);
              } catch (err) {
                setIsRestoring(false);
                setRestoreError(err.message || 'Invalid token.');
              }
            }}
            disabled={isRestoring || !restoreToken.trim()}
            style={{ padding: '10px 20px', borderRadius: '20px', border: '1px solid #B97C52', backgroundColor: isRestoring ? '#B97C52' : 'transparent', color: isRestoring ? '#FFFFFF' : '#B97C52', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, cursor: !restoreToken.trim() ? 'not-allowed' : 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap' }}
          >
            {isRestoring ? 'Restoring...' : 'Restore'}
          </button>
        </div>

        {restoreError && (
          <p className="font-sans" style={{ fontSize: '0.75rem', color: '#9B2C2C', marginTop: '10px', animation: 'slideInCard 0.3s ease' }}>
            ⚠ {restoreError}
          </p>
        )}

        {restoreSuccess && (
          <p className="font-sans" style={{ fontSize: '0.75rem', color: '#17382B', marginTop: '10px', animation: 'slideInCard 0.3s ease' }}>
            ✓ Bag restored successfully. Reloading...
          </p>
        )}
      </div>
    </div>
  );
}

export default CloudSync;
