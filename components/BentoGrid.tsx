import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import BentoColumn from './BentoColumn';

interface BentoGridProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

export default function BentoGrid({ containerRef, children }: BentoGridProps) {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial styles immediately to prevent FOUC
    gsap.set(containerRef.current, {
      scale: 3,
      gap: '72px'
    });

    [col1Ref.current, col2Ref.current, col3Ref.current].forEach(col => {
      if (col) {
        gsap.set(col, { gap: '72px' });
      }
    });

    const timeline = gsap.timeline({ delay: 0.5 });
    
    // Grid zoom animation
    timeline.to(
      containerRef.current,
      { 
        scale: 1,
        gap: '24px',
        duration: 1.2, 
        ease: 'power3.out',
        onComplete: () => {
          // Mark animation as complete for overlay positioning
          if (containerRef.current) {
            containerRef.current.setAttribute('data-animation-complete', 'true');
          }
        }
      }
    );

    // Column gap animations
    [col1Ref.current, col2Ref.current, col3Ref.current].forEach(col => {
      if (col) {
        timeline.to(
          col,
          { 
            gap: '24px',
            duration: 1.2, 
            ease: 'power3.out'
          },
          0.5
        );
      }
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-3 bento-grid-initial"
      style={{ gap: '72px', width: '90vw', height: '90vh', backgroundColor: 'var(--page-background)' }}
    >
      <BentoColumn columnRef={col1Ref}>
        {children && Array.isArray(children) ? children[0] : null}
      </BentoColumn>

      <BentoColumn columnRef={col2Ref}>
        {children && Array.isArray(children) ? children[1] : null}
      </BentoColumn>

      <BentoColumn columnRef={col3Ref}>
        {children && Array.isArray(children) ? children[2] : null}
      </BentoColumn>
    </div>
  );
}