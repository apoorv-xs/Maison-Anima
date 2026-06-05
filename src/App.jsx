import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Ribbon from './components/Ribbon';
import Header from './components/Header';
import MenuDrawer from './components/MenuDrawer';
import BagDrawer from './components/BagDrawer';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import Customization from './pages/Customization';
import Journal from './pages/Journal';
import Cart from './pages/Cart';

// Animated Route Switch Helper
function RouteTransition({ cart, handleAddToCart, handleRemoveItem, handleClearCart, handleUpdateQuantity }) {
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
      // Scroll to top on page transition
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
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/collections" element={<Collections onAddToCart={handleAddToCart} />} />
        <Route path="/customizer" element={<Customization onAddToCart={handleAddToCart} />} />
        <Route path="/journal" element={<Journal onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} onUpdateQuantity={handleUpdateQuantity} />} />
      </Routes>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('maison_anima_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart from storage:", e);
      return [];
    }
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sync cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maison_anima_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to storage:", e);
    }
  }, [cart]);

  // Cart operations
  const handleAddToCart = (id, name, price, image, meta = '', monogram = '') => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => 
        item.id === id && item.meta === meta && item.monogram === monogram
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { id, name, price, image, meta, monogram, quantity: 1 }];
      }
    });
    setIsBagOpen(true);
  };

  const handleRemoveItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateQuantity = (index, quantity) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity = quantity;
      return newCart;
    });
  };

  // Scroll listener for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persist GSAP Header Animations
  useEffect(() => {
    if (window.gsap) {
      const gsap = window.gsap;
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

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Ribbon />
        <Header 
          bagCount={totalItemsCount} 
          onMenuOpen={() => setIsMenuOpen(true)} 
          onBagOpen={() => setIsBagOpen(true)} 
          isScrolled={isScrolled}
        />
        <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <BagDrawer 
          isOpen={isBagOpen} 
          onClose={() => setIsBagOpen(false)} 
          cart={cart} 
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
        
        {/* Main Routed Content Area */}
        <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <RouteTransition 
            cart={cart}
            handleAddToCart={handleAddToCart}
            handleRemoveItem={handleRemoveItem}
            handleClearCart={handleClearCart}
            handleUpdateQuantity={handleUpdateQuantity}
          />
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;