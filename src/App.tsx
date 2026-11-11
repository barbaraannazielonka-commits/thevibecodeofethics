/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CourseOverview } from './components/CourseOverview';
import { ModuleViewer } from './components/ModuleViewer';
import { PreDeploymentGate } from './components/PreDeploymentGate';
import { RiskCalculatorTool } from './components/RiskCalculatorTool';
import { PedagogicalTestTool } from './components/PedagogicalTestTool';
import { SyntheticDataLab } from './components/SyntheticDataLab';
import { FrameworkPdfViewer } from './components/FrameworkPdfViewer';
import { PledgeAndCertificate } from './components/PledgeAndCertificate';
import { SourcesView } from './components/SourcesView';
import { PrivacyModal } from './components/PrivacyModal';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AccessibilityModal } from './components/AccessibilityModal';
import { AccessibilityTrigger } from './components/AccessibilityTrigger';

import { COURSE_MODULES } from './data/modulesData';
import { CourseProgress } from './types/course';
import { 
  getStoredProgress, 
  saveProgress, 
  clearAllLocalProgress,
  DEFAULT_PROGRESS 
} from './utils/storage';
import { ShieldCheck, HeartHandshake, FileText, Lock, GraduationCap } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<CourseProgress>(DEFAULT_PROGRESS);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  // Initialize progress from localStorage client-side
  useEffect(() => {
    const loaded = getStoredProgress();
    setProgress(loaded);
  }, []);

  const handleSelectModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setActiveTab('module-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (moduleId: string, score: number) => {
    setProgress(prev => {
      const updatedScores = { ...prev.quizScores, [moduleId]: score };
      const updatedCompleted = score >= 80 && !prev.completedModules.includes(moduleId)
        ? [...prev.completedModules, moduleId]
        : prev.completedModules;

      const nextState: CourseProgress = {
        ...prev,
        quizScores: updatedScores,
        completedModules: updatedCompleted,
      };
      saveProgress(nextState);
      return nextState;
    });
  };

  const handleToggleChecklist = (id: string) => {
    setProgress(prev => {
      const isChecked = prev.checklistChecked.includes(id);
      const nextChecks = isChecked
        ? prev.checklistChecked.filter(item => item !== id)
        : [...prev.checklistChecked, id];

      const nextState: CourseProgress = {
        ...prev,
        checklistChecked: nextChecks,
      };
      saveProgress(nextState);
      return nextState;
    });
  };

  const handleClearChecklist = () => {
    setProgress(prev => {
      const nextState: CourseProgress = {
        ...prev,
        checklistChecked: [],
      };
      saveProgress(nextState);
      return nextState;
    });
  };

  const handleSignPledge = (name: string) => {
    setProgress(prev => {
      const nextState: CourseProgress = {
        ...prev,
        pledgeSigned: true,
        educatorName: name,
        completionDate: new Date().toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
      saveProgress(nextState);
      return nextState;
    });
  };

  const handleResetAllData = () => {
    clearAllLocalProgress();
    setProgress(DEFAULT_PROGRESS);
    setActiveTab('overview');
    setSelectedModuleId(null);
  };

  const currentModule = COURSE_MODULES.find(m => m.id === selectedModuleId);

  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-blue-500/20">
        {/* Sticky Top Header */}
        <Header
          activeTab={activeTab === 'module-view' ? 'overview' : activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'module-view') {
              setSelectedModuleId(null);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          progress={progress}
          totalModules={COURSE_MODULES.length}
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        />

        {/* Main App Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {activeTab === 'overview' && (
            <CourseOverview
              modules={COURSE_MODULES}
              progress={progress}
              onSelectModule={handleSelectModule}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'module-view' && currentModule && (
            <ModuleViewer
              module={currentModule}
              allModules={COURSE_MODULES}
              progress={progress}
              onBack={() => {
                setActiveTab('overview');
                setSelectedModuleId(null);
              }}
              onNavigateModule={(newId) => {
                setSelectedModuleId(newId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuizComplete={handleQuizComplete}
            />
          )}

          {activeTab === 'gate' && (
            <PreDeploymentGate
              checkedIds={progress.checklistChecked}
              onToggleCheck={handleToggleChecklist}
              onClearAll={handleClearChecklist}
            />
          )}

          {activeTab === 'risk-assessor' && (
            <RiskCalculatorTool />
          )}

          {activeTab === 'pedagogical-test' && (
            <PedagogicalTestTool />
          )}

          {activeTab === 'synthetic-lab' && (
            <SyntheticDataLab />
          )}

          {activeTab === 'pdf-hub' && (
            <FrameworkPdfViewer />
          )}

          {activeTab === 'sources' && (
            <SourcesView />
          )}

          {activeTab === 'pledge' && (
            <PledgeAndCertificate
              progress={progress}
              onSignPledge={handleSignPledge}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>The Vibe-Code of Ethics: A Responsible Creation Framework for Educators</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setActiveTab('sources');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                <span>Sources</span>
              </button>

              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero-Data Guarantee</span>
              </button>

              <a
                href={`${import.meta.env.BASE_URL}assets/aistudio/THE_VIBE-CODE_OF_ETHICS__1__302ae484.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                <span>Framework PDF</span>
              </a>
            </div>
          </div>
        </footer>

        {/* Privacy & Zero-Data Modal */}
        <PrivacyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
          progress={progress}
          onResetData={handleResetAllData}
        />

        {/* Corner Floating Aa Accessibility Trigger */}
        <AccessibilityTrigger />

        {/* Interactive Accessibility Settings Panel */}
        <AccessibilityModal />
      </div>
    </AccessibilityProvider>
  );
}
