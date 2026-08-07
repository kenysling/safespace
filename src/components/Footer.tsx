import React from 'react';
import { ShieldCheck, Building2, Scale, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenBusinessCanvas: () => void;
  setActiveTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBusinessCanvas, setActiveTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-bold text-white tracking-tight">
                SAFE<span className="text-emerald-400">SPACE</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Singapore’s independent interior designer discovery & trust platform. Auditing ACRA registries, HDB licenses, CaseTrust deposit performance bonds, and verified homeowner reviews.
            </p>
            <button
              onClick={onOpenBusinessCanvas}
              className="text-emerald-400 font-semibold hover:underline text-[11px] flex items-center gap-1"
            >
              <span>View Business Model Canvas</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Col 2: Platform Shortcuts */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs">Platform Tools</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li><button onClick={() => setActiveTab('directory')} className="hover:text-emerald-400">Verified ID Directory</button></li>
              <li><button onClick={() => setActiveTab('matching')} className="hover:text-emerald-400">Smart Designer Match Wizard</button></li>
              <li><button onClick={() => setActiveTab('quote')} className="hover:text-emerald-400">AI Quotation Auditor & Red Flag Detector</button></li>
              <li><button onClick={() => setActiveTab('calculator')} className="hover:text-emerald-400">Singapore Renovation Budget Calculator</button></li>
              <li><button onClick={() => setActiveTab('dispute')} className="hover:text-emerald-400">Pre-SCT Dispute Mediation Framework</button></li>
            </ul>
          </div>

          {/* Col 3: Regulatory Integrations */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs">Regulatory Data Sources</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>• ACRA (Accounting and Corporate Regulatory Authority) UEN Directory</li>
              <li>• HDB Registered Renovation Contractor (RRC) Scheme</li>
              <li>• CaseTrust Deposit Performance Guarantee Scheme</li>
              <li>• BCA (Building and Construction Authority) Finishing Work Grades</li>
              <li>• Singapore Mediation Centre Conciliation Protocols</li>
            </ul>
          </div>

          {/* Col 4: Consumer Protection Notice */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SafeSpace Guarantee</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Never pay more than 10-15% deposit upfront upon signing. Always verify CaseTrust insurance policy numbers before transferring funds.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>© {new Date().getFullYear()} Safe Space Singapore Pte. Ltd. All Rights Reserved.</span>
          <span>Designed with care for Singapore Homeowners (HDB BTO, Resale, Condo, Landed)</span>
        </div>

      </div>
    </footer>
  );
};
