import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ProcessIconProps {
  isHovered: boolean;
  className?: string;
}

export default function ProcessIcon({ isHovered, className = "" }: ProcessIconProps) {
  const workflowRef = useRef<SVGPathElement>(null);
  const arrow1Ref = useRef<SVGPathElement>(null);
  const arrow2Ref = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!workflowRef.current || !arrow1Ref.current || !arrow2Ref.current) return;

    // Kill any existing animations
    gsap.killTweensOf([workflowRef.current, arrow1Ref.current, arrow2Ref.current]);

    if (isHovered) {
      const tl = gsap.timeline();

      // Animate workflow with vertical scale
      gsap.set(workflowRef.current, {
        scaleY: 0,
        transformOrigin: 'center center',
        opacity: 1
      });

      tl.to(workflowRef.current, {
        scaleY: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
      });

      // Draw arrow 1 (left)
      const arrow1Length = arrow1Ref.current.getTotalLength();
      gsap.set(arrow1Ref.current, {
        strokeDasharray: arrow1Length,
        strokeDashoffset: arrow1Length,
        opacity: 0
      });

      tl.to(arrow1Ref.current, {
        opacity: 1,
        duration: 0.05
      }, 0.5);

      tl.to(arrow1Ref.current, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0.5);

      // Draw arrow 2 (right)
      const arrow2Length = arrow2Ref.current.getTotalLength();
      gsap.set(arrow2Ref.current, {
        strokeDasharray: arrow2Length,
        strokeDashoffset: arrow2Length,
        opacity: 0
      });

      tl.to(arrow2Ref.current, {
        opacity: 1,
        duration: 0.05
      }, 0.9);

      tl.to(arrow2Ref.current, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0.9);

    } else {
      // Reset to normal state - show workflow, hide arrows
      gsap.to(workflowRef.current, {
        scaleY: 1,
        transformOrigin: 'center center',
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      if (arrow1Ref.current && arrow2Ref.current) {
        const arrow1Length = arrow1Ref.current.getTotalLength();
        const arrow2Length = arrow2Ref.current.getTotalLength();
        
        gsap.to(arrow1Ref.current, {
          strokeDasharray: arrow1Length,
          strokeDashoffset: arrow1Length,
          opacity: 0,
          duration: 0.2,
          ease: "power2.out"
        });

        gsap.to(arrow2Ref.current, {
          strokeDasharray: arrow2Length,
          strokeDashoffset: arrow2Length,
          opacity: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    }
  }, [isHovered]);

  return (
    <div ref={containerRef} className={`relative w-24 h-24 ${className}`}>
      {/* Workflow SVG - Main shapes */}
      <svg
        viewBox="0 0 143 467"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <path
          ref={workflowRef}
          d="M133.625 248.208C133.625 282.729 105.646 310.708 71.125 310.708C36.6042 310.708 8.625 282.729 8.625 248.208C8.625 213.688 36.6042 185.708 71.125 185.708C105.646 185.708 133.625 213.688 133.625 248.208ZM91.9583 8.625C80.4583 -2.875 61.7917 -2.875 50.2917 8.625L8.625 50.2917C-2.875 61.7917 -2.875 80.4583 8.625 91.9583L50.2917 133.625C61.7917 145.125 80.4583 145.125 91.9583 133.625L133.625 91.9583C145.125 80.4583 145.125 61.7917 133.625 50.2917L91.9583 8.625ZM102.375 341.958H39.875C22.625 341.958 8.625 355.958 8.625 373.208V435.708C8.625 452.958 22.625 466.958 39.875 466.958H102.375C119.625 466.958 133.625 452.958 133.625 435.708V373.208C133.625 355.958 119.625 341.958 102.375 341.958Z"
          fill="currentColor"
          opacity="1"
        />

        {/* WorkflowArrow1 - Left, positioned higher to guide from diamond to circle */}
        <g transform="translate(-180, 50) scale(0.95)">
          <path
            ref={arrow1Ref}
            d="M151.068 21.7537C146.867 21.1562 128.87 19.9431 113.996 22.9487C96.3996 26.5042 74.515 33.7762 60.5822 40.4393C47.7134 46.5936 38.2663 63.2893 28.2808 81.4408C20.4773 95.6258 21.3189 109.786 21.0021 140.838C20.8156 159.111 33.3414 176.815 42.6933 187.987C51.819 198.888 64.7014 201.585 75.882 206.718C90.3127 213.343 103.919 217.265 116.621 219.709C128.449 221.985 138.937 224.543 146.795 224.842C152.55 225.061 131.803 232.945 123.04 240.812C112.741 250.057 105.223 256.483 97.0844 264.35C95.0715 266.296 93.1644 267.962 93.7348 267.989C103.124 268.436 111.741 247.574 119.672 235.145C126.399 224.6 123.909 197.565 127.213 181.125C127.724 178.583 128.725 176.308 130.228 175.376C131.731 174.443 134.121 175.041 135.949 176.544C143.463 182.718 144.984 198.507 155.558 211.525C157.695 214.259 158.89 216.649 160.103 219.075C161.316 221.502 162.511 223.892 167.364 229.975"
            stroke="currentColor"
            strokeWidth="42"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />
        </g>

        {/* WorkflowArrow2 - Right, positioned lower to guide from circle to square */}
        <g transform="translate(143, 165) scale(0.95)">
          <path
            ref={arrow2Ref}
            d="M21 21C37.1507 21 71.0455 23.39 81.013 26.4228C93.3467 30.1756 111.422 38.4544 125.373 46.3215C135.428 51.9913 142.855 66.8087 150.441 78.5958C156.278 87.6641 158.571 103.601 159.82 149.681C160.277 166.528 146.585 179.031 138.718 191.162C132.191 201.227 122.431 207.458 111.278 214.709C98.5856 222.961 86.8342 223.79 75.9705 225.292C60.3766 227.45 53.0117 227.411 49.3905 225.618C39.1188 220.534 51.7805 204.525 53.2833 194.856C53.6589 192.439 53.5911 190.04 54.7861 190.9C65.7369 198.781 65.0343 212.274 68.6646 222.242C73.2217 234.754 84.3355 243.055 89.197 251.23C93.8322 259.024 70.5386 246.748 60.8698 243.716C56.0536 242.511 50.0061 241.896 43.678 241C40.9349 240.103 39.1423 238.311 35.4849 232.843"
            stroke="currentColor"
            strokeWidth="42"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />
        </g>
      </svg>
    </div>
  );
}