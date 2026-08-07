import React, { useState } from 'react';
import { CompanyProfile, PropertyType, DesignStyle, MatchingPreferences } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, BookmarkCheck, RefreshCw } from 'lucide-react';

interface SmartMatchWizardProps {
  companies: CompanyProfile[];
  onSelectCompany: (company: CompanyProfile) => void;
  shortlistedIds: string[];
  onToggleShortlist: (companyId: string) => void;
}

export const SmartMatchWizard: React.FC<SmartMatchWizardProps> = ({
  companies,
  onSelectCompany,
  shortlistedIds,
  onToggleShortlist,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [preferences, setPreferences] = useState<MatchingPreferences>({
    propertyType: 'HDB_BTO',
    estateName: 'Tampines GreenGem',
    rooms: '4-Room',
    floorAreaSqft: 1000,
    budgetSGD: 55000,
    targetStyle: 'JAPANDI',
    keyPriorities: ['CASETRUST_DEPOSIT', 'HDB_LICENSED'],
    targetMoveInMonths: 3,
  });

  const [matches, setMatches] = useState<Array<{ company: CompanyProfile; matchScore: number; reasons: string[] }> | null>(null);

  const handlePriorityToggle = (priority: string) => {
    setPreferences((prev) => {
      const exists = prev.keyPriorities.includes(priority);
      return {
        ...prev,
        keyPriorities: exists
          ? prev.keyPriorities.filter((p) => p !== priority)
          : [...prev.keyPriorities, priority],
      };
    });
  };

  const calculateMatches = () => {
    const scored = companies.map((comp) => {
      let score = 50; // base score
      const reasons: string[] = [];

      // Property Type Match
      if (comp.projectTypes.includes(preferences.propertyType)) {
        score += 15;
        reasons.push(`Specializes in ${preferences.propertyType.replace('_', ' ')} projects`);
      }

      // Design Style Match
      if (comp.designStyles.includes(preferences.targetStyle)) {
        score += 15;
        reasons.push(`Strong portfolio in ${preferences.targetStyle.replace('_', ' ')} aesthetics`);
      }

      // Budget Fit
      if (preferences.budgetSGD >= comp.priceRangeSGD.min && preferences.budgetSGD <= comp.priceRangeSGD.max) {
        score += 10;
        reasons.push('Package pricing fits within your S$' + preferences.budgetSGD.toLocaleString() + ' budget range');
      }

      // Safety Priorities
      if (preferences.keyPriorities.includes('CASETRUST_DEPOSIT') && comp.caseTrustAccredited) {
        score += 10;
        reasons.push('100% CaseTrust Deposit Performance Guarantee');
      }

      if (preferences.keyPriorities.includes('HDB_LICENSED') && comp.hdbStatus === 'REGISTERED') {
        score += 10;
        reasons.push('Verified HDB Registered Contractor');
      }

      if (preferences.keyPriorities.includes('LOW_RISK') && comp.redFlagRating === 'LOW_RISK') {
        score += 10;
        reasons.push('Clean compliance history with zero red flag warnings');
      }

      // Cap at 99% max
      const finalScore = Math.min(score, 99);

      return {
        company: comp,
        matchScore: finalScore,
        reasons,
      };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    setMatches(scored);
    setStep(5); // Results step
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Wizard Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 text-slate-900">
        
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Smart Match Designer Wizard</h2>
              <p className="text-xs text-slate-500">Match with top verified IDs based on budget, style & protection needs</p>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-500">
            Step <span className="text-teal-700 font-extrabold">{step}</span> of 4
          </div>
        </div>

        {/* STEP 1: PROPERTY SPECS */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2">Select Your Property Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'HDB_BTO', label: 'HDB BTO Flat' },
                  { id: 'HDB_RESALE', label: 'HDB Resale Flat' },
                  { id: 'CONDO', label: 'Private Condo' },
                  { id: 'LANDED', label: 'Landed Property' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, propertyType: item.id as PropertyType })}
                    className={`p-3.5 rounded-xl border text-xs font-bold transition-all ${
                      preferences.propertyType === item.id
                        ? 'bg-teal-50 text-teal-800 border-teal-300 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estate Name / BTO Launch Name</label>
                <input
                  type="text"
                  value={preferences.estateName}
                  onChange={(e) => setPreferences({ ...preferences, estateName: e.target.value })}
                  placeholder="e.g. Tampines GreenGem, Bidadari"
                  className="w-full bg-white text-xs text-slate-900 border border-slate-200 rounded-xl p-2.5 focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Floor Area (sqft)</label>
                <input
                  type="number"
                  value={preferences.floorAreaSqft}
                  onChange={(e) => setPreferences({ ...preferences, floorAreaSqft: Number(e.target.value) })}
                  className="w-full bg-white text-xs text-slate-900 border border-slate-200 rounded-xl p-2.5 focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Next: Budget & Style</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: BUDGET & STYLE */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-900">Target Renovation Budget (SGD)</label>
                <span className="text-sm font-extrabold text-teal-700">S${preferences.budgetSGD.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={200000}
                step={5000}
                value={preferences.budgetSGD}
                onChange={(e) => setPreferences({ ...preferences, budgetSGD: Number(e.target.value) })}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>S$20,000 (Minor Works)</span>
                <span>S$60,000 (Full 4-Room Overhaul)</span>
                <span>S$200,000+ (Luxe Custom)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2">Preferred Design Aesthetic</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'JAPANDI', label: 'Japandi (Japanese + Scandi)' },
                  { id: 'MODERN_MINIMALIST', label: 'Modern Minimalist' },
                  { id: 'SCANDINAVIAN', label: 'Nordic Scandinavian' },
                  { id: 'WABI_SABI', label: 'Wabi-Sabi Organic' },
                  { id: 'LUXURY_MODERN', label: 'Modern Luxe' },
                  { id: 'INDUSTRIAL', label: 'Industrial Chic' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreferences({ ...preferences, targetStyle: item.id as DesignStyle })}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      preferences.targetStyle === item.id
                        ? 'bg-teal-50 text-teal-800 border-teal-300 shadow-2xs font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Next: Protection Preferences</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PROTECTION & COMPLIANCE */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2">Select Your Non-Negotiable Safety Priorities</label>
              <div className="space-y-3">
                {[
                  {
                    id: 'CASETRUST_DEPOSIT',
                    title: '100% CaseTrust Deposit Performance Guarantee',
                    desc: 'Protects upfront deposits via insurance bond so your money is 100% safe if a contractor faces insolvency.',
                  },
                  {
                    id: 'HDB_LICENSED',
                    title: 'HDB Registered Renovation Contractor (RRC)',
                    desc: 'Ensures legal permit filings for hacking load-bearing walls, window replacements, and electrical submissions.',
                  },
                  {
                    id: 'LOW_RISK',
                    title: 'Zero Red Flag Compliance Record',
                    desc: 'Excludes any firms with directorship changes in the past 12 months or Small Claims Tribunal dispute filings.',
                  },
                ].map((item) => {
                  const isChecked = preferences.keyPriorities.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handlePriorityToggle(item.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-teal-50/80 border-teal-300 text-slate-900 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${isChecked ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 bg-white'}`}>
                          {isChecked && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={calculateMatches}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Calculate Best Matches</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: MATCH RESULTS */}
        {step === 5 && matches && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center py-2 border-b border-slate-200">
              <h3 className="text-xl font-extrabold text-slate-900">Your Curated SafeSpace Shortlist</h3>
              <p className="text-xs text-slate-500 mt-1">
                Calculated for a <strong className="text-teal-700">{preferences.propertyType.replace('_', ' ')}</strong> ({preferences.estateName}) with budget S${preferences.budgetSGD.toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              {matches.slice(0, 3).map(({ company, matchScore, reasons }, idx) => (
                <div key={company.id} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-teal-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-sm font-extrabold text-teal-800 shrink-0">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">{company.name}</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          {matchScore}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{company.tagline}</p>
                      
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {reasons.map((r, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-lg bg-white text-[10px] text-slate-700 border border-slate-200 flex items-center gap-1 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-teal-600" /> {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                    <button
                      onClick={() => onToggleShortlist(company.id)}
                      className={`p-2 rounded-xl border text-xs font-semibold ${
                        shortlistedIds.includes(company.id)
                          ? 'bg-teal-600 text-white border-teal-500'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <BookmarkCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectCompany(company)}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs"
                    >
                      Inspect ACRA Profile
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div className="text-center pt-4 border-t border-slate-200">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-teal-700 flex items-center gap-1 mx-auto transition-colors font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Matching Questionnaire
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
