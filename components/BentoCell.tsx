import { ReactNode, CSSProperties } from 'react';

interface BentoCellProps {
  cellRef?: React.RefObject<HTMLDivElement | null>;
  onClick?: () => void;
  backgroundColor?: string;
  bgColor?: string; // CSS variable color
  flex?: string;
  children: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export default function BentoCell({ 
  cellRef, 
  onClick, 
  backgroundColor,
  bgColor,
  flex, 
  children,
  onMouseEnter,
  onMouseLeave,
  className
}: BentoCellProps) {
  const style: CSSProperties = {
    flex: flex || '1',
    ...(bgColor && { backgroundColor: bgColor }),
  };

  const className_str = `bento-cell ${!bgColor ? backgroundColor : ''} rounded-lg p-8 flex items-center justify-center transition-colors duration-300 ${onClick ? 'cursor-pointer' : ''} ${className || ''}`;

  return (
    <div 
      ref={cellRef}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className_str}
      style={style}
    >
      {children}
    </div>
  );
}