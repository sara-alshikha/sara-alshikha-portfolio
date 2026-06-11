import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Smooth out the movement using spring physics for a luxurious feel
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    // Detect hoverable elements
    const handleHoverStart = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverStart);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile/touch devices (checking simple window width as fallback)
  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      {/* The main following circle */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
        className={`fixed top-0 left-0 w-4 h-4 -ml-2 -mt-2 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transition-colors duration-300 ${
          isHovering ? 'bg-white' : 'bg-white'
        }`}
      />
      {/* Optional: Add a tiny dot strictly attached to the mouse if desired, but for minimal luxury, a single smooth circle is cleaner. */}
    </>
  );
};

export default CustomCursor;
