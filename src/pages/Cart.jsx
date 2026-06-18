import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import GiftWrapping from '../components/GiftWrapping';
import CloudSync from '../components/CloudSync';
import CheckoutForm from '../components/CheckoutForm';

function Cart() {
  const { cart, removeItem, updateQuantity } = useCart();
  const [giftWrapping, setGiftWrapping] = useState('signature');
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [localCheckoutStep, setLocalCheckoutStep] = useState('cart');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (index, delta) => {
    const item = cart[index];
    const newQty = item.quantity + delta;
    if (newQty > 0) {
      updateQuantity(index, newQty);
    } else {
      removeItem(index);
    }
  };

  if (localCheckoutStep === 'success') {
    return (
      <section className="editorial-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDFBF7' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '40px', border: '1px solid #E5E2DE', borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '3rem', color: '#17382B', marginBottom: '24px' }}>✓</div>
          <span style={{ fontSize: '0.75rem', color: '#B97C52', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }} className="font-sans">
            Maison Virtual Registry
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 400, color: '#1C1B1A', marginBottom: '20px' }}>
            Order Curated
          </h2>
          <p className="product-description" style={{ fontSize: '0.95rem', lineHeight: '1.8', color: '#6A6764', marginBottom: '30px' }}>
            Thank you. Your order has been successfully registered with our virtual boutique registry. Our Tuscan artisans are preparing your curated selection with complementary signature Ancora Rosso wrapping.
          </p>
          <Link to="/" style={{ display: 'inline-block', backgroundColor: '#1C1B1A', color: '#FFFFFF', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', padding: '16px 36px', borderRadius: '25px', transition: 'all 0.3s' }}>
            Return to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="editorial-section" style={{ minHeight: '100vh', backgroundColor: '#FDFBF7' }}>
      <div className="section-container" style={{ maxWidth: '1200px' }}>
        <div className="section-header">
          <span className="section-pretitle">Shopping Bag</span>
          <h2 className="section-title">Anima Checkout</h2>
          <div className="divider"></div>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p className="empty-bag-message" style={{ marginBottom: '30px' }}>Your shopping bag is currently empty.</p>
            <Link to="/collections" style={{ display: 'inline-block', border: '1px solid #1C1B1A', padding: '16px 36px', borderRadius: '25px', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'all 0.3s' }}>
              Explore Collections
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '60px', alignItems: 'start' }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {/* Items List */}
              <div className="section-card">
                <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '24px' }}>Items</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {cart.map((item, index) => (
                    <CartItem key={index} item={item} index={index} onRemove={removeItem} onUpdateQuantity={handleQuantityChange} />
                  ))}
                </div>
              </div>

              <GiftWrapping giftWrapping={giftWrapping} setGiftWrapping={setGiftWrapping} isGift={isGift} setIsGift={setIsGift} giftNote={giftNote} setGiftNote={setGiftNote} />
              <CloudSync giftNote={giftNote} giftWrapping={giftWrapping} />
            </div>

            {/* Right Column */}
            <CheckoutForm subtotal={subtotal} onCheckoutComplete={() => setLocalCheckoutStep('success')} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
