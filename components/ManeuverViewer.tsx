import React, { useState, useMemo } from 'react';
import { maneuvers } from '../data';
import { ChevronLeft, ChevronRight, Plane, Target } from 'lucide-react';
import { FlightVisualization } from './FlightVisualization';

interface ManeuverViewerProps {
    category?: 'normal' | 'emergency';
}

export const ManeuverViewer: React.FC<ManeuverViewerProps> = ({ category = 'normal' }) => {
  const [activeManeuverId, setActiveManeuverId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Filter maneuvers based on category strategy
  // We'll define "Emergency" based on specific IDs or keywords for now since we didn't add a 'category' field to types.ts yet.
  // In a real app, adding a 'category' field to the data model is cleaner.
  const emergencyIds = [
      'golden-rules', 'emergency-engine-downwind', 'engine-fire', 'cabin-fire', 
      'efato', 'restart-in-flight', 'partial-power', 'emergency-descent', 'steep-spiral'
  ];

  const filteredManeuvers = useMemo(() => {
      if (category === 'emergency') {
          return maneuvers.filter(m => emergencyIds.includes(m.id));
      }
      return maneuvers.filter(m => !emergencyIds.includes(m.id));
  }, [category]);

  // Set initial maneuver if none selected
  React.useEffect(() => {
      if (filteredManeuvers.length > 0 && !activeManeuverId) {
          setActiveManeuverId(filteredManeuvers[0].id);
      }
      // If separate tabs switch, reset selection to first of that category
      if (filteredManeuvers.length > 0 && activeManeuverId && !filteredManeuvers.find(m => m.id === activeManeuverId)) {
        setActiveManeuverId(filteredManeuvers[0].id);
        setCurrentStep(0);
      }
  }, [category, filteredManeuvers, activeManeuverId]);

  const activeManeuver = filteredManeuvers.find(m => m.id === activeManeuverId) || filteredManeuvers[0];
  const step = activeManeuver ? activeManeuver.steps[currentStep] : null;

  const nextStep = () => {
    if (activeManeuver && currentStep < activeManeuver.steps.length - 1) {
      setCurrentStep(c => c + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1);
    }
  };

  if (!activeManeuver || !step) return <div>No maneuvers found.</div>;

  // Default sim state if missing
  const defaultSimState = { pitch: 0, bank: 0, heading: 0, altitude: 0, power: 0, flaps: 0 };

  return (
    <div className="flex flex-col xl:flex-row gap-8 h-full">
      {/* Sidebar Selection */}
      <div className="xl:w-80 flex-shrink-0 flex flex-col gap-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono sticky top-0 bg-slate-950 py-2 z-10">Select Procedure</h3>
        {filteredManeuvers.map((m) => (
          <button
            key={m.id}
            onClick={() => { setActiveManeuverId(m.id); setCurrentStep(0); }}
            className={`text-left p-4 rounded-xl border transition-all duration-200 group ${
              m.id === activeManeuverId 
                ? category === 'emergency' 
                    ? 'bg-slate-800 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)] ring-1 ring-red-500/20' 
                    : 'bg-slate-800 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800'
            }`}
          >
            <div className={`font-bold mb-1 ${m.id === activeManeuverId ? 'text-white' : 'text-slate-300'}`}>{m.title}</div>
            <div className="text-xs opacity-60 line-clamp-2">{m.objective}</div>
          </button>
        ))}
      </div>

      {/* Main Viewer */}
      <div className="flex-1 flex flex-col min-h-[600px]">
        <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col flex-grow relative group">
          
          {/* 3D Visual Header */}
          <div className="h-96 relative border-b border-slate-800 bg-slate-950">
             <FlightVisualization 
                simState={step.simState || defaultSimState} 
                title={step.action}
             />
             
             {/* Progress Bar */}
             <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-800/50 z-20">
                <div 
                    className={`h-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500 ease-out ${category === 'emergency' ? 'bg-gradient-to-r from-red-600 to-orange-400' : 'bg-gradient-to-r from-blue-600 to-cyan-400'}`}
                    style={{ width: `${((currentStep + 1) / activeManeuver.steps.length) * 100}%` }}
                />
             </div>
          </div>

          {/* Content Body */}
          <div className="p-8 md:p-10 flex-grow flex flex-col justify-between bg-slate-900">
            <div>
                <div className="flex items-center justify-between mb-4">
                     <h4 className={`${category === 'emergency' ? 'text-red-400' : 'text-blue-400'} font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2`}>
                      <span className={`w-8 h-[1px] ${category === 'emergency' ? 'bg-red-400/50' : 'bg-blue-400/50'}`}></span>
                      Action Required
                    </h4>
                    <span className={`${category === 'emergency' ? 'bg-red-600/20 text-red-300 border-red-500/30' : 'bg-blue-600/20 text-blue-300 border-blue-500/30'} px-3 py-1 rounded-full text-xs font-mono font-bold border`}>
                        STEP {currentStep + 1} / {activeManeuver.steps.length}
                    </span>
                </div>
               
                <h2 className="text-3xl font-bold text-white mb-4">{step.action}</h2>
                <p className="text-xl text-slate-300 leading-relaxed font-light">{step.description}</p>
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-800">
                <button 
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="group flex items-center gap-3 px-6 py-3 rounded-lg font-semibold disabled:opacity-20 disabled:cursor-not-allowed hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Previous
                </button>

                <div className="flex gap-3">
                    {activeManeuver.steps.map((_, idx) => (
                        <div 
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === currentStep 
                                ? category === 'emergency' ? 'w-8 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'w-8 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' 
                                : 'w-2 bg-slate-700'
                            }`}
                        />
                    ))}
                </div>

                <button 
                    onClick={nextStep}
                    disabled={currentStep === activeManeuver.steps.length - 1}
                    className={`group flex items-center gap-3 px-8 py-3 text-white rounded-lg font-semibold disabled:opacity-50 disabled:grayscale transition-all shadow-lg ${
                        category === 'emergency' 
                        ? 'bg-gradient-to-r from-red-600 to-red-500 hover:to-red-400 hover:shadow-red-500/25' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:to-blue-400 hover:shadow-blue-500/25'
                    }`}
                >
                    Next <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-slate-900/50 border border-slate-800/50 p-5 rounded-xl flex items-start gap-4 text-slate-400">
            <div className="p-2 bg-slate-800 rounded-lg text-emerald-400">
              <Target size={20} />
            </div>
            <div>
              <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">Objective</span>
              <p className="text-sm">{activeManeuver.objective}</p>
            </div>
        </div>
      </div>
    </div>
  );
};