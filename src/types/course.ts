export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  scenario?: string;
  question: string;
  options: QuizOption[];
  frameworkReference: string; // e.g., "Section 8: Protect Student Identities"
}

export interface LessonContentSection {
  title: string;
  content: string[];
  callout?: {
    type: 'warning' | 'tip' | 'principle' | 'norway-context';
    title: string;
    text: string;
  };
  keyTakeaways?: string[];
  frameworkQuote?: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  sectionsCovered: string;
  estimatedMinutes: number;
  iconName: string;
  summary: string;
  contentSections: LessonContentSection[];
  quiz: QuizQuestion[];
}

export interface ChecklistItem {
  id: string;
  category: string; // 'A. Pedagogical readiness', 'B. Privacy and data protection', etc.
  text: string;
  guidance: string;
}

export interface RiskScenario {
  id: string;
  title: string;
  description: string;
  riskLevel: 'Lower' | 'Moderate' | 'Higher' | 'Very High';
  rationale: string;
  requiredAction: string;
}

export interface CourseProgress {
  completedModules: string[];
  quizScores: Record<string, number>; // moduleId -> percentage score (0-100)
  checklistChecked: string[]; // checklist item IDs checked
  pledgeSigned: boolean;
  educatorName: string;
  completionDate?: string;
}
