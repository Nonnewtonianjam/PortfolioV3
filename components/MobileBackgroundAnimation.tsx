'use client';

import { useEffect, useState } from 'react';

interface Square {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  blur: number;
  color: string;
  verticalOffset: number;
  verticalSpeed: number;
}

export default function MobileBackgroundAnimation() {
  const [squares, setSquares] = useState<Square[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile and set state
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();
    if (!mobile) return;

    // Get theme colors with transparency for subtle effect
    const getRandomColor = () => {
      const colors = [
        'rgba(99, 102, 241, 0.4)', // about color
        'rgba(16, 185, 129, 0.4)', // skills color
        'rgba(139, 92, 246, 0.4)', // contact color
        'rgba(6, 182, 212, 0.4)',  // software color
        'rgba(249, 115, 22, 0.4)', // jam color
        'rgba(245, 158, 11, 0.4)', // process color
        'rgba(239, 68, 68, 0.4)',  // projects color
        'rgba(236, 72, 153, 0.4)', // theme color
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Create initial squares
    const createSquare = (id: number): Square => ({
      id,
      x: Math.random() * window.innerWidth, // Start anywhere on screen
      y: Math.random() * window.innerHeight,
      size: Math.random() * 16 + 8, // 8-24px - satellite-like sizes
      speed: Math.random() * 0.8 + 0.2, // 0.2-1.0px per frame - gentle movement
      opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8 opacity
      blur: Math.random() * 3 + 1, // 1-4px blur - less blur so you can see they're blocks
      color: getRandomColor(),
      verticalOffset: 0,
      verticalSpeed: (Math.random() - 0.5) * 0.3, // -0.15 to 0.15 for subtle drift
    });

    // Initialize with fewer squares for subtlety
    const initialSquares = Array.from({ length: 8 }, (_, i) => {
      return createSquare(i);
    });

    setSquares(initialSquares);

    let animationId: number;
    let nextId = initialSquares.length;

    const animate = () => {
      setSquares(prevSquares => {
        let newSquares = prevSquares.map(square => ({
          ...square,
          x: square.x + square.speed,
          verticalOffset: square.verticalOffset + square.verticalSpeed,
        })).filter(square => square.x < window.innerWidth + 60); // Remove squares that are off-screen right

        // Add new squares occasionally
        if (Math.random() < 0.008 && newSquares.length < 12) { // 0.8% chance per frame, max 12 squares
          const newSquare = createSquare(nextId++);
          newSquare.x = -60; // New squares start from left edge
          newSquares.push(newSquare);
        }

        return newSquares;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const mobile = checkMobile();
      if (!mobile) {
        setSquares([]);
        cancelAnimationFrame(animationId);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden lg:hidden" style={{ zIndex: 1 }}>
      {squares.map(square => (
        <div
          key={square.id}
          className="absolute"
          style={{
            left: `${square.x}px`,
            top: `${square.y + square.verticalOffset}px`,
            width: `${square.size}px`,
            height: `${square.size}px`,
            backgroundColor: square.color,
            opacity: square.opacity,
            filter: `blur(${square.blur}px)`,
            transform: 'translateZ(0)', // Hardware acceleration
            borderRadius: '6px', // Rounded for satellite feel
          }}
        />
      ))}
    </div>
  );
}