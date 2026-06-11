import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/layout/Layout';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Photography = lazy(() => import('./pages/Photography'));
const Awards = lazy(() => import('./pages/Awards'));
const Contact = lazy(() => import('./pages/Contact'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import { motion } from 'framer-motion';

// Wrapper for page transitions
const PageWrapper = ({ children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={null}><PageWrapper><Home /></PageWrapper></Suspense>} />
          <Route path="about" element={<Suspense fallback={null}><PageWrapper><About /></PageWrapper></Suspense>} />
          <Route path="portfolio" element={<Suspense fallback={null}><PageWrapper><Portfolio /></PageWrapper></Suspense>} />
          <Route path="portfolio/:slug" element={<Suspense fallback={null}><PageWrapper><ProjectDetail /></PageWrapper></Suspense>} />
          <Route path="photography" element={<Suspense fallback={null}><PageWrapper><Photography /></PageWrapper></Suspense>} />
          <Route path="awards" element={<Suspense fallback={null}><PageWrapper><Awards /></PageWrapper></Suspense>} />
          <Route path="contact" element={<Suspense fallback={null}><PageWrapper><Contact /></PageWrapper></Suspense>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
