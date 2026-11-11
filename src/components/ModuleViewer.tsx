import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { CourseModule, CourseProgress } from '../types/course';
import { QuizView } from './QuizView';

interface ModuleViewerProps {
  module: CourseModule;
  allModules: CourseModule[];
  progress: CourseProgress;
  onBack: () => void;
  onNavigateModule: (moduleId: string) => void;
  onQuizComplete: (moduleId: string, score: number) => void;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  module,
  allModules,
  progress,
  onBack,
  onNavigateModule,
  onQuizComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz'>('lesson');

  const currentIndex = allModules.findIndex(m => m.id === module.id);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  const isCompleted = progress.completedModules.includes(module.id);
  const currentQuizScore = progress.quizScores[module.id];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curriculum</span>
        </button>

        <div className="flex items-center gap-2">
          {prevModule && (
            <button
              onClick={() => {
                onNavigateModule(prevModule.id);
                setActiveTab('lesson');
              }}
              title={`Previous: ${prevModule.title}`}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs font-bold text-slate-500">
            {currentIndex + 1} of {allModules.length}
          </span>
          {nextModule && (
            <button
              onClick={() => {
                onNavigateModule(nextModule.id);
                setActiveTab('lesson');
              }}
              title={`Next: ${nextModule.title}`}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Module Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
              Module {module.number}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {module.estimatedMinutes} min
            </span>
          </div>

          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mastered {currentQuizScore !== undefined ? `(${currentQuizScore}%)` : ''}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {module.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
          {module.subtitle}
        </p>

        <div className="pt-2 text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Bookmark className="w-3.5 h-3.5 text-indigo-500" />
          <span>Covers: {module.sectionsCovered}</span>
        </div>

        {/* Lesson vs Quiz Tabs */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'lesson'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lesson Reading</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Scenario Quiz ({module.quiz.length} Questions)</span>
            {currentQuizScore !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                currentQuizScore >= 80 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' 
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
              }`}>
                {currentQuizScore}%
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'lesson' ? (
        <div className="space-y-6">
          {module.contentSections.map((sec, idx) => (
            <article 
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{sec.title}</span>
              </h2>

              <div className="space-y-3.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Framework Quote */}
              {sec.frameworkQuote && (
                <blockquote className="my-4 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-indigo-500 text-slate-800 dark:text-slate-200 italic text-sm sm:text-base">
                  "{sec.frameworkQuote}"
                  <footer className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 not-italic mt-2">
                    — The Vibe-Code of Ethics Framework
                  </footer>
                </blockquote>
              )}

              {/* Callouts */}
              {sec.callout && (
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  sec.callout.type === 'warning'
                    ? 'bg-rose-50/70 border-rose-200 text-rose-900 dark:bg-rose-950/30 dark:border-rose-900/60 dark:text-rose-200'
                    : sec.callout.type === 'norway-context'
                    ? 'bg-blue-50/70 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-900/60 dark:text-blue-200'
                    : sec.callout.type === 'tip'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900/60 dark:text-amber-200'
                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-900/60 dark:text-emerald-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                    {sec.callout.type === 'warning' && <ShieldAlert className="w-4 h-4 text-rose-600" />}
                    {sec.callout.type === 'norway-context' && <Bookmark className="w-4 h-4 text-blue-600" />}
                    {sec.callout.type === 'tip' && <Lightbulb className="w-4 h-4 text-amber-600" />}
                    {sec.callout.type === 'principle' && <Sparkles className="w-4 h-4 text-emerald-600" />}
                    <span>{sec.callout.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                    {sec.callout.text}
                  </p>
                </div>
              )}

              {/* Key Takeaways */}
              {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key Practical Takeaways
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {sec.keyTakeaways.map((point, kIdx) => (
                      <li key={kIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}

          {/* Action to Jump to Quiz */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-500/10">
            <div>
              <h3 className="font-bold text-lg">Ready to test your understanding?</h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Complete the short classroom scenario quiz ({module.quiz.length} practical dilemmas).
              </p>
            </div>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Start Knowledge Check
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Mode */
        <QuizView
          module={module}
          questions={module.quiz}
          currentScore={currentQuizScore}
          onComplete={(score) => onQuizComplete(module.id, score)}
          onBackToLesson={() => setActiveTab('lesson')}
        />
      )}

      {/* Bottom Paging Footer */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        {prevModule ? (
          <button
            onClick={() => {
              onNavigateModule(prevModule.id);
              setActiveTab('lesson');
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Module {prevModule.number}: {prevModule.title}</span>
          </button>
        ) : <div />}

        {nextModule ? (
          <button
            onClick={() => {
              onNavigateModule(nextModule.id);
              setActiveTab('lesson');
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            <span>Module {nextModule.number}: {nextModule.title}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
