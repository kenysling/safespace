import React, { useState } from 'react';
import { CompanyProfile } from '../types';
import { CompanyCard } from './CompanyCard';
import { BookmarkCheck, ShieldCheck, CheckCircle2, Upload, Star } from 'lucide-react';

interface HomeownerTrustPortalProps {
  companies: CompanyProfile[];
  shortlistedIds: string[];
  onToggleShortlist: (id: string) => void;
  onSelectCompany: (company: CompanyProfile) => void;
}

export const HomeownerTrustPortal: React.FC<HomeownerTrustPortalProps> = ({
  companies,
  shortlistedIds,
  onToggleShortlist,
  onSelectCompany,
}) => {
  const shortlistedCompanies = companies.filter((c) => shortlistedIds.includes(c.id));

  // Verification upload state
  const [isVerified, setIsVerified] = useState(false);
  const [propertyAddress, setPropertyAddress] = useState('Blk 123 Tampines GreenGem #08-45');

  // Review Form state
  const [selectedFirmId, setSelectedFirmId] = useState<string>(companies[0]?.id || '');
  const [rating, setRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTimeout(() => {
        setIsVerified(true);
      }, 1000);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    setReviewSubmitted(true);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Portal Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-slate-900">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900">Homeowner Protection & Shortlist Center</h2>
            {isVerified ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Singpass Ownership Verified
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                Verification Pending
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Track your saved firms, verify property ownership proof, and submit authentic review ratings.
          </p>
        </div>

        {/* Verification Status Card */}
        {!isVerified ? (
          <label className="cursor-pointer px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0">
            <Upload className="w-4 h-4" />
            <span>Upload HDB/Singpass Property Proof</span>
            <input type="file" onChange={handleSimulatedUpload} className="hidden" accept="image/*,.pdf" />
          </label>
        ) : (
          <div className="text-xs text-teal-800 font-semibold bg-teal-50 p-3 rounded-xl border border-teal-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Property: {propertyAddress} (Verified)</span>
          </div>
        )}
      </div>

      {/* SECTION 1: SHORTLISTED FIRMS */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookmarkCheck className="w-5 h-5 text-teal-600" />
          <span>My Saved Shortlist ({shortlistedCompanies.length})</span>
        </h3>

        {shortlistedCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlistedCompanies.map((comp) => (
              <CompanyCard
                key={comp.id}
                company={comp}
                onSelect={onSelectCompany}
                isShortlisted={true}
                onToggleShortlist={onToggleShortlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <p className="text-xs text-slate-600 font-medium mb-1">No companies added to your shortlist yet.</p>
            <p className="text-[11px] text-slate-500">
              Browse the Verified Directory and click the bookmark icon to save ID firms for quote comparisons.
            </p>
          </div>
        )}
      </div>

      {/* SECTION 2: SUBMIT VERIFIED HOMEOWNER REVIEW */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-4 text-slate-900">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Submit a Verified Homeowner Review</span>
        </h3>
        <p className="text-xs text-slate-500">
          To maintain 100% platform integrity, submitted reviews are verified against property title deeds or Singpass address matches.
        </p>

        {reviewSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block text-emerald-950">Review Submitted for Verification!</span>
              <span className="text-slate-600">Your review is currently pending ownership cross-check against HDB/ACRA records.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Interior Designer / Contractor</label>
                <select
                  value={selectedFirmId}
                  onChange={(e) => setSelectedFirmId(e.target.value)}
                  className="w-full bg-white text-xs text-slate-900 border border-slate-200 rounded-xl p-2.5 focus:border-teal-500 focus:outline-none"
                >
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (UEN: {c.uen})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Overall Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-1 py-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${s <= rating ? 'fill-amber-500' : 'text-slate-300'}`} />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-800">{rating}.0 / 5.0</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Review & Experience</label>
              <textarea
                rows={4}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share workmanship feedback, timeline adherence, and whether there were any variation order surprises..."
                className="w-full bg-slate-50 text-xs text-slate-900 border border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!reviewComment.trim()}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs disabled:opacity-50"
            >
              Submit Review for Verification
            </button>
          </form>
        )}
      </div>

    </section>
  );
};
