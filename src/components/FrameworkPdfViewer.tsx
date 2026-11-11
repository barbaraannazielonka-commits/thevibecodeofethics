import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Search, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Loader2,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
} catch {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

interface FrameworkSection {
  num: number;
  title: string;
  part: string;
  page: number;
  description: string;
}

const FRAMEWORK_SECTIONS: FrameworkSection[] = [
  { num: 1, title: 'A New Responsibility: From Educator to Technology Creator', part: 'Introduction', page: 1, description: 'The shift from consumer to creator in the age of conversational coding.' },
  { num: 2, title: 'Start with Pedagogy, Not Technology', part: 'Part I. Pedagogy & Purpose', page: 2, description: 'Every tool must begin with an explicit pedagogical justification grounded in learning science.' },
  { num: 3, title: 'Design for Learning, Not Just Engagement', part: 'Part I. Pedagogy & Purpose', page: 3, description: 'Distinguishing productive struggle and cognitive effort from shallow gamification.' },
  { num: 4, title: 'Protect Student Agency and Human Agency', part: 'Part I. Pedagogy & Purpose', page: 4, description: 'Ensuring students remain active thinkers rather than passive consumers of AI outputs.' },
  { num: 5, title: 'Collect as Little Data as Possible', part: 'Part II. Privacy & Student Rights', page: 5, description: 'Data minimization: store progress in local browser storage; avoid personal accounts.' },
  { num: 6, title: 'Know Where Student Data Goes', part: 'Part II. Privacy & Student Rights', page: 6, description: 'Understanding third-party APIs, LLM training policies, and server data storage.' },
  { num: 7, title: 'Respect GDPR and Your School\'s Data Protection Rules', part: 'Part II. Privacy & Student Rights', page: 7, description: 'Legal compliance with GDPR, local education directives, and district policies.' },
  { num: 8, title: 'Protect Student Identities and Confidentiality', part: 'Part II. Privacy & Student Rights', page: 8, description: 'Use synthetic data during prompt design; never expose real student names or grades.' },
  { num: 9, title: 'Never Trust AI-Generated Code Without Review', part: 'Part III. Security & Tech Responsibility', page: 9, description: 'AI-generated code frequently contains security flaws, insecure defaults, and hidden bugs.' },
  { num: 10, title: 'Understand the Risks of AI-Powered Features', part: 'Part III. Security & Tech Responsibility', page: 10, description: 'Prompt injection, hallucinations, and unverified outputs in pupil tools.' },
  { num: 11, title: 'Design for All Learners (WCAG 2.2 AA)', part: 'Part IV. Fairness & Accessibility', page: 12, description: 'Universal design, color contrast, keyboard navigation, and cognitive accessibility.' },
  { num: 12, title: 'Identify and Reduce Bias', part: 'Part IV. Fairness & Accessibility', page: 13, description: 'Auditing system prompts and datasets for cultural, gender, and linguistic bias.' },
  { num: 13, title: 'Respect Student Dignity and Psychological Safety', part: 'Part IV. Fairness & Accessibility', page: 14, description: 'Never automate harsh punishment or public ranking that demoralizes students.' },
  { num: 14, title: 'Do Not Confuse Automated Feedback with Teacher Assessment', part: 'Part V. Assessment & Integrity', page: 14, description: 'AI feedback is formative assistance, never summative or evaluative authority.' },
  { num: 15, title: 'Be Transparent About AI', part: 'Part V. Assessment & Integrity', page: 15, description: 'Always disclose clearly to students and parents when and how AI is utilized.' },
  { num: 16, title: 'Respect Copyright and Intellectual Property', part: 'Part V. Assessment & Integrity', page: 15, description: 'Respect educational fair use, open-source licenses, and student-created IP.' },
  { num: 17, title: 'Test Before Students Test (6-Stage Process)', part: 'Part VI. Development & Deployment', page: 16, description: 'The 6-stage development lifecycle from concept to pilot and classroom deployment.' },
  { num: 18, title: 'Create a Plan for Failure (Incident Response)', part: 'Part VI. Development & Deployment', page: 18, description: 'Instant analog fallback plans for when servers fail or AI misbehaves in class.' },
  { num: 19, title: 'Document What You Build', part: 'Part VI. Development & Deployment', page: 18, description: 'Maintain a 1-page pedagogical and technical spec for school governance.' },
  { num: 20, title: 'Respect the School\'s Authority and Policies', part: 'Part VII. Governance & Responsibility', page: 19, description: 'Involve administrators, school IT leaders, and data protection officers.' },
  { num: 21, title: 'Be Responsible When Sharing Your Creations', part: 'Part VII. Governance & Responsibility', page: 20, description: 'Remove school-specific API keys and confidential data before sharing open-source code.' },
  { num: 22, title: 'Take Responsibility for Maintenance', part: 'Part VII. Governance & Responsibility', page: 21, description: 'Unmaintained educational tools become vulnerable; commit to updates or decommission.' },
  { num: 23, title: 'The Responsible Vibe-Coding Gate (Pre-Deployment Checklist)', part: 'Part VIII. Pre-Deployment Checklist', page: 21, description: 'The mandatory 23-point clearance audit across 7 critical domains.' },
  { num: 24, title: 'A Practical Risk Classification (4 Tiers)', part: 'Part IX. Practical Risk Classification', page: 24, description: 'Classifying educational applications into Lower, Moderate, Higher, and Very High risk.' },
  { num: 25, title: 'The Ethical Vibe-Coding Promise (12 Commitments)', part: 'Part X. The Ethical Promise', page: 24, description: 'The 12 professional commitments made by conscientious educator-creators.' }
];

const EXTERNAL_REFERENCES = [
  {
    title: 'Utdanningsdirektoratet – Advice on AI in Schools',
    url: 'https://www.udir.no/kvalitet-og-kompetanse/digitalisering-skole/kunstig-intelligens-i-skolen/rad-om-kunstig-intelligens-skolen/',
    region: 'Norway'
  },
  {
    title: 'Datatilsynet – Digital Learning Tools & Privacy Guidance',
    url: 'https://www.datatilsynet.no/personvern-pa-ulike-omrader/skole-barn-unge/bruk-av-digitale-hjelpemidler/',
    region: 'Norway'
  },
  {
    title: 'OWASP – Top 10 for Large Language Model Applications',
    url: 'https://github.com/GenAI-Security-Project/GenAI-LLM-Top10',
    region: 'International'
  },
  {
    title: 'W3C – Web Content Accessibility Guidelines (WCAG 2.2)',
    url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
    region: 'International'
  },
  {
    title: 'European Union – Artificial Intelligence Act (EU AI Act)',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
    region: 'European Union'
  }
];

export const FrameworkPdfViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(27);
  const [isLoadingPdf, setIsLoadingPdf] = useState<boolean>(true);
  const [isRenderingPage, setIsRenderingPage] = useState<boolean>(false);
  const [pdfLoadError, setPdfLoadError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'canvas' | 'sections'>('canvas');

  const pdfPath = `${import.meta.env.BASE_URL}assets/aistudio/THE_VIBE-CODE_OF_ETHICS__1__302ae484.pdf`;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerFrameRef = useRef<HTMLDivElement | null>(null);
  const pdfDocRef = useRef<any>(null);
  const renderTaskRef = useRef<any>(null);

  // Load the PDF Document once on mount
  useEffect(() => {
    let isMounted = true;
    setIsLoadingPdf(true);
    setPdfLoadError(null);

    const loadDocument = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfPath,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/cmaps/',
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (!isMounted) return;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages || 27);
        setIsLoadingPdf(false);
      } catch (err: any) {
        console.warn('PDF.js failed to load via primary path, attempting fallback fetch:', err);
        try {
          // Fallback: fetch as arrayBuffer
          const response = await fetch(pdfPath);
          if (!response.ok) throw new Error(`HTTP error ${response.status}`);
          const arrayBuffer = await response.arrayBuffer();
          const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          if (!isMounted) return;

          pdfDocRef.current = doc;
          setTotalPages(doc.numPages || 27);
          setIsLoadingPdf(false);
        } catch (fetchErr: any) {
          console.error('All PDF load strategies failed:', fetchErr);
          if (isMounted) {
            setPdfLoadError('Unable to render PDF directly in this frame. You can view all sections below or download the complete PDF.');
            setIsLoadingPdf(false);
          }
        }
      }
    };

    loadDocument();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Ignore cancellation errors
        }
      }
    };
  }, [pdfPath]);

  // Render the current page onto HTML5 Canvas
  useEffect(() => {
    if (!pdfDocRef.current || !canvasRef.current || isLoadingPdf) return;

    let isCancelled = false;

    const renderPage = async () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Ignore
        }
        renderTaskRef.current = null;
      }

      setIsRenderingPage(true);

      try {
        const page = await pdfDocRef.current.getPage(currentPage);
        if (isCancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        // Calculate responsive scale based on container width
        const containerWidth = containerRef.current?.clientWidth || 750;
        const unscaledViewport = page.getViewport({ scale: 1 });
        
        // Fit to container width with padding
        const availableWidth = Math.max(300, containerWidth - 40);
        const baseFitScale = availableWidth / unscaledViewport.width;
        const effectiveScale = baseFitScale * zoomLevel;

        const viewport = page.getViewport({ scale: effectiveScale });
        const pixelRatio = window.devicePixelRatio || 1;

        // High-DPI canvas dimensions for razor-sharp vector text
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = pixelRatio !== 1 ? [pixelRatio, 0, 0, pixelRatio, 0, 0] : null;

        const renderTask = page.render({
          canvasContext: context,
          transform: transform || undefined,
          viewport: viewport,
        });

        renderTaskRef.current = renderTask;
        await renderTask.promise;

        if (!isCancelled) {
          setIsRenderingPage(false);
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('PDF page render error:', err);
          if (!isCancelled) {
            setIsRenderingPage(false);
          }
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Ignore
        }
      }
    };
  }, [currentPage, zoomLevel, isLoadingPdf]);

  // Window resize listener to re-scale canvas
  useEffect(() => {
    const handleResize = () => {
      if (pdfDocRef.current && canvasRef.current) {
        // Trigger page re-render on resize
        setCurrentPage((p) => p);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleJumpToSection = (targetPage: number) => {
    setActiveTab('canvas');
    setCurrentPage(targetPage);
    if (viewerFrameRef.current) {
      viewerFrameRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredSections = FRAMEWORK_SECTIONS.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.part.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.num.toString() === searchQuery
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Banner & Actions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Official Document Preview
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                The Vibe-Code of Ethics Framework
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span>Open in New Tab</span>
            </a>

            <a
              href={pdfPath}
              download="THE_VIBE-CODE_OF_ETHICS.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF (27 Pages)</span>
            </a>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The complete foundational text: <em>"A Responsible Creation Framework for Educators Building AI-Powered Educational Tools"</em>. Browse page-by-page below with instant high-resolution rendering, or jump directly to any principle.
        </p>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'canvas'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Visual Reader (Page {currentPage} of {totalPages})</span>
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sections'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>25-Section Index &amp; Direct Jumper</span>
          </button>
        </div>
      </div>

      {/* Main Document Reader Container */}
      <div 
        ref={viewerFrameRef}
        className={`rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all ${
          isFullscreen ? 'fixed inset-4 z-50 overflow-auto bg-slate-900/95 p-4' : 'overflow-hidden'
        }`}
      >
        {/* Navigation Toolbar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10 backdrop-blur-xs">
          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || isLoadingPdf}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
              <span>Page</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1 && val <= totalPages) {
                    setCurrentPage(val);
                  }
                }}
                className="w-12 text-center py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="text-slate-400">/ {totalPages}</span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || isLoadingPdf}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {isRenderingPage && (
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 ml-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Rendering...</span>
              </div>
            )}
          </div>

          {/* Zoom and Display Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, +(z - 0.15).toFixed(2)))}
              disabled={isLoadingPdf || zoomLevel <= 0.7}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              onClick={() => setZoomLevel((z) => Math.min(2.0, +(z + 0.15).toFixed(2)))}
              disabled={isLoadingPdf || zoomLevel >= 2.0}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setZoomLevel(1.0)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              title="Reset Zoom to 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors ml-1"
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Canvas Display View */}
        {activeTab === 'canvas' && (
          <div 
            ref={containerRef}
            className="w-full min-h-[640px] max-h-[820px] overflow-auto bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-start p-4 sm:p-6"
          >
            {isLoadingPdf ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-3">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Loading The Vibe-Code of Ethics Document...
                </p>
                <p className="text-xs text-slate-500">
                  Rendering 27 pages with high-fidelity vector clarity
                </p>
              </div>
            ) : pdfLoadError ? (
              <div className="p-8 max-w-lg text-center space-y-4 my-auto bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-900/60 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Document Preview
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pdfLoadError}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in Full Tab</span>
                  </a>
                  <button
                    onClick={() => setActiveTab('sections')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-semibold"
                  >
                    Read Structured Sections
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative shadow-2xl rounded-sm border border-slate-300 dark:border-slate-700 bg-white overflow-hidden transition-all">
                {/* Native HTML5 Canvas element rendered by PDF.js */}
                <canvas 
                  ref={canvasRef} 
                  className="block mx-auto max-w-full"
                />
              </div>
            )}
          </div>
        )}

        {/* Structured Sections Index View */}
        {activeTab === 'sections' && (
          <div className="p-6 bg-slate-50 dark:bg-slate-900/80 min-h-[500px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Click any principle below to immediately flip the visual document reader to that page.
                </p>
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search section..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredSections.map((sec) => (
                  <button
                    key={sec.num}
                    onClick={() => handleJumpToSection(sec.page)}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-slate-900 text-left transition-all hover:shadow-sm cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {sec.part}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-mono font-bold text-[11px] shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Page {sec.page} &rarr;
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors mb-1">
                      {sec.num}. {sec.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {sec.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reader Bottom Bar */}
        <div className="p-3 bg-slate-100 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Document loaded natively via Canvas — bypasses iframe blockers &amp; plugin restrictions</span>
          </div>

          <div className="flex items-center gap-3">
            <span>27 Total Pages</span>
            <span>&bull;</span>
            <button
              onClick={() => handleJumpToSection(21)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Jump to Pre-Deployment Gate (p. 21)
            </button>
            <span>&bull;</span>
            <button
              onClick={() => handleJumpToSection(24)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Jump to 12 Commitments (p. 24)
            </button>
          </div>
        </div>
      </div>

      {/* External Reference Frameworks */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Recommended Official Guidance &amp; Further Reading
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          As cited on page 26 of the framework, these institutional bodies provide statutory regulations and security guidelines:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXTERNAL_REFERENCES.map((ref, idx) => (
            <a
              key={idx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex items-center justify-between gap-3 group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-0.5">
                  {ref.region}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                  {ref.title}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
