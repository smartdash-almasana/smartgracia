export interface Question {
  type: 'multiple' | 'boolean' | 'wordbank' | 'matching';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: boolean;
  correctOrder?: string[];
  words?: string[];
  pairs?: { shadow: string; reality: string }[];
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  xpReward: number;
  questions: Question[];
}

export interface Unit {
  unitId: number;
  unitTitle: string;
  unitSub: string;
  color: string;
  lessons: Lesson[];
}

export interface Player {
  id: string;
  name: string;
  score: number;
  questionIndex: number;
  hearts: number;
  finished: boolean;
}

export interface LobbyData {
  lobbyId: string;
  status: 'waiting' | 'playing' | 'ended';
  hostId: string;
  players: { [uid: string]: Player };
  createdAt: number;
}

export interface GlossaryItem {
  type: string;
  antitype: string;
  bibleRef: string;
}
