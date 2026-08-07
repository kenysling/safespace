import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, Sparkles, Building, Scale, ArrowRight, FileText, Lock } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 pt-8 pb-12 border-b border-slate-800">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex items-center justify-center mb-6">
          <div
            onClick={onOpenBusinessCanvas}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-emerald-500/30 text-xs font-medium text-slate-300 hover:border-emerald-400 hover:text-white cursor-pointer transition-all shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">Live ACRA & HDB Verification:</span>
            <span>Protecting Singapore Homeowner Renovation Deposits</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Singapore's Verified <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Renovation Intelligence
            </span>{' '}
            & Trust Platform
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Verify interior designers & contractors in seconds before paying deposits. Live ACRA business history, HDB licenses, CaseTrust deposit escrow, and homeowner ownership-verified ratings.
          </p>
        </div>

        {/* Search & Direct UEN Lookup Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative flex items-center bg-slate-950 rounded-xl p-1.5 border border-slate-700/80 shadow-2xl">
              <Search className="w-5 h-5 text-emerald-400 ml-3 shrink-0" />
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Search firm name or UEN (e.g. SpaceSense, 201712984K)..."
                className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-md flex items-center gap-1.5 shrink-0"
              >
                <span>Verify Firm</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 mt-2">
            <span>Popular searches: <button onClick={() => { setInputQuery('SpaceSense'); onSearch('SpaceSense'); }} className="text-emerald-400 hover:underline">SpaceSense</button>, <button onClick={() => { setInputQuery('Craftsmen'); onSearch('Craftsmen'); }} className="text-emerald-400 hover:underline">Craftsmen & Co</button>, <button onClick={() => { setInputQuery('Urban Matrix'); onSearch('Urban Matrix'); }} className="text-emerald-400 hover:underline">Urban Matrix</button></span>
            <span className="hidden sm:inline text-slate-500">420+ SG Licensed IDs Audited</span>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {/* Pillar 1 */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2.5">
              <Building className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-100 mb-1">ACRA & HDB Audit</h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              Checks paid-up capital, incorporation age, director records & demerit points.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2.5">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-100 mb-1">CaseTrust Protection</h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              Ensures 100% deposit performance guarantee insurance policies up to S$50,000.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-100 mb-1">Homeowner Proof Reviews</h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              Ratings tied strictly to verified Singpass / title deed ownership proofs.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-slate-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2.5">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-100 mb-1">Mediation Support</h3>
            <p className="text-[11px] text-slate-400 leading-snug">
              In-house independent dispute resolution & mediation before Small Claims Tribunal.
            </p>
          </div>
        </div>

        {/* Quick Shortcut Feature Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenMatch}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Launch Smart Match Wizard</span>
          </button>

          <button
            onClick={onOpenQuote}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Audit Quotation for Red Flags</span>
          </button>
        </div>

      </div>
    </section>
  );
};
