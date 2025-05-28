// Test and question types
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  type: QuestionType;
}

export type QuestionType = 
  | 'reading' 
  | 'grammar' 
  | 'vocabulary' 
  | 'pronunciation' 
  | 'transformation' 
  | 'cloze' 
  | 'error';

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  instructions: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in minutes
  sections: Section[];
  coverImage?: string;
}

export interface TestSummary {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  questionCount: number;
  sections: { id: string; title: string }[];
  coverImage?: string;
}

// User related types
export interface UserAnswer {
  questionId: string;
  answer: string;
}

export interface TestResult {
  id: string;
  testId: string;
  testName: string;
  score: number;
  maxScore: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  sectionScores: Record<string, { correct: number; total: number }>;
  userAnswers: UserAnswer[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  completedTests: number;
  averageScore: number;
}