import React, { useState } from 'react';
import { 
  CheckSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Square, 
  Copy, 
  Check, 
  Filter, 
  Sparkles,
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { PRE_DEPLOYMENT_CHECKLIST, CHECKLIST_CATEGORIES } from '../data/checklistData';

interface PreDeploymentGateProps {
  checkedIds: string[];
  onToggleCheck: (id: string) => void;
  onClearAll: () => void;
}

export const PreDeploymentGate: React.FC<PreDeploymentGateProps> = ({
  checkedIds,
  onToggleCheck,
  onClearAll,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  const totalItems = PRE_DEPLOYMENT_CHECKLIST.length;
  const clearedCount = checkedIds.length;
  const clearancePercent = Math.round((clearedCount / totalItems) * 100);

  const filteredItems = selectedCategory === 'All'
    ? PRE_DEPLOYMENT_CHECKLIST
    : PRE_DEPLOYMENT_CHECKLIST.filter(item => item.category === selectedCategory);

  const handleCopyAudit = () => {
    const text = `THE RESPONSIBLE VIBE-CODING GATE AUDIT REPORT
Date: ${new Date().toLocaleDateString()}
Gate Readiness Score: ${clearedCount}/${totalItems} (${clearancePercent}%)

Cleared Items:
${PRE_DEPLOYMENT_CHECKLIST.map(item => {
  const isDone = checkedIds.includes(item.id);
  return `[${isDone ? 'X' : ' '}] ${item.category} - ${item.text}`;
}).join('\n')}

Framework Reference: The Vibe-Code of Ethics Section 23`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAudit = () => {
    const text = `THE RESPONSIBLE VIBE-CODING GATE AUDIT REPORT
Date: ${new Date().toLocaleDateString()}
Gate Readiness Score: ${clearedCount}/${totalItems} (${clearancePercent}%)

============================================================
CHECKLIST STATUS:
============================================================
${PRE_DEPLOYMENT_CHECKLIST.map(item => {
  const isDone = checkedIds.includes(item.id);
  return `[${isDone ? 'X' : ' '}] ${item.category}\n    Requirement: ${item.text}\n    Guidance: ${item.guidance}\n`;
}).join('\n')}

Framework Reference: The Vibe-Code of Ethics Section 23
A Responsible Creation Framework for Educators Building AI-Powered Educational Tools
`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vibe-Code-PreDeployment-Gate-Audit-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                The Vibe-Code Framework Section 23
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                The Responsible Vibe-Coding Gate
              </h2>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-200 dark:sm:border-slate-700 sm:pl-6">
            <div className="text-xs text-slate-400">Gate Clearance</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {clearedCount} <span className="text-sm font-normal text-slate-400">/ {totalItems}</span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Before allowing students to use any tool you have vibe-coded, work through this 23-point safety checklist. It is a practical development aid designed to ensure no technical, pedagogical, or privacy risks were overlooked during rapid AI generation.
        </p>

        {/* Clearance Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-600 dark:text-slate-400">Readiness Score</span>
            <span className="text-emerald-600 dark:text-emerald-400">{clearancePercent}% Certified</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${clearancePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white dark:bg-blue-600'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            All Categories ({totalItems})
          </button>
          {CHECKLIST_CATEGORIES.map((cat) => {
            const shortName = cat.split('.')[1]?.trim() || cat;
            const categoryTotal = PRE_DEPLOYMENT_CHECKLIST.filter(i => i.category === cat).length;
            const categoryChecked = PRE_DEPLOYMENT_CHECKLIST.filter(i => i.category === cat && checkedIds.includes(i.id)).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-blue-600'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{shortName}</span>
                <span className={`text-[10px] px-1 rounded-full ${
                  categoryChecked === categoryTotal 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                }`}>
                  {categoryChecked}/{categoryTotal}
                </span>
              </button>
            );
          })}
        </div>

        {/* Copy / Reset Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyAudit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Export Audit'}</span>
          </button>

          {clearedCount > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors px-2 py-1"
            >
              Reset Checks
            </button>
          )}
        </div>
      </div>

      {/* Checklist Items Container */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => onToggleCheck(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isChecked
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-100'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 shadow-2xs'
              }`}
            >
              <div className="pt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                )}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.category}
                  </span>
                </div>
                <div className={`font-semibold text-xs sm:text-sm ${isChecked ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                  {item.text}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.guidance}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Clearance Banner */}
      {clearancePercent === 100 && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg space-y-2 text-center">
          <Sparkles className="w-8 h-8 mx-auto" />
          <h3 className="text-xl font-bold">All 23 Gatekeeper Checks Verified!</h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto">
            You have verified pedagogical alignment, data minimisation, secure credentials, universal accessibility, and administrative authorization.
          </p>
        </div>
      )}
    </div>
  );
};
