
import React, { useEffect, useState } from 'react';
import { SpinResult } from '../types.ts';

interface ResultScreenProps {
  result: SpinResult | null;
  onSpinAgain: () => void;
  onClose: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onSpinAgain, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  if (!result) return null;

  return (
    <div className="flex flex-col h-full bg-background-dark/95 backdrop-blur-sm relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-10 w-3 h-3 bg-primary rounded-full"></div>
        <div className="absolute top-1/3 right-12 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute bottom-1/3 left-8 w-4 h-4 border-2 border-primary rounded-full"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-primary rotate-45"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6 z-10">
        <button onClick={onClose} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-white text-lg font-bold tracking-wide uppercase">Kết quả</h1>
        <button onClick={onClose} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-10 relative">
        {/* Winner Visual */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-primary/40 rounded-full blur-lg scale-110"></div>
          
          <div className="relative w-48 h-48 rounded-full border-4 border-primary/50 flex items-center justify-center bg-surface-dark overflow-hidden shadow-neon">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBfsyQXsnGEhbGZnC_6tBtlCpv1zMTXEOa6iVtYmADbxpZYFaCQBAtxnW2m2qcuaSZazwAbsaBBD_MiNa939AtX589lapLpVBQ9seHmoolrBWiQ26d8EIubum9votGbz3sfA5x9yy1HW3J8h0IUvX7YRQv3_lvF-z4ZOM3eA_6gaHkXQkxuugc0L00_QHm8UB9UxkEFL2Lo6BqtMlpRitpadU7bronPaM9brN5gYu2Kj8fV-5eUrBxUcgI2mbPJBI1jc5qH9euuhYG" 
              alt="Trophy" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-black font-bold text-sm px-4 py-1 rounded-full shadow-lg border-2 border-background-dark">
            #1 Winner
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center space-y-2 mb-8 relative z-10">
          <h2 className="text-white/80 text-xl font-medium tracking-wide">Chúc mừng!</h2>
          <h1 className="text-primary text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight [text-shadow:0_0_20px_rgba(249,245,6,0.4)]">
            {result.winner.name.split(' ').map((part, i) => (
              <React.Fragment key={i}>
                {part}{i < result.winner.name.split(' ').length - 1 ? <br/> : null}
              </React.Fragment>
            ))}
          </h1>
          
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-md">
              <span className="material-symbols-outlined text-primary text-xl">{result.prize.icon}</span>
              <p className="text-white text-base font-medium">Bạn nhận được: {result.prize.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 pb-10 flex flex-col gap-4 w-full bg-gradient-to-t from-background-dark to-transparent">
        <button 
          onClick={onSpinAgain}
          className="w-full bg-primary hover:bg-[#e6e205] active:scale-[0.98] transition-all duration-200 text-black font-bold text-lg h-14 rounded-full flex items-center justify-center gap-2 shadow-neon"
        >
          <span className="material-symbols-outlined">refresh</span>
          Quay tiếp
        </button>
        
        <button className="w-full bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 border border-white/10 text-white font-semibold text-lg h-14 rounded-full flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">download</span>
          Lưu kết quả
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
