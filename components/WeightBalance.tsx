import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceLine } from 'recharts';

export const WeightBalance: React.FC = () => {
  const [pilot, setPilot] = useState(80);
  const [coPilot, setCoPilot] = useState(0);
  const [fuelLiters, setFuelLiters] = useState(30);
  const [baggage, setBaggage] = useState(0);

  const EMPTY_WEIGHT = 371;
  const EMPTY_ARM = 245;
  const ARM_PILOT = 370;
  const ARM_FUEL = 215;
  const ARM_BAGGAGE = 1160;
  const FUEL_WEIGHT = fuelLiters * 1; 

  const totalWeight = useMemo(() => {
    return EMPTY_WEIGHT + pilot + coPilot + FUEL_WEIGHT + baggage;
  }, [pilot, coPilot, FUEL_WEIGHT, baggage]);

  const totalMoment = useMemo(() => {
    return (
      (EMPTY_WEIGHT * EMPTY_ARM) +
      ((pilot + coPilot) * ARM_PILOT) +
      (FUEL_WEIGHT * ARM_FUEL) +
      (baggage * ARM_BAGGAGE)
    );
  }, [pilot, coPilot, FUEL_WEIGHT, baggage]);

  const cg = useMemo(() => {
    return Math.round(totalMoment / totalWeight);
  }, [totalMoment, totalWeight]);

  const mac = 898;
  const leadingEdge = 43;
  const cgPercentMac = useMemo(() => {
      return ((cg - leadingEdge) / mac) * 100;
  }, [cg]);

  const MAX_WEIGHT = 600;
  const MIN_ARM = 267;
  const MAX_ARM = 356;
  const isSafe = totalWeight <= MAX_WEIGHT && cg >= MIN_ARM && cg <= MAX_ARM;

  const currentPoint = [{ x: cg, y: totalWeight }];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Input Section - EFB Style */}
      <div className="lg:w-1/3 bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            LOAD SHEET
        </h3>
        
        <div className="space-y-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-mono font-bold text-slate-500 mb-2 uppercase tracking-wider">Pilot & Co-Pilot</label>
            <div className="flex gap-4">
                <div className="flex-1">
                    <span className="text-xs text-slate-400 mb-1 block">Left Seat (kg)</span>
                    <input 
                    type="number" 
                    value={pilot} 
                    onChange={(e) => setPilot(Number(e.target.value))}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-mono text-lg transition-all"
                    />
                </div>
                <div className="flex-1">
                    <span className="text-xs text-slate-400 mb-1 block">Right Seat (kg)</span>
                    <input 
                    type="number" 
                    value={coPilot} 
                    onChange={(e) => setCoPilot(Number(e.target.value))}
                    className="w-full bg-slate-800 text-white p-2.5 rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-mono text-lg transition-all"
                    />
                </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between mb-2">
                 <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Fuel</label>
                 <span className="text-xs font-mono text-blue-400">{fuelLiters} L = {FUEL_WEIGHT} kg</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={fuelLiters} 
              onChange={(e) => setFuelLiters(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
            />
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-mono font-bold text-slate-500 mb-2 uppercase tracking-wider">Baggage (kg)</label>
            <input 
              type="number" 
              value={baggage} 
              onChange={(e) => setBaggage(Number(e.target.value))}
              className="w-full bg-slate-800 text-white p-2.5 rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-mono text-lg transition-all"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/50">
            <div className={`text-center p-5 rounded-xl border transition-all duration-300 ${isSafe ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-red-900/20 border-red-500/30 text-red-400 animate-pulse'}`}>
                <div className="text-4xl font-bold font-mono tracking-tighter">{totalWeight} <span className="text-lg opacity-60 font-sans">kg</span></div>
                <div className="text-xs font-bold uppercase tracking-widest mt-1 flex items-center justify-center gap-2">
                    {isSafe ? <div className="w-2 h-2 rounded-full bg-emerald-500"></div> : <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                    {isSafe ? 'Within Limits' : 'OUT OF LIMITS'}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-slate-500 mb-1">C.G. ARM</div>
                    <div className="text-white text-lg font-bold">{cg} mm</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                    <div className="text-slate-500 mb-1">MAC %</div>
                    <div className="text-white text-lg font-bold">{cgPercentMac.toFixed(1)}%</div>
                </div>
            </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="lg:w-2/3 bg-slate-900 p-6 md:p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col min-h-[400px]">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
             C.G. ENVELOPE
        </h3>
        <div className="flex-grow bg-slate-950/50 rounded-xl border border-slate-800 p-4">
            <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="CG Arm" 
                    unit="mm" 
                    domain={[200, 400]} 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                    label={{ value: 'CG Arm (mm)', position: 'insideBottom', offset: -10, fill: '#64748b' }}
                />
                <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Weight" 
                    unit="kg" 
                    domain={[300, 650]}
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                    label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                />
                <Tooltip 
                    cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }} 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#f8fafc' }}
                />
                
                {/* Safe Envelope Box */}
                <ReferenceArea x1={MIN_ARM} x2={MAX_ARM} y1={300} y2={MAX_WEIGHT} stroke="none" fill="#22c55e" fillOpacity={0.1} />
                <ReferenceLine x={MIN_ARM} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'FWD', fill: '#22c55e', fontSize: 10 }} />
                <ReferenceLine x={MAX_ARM} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'AFT', fill: '#22c55e', fontSize: 10 }} />
                <ReferenceLine y={MAX_WEIGHT} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'MTOW', fill: '#ef4444', fontSize: 10, position: 'insideTopLeft' }} />

                <Scatter name="Current CG" data={currentPoint} fill={isSafe ? "#4ade80" : "#f87171"} shape="cross" />
                {/* Add a specific highlight circle around the point */}
                <Scatter data={currentPoint} fill="none" stroke={isSafe ? "#4ade80" : "#f87171"} strokeWidth={2} shape="circle" />
            </ScatterChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};