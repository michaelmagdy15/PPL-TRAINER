
import React, { useState, useMemo } from 'react';
import { checklists } from '../checklists';
import { CheckSquare, Square, RefreshCcw, AlertTriangle, Plane, ClipboardList, ChevronRight } from 'lucide-react';

export const Checklist: React.FC = () => {
  const [activeChecklistId, setActiveChecklistId] = useState<string>(checklists[0].id);
  const [checkedItems, setCheckedItems] = useState<Record<string, Record<string, boolean>>>({});

  const activeChecklist = checklists.find(c => c.id === activeChecklistId) || checklists[0];

  const categories = useMemo(() => {
     return [
         { id: 'preflight', label: 'Preflight', icon: ClipboardList, color: 'text-emerald-400' },
         { id: 'normal', label: 'Normal Procedures', icon: Plane, color: 'text-blue-400' },
         { id: 'emergency', label: 'Emergency', icon: AlertTriangle, color: 'text-red-400' },
     ];
  }, []);

  const toggleItem = (checklistId: string, itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [checklistId]: {
        ...prev[checklistId],
        [itemId]: !prev[checklistId]?.[itemId]
      }
    }));
  };

  const resetChecklist = (checklistId: string) => {
    setCheckedItems(prev => {
        const newState = { ...prev };
        delete newState[checklistId];
        return newState;
    });
  };

  const getProgress = (checklistId: string) => {
    const checklist = checklists.find(c => c.id === checklistId);
    if (!checklist) return 0;
    const checkedCount = Object.values(checkedItems[checklistId] || {}).filter(Boolean).length;
    return Math.round((checkedCount / checklist.items.length) * 100);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)] min-h-[600px]">
      {/* Sidebar */}
      <div className="lg:w-80 flex-shrink-0 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Procedures</h3>
        </div>
        
        <div className="overflow-y-auto flex-1 p-2 space-y-6 custom-scrollbar">
            {categories.map(cat => (
                <div key={cat.id}>
                    <div className={`px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${cat.color} opacity-80`}>
                        <cat.icon size={12} />
                        {cat.label}
                    </div>
                    <div className="space-y-1">
                        {checklists.filter(c => c.category === cat.id).map(cl => {
                            const progress = getProgress(cl.id);
                            const isComplete = progress === 100;
                            return (
                                <button
                                    key={cl.id}
                                    onClick={() => setActiveChecklistId(cl.id)}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group ${
                                        activeChecklistId === cl.id 
                                        ? 'bg-slate-800 text-white shadow-lg' 
                                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                    }`}
                                >
                                    <span className="truncate pr-2">{cl.title}</span>
                                    {isComplete && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>}
                                    {!isComplete && progress > 0 && <div className="text-[10px] font-mono text-slate-500">{progress}%</div>}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Main Checklist View */}
      <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col shadow-2xl overflow-hidden relative">
         {/* Header */}
         <div className="p-6 border-b border-slate-800 bg-slate-950/30 flex justify-between items-start">
            <div>
                <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border ${
                    activeChecklist.category === 'emergency' 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                    : activeChecklist.category === 'preflight'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                    {activeChecklist.category === 'emergency' && <AlertTriangle size={10} />}
                    {activeChecklist.category}
                </div>
                <h2 className="text-2xl font-bold text-white">{activeChecklist.title}</h2>
            </div>
            
            <button 
                onClick={() => resetChecklist(activeChecklist.id)}
                className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Reset Checklist"
            >
                <RefreshCcw size={18} />
            </button>
         </div>

         {/* Progress Bar */}
         <div className="h-1 w-full bg-slate-800">
            <div 
                className={`h-full transition-all duration-500 ${
                    activeChecklist.category === 'emergency' ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${getProgress(activeChecklist.id)}%` }}
            />
         </div>

         {/* List Items */}
         <div className="flex-1 overflow-y-auto p-0">
             {activeChecklist.items.map((item, index) => {
                 const isChecked = checkedItems[activeChecklist.id]?.[item.id];
                 return (
                     <div 
                        key={item.id}
                        onClick={() => toggleItem(activeChecklist.id, item.id)}
                        className={`
                            flex items-center gap-4 p-4 border-b border-slate-800/50 cursor-pointer transition-all hover:bg-slate-800/30
                            ${isChecked ? 'bg-slate-800/20' : ''}
                        `}
                     >
                        <div className={`flex-shrink-0 transition-colors ${isChecked ? 'text-blue-500' : 'text-slate-600'}`}>
                            {isChecked ? <CheckSquare size={24} /> : <Square size={24} />}
                        </div>
                        
                        <div className={`flex-1 font-medium transition-opacity ${isChecked ? 'text-slate-500 line-through decoration-slate-600' : 'text-slate-200'}`}>
                            {item.task}
                        </div>

                        <div className={`
                            font-mono text-sm font-bold uppercase tracking-wide
                            ${isChecked ? 'text-slate-600' : activeChecklist.category === 'emergency' ? 'text-red-400' : 'text-blue-400'}
                        `}>
                            {item.action}
                        </div>
                     </div>
                 );
             })}
             
             {/* End of list spacer */}
             <div className="h-20 flex items-center justify-center text-slate-600 text-sm font-mono uppercase tracking-widest opacity-50">
                 --- End of Checklist ---
             </div>
         </div>

         {/* Completion Banner */}
         {getProgress(activeChecklist.id) === 100 && (
             <div className="absolute bottom-6 left-6 right-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center justify-center gap-3 backdrop-blur-md shadow-lg animate-in slide-in-from-bottom-4 fade-in">
                 <CheckSquare size={20} />
                 <span className="font-bold">Checklist Complete</span>
             </div>
         )}
      </div>
    </div>
  );
};
