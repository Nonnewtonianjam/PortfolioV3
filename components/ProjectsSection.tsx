"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const projects = [
  {
    id: 1,
    title: "Mind-Craft",
    category: "AI • Chrome Extension",
    description: "Visual prompt construction meets Chrome's built-in AI.",
    longDescription: "Mind-Craft is an innovative web application + Chrome extension that revolutionizes how you organize thoughts and create AI-generated content. By combining a visual node-based interface with Chrome's built-in AI APIs (Gemini Nano), it enables seamless capture, organization, and synthesis of information from across the web. Perfect for research, content creation, brainstorming, studying, and anyone who needs to synthesize information from multiple sources.",
    tech: ["JavaScript", "Chrome APIs", "Node.js", "Gemini Nano", "Web Extensions", "Canvas API"],
    features: [
      "Visual Node Graph Canvas",
      "Chrome Extension Integration", 
      "Chrome Built-in AI Integration",
      "Project Management",
      "Smart Content Synthesis",
      "Real-time Collaboration"
    ],
    status: "Live",
    github: "https://github.com/Nonnewtonianjam/Mind-Craft",
    demo: "https://mind-craft-deploy.vercel.app",
    image: "/mindcraft.png"
  },
  {
    id: 2,
    title: "Self-Document",
    category: "Backend • Framework",
    description: "Write your routes once. Get everything else for free. TypeScript framework that auto-generates docs, SDKs, and mock data from Zod schemas.",
    longDescription: "A revolutionary TypeScript framework that transforms route definitions into a complete backend ecosystem: interactive documentation, type-safe SDKs, mock endpoints, and automatic validation. Traditional backend development requires maintaining multiple sources of truth - our approach uses a single route definition to generate everything you need.",
    tech: ["TypeScript", "Zod", "Fastify", "Express", "Swagger", "Node.js"],
    features: [
      "Interactive Swagger Documentation",
      "Type-Safe SDK Generation",
      "Smart Mock Data Generation",
      "Automatic Request Validation",
      "Multi-Framework Support",
      "Zero Configuration Setup"
    ],
    status: "Active Development",
    github: "https://github.com/Nonnewtonianjam/self-document",
    image: "/selfdocument.png"
  },
  {
    id: 3,
    title: "3D MTA Subway App",
    category: "3D • Transportation",
    description: "Real time 3d visualization of the New York Metro System",
    longDescription: "Metro Tracker is a real-time 3D visualization of the New York City subway system built with Next.js, Three.js, and the MTA's real-time data feed. The application provides an immersive 3D experience that brings the NYC subway system to life with real-time train tracking, station information, and route planning capabilities.",
    tech: ["Next.js", "Three.js", "MTA API", "Docker", "Real-time Data", "WebGL"],
    features: [
      "Real-time 3D Subway Visualization",
      "Live Train Tracking",
      "Interactive Station Information",
      "Route Planning & Navigation",
      "Docker Deployment Ready",
      "Responsive 3D Interface"
    ],
    status: "Beta",
    github: "https://github.com/Nonnewtonianjam/3D-MTA-Subway-App",
    image: "/mta.png"
  },
];

export default function ProjectsSection() {
  const heroProjectRef = useRef<HTMLDivElement>(null);
  const secondaryProjectRef = useRef<HTMLDivElement>(null);
  const tertiaryProjectRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const [expandedProject, setExpandedProject] = useState<typeof projects[0] | null>(null);

  // Get the correct color variable for each project
  const getProjectColor = (projectId: number) => {
    switch (projectId) {
      case 1: return 'var(--color-project-1)';
      case 2: return 'var(--color-project-2)';
      case 3: return 'var(--color-project-3)';
      default: return 'var(--color-projects)';
    }
  };

  const openProject = (project: typeof projects[0]) => {
    setExpandedProject(project);
  };

  // Handle modal animation when expandedProject changes
  useEffect(() => {
    if (expandedProject && modalRef.current && modalContentRef.current) {
      // Animate modal in
      gsap.set(modalRef.current, { display: 'flex', opacity: 0 });
      gsap.set(modalContentRef.current, { scale: 0.8, y: 50 });
      
      gsap.to(modalRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(modalContentRef.current, { 
        scale: 1, 
        y: 0, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      });
    }
  }, [expandedProject]);

  const closeProject = () => {
    if (modalRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, { 
        scale: 0.8, 
        y: 50, 
        duration: 0.3 
      });
      gsap.to(modalRef.current, { 
        opacity: 0, 
        duration: 0.3,
        onComplete: () => {
          setExpandedProject(null);
        }
      });
    }
  };

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
    <section className="relative w-full px-8 py-8 pb-20 lg:pb-8 transition-colors duration-300" style={{ backgroundColor: 'var(--color-projects)' }}>
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
        <div
          onClick={() => openProject(projects[0])}
          ref={heroProjectRef}
          className="block rounded-3xl p-8 cursor-pointer opacity-0 hover:shadow-lg transition-all duration-300 group"
          style={{ backgroundColor: 'var(--color-project-1)' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold text-white">
                  {projects[0].title}
                </h3>
              </div>
              <p className="text-sm text-white/90 mb-4 font-medium">
                {projects[0].category}
              </p>
              <p className="text-white/80 leading-relaxed mb-6 max-w-2xl">
                {projects[0].description}
              </p>
            </div>
            <div className="ml-6 opacity-60 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>

        {/* Secondary Projects Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Second Project */}
          <div
            onClick={() => openProject(projects[1])}
            ref={secondaryProjectRef}
            className="block rounded-3xl p-6 cursor-pointer opacity-0 hover:shadow-lg transition-all duration-300 group"
            style={{ backgroundColor: 'var(--color-project-2)' }}
          >
            <div className="flex items-start justify-between h-full">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">
                    {projects[1].title}
                  </h3>
                </div>
                <p className="text-xs text-white/90 mb-3 font-medium">
                  {projects[1].category}
                </p>
                <p className="text-sm text-white/80 mb-4 leading-relaxed">
                  {projects[1].description}
                </p>
              </div>
              <div className="ml-4 opacity-60 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>

          {/* Third Project */}
          <div
            onClick={() => openProject(projects[2])}
            ref={tertiaryProjectRef}
            className="block rounded-3xl p-6 cursor-pointer opacity-0 hover:shadow-lg transition-all duration-300 group"
            style={{ backgroundColor: 'var(--color-project-3)' }}
          >
            <div className="flex items-start justify-between h-full">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">
                    {projects[2].title}
                  </h3>
                </div>
                <p className="text-xs text-white/90 mb-3 font-medium">
                  {projects[2].category}
                </p>
                <p className="text-sm text-white/80 mb-4 leading-relaxed">
                  {projects[2].description}
                </p>
              </div>
              <div className="ml-4 opacity-60 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Project Modal */}
      {expandedProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeProject}
        >
          <div
            ref={modalContentRef}
            className="rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
            style={{ backgroundColor: getProjectColor(expandedProject.id) }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 border-b border-white/10 p-8 rounded-t-3xl" style={{ backgroundColor: getProjectColor(expandedProject.id) }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-4xl font-bold text-white">
                      {expandedProject.title}
                    </h2>
                    <span className="px-4 py-2 text-sm bg-white/20 text-white rounded-full font-medium backdrop-blur-sm">
                      {expandedProject.status}
                    </span>
                  </div>
                  <p className="text-white/90 font-medium text-lg">
                    {expandedProject.category}
                  </p>
                </div>
                <button
                  onClick={closeProject}
                  className="p-3 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Project Image */}
              <div className="mb-8">
                <div className="w-full h-80 rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src={expandedProject.image}
                    alt={`${expandedProject.title} screenshot`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-6">About This Project</h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  {expandedProject.longDescription}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expandedProject.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-3 h-3 rounded-full bg-white/60" />
                      <span className="text-white/90 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Technology Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {expandedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-5 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-8 border-t border-white/10">
                <a
                  href={expandedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-white/90 transition-colors font-semibold text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </a>
                {expandedProject.demo && (
                  <a
                    href={expandedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:border-white/50 hover:bg-white/5 transition-colors font-semibold text-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}