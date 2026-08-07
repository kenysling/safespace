import React, { useState, useMemo } from 'react';
import { CompanyProfile, PropertyType, DesignStyle } from '../types';
import { CompanyCard } from './CompanyCard';
import { Filter, SlidersHorizontal, Search, ShieldCheck, Building2, AlertTriangle, ArrowUpDown, RefreshCw } from 'lucide-react';

interface CompanyDirectoryProps {
  companies: CompanyProfile[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectCompany: (company: CompanyProfile) => void;
  shortlistedIds: string[];
  onToggleShortlist: (id: string) => void;
}

export const CompanyDirectory: React.FC<CompanyDirectoryProps> = ({
  companies,
  searchQuery,
  setSearchQuery,
  onSelectCompany,
  shortlistedIds,
  onToggleShortlist,
}) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | 'ALL'>('ALL');
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle | 'ALL'>('ALL');
  const [caseTrustOnly, setCaseTrustOnly] = useState(false);
  const [hdbOnly, setHdbOnly] = useState(false);
  const [lowRiskOnly, setLowRiskOnly] = useState(false);
  const [maxBudgetSGD, setMaxBudgetSGD] = useState<number>(200000);
  const [sortBy, setSortBy] = useState<'TRUST_SCORE' | 'RATING' | 'ACRA_YEARS' | 'PRICE_LOW'>('TRUST_SCORE');

  // Filtered and Sorted list
  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company) => {
        // Text Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = company.name.toLowerCase().includes(q);
          const matchesUen = company.uen.toLowerCase().includes(q);
          const matchesHdb = company.hdbRegistrationNo?.toLowerCase().includes(q) || false;
          const matchesStyle = company.designStyles.some((s) => s.toLowerCase().includes(q));
          if (!matchesName && !matchesUen && !matchesHdb && !matchesStyle) return false;
        }

        // Property Type
        if (selectedPropertyType !== 'ALL' && !company.projectTypes.includes(selectedPropertyType)) {
          return false;
        }

        // Design Style
        if (selectedStyle !== 'ALL' && !company.designStyles.includes(selectedStyle)) {
          return false;
        }

        // CaseTrust Filter
        if (caseTrustOnly && !company.caseTrustAccredited) {
          return false;
        }

        // HDB Filter
        if (hdbOnly && company.hdbStatus !== 'REGISTERED') {
          return false;
        }

        // Low Risk Filter
        if (lowRiskOnly && company.redFlagRating !== 'LOW_RISK') {
          return false;
        }

        // Budget Filter
        if (company.priceRangeSGD.min > maxBudgetSGD) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'TRUST_SCORE') return b.overallTrustScore - a.overallTrustScore;
        if (sortBy === 'RATING') return b.rating - a.rating;
        if (sortBy === 'ACRA_YEARS') return b.incorporationYear - a.incorporationYear;
        if (sortBy === 'PRICE_LOW') return a.priceRangeSGD.min - b.priceRangeSGD.min;
        return 0;
      });
  }, [
    companies,
    searchQuery,
    selectedPropertyType,
    selectedStyle,
    caseTrustOnly,
    hdbOnly,
    lowRiskOnly,
    maxBudgetSGD,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPropertyType('ALL');
    setSelectedStyle('ALL');
    setCaseTrustOnly(false);
    setHdbOnly(false);
    setLowRiskOnly(false);
    setMaxBudgetSGD(200000);
    setSortBy('TRUST_SCORE');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Verified Renovation Company Directory</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
              {filteredCompanies.length} Firms
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Audited against ACRA registries, HDB licenses, CaseTrust escrow coverage, and verified Singpass homeowner reviews.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sort By:</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="TRUST_SCORE">Highest Trust Score</option>
            <option value="RATING">Highest Verified Rating</option>
            <option value="ACRA_YEARS">Longest ACRA History</option>
            <option value="PRICE_LOW">Lowest Package Starting Price</option>
          </select>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 mb-8 space-y-4">
        
        {/* Row 1: Property Type Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" /> Property:
          </span>
          <button
            onClick={() => setSelectedPropertyType('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPropertyType === 'ALL'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setSelectedPropertyType('HDB_BTO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPropertyType === 'HDB_BTO'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            HDB BTO
          </button>
          <button
            onClick={() => setSelectedPropertyType('HDB_RESALE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPropertyType === 'HDB_RESALE'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            HDB Resale
          </button>
          <button
            onClick={() => setSelectedPropertyType('CONDO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPropertyType === 'CONDO'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Condominium
          </button>
          <button
            onClick={() => setSelectedPropertyType('LANDED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPropertyType === 'LANDED'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Landed House
          </button>
        </div>

        {/* Row 2: Accreditation & Safety Toggles */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800/80 text-xs">
          
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={caseTrustOnly}
              onChange={(e) => setCaseTrustOnly(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
            />
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              CaseTrust Accredited Only
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={hdbOnly}
              onChange={(e) => setHdbOnly(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
            />
            <span className="flex items-center gap-1 font-medium">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              HDB Licensed (RRC) Only
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={lowRiskOnly}
              onChange={(e) => setLowRiskOnly(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
            />
            <span className="flex items-center gap-1 font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Low Risk Profiles Only
            </span>
          </label>

          {/* Budget Slider */}
          <div className="flex items-center gap-3 ml-auto text-xs text-slate-400">
            <span>Max Budget: <strong className="text-emerald-400">S${maxBudgetSGD.toLocaleString()}</strong></span>
            <input
              type="range"
              min={20000}
              max={250000}
              step={5000}
              value={maxBudgetSGD}
              onChange={(e) => setMaxBudgetSGD(Number(e.target.value))}
              className="w-32 accent-emerald-500 cursor-pointer"
            />
          </div>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors ml-2"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>

      </div>

      {/* Directory Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onSelect={onSelectCompany}
              isShortlisted={shortlistedIds.includes(company.id)}
              onToggleShortlist={onToggleShortlist}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800 p-8">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3 opacity-80" />
          <h3 className="text-lg font-bold text-white mb-1">No Verified Firms Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            No interior design or contracting firm matched your strict filter criteria. Try adjusting your budget or clearing filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
};
