'use client';

import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionEntryProps {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  analyticsLabel?: string;
}

const SectionEntry = ({ title, subtitle, children, analyticsLabel }: SectionEntryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!children;

  const header = (
    <>
      <p className="font-medium flex items-center">
        {title}
        {hasChildren && (
          <ChevronDown
            size={14}
            className={cn(
              'text-gray-300 group-hover:text-zinc-500 transition-all duration-300 ease-in-out shrink-0 ml-1.5 mt-px',
              isOpen && 'rotate-180 text-zinc-500'
            )}
          />
        )}
      </p>
      {subtitle && <p className="text-gray-700 text-sm">{subtitle}</p>}
    </>
  );

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left group cursor-pointer"
          data-analytics-event="description_expand"
          data-analytics-label={analyticsLabel}
          aria-expanded={isOpen}
        >
          {header}
        </button>
      ) : (
        <div className="w-full text-left">{header}</div>
      )}

      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
        inert={!isOpen}
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <div className="py-2 space-y-3 text-sm text-gray-700 border-l border-gray-200 pl-3 ml-0.5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SectionEntry;
