import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AnimatedSubtitleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSubtitle: React.FC<AnimatedSubtitleProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  const [ref, isVisible] = useScrollReveal(0.2);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <p
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={`premium-subtitle pulse-subtitle ${
        shouldAnimate ? 'visible' : 'scroll-reveal'
      } ${className}`}
    >
      {children}
    </p>
  );
};

export default AnimatedSubtitle;

