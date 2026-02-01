
export enum SkillMode {
  DASHBOARD = 'dashboard',
  SPEAKING = 'speaking',
  WRITING = 'writing',
  SETTINGS = 'settings'
}

export interface UserStats {
  speakingScore: number[];
  writingScore: number[];
  lessonsCompleted: number;
  streak: number;
  lastPractice: string;
}

export interface FeedbackItem {
  original: string;
  correction: string;
  explanation: string;
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'coherence';
}

export interface AIResponse {
  score: number;
  scoreBreakdown?: Record<string, number>; // Detailed score criteria
  feedback: string; // General feedback
  detailedErrors: FeedbackItem[];
  improvedVersion?: string; // For writing
  transcription?: string; // For speaking
}

export interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
  audioUrl?: string; // Optional: if we want to play back user audio
}

export interface HistoryItem {
  id: string;
  date: string;
  mode: 'speaking' | 'writing';
  score: number;
  summary: string;
}

// Gemini specific types
export interface GeminiConfig {
  apiKey: string;
}

export interface AppSettings {
  apiKey: string;
  selectedModel: string;
}

export const AI_MODELS = [
  { id: 'gemini-2.0-flash', name: '2.0 Flash', desc: 'Mới nhất & Ổn định', icon: 'fa-rocket', color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', badge: 'MẶC ĐỊNH' },
  { id: 'gemini-1.5-flash', name: '1.5 Flash', desc: 'Nhanh & Ổn định', icon: 'fa-bolt', color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  { id: 'gemini-2.0-flash-exp', name: '2.0 Flash Exp', desc: 'Thử nghiệm mới', icon: 'fa-flask', color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
];

