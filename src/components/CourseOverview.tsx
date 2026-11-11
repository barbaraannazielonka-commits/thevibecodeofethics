import React from 'react';
import { 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Code, 
  HeartHandshake, 
  FileCheck, 
  Activity, 
  Award,
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle,
  Lightbulb,
  Lock,
  Layers,
  ChevronRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { CourseModule, CourseProgress } from '../types/course';

interface CourseOverviewProps {
  modules: CourseModule[];
  progress: CourseProgress;
  onSelectModule: (moduleId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  modules,
  progress,
  onSelectModule,
  onNavigateTab,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'Compass': return Compass;
      case 'ShieldCheck': return ShieldCheck;
      case 'Code': return Code;
      case 'HeartHandshake': return HeartHandshake;
      case 'FileCheck': return FileCheck;
      case 'Activity': return Activity;
      case 'Award': return Award;
      default: return BookOpen;
    }
  };

  const completedCount = progress.completedModules.length;
  const passedQuizzes = Object.values(progress.quizScores).filter(s => s >= 80).length;
  const checklistCount = progress.checklistChecked.length;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-10 shadow-xl border border-indigo-900/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Professional Development for Global Educators</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Vibe Coding with Ethics: A Responsible Creation Course
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Artificial intelligence has changed who can build software. With AI coding assistants, educators can now craft custom websites, learning games, and simulations in hours. But with that power comes a profound shift: <strong>from software consumer to technology creator</strong>.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xs text-slate-400">Modules Completed</div>
              <div className="text-xl font-bold text-white mt-0.5">
                {completedCount} <span className="text-xs font-normal text-slate-400">/ {modules.length}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xs text-slate-400">Quizzes Mastered</div>
              <div className="text-xl font-bold text-emerald-400 mt-0.5">
                {passedQuizzes} <span className="text-xs font-normal text-slate-400">/ {modules.length}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xs text-slate-400">The Gate Verified</div>
              <div className="text-xl font-bold text-blue-400 mt-0.5">
                {checklistCount} <span className="text-xs font-normal text-slate-400">/ 23 Items</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xs text-slate-400">Ethical Pledge</div>
              <div className="text-xl font-bold text-amber-400 mt-0.5">
                {progress.pledgeSigned ? 'Signed' : 'Pending'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Paradoxes Banner */}
      <section className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700/80">
        <div className="flex items-center gap-2.5 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            The 4 Foundational Paradoxes of Vibe Coding in Education
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
          Before prompting an AI to generate classroom code, keep these core tenets from the framework front and center:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="font-semibold text-rose-600 dark:text-rose-400 block mb-1">1. Working ≠ Safe</span>
            <p className="text-slate-600 dark:text-slate-400 leading-snug">
              A tool that compiles and runs is not necessarily a tool that protects student privacy or prevents injection attacks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="font-semibold text-amber-600 dark:text-amber-400 block mb-1">2. Engaging ≠ Learning</span>
            <p className="text-slate-600 dark:text-slate-400 leading-snug">
              Flashy animations, sounds, and novelty gamification often distract students and overload working memory.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1">3. Free ≠ Private</span>
            <p className="text-slate-600 dark:text-slate-400 leading-snug">
              "No login" and free hosting tiers do not mean no data collection. Always trace external cloud APIs and scripts.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">4. AI-Powered ≠ Fair</span>
            <p className="text-slate-600 dark:text-slate-400 leading-snug">
              Language models hallucinate, misinterpret questions, and reproduce cultural biases. Human teachers must stay in control.
            </p>
          </div>
        </div>
      </section>

      {/* Module Curriculum List */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Course Modules &amp; Quizzes
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Work through each module, review the ethical lessons, and complete the scenario quizzes.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            Estimated Total: ~2 hours (self-paced)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module) => {
            const Icon = getIcon(module.iconName);
            const isCompleted = progress.completedModules.includes(module.id);
            const score = progress.quizScores[module.id];
            const hasQuizTaken = score !== undefined;

            return (
              <div
                key={module.id}
                className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-800/80 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            MODULE {module.number}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {module.estimatedMinutes} min
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          {module.title}
                        </h4>
                      </div>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 shrink-0">
                        Ready
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    {module.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {module.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {hasQuizTaken ? (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Quiz Score: {score}%
                      </span>
                    ) : (
                      <span>{module.quiz.length} Quiz Scenarios</span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectModule(module.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20'
                    }`}
                  >
                    <span>{isCompleted ? 'Review Lesson' : 'Start Module'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Tools Quick Launch */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Interactive Educator Tools</span>
          </h3>
          <span className="text-xs text-slate-500">Framework Utilities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateTab('pedagogical-test')}
            className="group text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                The Pedagogical Test
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Test your educational justification before prompting any code: "I am building this because..."
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>Open Builder</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('gate')}
            className="group text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                The Pre-Deployment Gate
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Work through the 23-point checklist covering pedagogy, privacy, security, and accessibility.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>{checklistCount} / 23 Checked</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('risk-assessor')}
            className="group text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Risk Classification Assessor
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Determine whether your project is Lower, Moderate, Higher, or Very High Risk and review requirements.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>Assess Project</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('synthetic-lab')}
            className="group text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Synthetic Data Lab
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate fictional testing datasets to safely prompt without exposing student records.
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>Launch Lab</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('sources')}
            className="group text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between sm:col-span-2 lg:col-span-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Sources &amp; Legal Frameworks Reference Library
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Authoritative citations for all statutory guidelines, security standards, and research.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                <span>View Sources</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
