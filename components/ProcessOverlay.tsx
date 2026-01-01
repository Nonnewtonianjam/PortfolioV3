import { ReactNode } from 'react';

interface ProcessOverlayProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  bgColor: string;
  onClose: () => void;
  children: ReactNode;
}

export default function ProcessOverlay({ 
  overlayRef, 
  bgColor, 
  onClose, 
  children
}: ProcessOverlayProps) {
  return (
    <div 
      ref={overlayRef} 
      className="rounded-lg p-8 hidden lg:overflow-hidden overflow-y-auto transition-colors duration-300"
      style={{ zIndex: 100, position: 'fixed', backgroundColor: bgColor }}
    >
      <button 
        onClick={onClose} 
        className="close-button absolute text-white text-3xl font-light cursor-pointer hover:opacity-70 z-20"
        style={{ top: '2rem', right: '2rem' }}
      >
        ×
      </button>
      <div className="overlay-content h-full flex flex-col">
        <div className="flex items-center justify-between mb-8 lg:mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-white">Process</h2>
        </div>
        
        <div className="flex-1 relative pb-8 lg:pb-0">
          <div className="h-full flex items-start justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
