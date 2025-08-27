import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

const AnimatedNumber = ({ value, formatCurrency }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate(latest) {
        node.textContent = formatCurrency(latest);
      },
    });

    return () => controls.stop();
  }, [value, formatCurrency]);

  return <span ref={nodeRef} />;
};

export default AnimatedNumber;