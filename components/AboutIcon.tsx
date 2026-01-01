import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AboutIconProps {
  isHovered: boolean;
  className?: string;
}

export default function AboutIcon({ isHovered, className = "" }: AboutIconProps) {
  const hairPathRef = useRef<SVGPathElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);
  const meGroupRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hairPathRef.current || !arrowPathRef.current || !meGroupRef.current || !containerRef.current) return;

    if (isHovered) {
      // Get the total length of each path
      const hairPathLength = hairPathRef.current.getTotalLength();
      const arrowPathLength = arrowPathRef.current.getTotalLength();
      const mePaths = meGroupRef.current.querySelectorAll('path');
      
      // Set initial state - hair and arrow are invisible
      gsap.set(hairPathRef.current, {
        strokeDasharray: hairPathLength,
        strokeDashoffset: hairPathLength,
        opacity: 1
      });

      gsap.set(arrowPathRef.current, {
        strokeDasharray: arrowPathLength,
        strokeDashoffset: arrowPathLength,
        opacity: 1
      });

      // Set initial state for ME paths - use large dash values to prevent dots
      mePaths.forEach(path => {
        const pathLength = path.getTotalLength();
        // Use a very large dash array to ensure no visible segments
        const largeDash = Math.max(pathLength * 2, 1000);
        gsap.set(path, {
          strokeDasharray: `${largeDash} ${largeDash}`,
          strokeDashoffset: largeDash,
          opacity: 0
        });
      });

      gsap.set(meGroupRef.current, { opacity: 1 });

      // Create timeline for coordinated animations
      const tl = gsap.timeline();

      // Animate the hair drawing from left to right
      tl.to(hairPathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out"
      });

      // Scale up the entire icon as the hair fills in
      tl.to(containerRef.current, {
        scale: 1.1,
        duration: 1,
        ease: "power2.out"
      }, 0.3); // Start scaling earlier in the hair animation

      // Animate arrow drawing during scaling
      tl.to(arrowPathRef.current, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 0.5); // Start arrow animation during scaling

      // Animate "ME" text drawing after arrow
      mePaths.forEach((path, index) => {
        const pathLength = path.getTotalLength();
        
        // Set proper dash array and make visible just before animating
        tl.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 1
        }, 0.8 + (index * 0.15));
        
        // Then animate the drawing
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 0.4,
          ease: "power2.out"
        }, 0.8 + (index * 0.15) + 0.05);
      });

      // Scale back down to normal size
      tl.to(containerRef.current, {
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      }, 1.0); // Start scaling down earlier too

    } else {
      // Reset everything when not hovered
      gsap.set([hairPathRef.current, arrowPathRef.current], {
        opacity: 0,
        strokeDashoffset: 0
      });
      
      // Reset ME paths individually
      const mePaths = meGroupRef.current.querySelectorAll('path');
      mePaths.forEach(path => {
        gsap.set(path, { opacity: 0, strokeDashoffset: 0 });
      });
      
      gsap.set(meGroupRef.current, { opacity: 0 });
      gsap.set(containerRef.current, {
        scale: 1
      });
    }
  }, [isHovered]);

  return (
    <div ref={containerRef} className={`relative w-30 h-30 ${className}`} style={{ transform: 'scale(1.5)' }}>
      {/* Head SVG - always visible */}
      <svg
        viewBox="0 0 512 512"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M489.518,201.801C484.932,88.594,392.72,0,279.307,0C166.021,0,73.349,89.983,69.024,202.237
            c-14.52,28.421-40.694,81.771-41.892,84.215c-6.784,13.536-7.038,29.476-0.588,43.479c6.427,13.965,18.678,24.129,33.61,27.865
            l9.585,2.404c4.65,20.986,11.639,52.62,13.83,62.673c8.252,37.973,28.199,54.176,66.696,54.176c5.331,0,10.759-0.318,16.043-0.834
            v3.285V512h32.499h190.645h32.499v-32.499v-66.719c0-21.74,6.712-42.822,17.947-56.389
            C486.162,300.559,492.462,241.623,489.518,201.801z M414.872,335.66c-18.772,22.661-25.421,52.962-25.421,77.122v66.719H198.806
            v-42.155c0,0-26.295,7.205-48.542,7.205c-22.232,0-29.833-5.094-34.943-28.596c-3.38-15.519-18.194-82.406-18.194-82.406
            l-29.079-7.276c-5.292-1.324-9.704-4.975-11.989-9.942c-2.285-4.958-2.198-10.687,0.246-15.567c0,0,31.801-64.823,45.059-90.356
            c0.016-98.258,79.677-177.911,177.943-177.911c95.997,0,174.189,76.034,177.76,171.158
            C459.963,241.362,452.624,290.102,414.872,335.66z"
          fill="currentColor"
        />
      </svg>

      {/* Hair SVG - only visible on hover with animation */}
      <svg
        viewBox="0 0 791 688"
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'translate(5%, -25%) scale(0.9)' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={hairPathRef}
          d="M90.7597 24.0062C87.1918 25.0212 79.0101 30.127 68.7599 40.1081C55.3572 53.1589 47.7289 60.8853 39.7857 69.5899C28.0723 82.426 26.6904 96.7494 24.891 110.568C21.0462 140.094 29.7354 152.637 48.8978 186.625C64.6154 214.503 92.2054 234.116 108.384 243.897C117.191 249.221 130.161 251.602 145.748 254.67C163.784 258.22 190.555 259.307 221.259 257.784C263.64 255.683 286.967 234.27 305.498 218.86C318.354 208.169 329.075 192.223 349.314 160.488C358.675 145.81 366.507 124.616 371.929 104.808C376.351 88.649 369.675 67.6521 364.016 54.8106C361.153 48.3152 356.326 44.0144 352.236 41.4538C348.529 39.1335 336.918 39.3853 320.539 41.1616C293.01 44.1471 271.833 72.1121 259.961 79.6094C250.602 85.5191 241.537 102.347 234.578 117.504C225.768 136.691 226.096 165.802 229.156 187.74C230.967 200.721 243.474 213.108 253.732 224.658C261.295 233.172 281.83 243.343 305.645 254.87C319.477 261.565 338.225 262.89 362.54 263.405C380.259 263.781 400.265 259.845 426.34 253.716C453.882 247.243 478.206 235.269 496.13 225.542C514.969 215.318 525.927 200.928 534.163 190.393C544.101 177.681 559.239 150.792 565.705 127.377C568.249 118.169 567.512 105.592 565.99 93.5505C565.402 88.904 561.422 88.1063 557.316 87.5834C541.008 85.5067 519.499 91.6435 499.129 102.394C482.89 110.963 478.836 129.568 468.363 153.852C462.844 166.65 460.381 176.229 458.844 194.799C455.258 238.092 459.843 270.549 462.911 277.2C465.599 283.028 480.236 295.094 505.55 312.749C546.576 341.363 568.497 340.816 594.764 341.839C609.794 342.424 635.181 341.339 653.328 340.062C700.84 336.72 720.75 322.392 728.194 313.18C740.957 297.383 740.774 281.914 741.043 272.925C741.339 263.027 733.622 257.277 730.3 253.693C727.166 250.312 713.214 250.079 688.431 255.408C674.134 258.482 659.08 271.395 634.735 293.887C610.389 316.379 577.909 350.382 560.415 369.421C533.247 398.989 536.754 425.863 538.284 440.98C539.309 451.098 563.237 472.892 607.537 500.151C645.328 523.406 680.749 523.305 690.984 525.096C710.252 528.469 732.008 524.873 743.05 521.79C754.991 518.455 760.751 511.54 764.85 508.218C768.231 505.477 764.396 495.699 758.514 485.195C748.711 467.691 712.63 480.243 704.164 484.08C689.213 490.856 674.705 508.418 662.394 517.637C652.685 524.909 648.037 537.607 641.355 553.755C635.61 567.64 635.181 593.372 638.495 617.563C645.915 638.602 653.62 651.966 657.196 656.311C659.249 658.626 661.786 661.163 667.477 663.778"
          stroke="currentColor"
          strokeWidth="48"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        />
      </svg>

      {/* Arrow SVG - positioned to top left, more separate from head */}
      <svg
        viewBox="0 0 287 351"
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'translate(-65%, -45%) scale(0.4)' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={arrowPathRef}
          d="M24.0031 24.003C24.5106 27.571 27.571 35.7527 30.147 46.0029C33.5434 59.5175 33.7227 71.1247 36.5524 82.1438C39.9398 95.3344 47.5331 114.648 52.1853 125.474C56.8007 136.216 62.943 151.065 70.6172 162.115C81.3901 177.627 91.1175 189.513 101.368 200.055C114.906 213.98 133.103 224.393 143.929 229.045C153.224 233.039 166.937 237.25 181.847 240.579C192.252 242.903 200.309 246.477 217.734 249.538C240.852 253.598 181.947 278.743 148.705 309.932C139.09 318.952 134.748 323.358 132.441 326.187C127.434 332.329 140.331 300.919 151.834 268.977C167.4 225.756 183.408 194.757 188.014 185.807C195.596 171.072 198.802 160.416 200.855 151.681C201.341 149.613 201.878 147.59 202.139 147.559C213.489 146.224 213.628 183.331 225.677 203.608C237.091 222.815 249.522 231.59 255.697 239.28C256.735 241.341 257.243 243.371 258.266 245.432C259.288 247.492 260.811 249.522 262.379 253.152"
          stroke="currentColor"
          strokeWidth="48"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        />
      </svg>

      {/* Me SVG - positioned above arrow, more separated */}
      <svg
        viewBox="0 0 431 333"
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'translate(-70%, -85%) scale(0.3)' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={meGroupRef} opacity="0">
          <path
            d="M24 308.514C24 302.9 33.1352 270.343 39.879 245.006C42.2059 236.263 47.5455 209.288 53.6894 166.319C62.1939 106.84 61.4174 100.404 62.4401 96.059C62.9834 93.7509 63.4628 91.2069 65.5006 96.7511C72.4149 115.563 77.2887 137.221 85.9548 157.883C100.224 191.903 114.199 215.686 119.058 222.345C121.113 225.16 123.411 225.959 128.009 219.123C153.368 181.423 154.169 165.027 162.897 141.235C168.831 125.059 174.162 101.08 179.314 78.6575C182.173 66.2154 185.481 60.4179 185.735 58.8646C186.315 55.3086 187.019 100.035 187.78 154.1C195.693 190.51 207.996 222.268 214.163 236.947C216.208 241.292 219.253 247.889 223.929 256.225"
            stroke="currentColor"
            strokeWidth="48"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M296.21 260.839C296.21 259.824 296.21 240.523 295.957 210.041C295.825 194.26 294.673 167.764 294.419 132.408C294.157 95.922 295.165 59.895 299.509 57.5958C309.161 52.4882 321.248 47.0996 337.934 40.1713C347.419 36.2332 355.635 31.1976 365.378 26.0686C367.954 25.0306 370.492 24.523 373.068 24.2616C375.644 24.0002 378.181 24.0002 380.796 24.0002"
            stroke="currentColor"
            strokeWidth="48"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M319.279 137.806C323.354 136.283 346.777 127.102 366.9 118.351C374.06 115.783 381.272 114.737 387.67 114.483C390.515 114.229 392.545 113.722 394.637 113.199"
            stroke="currentColor"
            strokeWidth="48"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M316.203 257.763C320.279 255.21 332.536 248.074 345.378 239.592C356.225 232.428 364.863 228.05 375.113 224.459C388.454 216.255 396.667 212.656 400.758 211.379C402.819 210.61 404.849 209.595 406.94 208.55"
            stroke="currentColor"
            strokeWidth="48"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}