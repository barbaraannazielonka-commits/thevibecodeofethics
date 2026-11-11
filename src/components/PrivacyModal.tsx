import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertOctagon, Trash2, X, HardDrive } from 'lucide-react';
import { CourseProgress } from '../types/course';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: CourseProgress;
  onResetData: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  progress,
  onResetData,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const currentPayloadSize = JSON.stringify(progress).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="font-bold text-slate-900 dark:text-white text-base">
                Zero-Data Storage Guarantee
              </h2>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                Practicing The Vibe-Code Principle #5 &amp; #6
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <p className="leading-relaxed">
            As an educator learning about ethical tool creation, you should know exactly what happens to your data when you use this course. We practice the exact principles taught in the curriculum:
          </p>

          <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>
                <strong>No accounts or logins:</strong> You never have to submit an email address, password, or student identifiers.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>
                <strong>100% Client-Side Memory:</strong> Quiz responses, checklist marks, and module completion are stored exclusively on your device in your browser's <code className="px-1 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 rounded">localStorage</code>.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>
                <strong>Zero External Telemetry:</strong> No analytics trackers, no third-party marketing pixels, and no remote databases collecting your learning patterns.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>
                <strong>GDPR &amp; Udir Compliant:</strong> Fully aligns with Norwegian Directorate for Education and Training (Utdanningsdirektoratet) and Datatilsynet guidelines on educational privacy.
              </span>
            </div>
          </div>

          {/* Current Local Footprint */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs">
            <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200">
              <HardDrive className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Current browser local storage payload:</span>
            </div>
            <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300">
              {currentPayloadSize} bytes (0.00 MB)
            </span>
          </div>

          {/* Wipe Data Option */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 py-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset all local course progress &amp; clear browser storage</span>
              </button>
            ) : (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-2">
                <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
                  Are you sure? This will reset all your quiz scores and checklist ticks back to zero.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onResetData();
                      setConfirmReset(false);
                      onClose();
                    }}
                    className="px-3 py-1 bg-rose-600 text-white rounded text-xs font-bold hover:bg-rose-700 transition-colors"
                  >
                    Yes, wipe all local data
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-3 py-1 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded text-xs font-semibold hover:bg-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
