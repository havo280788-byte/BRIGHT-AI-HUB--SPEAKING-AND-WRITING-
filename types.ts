
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
  { id: 'gemini-3-pro-preview', name: '3 Pro', desc: 'Chất lượng cao nhất', icon: 'fa-crosshairs', color: 'text-pink-500', bgColor: 'bg-pink-50', borderColor: 'border-pink-200', badge: 'MẶC ĐỊNH' },
  { id: 'gemini-3-flash-preview', name: '3 Flash', desc: 'Nhanh & Mạnh mẽ', icon: 'fa-bolt', color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  { id: 'gemini-2.5-flash', name: '2.5 Flash', desc: 'Ổn định & An toàn', icon: 'fa-lock', color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
];
