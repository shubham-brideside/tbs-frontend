import React, { useState, useEffect } from 'react';

interface SimpleScrollArrowProps {
  targetId?: string;
  className?: string;
  scrollToTop?: boolean; // If true, scrolls to top instead of target
}

export default function SimpleScrollArrow({ targetId, className = "", scrollToTop = false }: SimpleScrollArrowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<number | null>(null);
  const [scrollTimer, setScrollTimer] = useState<number | null>(null);

  const handleClick = () => {
    if (scrollToTop) {
      // Scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // Scroll to target element
      const targetElement = targetId ? document.getElementById(targetId) : null;
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Auto-scroll after 0.9 seconds of hover (no visual countdown)
    const timer = setTimeout(() => {
      handleClick();
    }, 900);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Clear auto-scroll timer if mouse leaves
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  // Add scroll event listener for pop-out effect when near content boxes
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Define trigger zones near content boxes
      // Adjust these values based on your content layout
      const triggerZones = [
        { start: 400, end: 800 },   // Near Wedding Categories section
        { start: 1000, end: 1400 }, // Near Your Wedding Journey section
        { start: 1600, end: 2000 }, // Near Latest Blog section
      ];
      
      // Check if scroll position is in any trigger zone
      const isNearContent = triggerZones.some(zone => 
        scrollY >= zone.start && scrollY <= zone.end
      );
      
      if (isNearContent) {
        setIsScrolling(true);
        
        // Clear existing timer
        if (scrollTimer) {
          clearTimeout(scrollTimer);
        }
        
        // Set timer to stop scrolling effect after 300ms
        const timer = setTimeout(() => {
          setIsScrolling(false);
        }, 300);
        
        setScrollTimer(timer);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, [scrollTimer]);

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative">
        <button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`group flex items-center justify-center p-2 md:p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
            isScrolling ? 'scale-125 shadow-2xl' : ''
          }`}
          style={{
            animation: isScrolling ? 'none' : 'breathOut 2s ease-in-out infinite',
            transform: isScrolling ? 'scale(1.25)' : undefined,
            boxShadow: isScrolling ? '0 25px 50px rgba(0,0,0,0.25)' : undefined
          }}
        >
          {/* Simple double chevron */}
          <div className="flex flex-col items-center space-y-0.5 md:space-y-1" style={{ transform: scrollToTop ? 'rotate(180deg)' : 'none' }}>
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 group-hover:text-gray-900 transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <svg 
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 group-hover:text-gray-900 transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

      </div>

      <style>{`
        @keyframes breathOut {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          }
        }
      `}</style>
    </div>
  );
}
