import React, { useState } from 'react';
import { ShieldCheck, Search, Calculator, Sparkles, Building2, User, Scale, FileSpreadsheet, BookmarkCheck } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('directory')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  SAFE<span className="text-emerald-400">SPACE</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SG Trust Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Verified Renovation Intelligence & Deposit Protection
              </p>
            </div>
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
              className="w-full bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-800 text-xs text-slate-100 pl-9 pr-3 py-2 rounded-lg border border-slate-700/60 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-500"
            />
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'directory'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('matching')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'matching'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Smart Match</span>
            </button>

            <button
              onClick={() => setActiveTab('quote')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'quote'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>Quote Compare</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'calculator'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Calculator className="w-4 h-4 text-teal-400" />
              <span>Budget Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('dispute')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'dispute'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Scale className="w-4 h-4 text-purple-400" />
              <span>Mediation & Trust</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* AI Assistant Button */}
            <button
              onClick={openAiDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 transition-all shadow-sm"
              title="Open SafeSpace AI Renovation Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">SafeSpace AI</span>
            </button>

            {/* Business Model Canvas Button */}
            <button
              onClick={openBusinessCanvas}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors"
              title="View Safe Space Business Model Canvas & Partner Ecosystem"
            >
              <span>Business Plan</span>
            </button>

            {/* Shortlist / Homeowner Portal */}
            <button
              onClick={() => setActiveTab('portal')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                activeTab === 'portal'
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span className="hidden sm:inline">My Shortlist</span>
              {shortlistCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-emerald-400 text-slate-950">
                  {shortlistCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between py-2 border-t border-slate-800/80 overflow-x-auto gap-2 no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('directory')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'directory' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Directory
          </button>
          <button
            onClick={() => setActiveTab('matching')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'matching' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Smart Match
          </button>
          <button
            onClick={() => setActiveTab('quote')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'quote' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Quote Compare
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'calculator' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Budget Calc
          </button>
          <button
            onClick={() => setActiveTab('dispute')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'dispute' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-400'
            }`}
          >
            Mediation
          </button>
        </div>

      </div>
    </header>
  );
};
