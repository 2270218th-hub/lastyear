
import React, { useState } from 'react';
import { Participant } from '../types.ts';

interface SetupScreenProps {
  participants: Participant[];
  onAddParticipant: (name: string, code: string) => void;
  onRemoveParticipant: (id: string) => void;
  onBack: () => void;
  onCreateWheel: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ 
  participants, 
  onAddParticipant, 
  onRemoveParticipant, 
  onBack, 
  onCreateWheel 
}) => {
  const [activeTab, setActiveTab] = useState<'participants' | 'prizes'>('participants');
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      onAddParticipant(newName.trim(), newCode.trim() || `NV${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`);
      setNewName('');
      setNewCode('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-dark">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between">
        <button onClick={onBack} className="text-white flex size-12 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center truncate px-2">
          Thiết lập Vòng quay
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-full h-12 w-12 text-white active:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[24px]">history</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-background-dark pt-2">
        <div className="flex border-b border-[#6a692f]/30 px-4 justify-between">
          <button 
            onClick={() => setActiveTab('participants')}
            className={`relative flex flex-col items-center justify-center pb-3 pt-2 flex-1 group transition-all`}
          >
            <p className={`text-sm font-bold transition-colors ${activeTab === 'participants' ? 'text-white' : 'text-text-subtle'}`}>Người tham gia</p>
            {activeTab === 'participants' && <div className="absolute bottom-0 w-full h-[3px] bg-primary rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('prizes')}
            className={`relative flex flex-col items-center justify-center pb-3 pt-2 flex-1 group transition-all`}
          >
            <p className={`text-sm font-bold transition-colors ${activeTab === 'prizes' ? 'text-white' : 'text-text-subtle'}`}>Giải thưởng</p>
            {activeTab === 'prizes' && <div className="absolute bottom-0 w-full h-[3px] bg-primary rounded-t-full"></div>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-4">
        {activeTab === 'participants' ? (
          <>
            <div className="pt-6 pb-2">
              <h3 className="text-white tracking-tight text-xl font-bold">Nhập danh sách</h3>
              <p className="text-text-subtle text-sm mt-1">Thêm người chơi để bắt đầu quay</p>
            </div>

            {/* Upload Card */}
            <div className="py-2">
              <div className="flex flex-col items-stretch rounded-xl overflow-hidden bg-surface-dark border border-transparent hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex w-full flex-col items-center justify-center gap-3 py-6 px-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-1">
                    <span className="material-symbols-outlined text-[28px]">upload_file</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white text-lg font-bold">Tải lên tệp Excel</p>
                    <p className="text-text-subtle text-xs">Hỗ trợ định dạng .xlsx, .csv</p>
                  </div>
                  <button className="flex mt-2 w-full max-w-[200px] items-center justify-center rounded-full h-10 px-6 bg-primary text-black text-sm font-bold shadow-sm shadow-primary/20">
                    Chọn tệp
                  </button>
                </div>
              </div>
            </div>

            {/* Manual Input */}
            <div className="py-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-subtle">person_add</span>
                  </div>
                  <input 
                    className="block w-full pl-11 pr-4 py-4 bg-input-dark border-none rounded-2xl text-white placeholder-text-subtle focus:ring-2 focus:ring-primary focus:bg-input-dark/80 transition-all text-base font-medium" 
                    placeholder="Nhập tên người chơi..." 
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  />
                </div>
                <button 
                  onClick={handleAdd}
                  className="h-14 w-14 shrink-0 rounded-2xl bg-primary text-black flex items-center justify-center hover:bg-yellow-300 transition-colors shadow-lg active:scale-95"
                >
                  <span className="material-symbols-outlined font-bold">add</span>
                </button>
              </div>
            </div>

            {/* List Header */}
            <div className="pt-4 pb-2 flex items-center justify-between">
              <h4 className="text-white text-base font-bold">Danh sách hiện tại</h4>
              <span className="bg-input-dark text-white text-xs font-bold px-3 py-1 rounded-full">{participants.length} người</span>
            </div>

            {/* List Items */}
            <div className="flex flex-col gap-2 pb-4">
              {participants.map((p, idx) => (
                <div key={p.id} className="flex items-center justify-between bg-surface-dark p-3 pr-2 rounded-xl border border-white/5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${idx % 3 === 0 ? 'bg-blue-900/30 text-blue-400' : idx % 3 === 1 ? 'bg-green-900/30 text-green-400' : 'bg-purple-900/30 text-purple-400'}`}>
                      {p.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-sm">{p.name}</span>
                      <span className="text-text-subtle text-xs">{p.code}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveParticipant(p.id)}
                    className="h-8 w-8 rounded-full text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="pt-6 text-center">
            <h3 className="text-white font-bold text-xl mb-4">Quản lý Giải thưởng</h3>
            <p className="text-text-subtle">Chức năng đang được cập nhật...</p>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background-dark via-background-dark to-transparent pt-12 pointer-events-none">
        <button 
          onClick={onCreateWheel}
          className="pointer-events-auto flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full h-14 bg-primary text-black text-lg font-bold shadow-neon hover:shadow-neon-strong transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">play_circle</span>
          <span className="truncate">Tạo Vòng Quay</span>
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;
