import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';
import { MaisonCMS } from '../utils/api';
import { useCart } from '../context/CartContext';

function Editorial() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let active = true;
    setLoading(true);
    MaisonCMS.fetchProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load products from headless CMS:", err);
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = products.filter(
    (product) => activeCategory === 'All' || product.category === activeCategory
  );

  return (
    <section id="editorial" className="editorial-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-pretitle">Autumn / Winter Runway</span>
          <h2 className="section-title">Exquisite Leather Goods</h2>
          <div className="divider"></div>
        </div>

        {/* Dynamic Category Filters */}
        <div className="category-filters-container font-sans">
          {['All', 'Bags', 'Footwear', 'Accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                border: activeCategory === cat ? '1px solid #B97C52' : '1px solid #E5E2DE',
                backgroundColor: activeCategory === cat ? '#B97C52' : 'transparent',
                color: activeCategory === cat ? '#FFFFFF' : 'var(--text-dark)',
                padding: '10px 24px',
                borderRadius: '25px',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 500,
                flexShrink: 0,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {cat === 'All' ? 'All Pelletteria' : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="editorial-grid">
            {[1, 2, 3, 4].map((n) => (
              <div className="skeleton-card" key={n}>
                <div className="skeleton-image shimmer"></div>
                <div className="skeleton-details">
                  <div className="skeleton-meta">
                    <span className="skeleton-line shimmer short"></span>
                    <span className="skeleton-line shimmer tiny"></span>
                  </div>
                  <div className="skeleton-line shimmer medium"></div>
                  <div className="skeleton-line shimmer long"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="editorial-grid" style={{ transition: 'all 0.5s ease' }}>
            {filteredProducts.map((product) => (
              <div 
                className="editorial-card product-card visible" 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                style={{ 
                  cursor: 'pointer',
                  animation: 'cardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}
              >
                <div className="card-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                  <button 
                    className="quick-add-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.id, product.name, product.price, product.image, 'Classic Edition');
                    }}
                  >
                    Add to Bag
                  </button>
                </div>
                <div className="card-details">
                  <div className="card-meta">
                    <span className="font-sans text-xs text-muted uppercase tracking-wider" style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>{product.meta}</span>
                    <span className="product-price font-sans">${product.price.toLocaleString()}</span>
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </section>
  );
}

export default Editorial;
