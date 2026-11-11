import React, { useState } from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, Copy, Check, RefreshCw, AlertTriangle, UserCheck } from 'lucide-react';

const FICTIONAL_STUDENT_NAMES = [
  'Rowan Vance', 'Maya Sterling', 'Kai Lindholm', 'Elena Rostova', 
  'Siddharth Patel', 'Amara Diallo', 'Leo Nygård', 'Zara Chen'
];

const FICTIONAL_TOPICS = [
  'Photosynthesis and chlorophyll energy conversion',
  'The impact of the printing press on European literacy',
  'Newton’s third law of motion in water rocket propulsion',
  'Character development and symbolism in Lord of the Flies'
];

export const SyntheticDataLab: React.FC = () => {
  const [topicIndex, setTopicIndex] = useState(0);
  const [datasetCount, setDatasetCount] = useState(4);
  const [copied, setCopied] = useState(false);

  const currentTopic = FICTIONAL_TOPICS[topicIndex];

  // Generate synthetic sample
  const syntheticRecords = FICTIONAL_STUDENT_NAMES.slice(0, datasetCount).map((name, i) => ({
    syntheticId: `SYNTH-EDU-${101 + i}`,
    fictionalName: name,
    sampleDraft: `In this investigation of ${currentTopic.toLowerCase()}, evidence shows that key interactions trigger measurable changes. However, unexpected variables such as temperature fluctuated during trial ${i + 1}.`,
    formativeScore: Math.floor(65 + Math.random() * 30),
    pedagogicalHint: i % 2 === 0 ? 'Provide sentence frames for causal analysis.' : 'Prompt retrieval of vocabulary terms.'
  }));

  const formattedOutput = `// SYNTHETIC TEST DATASET (FICTIONAL SAMPLES FOR AI PROMPTING)
// Framework Compliance: Section 8 (Protect Student Identities)
// ZERO real student data included.

export const MOCK_STUDENT_DATA = ${JSON.stringify(syntheticRecords, null, 2)};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShuffle = () => {
    setTopicIndex((prev) => (prev + 1) % FICTIONAL_TOPICS.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              The Vibe-Code Framework Section 8
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Synthetic Data Studio &amp; Anonymization Lab
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          One of the most frequent privacy breaches occurs during prompt engineering when teachers paste real student essays, IEP notes, or test spreadsheets into AI coding assistants. Section 8 mandates: <strong>Never use real student information during development or testing</strong>.
        </p>
      </div>

      {/* Comparison: Danger vs Ethical Practice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unsafe Practice */}
        <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Hazardous Prompting (Data Leak)</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-rose-200 dark:border-rose-950 font-mono text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
            <span className="text-rose-600 block">// Real student names &amp; sensitive IEP notes pasted:</span>
            <p>"Here is Emma Hansen's actual essay draft from 8B. She has dyslexia and scored 42% on the quiz. Generate a personalized feedback bot for her..."</p>
          </div>

          <p className="text-rose-800 dark:text-rose-200 text-xs">
            <strong>The Violation:</strong> Exposes identifiable minors, sensitive special education classifications, and school assessment records to external commercial AI loggers.
          </p>
        </div>

        {/* Responsible Practice */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Ethical Vibe Coding (Synthetic Prompts)</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-200 dark:border-emerald-950 font-mono text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
            <span className="text-emerald-600 block">// Fictional persona with synthetic text:</span>
            <p>"I am developing a feedback component for 8th-grade science essays. Use this fictional test submission: 'Student Alpha explores photosynthesis...' Provide scaffolded hints without storing PII."</p>
          </div>

          <p className="text-emerald-800 dark:text-emerald-200 text-xs">
            <strong>The Safeguard:</strong> Zero real children affected, zero GDPR liability, zero PII transmitted to external model training pipelines.
          </p>
        </div>
      </div>

      {/* Interactive Synthetic Generator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Generate Synthetic Classroom Test Records
            </h3>
            <p className="text-xs text-slate-500">
              Need sample data to test your application? Copy these sanitized fictional records instead of real student spreadsheets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Shuffle Topic</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Test Data'}</span>
            </button>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="relative rounded-2xl bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800">
          <pre>{formattedOutput}</pre>
        </div>
      </div>
    </div>
  );
};
