import React, { useState } from 'react';
import { Compass, CheckCircle2, Copy, Check, Lightbulb, AlertCircle, BookOpen, RefreshCw } from 'lucide-react';

const PRESET_EXAMPLES = [
  {
    title: 'Fractions Concept Visualizer (Math 5th Grade)',
    target: '5th grade students who struggle to conceptualize equivalent fractions and mixed numbers',
    mechanism: 'interactive dynamic fraction bar manipulation with instant visual feedback and step-by-step hints',
    objective: 'Norway LK20 Math Competency: represent and compare fractions using visual and numerical models'
  },
  {
    title: 'Science Hypothesis Lab (Science 8th Grade)',
    target: 'middle school students who confuse correlation with causation in experimental design',
    mechanism: 'an interactive variable control sandbox allowing one-factor-at-a-time testing with guided metacognitive reflections',
    objective: 'Curriculum standard: formulate testable hypotheses and evaluate empirical evidence'
  },
  {
    title: 'Multilingual Essay Vocabulary Companion (Language Arts)',
    target: 'newcomer multilingual students who have rich ideas but lack academic transition vocabulary',
    mechanism: 'context-aware vocabulary scaffolds and sentence frames with native language tooltips without automated essay rewriting',
    objective: 'LK20 English standard: express complex arguments using academic register while preserving student voice'
  }
];

export const PedagogicalTestTool: React.FC = () => {
  const [targetStudents, setTargetStudents] = useState('');
  const [mechanism, setMechanism] = useState('');
  const [objective, setObjective] = useState('');
  const [copied, setCopied] = useState(false);

  // Self-check criteria
  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);

  const isFormComplete = targetStudents.trim() && mechanism.trim() && objective.trim();

  const fullSentence = `I am building this tool because it will help students ${targetStudents || '[target group / specific struggle]'} by providing ${mechanism || '[instructional mechanism]'}, which supports the learning objective ${objective || '[curriculum objective]'}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyPreset = (p: typeof PRESET_EXAMPLES[0]) => {
    setTargetStudents(p.target);
    setMechanism(p.mechanism);
    setObjective(p.objective);
    setQ1(true);
    setQ2(true);
    setQ3(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Tool Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              The Vibe-Code Framework Section 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The Mandatory Pedagogical Test Builder
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Before opening an AI coding assistant, every educator must articulate why the software needs to exist. If you cannot complete this sentence clearly and defend each feature pedagogically, <strong>pause the project before writing code</strong>.
        </p>
      </div>

      {/* Preset Inspiration Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          Load Real Classroom Rationale Examples:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => handleApplyPreset(ex)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {ex.title}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sentence Builder Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Draft Your Pedagogical Rationale
        </h3>

        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              1. Who are you helping, and what specific learning struggle does this address?
            </label>
            <input
              type="text"
              value={targetStudents}
              onChange={(e) => setTargetStudents(e.target.value)}
              placeholder="e.g. 7th-grade students who struggle to visualize cell mitosis stages..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              2. By providing what specific pedagogical mechanism or scaffolding?
            </label>
            <input
              type="text"
              value={mechanism}
              onChange={(e) => setMechanism(e.target.value)}
              placeholder="e.g. an interactive 3D slider with retrieval quiz checks and targeted hints..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              3. Which curriculum standard or learning objective does this directly support?
            </label>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="e.g. Science curriculum objective: describe cell division and hereditary replication..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Live Formatted Output Card */}
        <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Your Formulated Pedagogical Test Sentence
            </span>
            <button
              onClick={handleCopy}
              disabled={!isFormComplete}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isFormComplete
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                  : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Sentence'}</span>
            </button>
          </div>

          <p className="text-sm sm:text-base font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
            "{fullSentence}"
          </p>
        </div>

        {/* Three Critical Gatekeeper Inquiries */}
        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Critical Reflection Gatekeepers
          </h4>

          <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer text-xs sm:text-sm">
            <input
              type="checkbox"
              checked={q1}
              onChange={(e) => setQ1(e.target.checked)}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-700 dark:text-slate-300">
              <strong>Is technology truly necessary?</strong> A teacher-led discussion, printed card-sort, or physical lab cannot achieve this same objective more effectively or cheaply.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer text-xs sm:text-sm">
            <input
              type="checkbox"
              checked={q2}
              onChange={(e) => setQ2(e.target.checked)}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-700 dark:text-slate-300">
              <strong>Low extraneous cognitive load:</strong> I will deliberately avoid decorative gamification, flashing bells, or competitive public rankings that distract from deep processing.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer text-xs sm:text-sm">
            <input
              type="checkbox"
              checked={q3}
              onChange={(e) => setQ3(e.target.checked)}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-700 dark:text-slate-300">
              <strong>Preserves student agency:</strong> The tool will not write answers or solve problems FOR the learner; it promotes active inquiry and productive struggle.
            </span>
          </label>
        </div>

        {/* Readiness Verdict */}
        {isFormComplete && q1 && q2 && q3 ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong>Pedagogical Readiness Cleared!</strong> You have formulated a defensible instructional rationale. You are ready to explore technical architecture with ethical guardrails.
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              Complete the three prompt fields and verify all three reflection checkboxes to certify pedagogical readiness.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
