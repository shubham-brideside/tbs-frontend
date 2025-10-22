import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.1);
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
    <div
      ref={ref}
      className={`glassmorphism-card micro-interaction will-change-transform ${
        shouldAnimate ? 'visible' : 'scroll-reveal'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassmorphismCard;

