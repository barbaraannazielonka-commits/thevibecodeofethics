import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export const AccessibilityTrigger: React.FC = () => {
  const { toggleOpen, isOpen } = useAccessibility();

  return (
    <aside aria-label="Accessibility controls" className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleOpen}
        aria-label="Open accessibility settings (text size, dyslexia font, contrast)"
        aria-expanded={isOpen}
        title="Accessibility Settings (Aa)"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white dark:bg-blue-600 dark:hover:bg-blue-700 hover:bg-slate-800 shadow-xl shadow-slate-900/25 border-2 border-white/80 dark:border-slate-800 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50 cursor-pointer"
      >
        <span className="font-serif font-black text-lg tracking-tighter select-none">
          Aa
        </span>

        {/* Hover Pill Tooltip */}
        <span className="absolute right-14 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md hidden sm:block">
          Accessibility Settings
        </span>
      </button>
    </aside>
  );
};
