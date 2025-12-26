
import React, { useState, useEffect, useCallback } from 'react';
import { AppScreen, Participant, Prize, SpinResult } from './types.ts';
import { DEFAULT_PARTICIPANTS, DEFAULT_PRIZES } from './constants.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import SetupScreen from './screens/SetupScreen.tsx';
import SpinScreen from './screens/SpinScreen.tsx';
import ResultScreen from './screens/ResultScreen.tsx';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);
  const [participants, setParticipants] = useState<Participant[]>(DEFAULT_PARTICIPANTS);
  const [prizes, setPrizes] = useState<Prize[]>(DEFAULT_PRIZES);
  const [history, setHistory] = useState<SpinResult[]>([]);
  const [lastResult, setLastResult] = useState<SpinResult | null>(null);

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const addParticipant = (name: string, code: string) => {
    const newParticipant: Participant = {
      id: Date.now().toString(),
      name,
      code,
      avatar: `https://picsum.photos/seed/${Math.random()}/100`
    };
    setParticipants([...participants, newParticipant]);
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const recordWin = (winner: Participant, prize: Prize) => {
    const result: SpinResult = {
      winner,
      prize,
      timestamp: Date.now()
    };
    setLastResult(result);
    setHistory([result, ...history]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.HOME:
        return (
          <HomeScreen 
            onStart={() => navigateTo(AppScreen.SPIN)} 
            onSetup={() => navigateTo(AppScreen.SETUP)}
            lastResult={lastResult}
          />
        );
      case AppScreen.SETUP:
        return (
          <SetupScreen 
            participants={participants}
            onAddParticipant={addParticipant}
            onRemoveParticipant={removeParticipant}
            onBack={() => navigateTo(AppScreen.HOME)}
            onCreateWheel={() => navigateTo(AppScreen.SPIN)}
          />
        );
      case AppScreen.SPIN:
        return (
          <SpinScreen 
            participants={participants}
            prizes={prizes}
            onBack={() => navigateTo(AppScreen.HOME)}
            onWin={recordWin}
            onShowResult={() => navigateTo(AppScreen.RESULT)}
            onSetup={() => navigateTo(AppScreen.SETUP)}
          />
        );
      case AppScreen.RESULT:
        return (
          <ResultScreen 
            result={lastResult}
            onSpinAgain={() => navigateTo(AppScreen.SPIN)}
            onClose={() => navigateTo(AppScreen.HOME)}
          />
        );
      default:
        return <HomeScreen onStart={() => navigateTo(AppScreen.SPIN)} onSetup={() => navigateTo(AppScreen.SETUP)} lastResult={lastResult} />;
    }
  };

  return (
    <div className="flex justify-center bg-zinc-900 min-h-screen">
      <div className="w-full max-w-md h-screen relative overflow-hidden bg-background-dark shadow-2xl">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
