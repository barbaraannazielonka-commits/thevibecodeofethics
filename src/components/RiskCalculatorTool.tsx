import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, Info, ArrowDownRight, Layers, FileWarning } from 'lucide-react';
import { RISK_TIERS, RISK_FACTORS, RiskFactor } from '../data/riskData';

export const RiskCalculatorTool: React.FC = () => {
  const [selectedFactorIds, setSelectedFactorIds] = useState<string[]>(['f_local_only']);

  const toggleFactor = (id: string) => {
    setSelectedFactorIds(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Determine overall risk
  const selectedFactors = RISK_FACTORS.filter(f => selectedFactorIds.includes(f.id));
  
  let computedTier: 'Lower' | 'Moderate' | 'Higher' | 'Very High' = 'Lower';

  if (selectedFactors.some(f => f.riskContribution === 'Very High')) {
    computedTier = 'Very High';
  } else if (selectedFactors.some(f => f.riskContribution === 'Higher')) {
    computedTier = 'Higher';
  } else if (selectedFactors.some(f => f.riskContribution === 'Moderate')) {
    computedTier = 'Moderate';
  } else {
    computedTier = 'Lower';
  }

  const tierInfo = RISK_TIERS[computedTier];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              The Vibe-Code Framework Section 24
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Practical Risk Classification Assessor
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Not all educational tools require the same level of review. Select the technical and pedagogical characteristics of your planned tool below to calculate its practical risk tier and uncover the required governance actions.
        </p>
      </div>

      {/* Interactive Factor Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Select Your Tool's Technical Capabilities &amp; Data Flows
          </h3>

          <div className="space-y-2.5">
            {RISK_FACTORS.map((factor) => {
              const isChecked = selectedFactorIds.includes(factor.id);
              return (
                <div
                  key={factor.id}
                  onClick={() => toggleFactor(factor.id)}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-950 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // handled by parent div click
                    className="mt-1 rounded text-blue-600 focus:ring-blue-500 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="font-semibold">{factor.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {factor.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Risk Assessment Result Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Calculated Classification
            </span>

            <div className={`p-4 rounded-2xl border ${tierInfo.badgeBg} flex items-center justify-between`}>
              <div>
                <span className="text-xs font-bold uppercase block opacity-80">Assessed Risk Tier</span>
                <span className="text-2xl font-black">{tierInfo.level} Risk</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-black/20 flex items-center justify-center font-bold">
                {tierInfo.level === 'Lower' && '🟢'}
                {tierInfo.level === 'Moderate' && '🟡'}
                {tierInfo.level === 'Higher' && '🟠'}
                {tierInfo.level === 'Very High' && '🔴'}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Recommended Framework Approach
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {tierInfo.recommendedApproach}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Required Governance Steps
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {tierInfo.governanceRequirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Tip to De-risk */}
            {computedTier !== 'Lower' && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block flex items-center gap-1">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  How to downgrade your risk tier:
                </span>
                <p>
                  Switch from cloud databases and user accounts to client-side storage (localStorage) or remove AI chatbots in favor of pre-verified interactive drills.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
