import React from 'react';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';

const Preloader = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[100]"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.6, 0.01, 0.25, 0.95], delay: 0.2 }}
        className="relative"
      >
        <motion.div
          className="p-5 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 30px rgba(217, 119, 6, 0.4)',
              '0 0 50px rgba(217, 119, 6, 0.6)',
              '0 0 30px rgba(217, 119, 6, 0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Gem className="h-16 w-16 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;