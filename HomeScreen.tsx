
import React from 'react';
import { SpinResult } from '../types.ts';

interface HomeScreenProps {
  onStart: () => void;
  onSetup: () => void;
  lastResult: SpinResult | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, onSetup, lastResult }) => {
  return (
    <div className="flex flex-col h-full bg-background-dark">
      {/* Top App Bar */}
      <header className="flex items-center justify-between p-4 pb-2 pt-6 sticky top-0 z-10 bg-background-dark/95 backdrop-blur-md">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-dark text-white cursor-pointer hover:bg-[#4a4921] transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">Vòng Quay May Mắn</h2>
        </div>
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary cursor-pointer hover:bg-primary/30 transition-colors">
          <span className="material-symbols-outlined">history</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pb-8 overflow-y-auto">
        {/* Headline */}
        <div className="w-full text-center mt-4 mb-2">
          <span className="inline-block py-1 px-3 rounded-full bg-surface-dark text-xs font-bold uppercase tracking-wider text-[#cccb8e] mb-2">
            Chào mừng bạn
          </span>
          <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight px-4">
            Thử vận may ngay!
          </h1>
          <p className="text-gray-400 text-sm mt-2 px-8">Chạm vào nút quay để bắt đầu và nhận phần thưởng bất ngờ.</p>
        </div>

        {/* Hero Wheel Visual */}
        <div className="w-full py-6 flex justify-center">
          <div className="relative group cursor-pointer active:scale-95 transition-transform duration-300" onClick={onStart}>
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
            <div 
              className="relative w-64 h-64 rounded-full border-4 border-surface-dark shadow-2xl overflow-hidden bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRsWHHSzOgGLY1AE1UDWBLFRDD7jonXGQ1oDnpIAaXWazHzHQ8B5AtMh9JazJwgKouAK9JB4VG5ID-gPcNQHqKJtdstpMborJ28wplKWXKHgwI4e3nOrvucdOuemjqtOlw5ozHs_XpMWNwgfMA0M-xaXXaO1ev3lXKopcWaf0KBvfDtA3sxUvSxGsAclbZ98M3urCAJwWXScR2qUCsDuira4otUIbuC1M_rxooCCdcZWozqNbYnyQuJm2tPJ3MyUTCtRzMMGPk0EQU')" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-background-dark rounded-full shadow-lg flex items-center justify-center border-4 border-primary z-10">
                <span className="material-symbols-outlined text-3xl text-primary font-bold">star</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-primary drop-shadow-md"></div>
            </div>
          </div>
        </div>

        {/* Stats Info Card */}
        <div className="w-full max-w-sm mb-8">
          <div className="bg-surface-dark p-4 rounded-xl shadow-sm border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
                <span className="material-symbols-outlined">emoji_events</span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Lần quay gần nhất</p>
                <p className="text-sm font-bold text-white truncate max-w-[100px]">
                  {lastResult ? lastResult.prize.name : 'Chưa có'}
                </p>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-green-900/30 flex items-center justify-center text-green-400">
                <span className="material-symbols-outlined">token</span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Lượt còn lại</p>
                <p className="text-sm font-bold text-white">Vô hạn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="w-full flex flex-col items-center gap-4 mt-auto">
          <button 
            onClick={onStart}
            className="relative w-full max-w-[320px] group overflow-hidden rounded-full h-14 bg-primary shadow-neon hover:shadow-neon-strong transition-all duration-300"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <div className="relative flex items-center justify-center gap-2 h-full px-6">
              <span className="text-slate-900 text-lg font-bold tracking-wide uppercase">BẮT ĐẦU QUAY</span>
              <span className="material-symbols-outlined text-slate-900 animate-pulse">play_circle</span>
            </div>
          </button>
          
          <button 
            onClick={onSetup}
            className="flex w-full max-w-[320px] items-center justify-center rounded-full h-12 px-6 bg-surface-dark text-white text-sm font-bold leading-normal tracking-wide hover:bg-[#4a4921] transition-colors border border-white/5"
          >
            <span className="material-symbols-outlined mr-2 text-xl">settings</span>
            <span>Thiết lập vòng quay</span>
          </button>
        </div>
      </main>

      {/* Tab Bar */}
      <nav className="sticky bottom-0 z-20 w-full bg-background-dark/80 backdrop-blur-lg border-t border-white/5 pb-6 pt-2">
        <div className="flex justify-around items-center px-6">
          <button className="flex flex-col items-center gap-1 p-2 text-primary">
            <span className="material-symbols-outlined text-2xl fill-1">home</span>
            <span className="text-[10px] font-bold">Trang chủ</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-slate-400">
            <span className="material-symbols-outlined text-2xl">redeem</span>
            <span className="text-[10px] font-medium">Quà tặng</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 text-slate-400">
            <span className="material-symbols-outlined text-2xl">person</span>
            <span className="text-[10px] font-medium">Cá nhân</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HomeScreen;
