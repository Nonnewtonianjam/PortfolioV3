import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function AnimatedName() {
  const nameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!nameRef.current) return;

    const timeline = gsap.timeline({ delay: 1.3 }); // Start after grid animation
    
    // Name animation - fade out non-initial letters and condense spacing
    const nonInitials = nameRef.current.querySelectorAll('.non-initial');
    const spaces = nameRef.current.querySelectorAll('.space');
    
    timeline.to(
      nonInitials,
      {
        opacity: 0,
        width: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      }
    );

    timeline.to(
      spaces,
      {
        width: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      },
      0 // Start at the same time as non-initials
    );

    // Scale up the initials by increasing font size after the animation completes
    timeline.to(
      nameRef.current,
      {
        fontSize: '2.5rem',
        duration: 0.6,
        ease: 'back.out(1.7)',
        onComplete: () => setAnimationComplete(true)
      },
      "+=0.2" // Wait 0.2 seconds after the previous animation
    );
  }, []);

  useEffect(() => {
    if (!animationComplete || !nameRef.current || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!nameRef.current || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const centerX = container.left + container.width / 2;
      const centerY = container.top + container.height / 2;

      // Calculate mouse position relative to center
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Limit movement to a small range (like a pupil in an eye)
      const maxMove = 15; // Maximum pixels to move (increased from 8)
      const moveX = Math.max(-maxMove, Math.min(maxMove, mouseX * 0.15));
      const moveY = Math.max(-maxMove, Math.min(maxMove, mouseY * 0.15));

      // Apply smooth movement
      gsap.to(nameRef.current, {
        x: moveX,
        y: moveY,
        duration: 0.6, // Slower movement (increased from 0.3)
        ease: 'power2.out'
      });
    };

    // Add mouse move listener
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animationComplete]);

  return (
    <div ref={containerRef} className="flex items-center justify-center h-full">
      <div 
        ref={nameRef} 
        className="font-bold text-white whitespace-nowrap flex items-baseline" 
        style={{ fontSize: '1.4rem' }}
      >
        <span className="inline-block align-baseline">J</span>
        <span className="non-initial inline-block overflow-hidden align-baseline">ohnathan</span>
        <span className="space inline-block align-baseline">&nbsp;</span>
        <span className="inline-block align-baseline">A</span>
        <span className="non-initial inline-block overflow-hidden align-baseline">lexander</span>
        <span className="space inline-block align-baseline">&nbsp;</span>
        <span className="inline-block align-baseline">M</span>
        <span className="non-initial inline-block overflow-hidden align-baseline">anney</span>
      </div>
    </div>
  );
}