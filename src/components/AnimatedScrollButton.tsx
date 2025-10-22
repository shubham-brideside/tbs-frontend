import React, { useEffect, useState, useRef } from 'react';

interface AnimatedScrollButtonProps {
  targetId: string;
  className?: string;
}

export default function AnimatedScrollButton({ targetId, className = "" }: AnimatedScrollButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Gentle pop-out animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHovered) {
      // Create floating particles on hover
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  const handleClick = () => {
    setIsScrolling(true);
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    // Reset animation state after scroll completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1200);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCountdown(1.2); // Set to average time gap (1.2 seconds)
    
    // Countdown effect
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0.05) {
          clearInterval(countdownInterval);
          handleClick();
          return 0;
        }
        return prev - 0.05;
      });
    }, 50); // Faster countdown updates
    
    // Auto-scroll after 1.2 seconds of hover
    const timer = setTimeout(() => {
      handleClick();
    }, 1200); // Set to 1.2 seconds for average time gap
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCountdown(0);
    
    // Clear auto-scroll timer if mouse leaves
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  return (
    <div className={`flex justify-center mt-16 ${className}`}>
      <div className="relative">
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-70"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `floatParticle 2s ease-in-out ${particle.delay}s infinite`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}

        {/* Countdown progress ring */}
        {isHovered && countdown > 0 && (
          <div className="absolute inset-0 rounded-full">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - countdown / 1.2)}`}
                className="transition-all duration-100 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}

        {/* Main button */}
        <button
          ref={buttonRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            group relative flex items-center justify-center
            w-20 h-20 rounded-full
            bg-gradient-to-br from-white via-gray-50 to-white
            backdrop-blur-lg
            border-4 border-white/80
            shadow-2xl hover:shadow-4xl
            transition-all duration-500 ease-out
            hover:scale-150 active:scale-140
            ${isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-8 rotate-12'}
            ${isScrolling ? 'animate-pulse scale-120' : ''}
            overflow-hidden
            transform-gpu
            perspective-1000
          `}
          style={{
            animation: isVisible ? 'gentleFloat 3s ease-in-out infinite' : 'none',
            boxShadow: isHovered 
              ? '0 25px 50px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.3), inset 0 2px 0 rgba(255,255,255,0.4), 0 0 30px rgba(236, 72, 153, 0.3)' 
              : '0 15px 35px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
            transform: isHovered 
              ? 'perspective(1000px) rotateX(15deg) rotateY(15deg) translateZ(20px)' 
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
            filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
          }}
        >
          {/* Animated background gradient */}
          <div className={`
            absolute inset-0 rounded-full
            bg-gradient-to-br from-pink-200/20 via-purple-200/20 to-indigo-200/20
            transition-all duration-500
            ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}
          `} />

          {/* Rotating inner ring */}
          <div className={`
            absolute inset-2 rounded-full border-2 border-gradient-to-r from-pink-400/30 to-purple-400/30
            transition-all duration-1000 ease-out
            ${isHovered ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}
          `} />

          {/* Scroll glyph with enhanced 3D animation */}
          <div className="relative flex flex-col items-center space-y-2 z-10">
            {/* Animated dots with 3D effect */}
            <div className="flex space-x-1.5">
              <div className={`
                w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full
                transition-all duration-300 shadow-lg
                ${isHovered ? 'animate-bounce shadow-pink-500/50' : ''}
              `} style={{ 
                animationDelay: '0ms',
                boxShadow: isHovered ? '0 0 10px rgba(236, 72, 153, 0.5)' : '0 2px 4px rgba(0,0,0,0.2)'
              }}></div>
              <div className={`
                w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full
                transition-all duration-300 shadow-lg
                ${isHovered ? 'animate-bounce shadow-purple-500/50' : ''}
              `} style={{ 
                animationDelay: '150ms',
                boxShadow: isHovered ? '0 0 10px rgba(139, 92, 246, 0.5)' : '0 2px 4px rgba(0,0,0,0.2)'
              }}></div>
              <div className={`
                w-2 h-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full
                transition-all duration-300 shadow-lg
                ${isHovered ? 'animate-bounce shadow-indigo-500/50' : ''}
              `} style={{ 
                animationDelay: '300ms',
                boxShadow: isHovered ? '0 0 10px rgba(99, 102, 241, 0.5)' : '0 2px 4px rgba(0,0,0,0.2)'
              }}></div>
            </div>

            {/* Main scroll line with 3D effect */}
            <div className={`
              w-1 h-5 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 rounded-full
              transition-all duration-500 shadow-lg
              ${isHovered ? 'h-7 scale-110 shadow-purple-500/50' : 'h-5 scale-100'}
            `} style={{
              boxShadow: isHovered ? '0 0 15px rgba(139, 92, 246, 0.4)' : '0 2px 6px rgba(0,0,0,0.3)'
            }} />

            {/* Bottom indicator with enhanced 3D effect */}
            <div className={`
              w-3 h-3 border-3 border-gradient-to-r from-pink-400 to-purple-400 rounded-full
              transition-all duration-500 shadow-lg
              ${isHovered ? 'scale-150 animate-pulse shadow-pink-500/50' : 'scale-100'}
            `} style={{
              boxShadow: isHovered ? '0 0 20px rgba(236, 72, 153, 0.6)' : '0 3px 8px rgba(0,0,0,0.3)'
            }} />
          </div>

          {/* Hover effect overlay */}
          <div className={`
            absolute inset-0 rounded-full
            bg-gradient-to-br from-white/20 via-transparent to-white/10
            transition-all duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `} />

          {/* Enhanced glow effect */}
          <div className={`
            absolute -inset-2 rounded-full
            bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-indigo-400/30
            blur-lg
            transition-all duration-500
            ${isHovered ? 'opacity-100 scale-125' : 'opacity-0 scale-100'}
          `} />

          {/* Additional outer glow */}
          <div className={`
            absolute -inset-4 rounded-full
            bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20
            blur-xl
            transition-all duration-700
            ${isHovered ? 'opacity-100 scale-150' : 'opacity-0 scale-100'}
          `} />
        </button>

        {/* Outer ring animation */}
        <div className={`
          absolute inset-0 rounded-full border border-white/20
          transition-all duration-1000 ease-out
          ${isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}
        `} />

        {/* Tooltip */}
        <div className={`
          absolute -top-16 left-1/2 transform -translate-x-1/2
          bg-black/90 text-white text-xs px-4 py-2 rounded-lg backdrop-blur-sm
          transition-all duration-300
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          pointer-events-none
          border border-white/20
        `}>
          <div className="flex items-center space-x-2">
            <span>Scroll to {targetId.replace('-', ' ')}</span>
            {isHovered && countdown > 0 && (
              <span className="text-pink-400 font-bold">
                {countdown.toFixed(1)}s
              </span>
            )}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
        </div>
      </div>

      <style>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }
        
        @keyframes floatParticle {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
