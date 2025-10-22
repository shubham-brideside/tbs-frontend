import { useEffect, useRef, useState } from 'react';

// Custom hook for scroll-triggered animations
export const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

// Custom hook for interactive cursor
export const useInteractiveCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('.breathing-box, .glow-shadow, .wobble-text');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', updateCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return { cursorPosition, isHovering };
};

// Custom hook for typewriter effect
export const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

// Custom hook for staggered animations
export const useStaggeredAnimation = (items: any[], delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(items.length).fill(false));

  useEffect(() => {
    const timers = items.map((_, index) => 
      setTimeout(() => {
        setVisibleItems(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, index * delay)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [items.length, delay]);

  return visibleItems;
};

// Utility function to create floating elements
export const createFloatingElements = (count: number = 5) => {
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push({
      id: i,
      size: Math.random() * 20 + 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 6,
      color: `hsl(${45 + Math.random() * 30}, 70%, 60%)`
    });
  }
  return elements;
};

// Utility function for gradient text animation
export const animateGradientText = (element: HTMLElement) => {
  if (!element) return;
  
  element.classList.add('gradient-text');
  
  // Add sparkle effect on hover
  element.addEventListener('mouseenter', () => {
    element.style.animationPlayState = 'running';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.animationPlayState = 'paused';
  });
};

// Utility function for wobble effect
export const addWobbleEffect = (element: HTMLElement) => {
  if (!element) return;
  
  element.classList.add('wobble-text');
  
  element.addEventListener('mouseenter', () => {
    element.style.animation = 'wobble 0.6s ease-in-out';
  });
};

// Utility function for breathing effect
export const addBreathingEffect = (element: HTMLElement) => {
  if (!element) return;
  
  element.classList.add('breathing-box', 'glow-shadow');
  
  element.addEventListener('mouseenter', () => {
    element.style.transform = 'scale(1.02)';
    element.style.boxShadow = '0 20px 50px rgba(245, 158, 11, 0.3), 0 0 0 1px rgba(245, 158, 11, 0.2)';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'scale(1)';
    element.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.15)';
  });
};

