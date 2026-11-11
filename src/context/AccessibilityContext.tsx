import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings, DEFAULT_A11Y_SETTINGS } from '../types/accessibility';

const A11Y_STORAGE_KEY = 'vibe_ethics_a11y_v1';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  resetSettings: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_A11Y_SETTINGS;
    try {
      const stored = localStorage.getItem(A11Y_STORAGE_KEY);
      return stored ? { ...DEFAULT_A11Y_SETTINGS, ...JSON.parse(stored) } : DEFAULT_A11Y_SETTINGS;
    } catch {
      return DEFAULT_A11Y_SETTINGS;
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [mouseY, setMouseY] = useState<number>(0);

  // Apply settings to DOM
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not save a11y preferences', e);
    }

    const root = document.documentElement;

    // 1. Font Size Scaling
    switch (settings.textSize) {
      case 'medium':
        root.style.fontSize = '18px';
        break;
      case 'large':
        root.style.fontSize = '20px';
        break;
      case 'xlarge':
        root.style.fontSize = '22px';
        break;
      default:
        root.style.fontSize = '16px';
        break;
    }

    // 2. Dyslexia-Friendly Font
    if (settings.dyslexicFont) {
      root.setAttribute('data-dyslexic-font', 'true');
    } else {
      root.removeAttribute('data-dyslexic-font');
    }

    // 3. Contrast Mode
    if (settings.contrastMode === 'high-contrast-dark') {
      root.setAttribute('data-high-contrast', 'dark');
      root.classList.add('dark');
    } else if (settings.contrastMode === 'high-contrast-light') {
      root.setAttribute('data-high-contrast', 'light');
      root.classList.remove('dark');
    } else {
      root.removeAttribute('data-high-contrast');
    }

    // 4. Line Spacing
    if (settings.lineSpacing === 'relaxed') {
      root.setAttribute('data-relaxed-spacing', 'true');
    } else {
      root.removeAttribute('data-relaxed-spacing');
    }

    // 5. Reduced Motion
    if (settings.reducedMotion) {
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.removeAttribute('data-reduced-motion');
    }

    // 6. Highlight Links
    if (settings.highlightLinks) {
      root.setAttribute('data-highlight-links', 'true');
    } else {
      root.removeAttribute('data-highlight-links');
    }
  }, [settings]);

  // Track mouse for reading guide
  useEffect(() => {
    if (!settings.readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingGuide]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_A11Y_SETTINGS);
  };

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        isOpen,
        setIsOpen,
        toggleOpen,
      }}
    >
      {children}

      {/* Reading Guide Ruler Overlay */}
      {settings.readingGuide && (
        <div
          aria-hidden="true"
          style={{ top: `${mouseY}px` }}
          className="pointer-events-none fixed left-0 right-0 h-10 -translate-y-1/2 bg-yellow-400/20 border-y-2 border-yellow-500/60 z-50 transition-all duration-75 shadow-sm"
        />
      )}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
