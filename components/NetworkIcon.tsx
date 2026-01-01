import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface NetworkIconProps {
  isHovered: boolean;
  className?: string;
}

export default function NetworkIcon({ isHovered, className = "" }: NetworkIconProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const line1Ref = useRef<SVGLineElement>(null);
  const line2Ref = useRef<SVGLineElement>(null);
  const line3Ref = useRef<SVGLineElement>(null);
  const circle1Ref = useRef<SVGCircleElement>(null);
  const circle2Ref = useRef<SVGCircleElement>(null);
  const circle3Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
    const circles = [circle1Ref.current, circle2Ref.current, circle3Ref.current];

    if (isHovered) {
      // Animate on hover
      const tl = gsap.timeline();
      
      // Animate lines drawing in
      lines.forEach((line, index) => {
        if (line) {
          tl.fromTo(line, 
            { strokeDasharray: "100", strokeDashoffset: "100" },
            { strokeDashoffset: "0", duration: 0.8, ease: "power2.out" },
            index * 0.15
          );
        }
      });

      // Animate circles with squash and stretch effect
      circles.forEach((circle, index) => {
        if (circle) {
          // Initial scale in
          tl.fromTo(circle,
            { scale: 0, transformOrigin: "center" },
            { scale: 1, duration: 0.3, ease: "back.out(1.7)" },
            index * 0.1 + 0.3
          );
          
          // Squash and stretch animation to simulate traveling
          tl.to(circle, {
            scaleX: 1.4,
            scaleY: 0.7,
            duration: 0.2,
            ease: "power2.inOut",
            transformOrigin: "center"
          }, index * 0.1 + 0.6)
          .to(circle, {
            scaleX: 0.8,
            scaleY: 1.3,
            duration: 0.2,
            ease: "power2.inOut",
            transformOrigin: "center"
          }, index * 0.1 + 0.8)
          .to(circle, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)",
            transformOrigin: "center"
          }, index * 0.1 + 1.0);
        }
      });
    } else {
      // Reset animation
      gsap.set(lines, { strokeDasharray: "none", strokeDashoffset: "0" });
      gsap.set(circles, { scale: 1, scaleX: 1, scaleY: 1 });
    }
  }, [isHovered]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className={`w-20 h-20 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rounded rectangle border */}
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="16"
        ry="16"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Connection lines */}
      <line
        ref={line1Ref}
        x1="35"
        y1="45"
        x2="55"
        y2="35"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        ref={line2Ref}
        x1="35"
        y1="45"
        x2="55"
        y2="65"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        ref={line3Ref}
        x1="55"
        y1="35"
        x2="55"
        y2="65"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Connection nodes/circles */}
      <circle
        ref={circle1Ref}
        cx="35"
        cy="45"
        r="6"
        stroke="currentColor"
        strokeWidth="3"
        fill="black"
      />
      <circle
        ref={circle2Ref}
        cx="55"
        cy="35"
        r="6"
        stroke="currentColor"
        strokeWidth="3"
        fill="black"
      />
      <circle
        ref={circle3Ref}
        cx="55"
        cy="65"
        r="6"
        stroke="currentColor"
        strokeWidth="3"
        fill="black"
      />
    </svg>
  );
}