"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const projects = [
  {
    id: 1,
    title: "Mind-Craft",
    category: "AI • Web App",
    description: "An innovative AI-powered application for creative thinking and idea generation.",
    tech: ["React", "AI/ML", "Node.js"],
    github: "https://github.com/Nonnewtonianjam/Mind-Craft"
  },
  {
    id: 2,
    title: "Self-Document",
    category: "Productivity • Tool",
    description: "Automated documentation system that helps developers maintain up-to-date project docs.",
    tech: ["Python", "Automation", "Documentation"],
    github: "https://github.com/Nonnewtonianjam/self-document"
  },
  {
    id: 3,
    title: "3D MTA Subway App",
    category: "3D • Transportation",
    description: "Interactive 3D visualization of the NYC subway system with real-time data integration.",
    tech: ["Three.js", "WebGL", "Transit API"],
    github: "https://github.com/Nonnewtonianjam/3D-MTA-Subway-App"
  },
];

export default function ProjectsSection() {
  const heroProjectRef = useRef<HTMLAnchorElement>(null);
  const secondaryProjectRef = useRef<HTMLAnchorElement>(null);
  const tertiaryProjectRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up all hover animations with playful rotations
    const elements = [
      {
        ref: heroProjectRef,
        hoverProps: { y: -4, rotation: -0.5, duration: 0.3 },
        restProps: { y: 0, rotation: 0, duration: 0.3 }
      },
      {
        ref: secondaryProjectRef,
        hoverProps: { y: -4, rotation: 0.5, duration: 0.3 },
        restProps: { y: 0, rotation: 0, duration: 0.3 }
      },
      {
        ref: tertiaryProjectRef,
        hoverProps: { y: -4, rotation: -0.5, duration: 0.3 },
        restProps: { y: 0, rotation: 0, duration: 0.3 }
      },
      {
        ref: ctaRef,
        hoverProps: { scale: 1.1, duration: 0.3 },
        restProps: { scale: 1, duration: 0.3 }
      }
    ];

    const cleanupFunctions: (() => void)[] = [];

    elements.forEach(({ ref, hoverProps, restProps }) => {
      if (ref.current) {
        const element = ref.current;
        
        const handleEnter = () => {
          gsap.to(element, {
            ...hoverProps,
            ease: "power2.out"
          });
        };
        
        const handleLeave = () => {
          gsap.to(element, {
            ...restProps,
            ease: "power2.out"
          });
        };
        
        element.addEventListener('mouseenter', handleEnter);
        element.addEventListener('mouseleave', handleLeave);
        
        cleanupFunctions.push(() => {
          element.removeEventListener('mouseenter', handleEnter);
          element.removeEventListener('mouseleave', handleLeave);
        });
      }
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline();
    
    // Animate header
    if (headerRef.current) {
      tl.fromTo(headerRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // Animate project cards with stagger
    const projectElements = [heroProjectRef.current, secondaryProjectRef.current, tertiaryProjectRef.current].filter(Boolean);
    
    if (projectElements.length > 0) {
      tl.fromTo(projectElements,
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          ease: "power2.out",
          stagger: 0.1
        },
        "-=0.4"
      );
    }

    // Animate GitHub button separately
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          ease: "back.out(1.7)"
        },
        "-=0.2"
      );
    }
  }, []);

  return (
    <section className="relative w-full px-8 py-8 transition-colors duration-300" style={{ backgroundColor: 'var(--color-projects)' }}>
      {/* Tucked GitHub Button */}
      <div
        ref={ctaRef}
        className="absolute bottom-6 right-12 opacity-0 z-10"
      >
        <a
          href="https://github.com/Nonnewtonianjam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:shadow-sm transition-all duration-200 group"
        >
          <svg className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>

      {/* Header */}
      <div ref={headerRef} className="flex items-end justify-between mb-8 opacity-0 pr-16">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">Selected Work</h2>
          <p className="mt-2 text-white/90 text-sm max-w-md">
            A curated collection of recent projects and experiments.
          </p>
        </div>
        <div className="text-right">
          <span className="block text-2xl font-medium text-white">03</span>
          <span className="text-xs uppercase tracking-wider text-white/80">
            Projects
          </span>
        </div>
      </div>

      {/* Playful Asymmetric Grid */}
      <div className="max-w-5xl space-y-4">
        {/* Hero Project - Large and prominent */}
        <a
          href={projects[0].github}
          target="_blank"
          rel="noopener noreferrer"
          ref={heroProjectRef}
          className="block rounded-3xl p-8 cursor-pointer opacity-0 hover:shadow-lg transition-all duration-300"
          style={{ backgroundColor: 'var(--color-project-1)' }}
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {projects[0].title}
            </h3>
            <p className="text-sm text-white/90 mb-4 font-medium">
              {projects[0].category}
            </p>
            <p className="text-white/80 leading-relaxed mb-6 max-w-2xl">
              {projects[0].description}
            </p>
            <div className="flex flex-wrap gap-2">
              {projects[0].tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </a>

        {/* Secondary Projects Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Second Project */}
          <a
            href={projects[1].github}
            target="_blank"
            rel="noopener noreferrer"
            ref={secondaryProjectRef}
            className="block rounded-3xl p-6 cursor-pointer opacity-0 hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: 'var(--color-project-2)' }}
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                {projects[1].title}
              </h3>
              <p className="text-xs text-white/90 mb-3 font-medium">
                {projects[1].category}
              </p>
              <p className="text-sm text-white/80 mb-4 leading-relaxed">
                {projects[1].description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {projects[1].tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>

          {/* Third Project */}
          <a
            href={projects[2].github}
            target="_blank"
            rel="noopener noreferrer"
            ref={tertiaryProjectRef}
            className="block rounded-3xl p-6 cursor-pointer opacity-0 hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: 'var(--color-project-3)' }}
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                {projects[2].title}
              </h3>
              <p className="text-xs text-white/90 mb-3 font-medium">
                {projects[2].category}
              </p>
              <p className="text-sm text-white/80 mb-4 leading-relaxed">
                {projects[2].description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {projects[2].tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}