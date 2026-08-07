import React from 'react';
import { Scale, ShieldCheck, FileText, Lock } from 'lucide-react';

export const DisputeResolutionSection: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-3 text-slate-900">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
          <Scale className="w-3.5 h-3.5 text-teal-600" />
          <span>Consumer Advocacy & Dispute Mediation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          SafeSpace Independent Renovation Mediation Center
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Because Singapore renovation regulations are still evolving, disputes over defect rectifications, project delays, or variation order claims can happen. SafeSpace provides an independent pre-tribunal mediation process to resolve issues before Small Claims Tribunal (SCT).
        </p>
      </div>

      {/* The 4-Step Resolution Framework */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            step: '01',
            title: 'Milestone Escrow Hold',
            desc: 'Under CaseTrust guidelines, 5% retention funds are held until final defect inspection and sign-off.',
            icon: Lock,
            color: 'text-teal-600',
          },
          {
            step: '02',
            title: 'Independent Site Audit',
            desc: 'SafeSpace certified assessors inspect disputed carpentry alignment, moisture leaks, or tiling gaps on-site.',
            icon: FileText,
            color: 'text-sky-600',
          },
          {
            step: '03',
            title: 'Pre-SCT Mediation',
            desc: 'Formal joint conciliation session with contractor directors to agree on binding rectification dates.',
            icon: Scale,
            color: 'text-indigo-600',
          },
          {
            step: '04',
            title: 'Bond / Insurance Claim',
            desc: 'If firm defaults or faces insolvency, CaseTrust deposit performance guarantee policy is executed.',
            icon: ShieldCheck,
            color: 'text-emerald-600',
          },
        ].map((item) => (
          <div key={item.step} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-extrabold text-slate-400">PHASE {item.step}</span>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600 leading-normal">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CaseTrust Escrow Flow Explanation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-4 text-slate-900">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <span>Standard SafeSpace Payment Deposit Protection Schedule</span>
        </h3>
        <p className="text-xs text-slate-600">
          To prevent contractors from taking large sums upfront and abandoning projects, SafeSpace enforces strict payment milestone caps:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Stage 1</span>
            <span className="text-base font-extrabold text-teal-700">10% - 15%</span>
            <span className="text-[10px] text-slate-600 font-medium block mt-1">Contract Signing Deposit</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Stage 2</span>
            <span className="text-base font-extrabold text-slate-800">25% - 30%</span>
            <span className="text-[10px] text-slate-600 font-medium block mt-1">Hacking & Masonry Start</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Stage 3</span>
            <span className="text-base font-extrabold text-slate-800">25% - 30%</span>
            <span className="text-[10px] text-slate-600 font-medium block mt-1">Carpentry On-Site Delivery</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Stage 4</span>
            <span className="text-base font-extrabold text-slate-800">20%</span>
            <span className="text-[10px] text-slate-600 font-medium block mt-1">Painting & Fitting Out</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-2xs">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Stage 5</span>
            <span className="text-base font-extrabold text-teal-700">5% Retention</span>
            <span className="text-[10px] text-slate-600 font-medium block mt-1">14 Days Post Handover</span>
          </div>
        </div>
      </div>

    </section>
  );
};
