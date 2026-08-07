import React, { useState } from 'react';
import { Calculator, ShieldCheck, PieChart as PieIcon, DollarSign, Sparkles, Building2, AlertCircle } from 'lucide-react';

export const BudgetCalculator: React.FC = () => {
  const [flatType, setFlatType] = useState<'3ROOM_BTO' | '4ROOM_BTO' | '5ROOM_BTO' | 'RESALE_HDB' | 'CONDO'>('4ROOM_BTO');
  
  // Customization sliders
  const [hackingMasonry, setHackingMasonry] = useState<number>(12000);
  const [carpentryLiving, setCarpentryLiving] = useState<number>(6000);
  const [carpentryBedrooms, setCarpentryBedrooms] = useState<number>(7500);
  const [carpentryKitchen, setCarpentryKitchen] = useState<number>(8500);
  const [electricalWiring, setElectricalWiring] = useState<number>(4500);
  const [paintingPlumbing, setPaintingPlumbing] = useState<number>(3800);
  const [miscCleaningPermits, setMiscCleaningPermits] = useState<number>(2200);

  // Preset setter
  const handleFlatTypeChange = (type: typeof flatType) => {
    setFlatType(type);
    if (type === '3ROOM_BTO') {
      setHackingMasonry(6000);
      setCarpentryLiving(4000);
      setCarpentryBedrooms(5000);
      setCarpentryKitchen(6500);
      setElectricalWiring(3200);
      setPaintingPlumbing(2800);
      setMiscCleaningPermits(1800);
    } else if (type === '4ROOM_BTO') {
      setHackingMasonry(10000);
      setCarpentryLiving(6000);
      setCarpentryBedrooms(7500);
      setCarpentryKitchen(8500);
      setElectricalWiring(4500);
      setPaintingPlumbing(3800);
      setMiscCleaningPermits(2200);
    } else if (type === '5ROOM_BTO') {
      setHackingMasonry(14000);
      setCarpentryLiving(8000);
      setCarpentryBedrooms(10000);
      setCarpentryKitchen(10500);
      setElectricalWiring(5500);
      setPaintingPlumbing(4500);
      setMiscCleaningPermits(2800);
    } else if (type === 'RESALE_HDB') {
      setHackingMasonry(22000); // Full hacking
      setCarpentryLiving(8500);
      setCarpentryBedrooms(11000);
      setCarpentryKitchen(12000);
      setElectricalWiring(6800);
      setPaintingPlumbing(5800);
      setMiscCleaningPermits(3500);
    } else if (type === 'CONDO') {
      setHackingMasonry(18000);
      setCarpentryLiving(12000);
      setCarpentryBedrooms(14000);
      setCarpentryKitchen(15000);
      setElectricalWiring(8000);
      setPaintingPlumbing(6500);
      setMiscCleaningPermits(4500);
    }
  };

  const subtotalSGD =
    hackingMasonry +
    carpentryLiving +
    carpentryBedrooms +
    carpentryKitchen +
    electricalWiring +
    paintingPlumbing +
    miscCleaningPermits;

  const contingencyBufferSGD = Math.round(subtotalSGD * 0.12); // 12% standard
  const grandTotalSGD = subtotalSGD + contingencyBufferSGD;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Singapore Renovation Budget Calculator</h2>
            <p className="text-xs text-slate-400">Itemized baseline cost estimator for HDB & Condo properties</p>
          </div>
        </div>

        {/* Property Preset Toggles */}
        <div>
          <label className="block text-xs font-bold text-slate-200 mb-2">Select Property Format</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: '3ROOM_BTO', label: '3-Room BTO' },
              { id: '4ROOM_BTO', label: '4-Room BTO' },
              { id: '5ROOM_BTO', label: '5-Room BTO' },
              { id: 'RESALE_HDB', label: 'Full Resale HDB' },
              { id: 'CONDO', label: 'Private Condo' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handleFlatTypeChange(p.id as any)}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  flatType === p.id
                    ? 'bg-teal-500/10 text-teal-300 border-teal-500 font-bold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-800">
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">Hacking, Tiling & Masonry</span>
              <span className="font-mono text-teal-400 font-bold">S${hackingMasonry.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={2000}
              max={35000}
              step={500}
              value={hackingMasonry}
              onChange={(e) => setHackingMasonry(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">Kitchen Carpentry & Countertops</span>
              <span className="font-mono text-teal-400 font-bold">S${carpentryKitchen.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={3000}
              max={25000}
              step={500}
              value={carpentryKitchen}
              onChange={(e) => setCarpentryKitchen(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">Living Room Carpentry & Feature Walls</span>
              <span className="font-mono text-teal-400 font-bold">S${carpentryLiving.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={20000}
              step={500}
              value={carpentryLiving}
              onChange={(e) => setCarpentryLiving(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">Bedrooms Wardrobes & Platform Beds</span>
              <span className="font-mono text-teal-400 font-bold">S${carpentryBedrooms.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={2000}
              max={25000}
              step={500}
              value={carpentryBedrooms}
              onChange={(e) => setCarpentryBedrooms(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">Electrical Wiring & Lighting Points</span>
              <span className="font-mono text-teal-400 font-bold">S${electricalWiring.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1500}
              max={15000}
              step={300}
              value={electricalWiring}
              onChange={(e) => setElectricalWiring(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">Painting & Plumbing Sanitaryware</span>
              <span className="font-mono text-teal-400 font-bold">S${paintingPlumbing.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1500}
              max={12000}
              step={300}
              value={paintingPlumbing}
              onChange={(e) => setPaintingPlumbing(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Calculation Total Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="space-y-1 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span>Direct Works Subtotal:</span>
              <strong className="font-mono text-white">S${subtotalSGD.toLocaleString()}</strong>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <span>Recommended 12% Contingency Buffer:</span>
              <strong className="font-mono">+S${contingencyBufferSGD.toLocaleString()}</strong>
            </div>
            <p className="text-[10px] text-slate-400">
              Contingency covers unforeseen electrical trunking rerouting, HDB ceiling patching, or site variations.
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Target Renovation Budget</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono">
              S${grandTotalSGD.toLocaleString()}
            </span>
          </div>

        </div>

        {/* CaseTrust Advice Box */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-200 block">SafeSpace Payment Milestone Safety Rule:</span>
            <span>
              Never release more than 10-15% deposit upfront. Under CaseTrust escrow guidelines, remaining funds must be disbursed strictly upon physical milestone completion (e.g. 30% Hacking completed, 30% Carpentry delivered, 25% Painting/Tiling finished, 5% Final Retention).
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
