import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const ScrollReveal = ({ children, delay = 0, className = "", stagger = false }) => {
  if (stagger && typeof children === 'string') {
    // Staggered text reveal
    const words = children.split(' ');
    
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ staggerChildren: 0.05, delayChildren: delay }}
        className={className}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }} // Custom cubic-bezier for silky feel
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedCounter = ({ value, suffix = "", duration = 2.5, className = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/[^0-9]/g, ''));
      if (start === end) return;
      
      const incrementTime = (duration * 1000) / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  const displayValue = `${count}${value.toString().includes('+') ? '+' : ''}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : "0"}
    </span>
  );
};
