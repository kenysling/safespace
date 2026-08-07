import React, { useState } from 'react';
import { CompanyProfile, PortfolioProject, VerifiedReview } from '../types';
import {
  X,
  ShieldCheck,
  Building,
  Building2,
  Calendar,
  DollarSign,
  AlertTriangle,
  Star,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  FileCheck,
  Bookmark,
  BookmarkCheck,
  Lock,
  Scale
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
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 75) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="relative bg-slate-950 p-5 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={company.logoUrl}
              alt={company.name}
              className="w-14 h-14 rounded-xl object-cover border border-slate-800 shadow-md bg-slate-900"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">{company.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  UEN: {company.uen}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{company.tagline}</p>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {company.caseTrustAccredited && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> CaseTrust Accredited
                  </span>
                )}
                {company.hdbRegistrationNo && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <Building className="w-3 h-3" /> HDB Registered ({company.hdbRegistrationNo})
                  </span>
                )}
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
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
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
            >
              {isShortlisted ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-5 gap-4 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'OVERVIEW'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>ACRA & Verification Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('AI_REPORT')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'AI_REPORT'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Diligence Report</span>
          </button>

          <button
            onClick={() => setActiveTab('PORTFOLIO')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'PORTFOLIO'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Portfolios ({company.portfolios.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('REVIEWS')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'REVIEWS'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
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
                <div className="md:col-span-1 p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Overall SafeSpace Score</span>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{company.overallTrustScore}</span>
                    <span className="text-xs text-slate-500">/ 100</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(company.overallTrustScore)}`}>
                    {company.overallTrustScore >= 90 ? 'Tier-1 Verified' : company.overallTrustScore >= 75 ? 'Standard Verified' : 'Caution Advised'}
                  </div>
                </div>

                {/* Score Breakdown Radar */}
                <div className="md:col-span-2 p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <h4 className="font-bold text-white mb-3">5-Pillar Verification Breakdown</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ACRA Registry & Director Integrity</span>
                        <span className="font-mono text-emerald-400">{company.trustScoreBreakdown.acraIntegrity}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${company.trustScoreBreakdown.acraIntegrity}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Credentials, HDB & CaseTrust Licenses</span>
                        <span className="font-mono text-emerald-400">{company.trustScoreBreakdown.credentialsAndLicensing}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${company.trustScoreBreakdown.credentialsAndLicensing}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Financial Stability & Paid-Up Capital</span>
                        <span className="font-mono text-emerald-400">{company.trustScoreBreakdown.financialStability}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${company.trustScoreBreakdown.financialStability}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Verified Homeowner Ratings</span>
                        <span className="font-mono text-emerald-400">{company.trustScoreBreakdown.verifiedCustomerReviews}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${company.trustScoreBreakdown.verifiedCustomerReviews}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Dispute & Court Judgment Record</span>
                        <span className="font-mono text-emerald-400">{company.trustScoreBreakdown.disputeAndCourtRecord}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${company.trustScoreBreakdown.disputeAndCourtRecord}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Red Flags / Warnings Alert Box */}
              {company.redFlags.length > 0 ? (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Red Flag Watchlist Items Identified ({company.redFlags.length})</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                    {company.redFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold block">Clean Compliance Record</span>
                    <span className="text-slate-300">Zero insolvency flags, tribunal judgments, or unauthorized directorship changes recorded.</span>
                  </div>
                </div>
              )}

              {/* ACRA Business Particulars Grid */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs space-y-4">
                <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>ACRA Business Profile Details</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Live Sync</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Unique Entity Number (UEN)</span>
                    <span className="font-mono font-semibold text-slate-100">{company.uen}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Incorporation Year</span>
                    <span className="font-semibold text-slate-100">{company.incorporationYear} ({new Date().getFullYear() - company.incorporationYear} Years Active)</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Paid-Up Capital</span>
                    <span className="font-semibold text-emerald-400">S${company.paidUpCapitalSGD.toLocaleString()}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">HDB Contractor No.</span>
                    <span className="font-semibold text-slate-100">{company.hdbRegistrationNo || 'Not Registered'}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">CaseTrust Bond Policy</span>
                    <span className="font-semibold text-slate-100">{company.caseTrustPolicyNo || 'None'}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">BCA Accreditation</span>
                    <span className="font-semibold text-slate-100">{company.bcaGrade || 'N/A'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-slate-400 text-[11px] flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {company.officeAddress}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-slate-500" /> {company.contactPhone}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: AI DILIGENCE REPORT */}
          {activeTab === 'AI_REPORT' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-white text-base">SafeSpace AI Diligence Summary</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    Gemini 3.6 Flash Intelligence
                  </span>
                </div>

                {/* Key Strengths */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Key Strength Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 pl-2">
                    {company.aiSummary.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Watchouts */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Things to Keep in Mind
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 pl-2">
                    {company.aiSummary.watchouts.map((wo, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{wo}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accreditation Explanation */}
                <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                  <strong className="text-slate-200 block mb-1">Plain English Protection Summary:</strong>
                  {company.aiSummary.accreditationNotes}
                </div>
              </div>

              {/* Action to Ask AI Assistant */}
              {openAiAssistantForCompany && (
                <div className="text-center p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-xs text-slate-300 mb-3">
                    Want personalized questions to ask <strong className="text-white">{company.name}</strong> before signing?
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      openAiAssistantForCompany(company);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs rounded-lg hover:from-emerald-400 hover:to-teal-500 transition-all shadow-md inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
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
                    <div key={portfolio.id} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
                      <div className="relative h-48 bg-slate-900 cursor-pointer" onClick={() => setSelectedImage(portfolio.coverImage)}>
                        <img
                          src={portfolio.coverImage}
                          alt={portfolio.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-slate-700">
                          S${portfolio.renovationCostSGD.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="font-bold text-white text-sm mb-1">{portfolio.title}</h4>
                        <p className="text-xs text-slate-400 mb-2">{portfolio.propertyType} • {portfolio.location}</p>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">{portfolio.description}</p>
                        
                        <div className="mt-auto pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Style: <strong className="text-slate-200">{portfolio.style}</strong></span>
                          <span>Completed in <strong>{portfolio.durationWeeks} wks</strong></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  No public portfolio items uploaded yet.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: VERIFIED REVIEWS */}
          {activeTab === 'REVIEWS' && (
            <div className="space-y-4">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">SafeSpace Review Policy</span>
                  <span className="text-slate-200 font-medium">
                    100% of reviews require Singpass / HDB Title Deed ownership proof before publishing. Zero paid marketing reviews permitted.
                  </span>
                </div>
                <Lock className="w-5 h-5 text-emerald-400 shrink-0 ml-3" />
              </div>

              {company.verifiedReviews.map((review) => (
                <div key={review.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{review.homeownerName}</span>
                      {review.propertyOwnershipVerified && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Property Ownership Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{review.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-[11px]">
                    {review.propertyType} • {review.estateLocation} • Project Cost: S${review.projectCostSGD.toLocaleString()}
                  </p>

                  <p className="text-slate-200 leading-relaxed italic pt-1">
                    "{review.comment}"
                  </p>

                  <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <div>Workmanship: <strong className="text-slate-200">{review.workmanshipScore}/5</strong></div>
                    <div>Timeline: <strong className="text-slate-200">{review.timelineAdherenceScore}/5</strong></div>
                    <div>Budget Specs: <strong className="text-slate-200">{review.budgetTransparencyScore}/5</strong></div>
                    <div>Service: <strong className="text-slate-200">{review.serviceScore}/5</strong></div>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="hidden sm:block text-xs text-slate-400">
            Contact: <a href={`mailto:${company.contactEmail}`} className="text-emerald-400 hover:underline">{company.contactEmail}</a>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => onToggleShortlist(company.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                isShortlisted
                  ? 'bg-slate-800 text-slate-300 border-slate-700'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
            >
              {isShortlisted ? 'In Shortlist' : 'Add to Shortlist'}
            </button>

            <a
              href={`tel:${company.contactPhone}`}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs rounded-lg hover:from-emerald-400 hover:to-teal-500 transition-all shadow-md flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Firm ({company.contactPhone})</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Enlarged Portfolio" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl" />
        </div>
      )}

    </div>
  );
};
