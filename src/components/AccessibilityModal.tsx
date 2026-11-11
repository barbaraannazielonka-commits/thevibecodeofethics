import React, { useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  Type, 
  Eye, 
  Sparkles, 
  Check, 
  Sliders, 
  MoveHorizontal,
  Sun,
  Moon,
  Bookmark,
  CheckCircle2,
  Smile
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { TextSize, ContrastMode, LineSpacing } from '../types/accessibility';

export const AccessibilityModal: React.FC = () => {
  const { settings, updateSetting, resetSettings, isOpen, setIsOpen } = useAccessibility();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const textSizeOptions: { value: TextSize; label: string; scale: string }[] = [
    { value: 'normal', label: '100%', scale: 'Normal' },
    { value: 'medium', label: '112%', scale: 'Medium' },
    { value: 'large', label: '125%', scale: 'Large' },
    { value: 'xlarge', label: '140%', scale: 'Extra Large' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-title"
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              Aa
            </div>
            <div>
              <h2 id="a11y-title" className="font-bold text-slate-900 dark:text-white text-base">
                Accessibility Settings
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Framework Section 11: Universal Design for All Learners
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close accessibility settings"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
          {/* 1. Text Size Scaling */}
          <div className="space-y-2.5">
            <label className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-600" />
              <span>Text Size Scaling</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {textSizeOptions.map((opt) => {
                const isSelected = settings.textSize === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => updateSetting('textSize', opt.value)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-semibold">{opt.scale}</div>
                    <div className="text-[10px] opacity-80">{opt.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Dyslexia-Friendly Typography */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-amber-500" />
                <span>Dyslexia-Friendly Font</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Switches to heavy-bottomed, high-differentiation letterforms with increased spacing.
              </p>
            </div>

            <button
              onClick={() => updateSetting('dyslexicFont', !settings.dyslexicFont)}
              role="switch"
              aria-checked={settings.dyslexicFont}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.dyslexicFont ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  settings.dyslexicFont ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 3. Contrast & Theme Mode */}
          <div className="space-y-2.5">
            <label className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>High Contrast Mode (WCAG AAA)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => updateSetting('contrastMode', 'default')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  settings.contrastMode === 'default'
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                Standard
              </button>

              <button
                onClick={() => updateSetting('contrastMode', 'high-contrast-light')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  settings.contrastMode === 'high-contrast-light'
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                High Light
              </button>

              <button
                onClick={() => updateSetting('contrastMode', 'high-contrast-dark')}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  settings.contrastMode === 'high-contrast-dark'
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                High Dark
              </button>
            </div>
          </div>

          {/* 4. Relaxed Line Spacing */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <MoveHorizontal className="w-4 h-4 text-purple-600" />
                <span>Relaxed Line &amp; Word Spacing</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Expands line heights to 1.8 and word spacing for improved visual tracking.
              </p>
            </div>

            <button
              onClick={() => updateSetting('lineSpacing', settings.lineSpacing === 'relaxed' ? 'normal' : 'relaxed')}
              role="switch"
              aria-checked={settings.lineSpacing === 'relaxed'}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.lineSpacing === 'relaxed' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  settings.lineSpacing === 'relaxed' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 5. Reading Guide / Line Ruler */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-yellow-500" />
                <span>Reading Focus Guide (Ruler)</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                A subtle highlighted ruler that tracks your cursor to isolate individual lines.
              </p>
            </div>

            <button
              onClick={() => updateSetting('readingGuide', !settings.readingGuide)}
              role="switch"
              aria-checked={settings.readingGuide}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.readingGuide ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  settings.readingGuide ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 6. Reduced Motion */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-500" />
                <span>Reduce Motion &amp; Animations</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Disables confetti, transitions, and motion for vestibular sensitivity.
              </p>
            </div>

            <button
              onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
              role="switch"
              aria-checked={settings.reducedMotion}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.reducedMotion ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  settings.reducedMotion ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 7. Highlight Interactive Links */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Highlight All Links &amp; Buttons</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Adds high-contrast underlines and outlines to all actionable elements.
              </p>
            </div>

            <button
              onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)}
              role="switch"
              aria-checked={settings.highlightLinks}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.highlightLinks ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  settings.highlightLinks ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex items-center justify-between">
          <button
            onClick={resetSettings}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
