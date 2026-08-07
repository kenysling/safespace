import React, { useState } from 'react';
import { CompanyProfile } from '../types';
import {
  X,
  ShieldCheck,
  Building,
  Building2,
  AlertTriangle,
  Star,
  CheckCircle2,
  Sparkles,
  Phone,
  MapPin,
  FileCheck,
  Bookmark,
  BookmarkCheck,
  Lock,
} from 'lucide-react';

interface CompanyProfileModalProps {
  company: CompanyProfile | null;
  onClose: () => void;
  isShortlisted: boolean;
  onToggleShortlist: (id: string) => void;
  openAiAssistantForCompany?: (company: CompanyProfile) => void;
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({
  company,
  onClose,
  isShortlisted,
  onToggleShortlist,
  openAiAssistantForCompany,
}) => {
  if (!company) return null;

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'AI_REPORT' | 'PORTFOLIO' | 'REVIEWS'>('OVERVIEW');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-800 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-amber-800 bg-amber-50 border-amber-200';
    return 'text-rose-800 bg-rose-50 border-rose-200';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh] text-slate-900">
        
        {/* Header Bar */}
        <div className="relative bg-slate-50 p-5 border-b border-slate-200 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={company.logoUrl}
              alt={company.name}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs bg-white"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{company.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 font-semibold">
                  UEN: {company.uen}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{company.tagline}</p>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {company.caseTrustAccredited && (
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-sky-600" /> CaseTrust Accredited
                  </span>
                )}
                {company.hdbRegistrationNo && (
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                    <Building className="w-3 h-3 text-teal-600" /> HDB Registered ({company.hdbRegistrationNo})
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                  {new Date().getFullYear() - company.incorporationYear} Years in ACRA
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleShortlist(company.id)}
              className={`p-2 rounded-xl border transition-all ${
                isShortlisted
                  ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
            >
              {isShortlisted ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50/60 px-5 gap-4 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'OVERVIEW'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-teal-600" />
            <span>ACRA & Verification Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('AI_REPORT')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'AI_REPORT'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI Diligence Report</span>
          </button>

          <button
            onClick={() => setActiveTab('PORTFOLIO')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'PORTFOLIO'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Portfolios ({company.portfolios.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('REVIEWS')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'REVIEWS'
                ? 'border-teal-600 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Verified Reviews ({company.verifiedReviews.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: ACRA OVERVIEW & TRUST RADAR */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              
              {/* Trust Score & Red Flags Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Main Trust Gauge Box */}
                <div className="md:col-span-1 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Overall SafeSpace Score</span>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">{company.overallTrustScore}</span>
                    <span className="text-xs text-slate-500">/ 100</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(company.overallTrustScore)}`}>
                    {company.overallTrustScore >= 90 ? 'Tier-1 Verified' : company.overallTrustScore >= 75 ? 'Standard Verified' : 'Caution Advised'}
                  </div>
                </div>

                {/* Score Breakdown Radar */}
                <div className="md:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <h4 className="font-bold text-slate-900 mb-3">5-Pillar Verification Breakdown</h4>
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between text-slate-700 font-medium mb-1">
                        <span>ACRA Registry & Director Integrity</span>
                        <span className="font-mono text-teal-700 font-bold">{company.trustScoreBreakdown.acraIntegrity}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-teal-600 rounded-full" style={{ width: `${company.trustScoreBreakdown.acraIntegrity}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-medium mb-1">
                        <span>Credentials, HDB & CaseTrust Licenses</span>
                        <span className="font-mono text-teal-700 font-bold">{company.trustScoreBreakdown.credentialsAndLicensing}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-teal-600 rounded-full" style={{ width: `${company.trustScoreBreakdown.credentialsAndLicensing}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-medium mb-1">
                        <span>Financial Stability & Paid-Up Capital</span>
                        <span className="font-mono text-teal-700 font-bold">{company.trustScoreBreakdown.financialStability}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-teal-600 rounded-full" style={{ width: `${company.trustScoreBreakdown.financialStability}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-medium mb-1">
                        <span>Verified Homeowner Ratings</span>
                        <span className="font-mono text-teal-700 font-bold">{company.trustScoreBreakdown.verifiedCustomerReviews}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-teal-600 rounded-full" style={{ width: `${company.trustScoreBreakdown.verifiedCustomerReviews}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-700 font-medium mb-1">
                        <span>Dispute & Court Judgment Record</span>
                        <span className="font-mono text-teal-700 font-bold">{company.trustScoreBreakdown.disputeAndCourtRecord}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-teal-600 rounded-full" style={{ width: `${company.trustScoreBreakdown.disputeAndCourtRecord}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Red Flags / Warnings Alert Box */}
              {company.redFlags.length > 0 ? (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Red Flag Watchlist Items Identified ({company.redFlags.length})</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700">
                    {company.redFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-emerald-950">Clean Compliance Record</span>
                    <span className="text-slate-600">Zero insolvency flags, tribunal judgments, or unauthorized directorship changes recorded.</span>
                  </div>
                </div>
              )}

              {/* ACRA Business Particulars Grid */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 text-xs space-y-4">
                <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2 flex items-center justify-between">
                  <span>ACRA Business Profile Details</span>
                  <span className="text-[10px] text-teal-700 font-mono font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">Live Sync</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-700">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Unique Entity Number (UEN)</span>
                    <span className="font-mono font-bold text-slate-900">{company.uen}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Incorporation Year</span>
                    <span className="font-bold text-slate-900">{company.incorporationYear} ({new Date().getFullYear() - company.incorporationYear} Years Active)</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Paid-Up Capital</span>
                    <span className="font-bold text-teal-700">S${company.paidUpCapitalSGD.toLocaleString()}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">HDB Contractor No.</span>
                    <span className="font-bold text-slate-900">{company.hdbRegistrationNo || 'Not Registered'}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">CaseTrust Bond Policy</span>
                    <span className="font-bold text-slate-900">{company.caseTrustPolicyNo || 'None'}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">BCA Accreditation</span>
                    <span className="font-bold text-slate-900">{company.bcaGrade || 'N/A'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-slate-600 text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {company.officeAddress}
                  </span>
                  <span className="flex items-center gap-1 text-slate-800 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {company.contactPhone}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: AI DILIGENCE REPORT */}
          {activeTab === 'AI_REPORT' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50/60 via-slate-50 to-cyan-50/60 border border-teal-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h3 className="font-bold text-slate-900 text-base">SafeSpace AI Diligence Summary</h3>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 font-bold">
                    Gemini 3.6 Flash Intelligence
                  </span>
                </div>

                {/* Key Strengths */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-teal-800 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Key Strength Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
                    {company.aiSummary.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Watchouts */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Things to Keep in Mind
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
                    {company.aiSummary.watchouts.map((wo, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{wo}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accreditation Explanation */}
                <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <strong className="text-slate-900 block mb-1">Plain English Protection Summary:</strong>
                  {company.aiSummary.accreditationNotes}
                </div>
              </div>

              {/* Action to Ask AI Assistant */}
              {openAiAssistantForCompany && (
                <div className="text-center p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <p className="text-xs text-slate-600 mb-3">
                    Want personalized questions to ask <strong className="text-slate-900">{company.name}</strong> before signing?
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      openAiAssistantForCompany(company);
                    }}
                    className="px-5 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-xl hover:bg-teal-700 transition-all shadow-xs inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Tailored Contractor Q&A Checklist</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: PORTFOLIOS */}
          {activeTab === 'PORTFOLIO' && (
            <div className="space-y-6">
              {company.portfolios.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {company.portfolios.map((portfolio) => (
                    <div key={portfolio.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-xs">
                      <div className="relative h-48 bg-slate-100 cursor-pointer" onClick={() => setSelectedImage(portfolio.coverImage)}>
                        <img
                          src={portfolio.coverImage}
                          alt={portfolio.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[10px] font-bold text-teal-800 border border-slate-200 shadow-2xs">
                          S${portfolio.renovationCostSGD.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{portfolio.title}</h4>
                        <p className="text-xs text-slate-500 mb-2">{portfolio.propertyType} • {portfolio.location}</p>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">{portfolio.description}</p>
                        
                        <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span>Style: <strong className="text-slate-800">{portfolio.style}</strong></span>
                          <span>Completed in <strong>{portfolio.durationWeeks} wks</strong></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                  No public portfolio items uploaded yet.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: VERIFIED REVIEWS */}
          {activeTab === 'REVIEWS' && (
            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-teal-800 block text-[10px] uppercase font-bold">SafeSpace Review Policy</span>
                  <span className="text-slate-700 font-medium">
                    100% of reviews require Singpass / HDB Title Deed ownership proof before publishing. Zero paid marketing reviews permitted.
                  </span>
                </div>
                <Lock className="w-5 h-5 text-teal-600 shrink-0 ml-3" />
              </div>

              {company.verifiedReviews.map((review) => (
                <div key={review.id} className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{review.homeownerName}</span>
                      {review.propertyOwnershipVerified && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Property Ownership Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{review.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-[11px]">
                    {review.propertyType} • {review.estateLocation} • Project Cost: S${review.projectCostSGD.toLocaleString()}
                  </p>

                  <p className="text-slate-800 leading-relaxed italic pt-1">
                    "{review.comment}"
                  </p>

                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                    <div>Workmanship: <strong className="text-slate-800">{review.workmanshipScore}/5</strong></div>
                    <div>Timeline: <strong className="text-slate-800">{review.timelineAdherenceScore}/5</strong></div>
                    <div>Budget Specs: <strong className="text-slate-800">{review.budgetTransparencyScore}/5</strong></div>
                    <div>Service: <strong className="text-slate-800">{review.serviceScore}/5</strong></div>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="hidden sm:block text-xs text-slate-500">
            Contact: <a href={`mailto:${company.contactEmail}`} className="text-teal-700 font-semibold hover:underline">{company.contactEmail}</a>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => onToggleShortlist(company.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                isShortlisted
                  ? 'bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100'
              }`}
            >
              {isShortlisted ? 'In Shortlist' : 'Add to Shortlist'}
            </button>

            <a
              href={`tel:${company.contactPhone}`}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Firm ({company.contactPhone})</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Enlarged Portfolio" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl" />
        </div>
      )}

    </div>
  );
};
