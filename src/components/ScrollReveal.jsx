import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({ children, onVisible, threshold = 0.3 }) => {
  const { ref, inView } = useInView({
    threshold: threshold,
    triggerOnce: false, 
    onChange: (inView) => {
      if (inView && onVisible) {
        onVisible();
      }
    },
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;