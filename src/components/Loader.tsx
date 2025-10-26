import { useEffect, useRef } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': any;
    }
  }
}

export default function Loader() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js';
      script.type = 'module';
      document.body.appendChild(script);
      scriptLoaded.current = true;

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        zIndex: 9999, 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      <div className="flex flex-col items-center w-full max-w-lg">
        <dotlottie-wc 
          src="https://lottie.host/ac14a46c-13ee-48cb-a593-a4762ebd47cb/hObNAbInEG.lottie" 
          style={{ 
            width: '100%', 
            height: 'auto',
            maxWidth: '500px',
            aspectRatio: '1 / 1'
          }}
          autoplay
          loop
        />
      </div>
    </div>
  );
}

