import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';
function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('story'); // story | details | packaging

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product.id, product.name, product.price, product.image, 'Classic Edition');
    onClose();
  };

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
    role="dialog"
    aria-modal="true"
    aria-label={`Product details: ${product.name}`}
    >
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(28, 27, 26, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      ></div>
      
      <div className="font-serif" style={{
        position: 'relative',
        zIndex: 310,
        backgroundColor: '#FDFBF7',
        border: '1px solid #E5E2DE',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)',
        animation: 'modalFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Left Side: Product Image */}
        <div style={{
          backgroundColor: '#F6F3EF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          borderRight: '1px solid #E5E2DE',
          position: 'relative'
        }}>
          <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy" 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 40px rgba(28, 27, 26, 0.08))'
            }}
          />
        </div>
        
        {/* Right Side: Product Details */}
        <div style={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#6A6764', fontSize: '0.7rem' }}>
                {product.meta}
              </span>
              <button
                onClick={onClose}
                aria-label="Close product details"
                style={{
                  fontSize: '2rem',
                  lineHeight: '1',
                  color: '#6A6764',
                  cursor: 'pointer',
                  transition: 'color 0.3s'
                }}
                className="link-hover-dark"
              >
                &times;
              </button>
            </div>
            
            <h2 style={{ fontSize: '2.2rem', fontWeight: 400, marginTop: '10px', marginBottom: '15px', color: '#1C1B1A', lineHeight: '1.2' }}>
              {product.name}
            </h2>
            
            <span className="font-sans" style={{ fontSize: '1.3rem', fontWeight: 500, color: '#1C1B1A', display: 'block', marginBottom: '30px' }}>
              ${product.price.toLocaleString()}
            </span>
            
            {/* Tabs */}
            <div className="font-sans" style={{
              display: 'flex',
              borderBottom: '1px solid #E5E2DE',
              gap: '24px',
              marginBottom: '20px',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 500
            }}>
              <button 
                onClick={() => setActiveTab('story')}
                style={{
                  paddingBottom: '12px',
                  borderBottom: activeTab === 'story' ? '2px solid #B97C52' : '2px solid transparent',
                  color: activeTab === 'story' ? '#B97C52' : '#6A6764'
                }}
              >
                The Story
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                style={{
                  paddingBottom: '12px',
                  borderBottom: activeTab === 'details' ? '2px solid #B97C52' : '2px solid transparent',
                  color: activeTab === 'details' ? '#B97C52' : '#6A6764'
                }}
              >
                Artisanal Detail
              </button>
              <button 
                onClick={() => setActiveTab('packaging')}
                style={{
                  paddingBottom: '12px',
                  borderBottom: activeTab === 'packaging' ? '2px solid #B97C52' : '2px solid transparent',
                  color: activeTab === 'packaging' ? '#B97C52' : '#6A6764'
                }}
              >
                Maison Wrapping
              </button>
            </div>
            
            {/* Tab Contents */}
            <div style={{ minHeight: '120px', fontSize: '0.9rem', lineHeight: '1.6', color: '#6A6764', marginBottom: '30px' }}>
              {activeTab === 'story' && (
                <p>{product.description}</p>
              )}
              {activeTab === 'details' && (
                <p>Hand-crafted in Tuscany, Italy. Built with select full-grain calfskin leather, hand-stained linings, and signature Anima light-gold hardware detailing. Measures 11.5" x 7.8" x 2".</p>
              )}
              {activeTab === 'packaging' && (
                <p>Complimentary signature Ancora Rosso gift box with green-red satin ribbon included. Comes with digital authenticity certificates and elegant linen protective bags.</p>
              )}
            </div>
          </div>
          
          <button 
            className="checkout-btn"
            onClick={handleAdd}
            style={{ width: '100%', padding: '16px' }}
          >
            Add to Anima Bag
          </button>
        </div>
      </div>

    </div>,
    document.body
  );
}

export default ProductModal;
