import { ReactNode } from 'react';

interface SkillsOverlayProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  bgColor: string;
  onClose: () => void;
  children: ReactNode;
}

export default function SkillsOverlay({ 
  overlayRef, 
  bgColor, 
  onClose, 
  children 
}: SkillsOverlayProps) {
  return (
    <div 
      ref={overlayRef} 
      className="rounded-lg hidden lg:overflow-hidden overflow-y-auto transition-colors duration-300"
      style={{ zIndex: 100, position: 'fixed', backgroundColor: bgColor }}
    >
      <button 
        onClick={onClose} 
        className="close-button absolute text-white text-3xl font-light cursor-pointer hover:opacity-70 z-20" 
        style={{ top: '2rem', right: '2rem' }}
      >
        ×
      </button>
      <div className="overlay-content h-full w-full">
        {children}
      </div>
    </div>
  );
}