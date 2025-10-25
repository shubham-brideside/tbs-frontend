import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
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
    <h1
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`premium-heading animated-heading ${
        shouldAnimate ? 'visible' : 'scroll-reveal'
      } ${className}`}
    >
      {children}
    </h1>
  );
};

export default AnimatedHeading;
