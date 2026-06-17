import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CheckoutForm({ subtotal, onCheckoutComplete }) {
  const { cart, clearCart } = useCart();
  const { checkoutSuccess } = useAuth();
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [card, setCard] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateCard = (cardNum) => {
    const cleanNum = cardNum.replace(/[\s-]/g, '');
    if (!/^\d{13,19}$/.test(cleanNum)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanNum.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNum.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address) {
      alert("Please fill in shipping name and address details.");
      return;
    }
    if (!validateCard(card)) {
      alert("Security Validation Failed: Please enter a valid 13-19 digit card number conforming to Luhn check rules.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      checkoutSuccess(cart, subtotal);
      onCheckoutComplete();
    }, 2000);
  };

  return (
    <div className="section-card" style={{ position: 'sticky', top: '100px' }}>
      <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '24px' }}>Checkout Summary</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid #E5E2DE', paddingBottom: '20px', marginBottom: '24px' }} className="font-sans">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6A6764' }}>
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6A6764' }}>
          <span>Delivery</span>
          <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', color: '#17382B', fontWeight: 500 }}>Complimentary</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', color: '#1C1B1A', fontWeight: 500 }}>
          <span>Total</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="font-sans">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500 }}>Full Name</label>
          <input type="text" required placeholder="Alessandro Anima" value={name} onChange={(e) => setName(e.target.value)} style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500 }}>Shipping Address</label>
          <input type="text" required placeholder="Via de' Tornabuoni, 73r, Florence" value={address} onChange={(e) => setAddress(e.target.value)} style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6A6764', fontWeight: 500 }}>Card Details</label>
          <input type="text" required placeholder="•••• •••• •••• 1921" value={card} onChange={(e) => setCard(e.target.value.replace(/[^0-9\s-]/g, ''))} maxLength={19} inputMode="numeric" autoComplete="cc-number" style={{ border: '1px solid #E5E2DE', borderRadius: '20px', padding: '10px 16px', fontSize: '0.85rem', outline: 'none' }} />
        </div>

        <button type="submit" disabled={isSubmitting} className="checkout-btn" style={{ width: '100%', marginTop: '20px', padding: '16px' }}>
          {isSubmitting ? 'Registering with Maison...' : 'Register Curated Order'}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
