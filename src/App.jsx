import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { MonogramProvider } from './context/MonogramContext';
import { useScrollPosition } from './hooks/useScrollPosition';
import { gsap } from './utils/gsap';
import Ribbon from './components/Ribbon';
import Header from './components/Header';
import MenuDrawer from './components/MenuDrawer';
import BagDrawer from './components/BagDrawer';
import Footer from './components/Footer';
import BoutiqueControls from './components/BoutiqueControls';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import Customization from './pages/Customization';
import Journal from './pages/Journal';
import Cart from './pages/Cart';
import Craft from './pages/Craft';
import Registry from './pages/Registry';
import Login from './pages/Login';
import Profile from './pages/Profile';

// Animated Route Switch Helper
function RouteTransition() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const handleTransitionEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: transitionStage === "fadeIn" ? 1 : 0,
        transform: transitionStage === "fadeIn" ? 'translateY(0)' : 'translateY(12px)',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/customizer" element={<Customization />} />
        <Route path="/craft" element={<Craft />} />
        <Route path="/registry/:token" element={<Registry />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

// Inner app shell — consumes contexts
function AppShell() {
  const { totalItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const isScrolled = useScrollPosition(50);
  const location = useLocation();
  const hasPushedRef = useRef(false);

  // Close drawers when route pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsBagOpen(false);
    hasPushedRef.current = false;
  }, [location.pathname]);

  // Handle browser back button press
  useEffect(() => {
    const handlePopState = () => {
      if (isMenuOpen || isBagOpen) {
        hasPushedRef.current = false;
        setIsMenuOpen(false);
        setIsBagOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isMenuOpen, isBagOpen]);

  // Sync drawer state to browser history
  useEffect(() => {
    const anyOpen = isMenuOpen || isBagOpen;
    if (anyOpen) {
      if (!hasPushedRef.current) {
        window.history.pushState({ drawerOpen: true }, '');
        hasPushedRef.current = true;
      }
    } else {
      if (hasPushedRef.current) {
        hasPushedRef.current = false;
        if (window.history.state && window.history.state.drawerOpen) {
          window.history.back();
        }
      }
    }
  }, [isMenuOpen, isBagOpen]);

  // Lock body scroll when drawers are open
  useEffect(() => {
    const anyOpen = isMenuOpen || isBagOpen;
    if (anyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isBagOpen]);

  // GSAP Header Animations
  useEffect(() => {
    if (gsap) {
      const headerTimeline = gsap.timeline();
      headerTimeline.fromTo('.brand-logo',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );
      headerTimeline.fromTo('.nav-left .nav-item',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        '-=0.8'
      );
      headerTimeline.fromTo('.nav-right .nav-item',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        '-=0.8'
      );
    }
  }, []);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Ribbon />
      <Header
        bagCount={totalItemsCount}
        onMenuOpen={() => setIsMenuOpen(true)}
        onBagOpen={() => setIsBagOpen(true)}
        isScrolled={isScrolled}
      />
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <BagDrawer isOpen={isBagOpen} onClose={() => setIsBagOpen(false)} />

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <ErrorBoundary>
          <RouteTransition />
        </ErrorBoundary>
      </main>

      <Footer />
      <BoutiqueControls />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <MonogramProvider>
            <AppShell />
          </MonogramProvider>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}
