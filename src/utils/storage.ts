import { CourseProgress } from '../types/course';

const STORAGE_KEY = 'vibe_ethics_course_state_v1';

export const DEFAULT_PROGRESS: CourseProgress = {
  completedModules: [],
  quizScores: {},
  checklistChecked: [],
  pledgeSigned: false,
  educatorName: '',
  completionDate: undefined,
};

export const getStoredProgress = (): CourseProgress => {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
    };
  } catch (e) {
    console.warn('Could not read local progress from localStorage', e);
    return DEFAULT_PROGRESS;
  }
};

export const saveProgress = (progress: CourseProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Could not save local progress to localStorage', e);
  }
};

export const clearAllLocalProgress = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear local progress', e);
  }
};
