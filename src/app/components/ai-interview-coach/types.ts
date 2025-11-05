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
  CONNECTING = 'CONNECTING',
  IN_CONVERSATION = 'IN_CONVERSATION',
  ENDING = 'ENDING',
  PROCESSING = 'PROCESSING', // for feedback
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