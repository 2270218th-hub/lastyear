
import React, { useState, useEffect, useRef } from 'react';
import { Participant, Prize } from '../types.ts';

interface SpinScreenProps {
  participants: Participant[];
  prizes: Prize[];
  onBack: () => void;
  onWin: (winner: Participant, prize: Prize) => void;
  onShowResult: () => void;
  onSetup: () => void;
}

const SpinScreen: React.FC<SpinScreenProps> = ({ 
  participants, 
  prizes, 
  onBack, 
  onWin, 
  onShowResult,
  onSetup
}) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Ensure we have at least 2 participants for the wheel
  const wheelParticipants = participants.length >= 2 ? participants : [
    ...participants, 
    ...Array(Math.max(0, 2 - participants.length)).fill({ name: 'Trống', id: 'empty', code: '' })
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Minimum 5 full rotations + random angle
    const extraRotations = 5 + Math.random() * 5;
    const newRotation = rotation + (extraRotations * 360);
    setRotation(newRotation);

    // Time for animation to finish
    setTimeout(() => {
      setIsSpinning(false);
      
      // Calculate winner
      const actualRotation = newRotation % 360;
      const segmentAngle = 360 / wheelParticipants.length;
      
      // The pointer is at the top (0 degrees). 
      // Rotation moves the wheel clockwise.
      // We need to find which segment is at the 0 degree mark.
      // Offset by half a segment for better centering logic
      const adjustedRotation = (360 - (actualRotation % 360) + segmentAngle/2) % 360;
      const winningIndex = Math.floor(adjustedRotation / segmentAngle);
      
      const winner = wheelParticipants[winningIndex];
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      
      onWin(winner, randomPrize);
      
      // Short delay before showing result screen
      setTimeout(() => {
        onShowResult();
      }, 1000);
    }, 4000); // Must match CSS transition duration
  };

  return (
    <div className="flex flex-col h-full bg-background-dark overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-4 pt-6 justify-between z-10">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-dark/50 hover:bg-surface-dark transition-colors text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Vòng quay May mắn</h2>
        <button onClick={onSetup} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-dark/50 hover:bg-surface-dark transition-colors text-white">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 relative">
        <div className="text-center mb-8">
          <h1 className="text-white tracking-tight text-3xl font-bold leading-tight mb-2">Ai sẽ là người<br/>may mắn?</h1>
          <p className="text-gray-400 text-sm font-medium">Chạm để quay và chờ kết quả</p>
        </div>

        {/* Wheel Container */}
        <div className="relative w-[320px] h-[320px] mx-auto mb-10">
          {/* Pointer */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-lg">
            <svg fill="none" height="48" viewBox="0 0 40 48" width="40" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 48L0.5 10H39.5L20 48Z" fill="#f9f506"></path>
              <circle cx="20" cy="12" fill="#f9f506" r="8" stroke="#23220f" stroke-width="4"></circle>
            </svg>
          </div>

          {/* Wheel SVG */}
          <div 
            ref={wheelRef}
            className="w-full h-full rounded-full border-4 border-primary shadow-neon relative overflow-hidden transition-transform duration-[4000ms] ease-[cubic-bezier(0.2,0.8,0.3,1)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {wheelParticipants.map((p, i) => {
                const total = wheelParticipants.length;
                const angle = 360 / total;
                const startAngle = i * angle;
                const endAngle = (i + 1) * angle;
                
                // SVG path for a sector
                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
                
                return (
                  <g key={p.id + i}>
                    <path 
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} 
                      fill={i % 2 === 0 ? '#2f2e1a' : '#3a3925'} 
                      stroke="#23220f" 
                      strokeWidth="0.5"
                    />
                    <text 
                      fill="white" 
                      fontSize="4" 
                      fontWeight="bold" 
                      textAnchor="middle" 
                      transform={`rotate(${startAngle + angle/2}, 50, 50) translate(35, 0)`}
                    >
                      {p.name.length > 10 ? p.name.substring(0, 8) + '...' : p.name}
                    </text>
                  </g>
                );
              })}
              {/* Hub */}
              <circle cx="50" cy="50" fill="#23220f" r="8" stroke="#f9f506" strokeWidth="2"></circle>
              <circle cx="50" cy="50" fill="#f9f506" r="3"></circle>
            </svg>
          </div>
        </div>

        {/* Spin Button */}
        <div className="w-full flex justify-center mb-8 relative z-10">
          <button 
            onClick={handleSpin}
            disabled={isSpinning}
            className={`group relative flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-background-dark text-lg font-bold shadow-neon hover:shadow-neon-strong transition-all active:scale-95 ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className={`material-symbols-outlined mr-2 ${isSpinning ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`}>cached</span>
            <span className="truncate">{isSpinning ? 'ĐANG QUAY...' : 'QUAY NGAY'}</span>
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </button>
        </div>
      </div>

      {/* Participants Drawer-like area */}
      <div className="bg-surface-dark w-full rounded-t-[2.5rem] p-6 pb-8 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
        <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-6 opacity-30"></div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">Người tham gia ({participants.length})</h3>
          <button onClick={onSetup} className="text-primary text-sm font-semibold flex items-center">
            Chỉnh sửa
            <span className="material-symbols-outlined text-sm ml-1">edit</span>
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {participants.map((p) => (
            <div key={p.id} className="snap-start shrink-0 flex items-center gap-3 bg-[#23220f] p-2 pr-4 rounded-full border border-gray-800">
              <div className="size-10 rounded-full overflow-hidden bg-gray-700 relative">
                <img src={p.avatar} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold whitespace-nowrap">{p.name}</span>
                <span className="text-xs text-gray-500">{p.code}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpinScreen;
