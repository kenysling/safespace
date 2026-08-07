import React from 'react';
import { X, ShieldCheck, Building2, Users, Layers, Award, Target, DollarSign, Scale, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Safe Space — Business Model Canvas</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Singapore Market Architecture
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Solving the industry gap: Regulation in Singapore renovation is in its infancy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Interactive Canvas Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* Key Industry Problem Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-200 block text-xs">Industry Reality & Business Opportunity:</strong>
              <p className="mt-0.5 text-slate-300 text-[11px] leading-relaxed">
                Renovation regulation in Singapore is decentralized across ACRA, HDB, CaseTrust, and BCA. Consumers risk upfront deposit losses and hidden variation orders. Safe Space aggregates live regulatory data and provides a neutral trust platform.
              </p>
            </div>
          </div>

          {/* Business Canvas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Box 1: Key Partners */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-slate-800 pb-2">
                <Users className="w-4 h-4" />
                <span>1. Key Partners</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>CaseTrust Collaboration:</strong> Deposit performance guarantee scheme & accreditation cross-checking.</li>
                <li><strong>ID & Trade Associations:</strong> RCMA & SIDAC partnership for designer standards.</li>
                <li><strong>Government Registry Data:</strong> HDB Licensed RRC directory, ACRA UEN registry, BCA finishing grades.</li>
                <li><strong>Mediators:</strong> Certified independent arbitrators for pre-SCT dispute conciliation.</li>
              </ul>
            </div>

            {/* Box 2: Key Activities */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-bold border-b border-slate-800 pb-2">
                <Layers className="w-4 h-4" />
                <span>2. Key Activities</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Firm Vetting & Auditing:</strong> ACRA paid-up capital, court claims, director history & demerit points checks.</li>
                <li><strong>Homeowner Verification:</strong> Singpass / Title deed property proof to ensure 100% genuine reviews.</li>
                <li><strong>ID Credibility Positioning:</strong> Providing top IDs with verified trust badges.</li>
                <li><strong>Roadshows & Seminars:</strong> BTO handover educational workshops & quotation auditing booth.</li>
              </ul>
            </div>

            {/* Box 3: Value Proposition */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
                <Award className="w-4 h-4" />
                <span>3. Value Propositions</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>For Homeowners:</strong> Total deposit safety, AI quote red-flag detection, neutral dispute mediation.</li>
                <li><strong>For Interior Designers:</strong> Stand out from scam contractors by proving CaseTrust & ACRA financial stability.</li>
                <li><strong>For Industry:</strong> Clean up renovation ecosystem with transparent, non-sponsored ratings.</li>
              </ul>
            </div>

            {/* Box 4: Customer Relationships & Channels */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-slate-800 pb-2">
                <Target className="w-4 h-4" />
                <span>4. Channels & Relationships</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Channels:</strong> Web App, BTO key-collection roadshows, HDB resident portals.</li>
                <li><strong>Relationships:</strong> Trusted advisor role with automated AI assistance + human mediation support.</li>
              </ul>
            </div>

            {/* Box 5: Customer Segments */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold border-b border-slate-800 pb-2">
                <Building2 className="w-4 h-4" />
                <span>5. Customer Segments</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>First-time BTO Buyers:</strong> Need budget guidance & 100% deposit protection.</li>
                <li><strong>Resale HDB / Condo Owners:</strong> Heavy hacking, rewiring & custom carpentry requirements.</li>
                <li><strong>Legitimate ID Firms:</strong> Seeking high-intent, scam-wary Singapore homeowners.</li>
              </ul>
            </div>

            {/* Box 6: Revenue & Cost Structure */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-slate-800 pb-2">
                <DollarSign className="w-4 h-4" />
                <span>6. Revenue Architecture</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Tiered Verification Subscription:</strong> Monthly verification fee for legitimate IDs to display live audit badges.</li>
                <li><strong>Premium Quote Audit API:</strong> Detailed line-item cost analysis for homeowners.</li>
                <li><strong>Neutral Escrow Handling:</strong> Partnership share on CaseTrust deposit insurance administration.</li>
              </ul>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
          >
            Close Canvas
          </button>
        </div>

      </div>

    </div>
  );
};
