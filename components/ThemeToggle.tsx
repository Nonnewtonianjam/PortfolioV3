'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface ThemeToggleProps {
  isHovered: boolean;
  className?: string;
}

export default function ThemeToggle({ isHovered, className = "" }: ThemeToggleProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isHovered) {
      // Scale up on hover
      gsap.to(containerRef.current, {
        scale: 1.15,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      // Reset scale
      gsap.to(containerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovered]);

  const handleClick = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Update theme
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }

    // Squash animation on click
    if (containerRef.current) {
      const tl = gsap.timeline();
      
      tl.to(containerRef.current, {
        scaleY: 0.7,
        scaleX: 1.2,
        duration: 0.15,
        ease: "power2.in"
      })
      .to(containerRef.current, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)"
      });
    }

    // Rotate icon on toggle
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: isDark ? 0 : 180,
        duration: 0.5,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      onClick={handleClick}
      className={`relative w-20 h-20 cursor-pointer ${className}`}
    >
      <div ref={iconRef} className="w-full h-full">
        <Image
          src="/NightDay.svg"
          alt="Theme Toggle"
          width={80}
          height={80}
          className="w-full h-full transition-all duration-300"
          style={{ 
            filter: isDark ? 'brightness(0)' : 'brightness(0) invert(1)'
          }}
        />
      </div>
    </div>
  );
}