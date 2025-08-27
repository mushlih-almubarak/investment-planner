import React, { useCallback, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  zIndex: 1000,
};

function getAnimationSettings(originX) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 1000,
    particleCount: 150,
    origin: {
      x: originX,
      y: Math.random() - 0.2
    }
  };
}

export default function Fireworks() {
  const refAnimationInstance = useRef(null);
  const intervalId = useRef();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.5));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId.current) {
        // Fire a few bursts in quick succession for a grander effect
        setTimeout(() => nextTickAnimation(), 0);
        setTimeout(() => nextTickAnimation(), 200);
        setTimeout(() => nextTickAnimation(), 400);
    }
  }, [nextTickAnimation]);

  const stopAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current.reset();
    }
  }, []);

  useEffect(() => {
    startAnimation();
    const timeoutId = setTimeout(() => {
      stopAnimation();
    }, 4000); 

    return () => {
      stopAnimation();
      clearTimeout(timeoutId);
    };
  }, [startAnimation, stopAnimation]);

  return (
    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
  );
}