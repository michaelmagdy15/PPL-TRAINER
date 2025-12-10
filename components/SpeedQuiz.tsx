import React, { useState, useEffect } from 'react';
import { vSpeeds } from '../data';
import { VSpeed } from '../types';
import { Trophy, AlertCircle, RefreshCw, CheckCircle2, Gauge } from 'lucide-react';

export const SpeedQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<VSpeed | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateQuestion = () => {
    const randomIdx = Math.floor(Math.random() * vSpeeds.length);
    const question = vSpeeds[randomIdx];
    
    // Generate 3 wrong answers close to real answer
    const wrongAnswers = new Set<number>();
    while(wrongAnswers.size < 3) {
        const offset = Math.floor(Math.random() * 30) - 15;
        const wrong = question.speed + offset;
        if(wrong !== question.speed && wrong > 30 && wrong < 180) {
            wrongAnswers.add(wrong);
        }
    }
    
    const allOptions = [question.speed, ...Array.from(wrongAnswers)].sort((a, b) => a - b);
    
    setCurrentQuestion(question);
    setOptions(allOptions);
    setFeedback(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (selectedSpeed: number) => {
    if (!currentQuestion) return;
    
    if (selectedSpeed === currentQuestion.speed) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      setFeedback('correct');
      setTimeout(generateQuestion, 1200);
    } else {
      setStreak(0);
      setFeedback('wrong');
    }
  };

  if (!currentQuestion) return <div className="text-white">Initializing Instruments...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Instrument Panel Container */}
      <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800 relative">
        {/* Top Metallic Bar */}
        <div className="bg-slate-800/50 p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
               <Trophy className="text-yellow-500" size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-mono font-bold uppercase">Current Session</div>
              <div className="text-white font-bold font-mono">SCORE: {score}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-2 h-6 rounded-sm skew-x-12 ${i < streak ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-slate-800'}`}></div>
                ))}
             </div>
             <span className={`font-mono text-sm ml-2 ${streak > 0 ? 'text-green-400' : 'text-slate-500'}`}>
                {streak} STREAK
             </span>
          </div>
        </div>

        <div className="p-10 md:p-14 text-center relative z-10">
          
          <div className="inline-block mb-6">
             <div className="w-24 h-24 mx-auto bg-slate-950 rounded-full border-4 border-slate-800 flex items-center justify-center shadow-inner relative mb-4">
                <Gauge size={40} className="text-blue-500 opacity-80" />
                <div className="absolute inset-0 rounded-full border border-white/5"></div>
             </div>
             <div className="text-blue-400 text-xs font-mono font-bold tracking-[0.2em] mb-2 uppercase">Identify V-Speed</div>
             <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-2 drop-shadow-lg">{currentQuestion.code}</h3>
             <p className="text-slate-400 font-light text-lg">{currentQuestion.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={feedback !== null}
                className={`
                  relative p-6 rounded-xl font-mono text-2xl font-bold transition-all duration-200 border-2 overflow-hidden group
                  ${feedback === null 
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-blue-500 hover:bg-slate-800 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                    : opt === currentQuestion.speed 
                      ? 'bg-emerald-900/50 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                      : 'bg-slate-900/50 border-slate-800 text-slate-600 opacity-50'}
                `}
              >
                {/* Decoration for "LCD" look */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10"></div>
                
                <span className="relative z-10">{opt}</span>
                <span className="block text-[10px] font-sans font-normal text-slate-500 mt-1 tracking-wider group-hover:text-blue-400">KIAS</span>
              </button>
            ))}
          </div>

          <div className="min-h-[80px] mt-8 flex items-center justify-center">
            {feedback === 'wrong' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-3">
                <AlertCircle size={20} />
                <span className="font-medium">Incorrect. {currentQuestion.code} is <span className="font-mono font-bold text-white">{currentQuestion.speed} KIAS</span></span>
                <button 
                    onClick={generateQuestion}
                    className="ml-2 p-1.5 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-colors"
                >
                    <RefreshCw size={14} />
                </button>
              </div>
            )}
            
            {feedback === 'correct' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center gap-3">
                <CheckCircle2 size={20} />
                <span className="font-medium">Perfect! Speed confirmed.</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm">
            <span className="text-blue-500 font-bold">PRO TIP:</span> Memorize the <strong>VS0</strong> (47 kias) and <strong>VY</strong> (78 kias) first.
        </p>
      </div>
    </div>
  );
};