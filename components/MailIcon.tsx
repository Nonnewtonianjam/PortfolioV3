import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MailIconProps {
  isHovered: boolean;
  className?: string;
}

export default function MailIcon({ isHovered, className = "" }: MailIconProps) {
  const mailPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mailPathRef.current || !containerRef.current) return;

    const pathLength = mailPathRef.current.getTotalLength();

    if (isHovered) {
      // Set initial state - mail envelope draws in
      gsap.set(mailPathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 1
      });

      // Create timeline for animation
      const tl = gsap.timeline();

      // Draw the mail envelope (slower)
      tl.to(mailPathRef.current, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.out"
      });

      // Breathe-like scale animation - slower and smoother
      tl.to(containerRef.current, {
        scale: 1.15,
        duration: 1.8,
        ease: "sine.inOut"
      }, 0); // Start at the same time as trace animation

      // Scale back down with breathing rhythm
      tl.to(containerRef.current, {
        scale: 1,
        duration: 1.8,
        ease: "sine.inOut"
      }, 0.7); // Overlap for smoother breathing motion

    } else {
      // Mail is always visible when not hovered
      gsap.set(mailPathRef.current, {
        strokeDasharray: "none",
        strokeDashoffset: 0,
        opacity: 1
      });
      gsap.set(containerRef.current, {
        scale: 1
      });
    }
  }, [isHovered]);

  return (
    <div ref={containerRef} className={`relative w-32 h-32 ${className}`}>
      {/* Mail SVG */}
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={mailPathRef}
          d="M3.29289 5.29289C3.47386 5.11193 3.72386 5 4 5H20C20.2761 5 20.5261 5.11193 20.7071 5.29289M3.29289 5.29289C3.11193 5.47386 3 5.72386 3 6V18C3 18.5523 3.44772 19 4 19H14M3.29289 5.29289L5 7.00006M20.7071 5.29289C20.8881 5.47386 21 5.72386 21 6V18C21 18.5523 20.5523 19 20 19H18M20.7071 5.29289L13.4142 12.5857C12.6331 13.3668 11.3668 13.3668 10.5857 12.5857L8 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="1"
        />
      </svg>
    </div>
  );
}