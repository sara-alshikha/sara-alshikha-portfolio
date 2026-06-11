import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import CustomCursor from '../ui/CustomCursor';
import NoiseOverlay from '../ui/NoiseOverlay';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen relative bg-navy selection:bg-gold selection:text-navy">
      <CustomCursor />
      <NoiseOverlay />
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <main className="flex-grow z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
