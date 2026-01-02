'use client';

import { useRef, useEffect, useState } from 'react';
import BentoCell from '../components/BentoCell';
import BentoGrid from '../components/BentoGrid';
import AnimatedName from '../components/AnimatedName';
import OverlaySection from '../components/OverlaySection';
import ProjectsOverlay from '../components/ProjectsOverlay';
import SkillsOverlay from '../components/SkillsOverlay';
import AboutOverlay from '../components/AboutOverlay';
import ProcessOverlay from '../components/ProcessOverlay';
import SoftwareDevOverlay from '../components/SoftwareDevOverlay';
import ContactOverlay from '../components/ContactOverlay';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import SkillsSection from '../components/SkillsSection';
import AboutSection from '../components/AboutSection';
import ProcessSection from '../components/ProcessSection';
import SoftwareDevSection from '../components/SoftwareDevSection';
import AboutIcon from '../components/AboutIcon';
import PhoneIcon from '../components/PhoneIcon';
import ProcessIcon from '../components/ProcessIcon';
import SkillsIcon from '../components/SkillsIcon';
import ProjectIcon from '../components/ProjectIcon';
import ThemeToggle from '../components/ThemeToggle';
import { useOverlayManager } from '../hooks/useOverlayManager';
import { colors } from '../utils/colors';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isProcessHovered, setIsProcessHovered] = useState(false);
  const [isSkillsHovered, setIsSkillsHovered] = useState(false);
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const [isThemeHovered, setIsThemeHovered] = useState(false);
  
  // Cell refs
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const topCenterRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  
  // Overlay refs
  const aboutOverlayRef = useRef<HTMLDivElement>(null);
  const skillsOverlayRef = useRef<HTMLDivElement>(null);
  const contactOverlayRef = useRef<HTMLDivElement>(null);
  const topCenterOverlayRef = useRef<HTMLDivElement>(null);
  const socialOverlayRef = useRef<HTMLDivElement>(null);
  const projectsOverlayRef = useRef<HTMLDivElement>(null);
  
  // Use overlay manager hook
  const { handleCellClick, handleCloseOverlay } = useOverlayManager(containerRef);

  // Click handlers
  const handleProjectsClick = () => handleCellClick(projectsRef, projectsOverlayRef);
  const handleAboutClick = () => handleCellClick(aboutRef, aboutOverlayRef);
  const handleSkillsClick = () => handleCellClick(skillsRef, skillsOverlayRef);
  const handleContactClick = () => handleCellClick(contactRef, contactOverlayRef);
  const handleTopCenterClick = () => handleCellClick(topCenterRef, topCenterOverlayRef);
  const handleSocialClick = () => handleCellClick(socialRef, socialOverlayRef);

  // Prevent FOUC by ensuring animations start from the correct initial state
  useEffect(() => {
    // Add loaded class to show content when ready
    document.body.classList.add('loaded');
    
    // iOS Safari address bar fix
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial viewport height
    setViewportHeight();

    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 100);
    });

    // Force scroll to hide address bar on iOS
    const forceAddressBarHide = () => {
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        setTimeout(() => {
          window.scrollTo(0, 1);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
        }, 500);
      }
    };

    forceAddressBarHide();
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('loaded');
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden ios-viewport-fix" style={{ backgroundColor: 'var(--page-background)' }}>
      {/* Overlays */}
      <AboutOverlay 
        overlayRef={aboutOverlayRef} 
        bgColor={colors.about}
        onClose={() => handleCloseOverlay(aboutRef, aboutOverlayRef)}
      >
        <AboutSection />
      </AboutOverlay>

      <SkillsOverlay 
        overlayRef={skillsOverlayRef} 
        bgColor={colors.skills}
        onClose={() => handleCloseOverlay(skillsRef, skillsOverlayRef)}
      >
        <SkillsSection />
      </SkillsOverlay>

      <ContactOverlay 
        overlayRef={contactOverlayRef} 
        bgColor={colors.contact}
        onClose={() => handleCloseOverlay(contactRef, contactOverlayRef)}
      >
        <ContactSection />
      </ContactOverlay>

      <SoftwareDevOverlay 
        overlayRef={topCenterOverlayRef} 
        bgColor={colors.software}
        onClose={() => handleCloseOverlay(topCenterRef, topCenterOverlayRef)}
      >
        <SoftwareDevSection />
      </SoftwareDevOverlay>

      <ProcessOverlay 
        overlayRef={socialOverlayRef} 
        bgColor={colors.process}
        onClose={() => handleCloseOverlay(socialRef, socialOverlayRef)}
      >
        <ProcessSection />
      </ProcessOverlay>

      <ProjectsOverlay 
        overlayRef={projectsOverlayRef} 
        bgColor={colors.projects}
        onClose={() => handleCloseOverlay(projectsRef, projectsOverlayRef)}
      >
        <ProjectsSection />
      </ProjectsOverlay>

      {/* Desktop Bento Grid - Hidden on mobile */}
      <div className="hidden lg:flex items-center justify-center w-full h-full">
        <BentoGrid containerRef={containerRef}>
          {[
            // Column 1 - 3 cells
            <>
              <BentoCell 
                cellRef={aboutRef} 
                onClick={handleAboutClick} 
                bgColor={colors.about}
                flex="0.8"
                onMouseEnter={() => setIsAboutHovered(true)}
                onMouseLeave={() => setIsAboutHovered(false)}
              >
                <div className="flex flex-col justify-between h-full w-full">
                  <div className="flex flex-col justify-center flex-1">
                    <h2 className="text-2xl font-bold text-white mb-3">About</h2>
                    <p className="text-white/90">Creative developer</p>
                  </div>
                  <div className="flex justify-end">
                    <AboutIcon 
                      isHovered={isAboutHovered} 
                      className="text-white"
                    />
                  </div>
                </div>
              </BentoCell>
              <BentoCell 
                cellRef={skillsRef} 
                onClick={handleSkillsClick} 
                bgColor={colors.skills}
                flex="1.1"
                onMouseEnter={() => setIsSkillsHovered(true)}
                onMouseLeave={() => setIsSkillsHovered(false)}
              >
                <div className="flex flex-col justify-between h-full w-full">
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="text-2xl font-bold text-white">Skills</h3>
                  </div>
                  <div className="flex justify-end">
                    <SkillsIcon 
                      isHovered={isSkillsHovered} 
                      className="text-white"
                    />
                  </div>
                </div>
              </BentoCell>
              <BentoCell 
                cellRef={contactRef} 
                onClick={handleContactClick} 
                bgColor={colors.contact}
                flex="1.1"
                onMouseEnter={() => setIsContactHovered(true)}
                onMouseLeave={() => setIsContactHovered(false)}
              >
                <div className="relative flex items-center justify-between h-full w-full">
                  <div className="absolute left-4 bottom-4">
                    <PhoneIcon 
                      isHovered={isContactHovered} 
                      className="text-white"
                    />
                  </div>
                  <div className="flex flex-col items-end justify-center ml-auto pr-4">
                    <h3 className="text-2xl font-bold text-white">Contact</h3>
                  </div>
                </div>
              </BentoCell>
            </>,
            
            // Column 2 - 3 cells (center column with featured content)
            <>
              <BentoCell 
                cellRef={topCenterRef} 
                onClick={handleTopCenterClick} 
                bgColor={colors.software}
              >
                <div className="text-center overflow-hidden">
                  <h1 className="text-2xl font-bold text-white mb-2">Software Dev</h1>
                  <p className="text-white/90">I make stuff</p>
                </div>
              </BentoCell>
              <BentoCell bgColor={colors.jam}>
                <AnimatedName />
              </BentoCell>
              <BentoCell 
                cellRef={socialRef} 
                onClick={handleSocialClick} 
                bgColor={colors.process}
                onMouseEnter={() => setIsProcessHovered(true)}
                onMouseLeave={() => setIsProcessHovered(false)}
              >
                <div className="flex flex-col justify-between h-full w-full">
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="text-2xl font-bold text-white">Process</h3>
                  </div>
                  <div className="flex justify-end">
                    <ProcessIcon 
                      isHovered={isProcessHovered} 
                      className="text-white"
                    />
                  </div>
                </div>
              </BentoCell>
            </>,
            
            // Column 3 - 2 cells (asymmetric)
            <>
              <BentoCell 
                cellRef={projectsRef} 
                onClick={handleProjectsClick} 
                bgColor={colors.projects}
                onMouseEnter={() => setIsProjectsHovered(true)}
                onMouseLeave={() => setIsProjectsHovered(false)}
              >
                <div className="flex flex-col justify-between h-full w-full">
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="text-2xl font-bold text-white">Projects</h3>
                    <p className="text-white/90">View my work</p>
                  </div>
                  <div className="flex justify-end">
                    <ProjectIcon 
                      isHovered={isProjectsHovered} 
                      className="text-white"
                    />
                  </div>
                </div>
              </BentoCell>
              <BentoCell 
                cellRef={themeRef} 
                bgColor={colors.theme}
                onMouseEnter={() => setIsThemeHovered(true)}
                onMouseLeave={() => setIsThemeHovered(false)}
              >
                <div className="flex items-center justify-center h-full w-full">
                  <ThemeToggle 
                    isHovered={isThemeHovered} 
                    className="text-white"
                  />
                </div>
              </BentoCell>
            </>
          ]}
        </BentoGrid>
      </div>

      {/* Mobile Layout - Visible only on mobile */}
      <div className="lg:hidden flex flex-col w-full h-full overflow-y-auto px-6 py-8 gap-6">
        {/* JAM Card - Top - Large, striking, static with drop shadow */}
        <div className="mobile-card rounded-3xl p-4 min-h-[320px] flex items-center justify-center relative overflow-hidden border-2 shadow-lg" 
             style={{ 
               borderColor: 'var(--color-contact)', 
               boxShadow: `0 8px 0 var(--color-contact)` 
             }}>
          <h1 className="text-[6rem] sm:text-[7rem] font-black tracking-tighter leading-none" style={{ color: 'var(--color-contact)' }}>
            JAM
          </h1>
        </div>

        {/* Projects Card - White with red text and drop shadow */}
        <div 
          onClick={handleProjectsClick}
          className="mobile-card rounded-3xl p-8 min-h-[180px] cursor-pointer active:scale-[0.98] transition-all border-2 shadow-lg"
          style={{ 
            borderColor: 'var(--color-projects)', 
            boxShadow: `0 8px 0 var(--color-projects)` 
          }}
        >
          <div className="flex items-center justify-between h-full">
            <div className="flex flex-col justify-center flex-1">
              <h3 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-projects)' }}>Projects</h3>
              <p className="text-xl" style={{ color: 'var(--color-projects)', opacity: 0.8 }}>View my work</p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <ProjectIcon 
                isHovered={true} 
                iconColor="var(--color-projects)"
              />
            </div>
          </div>
        </div>

        {/* About Card - White with indigo text and drop shadow */}
        <div 
          onClick={handleAboutClick}
          className="mobile-card rounded-3xl p-8 min-h-[180px] cursor-pointer active:scale-[0.98] transition-all border-2 shadow-lg"
          style={{ 
            borderColor: 'var(--color-about)', 
            boxShadow: `0 8px 0 var(--color-about)` 
          }}
        >
          <div className="flex items-center justify-between h-full">
            <div className="flex flex-col justify-center flex-1">
              <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-about)' }}>About</h2>
              <p className="text-xl" style={{ color: 'var(--color-about)', opacity: 0.8 }}>Creative developer</p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <AboutIcon 
                isHovered={true} 
                className="w-20 h-20"
                iconColor="var(--color-about)"
              />
            </div>
          </div>
        </div>

        {/* Skills Card - White with green text and drop shadow */}
        <div 
          onClick={handleSkillsClick}
          className="mobile-card rounded-3xl p-8 min-h-[180px] cursor-pointer active:scale-[0.98] transition-all border-2 shadow-lg"
          style={{ 
            borderColor: 'var(--color-skills)', 
            boxShadow: `0 8px 0 var(--color-skills)` 
          }}
        >
          <div className="flex items-center justify-between h-full">
            <div className="flex flex-col justify-center flex-1">
              <h3 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-skills)' }}>Skills</h3>
              <p className="text-xl" style={{ color: 'var(--color-skills)', opacity: 0.8 }}>Technical expertise</p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <SkillsIcon 
                isHovered={true} 
                className="w-24 h-24"
                iconColor="var(--color-skills)"
              />
            </div>
          </div>
        </div>

        {/* Contact Card - White with purple text and drop shadow */}
        <div className="mb-6">
          <div 
            onClick={handleContactClick}
            className="mobile-card rounded-3xl p-8 min-h-[180px] cursor-pointer active:scale-[0.98] transition-all border-2 shadow-lg"
            style={{ 
              borderColor: 'var(--color-contact)', 
              boxShadow: `0 8px 0 var(--color-contact)` 
            }}
          >
            <div className="flex items-center justify-between h-full">
              <div className="flex flex-col justify-center flex-1">
                <h3 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-contact)' }}>Contact</h3>
                <p className="text-xl" style={{ color: 'var(--color-contact)', opacity: 0.8 }}>Get in touch</p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <PhoneIcon 
                  isHovered={true} 
                  className="w-16 h-16"
                  iconColor="var(--color-contact)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
