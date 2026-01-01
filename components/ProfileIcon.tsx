import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ProfileIconProps {
  isHovered: boolean;
  className?: string;
}

export default function ProfileIcon({ isHovered, className = "" }: ProfileIconProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const squigglyLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !squigglyLineRef.current) return;

    if (isHovered) {
      // Animate squiggly line drawing in
      const tl = gsap.timeline();
      
      tl.fromTo(squigglyLineRef.current, 
        { strokeDasharray: "200", strokeDashoffset: "200", opacity: 0 },
        { strokeDashoffset: "0", opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      // Add a subtle floating animation
      tl.to(squigglyLineRef.current, {
        y: -2,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      }, 0.5);
    } else {
      // Reset animation
      gsap.set(squigglyLineRef.current, { 
        strokeDasharray: "none", 
        strokeDashoffset: "0", 
        opacity: 0,
        y: 0
      });
      gsap.killTweensOf(squigglyLineRef.current);
    }
  }, [isHovered]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 120"
      className={`w-16 h-16 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Squiggly line above head */}
      <path
        ref={squigglyLineRef}
        d="M25 25 Q30 20, 35 25 T45 25 T55 25 T65 25 T75 25 T85 25 T95 25"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0"
      />
      
      {/* Profile silhouette */}
      <path
        d="M60 35
           C60 35, 65 30, 70 35
           C75 40, 78 45, 78 52
           C78 58, 75 62, 70 65
           C68 67, 65 68, 60 68
           C55 68, 52 67, 50 65
           C45 62, 42 58, 42 52
           C42 45, 45 40, 50 35
           C55 30, 60 35, 60 35 Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Shoulders */}
      <path
        d="M35 95
           C35 85, 40 75, 50 70
           C55 68, 60 68, 60 68
           C60 68, 65 68, 70 70
           C80 75, 85 85, 85 95"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}