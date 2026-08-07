import React from 'react';
import { Search, Calculator, Sparkles, Building2, Scale, FileSpreadsheet, BookmarkCheck } from 'lucide-react';
import { SafeSpaceLogo } from './SafeSpaceLogo';

interface HeaderProps {
  activeTab: 'directory' | 'matching' | 'quote' | 'calculator' | 'dispute' | 'portal';
  setActiveTab: (tab: 'directory' | 'matching' | 'quote' | 'calculator' | 'dispute' | 'portal') => void;
  shortlistCount: number;
  openBusinessCanvas: () => void;
  openAiDrawer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  shortlistCount,
  openBusinessCanvas,
  openAiDrawer,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand with Renovation Assured Icon */}
          <div className="cursor-pointer" onClick={() => setActiveTab('directory')}>
            <SafeSpaceLogo size="md" />
          </div>

          {/* Quick Search in Header */}
          <div className="hidden md:flex flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search company name or UEN..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'directory') setActiveTab('directory');
              }}
              className="w-full bg-slate-100 hover:bg-slate-100/90 focus:bg-white text-xs text-slate-900 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'directory'
                  ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Verified Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('matching')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'matching'
                  ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Smart Match</span>
            </button>

            <button
              onClick={() => setActiveTab('quote')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'quote'
                  ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-cyan-600" />
              <span>Quote Compare</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'calculator'
                  ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Budget Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('dispute')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                activeTab === 'dispute'
                  ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-4 h-4 text-purple-600" />
              <span>Mediation & Trust</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* AI Assistant Button */}
            <button
              onClick={openAiDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 text-teal-800 border border-teal-200 hover:border-teal-300 transition-all shadow-xs"
              title="Open SafeSpace AI Renovation Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span className="hidden sm:inline">SafeSpace AI</span>
            </button>

            {/* Business Model Canvas Button */}
            <button
              onClick={openBusinessCanvas}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors"
              title="View Safe Space Business Model Canvas & Partner Ecosystem"
            >
              <span>Business Plan</span>
            </button>

            {/* Shortlist / Homeowner Portal */}
            <button
              onClick={() => setActiveTab('portal')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
                activeTab === 'portal'
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span className="hidden sm:inline">My Shortlist</span>
              {shortlistCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-emerald-500 text-white">
                  {shortlistCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between py-2 border-t border-slate-100 overflow-x-auto gap-2 no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('directory')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${
              activeTab === 'directory' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200' : 'text-slate-600'
            }`}
          >
            Directory
          </button>
          <button
            onClick={() => setActiveTab('matching')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${
              activeTab === 'matching' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200' : 'text-slate-600'
            }`}
          >
            Smart Match
          </button>
          <button
            onClick={() => setActiveTab('quote')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${
              activeTab === 'quote' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200' : 'text-slate-600'
            }`}
          >
            Quote Compare
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${
              activeTab === 'calculator' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200' : 'text-slate-600'
            }`}
          >
            Budget Calc
          </button>
          <button
            onClick={() => setActiveTab('dispute')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg ${
              activeTab === 'dispute' ? 'bg-teal-50 text-teal-700 font-bold border border-teal-200' : 'text-slate-600'
            }`}
          >
            Mediation
          </button>
        </div>

      </div>
    </header>
  );
};
