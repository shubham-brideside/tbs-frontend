import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface TextMaskingProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'masking' | 'gradient' | 'shimmer' | 'underline';
  delay?: number;
}

const TextMasking: React.FC<TextMaskingProps> = ({
  children,
  className = '',
  animationType = 'masking',
  delay = 0
}) => {
  const [ref, isVisible] = useScrollReveal<HTMLHeadingElement>(0.2);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  const getAnimationClass = () => {
    switch (animationType) {
      case 'gradient':
        return 'animated-gradient-text';
      case 'shimmer':
        return 'shimmer-text';
      case 'underline':
        return 'underline-reveal';
      default:
        return 'text-masking';
    }
  };

  return (
    <h2
      ref={ref}
      className={`${className} ${getAnimationClass()} premium-heading ${
        shouldAnimate ? 'visible' : 'scroll-reveal'
      }`}
    >
      {children}
    </h2>
  );
};

export default TextMasking;

