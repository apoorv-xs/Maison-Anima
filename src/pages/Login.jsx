import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gsap } from '../utils/gsap';

function Login() {
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessSeal, setShowSuccessSeal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    document.title = "Maison Anima — Private Login";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Sign in to access the Maison Anima private registry and custom wardrobe configurations.");
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg('');

    // Simulate network authentication delay
    setTimeout(() => {
      setLoading(false);

      const isVIP = email.trim().toLowerCase() === 'vip@anima.com' && password === '1921';

      const loggedUser = {
        name: isVIP ? 'Aldo Anima' : email.split('@')[0].toUpperCase(),
        email: email.trim().toLowerCase(),
        tier: isVIP ? 'Elite Collector' : 'Registered Guest',
        memberId: `ANIMA-ID-${Math.floor(100000 + Math.random() * 900000)}`,
        since: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        avatarInitials: isVIP ? 'AG' : email.substring(0, 2).toUpperCase()
      };

      // Set success animation
      setShowSuccessSeal(true);

      // Trigger GSAP stamp impact on the success seal
      if (gsap) {
        setTimeout(() => {
          gsap.fromTo('.wax-seal-success',
            { scale: 4, opacity: 0, rotate: -30 },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.8,
              ease: 'bounce.out',
              onComplete: () => {
                // Shake the viewport briefly on stamp impact
                gsap.fromTo('.login-page-container',
                  { x: -4 },
                  { x: 0, duration: 0.3, ease: 'elastic.out(1, 0.3)' }
                );
                // Hold seal briefly, then navigate
                setTimeout(() => {
                  loginSuccess(loggedUser);
                  navigate('/profile');
                }, 1000);
              }
            }
          );
        }, 100);
      } else {
        // Fallback if GSAP is not loaded
        setTimeout(() => {
          loginSuccess(loggedUser);
          navigate('/profile');
        }, 1200);
      }
    }, 1200);
  };

  const handleVIPQuickPass = () => {
    setEmail('VIP@anima.com');
    setPassword('1921');
    if (gsap) {
      gsap.fromTo('.login-form-card',
        { scale: 0.98 },
        { scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  return (
    <div className="login-page-container" style={{ minHeight: '90vh', backgroundColor: '#FDFBF7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', position: 'relative' }}>

      {/* Success Wax Seal Overlay */}
      {showSuccessSeal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(28, 27, 26, 0.45)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 250,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="wax-seal-success" style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: '#A30026', // Anima dark red wax seal
            border: '8px double #D4AF37',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(163,0,38,0.5), inset 0 0 20px rgba(0,0,0,0.4)',
            color: '#FFFFFF',
            position: 'relative'
          }}>
            {/* Outer wax ripple circle */}
            <div style={{
              position: 'absolute',
              top: '-6px', left: '-6px', right: '-6px', bottom: '-6px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.1)'
            }}></div>

            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              letterSpacing: '0.45em',
              fontWeight: 500,
              textTransform: 'uppercase',
              color: '#D4AF37',
              marginLeft: '0.45em',
              marginBottom: '6px'
            }}>
              ANIMA
            </span>
            <span className="font-sans" style={{
              fontSize: '0.62rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              opacity: 0.8
            }}>
              SEAL OF ENTRY
            </span>
          </div>
        </div>
      )}

      {/* Main Login Card */}
      <div className="login-form-card">

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="font-sans text-xs uppercase tracking-widest text-muted" style={{ color: '#B97C52', fontSize: '0.72rem', display: 'block', marginBottom: '8px' }}>
            Maison Client Registry
          </span>
          <h1 className="font-serif" style={{ fontSize: '2.2rem', fontWeight: 300, color: '#1C1B1A' }}>
            Private Login
          </h1>
          <div className="divider" style={{ margin: '15px auto 0', width: '40px' }}></div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="font-sans">

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6A6764', fontWeight: 500 }}>
              Email Address
            </label>
            <input
              type="email"
              required
              id="loginEmail"
              placeholder="client@anima.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: '1px solid #E5E2DE',
                borderRadius: '20px',
                padding: '12px 20px',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#B97C52'}
              onBlur={(e) => e.target.style.borderColor = '#E5E2DE'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6A6764', fontWeight: 500 }}>
                Passcode
              </label>
              <span style={{ fontSize: '0.68rem', color: '#B97C52', cursor: 'pointer' }} onClick={handleVIPQuickPass}>
                Forgot Passcode?
              </span>
            </div>
            <input
              type="password"
              required
              id="loginPassword"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: '1px solid #E5E2DE',
                borderRadius: '20px',
                padding: '12px 20px',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#B97C52'}
              onBlur={(e) => e.target.style.borderColor = '#E5E2DE'}
            />
          </div>

          {errorMsg && (
            <p style={{ fontSize: '0.75rem', color: '#A30026', margin: 0 }}>
              ⚠ {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            id="loginSubmitBtn"
            className="checkout-btn"
            style={{ width: '100%', padding: '15px', marginTop: '10px' }}
          >
            {loading ? 'Authenticating with Maison...' : 'Secure Entry'}
          </button>
        </form>

        {/* Separator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '30px 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E2DE' }}></div>
          <span className="font-sans" style={{ fontSize: '0.68rem', color: '#6A6764', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E2DE' }}></div>
        </div>

        {/* VIP Quick Pass */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleVIPQuickPass}
            id="vipQuickPassBtn"
            className="btn-outline-gold"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '20px',
              border: '1px solid #D4AF37',
              backgroundColor: 'rgba(212, 175, 55, 0.03)',
              color: '#D4AF37',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            ⚜ VIP Quick Invitation Pass
          </button>
          <span className="font-sans" style={{ fontSize: '0.62rem', color: '#6A6764', display: 'block', marginTop: '8px' }}>
            Instant access to the Private Client Salon registry (VIP@anima.com / 1921)
          </span>
        </div>

      </div>
    </div>
  );
}

export default Login;
