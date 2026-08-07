import React from 'react';
import { CompanyProfile } from '../types';
import { ShieldCheck, Star, AlertTriangle, Building, Bookmark, BookmarkCheck, ChevronRight, Check } from 'lucide-react';

interface CompanyCardProps {
  company: CompanyProfile;
  onSelect: (company: CompanyProfile) => void;
  isShortlisted: boolean;
  onToggleShortlist: (companyId: string) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onSelect,
  isShortlisted,
  onToggleShortlist,
}) => {
  // Score color helper for light theme
  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (score >= 75) return 'bg-amber-50 text-amber-800 border-amber-200';
    return 'bg-rose-50 text-rose-800 border-rose-200';
  };

  const getRiskBadge = (rating: CompanyProfile['redFlagRating']) => {
    switch (rating) {
      case 'LOW_RISK':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs">
            <ShieldCheck className="w-3 h-3 text-teal-600" />
            Low Risk Profile
          </span>
        );
      case 'MODERATE_CAUTION':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Moderate Caution
          </span>
        );
      case 'HIGH_RISK_ALERT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            High Risk Alert
          </span>
        );
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-teal-300 transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md flex flex-col h-full text-slate-900">
      
      {/* Top Image Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={company.heroImageUrl}
          alt={company.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Shortlist Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleShortlist(company.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
            isShortlisted
              ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
              : 'bg-white/80 text-slate-700 border-slate-200/80 hover:text-slate-900 hover:bg-white'
          }`}
          title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
        >
          {isShortlisted ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>

        {/* Trust Score Badge on Image */}
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
          <div className={`px-2.5 py-1 rounded-xl text-xs font-bold border backdrop-blur-md flex items-center gap-1.5 shadow-2xs ${getScoreBadgeColor(company.overallTrustScore)}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Trust Score: {company.overallTrustScore}/100</span>
          </div>
          {getRiskBadge(company.redFlagRating)}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Name & Tagline */}
        <div className="mb-3">
          <h3
            onClick={() => onSelect(company)}
            className="text-base font-bold text-slate-900 hover:text-teal-700 cursor-pointer transition-colors line-clamp-1"
          >
            {company.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {company.tagline}
          </p>
        </div>

        {/* Accreditations Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[11px]">
          {company.caseTrustAccredited ? (
            <span className="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3 text-sky-600" />
              CaseTrust Accredited
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 border border-slate-200">
              CaseTrust Pending
            </span>
          )}

          {company.hdbRegistrationNo && (
            <span className="px-2 py-0.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold flex items-center gap-1">
              <Building className="w-3 h-3 text-teal-600" />
              HDB Registered ({company.hdbRegistrationNo})
            </span>
          )}

          <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
            ACRA {new Date().getFullYear() - company.incorporationYear} Yrs
          </span>
        </div>

        {/* Rating & Stats Row */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50/80 rounded-xl p-2.5 border border-slate-200/80 mb-4 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">Verified Rating</span>
            <div className="flex items-center gap-1 font-bold text-slate-900 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{company.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-normal text-[10px]">({company.reviewCount})</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">Price Range</span>
            <span className="font-semibold text-slate-800 text-[11px]">
              S${(company.priceRangeSGD.min / 1000).toFixed(0)}k - S${(company.priceRangeSGD.max / 1000).toFixed(0)}k
            </span>
          </div>
        </div>

        {/* Design Styles */}
        <div className="flex flex-wrap gap-1 mb-4">
          {company.designStyles.slice(0, 3).map((style) => (
            <span
              key={style}
              className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600 border border-slate-200/70"
            >
              {style.replace('_', ' ')}
            </span>
          ))}
          {company.designStyles.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-500">
              +{company.designStyles.length - 3}
            </span>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            UEN: <span className="font-mono text-slate-700">{company.uen}</span>
          </span>

          <button
            onClick={() => onSelect(company)}
            className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-700 text-xs font-semibold rounded-xl border border-teal-200/80 transition-colors flex items-center gap-1"
          >
            <span>Full Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
