"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const skills = [
  // Frontend cluster - complementary colors to green overlay
  { name: "React", color: "bg-[#61DAFB]", size: "large", textColor: "text-white" },
  { name: "Next.js", color: "bg-[#000000]", size: "large", textColor: "text-white" },
  { name: "TypeScript", color: "bg-[#3178C6]", size: "medium", textColor: "text-white" },
  { name: "JavaScript", color: "bg-[#F7DF1E]", size: "medium", textColor: "text-white" },
  { name: "Tailwind CSS", color: "bg-[#06B6D4]", size: "small", textColor: "text-white" },
  { name: "GSAP", color: "bg-[#88CE02]", size: "small", textColor: "text-white" },
  { name: "HTML5", color: "bg-[#E34F26]", size: "small", textColor: "text-white" },
  { name: "CSS3", color: "bg-[#1572B6]", size: "small", textColor: "text-white" },
  
  // Backend cluster - warm tones to complement green
  { name: "Java", color: "bg-[#ED8B00]", size: "large", textColor: "text-white" },
  { name: "Spring Boot", color: "bg-[#6DB33F]", size: "medium", textColor: "text-white" },
  { name: "Node.js", color: "bg-[#339933]", size: "medium", textColor: "text-white" },
  { name: "Express", color: "bg-[#000000]", size: "small", textColor: "text-white" },
  { name: "PostgreSQL", color: "bg-[#336791]", size: "medium", textColor: "text-white" },
  { name: "MongoDB", color: "bg-[#47A248]", size: "small", textColor: "text-white" },
  
  // Mobile & Tools cluster - vibrant accents
  { name: "React Native", color: "bg-[#61DAFB]", size: "medium", textColor: "text-white" },
  { name: "Unity", color: "bg-[#000000]", size: "medium", textColor: "text-white" },
  { name: "Docker", color: "bg-[#2496ED]", size: "small", textColor: "text-white" },
  { name: "AWS", color: "bg-[#FF9900]", size: "medium", textColor: "text-white" },
  { name: "Git", color: "bg-[#F05032]", size: "small", textColor: "text-white" },
  { name: "GitHub Actions", color: "bg-[#2088FF]", size: "small", textColor: "text-white" },
  { name: "Vercel", color: "bg-[#000000]", size: "small", textColor: "text-white" },
  { name: "Figma", color: "bg-[#F24E1E]", size: "small", textColor: "text-white" },
  { name: "REST APIs", color: "bg-[#25D366]", size: "small", textColor: "text-white" },
  { name: "GraphQL", color: "bg-[#E10098]", size: "small", textColor: "text-white" }
];

export default function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up hover animations for skill boxes
    if (skillsGridRef.current) {
      const skillBoxes = skillsGridRef.current.querySelectorAll('.skill-box');
      
      skillBoxes.forEach((box) => {
        const handleEnter = () => {
          gsap.to(box, {
            scale: 1.05,
            y: -2,
            duration: 0.2,
            ease: "power2.out"
          });
        };
        
        const handleLeave = () => {
          gsap.to(box, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        };
        
        box.addEventListener('mouseenter', handleEnter);
        box.addEventListener('mouseleave', handleLeave);
      });
    }
  }, []);

  useEffect(() => {
    // Enhanced entrance animations with more dramatic GSAP stagger
    const tl = gsap.timeline();
    
    // Animate header first
    if (headerRef.current) {
      tl.fromTo(headerRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }

    // More dramatic GSAP stagger animation for masonry layout
    if (skillsGridRef.current) {
      const skillBoxes = skillsGridRef.current.querySelectorAll('.skill-box');
      
      // Set more dramatic initial state
      gsap.set(skillBoxes, {
        opacity: 0,
        y: 100,
        scale: 0.3,
        rotation: -20,
        transformOrigin: "center center"
      });

      // Main entrance animation with enhanced stagger
      tl.to(skillBoxes, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(2.5)",
        stagger: {
          amount: 3.0, // Extended to 3 seconds for more noticeable effect
          grid: "auto",
          from: "start",
          ease: "power2.inOut"
        }
      }, "-=0.2");

      // Secondary bounce wave for extra flair
      tl.to(skillBoxes, {
        y: -8,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        stagger: {
          amount: 1.5,
          from: "start",
          ease: "sine.inOut"
        }
      }, "-=1.5")
      .to(skillBoxes, {
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.6)",
        stagger: {
          amount: 1.5,
          from: "start",
          ease: "sine.inOut"
        }
      });

      // Final subtle pulse for completion
      tl.to(skillBoxes, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
        stagger: {
          amount: 0.8,
          from: "center",
          ease: "power1.inOut"
        }
      }, "-=0.5")
      .to(skillBoxes, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        stagger: {
          amount: 0.8,
          from: "center",
          ease: "power1.inOut"
        }
      });
    }
  }, []);

  return (
    <section className="relative w-full px-8 py-8 bg-[#10B981]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      {/* Header - Positioned to avoid close button */}
      <div ref={headerRef} className="flex items-end justify-between mb-8 opacity-0 pr-16">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tight">Technical Skills</h2>
          <p className="mt-2 text-white/90 text-sm max-w-md">
            A comprehensive toolkit for building modern digital experiences.
          </p>
        </div>
        <div className="text-right">
          <span className="block text-2xl font-medium text-white">{skills.length}</span>
          <span className="text-xs uppercase tracking-wider text-white/80">
            Skills
          </span>
        </div>
      </div>

      {/* Skills Masonry Grid - Unique Pattern */}
      <div 
        ref={skillsGridRef}
        className="max-w-6xl mx-auto lg:mx-auto xl:mx-auto"
      >
        {/* Custom CSS Grid with unique pattern - Responsive */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 sm:gap-3 auto-rows-[50px] sm:auto-rows-[60px]">
          {skills.map((skill, index) => {
            // Define unique grid positions and sizes for interesting layout
            const getGridClass = (index: number, size: string) => {
              const patterns = [
                // Row 1 - Frontend cluster
                "col-span-3 row-span-2", // React - large
                "col-span-2 row-span-2", // Next.js - large  
                "col-span-2 row-span-1", // TypeScript - medium
                "col-span-2 row-span-1", // JavaScript - medium
                "col-span-2 row-span-1", // Tailwind - small
                "col-span-1 row-span-1", // GSAP - small
                
                // Row 2 continuation
                "col-span-2 row-span-1", // HTML5 - small
                "col-span-1 row-span-1", // CSS3 - small
                
                // Row 3 - Backend cluster
                "col-span-3 row-span-2", // Java - large
                "col-span-2 row-span-1", // Spring Boot - medium
                "col-span-2 row-span-1", // Node.js - medium
                "col-span-2 row-span-1", // Express - small
                "col-span-2 row-span-1", // PostgreSQL - medium
                "col-span-1 row-span-1", // MongoDB - small
                
                // Row 4 - Mobile & Tools
                "col-span-2 row-span-1", // React Native - medium
                "col-span-2 row-span-1", // Unity - medium
                "col-span-1 row-span-1", // Docker - small
                "col-span-2 row-span-1", // AWS - medium
                "col-span-1 row-span-1", // Git - small
                "col-span-2 row-span-1", // GitHub Actions - small
                "col-span-1 row-span-1", // Vercel - small
                "col-span-1 row-span-1", // Figma - small
                "col-span-1 row-span-1", // REST APIs - small
                "col-span-1 row-span-1", // GraphQL - small
              ];
              return patterns[index] || "col-span-1 row-span-1";
            };

            return (
              <div
                key={skill.name}
                className={`skill-box ${skill.color} rounded-xl p-2 sm:p-3 cursor-pointer opacity-0 hover:shadow-lg transition-all duration-200 flex items-center justify-center group overflow-hidden ${getGridClass(index, skill.size)}`}
              >
                <span className={`${skill.textColor} text-[10px] sm:text-xs font-semibold text-center leading-tight group-hover:scale-105 transition-transform duration-200 break-words hyphens-auto w-full px-0.5`}>
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}