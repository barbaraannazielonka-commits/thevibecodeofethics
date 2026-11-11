export type TextSize = 'normal' | 'medium' | 'large' | 'xlarge';
export type ContrastMode = 'default' | 'high-contrast-light' | 'high-contrast-dark';
export type LineSpacing = 'normal' | 'relaxed';

export interface AccessibilitySettings {
  textSize: TextSize;
  dyslexicFont: boolean;
  contrastMode: ContrastMode;
  lineSpacing: LineSpacing;
  reducedMotion: boolean;
  readingGuide: boolean;
  highlightLinks: boolean;
}

export const DEFAULT_A11Y_SETTINGS: AccessibilitySettings = {
  textSize: 'normal',
  dyslexicFont: false,
  contrastMode: 'default',
  lineSpacing: 'normal',
  reducedMotion: false,
  readingGuide: false,
  highlightLinks: false,
};
