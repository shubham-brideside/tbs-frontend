import React from 'react';
import { createFloatingElements } from '../hooks/useAnimations';

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  count = 5, 
  className = '' 
}) => {
  const elements = createFloatingElements(count);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {elements.map((element) => (
        <div
          key={element.id}
          className="floating-element"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: element.color,
            borderRadius: '50%',
            animationDelay: `${element.animationDelay}s`,
            opacity: 0.3,
          }}
        />
      ))}
      
      {/* Add sparkle effects */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="sparkle"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;

