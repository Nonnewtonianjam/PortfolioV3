import { ReactNode } from 'react';

interface BentoColumnProps {
  children: ReactNode;
  columnRef?: React.RefObject<HTMLDivElement | null>;
}

export default function BentoColumn({ children, columnRef }: BentoColumnProps) {
  return (
    <div ref={columnRef} className="flex flex-col bento-column-initial" style={{ gap: '72px', backgroundColor: 'var(--page-background)' }}>
      {children}
    </div>
  );
}