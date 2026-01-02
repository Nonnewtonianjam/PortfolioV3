import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface SkillsIconProps {
  isHovered: boolean;
  className?: string;
  iconColor?: string;
}

export default function SkillsIcon({ isHovered, className = "", iconColor }: SkillsIconProps) {
  const box1Ref = useRef<SVGRectElement>(null);
  const box2Ref = useRef<SVGRectElement>(null);
  const box3Ref = useRef<SVGRectElement>(null);
  const box4Ref = useRef<SVGRectElement>(null);
  const checkmarkRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const boxes = [box1Ref.current, box2Ref.current, box3Ref.current, box4Ref.current];

    // Kill any existing animations
    gsap.killTweensOf([...boxes, checkmarkRef.current]);

    if (isHovered) {
      // Create timeline for animation
      const tl = gsap.timeline();

      // Animate each box independently with stagger
      boxes.forEach((box, index) => {
        if (box) {
          // Set initial state - boxes start small and invisible
          gsap.set(box, {
            scale: 0,
            opacity: 0,
            transformOrigin: "center"
          });

          // Animate each box in with stagger
          tl.to(box, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
          }, index * 0.1);

          // Add a subtle bounce effect
          tl.to(box, {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out"
          }, index * 0.1 + 0.4);

          tl.to(box, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)"
          }, index * 0.1 + 0.6);
        }
      });

      // Draw checkmark on top right box after boxes appear
      if (checkmarkRef.current) {
        const pathLength = checkmarkRef.current.getTotalLength();
        
        // Initially completely hidden
        gsap.set(checkmarkRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0,
          visibility: 'visible'
        });

        // Fade in and draw simultaneously
        tl.to(checkmarkRef.current, {
          opacity: 1,
          duration: 0.1,
          ease: "none"
        }, 0.8);

        tl.to(checkmarkRef.current, {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: "power2.in"
        }, 0.8); // Start after boxes animation
      }

    } else {
      // Boxes are always visible when not hovered
      boxes.forEach(box => {
        if (box) {
          gsap.to(box, {
            scale: 1,
            opacity: 1,
            transformOrigin: "center",
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      // Hide checkmark when not hovered
      if (checkmarkRef.current) {
        const pathLength = checkmarkRef.current.getTotalLength();
        gsap.to(checkmarkRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0,
          visibility: 'hidden',
          duration: 0.2,
          ease: "power2.out"
        });
      }
    }
  }, [isHovered]);

  return (
    <div ref={containerRef} className={`relative w-24 h-24 ${className}`} style={{ color: iconColor }}>
      {/* Skills SVG - Individual Boxes (Bigger) */}
      <svg
        viewBox="-2 -2 28 28"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Left Box */}
        <rect
          ref={box1Ref}
          x="2"
          y="2"
          width="9"
          height="9"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          rx="1"
        />
        
        {/* Top Right Box */}
        <rect
          ref={box2Ref}
          x="13"
          y="2"
          width="9"
          height="9"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          rx="1"
        />
        
        {/* Bottom Left Box */}
        <rect
          ref={box3Ref}
          x="2"
          y="13"
          width="9"
          height="9"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          rx="1"
        />
        
        {/* Bottom Right Box */}
        <rect
          ref={box4Ref}
          x="13"
          y="13"
          width="9"
          height="9"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          rx="1"
        />

        {/* Handwritten Checkmark - overlapping the top right box */}
        <g transform="translate(14, -2) scale(0.045)">
          <path
            ref={checkmarkRef}
            d="M21.0046 184.341C26.554 187.105 37.7156 199.628 44.3644 217.083C51.5312 235.897 60.0807 254.787 65.6511 269.771C68.0663 276.267 70.5095 286.743 72.9701 290.01C75.7486 293.699 81.0218 279.33 88.3304 264.347C96.1145 248.388 99.848 229.092 105.774 214.811C110.681 202.986 126.946 168.573 152.756 123.915C175.215 90.9018 197.497 56.0557 209.433 38.1615C212.909 33.6278 218.438 27.4082 224.134 21.0002"
            stroke="currentColor"
            strokeWidth="42"
            strokeLinecap="round"
            fill="none"
            opacity="0"
            style={{ visibility: 'hidden' }}
          />
        </g>
      </svg>
    </div>
  );
}