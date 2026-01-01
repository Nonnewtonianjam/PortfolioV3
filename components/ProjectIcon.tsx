import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ProjectIconProps {
  isHovered: boolean;
  className?: string;
}

export default function ProjectIcon({ isHovered, className = "" }: ProjectIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);
  const line3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

    if (isHovered) {
      // Set initial state - all lines hidden
      lines.forEach(line => {
        const pathLength = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 1
        });
      });

      // Create timeline for sequential line drawing
      const tl = gsap.timeline();

      // Animate each line drawing in sequence (top to bottom)
      lines.forEach((line, index) => {
        tl.to(line, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out"
        }, index * 0.3); // Stagger by 0.3 seconds
      });

    } else {
      // Reset lines to hidden state
      lines.forEach(line => {
        const pathLength = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0
        });
      });
    }
  }, [isHovered]);

  return (
    <div ref={containerRef} className={`relative w-48 h-48 ${className}`}>
      {/* Monitor SVG - Static */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Monitor Frame */}
        <rect
          x="10"
          y="25"
          width="80"
          height="55"
          rx="4"
          ry="4"
          className="transition-colors duration-300"
          style={{ 
            fill: 'var(--monitor-frame-color, white)',
            stroke: 'currentColor'
          }}
          strokeWidth="3"
        />
        
        {/* Screen */}
        <rect
          x="15"
          y="30"
          width="70"
          height="40"
          rx="2"
          ry="2"
          className="transition-colors duration-300"
          style={{ fill: 'var(--color-projects)' }}
        />

        {/* Monitor Stand */}
        <rect
          x="45"
          y="80"
          width="10"
          height="8"
          className="transition-colors duration-300"
          style={{ fill: 'currentColor' }}
        />
        
        {/* Monitor Base */}
        <rect
          x="35"
          y="88"
          width="30"
          height="4"
          rx="2"
          ry="2"
          className="transition-colors duration-300"
          style={{ fill: 'currentColor' }}
        />
      </svg>

      {/* Monitor Lines SVG - Animated on Screen */}
      <svg
        viewBox="0 0 531 373"
        className="absolute"
        style={{ 
          left: '15%',
          top: '30%',
          width: '70%',
          height: '40%'
        }}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Line 1 (Top) */}
        <path
          ref={line1Ref}
          d="M24.0065 74.3758C59.7557 42.9434 69.958 33.5432 79.0162 25.4462C88.6726 16.8146 101.048 49.1827 110.844 60.7532C119.433 70.8984 123.859 79.4711 125.817 82.2192C126.79 83.5845 128.553 84.1889 130.328 84.0061C138.735 83.1403 145.82 68.1483 165.859 53.7885C180.709 43.1475 187.526 28.4008 193.24 25.0393C200.554 20.7375 207.93 67.8181 215.06 89.868C215.826 92.2356 217.413 93.2235 218.793 93.2412C221.947 93.2816 227.226 87.3852 240.13 77.7963C278.369 49.3786 286.222 46.069 288.971 47.2366C296.579 50.4695 294.88 63.3126 298.996 70.6193C299.956 72.3232 301.933 73.1728 303.902 73.5797C312.141 75.2817 323.894 64.9874 335.347 59.845C345.323 55.3654 351.092 50.7986 354.035 50.1971C362.417 48.4838 360.151 64.5156 363.866 69.2511C365.821 71.7428 373.467 70.8375 382.495 70.0591C398.358 68.6914 407.683 48.8525 413.014 43.5332C419.07 37.4904 423.817 28.4008 429.52 26.0183C437.745 22.5819 438.372 44.4649 441.91 53.1103C447.369 66.4481 455.285 78.2916 457.243 81.0398C458.216 82.4051 459.979 83.0094 461.56 82.632C469.737 80.6792 474.534 71.2621 481.799 64.5746C490.268 56.3066 495.375 51.1996 499.102 48.0564C500.883 46.8592 502.44 46.47 506.403 46.069"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        />
        
        {/* Line 2 (Middle) */}
        <path
          ref={line2Ref}
          d="M42.0065 200.527C42.3957 200.149 45.5213 193.875 51.2181 186.798C60.0358 175.844 67.5299 173.022 74.412 172.804C91.04 172.277 97.429 202.084 100.171 204.443C109.742 212.676 130.041 197.389 145.15 186.81C152.744 181.492 159.126 178.518 165.631 177.722C173.206 176.795 176.441 194.181 181.164 201.488C183.049 204.404 185.499 206.802 187.651 209.16C193.132 215.166 205.903 202.508 219.072 195.443C227.778 190.773 237.348 184.062 245.043 177.94C248.753 174.989 251.937 172.232 254.096 171.241C259.6 168.714 259.403 186.704 263.337 198.522C264.13 200.905 264.522 202.461 265.501 203.652C266.48 204.844 268.037 205.622 270.396 205.245C282.307 203.339 292.782 199.748 306.54 196.416C321.513 188.367 327.422 181.667 330.359 178.731C332.128 176.961 334.464 174.626 336.87 173.399"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        />
        
        {/* Line 3 (Bottom) */}
        <path
          ref={line3Ref}
          d="M24.0065 338.213C25.1742 334.686 31.4371 327.645 40.2771 317.03C55.1862 299.127 63.3059 296.543 66.2486 296.732C76.0694 297.361 78.2377 316.558 82.9614 324.62C86.6937 330.989 93.5706 334.651 99.6625 336.833C103.171 338.09 107.335 336.644 110.867 335.471C117.516 333.262 140.56 310.095 162.15 294.402C164.811 292.468 167.074 292.615 168.661 293.582C180.181 300.606 182.03 325.947 186.948 335.046C188.535 337.982 193.435 337.033 197.551 336.255C209.64 333.969 220.15 323.305 228.406 319.554C244.511 312.237 253.587 308.349 257.314 306.963C267.858 303.043 269.309 331.089 273.249 341.916C273.878 343.648 275.985 342.553 277.76 341.179C291.776 330.33 311.321 300.989 318.852 292.609C326.836 283.724 333 317.738 339.864 322.278C353.165 331.077 363.642 321.701 370.742 317.201C378.166 312.496 389.165 301.32 401.785 291.654C404.15 289.843 405.725 288.699 407.111 289.071C414.059 290.934 415.16 305.117 420.285 312.636C425.205 319.855 431.673 327.551 445.213 342.288C449.991 347.488 454.884 348.038 458.995 348.044C465.247 348.053 471.774 345.29 477.854 343.927C487.909 334.698 492.627 329.567 495.764 328.199C497.345 327.22 498.901 325.663 502.864 321.701"
          stroke="white"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        />
      </svg>
    </div>
  );
}