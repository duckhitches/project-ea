export enum InterviewPhase {
  SETUP = 'SETUP',
  INTERVIEW = 'INTERVIEW',
  FEEDBACK = 'FEEDBACK',
}

export enum InterviewMode {
  CASUAL = 'CASUAL',
  STRICT = 'STRICT',
}

export enum InterviewState {
  IDLE = 'IDLE',
  GENERATING_QUESTIONS = 'GENERATING_QUESTIONS',
  AI_SPEAKING = 'AI_SPEAKING',
  LISTENING = 'LISTENING',
  PROCESSING = 'PROCESSING',
}

export interface Message {
  sender: 'AI' | 'USER';
  text: string;
  feedback?: 'good' | 'bad';
}

export interface PronunciationTip {
    term: string;
    guidance: string;
}

export interface Feedback {
  strengths: string[];
  improvements: string[];
  plan: string;
  score: number;
  toneAnalysis: string[];
  pronunciationTips: PronunciationTip[];
}



