import React, { useEffect, useRef, useState } from 'react';

interface AnimatedTextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}

export default function AnimatedTextReveal({ 
  text, 
  className = '', 
  style = {},
  delay = 0,
  duration = 50
}: AnimatedTextRevealProps) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showSlideUp, setShowSlideUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Start slide-up animation first
          setTimeout(() => {
            setShowSlideUp(true);
            // Then start letter-by-letter animation after slide-up completes
            setTimeout(() => {
              animateText();
            }, 600); // Wait for slide-up animation to complete
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, delay]);

  const animateText = () => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setVisibleLetters(currentIndex + 1);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, duration);
  };

  const visibleText = text.slice(0, visibleLetters);
  const remainingText = text.slice(visibleLetters);

  return (
    <div 
      ref={ref} 
      className={`relative transition-all duration-600 ease-out ${
        showSlideUp 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      } ${className}`} 
      style={style}
    >
      <span className="inline-block">
        {visibleText}
        <span className="opacity-0">{remainingText}</span>
      </span>
    </div>
  );
}
