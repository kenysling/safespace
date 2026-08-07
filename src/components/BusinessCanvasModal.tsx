import React from 'react';
import { X, ShieldCheck, Building2, Users, Layers, Award, Target, DollarSign, Sparkles } from 'lucide-react';

interface BusinessCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessCanvasModal: React.FC<BusinessCanvasModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-5xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh] text-slate-900">
        
        {/* Header */}
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Safe Space — Business Model Canvas</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                  Singapore Market Architecture
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Solving the industry gap: Regulation in Singapore renovation is in its infancy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Interactive Canvas Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* Key Industry Problem Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-950 block text-xs font-bold">Industry Reality & Business Opportunity:</strong>
              <p className="mt-0.5 text-slate-700 text-[11px] leading-relaxed">
                Renovation regulation in Singapore is decentralized across ACRA, HDB, CaseTrust, and BCA. Consumers risk upfront deposit losses and hidden variation orders. Safe Space aggregates live regulatory data and provides a neutral trust platform.
              </p>
            </div>
          </div>

          {/* Business Canvas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Box 1: Key Partners */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-teal-800 font-bold border-b border-slate-200 pb-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span>1. Key Partners</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li><strong>CaseTrust Collaboration:</strong> Deposit performance guarantee scheme & accreditation cross-checking.</li>
                <li><strong>ID & Trade Associations:</strong> RCMA & SIDAC partnership for designer standards.</li>
                <li><strong>Government Registry Data:</strong> HDB Licensed RRC directory, ACRA UEN registry, BCA finishing grades.</li>
                <li><strong>Mediators:</strong> Certified independent arbitrators for pre-SCT dispute conciliation.</li>
              </ul>
            </div>

            {/* Box 2: Key Activities */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-teal-800 font-bold border-b border-slate-200 pb-2">
                <Layers className="w-4 h-4 text-teal-600" />
                <span>2. Key Activities</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li><strong>Firm Vetting & Auditing:</strong> ACRA paid-up capital, court claims, director history & demerit points checks.</li>
                <li><strong>Homeowner Verification:</strong> Singpass / Title deed property proof to ensure 100% genuine reviews.</li>
                <li><strong>ID Credibility Positioning:</strong> Providing top IDs with verified trust badges.</li>
                <li><strong>Roadshows & Seminars:</strong> BTO handover educational workshops & quotation auditing booth.</li>
              </ul>
            </div>

            {/* Box 3: Value Proposition */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-sky-800 font-bold border-b border-slate-200 pb-2">
                <Award className="w-4 h-4 text-sky-600" />
                <span>3. Value Propositions</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li><strong>For Homeowners:</strong> Total deposit safety, AI quote red-flag detection, neutral dispute mediation.</li>
                <li><strong>For Interior Designers:</strong> Stand out from scam contractors by proving CaseTrust & ACRA financial stability.</li>
                <li><strong>For Industry:</strong> Clean up renovation ecosystem with transparent, non-sponsored ratings.</li>
              </ul>
            </div>

            {/* Box 4: Customer Relationships & Channels */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-sky-800 font-bold border-b border-slate-200 pb-2">
                <Target className="w-4 h-4 text-sky-600" />
                <span>4. Channels & Relationships</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li><strong>Channels:</strong> Web App, BTO key-collection roadshows, HDB resident portals.</li>
                <li><strong>Relationships:</strong> Trusted advisor role with automated AI assistance + human mediation support.</li>
              </ul>
            </div>

            {/* Box 5: Customer Segments */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-indigo-800 font-bold border-b border-slate-200 pb-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>5. Customer Segments</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li><strong>First-time BTO Buyers:</strong> Need budget guidance & 100% deposit protection.</li>
                <li><strong>Resale HDB / Condo Owners:</strong> Heavy hacking, rewiring & custom carpentry requirements.</li>
                <li><strong>Legitimate ID Firms:</strong> Seeking high-intent, scam-wary Singapore homeowners.</li>
              </ul>
            </div>

            {/* Box 6: Revenue & Cost Structure */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-800 font-bold border-b border-slate-200 pb-2">
                <DollarSign className="w-4 h-4 text-amber-600" />
                <span>6. Revenue Architecture</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li><strong>Tiered Verification Subscription:</strong> Monthly verification fee for legitimate IDs to display live audit badges.</li>
                <li><strong>Premium Quote Audit API:</strong> Detailed line-item cost analysis for homeowners.</li>
                <li><strong>Neutral Escrow Handling:</strong> Partnership share on CaseTrust deposit insurance administration.</li>
              </ul>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            Close Canvas
          </button>
        </div>

      </div>

    </div>
  );
};
