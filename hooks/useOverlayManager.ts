import { useRef } from 'react';
import { gsap } from 'gsap';

export function useOverlayManager(containerRef: React.RefObject<HTMLDivElement | null>) {
  const isExpandedRef = useRef(false);

  const handleCellClick = (cellRef: React.RefObject<HTMLDivElement | null>, overlayRef: React.RefObject<HTMLDivElement | null>) => {
    if (!cellRef.current || !containerRef.current || !overlayRef.current || isExpandedRef.current) return;
    
    isExpandedRef.current = true;
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    const rect = cellRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const cellText = cellRef.current.querySelectorAll('h1, h2, h3, p');
    const overlayContent = overlayRef.current.querySelector('.overlay-content');
    const closeButton = overlayRef.current.querySelector('.close-button');
    
    // Fade out original cell text
    gsap.to(cellText, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    if (isMobile) {
      // Mobile: Full screen overlay with slide up animation
      gsap.set(overlayRef.current, {
        display: 'block',
        position: 'fixed',
        top: '100%',
        left: 0,
        width: '100vw',
        height: '100vh',
        borderRadius: 0
      });
      
      gsap.set([overlayContent, closeButton], {
        opacity: 0
      });

      // Slide up from bottom
      gsap.to(overlayRef.current, {
        top: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          // Fade in overlay content and button
          gsap.to([overlayContent, closeButton], {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut',
            stagger: 0.1
          });
        }
      });
    } else {
      // Desktop: Expand from cell position
      gsap.set(overlayRef.current, {
        display: 'block',
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
      
      gsap.set([overlayContent, closeButton], {
        opacity: 0
      });

      // Expand to cover the grid
      gsap.to(overlayRef.current, {
        top: containerRect.top,
        left: containerRect.left,
        width: containerRect.width,
        height: containerRect.height,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          // Fade in overlay content first, then button
          gsap.to(overlayContent, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.to(closeButton, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.inOut'
              });
            }
          });
        }
      });
    }
  };

  const handleCloseOverlay = (cellRef: React.RefObject<HTMLDivElement | null>, overlayRef: React.RefObject<HTMLDivElement | null>) => {
    if (!cellRef.current || !overlayRef.current || !isExpandedRef.current) return;
    
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    const rect = cellRef.current.getBoundingClientRect();
    const overlayContent = overlayRef.current.querySelector('.overlay-content');
    const closeButton = overlayRef.current.querySelector('.close-button');
    const cellText = cellRef.current.querySelectorAll('h1, h2, h3, p');
    
    if (isMobile) {
      // Mobile: Slide down animation
      gsap.to([closeButton, overlayContent], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
        stagger: 0.05,
        onComplete: () => {
          // Slide down off screen
          gsap.to(overlayRef.current, {
            top: '100%',
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(overlayRef.current, { display: 'none' });
              // Fade in original cell text
              gsap.to(cellText, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.in'
              });
              isExpandedRef.current = false;
            }
          });
        }
      });
    } else {
      // Desktop: Shrink back to cell
      gsap.to(closeButton, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(overlayContent, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              // Shrink back to original position
              gsap.to(overlayRef.current, {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                  gsap.set(overlayRef.current, { display: 'none' });
                  // Fade in original cell text
                  gsap.to(cellText, {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.in'
                  });
                  isExpandedRef.current = false;
                }
              });
            }
          });
        }
      });
    }
  };

  return {
    handleCellClick,
    handleCloseOverlay,
    isExpandedRef
  };
}