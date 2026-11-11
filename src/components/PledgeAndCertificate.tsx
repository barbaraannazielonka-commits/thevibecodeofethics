import React, { useState, useRef } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  PenTool, 
  FileText,
  Image as ImageIcon,
  Loader2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ETHICAL_PLEDGE_COMMITMENTS } from '../data/pledgeData';
import { CourseProgress } from '../types/course';
import { 
  downloadCertificateAsPdf, 
  downloadCertificateAsPng 
} from '../utils/certificateGenerator';

interface PledgeAndCertificateProps {
  progress: CourseProgress;
  onSignPledge: (name: string) => void;
}

export const PledgeAndCertificate: React.FC<PledgeAndCertificateProps> = ({
  progress,
  onSignPledge,
}) => {
  const [educatorName, setEducatorName] = useState(progress.educatorName || '');
  const [schoolName, setSchoolName] = useState('');
  const [reviewedAll, setReviewedAll] = useState(false);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const certificateRef = useRef<HTMLDivElement>(null);

  const isPledgeSigned = progress.pledgeSigned;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!educatorName.trim()) return;

    onSignPledge(educatorName.trim());

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {
      // ignore
    }
  };

  const getCertificatePayload = () => ({
    educatorName: progress.educatorName || educatorName || 'Educator-Creator',
    schoolName: schoolName.trim() || undefined,
    dateStr: progress.completionDate || new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  });

  const handleDownloadPdf = () => {
    try {
      setIsGeneratingPdf(true);
      setNoticeMessage(null);

      downloadCertificateAsPdf(getCertificatePayload());

      setNoticeMessage('Official PDF Certificate downloaded successfully!');
      setTimeout(() => setNoticeMessage(null), 4000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setNoticeMessage('Could not create PDF directly. Please try the PNG download.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadImage = () => {
    try {
      setIsGeneratingImage(true);
      setNoticeMessage(null);

      downloadCertificateAsPng(getCertificatePayload());

      setNoticeMessage('High-resolution PNG Certificate downloaded successfully!');
      setTimeout(() => setNoticeMessage(null), 4000);
    } catch (err) {
      console.error('Error downloading PNG:', err);
      setNoticeMessage('Failed to download certificate image.');
    } finally {
      setIsGeneratingImage(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              The Vibe-Code Framework Section 25
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The Ethical Vibe-Coding Promise &amp; Certificate
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          As educators who harness AI to create digital tools, we recognize that technology grants us unprecedented opportunities—and equally unprecedented responsibilities. Review our 12 solemn commitments and sign your educator certificate.
        </p>
      </div>

      {/* The 12 Commitments Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          The 12 Core Commitments of Educator-Creators
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {ETHICAL_PLEDGE_COMMITMENTS.map((comm) => (
            <div
              key={comm.number}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">
                  {comm.number}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                  {comm.title}
                </h4>
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">
                "{comm.statement}"
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {comm.elaboration}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Signature Form */}
      {!isPledgeSigned ? (
        <form onSubmit={handleSign} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PenTool className="w-5 h-5 text-indigo-600" />
            <span>Sign the Ethical Educator-Creator Pledge</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Your Full Name (for Certificate)
              </label>
              <input
                type="text"
                required
                value={educatorName}
                onChange={(e) => setEducatorName(e.target.value)}
                placeholder="e.g. Barbara Anna Zielonka"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                School or Educational Organization (Optional)
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. Viken Fylkeskommune / Nannestad VGS"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              required
              checked={reviewedAll}
              onChange={(e) => setReviewedAll(e.target.checked)}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>
              I affirm that I will uphold the 12 commitments of The Vibe-Code of Ethics, prioritizing student safety, pedagogy, and privacy above code novelty.
            </span>
          </label>

          <button
            type="submit"
            disabled={!educatorName.trim() || !reviewedAll}
            className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              educatorName.trim() && reviewedAll
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/25 cursor-pointer'
                : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Sign Pledge &amp; Generate Certificate</span>
          </button>
        </form>
      ) : (
        /* Printable Certificate View */
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Pledge Successfully Signed!
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {/* Primary PDF Download */}
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-blue-500/20 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Save as PDF Document</span>
              </button>

              {/* PNG Image Download */}
              <button
                onClick={handleDownloadImage}
                disabled={isGeneratingImage}
                className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {isGeneratingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ImageIcon className="w-4 h-4" />
                )}
                <span>Save as PNG Image</span>
              </button>
            </div>
          </div>

          {/* Status Notification */}
          {noticeMessage && (
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{noticeMessage}</span>
            </div>
          )}

          {/* Certificate Canvas / Frame (Target for html2canvas & jsPDF) */}
          <div className="overflow-x-auto pb-4">
            <div 
              ref={certificateRef}
              id="certificate-render-target"
              style={{
                width: '100%',
                minWidth: '760px',
                aspectRatio: '1.414 / 1', // Exact A4 landscape ratio
                backgroundColor: '#fefcf8', // Elegant warm parchment background
                color: '#1e293b',
              }}
              className="relative p-10 sm:p-14 rounded-3xl border-8 border-double border-amber-600/70 shadow-2xl flex flex-col justify-between text-center select-none"
            >
              {/* Ornate Corner Accents */}
              <div className="absolute top-3 left-3 w-16 h-16 border-t-2 border-l-2 border-amber-600/60 pointer-events-none" />
              <div className="absolute top-3 right-3 w-16 h-16 border-t-2 border-r-2 border-amber-600/60 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-16 h-16 border-b-2 border-l-2 border-amber-600/60 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-16 h-16 border-b-2 border-r-2 border-amber-600/60 pointer-events-none" />

              {/* Certificate Top Header */}
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <Award className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-[11px] font-serif uppercase tracking-[0.3em] text-amber-800 font-bold block mb-1">
                    Certificate of Responsible Educational Creation
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                    The Vibe-Code of Ethics
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    A Responsible Creation Framework for Educators Building AI-Powered Educational Tools
                  </p>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-2 py-4">
                <p className="text-xs sm:text-sm font-serif italic text-slate-600">
                  This certifies that
                </p>

                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 font-serif tracking-tight border-b-2 border-amber-500/80 pb-2 inline-block px-10">
                  {progress.educatorName || educatorName}
                </div>

                {schoolName && (
                  <p className="text-xs font-semibold text-slate-700">
                    {schoolName}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed pt-2">
                  has studied and pledged adherence to the ethical principles of responsible AI tool creation—committing to prioritize pedagogy over novelty, safeguard student privacy with zero unvetted data storage, ensure universal accessibility, and maintain meaningful human educator oversight.
                </p>
              </div>

              {/* Certificate Signatures & Badges */}
              <div className="pt-6 border-t border-amber-300 grid grid-cols-3 gap-4 text-xs items-end">
                <div className="text-center">
                  <div className="font-serif italic font-bold text-slate-800 border-b border-slate-400 pb-1 mx-4">
                    {progress.educatorName || educatorName}
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">
                    Educator-Creator Signature
                  </span>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero-Data Certified</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">
                    Privacy by Design
                  </span>
                </div>

                <div className="text-center">
                  <div className="font-semibold text-slate-800 border-b border-slate-400 pb-1 mx-4">
                    {progress.completionDate || new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">
                    Date of Certification
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
