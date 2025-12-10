
import React, { useState } from 'react';
import { SpeedQuiz } from './components/SpeedQuiz';
import { ManeuverViewer } from './components/ManeuverViewer';
import { WeightBalance } from './components/WeightBalance';
import { Checklist } from './components/Checklist';
import { Plane, Gauge, Scale, BookOpen, AlertTriangle, Menu, ClipboardCheck } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'maneuvers' | 'speeds' | 'wnb' | 'checklist' | 'emergencies'>('maneuvers');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ id, label, icon: Icon, disabled = false }: { id: string, label: string, icon: any, disabled?: boolean }) => (
    <button
      onClick={() => {
        if (!disabled) {
          setActiveTab(id as any);
          setMobileMenuOpen(false);
        }
      }}
      disabled={disabled}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-r-full border-l-4 transition-all duration-200 group ${
        activeTab === id 
          ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
          : 'border-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      <Icon size={20} className={activeTab === id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
      <span className="font-medium tracking-wide">{label}</span>
      {disabled && <span className="text-[10px] ml-auto border border-slate-700 text-slate-500 px-1.5 py-0.5 rounded font-mono">SOON</span>}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-200 font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-100">
           <Plane className="text-blue-500" /> Dento Trainer
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-400 hover:text-white">
          <Menu />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-64 bg-slate-950 border-r border-slate-800 flex flex-col z-20 transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 pb-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tight">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Plane className="text-white" size={24} />
            </div>
            <span>Dento<span className="text-blue-500">Trainer</span></span>
          </h1>
          <p className="text-xs font-mono text-slate-500 mt-2 pl-1">VIRUS SW 121 / EXPLORER</p>
        </div>

        <nav className="flex-1 py-6 pr-4 space-y-1">
          <NavItem id="maneuvers" label="Maneuvers" icon={BookOpen} />
          <NavItem id="checklist" label="Checklists" icon={ClipboardCheck} />
          <NavItem id="speeds" label="V-Speed Quiz" icon={Gauge} />
          <NavItem id="wnb" label="Mass & Balance" icon={Scale} />
          <NavItem id="emergencies" label="Emergencies" icon={AlertTriangle} />
        </nav>

        <div className="p-6">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-400 block mb-1">DISCLAIMER</strong>
            For simulation and study aid only. Not for real flight navigation or operational use.
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-900/30 text-blue-400 border border-blue-900/50">PPL SYLLABUS</span>
                 <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">V.1.0</span>
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tight">
                {activeTab === 'maneuvers' && 'Flight Maneuvers'}
                {activeTab === 'checklist' && 'Checklists'}
                {activeTab === 'speeds' && 'Speed Limitations'}
                {activeTab === 'wnb' && 'Mass & Balance'}
                {activeTab === 'emergencies' && 'Emergency Procedures'}
              </h2>
              <p className="text-slate-400 mt-2 text-lg font-light max-w-2xl">
                {activeTab === 'maneuvers' && 'Interactive visualizations for standard operating procedures and flight patterns.'}
                {activeTab === 'checklist' && 'Step-by-step checklists for normal, abnormal and emergency procedures.'}
                {activeTab === 'speeds' && 'Master the critical V-speeds for the Pipistrel Virus SW 121.'}
                {activeTab === 'wnb' && 'Interactive load sheet calculator and CG envelope verification.'}
                {activeTab === 'emergencies' && 'Critical memory items and procedures for abnormal situations.'}
              </p>
            </div>
          </header>

          <div className="min-h-[500px] animate-fade-in">
            {activeTab === 'maneuvers' && <ManeuverViewer category="normal" />}
            {activeTab === 'checklist' && <Checklist />}
            {activeTab === 'speeds' && <SpeedQuiz />}
            {activeTab === 'wnb' && <WeightBalance />}
            {activeTab === 'emergencies' && <ManeuverViewer category="emergency" />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
