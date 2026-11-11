import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  CheckSquare, 
  AlertTriangle, 
  PenTool, 
  Award, 
  FileText,
  Trash2,
  Lock,
  ExternalLink,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { CourseProgress } from '../types/course';
import { useAccessibility } from '../context/AccessibilityContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress: CourseProgress;
  totalModules: number;
  onOpenPrivacyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  progress,
  totalModules,
  onOpenPrivacyModal,
}) => {
  const { toggleOpen: toggleA11y } = useAccessibility();
  const completedCount = progress.completedModules.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  const navItems = [
    { id: 'overview', label: 'Course Curriculum', icon: BookOpen },
    { id: 'gate', label: 'Pre-Deployment Gate', icon: CheckSquare, badge: `${progress.checklistChecked.length}/23` },
    { id: 'risk-assessor', label: 'Risk Assessor', icon: AlertTriangle },
    { id: 'pedagogical-test', label: 'Rationale Builder', icon: PenTool },
    { id: 'synthetic-lab', label: 'Synthetic Data Lab', icon: Sparkles },
    { id: 'pdf-hub', label: 'Framework Document', icon: FileText },
    { id: 'sources', label: 'Sources', icon: GraduationCap },
    { id: 'pledge', label: 'Pledge & Certificate', icon: Award, highlight: progressPercent === 100 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 dark:bg-slate-900/95 dark:border-slate-800 transition-colors">
      {/* Top Banner: Privacy Commitment & Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Responsible AI Education
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-400 dark:text-slate-500">•</span>
                <span className="hidden sm:inline-block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Framework Edition 2026
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                The Vibe-Code of Ethics
              </h1>
            </div>
          </div>

          {/* Right Action: Privacy badge, Aa Accessibility, and Progress */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Aa Accessibility Settings Button */}
            <button
              onClick={toggleA11y}
              title="Accessibility Settings (Text Size, Dyslexia Font, High Contrast)"
              aria-label="Open accessibility settings"
              className="flex items-center justify-center w-8 h-8 rounded-lg font-serif font-black text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs"
            >
              Aa
            </button>

            {/* Zero-Data Privacy Button */}
            <button
              onClick={onOpenPrivacyModal}
              title="Click to view our Zero-Data Storage Guarantee"
              className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline font-semibold">Zero Sensitive Data Stored</span>
              <span className="md:hidden font-semibold">Privacy-First</span>
            </button>

            {/* Overall Progress Widget */}
            <div className="hidden lg:flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="text-right">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Progress</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {completedCount} of {totalModules} Modules
                </div>
              </div>
              <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar text-sm" aria-label="Course Sections">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                } ${item.highlight && !isActive ? 'ring-1 ring-amber-400/50 bg-amber-50/50 text-amber-900 dark:bg-amber-950/20 dark:text-amber-300' : ''}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Progress Strip Mobile/Desktop */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1">
        <div 
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-1 transition-all duration-700" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
