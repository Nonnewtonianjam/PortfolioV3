import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface OverlaySectionProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  backgroundColor: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
  titleColor?: string;
}

export default function OverlaySection({ 
  overlayRef, 
  backgroundColor, 
  title, 
  onClose, 
  children,
  titleColor = "text-gray-900"
}: OverlaySectionProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Create observer to detect when overlay becomes visible
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as HTMLElement;
          const display = window.getComputedStyle(target).display;
          
          if (display !== 'none' && textRef.current) {
            // Split text into words for flip animation
            const text = textRef.current.textContent || '';
            const words = text.split(' ');
            
            textRef.current.innerHTML = words
              .map(word => `<span class="inline-block" style="perspective: 1000px;"><span class="inline-block">${word}</span></span>`)
              .join(' ');

            const wordElements = textRef.current.querySelectorAll('span > span');

            // Animate words with flip effect
            gsap.fromTo(wordElements,
              {
                opacity: 0,
                rotationX: -90,
                transformOrigin: 'center bottom'
              },
              {
                opacity: 1,
                rotationX: 0,
                duration: 0.6,
                stagger: 0.03,
                ease: 'back.out(1.7)',
                delay: 0.3
              }
            );
          }
        }
      });
    });

    if (overlayRef.current) {
      observer.observe(overlayRef.current, {
        attributes: true,
        attributeFilter: ['style']
      });
    }

    return () => observer.disconnect();
  }, [overlayRef]);

  return (
    <div 
      ref={overlayRef} 
      className={`${backgroundColor} rounded-lg p-8 hidden lg:overflow-hidden overflow-y-auto`} 
      style={{ zIndex: 100, position: 'fixed' }}
    >
      <button 
        onClick={onClose} 
        className={`close-button absolute ${titleColor === 'text-white' ? 'text-white' : 'text-gray-900'} text-3xl font-light cursor-pointer hover:opacity-70 z-20`}
        style={{ top: '2rem', right: '2rem' }}
      >
        ×
      </button>
      <div className="overlay-content h-full flex flex-col">
        <div className="flex items-center justify-between mb-8 lg:mb-16">
          <h2 className={`text-4xl lg:text-6xl font-bold ${titleColor}`}>{title}</h2>
        </div>
        
        <div className="flex-1 relative pb-8 lg:pb-0">
          <div className="h-full flex items-start justify-center">
            <div ref={textRef as any}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}