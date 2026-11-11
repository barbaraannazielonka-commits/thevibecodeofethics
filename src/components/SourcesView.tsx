import React, { useState } from 'react';
import { 
  GraduationCap, 
  Copy, 
  Check, 
  ExternalLink, 
  Search, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { APA_SOURCES, ApaSource } from '../data/sourcesData';

export const SourcesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const categories = [
    'All',
    'Learning Sciences & Cognitive Evidence',
    'Children’s Digital Rights & AI Ethics',
    'Norwegian Guidance',
    'International Technical & Legal',
    'Accessibility & Ethical Standards'
  ];

  // Alphabetically sort sources according to APA standard by author
  const sortedSources = [...APA_SOURCES].sort((a, b) => a.author.localeCompare(b.author));

  const filteredSources = sortedSources.filter(src => {
    const matchesCategory = selectedCategory === 'All' || src.category === selectedCategory;
    const matchesSearch = 
      src.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.rawApa.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopySingle = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const allText = sortedSources.map(s => s.rawApa).join('\n\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Academic &amp; Statutory References
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Sources &amp; Further Reading
              </h2>
            </div>
          </div>

          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'All Citations Copied!' : 'Copy All References'}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The following peer-reviewed frameworks, statutory guidelines, and accessibility benchmarks serve as foundational references for <em>The Vibe-Code of Ethics</em>.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-blue-600'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search author or topic..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bibliography Entries Container */}
      <div className="space-y-4">
        {filteredSources.map((source) => {
          const isCopied = copiedId === source.id;

          return (
            <div
              key={source.id}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {source.category}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopySingle(source.id, source.rawApa)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    title="Copy this citation"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copied' : 'Copy Citation'}</span>
                  </button>

                  <a
                    href={source.url.startsWith('/') ? `${import.meta.env.BASE_URL}${source.url.slice(1)}` : source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                  >
                    <span>Visit Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Classical APA 7th Hanging Indent Citation Presentation */}
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif leading-relaxed pl-6 -indent-6 break-words">
                <span className="font-semibold">{source.author}</span>. ({source.year}).{' '}
                <em className="text-slate-900 dark:text-white font-medium">{source.title}</em>.{' '}
                {source.source && `${source.source}. `}
                <a
                  href={source.url.startsWith('/') ? `${import.meta.env.BASE_URL}${source.url.slice(1)}` : source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline underline-offset-2 break-all"
                >
                  {source.url}
                </a>
              </div>

              {/* Contextual Educational Annotation */}
              {source.annotation && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  <strong className="text-slate-700 dark:text-slate-300">Context &amp; Relevance:</strong> {source.annotation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
