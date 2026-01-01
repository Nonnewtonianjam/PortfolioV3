'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AboutSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!textRef.current || hasAnimated.current) return;

    // Create observer to detect when parent becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current && textRef.current) {
            hasAnimated.current = true;
            
            // Split text into words for flip animation
            const text = textRef.current.textContent || '';
            const words = text.split(' ');
            
            textRef.current.innerHTML = words
              .map(word => `<span class="inline-block" style="perspective: 1000px;"><span class="inline-block">${word}</span></span>`)
              .join(' ');

            const wordElements = textRef.current.querySelectorAll('span > span');

            // Animate words with flip effect
            gsap.fromTo(wordElements,
              {
                opacity: 0,
                rotationX: -90,
                transformOrigin: 'center bottom'
              },
              {
                opacity: 1,
                rotationX: 0,
                duration: 0.6,
                stagger: 0.03,
                ease: 'back.out(1.7)',
                delay: 0.3
              }
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <p 
        ref={textRef}
        className="text-white text-2xl lg:text-3xl xl:text-4xl leading-relaxed lg:leading-relaxed xl:leading-relaxed font-light tracking-tight"
      >
        I'm a self-taught software engineer who loves turning complex systems into things people can actually feel and explore. I build interactive, real-time experiences where solid engineering meets curiosity and fun. I'm especially drawn to projects that challenge me to think visually, technically, and creatively at the same time.
      </p>
    </div>
  );
}
