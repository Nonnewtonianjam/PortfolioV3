import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PhoneIconProps {
  isHovered: boolean;
  className?: string;
}

export default function PhoneIcon({ isHovered, className = "" }: PhoneIconProps) {
  const phonePathRef = useRef<SVGPathElement>(null);
  const ringPathsRef = useRef<SVGGElement>(null);
  const cordPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!phonePathRef.current || !ringPathsRef.current || !cordPathRef.current || !containerRef.current) return;

    const phonePathLength = phonePathRef.current.getTotalLength();
    const cordPathLength = cordPathRef.current.getTotalLength();
    const ringPaths = ringPathsRef.current.querySelectorAll('path');

    // Phone is always visible - no animation
    gsap.set(phonePathRef.current, {
      strokeDasharray: "none",
      strokeDashoffset: 0,
      opacity: 1
    });

    if (isHovered) {
      // Set initial state for cord and ring - hidden until hover with large dash to prevent dots
      const largeCordDash = Math.max(cordPathLength * 2, 1000);
      gsap.set(cordPathRef.current, {
        strokeDasharray: `${largeCordDash} ${largeCordDash}`,
        strokeDashoffset: largeCordDash,
        opacity: 0
      });

      ringPaths.forEach(path => {
        const pathLength = path.getTotalLength();
        const largeDash = Math.max(pathLength * 2, 1000);
        gsap.set(path, {
          strokeDasharray: `${largeDash} ${largeDash}`,
          strokeDashoffset: largeDash,
          opacity: 0
        });
      });

      // Create timeline for coordinated animations
      const tl = gsap.timeline();

      // Draw the cord on hover - set proper dash array first, then animate
      tl.set(cordPathRef.current, {
        strokeDasharray: cordPathLength,
        strokeDashoffset: cordPathLength,
        opacity: 1
      }, 0.1);
      
      tl.to(cordPathRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out"
      }, 0.15);

      // Draw ring lines with stagger on hover
      ringPaths.forEach((path, index) => {
        const pathLength = path.getTotalLength();
        
        // Set proper dash array and make visible just before animating
        tl.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 1
        }, 0.3 + (index * 0.2));
        
        // Then animate the drawing
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: "power2.out"
        }, 0.35 + (index * 0.2));
      });

    } else {
      // Hide ring and cord when not hovered
      gsap.set([cordPathRef.current], {
        opacity: 0,
        strokeDashoffset: 0
      });
      
      ringPaths.forEach(path => {
        gsap.set(path, { opacity: 0, strokeDashoffset: 0 });
      });
    }
  }, [isHovered]);

  return (
    <div ref={containerRef} className={`relative w-20 h-20 ${className}`}>
      {/* Phone SVG */}
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'translate(20%, 0%) scale(1.7)' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={phonePathRef}
          d="M3.75,17.41,6.14,19.8A2,2,0,0,0,9,19.8l1.36-1.36a2,2,0,0,0,0-2.83l-.89-.9h0a16.48,16.48,0,0,1,5.64-5.65l0,0,.89.9a2,2,0,0,0,2.83,0l1.34-1.33a2,2,0,0,0,0-2.83L17.78,3.39a1,1,0,0,0-1.26-.13h0A46,46,0,0,0,3.63,16.15h0A1,1,0,0,0,3.75,17.41Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="1"
        />
      </svg>

      {/* Ring SVG - positioned up and to the right of the phone */}
      <svg
        viewBox="0 0 254 246"
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'translate(100%, 0%) scale(0.5)' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={ringPathsRef}>
          <path
            d="M60.6917 150.993C68.17 147.239 85.0733 143.486 104.827 134.569C121.16 127.195 134.006 117.186 147.65 105.418C159.432 90.8288 166.035 79.541 167.912 72.0346C168.857 68.2532 169.788 64.5282 170.748 52.2247"
            stroke="currentColor"
            strokeWidth="48"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />
          <path
            d="M49.4041 221.541C61.5665 221.541 82.2513 217.816 98.7174 212.624C120.877 205.636 135.868 199.925 150.938 190.542C166.466 180.873 179.157 170.803 192.801 159.035C205.514 144.446 216.802 129.433 222.46 114.364C224.336 110.582 227.13 106.857 230.008 103.02"
            stroke="currentColor"
            strokeWidth="48"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />
          <path
            d="M24.0065 86.0878C34.2784 82.3628 60.579 69.2127 79.4436 52.7608C83.2391 48.4996 86.0328 44.7746 88.4032 40.9931C90.7737 37.2117 92.6362 33.4868 97.3771 24.0052"
            stroke="currentColor"
            strokeWidth="48"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />
        </g>
      </svg>

      {/* Cord SVG - positioned down and to the left of the phone */}
      <svg
        viewBox="0 0 620 369"
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'translate(-10%, 70%) scale(1)' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={cordPathRef}
          d="M248.374 24.0026C242.758 27.7275 229.636 39.0154 215.033 49.3578C201.26 59.1119 179.801 56.0036 154.417 52.7018C138.613 50.646 124.265 55.0158 114.402 60.6456C109.946 63.1889 107.333 66.2754 105.894 70.5084C104.455 74.7413 104.455 80.3287 106.783 84.6039C111.535 93.3311 122.289 95.4825 129.796 96.8935C133.542 97.5977 137.302 97.3733 139.221 95.0452C141.14 92.7171 141.14 88.0609 139.277 85.1966C135.595 79.5338 123.334 80.4415 111.594 81.3727C94.3569 82.7401 81.0326 100.139 62.1961 125C48.789 142.695 47.0846 160.359 46.6049 167.865C46.362 171.666 48.9189 175.372 51.7408 178.222C57.4164 183.954 73.3004 184.854 87.904 184.388C100.865 183.975 55.6068 179.21 44.3331 180.606C28.1325 182.614 25.4967 212.96 24.0152 243.536C23.7079 249.878 28.2058 252.524 31.5075 254.429C48.6731 264.332 90.1193 261.046 111.467 254.499C114.999 253.416 114.783 247.952 112.469 246.964C110.155 245.977 104.568 247.839 99.8267 250.661C95.0858 253.483 91.3609 257.208 89.442 266.111C84.6062 288.548 90.3168 306.169 96.4121 311.333C109.429 322.361 128.836 322.169 161.232 322.198C175.173 322.21 184.372 315.622 190.947 310.007C198.903 303.212 199.441 290.253 200.866 285.992C203.023 279.544 193.826 301.456 192.88 308.963C191.935 316.465 197.551 323.1 203.646 328.265C209.905 333.567 218.236 337.21 231.329 341.443C254.462 348.922 274.674 339.157 281.249 331.651C294.557 316.458 298.209 294.035 301.497 286.02C305.548 276.145 313.222 310.825 336.687 324.963C361.769 340.076 383.714 334.416 403.045 328.801C411.518 326.339 417.662 320.335 422.361 314.24C426.987 308.238 426.156 291.269 425.691 274.789C425.567 270.392 424.294 274.14 423.814 278.852C423.334 283.565 423.334 289.153 426.594 295.29C440.346 321.187 463.688 320.307 494.701 327.333C517.826 332.573 542.646 331.595 561.553 321.294C575.691 311.869 583.226 302.472 586.979 294.966C588.87 291.184 590.732 287.459 595.473 277.978"
          stroke="currentColor"
          strokeWidth="48"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        />
      </svg>
    </div>
  );
}