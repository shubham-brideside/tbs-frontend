import React, { useEffect, useState } from 'react';
import { useInteractiveCursor } from '../hooks/useAnimations';

interface InteractiveCursorProps {
  children: React.ReactNode;
}

const InteractiveCursor: React.FC<InteractiveCursorProps> = ({ children }) => {
  const { cursorPosition, isHovering } = useInteractiveCursor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show cursor on desktop
    const isDesktop = window.innerWidth > 768;
    setIsVisible(isDesktop);

    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: cursorPosition.x - 10,
          top: cursorPosition.y - 10,
        }}
      />
    </>
  );
};

export default InteractiveCursor;

