
export enum AppScreen {
  HOME = 'home',
  SETUP = 'setup',
  SPIN = 'spin',
  RESULT = 'result'
}

export interface Participant {
  id: string;
  name: string;
  code: string;
  avatar?: string;
}

export interface Prize {
  id: string;
  name: string;
  icon: string;
}

export interface SpinResult {
  winner: Participant;
  prize: Prize;
  timestamp: number;
}
