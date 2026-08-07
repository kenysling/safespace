import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, Sparkles, Building, Scale, ArrowRight, FileText, Lock } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  onOpenMatch: () => void;
  onOpenQuote: () => void;
  onOpenBusinessCanvas: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onOpenMatch,
  onOpenQuote,
  onOpenBusinessCanvas,
}) => {
  const [inputQuery, setInputQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      onSearch(inputQuery);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-slate-50 to-white text-slate-900 pt-8 pb-12 border-b border-slate-200/80">
      {/* Subtle Ambient Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex items-center justify-center mb-6">
          <div
            onClick={onOpenBusinessCanvas}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-200 text-xs font-medium text-slate-700 hover:border-teal-400 hover:text-slate-900 cursor-pointer transition-all shadow-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-teal-700 font-bold">Live ACRA & HDB Verification:</span>
            <span className="text-slate-600">Protecting Singapore Homeowner Renovation Deposits</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Find Renovation Professionals <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              You Can Trust
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Verify interior designers & contractors in seconds before paying deposits. Live ACRA business history, HDB licenses, CaseTrust deposit escrow, and homeowner ownership-verified ratings.
          </p>
        </div>

        {/* Search & Direct UEN Lookup Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative flex items-center bg-white rounded-2xl p-2 border border-slate-200 shadow-xl shadow-teal-900/5">
              <Search className="w-5 h-5 text-teal-600 ml-3 shrink-0" />
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Search firm name or UEN (e.g. SpaceSense, 201712984K)..."
                className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
              >
                <span>Verify Firm</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-2 mt-2.5">
            <span>Popular searches: <button onClick={() => { setInputQuery('SpaceSense'); onSearch('SpaceSense'); }} className="text-teal-700 hover:underline font-semibold">SpaceSense</button>, <button onClick={() => { setInputQuery('Craftsmen'); onSearch('Craftsmen'); }} className="text-teal-700 hover:underline font-semibold">Craftsmen & Co</button>, <button onClick={() => { setInputQuery('Urban Matrix'); onSearch('Urban Matrix'); }} className="text-teal-700 hover:underline font-semibold">Urban Matrix</button></span>
            <span className="hidden sm:inline text-slate-400">420+ SG Licensed IDs Audited</span>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {/* Pillar 1 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition-all hover:shadow-md">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 mb-3">
              <Building className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">ACRA & HDB Audit</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Checks paid-up capital, incorporation age, director records & demerit points.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition-all hover:shadow-md">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200/80 flex items-center justify-center text-cyan-700 mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">CaseTrust Protection</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ensures 100% deposit performance guarantee insurance policies up to S$50,000.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition-all hover:shadow-md">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 mb-3">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Homeowner Proof Reviews</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Ratings tied strictly to verified Singpass / title deed ownership proofs.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition-all hover:shadow-md">
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-700 mb-3">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">Mediation Support</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              In-house independent dispute resolution & mediation before Small Claims Tribunal.
            </p>
          </div>
        </div>

        {/* Quick Shortcut Feature Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenMatch}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Launch Smart Match Wizard</span>
          </button>

          <button
            onClick={onOpenQuote}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Audit Quotation for Red Flags</span>
          </button>
        </div>

      </div>
    </section>
  );
};
