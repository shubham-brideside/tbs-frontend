import React, { useEffect, useRef, useState } from 'react';

interface LuxuryHeadingProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function LuxuryHeading({ children, className = "", style = {} }: LuxuryHeadingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      className={`luxury-heading ${isVisible ? 'animate-in' : ''} ${className}`}
      style={style}
    >
      {children}
    </h2>
  );
}
